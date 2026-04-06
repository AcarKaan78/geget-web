import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Hero from '@/components/home/Hero';
import Mission from '@/components/home/Mission';
import FocusAreas from '@/components/home/FocusAreas';
import Stats from '@/components/home/Stats';
import YouthCities from '@/components/home/YouthCities';
import CTA from '@/components/home/CTA';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common.meta.home' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://geget.org/${locale}`,
      languages: {
        tr: 'https://geget.org/tr',
        en: 'https://geget.org/en',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://geget.org/${locale}`,
      siteName: 'GEGET',
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Mission />
      <FocusAreas />
      <YouthCities />
      <Stats />
      <CTA />
    </>
  );
}
