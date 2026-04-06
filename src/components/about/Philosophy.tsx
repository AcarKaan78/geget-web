'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface PhilosophyStep {
  key: string;
  number: number;
}

const STEPS: PhilosophyStep[] = [
  { key: 'think', number: 1 },
  { key: 'design', number: 2 },
  { key: 'implement', number: 3 },
];

export default function Philosophy() {
  const t = useTranslations('about');

  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionHeader
          overline={t('philosophy.overline')}
          title={t('philosophy.title')}
        />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-8 md:gap-0 mt-16">
          {STEPS.map((step, index) => (
            <React.Fragment key={step.key}>
              <ScrollReveal delay={index * 0.15} className="flex-1 flex flex-col items-center text-center">
                {/* Diamond-shaped step number */}
                <div className="w-16 h-16 rotate-45 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center rounded-sm shadow-lg">
                  <span className="-rotate-45 text-white font-bold text-xl font-heading">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-heading font-semibold text-xl mt-6 text-neutral-900">
                  {t(`philosophy.steps.${step.key}.title`)}
                </h3>

                <p className="text-neutral-500 mt-2 font-body max-w-xs">
                  {t(`philosophy.steps.${step.key}.description`)}
                </p>
              </ScrollReveal>

              {/* Connecting dashed line between steps (desktop only) */}
              {index < STEPS.length - 1 && (
                <div className="hidden md:block w-24 lg:w-32 border-t-2 border-dashed border-primary-200 mt-[-2rem] self-center flex-shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </Container>
    </section>
  );
}
