import test from 'node:test';
import assert from 'node:assert/strict';
import { fetchSiteResources } from '../../lib/site/fetch-pages';

test('fetchSiteResources does not warn for missing common probe paths', async () => {
  const oldFetch = globalThis.fetch;

  globalThis.fetch = async (input) => {
    const url = new URL(String(input));
    const path = url.pathname;

    if (path === '/') {
      return new Response(
        '<!doctype html><html><head><title>Example</title></head><body><a href="/digital-pr">Digital PR</a></body></html>',
        {
          status: 200,
          headers: {
            'content-type': 'text/html',
          },
        },
      );
    }

    if (path === '/digital-pr') {
      return new Response('<!doctype html><html><body><h1>Digital PR Services</h1></body></html>', {
        status: 200,
        headers: {
          'content-type': 'text/html',
        },
      });
    }

    return new Response('Not found', {
      status: 404,
      headers: {
        'content-type': 'text/plain',
      },
    });
  };

  try {
    const fetched = await fetchSiteResources('https://example.com', {
      timeoutMs: 500,
      discoveredFetchLimit: 2,
      sitemapFetchLimit: 0,
    });

    assert.deepEqual(fetched.warnings, []);
    assert.equal(fetched.resources.some((resource) => resource.path === '/services' && !resource.ok), true);
    assert.equal(fetched.resources.some((resource) => resource.path === '/contact' && !resource.ok), true);
  } finally {
    globalThis.fetch = oldFetch;
  }
});
