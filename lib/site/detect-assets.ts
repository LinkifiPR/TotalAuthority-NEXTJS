import { DetectedAssets, ExtractedSiteSignals } from '@/lib/types/ai-setup';

const AI_PAGE_PATTERNS = [/^\/ai(?:\/|$)/i, /^\/ai-info(?:\/|$)/i, /^\/ai-discovery(?:\/|$)/i];

function normalizePath(path: string): string {
  if (!path) {
    return '/';
  }

  if (path === '/') {
    return '/';
  }

  return path.endsWith('/') ? path.slice(0, -1) : path;
}

function hasSchemaType(schemaTypes: string[], target: string): boolean {
  return schemaTypes.some((schemaType) => schemaType.toLowerCase() === target.toLowerCase());
}

export function detectAssets(extracted: ExtractedSiteSignals): DetectedAssets {
  const fetchedPaths = new Set(extracted.pages.map((page) => normalizePath(page.path)));
  const internalLinkPaths = new Set(
    extracted.pages.flatMap((page) => page.internalLinks.map((link) => normalizePath(link.split('#')[0]))),
  );

  const aiPageCandidates = new Set<string>();

  [...fetchedPaths, ...internalLinkPaths].forEach((path) => {
    if (AI_PAGE_PATTERNS.some((pattern) => pattern.test(path))) {
      aiPageCandidates.add(path);
    }
  });

  const schemaTypes = Array.from(new Set(extracted.pages.flatMap((page) => page.schemaTypes))).sort();

  const hasAiInfoPage = aiPageCandidates.size > 0;
  const hasRobotsTxt = Boolean(extracted.robotsTxt && extracted.robotsTxt.trim().length > 0);
  const hasSitemap = Boolean(extracted.sitemapXml && extracted.sitemapXml.trim().length > 0);

  const hasOrganizationSchema = hasSchemaType(schemaTypes, 'Organization');
  const hasWebsiteSchema = hasSchemaType(schemaTypes, 'WebSite');
  const hasServiceSchema = hasSchemaType(schemaTypes, 'Service');

  const corePagesFound: string[] = [];

  if (fetchedPaths.has('/')) {
    corePagesFound.push('Homepage');
  }

  if (fetchedPaths.has('/about') || fetchedPaths.has('/about-us')) {
    corePagesFound.push('About');
  }

  if (fetchedPaths.has('/services')) {
    corePagesFound.push('Services');
  }

  if (fetchedPaths.has('/contact')) {
    corePagesFound.push('Contact');
  }

  const existingAssets: string[] = [];

  if (hasAiInfoPage) {
    existingAssets.push('AI info page already exists');
  }

  if (hasRobotsTxt) {
    existingAssets.push('robots.txt detected');
  }

  if (hasSitemap) {
    existingAssets.push('sitemap.xml detected');
  }

  if (hasOrganizationSchema) {
    existingAssets.push('Organization schema detected');
  }

  if (hasWebsiteSchema) {
    existingAssets.push('WebSite schema detected');
  }

  if (hasServiceSchema) {
    existingAssets.push('Service schema detected');
  }

  if (corePagesFound.length > 0) {
    existingAssets.push(`Core pages detected: ${corePagesFound.join(', ')}`);
  }

  const missingAssets: string[] = [];

  if (!hasAiInfoPage) {
    missingAssets.push('AI info page missing (recommended: /ai or /ai-info)');
  }

  if (!hasRobotsTxt) {
    missingAssets.push('robots.txt missing');
  }

  if (!hasSitemap) {
    missingAssets.push('sitemap.xml missing');
  }

  if (!hasOrganizationSchema) {
    missingAssets.push('Organization schema missing');
  }

  if (!hasWebsiteSchema) {
    missingAssets.push('WebSite schema missing');
  }

  if (!hasServiceSchema) {
    missingAssets.push('Service schema missing');
  }

  const recommendations: string[] = [
    'Publish an AI info page that summarizes who you are, what you do, and who you serve.',
    'Link the AI info page from the main navigation, footer, About page, and Services page.',
    'Add or update Organization and WebSite schema with accurate brand and contact details.',
    'Ensure robots.txt references your live sitemap URL and avoid blocking key brand pages.',
  ];

  if (!corePagesFound.includes('About')) {
    recommendations.push('Strengthen your About page so AI systems can validate brand authority faster.');
  }

  return {
    hasAiInfoPage,
    hasRobotsTxt,
    hasSitemap,
    schemaTypes,
    corePagesFound,
    aiPageCandidates: Array.from(aiPageCandidates),
    existingAssets,
    missingAssets,
    recommendations,
  };
}
