import { AiSetupRequest, ExtractedSiteSignals, PageSignals } from '@/lib/types/ai-setup';

export type FactConfidence = 'supported' | 'inferred' | 'unsupported';

export interface FactEvidence {
  path: string;
  snippet: string;
}

export interface SiteFact {
  value: string;
  confidence: FactConfidence;
  evidence: FactEvidence[];
}

export interface SiteProfile {
  origin: string;
  domain: string;
  brandName: string;
  companyDescription?: string;
  businessCategory?: SiteFact;
  offerStructure?: SiteFact;
  primaryServices: SiteFact[];
  secondaryServices: SiteFact[];
  targetAudiences: SiteFact[];
  industries: SiteFact[];
  differentiators: SiteFact[];
  methodologies: SiteFact[];
  proofPoints: SiteFact[];
  locations: SiteFact[];
  founderOrLeadership: SiteFact[];
  technology: SiteFact[];
  contactPaths: string[];
  ctaPaths: string[];
  navLinkPatterns: string[];
  footerLinkPatterns: string[];
  faqQuestions: string[];
  keyPages: Array<{
    path: string;
    title?: string;
    summary?: string;
  }>;
  evidenceHighlights: FactEvidence[];
}

interface FactAccumulatorEntry {
  value: string;
  score: number;
  evidence: FactEvidence[];
}

const SERVICE_GENERIC_PATTERN =
  /^(services?|solutions?|what we do|how it works|our services|capabilities|features|overview)$/i;

const GENERIC_FILLER_PATTERN =
  /\b(clear outcomes|practical support|reliable delivery|trusted partner|tailored solutions|world[- ]class|cutting[- ]edge)\b/i;

const BUSINESS_CATEGORIES: Array<{ pattern: RegExp; label: string }> = [
  { pattern: /\b(?:digital\s+pr|public\s+relations?)\b/i, label: 'Digital PR agency' },
  { pattern: /\b(?:ai\s+visibility|geo\b|generative\s+engine\s+optimization|llm\s+visibility)\b/i, label: 'AI visibility and GEO services' },
  { pattern: /\b(?:seo|search\s+engine\s+optimization)\b/i, label: 'SEO consultancy' },
  { pattern: /\b(?:link\s+building|authority\s+links?)\b/i, label: 'Authority link acquisition' },
  { pattern: /\b(?:software|platform|saas)\b/i, label: 'Software platform' },
  { pattern: /\b(?:consulting|consultancy|advisory)\b/i, label: 'Consulting services' },
  { pattern: /\b(?:agency|studio)\b/i, label: 'Agency services' },
];

const TECH_TERMS = [
  'Shopify',
  'WordPress',
  'Webflow',
  'HubSpot',
  'Salesforce',
  'Google Analytics',
  'GA4',
  'Search Console',
  'Meta Ads',
  'Google Ads',
  'Ahrefs',
  'Semrush',
  'OpenAI',
  'Claude',
  'Perplexity',
  'Supabase',
];

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function truncate(value: string, maxLength: number): string {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength).trim()}…`;
}

function dedupe(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean)));
}

function sanitizeFactValue(value: string): string {
  return normalizeWhitespace(value)
    .replace(/^[-•:\s]+/, '')
    .replace(/[|]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function toFactKey(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function isUsefulFactValue(value: string): boolean {
  if (!value || value.length < 4) {
    return false;
  }

  if (value.length > 140) {
    return false;
  }

  if (SERVICE_GENERIC_PATTERN.test(value)) {
    return false;
  }

  if (GENERIC_FILLER_PATTERN.test(value)) {
    return false;
  }

  return true;
}

function addFactCandidate(
  map: Map<string, FactAccumulatorEntry>,
  rawValue: string,
  score: number,
  evidence: FactEvidence,
): void {
  const value = sanitizeFactValue(rawValue);

  if (!isUsefulFactValue(value)) {
    return;
  }

  const key = toFactKey(value);
  if (!key) {
    return;
  }

  const existing = map.get(key);

  if (!existing) {
    map.set(key, {
      value,
      score,
      evidence: [evidence],
    });
    return;
  }

  existing.score = Math.max(existing.score, score);

  const evidenceKey = `${evidence.path}::${evidence.snippet.toLowerCase()}`;
  const existingEvidenceKeys = new Set(existing.evidence.map((item) => `${item.path}::${item.snippet.toLowerCase()}`));

  if (!existingEvidenceKeys.has(evidenceKey) && existing.evidence.length < 3) {
    existing.evidence.push(evidence);
  }
}

function scoreToConfidence(score: number): FactConfidence {
  if (score >= 3) {
    return 'supported';
  }

  if (score >= 2) {
    return 'inferred';
  }

  return 'unsupported';
}

function toFacts(map: Map<string, FactAccumulatorEntry>, limit: number): SiteFact[] {
  return Array.from(map.values())
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return b.evidence.length - a.evidence.length;
    })
    .slice(0, limit)
    .map((entry) => ({
      value: entry.value,
      confidence: scoreToConfidence(entry.score),
      evidence: entry.evidence,
    }))
    .filter((fact) => fact.confidence !== 'unsupported');
}

function splitIntoSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => normalizeWhitespace(sentence))
    .filter((sentence) => sentence.length >= 20 && sentence.length <= 260);
}

function pageSummary(page: PageSignals): string | undefined {
  const fromMeta = page.metaDescription ? truncate(page.metaDescription, 180) : undefined;
  if (fromMeta) {
    return fromMeta;
  }

  const firstSentence = splitIntoSentences(page.visibleText)[0];
  return firstSentence ? truncate(firstSentence, 180) : undefined;
}

function cleanTitle(rawTitle?: string): string | undefined {
  if (!rawTitle) {
    return undefined;
  }

  const candidate = rawTitle
    .split('|')[0]
    .split(' - ')[0]
    .split(' — ')[0]
    .trim();

  return candidate || undefined;
}

function inferBrandName(request: AiSetupRequest, extracted: ExtractedSiteSignals): string {
  if (request.brandName) {
    return request.brandName;
  }

  const homepage = extracted.pages.find((page) => page.path === '/') ?? extracted.pages[0];
  const fromTitle = cleanTitle(homepage?.title);

  if (fromTitle) {
    return fromTitle;
  }

  return new URL(extracted.origin).hostname.replace(/^www\./i, '');
}

function inferDescription(request: AiSetupRequest, extracted: ExtractedSiteSignals): string | undefined {
  if (request.shortDescription) {
    return request.shortDescription;
  }

  const homepage = extracted.pages.find((page) => page.path === '/') ?? extracted.pages[0];

  if (homepage?.metaDescription) {
    return homepage.metaDescription;
  }

  const fallback = splitIntoSentences(homepage?.visibleText ?? '')[0];
  return fallback ? truncate(fallback, 220) : undefined;
}

function extractCategory(extracted: ExtractedSiteSignals): SiteFact | undefined {
  const homepage = extracted.pages.find((page) => page.path === '/') ?? extracted.pages[0];
  if (!homepage) {
    return undefined;
  }

  const corpus = [homepage.title, homepage.metaDescription, ...homepage.headings, homepage.visibleText]
    .filter(Boolean)
    .join(' ');

  for (const category of BUSINESS_CATEGORIES) {
    if (category.pattern.test(corpus)) {
      return {
        value: category.label,
        confidence: 'supported',
        evidence: [
          {
            path: homepage.path,
            snippet: truncate(corpus, 220),
          },
        ],
      };
    }
  }

  return undefined;
}

function extractOfferStructure(extracted: ExtractedSiteSignals): SiteFact | undefined {
  const servicePage = extracted.pages.find((page) => /\/(?:services?|solutions?|offers?)(?:\/|$)/i.test(page.path));

  if (servicePage?.headings.length) {
    return {
      value: servicePage.headings.slice(0, 3).join(' | '),
      confidence: 'supported',
      evidence: [
        {
          path: servicePage.path,
          snippet: servicePage.headings.slice(0, 3).join(' | '),
        },
      ],
    };
  }

  return undefined;
}

function extractServices(extracted: ExtractedSiteSignals): {
  primaryServices: SiteFact[];
  secondaryServices: SiteFact[];
} {
  const primaryMap = new Map<string, FactAccumulatorEntry>();
  const secondaryMap = new Map<string, FactAccumulatorEntry>();

  extracted.pages.forEach((page) => {
    const isServicePage = /\/(?:services?|solutions?|offers?|what-we-do)(?:\/|$)/i.test(page.path);
    const headingScore = isServicePage ? 3 : 2;

    page.headings.forEach((heading) => {
      if (/\b(service|solution|offer|capability|program|package)\b/i.test(heading) || isServicePage) {
        addFactCandidate(primaryMap, heading, headingScore, {
          path: page.path,
          snippet: heading,
        });
      }
    });

    const sentenceCandidates = splitIntoSentences(page.visibleText).filter((sentence) =>
      /\b(services? include|we (?:offer|provide|speciali[sz]e in|focus on)|capabilities include|solutions include)\b/i.test(
        sentence,
      ),
    );

    sentenceCandidates.forEach((sentence) => {
      const normalized = sentence.replace(/^[^.]*?(?:include|in)\s*/i, '');
      const items = normalized
        .split(/,|\band\b|\&/i)
        .map((item) => item.trim())
        .filter((item) => item.length >= 4 && item.length <= 80);

      items.forEach((item) => {
        addFactCandidate(primaryMap, item, isServicePage ? 3 : 2, {
          path: page.path,
          snippet: truncate(sentence, 180),
        });
      });
    });

    page.headings.forEach((heading) => {
      if (/\b(why|difference|results|process|framework|methodology|approach)\b/i.test(heading)) {
        addFactCandidate(secondaryMap, heading, isServicePage ? 2 : 1, {
          path: page.path,
          snippet: heading,
        });
      }
    });
  });

  const primaryServices = toFacts(primaryMap, 8);
  const secondaryServices = toFacts(secondaryMap, 6).filter(
    (fact) => !primaryServices.some((service) => toFactKey(service.value) === toFactKey(fact.value)),
  );

  return {
    primaryServices,
    secondaryServices,
  };
}

function extractAudiencesAndIndustries(extracted: ExtractedSiteSignals): {
  targetAudiences: SiteFact[];
  industries: SiteFact[];
} {
  const audienceMap = new Map<string, FactAccumulatorEntry>();
  const industryMap = new Map<string, FactAccumulatorEntry>();

  extracted.pages.forEach((page) => {
    const isIndustryPage = /\/(?:industr(?:y|ies)|sectors?|verticals?)(?:\/|$)/i.test(page.path);
    const sentencePool = [
      ...page.headings,
      ...splitIntoSentences(page.visibleText).slice(0, 40),
    ];

    sentencePool.forEach((sentence) => {
      const matches = sentence.match(/\b(?:for|serving|helping|supporting)\s+([A-Za-z0-9\-\/&, ]{4,90})/i);
      if (!matches?.[1]) {
        return;
      }

      const cleaned = matches[1]
        .replace(/\b(with|to|across|through|on)\b.*$/i, '')
        .trim();

      if (!cleaned) {
        return;
      }

      addFactCandidate(audienceMap, cleaned, isIndustryPage ? 3 : 2, {
        path: page.path,
        snippet: truncate(sentence, 180),
      });
    });

    if (isIndustryPage) {
      page.headings.forEach((heading) => {
        addFactCandidate(industryMap, heading, 3, {
          path: page.path,
          snippet: heading,
        });
      });
    }
  });

  return {
    targetAudiences: toFacts(audienceMap, 8),
    industries: toFacts(industryMap, 8),
  };
}

function extractDifferentiatorsAndMethods(extracted: ExtractedSiteSignals): {
  differentiators: SiteFact[];
  methodologies: SiteFact[];
} {
  const differentiatorMap = new Map<string, FactAccumulatorEntry>();
  const methodologyMap = new Map<string, FactAccumulatorEntry>();

  extracted.pages.forEach((page) => {
    const sources = [...page.headings, ...splitIntoSentences(page.visibleText).slice(0, 50)];

    sources.forEach((source) => {
      if (/\b(what makes|why choose|differentiator|unique|advantage|competitive)\b/i.test(source)) {
        addFactCandidate(differentiatorMap, source, 2, {
          path: page.path,
          snippet: truncate(source, 180),
        });
      }

      if (/\b(process|framework|methodology|playbook|approach|how it works)\b/i.test(source)) {
        addFactCandidate(methodologyMap, source, 2, {
          path: page.path,
          snippet: truncate(source, 180),
        });
      }
    });
  });

  return {
    differentiators: toFacts(differentiatorMap, 8),
    methodologies: toFacts(methodologyMap, 8),
  };
}

function extractProofPoints(extracted: ExtractedSiteSignals): SiteFact[] {
  const proofMap = new Map<string, FactAccumulatorEntry>();

  extracted.pages.forEach((page) => {
    const candidates = splitIntoSentences(page.visibleText).filter((sentence) =>
      /\b(trusted by|clients?|case stud(?:y|ies)|results?|featured in|testimonials?|reviews?|%|x\b|ROI|uplift|growth)\b/i.test(
        sentence,
      ),
    );

    candidates.forEach((sentence) => {
      addFactCandidate(proofMap, sentence, 2, {
        path: page.path,
        snippet: truncate(sentence, 200),
      });
    });
  });

  return toFacts(proofMap, 10);
}

function extractLocations(extracted: ExtractedSiteSignals): SiteFact[] {
  const locationMap = new Map<string, FactAccumulatorEntry>();

  extracted.pages.forEach((page) => {
    page.schemaObjects.forEach((schemaObject) => {
      if (!schemaObject || typeof schemaObject !== 'object') {
        return;
      }

      const record = schemaObject as Record<string, unknown>;
      const address = record.address;

      if (!address || typeof address !== 'object') {
        return;
      }

      const addressRecord = address as Record<string, unknown>;
      const locality = typeof addressRecord.addressLocality === 'string' ? addressRecord.addressLocality : '';
      const region = typeof addressRecord.addressRegion === 'string' ? addressRecord.addressRegion : '';
      const country = typeof addressRecord.addressCountry === 'string' ? addressRecord.addressCountry : '';

      const location = [locality, region, country].filter(Boolean).join(', ');

      if (!location) {
        return;
      }

      addFactCandidate(locationMap, location, 3, {
        path: page.path,
        snippet: `Schema address: ${location}`,
      });
    });

    const locationSentence = splitIntoSentences(page.visibleText).find((sentence) =>
      /\b(?:based in|located in|offices in|serving clients in)\b/i.test(sentence),
    );

    if (locationSentence) {
      addFactCandidate(locationMap, locationSentence, 2, {
        path: page.path,
        snippet: truncate(locationSentence, 180),
      });
    }
  });

  return toFacts(locationMap, 4);
}

function extractLeadership(extracted: ExtractedSiteSignals): SiteFact[] {
  const leadershipMap = new Map<string, FactAccumulatorEntry>();

  extracted.pages.forEach((page) => {
    const matches = page.visibleText.matchAll(
      /([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2})\s*,\s*(Founder|Co-Founder|CEO|Managing Director|Director|Head of [A-Za-z ]+)/g,
    );

    for (const match of matches) {
      const value = `${match[1]} (${match[2]})`;
      addFactCandidate(leadershipMap, value, 3, {
        path: page.path,
        snippet: truncate(match[0], 160),
      });
    }
  });

  return toFacts(leadershipMap, 5);
}

function extractTechnology(extracted: ExtractedSiteSignals): SiteFact[] {
  const techMap = new Map<string, FactAccumulatorEntry>();

  extracted.pages.forEach((page) => {
    const corpus = `${page.title ?? ''} ${page.metaDescription ?? ''} ${page.visibleText}`;

    TECH_TERMS.forEach((term) => {
      const pattern = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}\\b`, 'i');
      if (!pattern.test(corpus)) {
        return;
      }

      addFactCandidate(techMap, term, 2, {
        path: page.path,
        snippet: `Mentioned on ${page.path}`,
      });
    });
  });

  return toFacts(techMap, 10);
}

function extractFaqQuestions(extracted: ExtractedSiteSignals): string[] {
  const questions: string[] = [];

  extracted.pages.forEach((page) => {
    const isFaqPage = /\/(?:faq|faqs|questions)(?:\/|$)/i.test(page.path);

    page.headings.forEach((heading) => {
      if (heading.endsWith('?') || isFaqPage) {
        questions.push(heading.endsWith('?') ? heading : `${heading}?`);
      }
    });

    if (isFaqPage) {
      splitIntoSentences(page.visibleText)
        .filter((sentence) => sentence.endsWith('?'))
        .slice(0, 8)
        .forEach((question) => questions.push(question));
    }
  });

  return dedupe(questions).slice(0, 10);
}

function extractNavAndFooterPatterns(extracted: ExtractedSiteSignals): {
  navLinkPatterns: string[];
  footerLinkPatterns: string[];
  contactPaths: string[];
  ctaPaths: string[];
} {
  const nav = dedupe(extracted.pages.flatMap((page) => page.navLinks ?? []));
  const footer = dedupe(extracted.pages.flatMap((page) => page.footerLinks ?? []));
  const ctaPaths = dedupe(extracted.pages.flatMap((page) => page.ctaLinks ?? []));

  const contactPaths = dedupe(
    [...nav, ...footer, ...extracted.pages.map((page) => page.path)].filter((path) =>
      /\/(?:contact|get-in-touch|book|schedule|consultation)(?:\/|$)/i.test(path),
    ),
  );

  return {
    navLinkPatterns: nav.slice(0, 25),
    footerLinkPatterns: footer.slice(0, 25),
    contactPaths: contactPaths.slice(0, 15),
    ctaPaths: ctaPaths.slice(0, 20),
  };
}

function buildEvidenceHighlights(profile: Omit<SiteProfile, 'evidenceHighlights'>): FactEvidence[] {
  const collections = [
    profile.primaryServices,
    profile.secondaryServices,
    profile.targetAudiences,
    profile.industries,
    profile.differentiators,
    profile.methodologies,
    profile.proofPoints,
    profile.locations,
    profile.founderOrLeadership,
    profile.technology,
  ];

  const highlights: FactEvidence[] = [];
  const seen = new Set<string>();

  collections.forEach((facts) => {
    facts.forEach((fact) => {
      fact.evidence.forEach((evidence) => {
        const fingerprint = `${evidence.path}::${evidence.snippet.toLowerCase()}`;
        if (seen.has(fingerprint) || highlights.length >= 16) {
          return;
        }

        seen.add(fingerprint);
        highlights.push(evidence);
      });
    });
  });

  return highlights;
}

export function buildSiteProfile(input: {
  request: AiSetupRequest;
  extracted: ExtractedSiteSignals;
}): SiteProfile {
  const { request, extracted } = input;
  const originUrl = new URL(extracted.origin);

  const brandName = inferBrandName(request, extracted);
  const companyDescription = inferDescription(request, extracted);

  const category = extractCategory(extracted);
  const offerStructure = extractOfferStructure(extracted);
  const services = extractServices(extracted);
  const audiencesAndIndustries = extractAudiencesAndIndustries(extracted);
  const differentiatorsAndMethods = extractDifferentiatorsAndMethods(extracted);

  const keyPages = extracted.pages
    .slice(0, 18)
    .map((page) => ({
      path: page.path,
      title: page.title,
      summary: pageSummary(page),
    }));

  const navAndFooter = extractNavAndFooterPatterns(extracted);

  const baseProfile: Omit<SiteProfile, 'evidenceHighlights'> = {
    origin: extracted.origin,
    domain: originUrl.hostname,
    brandName,
    companyDescription,
    businessCategory: category,
    offerStructure,
    primaryServices: services.primaryServices,
    secondaryServices: services.secondaryServices,
    targetAudiences: audiencesAndIndustries.targetAudiences,
    industries: audiencesAndIndustries.industries,
    differentiators: differentiatorsAndMethods.differentiators,
    methodologies: differentiatorsAndMethods.methodologies,
    proofPoints: extractProofPoints(extracted),
    locations: extractLocations(extracted),
    founderOrLeadership: extractLeadership(extracted),
    technology: extractTechnology(extracted),
    contactPaths: navAndFooter.contactPaths,
    ctaPaths: navAndFooter.ctaPaths,
    navLinkPatterns: navAndFooter.navLinkPatterns,
    footerLinkPatterns: navAndFooter.footerLinkPatterns,
    faqQuestions: extractFaqQuestions(extracted),
    keyPages,
  };

  return {
    ...baseProfile,
    evidenceHighlights: buildEvidenceHighlights(baseProfile),
  };
}

export function profileFactValues(facts: SiteFact[]): string[] {
  return facts.map((fact) => fact.value);
}
