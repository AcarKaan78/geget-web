'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import ScrollReveal from '@/components/ui/ScrollReveal';
import DiamondPattern from '@/components/ui/DiamondPattern';

export default function YouthCities() {
  const t = useTranslations('home');

  const accessiblePoints = t.raw('youthCities.accessible.points') as string[];
  const dialoguePoints = t.raw('youthCities.dialogue.points') as string[];

  return (
    <section className="py-20 bg-neutral-50">
      <Container>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left — Decorative block */}
          <ScrollReveal direction="left">
            <div className="relative bg-primary-500 rounded-2xl p-12 -rotate-2 overflow-hidden">
              <DiamondPattern count={6} opacity={0.1} color="white" animated={false} />
              <p className="relative z-10 text-white text-3xl font-heading font-bold leading-snug">
                {t('youthCities.title')}
              </p>
            </div>
          </ScrollReveal>

          {/* Right — Description + features */}
          <ScrollReveal direction="right">
            <p className="text-neutral-600 text-lg font-body leading-relaxed mb-8">
              {t('youthCities.description')}
            </p>

            {/* Accessible Cities */}
            <div className="mb-6">
              <h3 className="font-heading font-semibold text-lg text-neutral-900 mb-3">
                {t('youthCities.accessible.title')}
              </h3>
              <ul className="space-y-2">
                {accessiblePoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-primary-500 mt-0.5 shrink-0">&#9670;</span>
                    <span className="text-neutral-600 font-body">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Youth Dialogue */}
            <div>
              <h3 className="font-heading font-semibold text-lg text-neutral-900 mb-3">
                {t('youthCities.dialogue.title')}
              </h3>
              <ul className="space-y-2">
                {dialoguePoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-primary-500 mt-0.5 shrink-0">&#9670;</span>
                    <span className="text-neutral-600 font-body">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
