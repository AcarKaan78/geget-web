import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://geget.org';
  const locales = ['tr', 'en'];
  const pages = ['', '/hakkimizda', '/projeler', '/ekibimiz', '/blog', '/iletisim'];

  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: page === '' ? 1 : 0.8,
    }))
  );
}
