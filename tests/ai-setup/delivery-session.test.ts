import assert from 'node:assert/strict';
import test from 'node:test';
import {
  createPendingDeliverySession,
  readDeliverySessionPayload,
  writeDeliverySessionResult,
} from '../../lib/ai/delivery-session';
import type { AiSetupResponse } from '../../lib/types/ai-setup';

function installSessionStorageMock(options?: { throwOnSet?: boolean }) {
  const store = new Map<string, string>();

  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: {
      sessionStorage: {
        getItem: (key: string) => store.get(key) ?? null,
        setItem: (key: string, value: string) => {
          if (options?.throwOnSet) {
            throw new DOMException('Quota exceeded', 'QuotaExceededError');
          }
          store.set(key, value);
        },
        removeItem: (key: string) => {
          store.delete(key);
        },
      },
    },
  });

  return store;
}

function uninstallWindowMock() {
  Reflect.deleteProperty(globalThis, 'window');
}

function makeResult(): AiSetupResponse {
  return {
    site: {
      inputUrl: 'https://example.com',
      normalizedUrl: 'https://example.com',
      domain: 'example.com',
      scannedPaths: ['/'],
      scannedAt: new Date().toISOString(),
      warnings: [],
    },
    detected: {
      hasAiInfoPage: false,
      hasRobotsTxt: true,
      hasSitemap: true,
      schemaTypes: [],
      corePagesFound: ['/'],
      aiPageCandidates: [],
      existingAssets: ['robots.txt'],
      missingAssets: ['AI Info Page'],
      recommendations: ['Publish /ai'],
    },
    summary: {
      headline: 'Setup pack ready',
      existingAssets: ['robots.txt'],
      missingAssets: ['AI Info Page'],
      recommendations: ['Publish /ai'],
    },
    assets: {
      aiInfoPage: 'x'.repeat(25_000),
      robotsTxt: 'User-agent: *\nAllow: /',
      schema: {
        organization: '{}',
        website: '{}',
        service: '{}',
        notes: [],
      },
      internalLinking: [],
      implementationGuide: {
        wordpress: ['Create page'],
        webflow: ['Create page'],
        shopify: ['Create page'],
        customHtml: ['Create page'],
        vibeCoded: ['Prompt'],
      },
      optionalExtras: {
        llmsTxt: '# Example',
        agentsMd: '# Example',
      },
    },
    meta: {
      partial: false,
      generationMode: 'openrouter',
      model: 'test-model',
      warnings: [],
    },
  };
}

test('delivery session completion stores lightweight metadata instead of the full generated result', () => {
  try {
    const store = installSessionStorageMock();
    const sessionId = createPendingDeliverySession({ url: 'https://example.com' });
    assert.ok(sessionId);

    writeDeliverySessionResult(sessionId, makeResult());

    const values = Array.from(store.values());
    assert.equal(values.length, 1);
    assert.equal(values[0].includes('"result"'), false);
    assert.equal(values[0].includes('x'.repeat(1_000)), false);

    const payload = readDeliverySessionPayload(sessionId);
    assert.equal(payload?.status, 'completed');
    assert.equal(payload?.result, undefined);
    assert.deepEqual(payload?.request, { url: 'https://example.com' });
  } finally {
    uninstallWindowMock();
  }
});

test('delivery session writes do not throw when browser storage is unavailable or full', () => {
  try {
    installSessionStorageMock({ throwOnSet: true });

    assert.doesNotThrow(() => {
      writeDeliverySessionResult('quota-test', makeResult());
    });
  } finally {
    uninstallWindowMock();
  }
});
