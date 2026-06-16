/**
 * Industry landing page content contract.
 *
 * One `IndustryLandingPage` template renders every industry page; each industry
 * supplies an `IndustryContent` object. This guarantees absolute structural
 * consistency across every industry while letting the copy be fully tailored.
 *
 * Med Spas (the approved reference page) defines the canonical tone, depth and
 * array lengths. New industries must match those lengths so the layout stays
 * identical:
 *   shift.questions: 6 · audit.promptCategories: 12 · audit.outputCards: 4
 *   competitorIntel.identifies: 6 · competitorIntel.tableRows: 5
 *   sourceLandscape.topSources: 4 · sourceLandscape.multiModel: 3
 *   brand.positioning: 7 · brand.assess: 8 · whatWeDo.pillars: 9
 *   earnedMedia.effects: 6 · practitioner.chips: 12 · services.items: 24
 *   process.steps: 6 · beforeAfter.before/after: 8 · whoFor.types: 12
 *   gaps.items: 8 · whyUs.items: 4 · auditOffer.includes: 13
 *   auditOffer.formFields: 6 · proof.cards: 4 · comparison columns: 8 · faqs: 12
 */

/** Lucide icon names referenced by the template's icon map. */
export type IndustryIcon =
  | 'Search'
  | 'Target'
  | 'Layers'
  | 'Megaphone'
  | 'UserCheck'
  | 'FileText'
  | 'BarChart3'
  | 'Award'
  | 'Building2'
  | 'Star';

export interface ModelScore {
  name: string;
  score: number;
  /** mentions, e.g. "4/10" */
  m: string;
  /** cited, e.g. "7/10" */
  c: string;
}

export interface NamedCount {
  name: string;
  count: number;
}

export interface CompetitorRow {
  name: string;
  /** number of AI models */
  m: number;
  /** number of prompts */
  p: number;
  /** frequency label, e.g. "23×" */
  f: string;
}

export interface SourcePct {
  name: string;
  pct: number;
}

export interface MultiModelSource {
  name: string;
  /** subset of ['ChatGPT','Gemini','Perplexity'] */
  models: string[];
}

export interface Pillar {
  num: string;
  title: string;
  body: string;
  icon: IndustryIcon;
  /** optional internal link (e.g. '/strategy-blueprint') */
  href?: string;
}

export interface IconCard {
  t: string;
  b: string;
  icon: IndustryIcon;
}

export interface TitleBody {
  t: string;
  b: string;
}

export interface ProcessStep {
  n: string;
  t: string;
  b: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface IndustryContent {
  /** Root-level route slug, must match lib/industries.ts (e.g. 'law-firms'). */
  slug: string;

  meta: {
    title: string;
    description: string;
    keywords: string[];
    ogTitle?: string;
    ogDescription?: string;
  };

  /** Button labels (kept explicit per industry to avoid awkward auto-grammar). */
  cta: {
    /** hero primary button, e.g. 'Get Your AI Visibility Audit' */
    heroPrimary: string;
    /** §3 button, e.g. 'Audit My Med Spa' */
    auditSection: string;
    /** §16 button, e.g. 'Get My Med Spa Audit' */
    auditOffer: string;
    /** final CTA button, e.g. 'Get Your Med Spa AI Visibility Audit' */
    final: string;
    /** mobile sticky bar, e.g. 'Audit My Med Spa' */
    mobile: string;
  };

  hero: {
    eyebrow: string;
    headlinePre: string;
    headlineHighlight: string;
    headlinePost?: string;
    paragraphs: string[];
    supportingLine: string;
    footnote: string;
    dashboardTitle: string;
  };

  dashboard: {
    score: number;
    /** e.g. '16/30 audited answers mentioned the brand' */
    scoreCaption: string;
    citedLine: string;
    citedSub: string;
    models: ModelScore[];
    competitorsHeading: string;
    competitorsCaption: string;
    competitors: NamedCount[];
    sources: string[];
  };

  shift: {
    heading: string;
    intro: string;
    questions: string[];
    paragraphs: string[];
    callout: string;
  };

  audit: {
    heading: string;
    /** intro text shown before the inline audit link */
    introPre: string;
    /** intro text shown after the inline audit link */
    introPost: string;
    outputCards: TitleBody[];
    promptCategories: string[];
  };

  competitorIntel: {
    heading: string;
    intro: string;
    identifiesHeading: string;
    identifies: string[];
    tableHeading: string;
    tableRows: CompetitorRow[];
    note: string;
  };

  sourceLandscape: {
    heading: string;
    paragraphs: string[];
    pullQuoteLine1: string;
    pullQuoteLead: string;
    pullQuoteHighlight: string;
    topSourcesTitle: string;
    topSourcesBody: string;
    topSources: SourcePct[];
    multiModelTitle: string;
    multiModelBody: string;
    multiModel: MultiModelSource[];
    ownedTitle: string;
    ownedBody: string;
    ownedPct: number;
    thirdPartyPct: number;
  };

  brand: {
    heading: string;
    intro: string;
    positioningHeading: string;
    positioning: string[];
    assessHeading: string;
    assess: string[];
    calloutPillA: string;
    calloutPillB: string;
    calloutStatement: string;
  };

  whatWeDo: {
    heading: string;
    paragraphsPre: string;
    /** inline link label inside the first paragraph */
    paragraphLinkLabel: string;
    paragraphLinkHref: string;
    paragraphsPost: string;
    paragraph2: string;
    pillars: Pillar[];
  };

  earnedMedia: {
    heading: string;
    paragraphs: string[];
    effectsIntro: string;
    effects: string[];
    closing: string;
    logosHeading: string;
  };

  practitioner: {
    sectionLabel: string;
    heading: string;
    paragraphs: string[];
    developIntro: string;
    chips: string[];
    closing: string;
  };

  services: {
    sectionLabel: string;
    heading: string;
    intro: string;
    focusHeading: string;
    badge: string;
    items: string[];
    closing: string;
  };

  process: {
    eyebrow: string;
    heading: string;
    steps: ProcessStep[];
  };

  beforeAfter: {
    heading: string;
    intro: string;
    before: string[];
    after: string[];
  };

  whoFor: {
    heading: string;
    intro: string;
    typesHeading: string;
    types: string[];
    qualification: string;
  };

  gaps: {
    heading: string;
    items: TitleBody[];
  };

  whyUs: {
    heading: string;
    paragraphs: string[];
    items: IconCard[];
  };

  auditOffer: {
    heading: string;
    intro: string;
    includesHeading: string;
    includes: string[];
    requestHeading: string;
    requestIntro: string;
    formFields: string[];
    blueprintEyebrow: string;
    blueprintHeading: string;
    blueprintBody: string;
  };

  proof: {
    heading: string;
    intro: string;
    cards: IconCard[];
  };

  comparison: {
    heading: string;
    traditionalLabel: string;
    traditional: string[];
    authorityLabel: string;
    authority: string[];
  };

  faq: {
    intro: string;
    items: Faq[];
  };

  related: {
    heading: string;
    intro: string;
  };

  finalCta: {
    eyebrow: string;
    heading: string;
    paragraph: string;
    footnote: string;
  };
}
