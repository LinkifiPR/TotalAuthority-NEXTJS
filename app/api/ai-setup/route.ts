import { NextRequest, NextResponse } from 'next/server';
import { detectAssets } from '@/lib/site/detect-assets';
import { extractSiteSignals } from '@/lib/site/extract-signals';
import { fetchSiteResources, normalizeWebsiteUrl } from '@/lib/site/fetch-pages';
import { generateSetupAssets } from '@/lib/site/generate-setup';
import { AiSetupRequestSchema, AiSetupResponse } from '@/lib/types/ai-setup';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Netlify serverless routes can fail with 502 if request time exceeds runtime limits.
// Keep these tuned to return a full setup pack reliably within one request.
const FETCH_TIMEOUT_MS = 4_500;
const DISCOVERED_FETCH_LIMIT = 6;
const SITEMAP_FETCH_LIMIT = 4;
const MODEL_TIMEOUT_MS = 24_000;
const REFINEMENT_TIMEOUT_MS = 22_000;

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

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: 'Invalid JSON body. Please submit valid request data.',
      },
      { status: 400 },
    );
  }

  const parsedRequest = AiSetupRequestSchema.safeParse(body);

  if (!parsedRequest.success) {
    return NextResponse.json(
      {
        error: 'Invalid request payload.',
        details: parsedRequest.error.flatten(),
      },
      { status: 400 },
    );
  }

  const payload = parsedRequest.data;

  let normalizedUrl: URL;
  try {
    normalizedUrl = normalizeWebsiteUrl(payload.url);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Please enter a valid URL.',
      },
      { status: 400 },
    );
  }

  try {
    const fetched = await fetchSiteResources(normalizedUrl.toString(), {
      timeoutMs: FETCH_TIMEOUT_MS,
      discoveredFetchLimit: DISCOVERED_FETCH_LIMIT,
      sitemapFetchLimit: SITEMAP_FETCH_LIMIT,
    });
    const extracted = extractSiteSignals(fetched);
    const detected = detectAssets(extracted);

    const generated = await generateSetupAssets({
      request: payload,
      origin: normalizedUrl.origin,
      extracted,
      detected,
    }, {}, {
      modelTimeoutMs: MODEL_TIMEOUT_MS,
      allowRefinement: true,
      refinementTimeoutMs: REFINEMENT_TIMEOUT_MS,
      requireLlm: true,
    });

    const summaryRecommendations = dedupe([
      ...detected.recommendations,
      'Use the implementation guide to publish assets in a single rollout, then verify indexation and internal links.',
      'Keep the AI info page concise and update it when services, team, or positioning changes.',
    ]);

    const warnings = dedupe([...fetched.warnings, ...extracted.warnings, ...generated.warnings]);

    const response: AiSetupResponse = {
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
        model: process.env.OPENROUTER_MODEL,
        warnings,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('AI setup route failed:', error);

    const message = error instanceof Error ? error.message : 'We could not complete the AI setup generation right now.';
    const isLlmError =
      message.includes('OpenRouter') ||
      message.includes('LLM strict mode') ||
      message.includes('OPENROUTER_');

    if (isLlmError) {
      return NextResponse.json(
        {
          error: `LLM generation failed and fallback is disabled: ${message}`,
        },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        error: message,
      },
      { status: 500 },
    );
  }
}
