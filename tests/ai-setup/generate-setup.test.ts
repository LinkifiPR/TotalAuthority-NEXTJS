import test from 'node:test';
import assert from 'node:assert/strict';
import { generateSetupAssets, __testables } from '../../lib/site/generate-setup';
import { buildSiteProfile } from '../../lib/site/site-profile';
import { AiSetupAssets } from '../../lib/types/ai-setup';
import {
  baseDetectedAssets,
  baseRequest,
  richExtractedSignals,
  thinExtractedSignals,
} from './fixtures';

function withOpenRouterEnv<T>(run: () => Promise<T>): Promise<T> {
  const oldKey = process.env.OPENROUTER_API_KEY;
  const oldModel = process.env.OPENROUTER_MODEL;

  process.env.OPENROUTER_API_KEY = 'test-key';
  process.env.OPENROUTER_MODEL = 'test-model';

  return run().finally(() => {
    if (oldKey === undefined) {
      delete process.env.OPENROUTER_API_KEY;
    } else {
      process.env.OPENROUTER_API_KEY = oldKey;
    }

    if (oldModel === undefined) {
      delete process.env.OPENROUTER_MODEL;
    } else {
      process.env.OPENROUTER_MODEL = oldModel;
    }
  });
}

function weakModelAssets(): AiSetupAssets {
  return {
    aiInfoPage: '# AI Information\n\nWe provide practical support and clear outcomes.',
    robotsTxt: 'User-agent: *\nAllow: /',
    schema: {
      organization: '{"@context":"https://schema.org","@type":"Organization","name":"Linkifi PR"}',
      website: '{"@context":"https://schema.org","@type":"WebSite","name":"Linkifi PR"}',
      service: '{"@context":"https://schema.org","@type":"Service","serviceType":"PR"}',
      notes: ['Validate.'],
    },
    internalLinking: [
      {
        fromPage: '/',
        anchorText: 'AI Information',
        placement: 'Footer',
        reason: 'Helpful.',
      },
    ],
    implementationGuide: {
      wordpress: ['Create page.'],
      webflow: ['Create page.'],
      shopify: ['Create page.'],
      customHtml: ['Create page.'],
    },
    optionalExtras: {
      llmsTxt: '# llms',
      agentsMd: '# agents',
    },
  };
}

test('generateSetupAssets runs refinement pass when first model draft is weak', async () => {
  await withOpenRouterEnv(async () => {
    const profile = buildSiteProfile({ request: baseRequest, extracted: richExtractedSignals });

    const strongAssets: AiSetupAssets = {
      aiInfoPage: __testables.buildAiInfoPage(profile),
      robotsTxt:
        '# Recommended merged robots.txt\n# Important: robots.txt is not access control.\n\nUser-agent: *\nAllow: /\n\nSitemap: https://example.com/sitemap.xml',
      schema: __testables.buildSchema(profile),
      internalLinking: __testables.buildInternalLinking(profile, richExtractedSignals),
      implementationGuide: __testables.buildImplementationGuide(profile),
      optionalExtras: __testables.buildOptionalExtras(profile),
    };

    let callCount = 0;

    const result = await generateSetupAssets(
      {
        request: baseRequest,
        origin: 'https://example.com',
        extracted: richExtractedSignals,
        detected: baseDetectedAssets,
      },
      {
        modelClient: async () => {
          callCount += 1;
          return callCount === 1 ? weakModelAssets() : strongAssets;
        },
      },
    );

    assert.equal(result.mode, 'openrouter');
    assert.equal(callCount, 2);
    assert.equal(result.assets.aiInfoPage.includes('Official Information About Linkifi PR'), true);
    assert.equal(result.assets.implementationGuide.wordpress.length >= 10, true);
  });
});

test('generateSetupAssets returns deterministic fallback when model generation fails', async () => {
  await withOpenRouterEnv(async () => {
    const result = await generateSetupAssets(
      {
        request: baseRequest,
        origin: 'https://example.com',
        extracted: richExtractedSignals,
        detected: baseDetectedAssets,
      },
      {
        modelClient: async () => {
          throw new Error('simulated model outage');
        },
      },
    );

    assert.equal(result.mode, 'fallback');
    assert.equal(result.assets.aiInfoPage.includes('Official Information About Linkifi PR'), true);
    assert.equal(result.warnings.some((warning) => warning.includes('simulated model outage')), true);
  });
});

test('thin-site optional extras stay minimal and clearly optional', () => {
  const profile = buildSiteProfile({ request: baseRequest, extracted: thinExtractedSignals });
  const optionalExtras = __testables.buildOptionalExtras(profile);

  assert.equal(optionalExtras.llmsTxt.toLowerCase().includes('optional / future-facing'), true);
  assert.equal(optionalExtras.llmsTxt.toLowerCase().includes('not a replacement'), true);
  assert.equal(optionalExtras.agentsMd.toLowerCase().includes('optional / future-facing'), true);
});

test('rules-only mode still returns useful structured assets for thin site data', async () => {
  const oldKey = process.env.OPENROUTER_API_KEY;
  const oldModel = process.env.OPENROUTER_MODEL;
  delete process.env.OPENROUTER_API_KEY;
  delete process.env.OPENROUTER_MODEL;

  const result = await generateSetupAssets({
    request: baseRequest,
    origin: 'https://example.com',
    extracted: thinExtractedSignals,
    detected: baseDetectedAssets,
  });

  if (oldKey !== undefined) {
    process.env.OPENROUTER_API_KEY = oldKey;
  }

  if (oldModel !== undefined) {
    process.env.OPENROUTER_MODEL = oldModel;
  }

  assert.equal(result.mode, 'fallback');
  assert.equal(result.assets.aiInfoPage.includes('Official Information About'), true);
  assert.equal(result.assets.robotsTxt.includes('User-agent:'), true);
  assert.equal(result.assets.schema.notes.length >= 6, true);
  assert.equal(result.assets.implementationGuide.wordpress.length >= 10, true);
});
