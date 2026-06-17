import {
  createServerSupabaseClient,
  isServerSupabaseConfigured,
} from '@/lib/integrations/supabase/server';
import type { IndustryGuide } from './types';

/**
 * "Guides & resources" for an industry hub.
 *
 * Priority 1: posts explicitly tagged with this industry's slug.
 * Fallback:   if fewer than `limit`, top up with the most recent published
 *             posts — general AI-visibility articles are relevant to every
 *             sector, so the section is always populated and useful, while
 *             industry-specific posts take the top slots as they're written.
 *
 * Returns [] when Supabase is unconfigured (e.g. the local sandbox build) so
 * the section simply doesn't render rather than erroring.
 */
export async function getIndustryGuides(
  slug: string,
  limit = 3
): Promise<IndustryGuide[]> {
  if (!isServerSupabaseConfigured()) return [];

  try {
    const supabase = createServerSupabaseClient();

    // 1) Posts explicitly tagged with this industry's slug.
    const { data: tagged } = await supabase
      .from('blog_posts')
      .select('title, slug, excerpt')
      .eq('status', 'published')
      .eq('is_indexed', true)
      .contains('tags', [slug])
      .order('published_at', { ascending: false })
      .limit(limit);

    const guides: IndustryGuide[] = ((tagged ?? []) as IndustryGuide[]).slice(0, limit);
    if (guides.length >= limit) return guides;

    // 2) Top up with the most recent posts (de-duplicated).
    const seen = new Set(guides.map((g) => g.slug));
    const { data: recent } = await supabase
      .from('blog_posts')
      .select('title, slug, excerpt')
      .eq('status', 'published')
      .eq('is_indexed', true)
      .order('published_at', { ascending: false })
      .limit(limit + guides.length + 3);

    for (const p of (recent ?? []) as IndustryGuide[]) {
      if (guides.length >= limit) break;
      if (!seen.has(p.slug)) {
        seen.add(p.slug);
        guides.push(p);
      }
    }

    return guides;
  } catch {
    return [];
  }
}
