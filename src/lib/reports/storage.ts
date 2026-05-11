import { list, put, del } from '@vercel/blob';
import { EMPTY_MANIFEST, ReportsManifest, ReportEntry } from './types';

const MANIFEST_PATH = 'reports/manifest.json';

function hasBlobToken(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function findManifestUrl(): Promise<string | null> {
  try {
    const { blobs } = await list({ prefix: MANIFEST_PATH, limit: 1 });
    const hit = blobs.find((b) => b.pathname === MANIFEST_PATH);
    return hit?.url ?? null;
  } catch (err) {
    console.warn('[reports/storage] list failed', err);
    return null;
  }
}

export async function readManifest(): Promise<ReportsManifest> {
  if (!hasBlobToken()) return EMPTY_MANIFEST;
  const url = await findManifestUrl();
  if (!url) return EMPTY_MANIFEST;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return EMPTY_MANIFEST;
    const data = (await res.json()) as ReportsManifest;
    if (!data || data.version !== 1 || !Array.isArray(data.reports)) {
      return EMPTY_MANIFEST;
    }
    return data;
  } catch (err) {
    console.warn('[reports/storage] read failed', err);
    return EMPTY_MANIFEST;
  }
}

async function writeManifest(manifest: ReportsManifest): Promise<void> {
  await put(MANIFEST_PATH, JSON.stringify(manifest, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
  });
}

function sortReports(reports: ReportEntry[]): ReportEntry[] {
  return [...reports].sort((a, b) =>
    a.uploadedAt < b.uploadedAt ? 1 : a.uploadedAt > b.uploadedAt ? -1 : 0,
  );
}

export async function addReport(entry: ReportEntry): Promise<ReportsManifest> {
  const current = await readManifest();
  const next: ReportsManifest = {
    version: 1,
    reports: sortReports([entry, ...current.reports.filter((r) => r.id !== entry.id)]),
  };
  await writeManifest(next);
  return next;
}

export async function updateReport(
  id: string,
  patch: Partial<Pick<ReportEntry, 'titleTr' | 'titleEn'>>,
): Promise<ReportsManifest | null> {
  const current = await readManifest();
  const idx = current.reports.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  const updated: ReportEntry = { ...current.reports[idx], ...patch };
  const next: ReportsManifest = {
    version: 1,
    reports: current.reports.map((r, i) => (i === idx ? updated : r)),
  };
  await writeManifest(next);
  return next;
}

export async function deleteReport(id: string): Promise<ReportsManifest | null> {
  const current = await readManifest();
  const entry = current.reports.find((r) => r.id === id);
  if (!entry) return null;
  try {
    await del(entry.fileUrl);
  } catch {
    // file already gone; continue with manifest cleanup
  }
  const next: ReportsManifest = {
    version: 1,
    reports: current.reports.filter((r) => r.id !== id),
  };
  await writeManifest(next);
  return next;
}

export function existingSlugs(manifest: ReportsManifest): Set<string> {
  return new Set(manifest.reports.map((r) => r.slug));
}
