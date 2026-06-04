import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import ReportViewer from '@/components/reports/ReportViewer';
import { readManifest } from '@/lib/reports/storage';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const manifest = await readManifest();
  const report = manifest.reports.find((r) => r.slug === slug);
  if (!report) return { title: 'GEGET' };
  const title =
    locale === 'en' && report.titleEn ? report.titleEn : report.titleTr;
  return {
    title: `${title} — GEGET`,
    alternates: {
      canonical: `https://www.geget.org/${locale}/raporlar/${slug}`,
    },
  };
}

export default async function ReportViewerPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const manifest = await readManifest();
  const report = manifest.reports.find((r) => r.slug === slug);
  if (!report) notFound();

  const safeLocale: 'tr' | 'en' = locale === 'en' ? 'en' : 'tr';
  return <ReportViewer report={report} locale={safeLocale} />;
}
