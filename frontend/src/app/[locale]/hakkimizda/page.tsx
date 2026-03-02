import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { constructMetadata } from '@/lib/metadata';

import Story from '@/components/about/Story';
import Values from '@/components/about/Values';
import Timeline from '@/components/about/Timeline';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return constructMetadata({
    title: t('about.title'),
    description: t('about.description'),
    locale,
    path: '/hakkimizda',
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Story />
      <Values />
      <Timeline />
    </>
  );
}
