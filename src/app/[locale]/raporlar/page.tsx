import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import DiamondPattern from '@/components/ui/DiamondPattern';
import ReportsList from '@/components/reports/ReportsList';
import { readManifest } from '@/lib/reports/storage';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common.meta.reports' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://geget.org/${locale}/raporlar`,
      languages: {
        tr: 'https://geget.org/tr/raporlar',
        en: 'https://geget.org/en/raporlar',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://geget.org/${locale}/raporlar`,
      siteName: 'GEGET',
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      type: 'website',
    },
  };
}

function PageHero() {
  const t = useTranslations('reports');
  return (
    <section className="relative bg-gradient-to-br from-primary-700 to-primary-900 py-32 overflow-hidden">
      <DiamondPattern count={6} opacity={0.05} color="white" />
      <Container className="relative z-10 text-center">
        <span className="inline-block text-[11px] uppercase tracking-[0.32em] text-accent-300 font-semibold">
          {t('breadcrumb')}
        </span>
        <h1 className="mt-4 text-4xl md:text-5xl font-heading font-bold text-white">
          {t('title')}
        </h1>
        <p className="text-primary-200 mt-5 max-w-xl mx-auto leading-relaxed">
          {t('heroDescription')}
        </p>
      </Container>
    </section>
  );
}

export default async function ReportsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const manifest = await readManifest();
  const safeLocale: 'tr' | 'en' = locale === 'en' ? 'en' : 'tr';

  return (
    <>
      <PageHero />
      <ReportsList reports={manifest.reports} locale={safeLocale} />
    </>
  );
}
