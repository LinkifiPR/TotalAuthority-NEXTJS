import {
  createServerSupabaseClient,
  isServerSupabaseConfigured,
} from '@/lib/integrations/supabase/server';
import type { IndustryGuide } from './types';

/**
 * Blog posts tagged with this industry's slug — the reciprocal "guides"
 * links shown on an industry hub page. Fetched server-side in each industry
 * route and passed to the (client) template as a prop.
 *
 * Returns [] when Supabase is unconfigured (e.g. local sandbox build) so the
 * section simply doesn't render rather than erroring.
 */
export async function getIndustryGuides(
  slug: string,
  limit = 3
): Promise<IndustryGuide[]> {
  if (!isServerSupabaseConfigured()) return [];
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('blog_posts')
      .select('title, slug, excerpt')
      .eq('status', 'published')
      .eq('is_indexed', true)
      .contains('tags', [slug])
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error || !data) return [];
    return data as IndustryGuide[];
  } catch {
    return [];
  }
}
