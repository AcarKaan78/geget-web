'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Container from '@/components/ui/Container';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function CTA() {
  const t = useTranslations('home');
  const pathname = usePathname();
  const locale = pathname.split('/').filter(Boolean)[0] === 'en' ? 'en' : 'tr';

  return (
    <section className="relative bg-white py-24 md:py-32 overflow-hidden">
      <Container>
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-700 via-primary-800 to-[#050d24] px-8 py-20 md:px-20 md:py-28 text-white ring-1 ring-white/5 shadow-[0_60px_120px_-40px_rgba(10,24,53,0.6)]">
            {/* Ghost logo mark behind headline */}
            <Image
              src="/images/logo-mark.png"
              alt=""
              aria-hidden
              width={560}
              height={560}
              className="absolute -right-20 top-1/2 -translate-y-1/2 w-[30rem] md:w-[34rem] opacity-[0.14] pointer-events-none select-none"
            />

            {/* Soft glows */}
            <span
              aria-hidden
              className="absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-accent-500/25 blur-3xl"
            />
            <span
              aria-hidden
              className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-primary-400/20 blur-3xl"
            />

            <div className="relative max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-accent-300 font-semibold backdrop-blur">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-400" />
                </span>
                Birlikte
              </span>

              <h2 className="mt-6 font-heading font-bold text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-tight text-balance">
                {t('cta.title')}
                <span className="block mt-2 bg-gradient-to-r from-accent-300 via-primary-200 to-accent-400 bg-clip-text text-transparent">
                  {t('cta.description')}
                </span>
              </h2>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href={`/${locale}/iletisim`}
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm md:text-base font-semibold text-primary-900 shadow-[0_20px_40px_-15px_rgba(125,211,252,0.55)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  {t('cta.button')}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <a
                  href="mailto:info@geget.org"
                  className="group inline-flex items-center gap-2 text-sm md:text-base text-white/80 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span className="underline underline-offset-4 decoration-white/30 group-hover:decoration-white/80">
                    info@geget.org
                  </span>
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
