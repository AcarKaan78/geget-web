'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import DiamondPattern from '@/components/ui/DiamondPattern';
import Button from '@/components/ui/Button';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

export default function Hero() {
  const t = useTranslations('home');
  const tc = useTranslations('common');

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 to-primary-700 overflow-hidden">
      {/* Diamond pattern background */}
      <DiamondPattern count={8} opacity={0.05} color="white" animated />

      {/* Additional floating diamonds for extra depth */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute w-72 h-72 border border-white/[0.03] rotate-45 animate-float"
          style={{ top: '10%', left: '5%', animationDuration: '10s' }}
        />
        <div
          className="absolute w-48 h-48 border border-white/[0.04] rotate-45 animate-float"
          style={{ top: '60%', right: '8%', animationDelay: '3s', animationDuration: '8s' }}
        />
        <div
          className="absolute w-36 h-36 border border-white/[0.03] rotate-45 animate-float"
          style={{ top: '30%', right: '20%', animationDelay: '5s', animationDuration: '12s' }}
        />
      </div>

      {/* Content */}
      <Container className="relative z-10 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Logo text */}
          <motion.h1
            custom={0}
            variants={fadeUp}
            className="text-6xl md:text-7xl font-heading font-bold text-white tracking-wider mb-8"
          >
            GEGET
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            custom={0.2}
            variants={fadeUp}
            className="text-accent-300 text-lg font-body"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* Main heading */}
          <motion.h2
            custom={0.4}
            variants={fadeUp}
            className="text-2xl md:text-4xl lg:text-5xl text-white font-heading font-bold max-w-4xl mt-8 leading-tight"
          >
            {t('hero.title')}
          </motion.h2>

          {/* Buttons */}
          <motion.div
            custom={0.6}
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-4 mt-10"
          >
            <Button
              variant="outline"
              size="lg"
              href="/hakkimizda"
              className="text-white border-white hover:bg-white/10"
            >
              {tc('cta.aboutUs')}
            </Button>
            <Button
              variant="primary"
              size="lg"
              href="/iletisim"
              className="bg-accent-500 hover:bg-accent-400 text-white"
            >
              {tc('cta.contact')}
            </Button>
          </motion.div>

          {/* Scroll down indicator */}
          <motion.div
            custom={0.8}
            variants={fadeUp}
            className="mt-16"
          >
            <span className="sr-only">{t('hero.scrollDown')}</span>
            <ChevronDown className="w-8 h-8 text-white/60 animate-bounce mx-auto" />
          </motion.div>
        </motion.div>
      </Container>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
