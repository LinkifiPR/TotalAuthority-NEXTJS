import { FetchedSiteResources, SiteFetchResource } from '@/lib/types/ai-setup';

const REQUIRED_PATHS = ['/', '/about', '/about-us', '/services', '/contact', '/robots.txt', '/sitemap.xml'];
const OPTIONAL_PATHS = ['/ai', '/ai-info', '/llms.txt', '/agents.md'];

const DEFAULT_TIMEOUT_MS = 9_000;
const DEFAULT_MAX_BODY_CHARS = 300_000;
const FETCH_USER_AGENT =
  'TotalAuthority-AISetupBot/2.0 (+https://totalauthority.com, setup-engine for AI visibility assets)';

const DISCOVERED_FETCH_LIMIT = 10;
const SITEMAP_FETCH_LIMIT = 8;

const PRIORITY_PATH_PATTERNS = [
  /^\/$/,
  /^\/about(?:-us)?(?:\/|$)/i,
  /^\/(?:services?|solutions?|offers?|what-we-do)(?:\/|$)/i,
  /^\/(?:team|founder|leadership|company)(?:\/|$)/i,
  /^\/(?:industr(?:y|ies)|sectors?)(?:\/|$)/i,
  /^\/(?:case-studies?|results?|work|portfolio)(?:\/|$)/i,
  /^\/(?:testimonials?|reviews?)(?:\/|$)/i,
  /^\/(?:faq|faqs|questions)(?:\/|$)/i,
  /^\/(?:resources?|blog|guides?)(?:\/|$)/i,
  /^\/(?:contact|get-in-touch|book|schedule|consultation)(?:\/|$)/i,
];

const ABOUT_EQUIVALENT_PATTERN = /^\/(?:about|about-us|company|who-we-are|our-story|team|leadership)(?:\/|$)/i;
const SERVICES_EQUIVALENT_PATTERN = /^\/(?:services?|solutions?|what-we-do|offers?|capabilities)(?:\/|$)/i;
const CONTACT_EQUIVALENT_PATTERN = /^\/(?:contact|get-in-touch|book|schedule|consultation|book-a-call)(?:\/|$)/i;

const IGNORED_FILE_EXTENSIONS =
  /\.(?:png|jpe?g|gif|webp|svg|pdf|zip|gz|mp4|mp3|mov|avi|webm|ico|woff2?|ttf|eot|css|js|map|xml|txt|json)$/i;

function isLikelyHtml(path: string, contentType: string | undefined, body: string): boolean {
  if (path.endsWith('.txt') || path.endsWith('.xml') || path.endsWith('.md')) {
    return false;
  }

  if (contentType?.includes('text/html') || contentType?.includes('application/xhtml+xml')) {
    return true;
  }

  const lowerBody = body.trim().toLowerCase();
  return lowerBody.startsWith('<!doctype html') || lowerBody.startsWith('<html');
}

function normalizePath(path: string): string {
  if (!path) {
    return '/';
  }

  const noHash = path.split('#')[0] ?? path;
  const noQuery = noHash.split('?')[0] ?? noHash;

  if (!noQuery.startsWith('/')) {
    return `/${noQuery}`;
  }

  if (noQuery.length > 1 && noQuery.endsWith('/')) {
    return noQuery.slice(0, -1);
  }

  return noQuery || '/';
}

function isValidFetchCandidate(path: string): boolean {
  if (!path || path.length < 2) {
    return false;
  }

  if (path.startsWith('/wp-content') || path.startsWith('/wp-includes')) {
    return false;
  }

  if (IGNORED_FILE_EXTENSIONS.test(path)) {
    return false;
  }

  return true;
}

function parseInternalLinksFromHtml(resourceUrl: string, body: string, origin: string): string[] {
  const hrefMatches = body.match(/href\s*=\s*["']([^"']+)["']/gi) ?? [];
  const links = new Set<string>();

  for (const match of hrefMatches) {
    const hrefMatch = match.match(/href\s*=\s*["']([^"']+)["']/i);
    const href = hrefMatch?.[1]?.trim();

    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
      continue;
    }

    try {
      const absoluteUrl = new URL(href, resourceUrl);

      if (absoluteUrl.origin !== origin) {
        continue;
      }

      const normalized = normalizePath(`${absoluteUrl.pathname}${absoluteUrl.search}`);
      if (isValidFetchCandidate(normalized)) {
        links.add(normalized);
      }
    } catch {
      // Ignore malformed URLs.
    }
  }

  return Array.from(links);
}

function parseSitemapUrls(sitemapXml: string | undefined, origin: string): string[] {
  if (!sitemapXml) {
    return [];
  }

  const matches = sitemapXml.match(/<loc>\s*([^<\s]+)\s*<\/loc>/gi) ?? [];
  const paths = new Set<string>();

  for (const match of matches) {
    const locMatch = match.match(/<loc>\s*([^<\s]+)\s*<\/loc>/i);
    const loc = locMatch?.[1];

    if (!loc) {
      continue;
    }

    try {
      const absoluteUrl = new URL(loc);
      if (absoluteUrl.origin !== origin) {
        continue;
      }

      const normalized = normalizePath(`${absoluteUrl.pathname}${absoluteUrl.search}`);
      if (isValidFetchCandidate(normalized)) {
        paths.add(normalized);
      }
    } catch {
      // Ignore malformed loc values.
    }
  }

  return Array.from(paths);
}

function scorePath(path: string): number {
  let score = 0;

  PRIORITY_PATH_PATTERNS.forEach((pattern, index) => {
    if (pattern.test(path)) {
      score += 100 - index * 6;
    }
  });

  if (/\/(?:blog|resources?|guides?|insights?)(?:\/|$)/i.test(path)) {
    score += 14;
  }

  const depth = path.split('/').filter(Boolean).length;
  score += Math.max(0, 20 - depth * 3);

  return score;
}

function prioritizePaths(paths: string[], existingPaths: Set<string>, limit: number): string[] {
  return Array.from(new Set(paths))
    .map((path) => normalizePath(path))
    .filter((path) => !existingPaths.has(path) && isValidFetchCandidate(path))
    .sort((a, b) => scorePath(b) - scorePath(a))
    .slice(0, limit);
}

export function normalizeWebsiteUrl(inputUrl: string): URL {
  const trimmed = inputUrl.trim();

  if (!trimmed) {
    throw new Error('Website URL is required.');
  }

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  let parsed: URL;
  try {
    parsed = new URL(withProtocol);
  } catch {
    throw new Error('Please enter a valid website URL.');
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error('Only HTTP and HTTPS URLs are supported.');
  }

  if (!parsed.hostname || parsed.hostname.includes(' ')) {
    throw new Error('Please enter a valid website hostname.');
  }

  return new URL(parsed.origin);
}

async function fetchSingleResource(
  resourceUrl: string,
  path: string,
  required: boolean,
  timeoutMs: number,
  maxBodyChars: number,
): Promise<SiteFetchResource> {
  const startedAt = Date.now();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(resourceUrl, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'User-Agent': FETCH_USER_AGENT,
        Accept: 'text/html,application/xhtml+xml,text/plain,application/xml;q=0.9,*/*;q=0.8',
      },
      signal: controller.signal,
      cache: 'no-store',
    });

    const rawBody = await response.text();
    const body = rawBody.slice(0, maxBodyChars);
    const contentType = response.headers.get('content-type') ?? undefined;

    return {
      path,
      url: resourceUrl,
      finalUrl: response.url,
      ok: response.ok,
      status: response.status,
      contentType,
      body,
      durationMs: Date.now() - startedAt,
      isHtml: isLikelyHtml(path, contentType, body),
      required,
      truncated: rawBody.length > maxBodyChars,
      error: response.ok ? undefined : `HTTP ${response.status}`,
    };
  } catch (error) {
    const isAbortError = error instanceof Error && error.name === 'AbortError';

    return {
      path,
      url: resourceUrl,
      ok: false,
      error: isAbortError ? `Timed out after ${timeoutMs}ms` : 'Network request failed',
      timedOut: isAbortError,
      durationMs: Date.now() - startedAt,
      isHtml: false,
      required,
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function fetchSiteResources(
  inputUrl: string,
  options?: {
    timeoutMs?: number;
    maxBodyChars?: number;
    discoveredFetchLimit?: number;
    sitemapFetchLimit?: number;
  },
): Promise<FetchedSiteResources> {
  const timeoutMs = options?.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const maxBodyChars = options?.maxBodyChars ?? DEFAULT_MAX_BODY_CHARS;
  const discoveredFetchLimit = options?.discoveredFetchLimit ?? DISCOVERED_FETCH_LIMIT;
  const sitemapFetchLimit = options?.sitemapFetchLimit ?? SITEMAP_FETCH_LIMIT;
  const normalizedUrl = normalizeWebsiteUrl(inputUrl);

  const initialTargets = [
    ...REQUIRED_PATHS.map((path) => ({ path, required: true })),
    ...OPTIONAL_PATHS.map((path) => ({ path, required: false })),
  ];

  const initialResources = await Promise.all(
    initialTargets.map(({ path, required }) => {
      const targetUrl = new URL(path, normalizedUrl).toString();
      return fetchSingleResource(targetUrl, path, required, timeoutMs, maxBodyChars);
    }),
  );

  const fetchedPathSet = new Set(initialResources.map((resource) => normalizePath(resource.path)));

  const discoveredFromHtml = initialResources
    .filter((resource) => resource.ok && resource.isHtml && resource.body)
    .flatMap((resource) => parseInternalLinksFromHtml(resource.finalUrl ?? resource.url, resource.body ?? '', normalizedUrl.origin));

  const sitemapResource = initialResources.find((resource) => resource.path === '/sitemap.xml' && resource.ok);
  const sitemapPaths = parseSitemapUrls(sitemapResource?.body, normalizedUrl.origin);

  const discoveredCandidates = prioritizePaths(discoveredFromHtml, fetchedPathSet, discoveredFetchLimit);
  const sitemapCandidates = prioritizePaths(sitemapPaths, fetchedPathSet, sitemapFetchLimit);

  const secondPassPaths = prioritizePaths(
    [...discoveredCandidates, ...sitemapCandidates],
    fetchedPathSet,
    discoveredFetchLimit + sitemapFetchLimit,
  );

  const secondPassResources = await Promise.all(
    secondPassPaths.map((path) => {
      const targetUrl = new URL(path, normalizedUrl).toString();
      return fetchSingleResource(targetUrl, path, false, timeoutMs, maxBodyChars);
    }),
  );

  const resources = [...initialResources, ...secondPassResources];
  const successfulPathSet = new Set(
    resources.filter((resource) => resource.ok).map((resource) => normalizePath(resource.path)),
  );

  const hasAboutEquivalent = Array.from(successfulPathSet).some((path) => ABOUT_EQUIVALENT_PATTERN.test(path));
  const hasServicesEquivalent = Array.from(successfulPathSet).some((path) => SERVICES_EQUIVALENT_PATTERN.test(path));
  const hasContactEquivalent = Array.from(successfulPathSet).some((path) => CONTACT_EQUIVALENT_PATTERN.test(path));

  const warnings = resources
    .filter((resource) => !resource.ok && resource.required)
    .filter((resource) => {
      if ((resource.path === '/about' || resource.path === '/about-us') && hasAboutEquivalent) {
        return false;
      }

      if (resource.path === '/services' && hasServicesEquivalent) {
        return false;
      }

      if (resource.path === '/contact' && hasContactEquivalent) {
        return false;
      }

      return true;
    })
    .map((resource) => `Could not fetch ${resource.path}: ${resource.error ?? 'Unknown error'}`);

  return {
    origin: normalizedUrl.origin,
    resources,
    scannedAt: new Date().toISOString(),
    warnings,
  };
}

export const SCAN_PATHS = {
  required: REQUIRED_PATHS,
  optional: OPTIONAL_PATHS,
};
