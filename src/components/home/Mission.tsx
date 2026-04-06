'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function Mission() {
  const t = useTranslations('home');

  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="grid md:grid-cols-5 gap-12 items-center">
          {/* Left column */}
          <ScrollReveal direction="left" className="md:col-span-3">
            <span className="inline-block uppercase tracking-widest text-sm text-primary-500 font-semibold">
              {t('mission.overline')}
            </span>

            <blockquote className="border-l-4 border-primary-500 pl-6 mt-4">
              <p className="text-2xl md:text-3xl font-heading font-bold text-neutral-900 leading-snug">
                {t('mission.quote')}
              </p>
            </blockquote>

            <p className="text-neutral-600 text-lg mt-6 font-body leading-relaxed">
              {t('mission.description')}
            </p>
          </ScrollReveal>

          {/* Right column — Decorative diamond composition */}
          <ScrollReveal direction="right" className="md:col-span-2">
            <div className="relative flex items-center justify-center h-64 md:h-80">
              {/* Outer diamond */}
              <div
                className="absolute w-48 h-48 md:w-56 md:h-56 rotate-45 border-2 border-primary-200 rounded-sm"
              />
              {/* Middle diamond */}
              <div
                className="absolute w-36 h-36 md:w-40 md:h-40 rotate-45 border-2 border-primary-400 rounded-sm"
              />
              {/* Inner diamond */}
              <div
                className="absolute w-24 h-24 md:w-28 md:h-28 rotate-45 border-2 border-primary-500 rounded-sm"
              />
              {/* Core filled diamond */}
              <div
                className="absolute w-12 h-12 md:w-14 md:h-14 rotate-45 bg-primary-500/20 border border-primary-500 rounded-sm"
              />
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
