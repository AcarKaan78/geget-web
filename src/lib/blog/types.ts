export type BlogCategoryKey = 'policy' | 'city' | 'community';

export interface LocalizedContent {
  title: string;
  excerpt: string;
  content: string[];
}

export interface BlogPostEntry {
  id: string;
  slug: string;
  date: string; // YYYY-MM-DD
  readingMinutes: number;
  categoryKey: BlogCategoryKey;
  coverImage: string;
  coverAspect: 'video' | 'square';
  instagramUrl?: string;
  tr: LocalizedContent;
  en?: LocalizedContent;
  createdAt: string;
  updatedAt: string;
}

export interface BlogManifest {
  version: 1;
  posts: BlogPostEntry[];
}

export const EMPTY_BLOG_MANIFEST: BlogManifest = {
  version: 1,
  posts: [],
};

/** A post with its title/excerpt/content already resolved for one locale. */
export interface LocalizedPost {
  id: string;
  slug: string;
  date: string;
  readingMinutes: number;
  categoryKey: BlogCategoryKey;
  coverImage: string;
  coverAspect: 'video' | 'square';
  instagramUrl?: string;
  title: string;
  excerpt: string;
  content: string[];
}

/** Resolve a post for a locale, falling back to Turkish when English is absent. */
export function localizePost(entry: BlogPostEntry, locale: string): LocalizedPost {
  const useEn =
    locale === 'en' && entry.en && entry.en.title.trim().length > 0;
  const loc = useEn ? entry.en! : entry.tr;
  return {
    id: entry.id,
    slug: entry.slug,
    date: entry.date,
    readingMinutes: entry.readingMinutes,
    categoryKey: entry.categoryKey,
    coverImage: entry.coverImage,
    coverAspect: entry.coverAspect,
    instagramUrl: entry.instagramUrl,
    title: loc.title,
    excerpt: loc.excerpt,
    content: loc.content,
  };
}
