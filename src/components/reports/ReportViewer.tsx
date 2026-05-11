'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  ChevronLeft,
  ExternalLink,
  Download,
  FileText,
  ImageIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ReportEntry } from '@/lib/reports/types';

interface ReportViewerProps {
  report: ReportEntry;
  locale: 'tr' | 'en';
}

export default function ReportViewer({ report, locale }: ReportViewerProps) {
  const t = useTranslations('reports.viewer');
  const title =
    locale === 'en' && report.titleEn ? report.titleEn : report.titleTr;
  const Icon = report.type === 'pdf' ? FileText : ImageIcon;
  const typeLabel = report.type === 'pdf' ? 'PDF' : t('imageLabel');

  return (
    <div className="bg-neutral-100 min-h-screen flex flex-col">
      <div className="sticky top-16 md:top-20 z-30 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
          <Link
            href={`/${locale}/raporlar`}
            className="group inline-flex items-center gap-1.5 text-sm text-neutral-600 hover:text-primary-700 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">{t('back')}</span>
          </Link>

          <div className="hidden md:block h-5 w-px bg-neutral-200" />

          <div className="flex-1 min-w-0 flex items-center gap-2">
            <span
              className={cn(
                'inline-flex items-center gap-1 rounded-full',
                'bg-primary-50 text-primary-700 border border-primary-100',
                'px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] font-semibold',
              )}
            >
              <Icon className="h-3 w-3" />
              {typeLabel}
            </span>
            <h1 className="truncate font-heading text-sm md:text-base font-semibold text-primary-900">
              {title}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={report.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5',
                'text-xs font-semibold text-primary-700',
                'border border-neutral-200 hover:border-primary-300 hover:bg-primary-50',
                'transition-colors',
              )}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{t('openNewTab')}</span>
            </a>
            <a
              href={report.fileUrl}
              download={report.fileName}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5',
                'text-xs font-semibold bg-primary-700 text-white',
                'hover:bg-primary-800 transition-colors',
              )}
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{t('download')}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex-1 flex">
          {report.type === 'pdf' ? (
            <iframe
              src={`${report.fileUrl}#view=FitH`}
              title={title}
              className="w-full h-[80vh] md:h-[calc(100vh-9rem)] rounded-xl border border-neutral-200 bg-white shadow-sm"
            />
          ) : (
            <div className="w-full flex items-center justify-center rounded-xl border border-neutral-200 bg-white shadow-sm p-4 md:p-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={report.fileUrl}
                alt={title}
                className="max-h-[80vh] md:max-h-[calc(100vh-12rem)] w-auto object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
