/**
 * Central source of truth for all industry landing pages.
 *
 * Each industry has:
 *   - slug      → URL path (root-level, e.g. /med-spas)
 *   - name      → display name in nav / footer / breadcrumbs
 *   - status    → "live" (page exists) | "coming-soon" (listed but not yet built)
 *   - related   → 3 sibling industries to cross-link to from the page
 *
 * When a new industry page ships, flip status: "coming-soon" → "live"
 * and the nav/footer links activate automatically — no other edits needed.
 *
 * Internal linking strategy (applied by every industry page template):
 *   - Header dropdown lists every "live" industry
 *   - Footer lists every industry (live ones link, coming-soon ones show pill)
 *   - Each industry page renders a "Related industries" section linking to
 *     its three nearest siblings (defined by `related`), naturally distributing
 *     PageRank-style link equity through clinical / professional / trades clusters
 *   - Each page also cross-links into the product flow:
 *       /llm-visibility-audit
 *       /llm-visibility-gap-calculator
 *       /strategy-blueprint
 *       /about
 *       /blog
 */

export type IndustryStatus = 'live' | 'coming-soon';

export interface Industry {
  slug: string;
  name: string;
  status: IndustryStatus;
  /** Slugs of 3 nearest siblings for cross-linking */
  related: string[];
  /** Short label used in cross-link cards */
  shortDescription: string;
}

export const INDUSTRIES: Industry[] = [
  // Medical / clinical cluster
  {
    slug: 'med-spas',
    name: 'Med Spas',
    status: 'live',
    related: ['dental-clinics', 'eye-clinics', 'health-clinics'],
    shortDescription: 'AI visibility and authority for medical aesthetics clinics.',
  },
  {
    slug: 'health-clinics',
    name: 'Health Clinics',
    status: 'coming-soon',
    related: ['med-spas', 'dental-clinics', 'therapy-clinics'],
    shortDescription: 'Build authority for general and specialist health practices.',
  },
  {
    slug: 'dental-clinics',
    name: 'Dental Clinics',
    status: 'coming-soon',
    related: ['med-spas', 'eye-clinics', 'health-clinics'],
    shortDescription: 'Get your dental practice recommended in AI search.',
  },
  {
    slug: 'eye-clinics',
    name: 'Eye Clinics',
    status: 'coming-soon',
    related: ['med-spas', 'dental-clinics', 'health-clinics'],
    shortDescription: 'AI visibility for ophthalmology and optometry clinics.',
  },
  {
    slug: 'therapy-clinics',
    name: 'Therapy Clinics',
    status: 'coming-soon',
    related: ['rehab-centers', 'health-clinics', 'med-spas'],
    shortDescription: 'Authority building for therapy and mental health practices.',
  },
  {
    slug: 'rehab-centers',
    name: 'Rehab Centers',
    status: 'coming-soon',
    related: ['therapy-clinics', 'health-clinics', 'med-spas'],
    shortDescription: 'AI visibility for addiction and recovery centers.',
  },

  // Professional services cluster
  {
    slug: 'law-firms',
    name: 'Law Firms',
    status: 'coming-soon',
    related: ['finance-firms', 'real-estate', 'therapy-clinics'],
    shortDescription: 'Get your firm cited as the trusted authority in your practice area.',
  },
  {
    slug: 'finance-firms',
    name: 'Finance Firms',
    status: 'coming-soon',
    related: ['law-firms', 'real-estate', 'interior-design'],
    shortDescription: 'Build AI authority for advisors, accountants and wealth managers.',
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    status: 'coming-soon',
    related: ['interior-design', 'construction', 'finance-firms'],
    shortDescription: 'AI visibility for agencies, brokerages and developers.',
  },

  // Design / build / trades cluster
  {
    slug: 'interior-design',
    name: 'Interior Design',
    status: 'coming-soon',
    related: ['construction', 'real-estate', 'landscaping'],
    shortDescription: 'AI authority for interior designers and studios.',
  },
  {
    slug: 'construction',
    name: 'Construction',
    status: 'coming-soon',
    related: ['interior-design', 'landscaping', 'fencing-companies'],
    shortDescription: 'Build visibility for builders, contractors and developers.',
  },
  {
    slug: 'landscaping',
    name: 'Landscaping',
    status: 'coming-soon',
    related: ['fencing-companies', 'construction', 'interior-design'],
    shortDescription: 'AI visibility for landscapers and outdoor specialists.',
  },
  {
    slug: 'fencing-companies',
    name: 'Fencing Companies',
    status: 'coming-soon',
    related: ['landscaping', 'construction', 'hvac'],
    shortDescription: 'Get your fencing company recommended over local competitors.',
  },
  {
    slug: 'hvac',
    name: 'HVAC',
    status: 'coming-soon',
    related: ['plumbing', 'pest-control', 'construction'],
    shortDescription: 'AI visibility for heating, ventilation and air-conditioning companies.',
  },
  {
    slug: 'plumbing',
    name: 'Plumbing',
    status: 'coming-soon',
    related: ['hvac', 'pest-control', 'construction'],
    shortDescription: 'Build authority for plumbing companies in competitive local markets.',
  },
  {
    slug: 'pest-control',
    name: 'Pest Control',
    status: 'coming-soon',
    related: ['plumbing', 'hvac', 'landscaping'],
    shortDescription: 'AI visibility and lead generation for pest control firms.',
  },

  // Travel
  {
    slug: 'travel',
    name: 'Travel',
    status: 'coming-soon',
    related: ['real-estate', 'finance-firms', 'interior-design'],
    shortDescription: 'AI visibility for travel agencies, tour operators and hospitality.',
  },
];

export const INDUSTRY_BY_SLUG: Record<string, Industry> = Object.fromEntries(
  INDUSTRIES.map((i) => [i.slug, i])
);

export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRY_BY_SLUG[slug];
}

export function getRelatedIndustries(slug: string): Industry[] {
  const i = getIndustry(slug);
  if (!i) return [];
  return i.related
    .map((s) => INDUSTRY_BY_SLUG[s])
    .filter(Boolean) as Industry[];
}

export const LIVE_INDUSTRIES = INDUSTRIES.filter((i) => i.status === 'live');
