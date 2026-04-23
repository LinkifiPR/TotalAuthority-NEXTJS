import { DetectedAssets, ExtractedSiteSignals } from '@/lib/types/ai-setup';
import { parseRobotsTxt } from '@/lib/site/robots-utils';

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

function hasCorePage(paths: Set<string>, pattern: RegExp): boolean {
  return Array.from(paths).some((path) => pattern.test(path));
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

  if (hasCorePage(fetchedPaths, /^\/about(?:-us)?(?:\/|$)/i)) {
    corePagesFound.push('About');
  }

  if (hasCorePage(fetchedPaths, /^\/(?:services?|solutions?)(?:\/|$)/i)) {
    corePagesFound.push('Services');
  }

  if (hasCorePage(fetchedPaths, /^\/(?:contact|get-in-touch)(?:\/|$)/i)) {
    corePagesFound.push('Contact');
  }

  const robotsAnalysis = parseRobotsTxt(extracted.robotsTxt);

  const existingAssets: string[] = [];

  if (hasAiInfoPage) {
    existingAssets.push('AI info page already exists');
  }

  if (hasRobotsTxt) {
    existingAssets.push(`robots.txt detected (${robotsAnalysis.quality} structure)`);
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

  if (robotsAnalysis.quality === 'invalid') {
    missingAssets.push('robots.txt exists but has invalid structure and should be repaired');
  }

  if (robotsAnalysis.quality === 'incomplete') {
    missingAssets.push('robots.txt exists but is missing complete crawl/sitemap directives');
  }

  const recommendations: string[] = [
    'Publish an AI info page that summarizes who you are, what you do, and who you serve with factual specificity.',
    'Link the AI info page from footer, About, Services, and other high-crawl pages with descriptive anchor text.',
    'Add or update Organization and WebSite schema using real company details and validate JSON-LD before publishing.',
    'Use a merged robots.txt recommendation instead of overwriting blindly, and keep sitemap lines current.',
  ];

  if (!corePagesFound.includes('About')) {
    recommendations.push('Strengthen your About page so AI systems can validate company identity and leadership context faster.');
  }

  if (robotsAnalysis.quality !== 'valid') {
    recommendations.push('Treat robots.txt as crawler guidance only; do not use it as security control for private URLs.');
  }

  robotsAnalysis.warnings.forEach((warning) => {
    recommendations.push(`Robots note: ${warning}`);
  });

  return {
    hasAiInfoPage,
    hasRobotsTxt,
    hasSitemap,
    schemaTypes,
    corePagesFound,
    aiPageCandidates: Array.from(aiPageCandidates),
    existingAssets,
    missingAssets,
    recommendations: Array.from(new Set(recommendations)),
  };
}
