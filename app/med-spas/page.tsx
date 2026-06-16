import type { Metadata } from 'next';
import MedSpasClient from './MedSpasClient';
import { siteUrl } from '@/lib/siteConfig';
import { MED_SPA_FAQS } from './faqData';

const pageUrl = `${siteUrl}/med-spas`;
const ogImage = `${siteUrl}/total-authority-logo.png`;

const title = 'AI Visibility & Authority Building for Med Spas | TotalAuthority';
const description =
  'See how your med spa appears across ChatGPT, Gemini and Perplexity, then build the media coverage, citations, content and external authority needed to become more visible and recommendable.';

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'med spa AI visibility',
    'AI visibility audit',
    'med spa marketing',
    'ChatGPT med spa recommendations',
    'medical aesthetics SEO',
    'digital PR for med spas',
    'generative engine optimization',
    'answer engine optimization',
    'Botox clinic marketing',
    'med spa authority building',
  ],
  alternates: {
    canonical: '/med-spas',
  },
  openGraph: {
    title,
    description,
    url: pageUrl,
    siteName: 'TotalAuthority',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: ogImage,
        width: 601,
        height: 200,
        alt: 'TotalAuthority — AI Visibility for Med Spas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [ogImage],
  },
};

// Structured data: Service + breadcrumbs + FAQ (rich result eligible).
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${pageUrl}#service`,
      name: 'AI Visibility and Authority Building for Med Spas',
      serviceType: 'AI visibility audit, digital PR and authority building',
      description,
      url: pageUrl,
      provider: {
        '@type': 'Organization',
        name: 'TotalAuthority',
        url: siteUrl,
        logo: ogImage,
      },
      areaServed: ['United Kingdom', 'United States'],
      audience: {
        '@type': 'BusinessAudience',
        name: 'Med spas and medical aesthetics clinics',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Med Spas', item: pageUrl },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: MED_SPA_FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.a,
        },
      })),
    },
  ],
};

export default function MedSpasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MedSpasClient />
    </>
  );
}
