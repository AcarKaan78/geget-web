'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Container from '@/components/ui/Container';
import NoiseOverlay from '@/components/ui/NoiseOverlay';

const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease },
  }),
};

export default function Hero() {
  const t = useTranslations('home.hero');
  const pathname = usePathname();
  const locale = pathname.split('/').filter(Boolean)[0] === 'en' ? 'en' : 'tr';

  const titleLead = t('titleLead');
  const titleAccent = t('titleAccent');
  const credentials = (t.raw('credentials') as string[]) ?? [];

  const { scrollY } = useScroll();
  const scrollCueOpacity = useTransform(scrollY, [0, 220], [1, 0]);

  return (
    <section
      className="relative isolate flex items-end min-h-[100svh] overflow-hidden pt-32 pb-28 md:pb-36 lg:pb-40 text-white"
      style={{
        backgroundImage:
          'radial-gradient(120% 70% at 78% 8%, rgba(56,189,248,0.22) 0%, rgba(56,189,248,0) 55%), radial-gradient(90% 70% at 12% 95%, rgba(43,94,167,0.45) 0%, rgba(10,24,53,0) 60%), linear-gradient(180deg, #0A1835 0%, #091430 55%, #050d24 100%)',
      }}
    >
      {/* Diamond grid, masked to fade at edges */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(45deg, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(-45deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 50%, #000 35%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 50%, #000 35%, transparent 80%)',
        }}
      />

      {/* Drifting ambient orbs */}
      <motion.span
        aria-hidden
        className="absolute -top-24 -left-32 w-[34rem] h-[34rem] rounded-full bg-primary-500/25 blur-3xl"
        animate={{ x: [0, 40, -20, 0], y: [0, 20, -10, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.span
        aria-hidden
        className="absolute -bottom-40 -right-32 w-[30rem] h-[30rem] rounded-full bg-accent-500/20 blur-3xl"
        animate={{ x: [0, -30, 10, 0], y: [0, -20, 15, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
      />

      <NoiseOverlay opacity={0.08} blend="overlay" />

      <Container className="relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-6 items-end">
          {/* Left: copy */}
          <div className="lg:col-span-7 xl:col-span-7">
            {/* Eyebrow pill */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0.05}
              variants={fadeUp}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur px-3.5 py-1.5 text-[11px] uppercase tracking-[0.22em] font-medium text-white/80"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
              </span>
              {t('eyebrow')}
            </motion.div>

            {/* Headline — line-by-line reveal, natural whitespace, descender room */}
            <h1 className="mt-6 font-heading font-extrabold tracking-tight text-balance leading-[1.04] pb-1 text-[clamp(2.25rem,5.4vw,5rem)]">
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease }}
                className="block"
              >
                {titleLead}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, ease }}
                className="block bg-gradient-to-r from-accent-300 via-primary-200 to-accent-400 bg-clip-text text-transparent pb-1"
              >
                {titleAccent}
              </motion.span>
            </h1>

            {/* Lede */}
            <motion.p
              initial="hidden"
              animate="visible"
              custom={0.55}
              variants={fadeUp}
              className="mt-7 max-w-xl text-base md:text-lg text-white/75 leading-relaxed font-body"
            >
              {t('lede')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0.7}
              variants={fadeUp}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Link
                href={`/${locale}/projeler`}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm md:text-base font-semibold text-primary-900 shadow-[0_10px_30px_-10px_rgba(125,211,252,0.45)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                {t('ctaPrimary')}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href={`/${locale}/hakkimizda`}
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm md:text-base font-semibold text-white backdrop-blur hover:bg-white/10 transition-colors"
              >
                {t('ctaSecondary')}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>

            {/* Credentials strip */}
            {credentials.length > 0 && (
              <motion.ul
                initial="hidden"
                animate="visible"
                custom={0.9}
                variants={fadeUp}
                className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.2em] text-white/55 font-body"
              >
                {credentials.map((c, i) => (
                  <li key={c} className="flex items-center gap-3">
                    {i > 0 && (
                      <span aria-hidden className="text-accent-300/60">
                        ◆
                      </span>
                    )}
                    <span>{c}</span>
                  </li>
                ))}
              </motion.ul>
            )}
          </div>

          {/* Right: brand mark composition */}
          <div className="lg:col-span-5 xl:col-span-5 hidden lg:flex justify-center items-center">
            <div className="relative flex items-center justify-center w-full aspect-square max-w-[520px]">
              {/* Concentric ghost diamonds */}
              {[1.12, 1.32, 1.58].map((s, i) => (
                <motion.span
                  key={i}
                  aria-hidden
                  className="absolute rounded-md border border-white/10"
                  style={{ width: `${s * 58}%`, height: `${s * 58}%`, transform: 'rotate(45deg)' }}
                  animate={{ rotate: [45, 55, 45] }}
                  transition={{ duration: 14 + i * 6, repeat: Infinity, ease: 'easeInOut' }}
                />
              ))}

              {/* Central glow */}
              <span
                aria-hidden
                className="absolute inset-[18%] rounded-full blur-3xl"
                style={{
                  background:
                    'radial-gradient(circle, rgba(56,189,248,0.55) 0%, rgba(56,189,248,0) 65%)',
                }}
              />

              {/* The cropped logo mark */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                transition={{
                  opacity: { duration: 1.1, ease },
                  scale: { duration: 1.1, ease },
                  y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="relative z-10 w-[70%]"
              >
                <Image
                  src="/images/logo-mark.png"
                  alt="GEGET"
                  width={520}
                  height={520}
                  priority
                  className="w-full h-auto drop-shadow-[0_30px_60px_rgba(14,165,233,0.35)]"
                />
              </motion.div>

              {/* Orbiting accents */}
              <motion.span
                aria-hidden
                className="absolute w-3 h-3 rotate-45 bg-accent-400 rounded-sm"
                style={{ top: '6%', left: '50%' }}
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.span
                aria-hidden
                className="absolute w-2 h-2 rotate-45 bg-white/80 rounded-sm"
                style={{ bottom: '12%', right: '10%' }}
                animate={{ y: [0, -16, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              />
            </div>
          </div>
        </div>

      </Container>

      {/* Bottom elegant fade to the next section (white) */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none"
      />

      {/* Scroll cue — fixed to viewport, fades out as user scrolls past the hero */}
      <motion.div
        style={{ opacity: scrollCueOpacity }}
        className="fixed left-1/2 -translate-x-1/2 bottom-6 z-20 flex flex-col items-center gap-2 text-white/70 mix-blend-difference pointer-events-none"
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-body">
          {t('scrollDown')}
        </span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </motion.div>
    </section>
  );
}
