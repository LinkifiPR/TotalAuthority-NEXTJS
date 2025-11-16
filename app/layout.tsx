import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Total Authority - PR & Marketing Visibility Tool',
  description: 'Comprehensive PR and Marketing visibility tool for businesses. Get AI-powered audits, visibility gap analysis, and strategic blueprints.',
  keywords: ['PR', 'marketing', 'visibility', 'LLM', 'AI', 'audit', 'business'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
