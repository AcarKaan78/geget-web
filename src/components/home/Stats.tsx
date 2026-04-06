'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import DiamondPattern from '@/components/ui/DiamondPattern';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

const STAT_KEYS = ['projects', 'partners', 'youth', 'cities'] as const;

export default function Stats() {
  const t = useTranslations('home');

  return (
    <section className="relative bg-gradient-to-r from-primary-800 to-primary-900 py-20 overflow-hidden">
      <DiamondPattern count={5} opacity={0.03} color="white" />

      <Container className="relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STAT_KEYS.map((key, index) => {
            const value = parseInt(t(`stats.${key}.value`), 10);
            const label = t(`stats.${key}.label`);

            return (
              <div
                key={key}
                className={`text-center ${
                  index < STAT_KEYS.length - 1
                    ? 'md:border-r md:border-white/20'
                    : ''
                }`}
              >
                <AnimatedCounter
                  target={value}
                  suffix="+"
                  className="text-5xl font-heading font-bold text-white"
                />
                <p className="text-accent-300 uppercase tracking-wide text-sm mt-2 font-body">
                  {label}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
