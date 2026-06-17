import { INDUSTRY_BY_SLUG, type Industry } from '@/lib/industries';

/** Lightweight shape used for related-post ranking + cards. */
export interface RelatedPostCandidate {
  id?: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  tags?: string[] | null;
  category_id?: string | null;
  featured_image_url?: string | null;
  featured_image_alt?: string | null;
  published_at?: string | null;
  reading_time?: number | null;
}

/**
 * Rank candidate posts by relevance to the current post:
 *   1. shared-tag overlap (same topic cluster / industry)
 *   2. shared category
 *   3. recency
 * The current post is excluded. When nothing overlaps, recent posts are
 * returned as a fallback so a post is never left without related links.
 */
export function scoreRelatedPosts(
  current: { slug: string; tags?: string[] | null; category_id?: string | null },
  candidates: RelatedPostCandidate[],
  limit = 4
): RelatedPostCandidate[] {
  const currentTags = new Set((current.tags ?? []).map((t) => t.toLowerCase()));

  return candidates
    .filter((p) => p.slug !== current.slug)
    .map((p) => {
      const tagOverlap = (p.tags ?? []).reduce(
        (n, t) => (currentTags.has(t.toLowerCase()) ? n + 1 : n),
        0
      );
      const sameCategory =
        current.category_id && p.category_id === current.category_id ? 1 : 0;
      return { p, tagOverlap, sameCategory };
    })
    .sort((a, b) => {
      if (b.tagOverlap !== a.tagOverlap) return b.tagOverlap - a.tagOverlap;
      if (b.sameCategory !== a.sameCategory) return b.sameCategory - a.sameCategory;
      const at = a.p.published_at ? new Date(a.p.published_at).getTime() : 0;
      const bt = b.p.published_at ? new Date(b.p.published_at).getTime() : 0;
      return bt - at;
    })
    .slice(0, limit)
    .map((x) => x.p);
}

/**
 * Map a post's tags to the industry hubs they reference (exact slug match
 * against the registry). Drives the "relevant industry" links on a post.
 */
export function industriesFromTags(tags?: string[] | null, limit = 3): Industry[] {
  if (!tags) return [];
  const seen = new Set<string>();
  const out: Industry[] = [];
  for (const tag of tags) {
    const ind = INDUSTRY_BY_SLUG[tag.toLowerCase()];
    if (ind && ind.status === 'live' && !seen.has(ind.slug)) {
      seen.add(ind.slug);
      out.push(ind);
      if (out.length >= limit) break;
    }
  }
  return out;
}
