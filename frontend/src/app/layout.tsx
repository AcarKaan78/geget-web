import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | GEGET',
    default: 'GEGET — Gençlik Gelecek ve Toplum Derneği',
  },
  description: 'Sürdürülebilir bir dünya için sürdürülebilir gençlik politikaları',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
