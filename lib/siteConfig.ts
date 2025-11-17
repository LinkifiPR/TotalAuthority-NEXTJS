/**
 * Site configuration for URLs and SEO metadata
 * Uses environment variable for deployment flexibility
 */

// Get site URL from environment, fallback to production domain
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://totalauthority.com';

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
