import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { constructMetadata } from '@/lib/metadata';

import SectionHeader from '@/components/ui/SectionHeader';
import ProjectGrid from '@/components/projects/ProjectGrid';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return constructMetadata({
    title: t('projects.title'),
    description: t('projects.description'),
    locale,
    path: '/projeler',
  });
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'projects' });

  return (
    <section className="section-padding">
      <div className="section-container">
        <SectionHeader title={t('title')} subtitle={t('subtitle')} centered />
        <ProjectGrid />
      </div>
    </section>
  );
}
