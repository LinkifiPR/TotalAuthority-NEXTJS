import type { Metadata } from 'next';
import { siteUrl } from '@/lib/siteConfig';
import { getIndustry } from '@/lib/industries';
import type { IndustryContent } from './types';

const OG_IMAGE = '/total-authority-logo.png';

/** Build Next.js page metadata from an industry content config. */
export function buildIndustryMetadata(content: IndustryContent): Metadata {
  const pageUrl = `${siteUrl}/${content.slug}`;
  const ogImage = `${siteUrl}${OG_IMAGE}`;
  const { title, description, keywords, ogTitle, ogDescription } = content.meta;
  const name = getIndustry(content.slug)?.name ?? content.slug;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: `/${content.slug}` },
    openGraph: {
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      url: pageUrl,
      siteName: 'TotalAuthority',
      locale: 'en_GB',
      type: 'website',
      images: [{ url: ogImage, width: 601, height: 200, alt: `TotalAuthority — ${name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      images: [ogImage],
    },
  };
}

/** Build Service + BreadcrumbList + FAQPage JSON-LD for an industry page. */
export function buildIndustryJsonLd(content: IndustryContent) {
  const pageUrl = `${siteUrl}/${content.slug}`;
  const ogImage = `${siteUrl}${OG_IMAGE}`;
  const name = getIndustry(content.slug)?.name ?? content.slug;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: content.hero.eyebrow,
        serviceType: 'AI visibility audit, digital PR and authority building',
        description: content.meta.description,
        url: pageUrl,
        provider: {
          '@type': 'Organization',
          name: 'TotalAuthority',
          url: siteUrl,
          logo: ogImage,
        },
        areaServed: ['United Kingdom', 'United States'],
        audience: { '@type': 'BusinessAudience', name },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name, item: pageUrl },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: content.faq.items.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };
}
