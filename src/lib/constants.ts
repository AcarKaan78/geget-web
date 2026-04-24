import type { NavLink } from '@/types';

export const SITE_URL = 'https://geget.org';

export const WEB3FORMS_ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

export const NAV_LINKS: NavLink[] = [
  { labelKey: 'common.nav.home', href: '/' },
  { labelKey: 'common.nav.about', href: '/hakkimizda' },
  { labelKey: 'common.nav.projects', href: '/projeler' },
  { labelKey: 'common.nav.gallery', href: '/galeri' },
  { labelKey: 'common.nav.blog', href: '/blog' },
  { labelKey: 'common.nav.team', href: '/ekibimiz' },
  { labelKey: 'common.nav.contact', href: '/iletisim' },
];

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/genclikgelecekvetoplumdernegi',
  twitter: 'https://x.com/halil_ecer',
} as const;

export const CONTACT_INFO = {
  email: 'info@geget.org',
  instagram: '@genclikgelecekvetoplumdernegi',
  twitter: '@halil_ecer',
  location: 'Ankara, Türkiye',
} as const;
