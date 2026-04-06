'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Button from '@/components/ui/Button';

export default function CTA() {
  const t = useTranslations('home');

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Large faint diamond watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rotate-45 border-[3px] border-primary-100 opacity-30 pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <ScrollReveal>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900">
              {t('cta.title')}
            </h2>

            <p className="text-lg text-neutral-500 mt-4 max-w-xl mx-auto font-body">
              {t('cta.description')}
            </p>

            <div className="mt-8">
              <Button variant="primary" size="lg" href="/iletisim">
                {t('cta.button')}
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
