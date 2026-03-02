import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { constructMetadata } from '@/lib/metadata';

import SectionHeader from '@/components/ui/SectionHeader';
import TeamGrid from '@/components/team/TeamGrid';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return constructMetadata({
    title: t('team.title'),
    description: t('team.description'),
    locale,
    path: '/ekibimiz',
  });
}

export default async function TeamPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'team' });

  return (
    <section className="section-padding">
      <div className="section-container">
        <SectionHeader title={t('title')} subtitle={t('subtitle')} centered />
        <TeamGrid />
      </div>
    </section>
  );
}
