import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import DiamondPattern from '@/components/ui/DiamondPattern';
import GalleryGrid from '@/components/gallery/GalleryGrid';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common.meta.gallery' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://geget.org/${locale}/galeri`,
      languages: {
        tr: 'https://geget.org/tr/galeri',
        en: 'https://geget.org/en/galeri',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://geget.org/${locale}/galeri`,
      siteName: 'GEGET',
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      type: 'website',
    },
  };
}

function PageHero() {
  const t = useTranslations('gallery');
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

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHero />
      <GalleryGrid />
    </>
  );
}
