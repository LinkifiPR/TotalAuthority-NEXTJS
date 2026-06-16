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
 * Cluster logic for the `related` field:
 *   - clinical: med spas, health, dental, eye, therapy, rehab, cosmetic surgery, private medical
 *   - financial: accountancy, tax, financial advisory, wealth, mortgage, insurance, investment, estate planning, business brokers, insolvency
 *   - legal: law firms (links to accountancy and other professional services)
 *   - property/build: real estate, chartered surveyors, architectural, engineering, business consultancies
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
  // ───── Clinical cluster ─────
  {
    slug: 'med-spas',
    name: 'Med Spas',
    status: 'live',
    related: ['cosmetic-surgery-clinics', 'dental-clinics', 'health-clinics'],
    shortDescription: 'AI visibility and authority for medical aesthetics clinics.',
  },
  {
    slug: 'health-clinics',
    name: 'Health Clinics',
    status: 'coming-soon',
    related: ['private-medical-practices', 'med-spas', 'therapy-clinics'],
    shortDescription: 'Build authority for general and specialist health practices.',
  },
  {
    slug: 'dental-clinics',
    name: 'Dental Clinics',
    status: 'coming-soon',
    related: ['med-spas', 'eye-clinics', 'cosmetic-surgery-clinics'],
    shortDescription: 'Get your dental practice recommended in AI search.',
  },
  {
    slug: 'eye-clinics',
    name: 'Eye Clinics',
    status: 'coming-soon',
    related: ['dental-clinics', 'cosmetic-surgery-clinics', 'health-clinics'],
    shortDescription: 'AI visibility for ophthalmology and optometry clinics.',
  },
  {
    slug: 'therapy-clinics',
    name: 'Therapy Clinics',
    status: 'coming-soon',
    related: ['rehab-centres', 'health-clinics', 'private-medical-practices'],
    shortDescription: 'Authority building for therapy and mental-health practices.',
  },
  {
    slug: 'rehab-centres',
    name: 'Rehab Centres',
    status: 'coming-soon',
    related: ['therapy-clinics', 'private-medical-practices', 'health-clinics'],
    shortDescription: 'AI visibility for addiction, recovery and rehabilitation centres.',
  },
  {
    slug: 'cosmetic-surgery-clinics',
    name: 'Cosmetic Surgery Clinics',
    status: 'coming-soon',
    related: ['med-spas', 'dental-clinics', 'private-medical-practices'],
    shortDescription: 'AI authority for plastic and cosmetic surgery practices.',
  },
  {
    slug: 'private-medical-practices',
    name: 'Private Medical Practices',
    status: 'coming-soon',
    related: ['health-clinics', 'cosmetic-surgery-clinics', 'therapy-clinics'],
    shortDescription: 'Authority building for private consultants and specialists.',
  },

  // ───── Legal ─────
  {
    slug: 'law-firms',
    name: 'Law Firms',
    status: 'coming-soon',
    related: ['accountancy-firms', 'estate-planning-firms', 'tax-advisory-firms'],
    shortDescription: 'Get your firm cited as the trusted authority in your practice area.',
  },

  // ───── Accountancy / tax / advisory ─────
  {
    slug: 'accountancy-firms',
    name: 'Accountancy Firms',
    status: 'coming-soon',
    related: ['tax-advisory-firms', 'financial-advisory-firms', 'business-consultancies'],
    shortDescription: 'Build AI authority for accountancy partnerships and firms.',
  },
  {
    slug: 'tax-advisory-firms',
    name: 'Tax Advisory Firms',
    status: 'coming-soon',
    related: ['accountancy-firms', 'financial-advisory-firms', 'estate-planning-firms'],
    shortDescription: 'AI visibility for tax advisers and consultants.',
  },
  {
    slug: 'financial-advisory-firms',
    name: 'Financial Advisory Firms',
    status: 'coming-soon',
    related: ['wealth-management-firms', 'accountancy-firms', 'investment-firms'],
    shortDescription: 'Authority for financial advisers and IFAs.',
  },
  {
    slug: 'wealth-management-firms',
    name: 'Wealth Management Firms',
    status: 'coming-soon',
    related: ['financial-advisory-firms', 'investment-firms', 'estate-planning-firms'],
    shortDescription: 'AI visibility for wealth managers and private client teams.',
  },
  {
    slug: 'mortgage-brokers',
    name: 'Mortgage Brokers',
    status: 'coming-soon',
    related: ['insurance-brokers', 'financial-advisory-firms', 'real-estate-firms'],
    shortDescription: 'Build authority for mortgage brokers in competitive local markets.',
  },
  {
    slug: 'insurance-brokers',
    name: 'Insurance Brokers',
    status: 'coming-soon',
    related: ['mortgage-brokers', 'financial-advisory-firms', 'business-brokers'],
    shortDescription: 'AI visibility for commercial and personal insurance brokers.',
  },
  {
    slug: 'investment-firms',
    name: 'Investment Firms',
    status: 'coming-soon',
    related: ['wealth-management-firms', 'financial-advisory-firms', 'business-brokers'],
    shortDescription: 'AI authority for investment houses and asset managers.',
  },

  // ───── Property / build / professional services ─────
  {
    slug: 'real-estate-firms',
    name: 'Real Estate Firms',
    status: 'coming-soon',
    related: ['chartered-surveyors', 'architectural-firms', 'mortgage-brokers'],
    shortDescription: 'AI visibility for agencies, brokerages and developers.',
  },
  {
    slug: 'chartered-surveyors',
    name: 'Chartered Surveyors',
    status: 'coming-soon',
    related: ['real-estate-firms', 'architectural-firms', 'engineering-consultancies'],
    shortDescription: 'Authority building for surveying and valuation practices.',
  },
  {
    slug: 'architectural-firms',
    name: 'Architectural Firms',
    status: 'coming-soon',
    related: ['engineering-consultancies', 'real-estate-firms', 'chartered-surveyors'],
    shortDescription: 'AI authority for architects and design studios.',
  },
  {
    slug: 'engineering-consultancies',
    name: 'Engineering Consultancies',
    status: 'coming-soon',
    related: ['architectural-firms', 'chartered-surveyors', 'business-consultancies'],
    shortDescription: 'AI visibility for engineering consultancies and specialists.',
  },

  // ───── Business advisory ─────
  {
    slug: 'business-consultancies',
    name: 'Business Consultancies',
    status: 'coming-soon',
    related: ['accountancy-firms', 'business-brokers', 'insolvency-practitioners'],
    shortDescription: 'AI authority for management and strategy consultancies.',
  },
  {
    slug: 'business-brokers',
    name: 'Business Brokers',
    status: 'coming-soon',
    related: ['business-consultancies', 'accountancy-firms', 'insolvency-practitioners'],
    shortDescription: 'AI visibility for business brokers and M&A advisers.',
  },
  {
    slug: 'insolvency-practitioners',
    name: 'Insolvency Practitioners',
    status: 'coming-soon',
    related: ['accountancy-firms', 'business-consultancies', 'law-firms'],
    shortDescription: 'Authority building for insolvency and restructuring firms.',
  },
  {
    slug: 'estate-planning-firms',
    name: 'Estate Planning Firms',
    status: 'coming-soon',
    related: ['law-firms', 'wealth-management-firms', 'tax-advisory-firms'],
    shortDescription: 'AI visibility for wills, trusts and estate planning practices.',
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
