import type { Metadata } from 'next';
import { Outfit, DM_Sans } from 'next/font/google';
import '@/app/globals.css';

const outfit = Outfit({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-outfit',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'GEGET — Yönetim',
  description: 'GEGET admin paneli.',
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${outfit.variable} ${dmSans.variable}`}>
      <body className="font-body antialiased bg-neutral-50 text-neutral-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}
