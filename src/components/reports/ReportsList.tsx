'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FileText, ImageIcon, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Container from '@/components/ui/Container';
import type { ReportEntry } from '@/lib/reports/types';

interface ReportsListProps {
  reports: ReportEntry[];
  locale: 'tr' | 'en';
}

const MONTHS_TR = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
];
const MONTHS_EN = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function formatDate(iso: string, locale: 'tr' | 'en'): string {
  const d = new Date(iso);
  const day = d.getDate();
  const month = (locale === 'tr' ? MONTHS_TR : MONTHS_EN)[d.getMonth()];
  return `${day} ${month} ${d.getFullYear()}`;
}

function groupByYear(reports: ReportEntry[]) {
  const groups = new Map<number, ReportEntry[]>();
  for (const r of reports) {
    const y = new Date(r.uploadedAt).getFullYear();
    if (!groups.has(y)) groups.set(y, []);
    groups.get(y)!.push(r);
  }
  return Array.from(groups.entries()).sort((a, b) => b[0] - a[0]);
}

export default function ReportsList({ reports, locale }: ReportsListProps) {
  const t = useTranslations('reports');
  const reduceMotion = useReducedMotion();
  const grouped = useMemo(() => groupByYear(reports), [reports]);

  if (reports.length === 0) {
    return <EmptyState />;
  }

  let runningIndex = reports.length;

  return (
    <section className="relative bg-white">
      <Container>
        <div className="py-20 lg:py-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] font-semibold text-primary-600">
              <span className="h-px w-8 bg-primary-300" />
              {t('overline')}
            </span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl font-bold text-primary-900 leading-tight">
              {t('subtitle')}
            </h2>
            <p className="mt-4 text-neutral-500 leading-relaxed">
              {t('lead')}
            </p>
          </div>

          <div className="mt-16 space-y-16">
            {grouped.map(([year, items], groupIdx) => (
              <div key={year} className="relative">
                <div className="grid grid-cols-12 items-baseline gap-6 border-b border-neutral-200 pb-4 mb-2">
                  <div className="col-span-12 md:col-span-2">
                    <motion.span
                      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.5, delay: groupIdx * 0.05 }}
                      className="block font-heading text-4xl md:text-5xl font-bold text-primary-900 tabular-nums"
                    >
                      {year}
                    </motion.span>
                  </div>
                  <div className="col-span-12 md:col-span-10 text-xs uppercase tracking-[0.24em] text-neutral-400 hidden md:flex items-center gap-6">
                    <span>{t('colNo')}</span>
                    <span className="flex-1">{t('colTitle')}</span>
                    <span>{t('colDate')}</span>
                  </div>
                </div>

                <ul>
                  {items.map((report, idx) => {
                    const index = runningIndex--;
                    return (
                      <ReportRow
                        key={report.id}
                        report={report}
                        locale={locale}
                        index={index}
                        delay={(idx % 5) * 0.04}
                      />
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function ReportRow({
  report,
  locale,
  index,
  delay,
}: {
  report: ReportEntry;
  locale: 'tr' | 'en';
  index: number;
  delay: number;
}) {
  const reduceMotion = useReducedMotion();
  const title =
    locale === 'en' && report.titleEn ? report.titleEn : report.titleTr;
  const Icon = report.type === 'pdf' ? FileText : ImageIcon;
  const typeLabel = report.type === 'pdf' ? 'PDF' : 'IMG';

  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative"
    >
      <Link
        href={`/${locale}/raporlar/${report.slug}`}
        className="relative grid grid-cols-12 items-center gap-x-4 md:gap-x-6 gap-y-2 py-6 md:py-7 border-b border-neutral-200/80 transition-colors duration-300 hover:bg-neutral-50/60 -mx-3 px-3 rounded-lg"
      >
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute left-3 right-3 bottom-0 h-[2px] origin-left',
            'bg-gradient-to-r from-primary-600 via-accent-400 to-accent-300',
            'scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out',
          )}
        />

        <span className="col-span-2 md:col-span-2 flex items-center gap-2 font-heading text-xs md:text-sm tabular-nums text-primary-500/80">
          <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-400">
            №
          </span>
          <span className="font-semibold text-primary-700">
            {String(index).padStart(3, '0')}
          </span>
        </span>

        <span className="col-span-10 md:col-span-7 min-w-0">
          <span className="block font-heading text-lg md:text-xl font-semibold text-primary-900 leading-snug">
            {title}
          </span>
          <span className="mt-1 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-neutral-400">
            <Icon className="h-3.5 w-3.5" aria-hidden />
            {typeLabel}
          </span>
        </span>

        <span className="col-span-7 md:col-span-2 text-sm text-neutral-500 tabular-nums">
          {formatDate(report.uploadedAt, locale)}
        </span>

        <span className="col-span-5 md:col-span-1 flex justify-end">
          <span
            className={cn(
              'inline-flex h-9 w-9 items-center justify-center rounded-full',
              'border border-neutral-200 text-primary-700',
              'transition-all duration-300',
              'group-hover:bg-primary-700 group-hover:text-white group-hover:border-primary-700',
              'group-hover:translate-x-0.5 group-hover:-translate-y-0.5',
            )}
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </span>
      </Link>
    </motion.li>
  );
}

function EmptyState() {
  const t = useTranslations('reports');
  return (
    <section className="bg-white">
      <Container>
        <div className="py-28 flex flex-col items-center text-center">
          <div className="relative h-32 w-32 mb-10">
            <div className="absolute inset-0 rotate-45 border-2 border-primary-200/60 rounded-md" />
            <div className="absolute inset-3 rotate-45 border border-primary-300/50 rounded-md" />
            <div className="absolute inset-6 rotate-45 bg-primary-50 rounded-sm" />
            <FileText className="absolute inset-0 m-auto h-8 w-8 text-primary-500" />
          </div>
          <h3 className="font-heading text-2xl font-semibold text-primary-900">
            {t('empty.title')}
          </h3>
          <p className="mt-3 text-neutral-500 max-w-sm">
            {t('empty.description')}
          </p>
        </div>
      </Container>
    </section>
  );
}
