import type { MetadataRoute } from 'next';
import { readManifest } from '@/lib/blog/storage';

const BASE = 'https://www.geget.org';
const LOCALES = ['tr', 'en'] as const;

// Pages that exist for both locales.
const STATIC_PATHS = [
  '',
  '/hakkimizda',
  '/projeler',
  '/galeri',
  '/blog',
  '/raporlar',
  '/ekibimiz',
  '/iletisim',
];

function languageAlternates(path: string) {
  return {
    languages: {
      tr: `${BASE}/tr${path}`,
      en: `${BASE}/en${path}`,
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE}/${locale}${path}`,
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.8,
        alternates: languageAlternates(path),
      });
    }
  }

  const { posts } = await readManifest();
  for (const post of posts) {
    const path = `/blog/${post.slug}`;
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE}/${locale}${path}`,
        lastModified: new Date(post.updatedAt || post.date),
        changeFrequency: 'yearly',
        priority: 0.6,
        alternates: languageAlternates(path),
      });
    }
  }

  return entries;
}
