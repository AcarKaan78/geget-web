'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, MessageSquare } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function YouthCities() {
  const t = useTranslations('home');

  const accessiblePoints = t.raw('youthCities.accessible.points') as string[];
  const dialoguePoints = t.raw('youthCities.dialogue.points') as string[];

  return (
    <section className="relative py-24 md:py-32 bg-neutral-50 overflow-hidden">
      {/* Backdrop decoration */}
      <div
        aria-hidden
        className="absolute -top-24 right-0 w-[36rem] h-[36rem] rounded-full bg-accent-300/20 blur-3xl"
      />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: feature panel */}
          <ScrollReveal direction="left" className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-primary-700 via-primary-800 to-[#050d24] p-10 ring-1 ring-white/5 shadow-[0_40px_80px_-40px_rgba(10,24,53,0.6)]">
              {/* Noise-ish diamond pattern via gradient grid */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.18]"
                style={{
                  backgroundImage:
                    'linear-gradient(45deg, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(-45deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '56px 56px',
                }}
              />

              {/* Logo watermark */}
              <Image
                src="/images/logo-mark.png"
                alt=""
                aria-hidden
                width={380}
                height={380}
                className="absolute -right-16 -bottom-12 w-72 opacity-25 pointer-events-none select-none"
              />

              {/* Glow */}
              <span
                aria-hidden
                className="absolute -top-20 -left-16 w-64 h-64 rounded-full bg-accent-500/30 blur-3xl"
              />

              <div className="relative flex h-full flex-col">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-accent-300 font-semibold backdrop-blur">
                  <MapPin className="h-3 w-3" />
                  Program
                </span>

                <h3 className="mt-auto font-heading font-bold text-white text-3xl md:text-4xl leading-tight tracking-tight text-balance">
                  {t('youthCities.title')}
                </h3>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: description + points */}
          <ScrollReveal direction="right" className="lg:col-span-7">
            <p className="text-neutral-700 text-lg md:text-xl font-body leading-relaxed">
              {t('youthCities.description')}
            </p>

            <div className="mt-10 grid md:grid-cols-2 gap-8 md:gap-10">
              <PointGroup
                icon={<MapPin className="h-4 w-4" />}
                title={t('youthCities.accessible.title')}
                points={accessiblePoints}
              />
              <PointGroup
                icon={<MessageSquare className="h-4 w-4" />}
                title={t('youthCities.dialogue.title')}
                points={dialoguePoints}
              />
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}

function PointGroup({
  icon,
  title,
  points,
}: {
  icon: React.ReactNode;
  title: string;
  points: string[];
}) {
  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-9 w-9 rotate-45 items-center justify-center rounded-md bg-primary-100 text-primary-700">
          <span className="-rotate-45">{icon}</span>
        </span>
        <h3 className="font-heading font-semibold text-lg text-neutral-900">
          {title}
        </h3>
      </div>

      <ul className="mt-5 space-y-3 border-l border-primary-100 pl-5">
        {points.map((point, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="flex items-start gap-3 text-neutral-600 font-body"
          >
            <span
              aria-hidden
              className="mt-1.5 h-2 w-2 rotate-45 bg-primary-500 shrink-0"
            />
            <span>{point}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
