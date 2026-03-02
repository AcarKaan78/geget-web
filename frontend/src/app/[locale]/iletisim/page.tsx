import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { constructMetadata } from '@/lib/metadata';

import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return constructMetadata({
    title: t('contact.title'),
    description: t('contact.description'),
    locale,
    path: '/iletisim',
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </section>
  );
}
