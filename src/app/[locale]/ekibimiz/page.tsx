import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import DiamondPattern from '@/components/ui/DiamondPattern';
import TeamGrid from '@/components/team/TeamGrid';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common.meta.team' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://geget.org/${locale}/ekibimiz`,
      languages: {
        tr: 'https://geget.org/tr/ekibimiz',
        en: 'https://geget.org/en/ekibimiz',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://geget.org/${locale}/ekibimiz`,
      siteName: 'GEGET',
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      type: 'website',
    },
  };
}

function PageHero() {
  const t = useTranslations('team');
  return (
    <section className="relative bg-gradient-to-br from-primary-700 to-primary-900 py-32 overflow-hidden">
      <DiamondPattern count={6} opacity={0.05} color="white" />
      <Container className="relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white">
          {t('title')}
        </h1>
        <p className="text-primary-200 mt-4 text-sm tracking-wide">
          {t('breadcrumb')}
        </p>
      </Container>
    </section>
  );
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHero />
      <TeamGrid />
    </>
  );
}
