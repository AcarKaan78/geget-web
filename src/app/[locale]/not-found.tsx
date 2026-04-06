'use client';

import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import DiamondPattern from '@/components/ui/DiamondPattern';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <DiamondPattern count={8} opacity={0.03} color="#2B5EA7" />
      <Container className="relative z-10 text-center">
        <p className="text-[10rem] font-heading font-bold text-primary-100 leading-none select-none">
          {t('title')}
        </p>
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 -mt-8">
          {t('heading')}
        </h1>
        <p className="text-neutral-500 text-lg mt-4 max-w-md mx-auto">
          {t('description')}
        </p>
        <div className="mt-8">
          <Button href="/" variant="primary" size="lg">
            {t('button')}
          </Button>
        </div>
      </Container>
    </section>
  );
}
