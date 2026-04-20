'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import NoiseOverlay from '@/components/ui/NoiseOverlay';

const STAT_KEYS = ['projects', 'partners', 'youth', 'cities'] as const;

export default function Stats() {
  const t = useTranslations('home');

  return (
    <section
      className="relative overflow-hidden py-24 md:py-32 text-white"
      style={{
        backgroundImage:
          'radial-gradient(120% 80% at 20% 10%, rgba(56,189,248,0.18) 0%, rgba(10,24,53,0) 55%), linear-gradient(180deg, #0A1835 0%, #050d24 100%)',
      }}
    >
      {/* Diamond lattice */}
      <motion.div
        aria-hidden
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            'linear-gradient(45deg, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(-45deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
        animate={{ backgroundPosition: ['0px 0px', '72px 72px'] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />

      {/* Blur orbs */}
      <span
        aria-hidden
        className="absolute -bottom-40 left-1/4 w-[32rem] h-[32rem] rounded-full bg-primary-500/20 blur-3xl"
      />

      <NoiseOverlay opacity={0.06} blend="overlay" />

      <Container className="relative z-10">
        {/* Framing header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-accent-300">
            <span className="h-px w-6 bg-accent-300/60" />
            2024 — 2026
            <span className="h-px w-6 bg-accent-300/60" />
          </span>
          <h2 className="mt-4 font-heading font-bold text-3xl md:text-4xl tracking-tight">
            Rakamlarla GEGET
          </h2>
        </div>

        <div className="mt-14 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-y-10">
          {STAT_KEYS.map((key, index) => {
            const value = parseInt(t(`stats.${key}.value`), 10);
            const label = t(`stats.${key}.label`);
            const isLast = index === STAT_KEYS.length - 1;

            return (
              <div
                key={key}
                className={`relative px-4 md:px-6 text-center ${
                  isLast ? '' : 'md:border-r md:border-white/10'
                }`}
              >
                <AnimatedCounter
                  target={value}
                  suffix="+"
                  className="block font-heading font-extrabold text-white text-5xl md:text-6xl lg:text-7xl tracking-tight leading-none"
                />
                <div className="mt-4 flex items-center justify-center gap-2">
                  <span className="h-1 w-1 rotate-45 bg-accent-400" />
                  <p className="text-[11px] md:text-xs uppercase tracking-[0.3em] text-white/65 font-body">
                    {label}
                  </p>
                  <span className="h-1 w-1 rotate-45 bg-accent-400" />
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
