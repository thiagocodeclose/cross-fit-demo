import type { Metadata } from 'next';
import { Barlow_Condensed, Barlow } from 'next/font/google';
import './globals.css';

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-barlow-condensed',
});
const barlow = Barlow({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-barlow' });

export const metadata: Metadata = {
  title: 'CrossIron Athletics — Functional Fitness · CrossFit · Denver',
  description: 'Denver\'s premier CrossFit affiliate. Coached classes, barbell programming, and a community that shows up — every single day.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${barlow.variable}`}>
      <body>{children}</body>
    </html>
  );
}
