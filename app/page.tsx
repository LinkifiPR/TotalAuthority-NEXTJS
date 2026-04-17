import type { Metadata } from 'next';
import HomePage from '@/components/HomePage';

export const metadata: Metadata = {
  title: 'Total Authority - AI Visibility',
  description: 'Total Authority helps businesses improve their AI visibility. Get AI-powered audits, visibility gap analysis, and strategic blueprints.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Total Authority - AI Visibility',
    description: 'Total Authority helps businesses improve their AI visibility. Get AI-powered audits, visibility gap analysis, and strategic blueprints.',
    url: '/',
    type: 'website',
  },
};

export default function Page() {
  return <HomePage />;
}
