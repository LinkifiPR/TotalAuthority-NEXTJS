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

test('generateSetupAssets repairs mandatory output structure without leaving OpenRouter mode', async () => {
  await withOpenRouterEnv(async () => {
    const profile = buildSiteProfile({ request: baseRequest, extracted: richExtractedSignals });

    const incompleteModelAssets: AiSetupAssets = {
      aiInfoPage: `# Official Information About Linkifi PR

## Core services
- Digital PR campaigns
- PR-led link building

## FAQ
### How should this page be used?
Use this as a factual company reference.

## Last updated
2026-04-23`,
      robotsTxt: '# Recommended robots notes\nAllow: /',
      schema: __testables.buildSchema(profile),
      internalLinking: __testables.buildInternalLinking(profile, richExtractedSignals),
      implementationGuide: __testables.buildImplementationGuide(profile),
      optionalExtras: __testables.buildOptionalExtras(profile),
    };

    const result = await generateSetupAssets(
      {
        request: baseRequest,
        origin: 'https://example.com',
        extracted: richExtractedSignals,
        detected: baseDetectedAssets,
      },
      {
        modelClient: async () => incompleteModelAssets,
      },
      {
        allowRefinement: false,
        requireLlm: true,
      },
    );

    assert.equal(result.mode, 'openrouter');
    assert.equal(result.assets.aiInfoPage.includes('## What the company is'), true);
    assert.equal(result.assets.aiInfoPage.includes('## What the company does'), true);
    assert.equal(result.assets.aiInfoPage.includes('## Who the company serves'), true);
    assert.equal(/User-agent\s*:/i.test(result.assets.robotsTxt), true);
    assert.equal(/Sitemap\s*:/i.test(result.assets.robotsTxt), true);
    assert.equal(
      result.warnings.some((warning) => warning.includes('AI Info Page is missing required section')),
      false,
    );
    assert.equal(result.warnings.some((warning) => warning.includes('robots.txt is missing')), false);
  });
});

test('generateSetupAssets does not surface primary retry diagnostics when backup model succeeds', async () => {
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

    const result = await generateSetupAssets(
      {
        request: baseRequest,
        origin: 'https://example.com',
        extracted: richExtractedSignals,
        detected: baseDetectedAssets,
      },
      {
        modelClient: async ({ model }) => {
          if (model === 'test-model') {
            throw new Error('simulated primary model parse failure');
          }

          return strongAssets;
        },
      },
      {
        allowRefinement: false,
        requireLlm: true,
      },
    );

    assert.equal(result.mode, 'openrouter');
    assert.equal(result.modelUsed, 'openai/gpt-4.1-mini');
    assert.equal(result.warnings.some((warning) => warning.includes('Primary model')), false);
  });
});

test('generateSetupAssets preserves detailed implementation guides when model guide arrays are thin', async () => {
  await withOpenRouterEnv(async () => {
    const profile = buildSiteProfile({ request: baseRequest, extracted: richExtractedSignals });
    const modelAssetsWithThinGuides: AiSetupAssets = {
      aiInfoPage: __testables.buildAiInfoPage(profile),
      robotsTxt:
        '# Recommended merged robots.txt\n# Important: robots.txt is not access control.\n\nUser-agent: *\nAllow: /\n\nSitemap: https://example.com/sitemap.xml',
      schema: __testables.buildSchema(profile),
      internalLinking: __testables.buildInternalLinking(profile, richExtractedSignals),
      implementationGuide: {
        wordpress: ['Create an AI page.'],
        webflow: ['Create an AI page.'],
        shopify: ['Create an AI page.'],
        customHtml: ['Create an AI page.'],
        vibeCoded: ['Ask your coding tool to add it.'],
      },
      optionalExtras: __testables.buildOptionalExtras(profile),
    };

    const result = await generateSetupAssets(
      {
        request: baseRequest,
        origin: 'https://example.com',
        extracted: richExtractedSignals,
        detected: baseDetectedAssets,
      },
      {
        modelClient: async () => modelAssetsWithThinGuides,
      },
      {
        allowRefinement: false,
        requireLlm: true,
      },
    );

    assert.equal(result.mode, 'openrouter');
    assert.equal(result.assets.implementationGuide.wordpress.length >= 10, true);
    assert.equal(result.assets.implementationGuide.webflow.length >= 10, true);
    assert.equal(result.assets.implementationGuide.shopify.length >= 10, true);
    assert.equal(result.assets.implementationGuide.customHtml.length >= 10, true);
    assert.equal(result.assets.implementationGuide.vibeCoded.length >= 10, true);
    assert.equal(result.warnings.some((warning) => warning.includes('implementation guide needs')), false);
  });
});

test('generateSetupAssets preserves optional/future-facing labels for optional extras', async () => {
  await withOpenRouterEnv(async () => {
    const profile = buildSiteProfile({ request: baseRequest, extracted: richExtractedSignals });
    const modelAssetsWithUnlabeledExtras: AiSetupAssets = {
      aiInfoPage: __testables.buildAiInfoPage(profile),
      robotsTxt:
        '# Recommended merged robots.txt\n# Important: robots.txt is not access control.\n\nUser-agent: *\nAllow: /\n\nSitemap: https://example.com/sitemap.xml',
      schema: __testables.buildSchema(profile),
      internalLinking: __testables.buildInternalLinking(profile, richExtractedSignals),
      implementationGuide: __testables.buildImplementationGuide(profile),
      optionalExtras: {
        llmsTxt: '# Linkifi PR\n\n## Primary Pages\n- Homepage',
        agentsMd: '# agents.md\n\n## Site profile\n- Brand: Linkifi PR',
      },
    };

    const result = await generateSetupAssets(
      {
        request: baseRequest,
        origin: 'https://example.com',
        extracted: richExtractedSignals,
        detected: baseDetectedAssets,
      },
      {
        modelClient: async () => modelAssetsWithUnlabeledExtras,
      },
      {
        allowRefinement: false,
        requireLlm: true,
      },
    );

    assert.equal(result.mode, 'openrouter');
    assert.equal(result.assets.optionalExtras.llmsTxt.toLowerCase().includes('optional'), true);
    assert.equal(result.assets.optionalExtras.agentsMd.toLowerCase().includes('optional'), true);
    assert.equal(result.warnings.some((warning) => warning.includes('Optional extras should')), false);
  });
});

test('generateSetupAssets preserves detailed schema notes when model notes are thin', async () => {
  await withOpenRouterEnv(async () => {
    const profile = buildSiteProfile({ request: baseRequest, extracted: richExtractedSignals });
    const modelAssetsWithThinSchemaNotes: AiSetupAssets = {
      aiInfoPage: __testables.buildAiInfoPage(profile),
      robotsTxt:
        '# Recommended merged robots.txt\n# Important: robots.txt is not access control.\n\nUser-agent: *\nAllow: /\n\nSitemap: https://example.com/sitemap.xml',
      schema: {
        ...__testables.buildSchema(profile),
        notes: ['Validate the schema.'],
      },
      internalLinking: __testables.buildInternalLinking(profile, richExtractedSignals),
      implementationGuide: __testables.buildImplementationGuide(profile),
      optionalExtras: __testables.buildOptionalExtras(profile),
    };

    const result = await generateSetupAssets(
      {
        request: baseRequest,
        origin: 'https://example.com',
        extracted: richExtractedSignals,
        detected: baseDetectedAssets,
      },
      {
        modelClient: async () => modelAssetsWithThinSchemaNotes,
      },
      {
        allowRefinement: false,
        requireLlm: true,
      },
    );

    assert.equal(result.mode, 'openrouter');
    assert.equal(result.assets.schema.notes.length >= 6, true);
    assert.equal(result.warnings.some((warning) => warning.includes('Schema notes should')), false);
  });
});

test('generateSetupAssets accepts partial model drafts missing guide and optional extras', async () => {
  await withOpenRouterEnv(async () => {
    const profile = buildSiteProfile({ request: baseRequest, extracted: richExtractedSignals });
    const partialModelDraft = {
      aiInfoPage: __testables.buildAiInfoPage(profile),
      robotsTxt:
        '# Recommended merged robots.txt\n# Important: robots.txt is not access control.\n\nUser-agent: *\nAllow: /\n\nSitemap: https://example.com/sitemap.xml',
      schema: __testables.buildSchema(profile),
      internalLinking: __testables.buildInternalLinking(profile, richExtractedSignals),
    };

    const result = await generateSetupAssets(
      {
        request: baseRequest,
        origin: 'https://example.com',
        extracted: richExtractedSignals,
        detected: baseDetectedAssets,
      },
      {
        modelClient: async (_request, schema) => schema.parse(partialModelDraft),
      },
      {
        allowRefinement: false,
        requireLlm: true,
      },
    );

    assert.equal(result.mode, 'openrouter');
    assert.equal(result.assets.aiInfoPage.includes('Official Information About Linkifi PR'), true);
    assert.equal(result.assets.implementationGuide.wordpress.length >= 10, true);
    assert.equal(result.assets.optionalExtras.llmsTxt.toLowerCase().includes('optional'), true);
    assert.equal(result.warnings.length, 0);
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
