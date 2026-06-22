export interface BlogPost {
  slug: string;
  date: string;
  readingMinutes: number;
  categoryKey: 'policy' | 'city' | 'community';
  coverImage: string;
  instagramUrl?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'ecominds-surdurulebilir-dunya-icin-inovasyon',
    date: '2026-06-18',
    readingMinutes: 3,
    categoryKey: 'community',
    coverImage: '/images/galeri/ecominds-cekilis.jpg',
    instagramUrl:
      'https://www.instagram.com/p/DZSNQMJKCQ-/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
  },
  {
    slug: 'genc-dostu-sehirler-neden-onemli',
    date: '2026-04-10',
    readingMinutes: 5,
    categoryKey: 'city',
    coverImage: '/images/galeri/genclerin-hayalindeki-sehir.jpg',
  },
  {
    slug: 'genclik-politikalarinin-gelecegi',
    date: '2026-03-22',
    readingMinutes: 6,
    categoryKey: 'policy',
    coverImage: '/images/galeri/genclik-politikalari.jpg',
  },
  {
    slug: 'akran-mentorlugu-ile-guclenen-genclik',
    date: '2026-02-18',
    readingMinutes: 4,
    categoryKey: 'community',
    coverImage: '/images/galeri/akran-gp.jpg',
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
