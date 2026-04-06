import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GEGET — Gençlik Gelecek ve Toplum Derneği',
  description: 'Sürdürülebilir bir dünya için sürdürülebilir gençlik politikaları',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
