import { list, put, del } from '@vercel/blob';
import type { BlogManifest, BlogPostEntry } from './types';
import { buildSeedManifest } from './seed';

const MANIFEST_PATH = 'blog/manifest.json';

function hasBlobToken(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function isBlobUrl(url: string): boolean {
  return url.includes('blob.vercel-storage.com');
}

async function findManifestUrl(): Promise<string | null> {
  try {
    const { blobs } = await list({ prefix: MANIFEST_PATH, limit: 1 });
    const hit = blobs.find((b) => b.pathname === MANIFEST_PATH);
    return hit?.url ?? null;
  } catch (err) {
    console.warn('[blog/storage] list failed', err);
    return null;
  }
}

/**
 * Returns the persisted manifest, or — when nothing has been persisted yet —
 * the seed built from the original static posts. A persisted-but-empty manifest
 * (e.g. after deleting every post) is respected and returned as-is.
 */
export async function readManifest(): Promise<BlogManifest> {
  if (!hasBlobToken()) return buildSeedManifest();
  const url = await findManifestUrl();
  if (!url) return buildSeedManifest();
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return buildSeedManifest();
    const data = (await res.json()) as BlogManifest;
    if (!data || data.version !== 1 || !Array.isArray(data.posts)) {
      return buildSeedManifest();
    }
    return data;
  } catch (err) {
    console.warn('[blog/storage] read failed', err);
    return buildSeedManifest();
  }
}

async function writeManifest(manifest: BlogManifest): Promise<void> {
  await put(MANIFEST_PATH, JSON.stringify(manifest, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
  });
}

function sortPosts(posts: BlogPostEntry[]): BlogPostEntry[] {
  return [...posts].sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    return a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0;
  });
}

export async function getPostEntry(
  slug: string,
): Promise<BlogPostEntry | undefined> {
  const manifest = await readManifest();
  return manifest.posts.find((p) => p.slug === slug);
}

export async function addPost(entry: BlogPostEntry): Promise<BlogManifest> {
  const current = await readManifest();
  const next: BlogManifest = {
    version: 1,
    posts: sortPosts([entry, ...current.posts.filter((p) => p.id !== entry.id)]),
  };
  await writeManifest(next);
  return next;
}

export type BlogPostPatch = Partial<
  Pick<
    BlogPostEntry,
    | 'date'
    | 'readingMinutes'
    | 'categoryKey'
    | 'coverImage'
    | 'coverAspect'
    | 'instagramUrl'
    | 'tr'
    | 'en'
  >
>;

export async function updatePost(
  id: string,
  patch: BlogPostPatch,
): Promise<BlogManifest | null> {
  const current = await readManifest();
  const idx = current.posts.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const updated: BlogPostEntry = {
    ...current.posts[idx],
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  const next: BlogManifest = {
    version: 1,
    posts: sortPosts(current.posts.map((p, i) => (i === idx ? updated : p))),
  };
  await writeManifest(next);
  return next;
}

export async function deletePost(id: string): Promise<BlogManifest | null> {
  const current = await readManifest();
  const entry = current.posts.find((p) => p.id === id);
  if (!entry) return null;
  if (entry.coverImage && isBlobUrl(entry.coverImage)) {
    try {
      await del(entry.coverImage);
    } catch {
      // cover already gone; continue with manifest cleanup
    }
  }
  const next: BlogManifest = {
    version: 1,
    posts: current.posts.filter((p) => p.id !== id),
  };
  await writeManifest(next);
  return next;
}

export function existingSlugs(manifest: BlogManifest): Set<string> {
  return new Set(manifest.posts.map((p) => p.slug));
}
