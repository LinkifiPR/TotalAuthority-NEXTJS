import { load } from 'cheerio';
import {
  ExtractedSiteSignals,
  FetchedSiteResources,
  PageSignals,
  SiteFetchResource,
} from '@/lib/types/ai-setup';

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function truncate(value: string, maxLength: number): string {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength)}…`;
}

function safeParseJson(value: string): unknown | undefined {
  const cleaned = value.trim().replace(/^<!--/, '').replace(/-->$/, '');

  if (!cleaned) {
    return undefined;
  }

  try {
    return JSON.parse(cleaned);
  } catch {
    return undefined;
  }
}

function collectSchemaTypes(node: unknown, output: Set<string>): void {
  if (!node) {
    return;
  }

  if (Array.isArray(node)) {
    node.forEach((item) => collectSchemaTypes(item, output));
    return;
  }

  if (typeof node !== 'object') {
    return;
  }

  const record = node as Record<string, unknown>;
  const nodeType = record['@type'];

  if (typeof nodeType === 'string' && nodeType.trim()) {
    output.add(nodeType.trim());
  }

  if (Array.isArray(nodeType)) {
    nodeType
      .filter((item): item is string => typeof item === 'string' && Boolean(item.trim()))
      .forEach((item) => output.add(item.trim()));
  }

  Object.values(record).forEach((value) => collectSchemaTypes(value, output));
}

function toInternalLink(currentUrl: string, href: string, origin: string): string | undefined {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return undefined;
  }

  try {
    const absoluteUrl = new URL(href, currentUrl);

    if (absoluteUrl.origin !== origin) {
      return undefined;
    }

    return `${absoluteUrl.pathname}${absoluteUrl.search}`;
  } catch {
    return undefined;
  }
}

function extractPageSignals(resource: SiteFetchResource, origin: string): PageSignals | undefined {
  if (!resource.ok || !resource.isHtml || !resource.body) {
    return undefined;
  }

  const $ = load(resource.body);

  $('script, style, noscript, iframe').remove();

  const title = normalizeWhitespace($('title').first().text());
  const metaDescription = normalizeWhitespace($('meta[name="description"]').attr('content') ?? '');

  const headings = new Set<string>();
  $('h1, h2, h3').each((_, element) => {
    const headingText = normalizeWhitespace($(element).text());
    if (headingText) {
      headings.add(headingText);
    }
  });

  const bodyText = normalizeWhitespace($('body').text());

  const internalLinks = new Set<string>();
  $('a[href]').each((_, element) => {
    const href = $(element).attr('href') ?? '';
    const normalizedLink = toInternalLink(resource.finalUrl ?? resource.url, href, origin);

    if (normalizedLink) {
      internalLinks.add(normalizedLink);
    }
  });

  const schemaObjects: unknown[] = [];
  const schemaTypes = new Set<string>();

  $('script[type="application/ld+json"]').each((_, element) => {
    const scriptBody = $(element).html() ?? '';
    const parsed = safeParseJson(scriptBody);

    if (parsed !== undefined) {
      schemaObjects.push(parsed);
      collectSchemaTypes(parsed, schemaTypes);
    }
  });

  const canonicalHref = $('link[rel="canonical"]').attr('href');
  let canonical: string | undefined;

  if (canonicalHref) {
    try {
      canonical = new URL(canonicalHref, resource.finalUrl ?? resource.url).toString();
    } catch {
      canonical = undefined;
    }
  }

  return {
    path: resource.path,
    url: resource.finalUrl ?? resource.url,
    title: title || undefined,
    metaDescription: metaDescription || undefined,
    headings: Array.from(headings).slice(0, 30),
    visibleText: truncate(bodyText, 7_000),
    internalLinks: Array.from(internalLinks).slice(0, 200),
    schemaObjects,
    schemaTypes: Array.from(schemaTypes),
    canonical,
  };
}

export function extractSiteSignals(fetched: FetchedSiteResources): ExtractedSiteSignals {
  const warnings = [...fetched.warnings];

  const pages = fetched.resources
    .map((resource) => extractPageSignals(resource, fetched.origin))
    .filter((page): page is PageSignals => Boolean(page));

  const robotsResource = fetched.resources.find((resource) => resource.path === '/robots.txt' && resource.ok);
  const sitemapResource = fetched.resources.find((resource) => resource.path === '/sitemap.xml' && resource.ok);

  if (pages.length === 0) {
    warnings.push('No HTML pages could be parsed from the scanned website.');
  }

  return {
    origin: fetched.origin,
    pages,
    robotsTxt: robotsResource?.body,
    sitemapXml: sitemapResource?.body,
    scannedAt: fetched.scannedAt,
    warnings,
  };
}
