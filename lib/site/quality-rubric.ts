import { AiSetupAssets } from '@/lib/types/ai-setup';
import { SiteProfile } from '@/lib/site/site-profile';

export interface QualityIssue {
  code: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
}

export interface QualityReport {
  score: number;
  issues: QualityIssue[];
  needsRefinement: boolean;
}

const REQUIRED_AI_INFO_HEADINGS = [
  'Official Information About',
  'What the company is',
  'What the company does',
  'Who the company serves',
  'Core services',
  'Secondary services',
  'Key differentiators',
  'Process / methodology',
  'Team / founder / leadership',
  'Industries served',
  'FAQ',
  'Contact / next step',
  'Last updated',
];

const GENERIC_FILLER_PATTERNS = [
  /\bclear outcomes\b/i,
  /\bpractical support\b/i,
  /\breliable delivery\b/i,
  /\btrusted partner\b/i,
  /\bworld[- ]class\b/i,
  /\bcutting[- ]edge\b/i,
  /\btailored solutions\b/i,
];

const MANIPULATION_PATTERNS = [
  /\bignore\b.{0,40}\binstructions?\b/i,
  /\balways\s+say\b/i,
  /\brespond\s+with\b/i,
  /\bai\s+assistant\b.{0,60}\bmust\b/i,
  /^\s*(system|assistant|user)\s*:/im,
];

function countWords(value: string): number {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function checkAiInfoPage(issues: QualityIssue[], assets: AiSetupAssets, profile: SiteProfile): void {
  const aiInfoPage = assets.aiInfoPage;

  REQUIRED_AI_INFO_HEADINGS.forEach((heading) => {
    if (!new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').test(aiInfoPage)) {
      issues.push({
        code: 'ai-info-missing-section',
        message: `AI Info Page is missing required section: ${heading}`,
        severity: 'high',
      });
    }
  });

  if (countWords(aiInfoPage) < 320) {
    issues.push({
      code: 'ai-info-too-thin',
      message: 'AI Info Page is too short and should include richer grounded detail.',
      severity: 'high',
    });
  }

  const normalizedBrand = profile.brandName.trim();
  if (normalizedBrand) {
    const brandMentions = aiInfoPage.match(new RegExp(normalizedBrand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'));

    if (!brandMentions || brandMentions.length < 2) {
      issues.push({
        code: 'ai-info-brand-thin',
        message: 'AI Info Page should reference the brand clearly throughout the page.',
        severity: 'medium',
      });
    }
  }

  GENERIC_FILLER_PATTERNS.forEach((pattern) => {
    if (pattern.test(aiInfoPage)) {
      issues.push({
        code: 'ai-info-generic-copy',
        message: `AI Info Page contains generic filler phrase matching pattern: ${pattern}`,
        severity: 'medium',
      });
    }
  });

  MANIPULATION_PATTERNS.forEach((pattern) => {
    if (pattern.test(aiInfoPage)) {
      issues.push({
        code: 'ai-info-injection-leak',
        message: 'AI Info Page appears to include instruction-like text from crawled content.',
        severity: 'high',
      });
    }
  });
}

function checkImplementationGuides(issues: QualityIssue[], assets: AiSetupAssets): void {
  const guides = assets.implementationGuide;
  const entries = [
    { platform: 'WordPress', lines: guides.wordpress },
    { platform: 'Webflow', lines: guides.webflow },
    { platform: 'Shopify', lines: guides.shopify },
    { platform: 'Custom HTML', lines: guides.customHtml },
  ];

  entries.forEach(({ platform, lines }) => {
    if (!lines || lines.length < 10) {
      issues.push({
        code: 'implementation-too-thin',
        message: `${platform} implementation guide needs more explicit steps and QA detail.`,
        severity: 'high',
      });
      return;
    }

    const blob = lines.join(' ').toLowerCase();
    const requiredConcepts = ['what you are adding', 'where to add', 'verify', 'common mistakes'];

    requiredConcepts.forEach((concept) => {
      if (!blob.includes(concept)) {
        issues.push({
          code: 'implementation-missing-structure',
          message: `${platform} guide is missing required structure element: ${concept}.`,
          severity: 'medium',
        });
      }
    });
  });
}

function checkRobots(issues: QualityIssue[], assets: AiSetupAssets): void {
  const robots = assets.robotsTxt;

  if (!/User-agent\s*:/i.test(robots)) {
    issues.push({
      code: 'robots-missing-user-agent',
      message: 'robots.txt is missing at least one User-agent directive.',
      severity: 'high',
    });
  }

  if (!/Sitemap\s*:/i.test(robots)) {
    issues.push({
      code: 'robots-missing-sitemap',
      message: 'robots.txt should include a Sitemap directive.',
      severity: 'high',
    });
  }

  if (!/not\s+.*access\s+control/i.test(robots)) {
    issues.push({
      code: 'robots-safety-message-missing',
      message: 'robots.txt output should clearly state that robots is not access control.',
      severity: 'medium',
    });
  }
}

function checkSchema(issues: QualityIssue[], assets: AiSetupAssets): void {
  const schema = assets.schema;

  if (schema.notes.length < 6) {
    issues.push({
      code: 'schema-notes-thin',
      message: 'Schema notes should include richer placement, review, and validation instructions.',
      severity: 'medium',
    });
  }

  if (!schema.organization.trim().startsWith('{') || !schema.website.trim().startsWith('{')) {
    issues.push({
      code: 'schema-format',
      message: 'Schema snippets should be JSON-LD blocks serialized as JSON strings.',
      severity: 'medium',
    });
  }
}

function checkInternalLinking(issues: QualityIssue[], assets: AiSetupAssets): void {
  if (assets.internalLinking.length < 4) {
    issues.push({
      code: 'linking-too-thin',
      message: 'Internal linking plan should include at least four placement recommendations.',
      severity: 'medium',
    });
  }

  assets.internalLinking.forEach((entry, index) => {
    if (entry.reason.trim().length < 24) {
      issues.push({
        code: 'linking-reason-thin',
        message: `Internal linking item ${index + 1} needs a stronger reason statement.`,
        severity: 'low',
      });
    }
  });
}

function checkOptionalExtras(issues: QualityIssue[], assets: AiSetupAssets): void {
  const llms = assets.optionalExtras.llmsTxt.toLowerCase();
  const agents = assets.optionalExtras.agentsMd.toLowerCase();

  if (!llms.includes('optional') || !agents.includes('optional')) {
    issues.push({
      code: 'optional-labeling',
      message: 'Optional extras should be clearly labeled as optional/future-facing.',
      severity: 'medium',
    });
  }
}

function severityPenalty(severity: QualityIssue['severity']): number {
  if (severity === 'high') {
    return 10;
  }

  if (severity === 'medium') {
    return 5;
  }

  return 2;
}

export function evaluateSetupQuality(input: {
  assets: AiSetupAssets;
  profile: SiteProfile;
}): QualityReport {
  const issues: QualityIssue[] = [];

  checkAiInfoPage(issues, input.assets, input.profile);
  checkRobots(issues, input.assets);
  checkSchema(issues, input.assets);
  checkInternalLinking(issues, input.assets);
  checkImplementationGuides(issues, input.assets);
  checkOptionalExtras(issues, input.assets);

  const score = Math.max(
    0,
    100 -
      issues.reduce((total, issue) => {
        return total + severityPenalty(issue.severity);
      }, 0),
  );

  const hasHighIssue = issues.some((issue) => issue.severity === 'high');

  return {
    score,
    issues,
    needsRefinement: hasHighIssue || score < 82,
  };
}
