import type { Metadata } from 'next';
import MedSpasClient from './MedSpasClient';
import { siteUrl } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'AI Visibility and Authority Building for Med Spas | TotalAuthority',
  description:
    'See how your med spa appears across ChatGPT, Gemini and Perplexity, then build the media coverage, citations, content and external authority needed to become more visible and recommendable.',
  alternates: {
    canonical: '/med-spas',
  },
  openGraph: {
    title: 'AI Visibility and Authority Building for Med Spas | TotalAuthority',
    description:
      'See how your med spa appears across ChatGPT, Gemini and Perplexity. Audit, strategy and execution from TotalAuthority.',
    url: `${siteUrl}/med-spas`,
    type: 'website',
  },
};

export default function MedSpasPage() {
  return <MedSpasClient />;
}
