'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { galleryItems } from '@/lib/gallery';
import Container from '@/components/ui/Container';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import { cn } from '@/lib/utils';

export default function GalleryGrid() {
  const t = useTranslations('gallery');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const open = (index: number) => setActiveIndex(index);
  const close = useCallback(() => setActiveIndex(null), []);

  const prev = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current - 1 + galleryItems.length) % galleryItems.length;
    });
  }, []);

  const next = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current + 1) % galleryItems.length;
    });
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };

    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeIndex, close, prev, next]);

  const active = activeIndex !== null ? galleryItems[activeIndex] : null;

  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-16">
          {galleryItems.map((item, index) => {
            const caption = t(`items.${item.captionKey}`);
            return (
              <ScrollReveal key={item.slug} delay={(index % 8) * 0.05}>
                <button
                  type="button"
                  onClick={() => open(index)}
                  className={cn(
                    'group relative block w-full aspect-[4/3] overflow-hidden rounded-xl',
                    'bg-neutral-100 border border-neutral-200 shadow-sm',
                    'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
                    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
                  )}
                  aria-label={caption}
                >
                  <Image
                    src={item.src}
                    alt={caption}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-left translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-white font-heading font-semibold text-sm line-clamp-2">
                      {caption}
                    </span>
                  </div>
                </button>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={t(`items.${active.captionKey}`)}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label={t('close')}
            >
              <X className="h-6 w-6" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-2 md:left-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label={t('previous')}
            >
              <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-2 md:right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label={t('next')}
            >
              <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
            </button>

            <motion.div
              key={active.slug}
              className="relative w-[92vw] h-[85vh] max-w-6xl"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={active.src}
                alt={t(`items.${active.captionKey}`)}
                fill
                sizes="92vw"
                className="object-contain"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-heading font-medium text-center">
                  {t(`items.${active.captionKey}`)}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
