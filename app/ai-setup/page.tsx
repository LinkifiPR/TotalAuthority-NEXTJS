import type { Metadata } from 'next';
import AiSetupEnginePage from '@/components/ai/AiSetupEnginePage';

export const metadata: Metadata = {
  title: 'AI Setup Engine | Total Authority',
  description:
    'Set up your website for AI discovery in one click. Generate AI info page content, robots.txt guidance, schema suggestions, and implementation instructions.',
  alternates: {
    canonical: '/ai-setup',
  },
  openGraph: {
    title: 'AI Setup Engine | Total Authority',
    description:
      'Scan your site and generate the pages, files, and implementation steps that help AI systems understand your business.',
    url: '/ai-setup',
    type: 'website',
  },
};

export default function AiSetupPage() {
  return <AiSetupEnginePage />;
}
