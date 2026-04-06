import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import DiamondPattern from '@/components/ui/DiamondPattern';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common.meta.contact' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://geget.org/${locale}/iletisim`,
      languages: {
        tr: 'https://geget.org/tr/iletisim',
        en: 'https://geget.org/en/iletisim',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://geget.org/${locale}/iletisim`,
      siteName: 'GEGET',
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      type: 'website',
    },
  };
}

function PageHero() {
  const t = useTranslations('contact');
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

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHero />
      <section className="py-20">
        <Container>
          <div className="grid md:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </Container>
      </section>
    </>
  );
}
