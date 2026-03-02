'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function Hero() {
  const t = useTranslations('home.hero');

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-primary-800 via-primary-900 to-[#060d1f]">
      {/* Decorative geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Large diamond */}
        <div className="absolute -top-20 -right-20 h-80 w-80 rotate-45 rounded-3xl border border-white/[0.06] bg-white/[0.02]" />

        {/* Medium diamond */}
        <div className="absolute top-1/4 -left-16 h-48 w-48 rotate-45 rounded-2xl border border-white/[0.05] bg-white/[0.015]" />

        {/* Small diamond cluster - right */}
        <div className="absolute bottom-1/3 right-1/4 h-24 w-24 rotate-45 rounded-xl border border-white/[0.07] bg-white/[0.02]" />
        <div className="absolute bottom-1/4 right-[20%] h-16 w-16 rotate-45 rounded-lg border border-white/[0.05]" />

        {/* Accent diamond */}
        <div className="absolute top-1/3 right-[15%] h-32 w-32 rotate-45 rounded-2xl border border-accent-400/[0.08] bg-accent-400/[0.02]" />

        {/* Bottom left cluster */}
        <div className="absolute -bottom-12 left-1/4 h-40 w-40 rotate-45 rounded-2xl border border-white/[0.04] bg-white/[0.01]" />

        {/* Subtle gradient orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary-600/10 blur-3xl" />
        <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-accent-500/5 blur-3xl" />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="section-container relative z-10 flex flex-col items-center py-20 text-center"
      >
        {/* Logo */}
        <motion.div variants={itemVariants} className="mb-8">
          <Image
            src="/images/logo-color.png"
            alt="GEGET Logo"
            width={100}
            height={100}
            className="h-24 w-24 object-contain brightness-0 invert drop-shadow-2xl sm:h-28 sm:w-28"
            priority
          />
        </motion.div>

        {/* Subtitle - Association name */}
        <motion.p
          variants={itemVariants}
          className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-accent-400 sm:text-base"
        >
          {t('subtitle')}
        </motion.p>

        {/* Main heading */}
        <motion.h1
          variants={itemVariants}
          className="max-w-4xl font-heading text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
        >
          {t('title')}
        </motion.h1>

        {/* Decorative line */}
        <motion.div
          variants={itemVariants}
          className="mt-8 h-1 w-20 rounded-full bg-gradient-to-r from-accent-400 to-primary-400"
        />

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-5"
        >
          <Link
            href="/hakkimizda"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl border-2 border-white/30 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-primary-800"
          >
            {t('ctaAbout')}
          </Link>
          <Link
            href="/iletisim"
            className="inline-flex items-center justify-center rounded-xl bg-accent-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent-500/25 transition-all duration-300 hover:bg-accent-600 hover:shadow-xl hover:shadow-accent-500/30"
          >
            {t('ctaContact')}
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll down indicator */}
      <motion.button
        onClick={scrollToContent}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 transition-colors duration-300 hover:text-white/80"
        aria-label="Scroll down"
      >
        <span className="text-xs font-medium uppercase tracking-widest">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.button>
    </section>
  );
}
