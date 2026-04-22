import { FetchedSiteResources, SiteFetchResource } from '@/lib/types/ai-setup';

const REQUIRED_PATHS = ['/', '/about', '/about-us', '/services', '/contact', '/robots.txt', '/sitemap.xml'];
const OPTIONAL_PATHS = ['/ai', '/ai-info', '/llms.txt', '/agents.md'];

const DEFAULT_TIMEOUT_MS = 9_000;
const DEFAULT_MAX_BODY_CHARS = 300_000;
const FETCH_USER_AGENT =
  'TotalAuthority-AISetupBot/1.0 (+https://totalauthority.com, setup-engine for AI visibility assets)';

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
  },
): Promise<FetchedSiteResources> {
  const timeoutMs = options?.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const maxBodyChars = options?.maxBodyChars ?? DEFAULT_MAX_BODY_CHARS;
  const normalizedUrl = normalizeWebsiteUrl(inputUrl);

  const targets = [
    ...REQUIRED_PATHS.map((path) => ({ path, required: true })),
    ...OPTIONAL_PATHS.map((path) => ({ path, required: false })),
  ];

  const resources = await Promise.all(
    targets.map(({ path, required }) => {
      const targetUrl = new URL(path, normalizedUrl).toString();
      return fetchSingleResource(targetUrl, path, required, timeoutMs, maxBodyChars);
    }),
  );

  const warnings = resources
    .filter((resource) => !resource.ok && resource.required)
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
