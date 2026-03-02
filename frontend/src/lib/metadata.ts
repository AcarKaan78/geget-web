import { Metadata } from 'next';

export const siteConfig = {
  name: 'GEGET',
  fullName: 'Gençlik Gelecek ve Toplum Derneği',
  url: 'https://geget.org',
  ogImage: 'https://geget.org/images/og-image.jpg',
};

export function constructMetadata({
  title,
  description,
  locale = 'tr',
  path = '',
}: {
  title: string;
  description: string;
  locale?: string;
  path?: string;
}): Metadata {
  const url = `${siteConfig.url}/${locale}${path}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.fullName,
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      type: 'website',
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteConfig.ogImage],
    },
    alternates: {
      canonical: url,
      languages: {
        'tr': `${siteConfig.url}/tr${path}`,
        'en': `${siteConfig.url}/en${path}`,
      },
    },
  };
}

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: 'Gençlik Gelecek ve Toplum Derneği',
  alternateName: 'GEGET',
  url: 'https://geget.org',
  logo: 'https://geget.org/images/logo-color.png',
  description:
    'Yaşamın her alanında gençlerin güçlendirilmesi için çalışmalar yürüten bir gençlik kuruluşu.',
  foundingDate: '2026',
  sameAs: [
    'https://www.instagram.com/genclikgelecekvetoplumdernegi',
    'https://x.com/halil_ecer',
  ],
};
