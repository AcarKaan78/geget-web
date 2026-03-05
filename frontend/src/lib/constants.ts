export const NAV_LINKS = [
  { href: '/', labelKey: 'common.nav.home' },
  { href: '/hakkimizda', labelKey: 'common.nav.about' },
  { href: '/projeler', labelKey: 'common.nav.projects' },
  { href: '/ekibimiz', labelKey: 'common.nav.team' },
  { href: '/blog', labelKey: 'common.nav.blog' },
  { href: '/iletisim', labelKey: 'common.nav.contact' },
] as const;

export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/genclikgelecekvetoplumdernegi',
  twitter: 'https://x.com/halil_ecer',
} as const;

export const SITE_CONFIG = {
  name: 'GEGET',
  fullName: 'Gençlik Gelecek ve Toplum Derneği',
  url: 'https://geget.org',
  email: 'info@geget.org',
} as const;
