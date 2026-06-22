import { blogPosts } from '@/lib/blog';
import trMessages from '@/messages/tr.json';
import enMessages from '@/messages/en.json';
import type { BlogManifest, BlogPostEntry, LocalizedContent } from './types';

interface MessagePost {
  title?: string;
  excerpt?: string;
  content?: string[];
}

function pickContent(
  messages: { blog?: { posts?: Record<string, MessagePost> } },
  slug: string,
): LocalizedContent | undefined {
  const p = messages?.blog?.posts?.[slug];
  if (!p || !p.title) return undefined;
  return {
    title: p.title,
    excerpt: p.excerpt ?? '',
    content: Array.isArray(p.content) ? p.content : [],
  };
}

/**
 * Builds the initial manifest from the original static posts so the public blog
 * keeps working before anything is persisted to Blob. The first admin write
 * (create/edit/delete) persists this snapshot to `blog/manifest.json`.
 */
export function buildSeedManifest(): BlogManifest {
  const posts: BlogPostEntry[] = blogPosts.map((p) => {
    const tr = pickContent(trMessages, p.slug) ?? {
      title: p.slug,
      excerpt: '',
      content: [],
    };
    const en = pickContent(enMessages, p.slug);
    const ts = `${p.date}T00:00:00.000Z`;
    return {
      id: `seed-${p.slug}`,
      slug: p.slug,
      date: p.date,
      readingMinutes: p.readingMinutes,
      categoryKey: p.categoryKey,
      coverImage: p.coverImage,
      coverAspect: p.coverAspect ?? 'video',
      instagramUrl: p.instagramUrl,
      tr,
      en,
      createdAt: ts,
      updatedAt: ts,
    };
  });
  return { version: 1, posts };
}
