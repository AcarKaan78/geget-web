export interface InstagramPost {
  id: string;
  url: string;
  uploadedAt: string;
}

export interface InstagramManifest {
  version: 1;
  posts: InstagramPost[];
}

export const EMPTY_INSTAGRAM_MANIFEST: InstagramManifest = {
  version: 1,
  posts: [],
};

const INSTAGRAM_URL = /^https?:\/\/(www\.)?instagram\.com\/(p|reel|tv)\/[\w-]+/i;

export function isInstagramPostUrl(value: string): boolean {
  return INSTAGRAM_URL.test(value.trim());
}

// Strips query/UTM noise so embeds and de-duping stay consistent.
export function normalizeInstagramUrl(value: string): string {
  const trimmed = value.trim();
  const match = trimmed.match(
    /^(https?:\/\/(?:www\.)?instagram\.com\/(?:p|reel|tv)\/[\w-]+)/i,
  );
  const base = match ? match[1] : trimmed.split('?')[0];
  return base.endsWith('/') ? base : `${base}/`;
}
