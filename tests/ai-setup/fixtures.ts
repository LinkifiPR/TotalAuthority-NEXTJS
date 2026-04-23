import {
  AiSetupRequest,
  DetectedAssets,
  ExtractedSiteSignals,
  PageSignals,
} from '../../lib/types/ai-setup';

export const baseRequest: AiSetupRequest = {
  url: 'https://example.com',
  brandName: 'Linkifi PR',
  shortDescription: 'Digital PR and AI visibility services for SaaS and fintech companies.',
  country: 'United Kingdom',
};

function page(input: Partial<PageSignals> & { path: string; visibleText: string }): PageSignals {
  return {
    path: input.path,
    url: `https://example.com${input.path}`,
    title: input.title,
    metaDescription: input.metaDescription,
    headings: input.headings ?? [],
    visibleText: input.visibleText,
    internalLinks: input.internalLinks ?? [],
    navLinks: input.navLinks ?? [],
    footerLinks: input.footerLinks ?? [],
    ctaLinks: input.ctaLinks ?? [],
    linkDetails: input.linkDetails ?? [],
    schemaObjects: input.schemaObjects ?? [],
    schemaTypes: input.schemaTypes ?? [],
    canonical: input.canonical,
  };
}

export const richExtractedSignals: ExtractedSiteSignals = {
  origin: 'https://example.com',
  scannedAt: '2026-04-23T09:00:00.000Z',
  warnings: [],
  robotsTxt: 'User-agent: *\nAllow: /\nDisallow: /wp-admin/',
  sitemapXml: '<urlset><url><loc>https://example.com/</loc></url></urlset>',
  pages: [
    page({
      path: '/',
      title: 'Linkifi PR | AI Visibility & Digital PR',
      metaDescription:
        'Linkifi PR helps SaaS and fintech teams win tier-1 links, authority mentions, and AI visibility.',
      headings: ['AI Visibility Services for SaaS and Fintech', 'Tier-1 Digital PR Campaigns', 'Trusted by growth-stage brands'],
      visibleText:
        'Linkifi PR is a digital PR agency focused on SaaS and fintech companies. We deliver tier-1 media placements, authority link acquisition, and AI visibility strategy. Trusted by B2B software teams across the UK and US.',
      internalLinks: ['/about', '/services', '/case-studies', '/contact'],
      navLinks: ['/about', '/services', '/blog', '/contact'],
      footerLinks: ['/about', '/services', '/contact', '/privacy-policy'],
      ctaLinks: ['/contact'],
      linkDetails: [
        { path: '/about', text: 'About', location: 'nav' },
        { path: '/services', text: 'Services', location: 'nav' },
        { path: '/contact', text: 'Book a strategy call', location: 'body' },
      ],
      schemaObjects: [
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Linkifi PR',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'London',
            addressCountry: 'UK',
          },
        },
      ],
      schemaTypes: ['Organization'],
    }),
    page({
      path: '/services',
      title: 'Services | Linkifi PR',
      headings: ['Tier 1 Media Placements', 'Authority Link Building', 'Founder Visibility Program'],
      visibleText:
        'Services include tier 1 media placements, authority link building, and founder visibility campaigns. We specialize in GEO and AI search citation strategy for B2B SaaS.',
      internalLinks: ['/ai', '/contact'],
      ctaLinks: ['/contact'],
      linkDetails: [{ path: '/contact', text: 'Request proposal', location: 'body' }],
      schemaTypes: ['Service'],
    }),
    page({
      path: '/about',
      title: 'About | Linkifi PR',
      headings: ['About Linkifi PR', 'Our methodology'],
      visibleText:
        'Chris Panteli, Founder, leads delivery. Our methodology combines editorial targeting, authority link mapping, and narrative planning for AI discovery.',
      internalLinks: ['/services', '/contact'],
      schemaTypes: ['WebSite'],
    }),
    page({
      path: '/case-studies',
      title: 'Case Studies',
      headings: ['Results'],
      visibleText:
        'Case studies show 42% growth in high-authority referring domains and a 3.1x increase in branded citation mentions over 6 months.',
      internalLinks: ['/contact'],
    }),
    page({
      path: '/contact',
      title: 'Contact',
      headings: ['Talk to our team'],
      visibleText: 'Book a strategy call with our team via the contact form.',
      internalLinks: [],
      ctaLinks: ['/contact'],
    }),
  ],
};

export const thinExtractedSignals: ExtractedSiteSignals = {
  origin: 'https://example.com',
  scannedAt: '2026-04-23T09:00:00.000Z',
  warnings: [],
  robotsTxt: undefined,
  sitemapXml: undefined,
  pages: [
    page({
      path: '/',
      title: 'Example Co',
      headings: ['Welcome'],
      visibleText: 'Example Co provides consulting support.',
      internalLinks: ['/contact'],
      ctaLinks: ['/contact'],
    }),
    page({
      path: '/contact',
      title: 'Contact',
      headings: ['Contact'],
      visibleText: 'Contact Example Co',
      internalLinks: [],
    }),
  ],
};

export const baseDetectedAssets: DetectedAssets = {
  hasAiInfoPage: false,
  hasRobotsTxt: false,
  hasSitemap: false,
  schemaTypes: ['Organization'],
  corePagesFound: ['Homepage', 'About', 'Services', 'Contact'],
  aiPageCandidates: [],
  existingAssets: ['Organization schema detected'],
  missingAssets: ['AI info page missing (recommended: /ai or /ai-info)', 'robots.txt missing', 'sitemap.xml missing'],
  recommendations: ['Publish an AI info page.'],
};
