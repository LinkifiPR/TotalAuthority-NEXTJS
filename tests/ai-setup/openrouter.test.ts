import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';
import { callOpenRouter } from '../../lib/ai/openrouter';

test('callOpenRouter repairs model JSON with literal markdown newlines inside string fields', async () => {
  const oldFetch = globalThis.fetch;
  const oldKey = process.env.OPENROUTER_API_KEY;
  const oldModel = process.env.OPENROUTER_MODEL;

  process.env.OPENROUTER_API_KEY = 'test-key';
  process.env.OPENROUTER_MODEL = 'test-model';

  const malformedModelJson = `{
  "aiInfoPage": "# Official Information About Linkifi

## What the company is
Linkifi is a digital PR agency.",
  "robotsTxt": "User-agent: *
Allow: /"
}`;

  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        choices: [
          {
            message: {
              content: malformedModelJson,
            },
          },
        ],
      }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      },
    );

  try {
    const result = await callOpenRouter(
      {
        systemPrompt: 'Return JSON.',
        userPrompt: 'Return JSON.',
        maxTokens: 100,
      },
      z.object({
        aiInfoPage: z.string(),
        robotsTxt: z.string(),
      }),
    );

    assert.equal(result.aiInfoPage.includes('Official Information About Linkifi'), true);
    assert.equal(result.robotsTxt.includes('User-agent: *'), true);
  } finally {
    globalThis.fetch = oldFetch;

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
  }
});
