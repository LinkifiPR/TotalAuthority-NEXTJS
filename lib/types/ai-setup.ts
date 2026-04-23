import { z } from 'zod';

const optionalShortText = (max: number) =>
  z
    .union([z.string().trim().max(max), z.literal(''), z.undefined()])
    .transform((value) => {
      if (!value) {
        return undefined;
      }

      return value.trim();
    });

export const AiSetupRequestSchema = z.object({
  url: z.string().trim().min(1, 'Website URL is required'),
  brandName: optionalShortText(120),
  shortDescription: optionalShortText(400),
  country: optionalShortText(120),
});

export type AiSetupRequest = z.infer<typeof AiSetupRequestSchema>;

export interface SiteFetchResource {
  path: string;
  url: string;
  finalUrl?: string;
  ok: boolean;
  status?: number;
  contentType?: string;
  body?: string;
  error?: string;
  timedOut?: boolean;
  durationMs: number;
  isHtml: boolean;
  required: boolean;
  truncated?: boolean;
}

export interface FetchedSiteResources {
  origin: string;
  resources: SiteFetchResource[];
  scannedAt: string;
  warnings: string[];
}

export interface PageSignals {
  path: string;
  url: string;
  title?: string;
  metaDescription?: string;
  headings: string[];
  visibleText: string;
  internalLinks: string[];
  navLinks?: string[];
  footerLinks?: string[];
  ctaLinks?: string[];
  linkDetails?: Array<{
    path: string;
    text: string;
    location: 'nav' | 'footer' | 'body';
  }>;
  schemaObjects: unknown[];
  schemaTypes: string[];
  canonical?: string;
}

export interface ExtractedSiteSignals {
  origin: string;
  pages: PageSignals[];
  robotsTxt?: string;
  sitemapXml?: string;
  scannedAt: string;
  warnings: string[];
}

export interface DetectedAssets {
  hasAiInfoPage: boolean;
  hasRobotsTxt: boolean;
  hasSitemap: boolean;
  schemaTypes: string[];
  corePagesFound: string[];
  aiPageCandidates: string[];
  existingAssets: string[];
  missingAssets: string[];
  recommendations: string[];
}

export interface InternalLinkSuggestion {
  fromPage: string;
  anchorText: string;
  placement: string;
  reason: string;
}

export interface ImplementationGuide {
  wordpress: string[];
  webflow: string[];
  shopify: string[];
  customHtml: string[];
  vibeCoded?: string[];
}

export interface SchemaSuggestions {
  organization: string;
  website: string;
  person?: string;
  service: string;
  notes: string[];
}

export interface OptionalExtras {
  llmsTxt: string;
  agentsMd: string;
}

export interface AiSetupAssets {
  aiInfoPage: string;
  robotsTxt: string;
  schema: SchemaSuggestions;
  internalLinking: InternalLinkSuggestion[];
  implementationGuide: ImplementationGuide;
  optionalExtras: OptionalExtras;
}

export const InternalLinkSuggestionSchema = z.object({
  fromPage: z.string().min(1),
  anchorText: z.string().min(1),
  placement: z.string().min(1),
  reason: z.string().min(1),
});

export const ImplementationGuideSchema = z.object({
  wordpress: z.array(z.string()),
  webflow: z.array(z.string()),
  shopify: z.array(z.string()),
  customHtml: z.array(z.string()),
  vibeCoded: z.array(z.string()).default([]),
});

export const SchemaSuggestionsSchema = z.object({
  organization: z.string().min(1),
  website: z.string().min(1),
  person: z.union([z.string(), z.null()]).optional().transform((value) => value ?? undefined),
  service: z.string().min(1),
  notes: z.array(z.string()).default([]),
});

export const OptionalExtrasSchema = z.object({
  llmsTxt: z.string().min(1),
  agentsMd: z.string().min(1),
});

export const AiSetupAssetsSchema = z.object({
  aiInfoPage: z.string().min(1),
  robotsTxt: z.string().min(1),
  schema: SchemaSuggestionsSchema,
  internalLinking: z.array(InternalLinkSuggestionSchema),
  implementationGuide: ImplementationGuideSchema,
  optionalExtras: OptionalExtrasSchema,
});

export interface AiSetupSummary {
  headline: string;
  existingAssets: string[];
  missingAssets: string[];
  recommendations: string[];
}

export interface AiSetupResponse {
  site: {
    inputUrl: string;
    normalizedUrl: string;
    domain: string;
    brandName?: string;
    shortDescription?: string;
    country?: string;
    scannedPaths: string[];
    scannedAt: string;
    warnings: string[];
  };
  detected: DetectedAssets;
  summary: AiSetupSummary;
  assets: AiSetupAssets;
  meta: {
    partial: boolean;
    generationMode: 'openrouter' | 'fallback';
    model?: string;
    warnings: string[];
  };
}
