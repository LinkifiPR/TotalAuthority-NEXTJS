import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { INDUSTRY_BY_SLUG } from '@/lib/industries';

export const dynamic = 'force-dynamic';

// One-time apply token (this route is deleted immediately after the migration
// runs). `?dryRun=1` is open and read-only; writing requires `?token=`.
const APPLY_TOKEN = 'ta-tagmigrate-7Qm2Kx9vZ4nR8sT1wbY3';

/**
 * TEMPORARY migration route — auto-tags existing blog posts so the internal
 * linking system has data to work with. DELETE after running.
 *
 * Guard: requires ?secret=<AI_SETUP_JOB_SECRET> (already set in Netlify env).
 * ?dryRun=1 reports proposed tags without writing.
 *
 * Per post it adds (merged into existing tags, never removing):
 *   - exactly one topic-cluster tag (keyword rules; default "AI Visibility")
 *   - 0-3 industry slug tags, only on a strong sector match
 */

// Ordered; first match wins. Default handled separately.
// Topic-specific clusters first; generic "AI Platform Guides" last so it only
// applies when nothing more specific matched. Case Studies requires a literal
// "case study" (no loose synonyms).
const CLUSTER_RULES: Array<[string, RegExp]> = [
  ['Generative Engine Optimization', /\b(generative engine optimi|generative engine)\b/i],
  ['Answer Engine Optimization', /\b(answer engine optimi|answer engine|featured snippet)\b/i],
  ['Local SEO', /\b(local seo|google business profile|google my business|local pack)\b/i],
  ['Digital PR & Earned Media', /\b(digital pr|earned media|journalist|press release|backlink|\bharo\b|media coverage|media outreach)\b/i],
  ['Authority Building', /\b(thought leadership|e-?e-?a-?t|topical authority|brand authority|expert positioning)\b/i],
  ['Case Studies', /\b(case study|case studies)\b/i],
  ['AI Platform Guides', /\b(chatgpt|chat gpt|gemini|perplexity|\bclaude\b|copilot|google ai overview)\b/i],
];
const DEFAULT_CLUSTER = 'AI Visibility';

// Strong sector signals; only assign a slug when one of these matches.
const INDUSTRY_RULES: Record<string, RegExp> = {
  'med-spas': /\b(med ?spa|medical aesthetic|botox|dermal filler|injectable|hydrafacial|microneedling)\b/i,
  'health-clinics': /\b(health clinic|private gp|primary care|gp practice)\b/i,
  'dental-clinics': /\b(dental|dentist|orthodont|invisalign)\b/i,
  'eye-clinics': /\b(eye clinic|ophthalmolog|optometr|lasik|cataract)\b/i,
  'therapy-clinics': /\b(therapy clinic|psychotherap|counsel(?:l)?ing|\bcbt\b|mental health practice)\b/i,
  'rehab-centres': /\b(rehab|addiction treatment|detox|substance abuse|recovery cent)\b/i,
  'cosmetic-surgery-clinics': /\b(cosmetic surgery|plastic surgery|rhinoplasty|liposuction|facelift)\b/i,
  'private-medical-practices': /\b(private medical practice|consultant physician|private healthcare practice)\b/i,
  'law-firms': /\b(law firm|lawyer|attorney|solicitor|litigation|legal practice)\b/i,
  'accountancy-firms': /\b(accountan|\bcpa\b|bookkeep|payroll service)\b/i,
  'tax-advisory-firms': /\b(tax advis|tax planning|tax return|\birs\b)\b/i,
  'financial-advisory-firms': /\b(financial advis|\bifa\b|retirement planning|financial planner)\b/i,
  'wealth-management-firms': /\b(wealth management|wealth manager|private client)\b/i,
  'mortgage-brokers': /\b(mortgage broker|mortgage advis|home loan)\b/i,
  'insurance-brokers': /\b(insurance broker|insurance agen)\b/i,
  'investment-firms': /\b(investment firm|asset management|fund manager)\b/i,
  'real-estate-firms': /\b(real estate|realtor|estate agent)\b/i,
  'chartered-surveyors': /\b(chartered surveyor|home inspect|property apprais|\bappraiser\b)\b/i,
  'architectural-firms': /\b(architect|architectural firm)\b/i,
  'engineering-consultancies': /\b(engineering firm|engineering consult|civil engineer|structural engineer)\b/i,
  'business-consultancies': /\b(business consult|management consult|strategy consult)\b/i,
  'business-brokers': /\b(business broker|sell (?:a|your) business|m&a advis)\b/i,
  'insolvency-practitioners': /\b(insolvency|bankruptcy|liquidation|restructuring|chapter 7|chapter 11)\b/i,
  'estate-planning-firms': /\b(estate planning|will writing|probate|power of attorney|living trust)\b/i,
};

function pickCluster(hay: string): string {
  for (const [name, re] of CLUSTER_RULES) if (re.test(hay)) return name;
  return DEFAULT_CLUSTER;
}

function pickIndustries(hay: string): string[] {
  const out: string[] = [];
  for (const slug of Object.keys(INDUSTRY_RULES)) {
    if (INDUSTRY_RULES[slug].test(hay) && INDUSTRY_BY_SLUG[slug]?.status === 'live') {
      out.push(slug);
      if (out.length >= 3) break;
    }
  }
  return out;
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  const dryRun = req.nextUrl.searchParams.get('dryRun') === '1';

  // Dry-run is read-only and open; applying changes requires the token.
  if (!dryRun && token !== APPLY_TOKEN) {
    return NextResponse.json(
      { error: 'Unauthorized — add ?token=<APPLY_TOKEN> to apply, or ?dryRun=1 to preview.' },
      { status: 401 }
    );
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  const supabase = createClient(url, key);

  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('id, slug, title, excerpt, content, tags')
    .eq('status', 'published');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const report: Array<{ slug: string; addedTags: string[]; cluster: string; industries: string[] }> = [];
  let updated = 0;

  for (const p of posts ?? []) {
    const hay = [
      p.title || '',
      p.excerpt || '',
      (p.content || '').replace(/<[^>]+>/g, ' '),
      (p.tags || []).join(' '),
    ]
      .join(' ')
      .toLowerCase();

    const cluster = pickCluster(hay);
    // Industry tags only when the sector term is in the TITLE — body mentions
    // are usually incidental examples and produce false positives.
    const industries = pickIndustries((p.title || '').toLowerCase());

    const existing: string[] = Array.isArray(p.tags) ? p.tags : [];
    const merged = Array.from(new Set([...existing, cluster, ...industries]));
    const addedTags = merged.filter((t) => !existing.includes(t));

    if (addedTags.length === 0) continue;

    report.push({ slug: p.slug, addedTags, cluster, industries });

    if (!dryRun) {
      const { error: upErr } = await supabase
        .from('blog_posts')
        .update({ tags: merged })
        .eq('id', p.id);
      if (!upErr) updated += 1;
    }
  }

  return NextResponse.json({
    dryRun,
    totalPosts: posts?.length ?? 0,
    postsChanged: report.length,
    updated: dryRun ? 0 : updated,
    report,
  });
}
