import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { POST } from '../../app/api/visibility-gap/route';

const html = (title: string, body: string) => `<!doctype html><html><head><title>${title}</title><meta name="description" content="${body.slice(0, 120)}"><script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization","name":"${title}"}</script></head><body><main><h1>${title}</h1><p>${body}</p><a href="/about">About</a><a href="/contact">Contact</a></main></body></html>`;

test('visibility gap API returns calculator-compatible analysis JSON', async () => {
  const oldFetch = globalThis.fetch;
  const oldKey = process.env.OPENROUTER_API_KEY;
  const oldModel = process.env.OPENROUTER_MODEL;
  const oldGapModel = process.env.VISIBILITY_GAP_MODEL;

  process.env.OPENROUTER_API_KEY = 'test-key';
  process.env.OPENROUTER_MODEL = 'unused-default';
  process.env.VISIBILITY_GAP_MODEL = 'test-gap-model';

  const modelResult = {
    siteA: {
      domain: 'https://brand-a.example',
      score_10: 6.8,
      applicable_weight_sum: 100,
      factors: [
        { factor: 'Organization schema validity', weight: 18, applicable: true, value: 0.8, reason: 'Organization schema was detected on the crawled homepage.' },
      ],
      citations: ['https://brand-a.example/'],
    },
    siteB: {
      domain: 'https://brand-b.example',
      score_10: 5.4,
      applicable_weight_sum: 100,
      factors: [
        { factor: 'Organization schema validity', weight: 18, applicable: true, value: 0.6, reason: 'Organization schema was detected, but supporting entity links were limited.' },
      ],
      citations: ['https://brand-b.example/'],
    },
    gap: {
      score_diff: -1.4,
      by_factor: [{ factor: 'Organization schema validity', delta: 0.2 }],
    },
  };

  globalThis.fetch = async (input: RequestInfo | URL) => {
    const url = String(input);

    if (url.includes('openrouter.ai')) {
      return new Response(
        JSON.stringify({ choices: [{ message: { content: JSON.stringify(modelResult) } }] }),
        { status: 200, headers: { 'content-type': 'application/json' } },
      );
    }

    if (url.includes('/robots.txt')) {
      return new Response('User-agent: *\nAllow: /', { status: 200, headers: { 'content-type': 'text/plain' } });
    }

    if (url.includes('/sitemap.xml')) {
      return new Response('<urlset></urlset>', { status: 200, headers: { 'content-type': 'application/xml' } });
    }

    if (url.includes('brand-a.example')) {
      return new Response(html('Brand A', 'Brand A has named experts, service pages, and public contact details.'), { status: 200, headers: { 'content-type': 'text/html' } });
    }

    if (url.includes('brand-b.example')) {
      return new Response(html('Brand B', 'Brand B has a homepage, organization information, and contact details.'), { status: 200, headers: { 'content-type': 'text/html' } });
    }

    return new Response('Not found', { status: 404 });
  };

  try {
    const response = await POST(
      new Request('https://totalauthority.com/api/visibility-gap', {
        method: 'POST',
        body: JSON.stringify({
          siteA: { url: 'https://brand-a.example', brand: 'Brand A' },
          siteB: { url: 'https://brand-b.example', brand: 'Brand B' },
        }),
      }),
    );

    assert.equal(response.status, 200);
    const json = await response.json();
    assert.equal(json.ok, true);
    assert.equal(json.data.siteA.score_10, 6.8);
    assert.equal(json.data.siteB.factors[0].value, 0.6);
    assert.deepEqual(json.data.gap.by_factor, [{ factor: 'Organization schema validity', delta: 0.2 }]);
    assert.equal(json.webSearchPerformed, false);
    assert.equal(Array.isArray(json.citationsFromWeb), true);
  } finally {
    globalThis.fetch = oldFetch;

    if (oldKey === undefined) delete process.env.OPENROUTER_API_KEY;
    else process.env.OPENROUTER_API_KEY = oldKey;

    if (oldModel === undefined) delete process.env.OPENROUTER_MODEL;
    else process.env.OPENROUTER_MODEL = oldModel;

    if (oldGapModel === undefined) delete process.env.VISIBILITY_GAP_MODEL;
    else process.env.VISIBILITY_GAP_MODEL = oldGapModel;
  }
});


test('calculator page posts to local visibility gap API instead of Supabase Edge Function', () => {
  const source = readFileSync('app/llm-visibility-gap-calculator/page.tsx', 'utf8');

  assert.equal(source.includes("fetch('/api/visibility-gap'"), true);
  assert.equal(source.includes('supabase.functions.invoke'), false);
  assert.equal(source.includes("llm-visibility-run-analysis"), false);
});
