'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function Mission() {
  const t = useTranslations('home');

  return (
    <section className="relative py-24 md:py-32 bg-neutral-50 overflow-hidden">
      {/* Background decoration */}
      <div
        aria-hidden
        className="absolute -top-32 -right-40 w-[38rem] h-[38rem] rounded-full bg-primary-100/60 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-40 w-[32rem] h-[32rem] rounded-full bg-accent-300/20 blur-3xl"
      />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-16 items-center">
          {/* Left: editorial copy */}
          <ScrollReveal direction="left" className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary-600">
              <span className="h-px w-6 bg-primary-400" />
              {t('mission.overline')}
            </span>

            <div className="relative mt-16 md:mt-20">
              <span
                aria-hidden
                className="absolute -left-2 -top-12 md:-left-4 md:-top-16 font-heading text-[7rem] md:text-[9rem] leading-none text-primary-200/80 select-none pointer-events-none"
              >
                &#8220;
              </span>
              <blockquote className="relative">
                <p className="font-heading font-bold text-neutral-900 text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.1] tracking-tight text-balance">
                  {t('mission.quote')}
                </p>
              </blockquote>
            </div>

            <p className="mt-8 max-w-xl text-neutral-600 text-lg font-body leading-relaxed">
              {t('mission.description')}
            </p>

            {/* Three principle chips */}
            <div className="mt-10 flex flex-wrap gap-2.5">
              {['Katılımcılık', 'Kapsayıcılık', 'Sürdürülebilirlik'].map((k) => (
                <span
                  key={k}
                  className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-4 py-1.5 text-xs font-semibold text-primary-700"
                >
                  <span className="h-1.5 w-1.5 rotate-45 bg-primary-500" />
                  {k}
                </span>
              ))}
            </div>
          </ScrollReveal>

          {/* Right: logo composition */}
          <ScrollReveal direction="right" className="lg:col-span-5">
            <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center">
              {/* Soft radial glow */}
              <span
                aria-hidden
                className="absolute inset-[10%] rounded-full blur-2xl"
                style={{
                  background:
                    'radial-gradient(circle, rgba(43,94,167,0.25) 0%, rgba(43,94,167,0) 65%)',
                }}
              />

              {/* Concentric diamonds */}
              {[1, 1.25, 1.55].map((s, i) => (
                <motion.span
                  key={i}
                  aria-hidden
                  className="absolute border rounded-md"
                  style={{
                    width: `${s * 56}%`,
                    height: `${s * 56}%`,
                    transform: 'rotate(45deg)',
                    borderColor:
                      i === 0
                        ? 'rgba(43,94,167,0.55)'
                        : i === 1
                          ? 'rgba(43,94,167,0.3)'
                          : 'rgba(43,94,167,0.18)',
                  }}
                  animate={{ rotate: [45, 55, 45] }}
                  transition={{ duration: 12 + i * 4, repeat: Infinity, ease: 'easeInOut' }}
                />
              ))}

              {/* Logo */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 w-[58%]"
              >
                <Image
                  src="/images/logo-mark.png"
                  alt="GEGET"
                  width={420}
                  height={420}
                  className="w-full h-auto drop-shadow-[0_24px_50px_rgba(43,94,167,0.28)]"
                />
              </motion.div>

              {/* Small floating accent */}
              <span
                aria-hidden
                className="absolute right-4 top-6 h-2.5 w-2.5 rotate-45 bg-accent-500"
              />
              <span
                aria-hidden
                className="absolute left-2 bottom-10 h-1.5 w-1.5 rotate-45 bg-primary-400"
              />
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
