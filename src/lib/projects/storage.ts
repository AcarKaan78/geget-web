import { list, put } from '@vercel/blob';
import type { ProjectsManifest, ProjectEntry } from './types';
import { buildSeedManifest } from './seed';

const MANIFEST_PATH = 'projects/manifest.json';

function hasBlobToken(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function findManifestUrl(): Promise<string | null> {
  try {
    const { blobs } = await list({ prefix: MANIFEST_PATH, limit: 1 });
    const hit = blobs.find((b) => b.pathname === MANIFEST_PATH);
    return hit?.url ?? null;
  } catch (err) {
    console.warn('[projects/storage] list failed', err);
    return null;
  }
}

/**
 * Returns the persisted manifest, or — when nothing has been persisted yet —
 * the seed built from the original static projects. A persisted-but-empty
 * manifest is respected and returned as-is.
 */
export async function readManifest(): Promise<ProjectsManifest> {
  if (!hasBlobToken()) return buildSeedManifest();
  const url = await findManifestUrl();
  if (!url) return buildSeedManifest();
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return buildSeedManifest();
    const data = (await res.json()) as ProjectsManifest;
    if (!data || data.version !== 1 || !Array.isArray(data.projects)) {
      return buildSeedManifest();
    }
    return data;
  } catch (err) {
    console.warn('[projects/storage] read failed', err);
    return buildSeedManifest();
  }
}

async function writeManifest(manifest: ProjectsManifest): Promise<void> {
  await put(MANIFEST_PATH, JSON.stringify(manifest, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
  });
}

export async function addProject(
  entry: ProjectEntry,
): Promise<ProjectsManifest> {
  const current = await readManifest();
  const next: ProjectsManifest = {
    version: 1,
    projects: [entry, ...current.projects.filter((p) => p.id !== entry.id)],
  };
  await writeManifest(next);
  return next;
}

export type ProjectPatch = Partial<
  Pick<ProjectEntry, 'category' | 'status' | 'date' | 'tr' | 'en'>
>;

export async function updateProject(
  id: string,
  patch: ProjectPatch,
): Promise<ProjectsManifest | null> {
  const current = await readManifest();
  const idx = current.projects.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const updated: ProjectEntry = {
    ...current.projects[idx],
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  const next: ProjectsManifest = {
    version: 1,
    projects: current.projects.map((p, i) => (i === idx ? updated : p)),
  };
  await writeManifest(next);
  return next;
}

export async function deleteProject(
  id: string,
): Promise<ProjectsManifest | null> {
  const current = await readManifest();
  if (!current.projects.some((p) => p.id === id)) return null;
  const next: ProjectsManifest = {
    version: 1,
    projects: current.projects.filter((p) => p.id !== id),
  };
  await writeManifest(next);
  return next;
}
