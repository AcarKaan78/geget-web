'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { TeamPerson } from '@/lib/team';
import { cn } from '@/lib/utils';

interface TeamMemberModalProps {
  person: TeamPerson | null;
  onClose: () => void;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? '';
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function TeamMemberModal({ person, onClose }: TeamMemberModalProps) {
  const t = useTranslations('team');
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!person) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [person, onClose]);

  const role = person ? t(`roles.${person.roleKey}`) : '';
  const hasBio = !!person?.bioKey;
  const paragraphs = hasBio
    ? (t.raw(`${person!.bioKey}.paragraphs`) as string[])
    : [];
  const taglineRaw = hasBio
    ? (t.raw(`${person!.bioKey}.tagline`) as string | undefined)
    : undefined;

  return (
    <AnimatePresence>
      {person && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-6 sm:px-6 sm:py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={person.name}
        >
          {/* Backdrop with radial primary glow + subtle grain */}
          <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(60% 50% at 50% 40%, rgba(43,94,167,0.35) 0%, rgba(10,24,53,0) 70%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.07] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.9'/></svg>\")",
            }}
          />

          {/* Modal card */}
          <motion.div
            className={cn(
              'relative w-full max-w-4xl max-h-[90vh] overflow-hidden',
              'rounded-[28px] bg-white shadow-[0_30px_80px_-15px_rgba(10,24,53,0.6)]',
              'border border-white/40'
            )}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.94, y: 24 }
            }
            animate={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.96, y: 14 }
            }
            transition={{
              type: 'spring',
              stiffness: 280,
              damping: 28,
              mass: 0.9,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Diagonal accent line top-left */}
            <span
              aria-hidden
              className="absolute -top-12 -left-12 w-56 h-56 rotate-45 bg-gradient-to-br from-accent-300/40 to-transparent pointer-events-none"
            />
            <span
              aria-hidden
              className="absolute -bottom-16 -right-16 w-72 h-72 rotate-45 bg-gradient-to-tl from-primary-100 to-transparent pointer-events-none"
            />

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label={t('modal.close')}
              className={cn(
                'absolute top-4 right-4 z-10 flex items-center justify-center',
                'w-10 h-10 rounded-full bg-neutral-900/5 hover:bg-neutral-900/10',
                'border border-neutral-200/80 text-neutral-700 transition-all',
                'hover:rotate-90 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500'
              )}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] max-h-[90vh]">
              {/* Portrait column */}
              <div
                className={cn(
                  'relative px-8 pt-12 pb-8 md:py-12 md:px-10',
                  'bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900',
                  'text-white overflow-hidden'
                )}
              >
                {/* Decorative diamonds */}
                <span
                  aria-hidden
                  className="absolute top-6 right-6 w-2 h-2 rotate-45 bg-accent-400"
                />
                <span
                  aria-hidden
                  className="absolute top-10 right-10 w-1 h-1 rotate-45 bg-accent-300"
                />
                <span
                  aria-hidden
                  className="absolute bottom-8 left-6 w-1.5 h-1.5 rotate-45 bg-primary-300/60"
                />

                {/* Sequence stamp */}
                <div className="flex items-center gap-2 mb-14 md:mb-16">
                  <span className="inline-block w-2 h-2 rotate-45 bg-accent-400" />
                  <span className="font-heading uppercase tracking-[0.22em] text-[10px] text-accent-300/90">
                    {t('modal.readBio')}
                  </span>
                </div>

                {/* Portrait diamond */}
                <div className="flex justify-center">
                  <motion.div
                    initial={reduceMotion ? false : { rotate: 0, scale: 0.85, opacity: 0 }}
                    animate={
                      reduceMotion
                        ? { opacity: 1 }
                        : { rotate: 45, scale: 1, opacity: 1 }
                    }
                    transition={{
                      delay: 0.12,
                      type: 'spring',
                      stiffness: 220,
                      damping: 22,
                    }}
                    className={cn(
                      'relative w-40 h-40 md:w-48 md:h-48 overflow-hidden rounded-md',
                      'ring-2 ring-accent-300/60 shadow-2xl',
                      'bg-gradient-to-br from-primary-400 to-primary-700'
                    )}
                  >
                    {person.image ? (
                      <div className="absolute inset-0 -rotate-45 scale-[1.42]">
                        <Image
                          src={person.image}
                          alt={person.name}
                          width={384}
                          height={384}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <span className="-rotate-45 text-white font-heading font-bold text-3xl select-none">
                          {getInitials(person.name)}
                        </span>
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Name + role on small screens shown below portrait */}
                <div className="mt-8 md:hidden">
                  <p className="font-heading uppercase tracking-[0.2em] text-[10px] text-accent-300">
                    {role}
                  </p>
                  <h2 className="font-heading font-semibold text-2xl mt-2 text-white">
                    {person.name}
                  </h2>
                </div>

                {/* Bottom signature line */}
                <div className="hidden md:block absolute bottom-8 inset-x-10">
                  <div className="h-px bg-gradient-to-r from-accent-300/60 to-transparent mb-3" />
                  <p className="font-heading uppercase tracking-[0.22em] text-[10px] text-accent-300/80">
                    GEGET
                  </p>
                </div>
              </div>

              {/* Bio column */}
              <div className="relative overflow-y-auto max-h-[90vh] md:max-h-[90vh]">
                <div className="px-8 py-10 md:px-12 md:py-14">
                  {/* Role (desktop) */}
                  <div className="hidden md:flex items-center gap-3">
                    <span className="inline-block w-1.5 h-1.5 rotate-45 bg-primary-500" />
                    <span className="font-heading uppercase tracking-[0.22em] text-[10px] text-primary-600 font-semibold">
                      {role}
                    </span>
                  </div>

                  {/* Name (desktop) */}
                  <h2 className="hidden md:block font-heading font-bold text-3xl lg:text-4xl text-neutral-900 mt-3 leading-tight">
                    {person.name}
                  </h2>

                  {/* Tagline */}
                  {taglineRaw && (
                    <motion.p
                      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className={cn(
                        'mt-5 inline-block text-sm font-medium',
                        'bg-primary-50 text-primary-800 border border-primary-100',
                        'px-3 py-1.5 rounded-full'
                      )}
                    >
                      {taglineRaw}
                    </motion.p>
                  )}

                  {/* Divider */}
                  <div className="mt-7 flex items-center gap-3">
                    <span className="h-px flex-grow bg-gradient-to-r from-primary-200 to-transparent" />
                    <span className="inline-block w-1 h-1 rotate-45 bg-accent-500" />
                    <span className="h-px w-8 bg-primary-200" />
                  </div>

                  {/* Paragraphs */}
                  <div className="mt-6 space-y-4">
                    {paragraphs.map((p, i) => (
                      <motion.p
                        key={i}
                        initial={
                          reduceMotion ? false : { opacity: 0, y: 12 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.22 + i * 0.07,
                          duration: 0.45,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className="text-neutral-700 leading-relaxed text-[15px] md:text-base"
                      >
                        {p}
                      </motion.p>
                    ))}
                  </div>
                </div>

                {/* Bottom fade */}
                <div className="sticky bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
