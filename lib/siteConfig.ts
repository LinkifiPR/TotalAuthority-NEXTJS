/**
 * Site configuration for URLs and SEO metadata
 * Uses environment variable for deployment flexibility
 * 
 * IMPORTANT: NEXT_PUBLIC_SITE_URL should NOT include a trailing slash
 * Good: https://totalauthority.com
 * Bad:  https://totalauthority.com/
 */

// Get site URL from environment, fallback to production domain
// Strip any trailing slash to prevent double slashes in URLs
const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://totalauthority.com';
export const siteUrl = rawSiteUrl.endsWith('/') ? rawSiteUrl.slice(0, -1) : rawSiteUrl;

/**
 * Build an absolute URL from a relative path
 * @param path - The path to convert (with or without leading slash)
 * @returns Full absolute URL
 */
export function buildAbsoluteUrl(path: string): string {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
}

/**
 * Get the site name
 */
export const siteName = 'TotalAuthority';

/**
 * Get the site description
 */
export const siteDescription = 'Get a comprehensive AI visibility audit to boost your online presence and outrank competitors with data-driven insights.';
