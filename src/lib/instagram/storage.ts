import { list, put } from '@vercel/blob';
import {
  EMPTY_INSTAGRAM_MANIFEST,
  InstagramManifest,
  InstagramPost,
} from './types';

const MANIFEST_PATH = 'instagram/manifest.json';

function hasBlobToken(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function findManifestUrl(): Promise<string | null> {
  try {
    const { blobs } = await list({ prefix: MANIFEST_PATH, limit: 1 });
    const hit = blobs.find((b) => b.pathname === MANIFEST_PATH);
    return hit?.url ?? null;
  } catch (err) {
    console.warn('[instagram/storage] list failed', err);
    return null;
  }
}

export async function readManifest(): Promise<InstagramManifest> {
  if (!hasBlobToken()) return EMPTY_INSTAGRAM_MANIFEST;
  const url = await findManifestUrl();
  if (!url) return EMPTY_INSTAGRAM_MANIFEST;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return EMPTY_INSTAGRAM_MANIFEST;
    const data = (await res.json()) as InstagramManifest;
    if (!data || data.version !== 1 || !Array.isArray(data.posts)) {
      return EMPTY_INSTAGRAM_MANIFEST;
    }
    return data;
  } catch (err) {
    console.warn('[instagram/storage] read failed', err);
    return EMPTY_INSTAGRAM_MANIFEST;
  }
}

async function writeManifest(manifest: InstagramManifest): Promise<void> {
  await put(MANIFEST_PATH, JSON.stringify(manifest, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
  });
}

function sortPosts(posts: InstagramPost[]): InstagramPost[] {
  return [...posts].sort((a, b) =>
    a.uploadedAt < b.uploadedAt ? 1 : a.uploadedAt > b.uploadedAt ? -1 : 0,
  );
}

export async function addPost(entry: InstagramPost): Promise<InstagramManifest> {
  const current = await readManifest();
  // De-dupe by normalized URL so the same post can't be added twice.
  const next: InstagramManifest = {
    version: 1,
    posts: sortPosts([
      entry,
      ...current.posts.filter((p) => p.url !== entry.url && p.id !== entry.id),
    ]),
  };
  await writeManifest(next);
  return next;
}

export async function deletePost(id: string): Promise<InstagramManifest | null> {
  const current = await readManifest();
  if (!current.posts.some((p) => p.id === id)) return null;
  const next: InstagramManifest = {
    version: 1,
    posts: current.posts.filter((p) => p.id !== id),
  };
  await writeManifest(next);
  return next;
}
