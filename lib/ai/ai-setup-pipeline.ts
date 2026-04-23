import { detectAssets } from '../site/detect-assets';
import { extractSiteSignals } from '../site/extract-signals';
import { fetchSiteResources, normalizeWebsiteUrl } from '../site/fetch-pages';
import { generateSetupAssets } from '../site/generate-setup';
import { AiSetupRequest, AiSetupResponse } from '../types/ai-setup';

export type AiSetupPipelineStage = 'scan' | 'signals' | 'generate' | 'finalize';

export interface AiSetupPipelineProgress {
  stage: AiSetupPipelineStage;
  stepIndex: number;
  label: string;
}

export interface AiSetupPipelineOptions {
  fetchTimeoutMs?: number;
  discoveredFetchLimit?: number;
  sitemapFetchLimit?: number;
  modelTimeoutMs?: number;
  refinementTimeoutMs?: number;
  allowRefinement?: boolean;
  requireLlm?: boolean;
  preferredModel?: string;
}

const DEFAULT_PIPELINE_OPTIONS: Required<AiSetupPipelineOptions> = {
  fetchTimeoutMs: 6_000,
  discoveredFetchLimit: 12,
  sitemapFetchLimit: 8,
  modelTimeoutMs: 95_000,
  refinementTimeoutMs: 75_000,
  allowRefinement: true,
  requireLlm: true,
  preferredModel:
    process.env.OPENROUTER_RUNTIME_MODEL ??
    process.env.OPENROUTER_MODEL ??
    process.env.OPENROUTER_FALLBACK_MODEL ??
    'openai/gpt-4.1-mini',
};

function buildSummaryHeadline(missingAssetsCount: number, existingAssetsCount: number): string {
  if (missingAssetsCount === 0) {
    return 'Your setup is in strong shape. We generated a complete implementation pack to tighten AI clarity.';
  }

  if (missingAssetsCount <= 2) {
    return 'You already have key foundations in place. We generated the remaining setup assets for a clean rollout.';
  }

  if (existingAssetsCount >= 3) {
    return 'Your site has solid signals, but a few important AI setup assets were missing. We generated them for you.';
  }

  return 'We found core opportunities and generated the key AI setup assets so you can implement quickly.';
}

function dedupe(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean)));
}

async function reportProgress(
  progress: AiSetupPipelineProgress,
  onProgress?: (progress: AiSetupPipelineProgress) => Promise<void> | void,
): Promise<void> {
  if (!onProgress) {
    return;
  }

  await onProgress(progress);
}

export async function runAiSetupPipeline(
  payload: AiSetupRequest,
  options: AiSetupPipelineOptions = {},
  onProgress?: (progress: AiSetupPipelineProgress) => Promise<void> | void,
): Promise<AiSetupResponse> {
  const config = {
    ...DEFAULT_PIPELINE_OPTIONS,
    ...options,
  };

  const normalizedUrl = normalizeWebsiteUrl(payload.url);

  await reportProgress(
    {
      stage: 'scan',
      stepIndex: 0,
      label: 'Scanning your website',
    },
    onProgress,
  );

  const fetched = await fetchSiteResources(normalizedUrl.toString(), {
    timeoutMs: config.fetchTimeoutMs,
    discoveredFetchLimit: config.discoveredFetchLimit,
    sitemapFetchLimit: config.sitemapFetchLimit,
  });

  await reportProgress(
    {
      stage: 'signals',
      stepIndex: 1,
      label: 'Checking key signals',
    },
    onProgress,
  );

  const extracted = extractSiteSignals(fetched);
  const detected = detectAssets(extracted);

  await reportProgress(
    {
      stage: 'generate',
      stepIndex: 2,
      label: 'Generating your AI setup',
    },
    onProgress,
  );

  const generated = await generateSetupAssets(
    {
      request: payload,
      origin: normalizedUrl.origin,
      extracted,
      detected,
    },
    {},
    {
      modelTimeoutMs: config.modelTimeoutMs,
      allowRefinement: config.allowRefinement,
      refinementTimeoutMs: config.refinementTimeoutMs,
      requireLlm: config.requireLlm,
      preferredModel: config.preferredModel,
    },
  );

  await reportProgress(
    {
      stage: 'finalize',
      stepIndex: 3,
      label: 'Preparing implementation guide',
    },
    onProgress,
  );

  const summaryRecommendations = dedupe([
    ...detected.recommendations,
    'Use the implementation guide to publish assets in a single rollout, then verify indexation and internal links.',
    'Keep the AI info page concise and update it when services, team, or positioning changes.',
  ]);

  const warnings = dedupe([...fetched.warnings, ...extracted.warnings, ...generated.warnings]);

  return {
    site: {
      inputUrl: payload.url,
      normalizedUrl: normalizedUrl.origin,
      domain: normalizedUrl.hostname,
      brandName: payload.brandName,
      shortDescription: payload.shortDescription,
      country: payload.country,
      scannedPaths: fetched.resources.map((resource) => resource.path),
      scannedAt: fetched.scannedAt,
      warnings,
    },
    detected,
    summary: {
      headline: buildSummaryHeadline(detected.missingAssets.length, detected.existingAssets.length),
      existingAssets: detected.existingAssets,
      missingAssets: detected.missingAssets,
      recommendations: summaryRecommendations,
    },
    assets: generated.assets,
    meta: {
      partial: fetched.resources.some((resource) => resource.required && !resource.ok),
      generationMode: generated.mode,
      model: generated.modelUsed,
      warnings,
    },
  };
}
