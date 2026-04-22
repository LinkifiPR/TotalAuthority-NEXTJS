import {
  AiSetupAssets,
  AiSetupAssetsSchema,
  AiSetupRequest,
  DetectedAssets,
  ExtractedSiteSignals,
  ImplementationGuide,
  InternalLinkSuggestion,
  OptionalExtras,
  SchemaSuggestions,
} from '@/lib/types/ai-setup';
import { callOpenRouter } from '@/lib/ai/openrouter';

interface GenerateSetupInput {
  request: AiSetupRequest;
  origin: string;
  extracted: ExtractedSiteSignals;
  detected: DetectedAssets;
}

export interface GenerateSetupResult {
  assets: AiSetupAssets;
  mode: 'openrouter' | 'fallback';
  warnings: string[];
}

interface MergeableAssets {
  aiInfoPage?: string;
  robotsTxt?: string;
  schema?: Partial<SchemaSuggestions>;
  internalLinking?: InternalLinkSuggestion[];
  implementationGuide?: Partial<ImplementationGuide>;
  optionalExtras?: Partial<OptionalExtras>;
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

  const hostname = new URL(extracted.origin).hostname.replace(/^www\./i, '');
  return hostname;
}

function inferDescription(request: AiSetupRequest, extracted: ExtractedSiteSignals): string {
  if (request.shortDescription) {
    return request.shortDescription;
  }

  const homepage = extracted.pages.find((page) => page.path === '/') ?? extracted.pages[0];

  if (homepage?.metaDescription) {
    return homepage.metaDescription;
  }

  if (homepage?.visibleText) {
    return homepage.visibleText.slice(0, 220);
  }

  return 'We help customers solve a clear business problem with trusted delivery.';
}

function inferServiceHint(extracted: ExtractedSiteSignals): string {
  const servicePage = extracted.pages.find((page) => page.path === '/services');

  if (servicePage?.headings.length) {
    return servicePage.headings[0];
  }

  const headingWithService = extracted.pages
    .flatMap((page) => page.headings)
    .find((heading) => /service|solution|offer|program/i.test(heading));

  return headingWithService ?? 'Core Services';
}

function ensureSitemapLine(robotsTxt: string, origin: string): string {
  if (/^sitemap:/im.test(robotsTxt)) {
    return robotsTxt;
  }

  const normalized = robotsTxt.trim();
  const sitemapLine = `Sitemap: ${origin}/sitemap.xml`;

  return normalized ? `${normalized}\n\n${sitemapLine}` : sitemapLine;
}

function buildFallbackAiInfoPage(params: {
  brandName: string;
  description: string;
  country?: string;
  serviceHint: string;
}): string {
  const updatedAt = new Date().toISOString().slice(0, 10);

  return `# AI Information: ${params.brandName}

## Who we are
${params.brandName} is a ${params.country ? `${params.country}-focused ` : ''}business focused on clear outcomes for clients.

## What we do
${params.description}

## Who we serve
We serve organizations that need practical, commercially focused support and reliable delivery.

## What makes us different
- Clear process and execution standards
- Emphasis on measurable business outcomes
- Transparent communication and implementation

## How it works
1. Discovery call and business context capture
2. Strategy and implementation plan
3. Execution, review, and iteration

## Services
- ${params.serviceHint}
- Strategic advisory and implementation support
- Ongoing optimization and reporting

## Team
Our team combines strategy, implementation, and operations experience to deliver outcomes quickly.

## FAQ
### Do you offer implementation support?
Yes. We can provide hands-on implementation or developer-ready handoff instructions.

### How quickly can we launch updates?
Most setup updates can be shipped in days, then refined in weekly cycles.

## Last updated
${updatedAt}`;
}

function buildFallbackRobotsTxt(origin: string): string {
  return `# Recommended robots.txt (review before publishing)
User-agent: *
Allow: /

# Keep sensitive/system paths restricted when applicable
Disallow: /wp-admin/
Disallow: /cart/
Disallow: /checkout/

Sitemap: ${origin}/sitemap.xml

# Optional / experimental AI crawler directives
# User-agent: GPTBot
# Allow: /
#
# User-agent: ClaudeBot
# Allow: /`;
}

function buildFallbackSchema(params: {
  origin: string;
  brandName: string;
  description: string;
  serviceHint: string;
}): SchemaSuggestions {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: params.brandName,
    url: params.origin,
    description: params.description,
    logo: `${params.origin}/favicon.png`,
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: params.brandName,
    url: params.origin,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${params.origin}/?s={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: params.serviceHint,
    provider: {
      '@type': 'Organization',
      name: params.brandName,
      url: params.origin,
    },
    areaServed: 'Global',
  };

  return {
    organization: JSON.stringify(organization, null, 2),
    website: JSON.stringify(website, null, 2),
    service: JSON.stringify(service, null, 2),
    notes: [
      'Validate all URLs and contact fields before publishing schema changes.',
      'If you have a public founder profile, add a Person schema block and connect it with sameAs links.',
    ],
  };
}

function buildFallbackInternalLinking(): InternalLinkSuggestion[] {
  return [
    {
      fromPage: 'Global footer',
      anchorText: 'AI Information',
      placement: 'Footer utility links',
      reason: 'Ensures consistent discovery by users and crawlers from every page.',
    },
    {
      fromPage: '/about',
      anchorText: 'How AI systems understand our business',
      placement: 'Near mission/team section',
      reason: 'Connects your narrative and trust story to the structured AI page.',
    },
    {
      fromPage: '/services',
      anchorText: 'AI-ready company summary',
      placement: 'Intro section and final CTA block',
      reason: 'Reinforces service relevance and creates clear topical links.',
    },
    {
      fromPage: '/blog',
      anchorText: 'Company AI information page',
      placement: 'Blog sidebar or author bio module',
      reason: 'Improves internal topical authority across informational content.',
    },
  ];
}

function buildFallbackImplementationGuide(origin: string): ImplementationGuide {
  return {
    wordpress: [
      'Create a new page at /ai with the generated AI Info Page content.',
      'Update SEO plugin settings so the AI page is indexable and included in the sitemap.',
      'Merge the recommended robots.txt content carefully with any existing custom directives.',
      'Insert Organization, WebSite, and Service JSON-LD in your SEO plugin schema settings.',
      `Add internal links from About, Services, and Footer to ${origin}/ai.`,
    ],
    webflow: [
      'Add a static page called AI Info and set slug to /ai.',
      'Paste the generated AI Info content with heading hierarchy preserved.',
      'Add robots and sitemap directives in project settings without removing current rules.',
      'Inject JSON-LD snippets in page/site custom code settings.',
      'Add navigation/footer/internal contextual links to the AI page.',
    ],
    shopify: [
      'Create a new Online Store page with handle /ai.',
      'Add the generated AI Info copy and keep H2/H3 section structure intact.',
      'Update robots.txt.liquid carefully, preserving existing disallow rules.',
      'Add schema in theme.liquid or dedicated schema snippet with merchant-specific values.',
      'Link the AI page from footer menu, About section, and key product collection pages.',
    ],
    customHtml: [
      'Create /ai/index.html (or equivalent route) and publish the generated AI Info page content.',
      'Add JSON-LD scripts to the global <head> or the AI page template.',
      'Merge robots.txt recommendations with existing directives and include sitemap URL.',
      'Confirm sitemap.xml includes /ai and submit it to search tools if needed.',
      'Add internal links from homepage, about, services, blog, and footer to /ai.',
    ],
  };
}

function buildFallbackOptionalExtras(origin: string, brandName: string): OptionalExtras {
  return {
    llmsTxt: `# llms.txt (optional / future-facing)\n\nSite: ${brandName}\nURL: ${origin}\nPrimary AI info page: ${origin}/ai\nContact: contact@${new URL(origin).hostname.replace(/^www\./i, '')}\n\nNotes:\n- This file is optional and not a replacement for structured pages and schema.`,
    agentsMd: `# agents.md (optional / future-facing)\n\n## Site Profile\n- Brand: ${brandName}\n- Main website: ${origin}\n- AI info page: ${origin}/ai\n\n## Agent Guidance\n1. Prefer factual brand information from the AI info page.\n2. Use Services and About pages for supporting context.\n3. Treat pricing or offer details as changeable unless date-stamped.`,
  };
}

function buildFallbackAssets(input: GenerateSetupInput): AiSetupAssets {
  const brandName = inferBrandName(input.request, input.extracted);
  const description = inferDescription(input.request, input.extracted);
  const serviceHint = inferServiceHint(input.extracted);

  return {
    aiInfoPage: buildFallbackAiInfoPage({
      brandName,
      description,
      country: input.request.country,
      serviceHint,
    }),
    robotsTxt: ensureSitemapLine(buildFallbackRobotsTxt(input.origin), input.origin),
    schema: buildFallbackSchema({
      origin: input.origin,
      brandName,
      description,
      serviceHint,
    }),
    internalLinking: buildFallbackInternalLinking(),
    implementationGuide: buildFallbackImplementationGuide(input.origin),
    optionalExtras: buildFallbackOptionalExtras(input.origin, brandName),
  };
}

function compressPageContext(extracted: ExtractedSiteSignals) {
  return extracted.pages.slice(0, 6).map((page) => ({
    path: page.path,
    title: page.title,
    metaDescription: page.metaDescription,
    headings: page.headings.slice(0, 10),
    visibleTextSnippet: page.visibleText.slice(0, 900),
    internalLinks: page.internalLinks.slice(0, 30),
    canonical: page.canonical,
    schemaTypes: page.schemaTypes,
  }));
}

function mergeAssets(baseAssets: AiSetupAssets, generatedAssets: MergeableAssets, origin: string): AiSetupAssets {
  return {
    ...baseAssets,
    ...generatedAssets,
    schema: {
      ...baseAssets.schema,
      ...generatedAssets.schema,
      notes:
        generatedAssets.schema?.notes && generatedAssets.schema.notes.length > 0
          ? generatedAssets.schema.notes
          : baseAssets.schema.notes,
    },
    internalLinking:
      generatedAssets.internalLinking && generatedAssets.internalLinking.length > 0
        ? generatedAssets.internalLinking
        : baseAssets.internalLinking,
    implementationGuide: {
      wordpress:
        generatedAssets.implementationGuide?.wordpress &&
        generatedAssets.implementationGuide.wordpress.length > 0
          ? generatedAssets.implementationGuide.wordpress
          : baseAssets.implementationGuide.wordpress,
      webflow:
        generatedAssets.implementationGuide?.webflow &&
        generatedAssets.implementationGuide.webflow.length > 0
          ? generatedAssets.implementationGuide.webflow
          : baseAssets.implementationGuide.webflow,
      shopify:
        generatedAssets.implementationGuide?.shopify &&
        generatedAssets.implementationGuide.shopify.length > 0
          ? generatedAssets.implementationGuide.shopify
          : baseAssets.implementationGuide.shopify,
      customHtml:
        generatedAssets.implementationGuide?.customHtml &&
        generatedAssets.implementationGuide.customHtml.length > 0
          ? generatedAssets.implementationGuide.customHtml
          : baseAssets.implementationGuide.customHtml,
    },
    optionalExtras: {
      ...baseAssets.optionalExtras,
      ...(generatedAssets.optionalExtras ?? {}),
    },
    robotsTxt: ensureSitemapLine(generatedAssets.robotsTxt ?? baseAssets.robotsTxt, origin),
  };
}

export async function generateSetupAssets(input: GenerateSetupInput): Promise<GenerateSetupResult> {
  const fallbackAssets = buildFallbackAssets(input);
  const warnings: string[] = [];

  if (!process.env.OPENROUTER_API_KEY || !process.env.OPENROUTER_MODEL) {
    warnings.push('OpenRouter is not configured. Using rule-based fallback content.');
    return {
      assets: fallbackAssets,
      mode: 'fallback',
      warnings,
    };
  }

  const brandName = inferBrandName(input.request, input.extracted);
  const description = inferDescription(input.request, input.extracted);

  const systemPrompt = `You are a senior technical content strategist generating implementation-ready AI discovery setup assets for a business website.

Rules:
- This is a setup engine, not an audit.
- Do not overclaim outcomes or promise rankings.
- Keep outputs practical, concise, factual, and commercially credible.
- AI Info Page is the primary asset.
- llms.txt and agents.md are optional extras and must be labeled optional/future-facing.
- Return valid JSON only matching the requested schema.`;

  const userPrompt = `Generate complete setup outputs for this website.

Website context:
${JSON.stringify(
    {
      site: {
        origin: input.origin,
        brandName,
        shortDescription: description,
        country: input.request.country,
      },
      detected: input.detected,
      pages: compressPageContext(input.extracted),
      robotsTxt: input.extracted.robotsTxt?.slice(0, 4_000),
      sitemapDetected: Boolean(input.extracted.sitemapXml),
    },
    null,
    2,
  )}

Return a JSON object with exactly these keys:
- aiInfoPage: string markdown
- robotsTxt: string
- schema: { organization: string, website: string, person?: string, service: string, notes: string[] }
- internalLinking: [{ fromPage: string, anchorText: string, placement: string, reason: string }]
- implementationGuide: { wordpress: string[], webflow: string[], shopify: string[], customHtml: string[] }
- optionalExtras: { llmsTxt: string, agentsMd: string }

Additional requirements:
- AI info page should recommend /ai or /ai-info path and include these headings:
  Who we are, What we do, Who we serve, What makes us different, How it works, Services, Team, FAQ, Last updated.
- robots.txt must include sitemap line when appropriate and clearly mark optional/experimental AI directives.
- Schema fields must be JSON-LD snippets as strings.
- Internal linking suggestions should mention footer, about, services, and blog where relevant.
- Implementation guide must include platform-specific actionable steps.
`;

  try {
    const generatedAssets = await callOpenRouter(
      {
        systemPrompt,
        userPrompt,
        timeoutMs: 25_000,
        temperature: 0.2,
        maxTokens: 3_000,
      },
      AiSetupAssetsSchema,
    );

    const mergedAssets = mergeAssets(fallbackAssets, generatedAssets, input.origin);

    return {
      assets: mergedAssets,
      mode: 'openrouter',
      warnings,
    };
  } catch (error) {
    warnings.push(
      error instanceof Error
        ? `OpenRouter generation failed. Using fallback content. (${error.message})`
        : 'OpenRouter generation failed. Using fallback content.',
    );

    return {
      assets: fallbackAssets,
      mode: 'fallback',
      warnings,
    };
  }
}
