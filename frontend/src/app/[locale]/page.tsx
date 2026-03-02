import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { constructMetadata, organizationJsonLd } from '@/lib/metadata';

import Hero from '@/components/home/Hero';
import Mission from '@/components/home/Mission';
import FocusAreas from '@/components/home/FocusAreas';
import Stats from '@/components/home/Stats';
import YouthCities from '@/components/home/YouthCities';
import CTA from '@/components/home/CTA';
import Partners from '@/components/home/Partners';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return constructMetadata({
    title: t('home.title'),
    description: t('home.description'),
    locale,
    path: '',
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Hero />
      <Mission />
      <FocusAreas />
      <Stats />
      <YouthCities />
      <CTA />
      <Partners />
    </>
  );
}
