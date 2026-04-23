"use client";

import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clipboard,
  ClipboardCheck,
  Download,
  FileCode2,
  FileText,
  Globe,
  Loader2,
  Network,
  Rocket,
  ShieldCheck,
  Sparkles,
  WandSparkles,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FormPopup } from '@/components/FormPopup';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useFormPopup } from '@/hooks/useFormPopup';
import {
  readDeliverySessionPayload,
  writeDeliverySessionError,
  writeDeliverySessionJob,
  writeDeliverySessionResult,
} from '@/lib/ai/delivery-session';
import type {
  AiSetupRequest,
  AiSetupResponse,
  ImplementationGuide,
  InternalLinkSuggestion,
} from '@/lib/types/ai-setup';

const OUTPUT_TAB_ORDER = [
  { value: 'aiInfoPage', label: 'AI Info Page', icon: FileText },
  { value: 'robotsTxt', label: 'robots.txt', icon: FileCode2 },
  { value: 'schema', label: 'Schema', icon: Network },
  { value: 'internalLinking', label: 'Internal Linking', icon: Globe },
  { value: 'implementationGuide', label: 'Implementation Guide', icon: Rocket },
  { value: 'optionalExtras', label: 'Optional Extras', icon: Sparkles },
] as const;

const LOADING_STEPS = [
  'Scanning your website',
  'Checking key signals',
  'Generating your AI setup',
  'Preparing implementation guide',
];

const RETRYABLE_API_STATUS = new Set([429, 502, 503, 504]);
const POLL_INTERVAL_MS = 1_800;
const MAX_POLL_WINDOW_MS = 10 * 60 * 1_000;

type OutputTabValue = (typeof OUTPUT_TAB_ORDER)[number]['value'];

type ParsedApiResponse<T> = {
  payload: T | null;
  rawText: string | null;
  isJson: boolean;
};

type AiSetupStartResponse = {
  jobId: string;
  status: 'queued' | 'running';
  error?: string;
};

type AiSetupStatusResponse = {
  jobId: string;
  status: 'queued' | 'running' | 'completed' | 'failed';
  stepIndex: number;
  stepLabel: string;
  warnings: string[];
  error?: string;
  result?: AiSetupResponse;
};

type GuideBuckets = {
  what: string[];
  where: string[];
  steps: string[];
  preserve: string[];
  verify: string[];
  mistakes: string[];
  notes: string[];
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

async function parseApiResponse<T>(response: Response): Promise<ParsedApiResponse<T>> {
  const contentType = response.headers.get('content-type')?.toLowerCase() ?? '';

  if (contentType.includes('application/json')) {
    try {
      return {
        payload: (await response.json()) as T,
        rawText: null,
        isJson: true,
      };
    } catch {
      return {
        payload: null,
        rawText: null,
        isJson: false,
      };
    }
  }

  try {
    return {
      payload: null,
      rawText: await response.text(),
      isJson: false,
    };
  } catch {
    return {
      payload: null,
      rawText: null,
      isJson: false,
    };
  }
}

function buildApiFailureMessage(status: number, rawText: string | null): string {
  const normalized = (rawText ?? '').trim();
  const isHtmlResponse = normalized.startsWith('<!DOCTYPE') || normalized.startsWith('<html');

  if (isHtmlResponse) {
    if (status === 404) {
      return 'The AI setup API endpoint was not found on this deploy. Please redeploy and try again.';
    }

    return `The AI setup API returned HTML instead of JSON (status ${status}). Please retry deploy.`;
  }

  if (normalized) {
    return `The AI setup API request failed (status ${status}). ${normalized.slice(0, 200)}`;
  }

  return `The AI setup API request failed (status ${status}). Please try again.`;
}

function maskContent(content: string, maxLength = 5_000): string {
  if (content.length <= maxLength) {
    return content;
  }

  return `${content.slice(0, maxLength)}\n\n[Preview truncated for readability.]`;
}

function internalLinkingToText(links: InternalLinkSuggestion[]): string {
  return links
    .map(
      (link, index) =>
        `${index + 1}. From: ${link.fromPage}\n   Anchor: ${link.anchorText}\n   Placement: ${link.placement}\n   Why: ${link.reason}`,
    )
    .join('\n\n');
}

function implementationGuideToText(guide: ImplementationGuide): string {
  const renderSection = (title: string, steps: string[]) => {
    const items = steps.map((step, index) => `${index + 1}. ${step}`).join('\n');
    return `${title}\n${items}`;
  };

  return [
    renderSection('WordPress', guide.wordpress),
    renderSection('Webflow', guide.webflow),
    renderSection('Shopify', guide.shopify),
    renderSection('Custom HTML / Developer Handoff', guide.customHtml),
    renderSection('Vibe-Coded Sites', guide.vibeCoded ?? []),
  ].join('\n\n');
}

function schemaToText(result: AiSetupResponse): string {
  const sections = [
    `Organization JSON-LD\n${result.assets.schema.organization}`,
    `WebSite JSON-LD\n${result.assets.schema.website}`,
    `Service JSON-LD\n${result.assets.schema.service}`,
  ];

  if (result.assets.schema.person) {
    sections.push(`Person JSON-LD\n${result.assets.schema.person}`);
  }

  if (result.assets.schema.notes.length > 0) {
    sections.push(`Notes\n- ${result.assets.schema.notes.join('\n- ')}`);
  }

  return sections.join('\n\n');
}

function optionalExtrasToText(result: AiSetupResponse): string {
  return [
    `llms.txt (Optional / Future-Facing)\n${result.assets.optionalExtras.llmsTxt}`,
    `agents.md (Optional / Future-Facing)\n${result.assets.optionalExtras.agentsMd}`,
  ].join('\n\n');
}

function buildTabCopyText(result: AiSetupResponse, tab: OutputTabValue): string {
  if (tab === 'aiInfoPage') {
    return result.assets.aiInfoPage;
  }

  if (tab === 'robotsTxt') {
    return result.assets.robotsTxt;
  }

  if (tab === 'schema') {
    return schemaToText(result);
  }

  if (tab === 'internalLinking') {
    return internalLinkingToText(result.assets.internalLinking);
  }

  if (tab === 'implementationGuide') {
    return implementationGuideToText(result.assets.implementationGuide);
  }

  return optionalExtrasToText(result);
}

function buildExportPack(result: AiSetupResponse): string {
  const sections = OUTPUT_TAB_ORDER.map((tab) => {
    const title = `## ${tab.label}`;
    const content = buildTabCopyText(result, tab.value);
    return `${title}\n\n${content}`;
  }).join('\n\n---\n\n');

  return `# AI Setup Delivery Pack\n\nGenerated for: ${result.site.normalizedUrl}\nGenerated at: ${new Date().toISOString()}\n\n${sections}`;
}

function stripPrefix(step: string): string {
  const separatorIndex = step.indexOf(':');
  if (separatorIndex === -1) {
    return step.trim();
  }

  const stripped = step.slice(separatorIndex + 1).trim();
  return stripped || step.trim();
}

function parseGuideBuckets(steps: string[]): GuideBuckets {
  const buckets: GuideBuckets = {
    what: [],
    where: [],
    steps: [],
    preserve: [],
    verify: [],
    mistakes: [],
    notes: [],
  };

  for (const rawStep of steps) {
    const step = rawStep.trim();
    if (!step) {
      continue;
    }

    if (/^what you are adding:/i.test(step)) {
      buckets.what.push(stripPrefix(step));
      continue;
    }

    if (/^where to add it:/i.test(step)) {
      buckets.where.push(stripPrefix(step));
      continue;
    }

    if (/^step-by-step implementation:/i.test(step)) {
      buckets.steps.push(stripPrefix(step));
      continue;
    }

    if (/^how to preserve existing settings \/ avoid overwriting:/i.test(step)) {
      buckets.preserve.push(stripPrefix(step));
      continue;
    }

    if (/^how to verify it worked:/i.test(step)) {
      buckets.verify.push(stripPrefix(step));
      continue;
    }

    if (/^common mistakes to avoid:/i.test(step)) {
      buckets.mistakes.push(stripPrefix(step));
      continue;
    }

    if (/^vibe coding prompt template:?/i.test(step)) {
      continue;
    }

    buckets.notes.push(step);
  }

  return buckets;
}

function extractPromptBody(steps: string[]): string | null {
  const promptStartIndex = steps.findIndex((step) => /^vibe coding prompt template:?/i.test(step.trim()));
  if (promptStartIndex < 0 || steps.length <= promptStartIndex + 1) {
    return null;
  }

  const promptBody = steps.slice(promptStartIndex + 1).join('\n').trim();
  return promptBody || null;
}

function safeItems(values: string[], fallback: string[]): string[] {
  return values.length > 0 ? values : fallback;
}

function renderImplementationGuideCards(
  guide: ImplementationGuide,
  copiedKey: string | null,
  onCopy: (text: string, key: string) => Promise<void>,
) {
  const cards = [
    {
      key: 'wordpress',
      title: 'WordPress',
      badge: 'CMS',
      steps: guide.wordpress,
    },
    {
      key: 'webflow',
      title: 'Webflow',
      badge: 'No-Code',
      steps: guide.webflow,
    },
    {
      key: 'shopify',
      title: 'Shopify',
      badge: 'Commerce',
      steps: guide.shopify,
    },
    {
      key: 'customHtml',
      title: 'Custom HTML / Developer',
      badge: 'Code',
      steps: guide.customHtml,
    },
    {
      key: 'vibeCoded',
      title: 'Vibe-Coded Sites Prompt',
      badge: 'Prompt',
      steps: guide.vibeCoded ?? [],
    },
  ];

  return (
    <div className="grid gap-5 xl:grid-cols-2">
      {cards.map((card) => {
        const buckets = parseGuideBuckets(card.steps);
        const promptBody = extractPromptBody(card.steps);
        const executionSteps = safeItems(buckets.steps, card.steps);
        const preserveItems = safeItems(buckets.preserve, ['Review existing setup before applying generated changes.']);
        const verifyItems = safeItems(buckets.verify, ['Confirm live URL status, indexability, schema visibility, and robots accessibility.']);
        const mistakesItems = safeItems(buckets.mistakes, ['Do not overwrite live files blindly; merge and validate before publish.']);

        return (
          <div key={card.key} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{card.badge}</p>
                <h3 className="mt-1 text-2xl font-black text-slate-900">{card.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{card.steps.length} implementation directives</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
                onClick={() =>
                  void onCopy(
                    card.steps.map((step, index) => `${index + 1}. ${step}`).join('\n'),
                    `guide-${card.key}`,
                  )
                }
              >
                {copiedKey === `guide-${card.key}` ? 'Copied' : 'Copy'}
              </Button>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">What You Are Adding</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  {safeItems(buckets.what, ['Core setup assets including /ai page, robots, schema, and linking updates.'])[0]}
                </p>
              </div>
              <div className="rounded-xl border border-violet-200 bg-violet-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-700">Where To Add It</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  {safeItems(buckets.where, ['Use platform page settings, SEO config, and template code areas.'])[0]}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">Step-By-Step Execution</p>
              <div className="mt-3 space-y-2">
                {executionSteps.map((step, index) => (
                  <div key={`${card.key}-step-${index}`} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-slate-700">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">Preserve Existing Setup</p>
                <ul className="mt-2 space-y-2 text-sm leading-relaxed text-slate-700">
                  {preserveItems.map((item, index) => (
                    <li key={`${card.key}-preserve-${index}`}>- {item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">Verify It Worked</p>
                <ul className="mt-2 space-y-2 text-sm leading-relaxed text-slate-700">
                  {verifyItems.map((item, index) => (
                    <li key={`${card.key}-verify-${index}`}>- {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-700">Common Mistakes To Avoid</p>
              <ul className="mt-2 space-y-2 text-sm leading-relaxed text-slate-700">
                {mistakesItems.map((item, index) => (
                  <li key={`${card.key}-mistake-${index}`}>- {item}</li>
                ))}
              </ul>
            </div>

            {buckets.notes.length > 0 && (
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">Additional Notes</p>
                <ul className="mt-2 space-y-2 text-sm leading-relaxed text-slate-700">
                  {buckets.notes.map((item, index) => (
                    <li key={`${card.key}-note-${index}`}>- {item}</li>
                  ))}
                </ul>
              </div>
            )}

            {promptBody && (
              <div className="mt-4 overflow-hidden rounded-xl border border-slate-300 bg-slate-950">
                <div className="flex items-center justify-between gap-2 border-b border-slate-700 px-3 py-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-200">Prompt Template</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 border-slate-500 bg-slate-800 px-2.5 text-[11px] text-slate-100 hover:bg-slate-700"
                    onClick={() => void onCopy(promptBody, `prompt-${card.key}`)}
                  >
                    {copiedKey === `prompt-${card.key}` ? 'Copied' : 'Copy Prompt'}
                  </Button>
                </div>
                <pre className="max-h-[260px] overflow-auto whitespace-pre-wrap break-words px-4 py-3 text-xs leading-relaxed text-slate-100">
                  {promptBody}
                </pre>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function DeliveryPackDashboardPage() {
  const { isOpen, openForm, closeForm } = useFormPopup();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session') ?? '';
  const generationStartedRef = useRef<string | null>(null);

  const [result, setResult] = useState<AiSetupResponse | null>(null);
  const [requestPayload, setRequestPayload] = useState<AiSetupRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const [loadingStepLabel, setLoadingStepLabel] = useState(LOADING_STEPS[0] ?? 'Scanning your website');
  const [loadError, setLoadError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<OutputTabValue>('aiInfoPage');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const renderShell = (body: ReactNode, options?: { includeBottomCta?: boolean }) => (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-white text-slate-900">
        <Header onOpenForm={openForm} />
        <main className="pb-14 pt-6 md:pt-8">{body}</main>

        {options?.includeBottomCta && (
          <section className="px-4 pb-10 md:px-8">
            <div className="mx-auto max-w-[1320px] rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-xl md:p-8">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-300">Need Implementation Support?</p>
                  <h3 className="mt-2 text-3xl font-black">Ship This AI Setup Without Guesswork</h3>
                  <p className="mt-2 max-w-2xl text-sm text-slate-200">
                    Get hands-on help publishing the AI page, robots updates, schema, and internal linking plan correctly on your stack.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link href="/strategy-blueprint">
                    <Button className="bg-orange-500 text-white hover:bg-orange-600">Book Strategy Call</Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="border-slate-500 bg-slate-800 text-white hover:bg-slate-700"
                    onClick={openForm}
                  >
                    Get Implementation Help
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        <Footer onOpenForm={openForm} />
      </div>

      <FormPopup isOpen={isOpen} onClose={closeForm} />
    </>
  );

  useEffect(() => {
    let cancelled = false;

    const startGenerationJob = async (payload: AiSetupRequest): Promise<string> => {
      const maxAttempts = 3;

      for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
        const response = await fetch('/api/ai-setup/start', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const parsedResponse = await parseApiResponse<AiSetupStartResponse & { error?: string }>(response);
        const apiPayload = parsedResponse.payload;

        if (response.ok && parsedResponse.isJson && apiPayload?.jobId) {
          return apiPayload.jobId;
        }

        if (!response.ok) {
          const isRetryable = RETRYABLE_API_STATUS.has(response.status);
          if (isRetryable && attempt < maxAttempts) {
            await sleep(700 * attempt);
            continue;
          }

          if (parsedResponse.isJson && apiPayload?.error) {
            throw new Error(apiPayload.error);
          }

          throw new Error(buildApiFailureMessage(response.status, parsedResponse.rawText));
        }

        if (attempt < maxAttempts) {
          await sleep(600 * attempt);
          continue;
        }

        throw new Error(
          `The AI setup start endpoint returned a non-JSON response (status ${response.status}). Please retry the deploy and test again.`,
        );
      }

      throw new Error('Unable to start the AI setup job.');
    };

    const pollGenerationJob = async (jobId: string): Promise<void> => {
      const startedAt = Date.now();
      const maxAttempts = 5;

      while (!cancelled) {
        for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
          const response = await fetch(`/api/ai-setup/status?jobId=${encodeURIComponent(jobId)}`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
            cache: 'no-store',
          });

          const parsedResponse = await parseApiResponse<AiSetupStatusResponse & { error?: string }>(response);
          const apiPayload = parsedResponse.payload;

          if (response.ok && parsedResponse.isJson && apiPayload) {
            const safeStepIndex = Math.max(0, Math.min(apiPayload.stepIndex ?? 0, LOADING_STEPS.length - 1));
            setLoadingStepIndex(safeStepIndex);
            setLoadingStepLabel(apiPayload.stepLabel ?? LOADING_STEPS[safeStepIndex] ?? 'Processing');

            if (apiPayload.status === 'completed' && apiPayload.result) {
              if (!cancelled) {
                setResult(apiPayload.result);
                writeDeliverySessionResult(sessionId, apiPayload.result);
                setIsGenerating(false);
                setLoadingStepIndex(LOADING_STEPS.length - 1);
                setLoadingStepLabel('Delivery pack ready');
              }
              return;
            }

            if (apiPayload.status === 'failed') {
              throw new Error(apiPayload.error ?? 'The AI setup job failed during generation.');
            }

            break;
          }

          if (!response.ok) {
            const isRetryable = RETRYABLE_API_STATUS.has(response.status);
            if (isRetryable && attempt < maxAttempts) {
              await sleep(650 * attempt);
              continue;
            }

            if (parsedResponse.isJson && apiPayload?.error) {
              throw new Error(apiPayload.error);
            }

            throw new Error(buildApiFailureMessage(response.status, parsedResponse.rawText));
          }
        }

        if (Date.now() - startedAt > MAX_POLL_WINDOW_MS) {
          throw new Error('The generation job is taking too long. Please try running it again.');
        }

        await sleep(POLL_INTERVAL_MS);
      }
    };

    const runGeneration = async (payload: AiSetupRequest, existingJobId?: string) => {
      setIsGenerating(true);
      setLoadError(null);
      setLoadingStepIndex(0);
      setLoadingStepLabel(LOADING_STEPS[0] ?? 'Scanning your website');

      try {
        const jobId = existingJobId ?? (await startGenerationJob(payload));
        writeDeliverySessionJob(sessionId, jobId);
        await pollGenerationJob(jobId);
      } catch (error) {
        if (!cancelled) {
          const message = error instanceof Error ? error.message : 'Unable to generate your delivery pack.';
          setLoadError(message);
          writeDeliverySessionError(sessionId, message);
          setIsGenerating(false);
        }
      }
    };

    if (!sessionId) {
      setLoading(false);
      setLoadError('No delivery session was provided.');
      return () => {
        cancelled = true;
      };
    }

    const sessionPayload = readDeliverySessionPayload(sessionId);
    setLoading(false);

    if (!sessionPayload) {
      setLoadError('This delivery session is missing or has expired. Start a new run from /ai-setup.');
      return () => {
        cancelled = true;
      };
    }

    if (sessionPayload.result) {
      setResult(sessionPayload.result);
      if (sessionPayload.request) {
        setRequestPayload(sessionPayload.request);
      }
      return () => {
        cancelled = true;
      };
    }

    if (sessionPayload.status === 'failed' && sessionPayload.error) {
      setLoadError(sessionPayload.error);
      return () => {
        cancelled = true;
      };
    }

    if (!sessionPayload.request) {
      setLoadError('No input payload found for this delivery session. Start a new run from /ai-setup.');
      return () => {
        cancelled = true;
      };
    }

    setRequestPayload(sessionPayload.request);

    if (generationStartedRef.current !== sessionId) {
      generationStartedRef.current = sessionId;
      void runGeneration(sessionPayload.request, sessionPayload.jobId);
    }

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const summaryMetrics = useMemo(() => {
    if (!result) {
      return null;
    }

    return {
      pages: result.site.scannedPaths.length,
      existing: result.summary.existingAssets.length,
      missing: result.summary.missingAssets.length,
      links: result.assets.internalLinking.length,
    };
  }, [result]);

  const implementationStats = useMemo(() => {
    if (!result) {
      return null;
    }

    const guide = result.assets.implementationGuide;
    const platformStepCounts = [
      guide.wordpress.length,
      guide.webflow.length,
      guide.shopify.length,
      guide.customHtml.length,
      (guide.vibeCoded ?? []).length,
    ];

    const totalDirectives = platformStepCounts.reduce((sum, count) => sum + count, 0);
    const averageDepth = Math.round(totalDirectives / platformStepCounts.length);

    return {
      platforms: platformStepCounts.length,
      totalDirectives,
      averageDepth,
    };
  }, [result]);

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey((current) => (current === key ? null : current)), 1600);
      return;
    } catch {
      // Fallback for browser contexts where clipboard API is blocked.
    }

    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.setAttribute('readonly', '');
      textArea.style.position = 'absolute';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      const copied = document.execCommand('copy');
      document.body.removeChild(textArea);

      if (!copied) {
        throw new Error('copy_failed');
      }

      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey((current) => (current === key ? null : current)), 1600);
    } catch {
      setLoadError('Clipboard access failed. You can still select and copy manually.');
    }
  };

  const copyAll = async () => {
    if (!result) {
      return;
    }

    await copyToClipboard(buildExportPack(result), 'copy-all');
  };

  const downloadPack = () => {
    if (!result) {
      return;
    }

    const blob = new Blob([buildExportPack(result)], { type: 'text/markdown;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${result.site.domain.replace(/[^a-z0-9.-]+/gi, '-')}-delivery-pack.md`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return renderShell(
      <div className="min-h-screen bg-slate-100 px-4 py-16 text-slate-900 md:px-8">
        <div className="mx-auto w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Opening Delivery Pack</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Preparing your dashboard</h1>
          <p className="mt-3 text-sm text-slate-600">Loading session data and restoring your generated assets.</p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-sm text-slate-700">
            <Loader2 className="h-4 w-4 animate-spin" />
            Initializing
          </div>
        </div>
      </div>,
    );
  }

  if (isGenerating && !result) {
    return renderShell(
      <div className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 md:px-8 md:py-10">
        <div className="mx-auto w-full max-w-[1240px] space-y-6">
          <Card className="border border-slate-200 bg-white p-6 shadow-sm md:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">Delivery Pack</p>
            <h1 className="mt-2 text-3xl font-black text-slate-900">Running AI setup generation</h1>
            <p className="mt-2 text-base text-slate-600">
              Target:{' '}
              <span className="font-semibold text-slate-900">{requestPayload?.url ?? 'Website URL'}</span>
            </p>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-700">
              <Loader2 className="h-4 w-4 animate-spin" />
              {loadingStepLabel}
            </p>
          </Card>

          <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
            <Card className="border border-slate-200 bg-white p-6 shadow-sm md:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Generation Pipeline</p>
              <div className="mt-4 space-y-3">
                {LOADING_STEPS.map((step, index) => {
                  const isComplete = index < loadingStepIndex;
                  const isActive = index === loadingStepIndex;

                  return (
                    <div
                      key={step}
                      className={`rounded-xl border px-4 py-3 ${
                        isComplete
                          ? 'border-emerald-200 bg-emerald-50'
                          : isActive
                            ? 'border-orange-300 bg-orange-50'
                            : 'border-slate-200 bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-slate-800">{step}</p>
                        {isComplete ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        ) : isActive ? (
                          <Loader2 className="h-4 w-4 animate-spin text-orange-600" />
                        ) : (
                          <div className="h-2.5 w-2.5 rounded-full bg-slate-400" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="border border-slate-200 bg-white p-6 shadow-sm md:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Pack Includes</p>
              <div className="mt-4 space-y-2">
                {[
                  'AI Info Page',
                  'Recommended robots.txt',
                  'Schema JSON-LD',
                  'Internal linking plan',
                  'Implementation guides',
                  'Downloadable delivery pack',
                ].map((item) => (
                  <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>,
    );
  }

  if (!result) {
    return renderShell(
      <div className="min-h-screen bg-slate-100 px-4 py-16 text-slate-900 md:px-8">
        <div className="mx-auto w-full max-w-4xl rounded-2xl border border-red-300 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">Delivery Session Error</p>
          <p className="mt-3 text-lg text-slate-800">{loadError ?? 'Unable to load this delivery pack session.'}</p>
          <Link href="/ai-setup" className="mt-6 inline-flex">
            <Button className="bg-orange-500 text-white hover:bg-orange-600">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to AI Setup
            </Button>
          </Link>
        </div>
      </div>,
    );
  }

  return renderShell(
    <div className="mx-auto w-full max-w-[1320px] space-y-6 px-4 pt-2 md:px-8">
        <Card className="border border-slate-200 bg-white p-6 shadow-sm md:p-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Delivery Pack</p>
              <h1 className="mt-2 text-3xl font-black text-slate-900 md:text-4xl">AI Setup Dashboard</h1>
              <p className="mt-2 text-sm text-slate-600">
                Domain: <span className="font-semibold text-slate-900">{result.site.normalizedUrl}</span>
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 font-semibold text-slate-700">
                  Generation Source: {result.meta.generationMode === 'openrouter' ? 'OpenRouter + Rules' : 'Rules-only fallback'}
                </span>
                {result.meta.model && (
                  <span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 font-semibold text-slate-700">
                    Model: {result.meta.model}
                  </span>
                )}
                <span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 font-semibold text-slate-700">
                  Scanned at: {new Date(result.site.scannedAt).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/ai-setup">
                <Button variant="outline" className="border-slate-300 text-slate-900 hover:bg-slate-50">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </Link>
              <Button onClick={copyAll} className="bg-orange-500 text-white hover:bg-orange-600">
                {copiedKey === 'copy-all' ? (
                  <>
                    <ClipboardCheck className="mr-2 h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Clipboard className="mr-2 h-4 w-4" />
                    Copy All
                  </>
                )}
              </Button>
              <Button onClick={downloadPack} className="bg-slate-900 text-white hover:bg-slate-800">
                <Download className="mr-2 h-4 w-4" />
                Download Pack
              </Button>
            </div>
          </div>

          {result.meta.generationMode !== 'openrouter' && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              OpenRouter was not used for this run. Start a new run and verify deployment environment variables.
            </div>
          )}

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Pages Scanned</p>
              <p className="mt-2 text-4xl font-black text-slate-900">{summaryMetrics?.pages ?? 0}</p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">Existing Assets</p>
              <p className="mt-2 text-4xl font-black text-slate-900">{summaryMetrics?.existing ?? 0}</p>
            </div>
            <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-700">Missing Assets</p>
              <p className="mt-2 text-4xl font-black text-slate-900">{summaryMetrics?.missing ?? 0}</p>
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">Link Placements</p>
              <p className="mt-2 text-4xl font-black text-slate-900">{summaryMetrics?.links ?? 0}</p>
            </div>
          </div>
        </Card>

        <Card className="border border-slate-200 bg-white p-4 shadow-sm md:p-6">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as OutputTabValue)}>
            <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
              <TabsList className="grid h-fit w-full grid-cols-2 gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2 lg:grid-cols-1 lg:sticky lg:top-6">
                {OUTPUT_TAB_ORDER.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="flex items-center justify-start gap-2 rounded-lg border border-transparent bg-white px-3 py-3 text-left text-base font-semibold text-slate-700 data-[state=active]:border-slate-300 data-[state=active]:bg-slate-900 data-[state=active]:text-white"
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 md:p-5">
                <TabsContent value="aiInfoPage" className="mt-0 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-3xl font-black text-slate-900">AI Info Page</h2>
                    <Button size="sm" variant="outline" onClick={() => void copyToClipboard(result.assets.aiInfoPage, 'tab-aiInfoPage')}>
                      {copiedKey === 'tab-aiInfoPage' ? 'Copied' : 'Copy'}
                    </Button>
                  </div>
                  <pre className="max-h-[68vh] overflow-auto whitespace-pre-wrap break-words rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-relaxed text-slate-100 md:p-5">
                    {maskContent(result.assets.aiInfoPage, 5_400)}
                  </pre>
                </TabsContent>

                <TabsContent value="robotsTxt" className="mt-0 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-3xl font-black text-slate-900">robots.txt</h2>
                    <Button size="sm" variant="outline" onClick={() => void copyToClipboard(result.assets.robotsTxt, 'tab-robotsTxt')}>
                      {copiedKey === 'tab-robotsTxt' ? 'Copied' : 'Copy'}
                    </Button>
                  </div>
                  <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
                    robots.txt is crawler guidance, not security access control.
                  </div>
                  <pre className="max-h-[68vh] overflow-auto whitespace-pre-wrap break-words rounded-xl border border-slate-300 bg-white p-4 text-sm leading-relaxed text-slate-800 md:p-5">
                    {maskContent(result.assets.robotsTxt, 5_400)}
                  </pre>
                </TabsContent>

                <TabsContent value="schema" className="mt-0 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-3xl font-black text-slate-900">Schema</h2>
                    <Button size="sm" variant="outline" onClick={() => void copyToClipboard(schemaToText(result), 'tab-schema')}>
                      {copiedKey === 'tab-schema' ? 'Copied' : 'Copy'}
                    </Button>
                  </div>
                  <pre className="max-h-[68vh] overflow-auto whitespace-pre-wrap break-words rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs leading-relaxed text-slate-100 md:p-5 md:text-sm">
                    {maskContent(schemaToText(result), 6_000)}
                  </pre>
                </TabsContent>

                <TabsContent value="internalLinking" className="mt-0 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-3xl font-black text-slate-900">Internal Linking Plan</h2>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => void copyToClipboard(internalLinkingToText(result.assets.internalLinking), 'tab-internalLinking')}
                    >
                      {copiedKey === 'tab-internalLinking' ? 'Copied' : 'Copy'}
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {result.assets.internalLinking.map((item, index) => (
                      <div key={`${item.fromPage}-${index}`} className="rounded-xl border border-slate-200 bg-white p-4">
                        <p className="text-base font-bold text-slate-900">{index + 1}. {item.fromPage}</p>
                        <p className="mt-1 text-sm text-slate-700">
                          <span className="font-semibold text-slate-900">Anchor:</span> {item.anchorText}
                        </p>
                        <p className="mt-1 text-sm text-slate-700">
                          <span className="font-semibold text-slate-900">Placement:</span> {item.placement}
                        </p>
                        <p className="mt-1 text-sm text-slate-700">
                          <span className="font-semibold text-slate-900">Reason:</span> {item.reason}
                        </p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="implementationGuide" className="mt-0 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-3xl font-black text-slate-900">Implementation Guide</h2>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => void copyToClipboard(implementationGuideToText(result.assets.implementationGuide), 'tab-implementationGuide')}
                    >
                      {copiedKey === 'tab-implementationGuide' ? 'Copied' : 'Copy'}
                    </Button>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700">Platform Playbooks</p>
                      <p className="mt-2 text-3xl font-black text-slate-900">{implementationStats?.platforms ?? 0}</p>
                      <p className="text-sm text-slate-700">WordPress, Webflow, Shopify, custom, and vibe-coded flow.</p>
                    </div>
                    <div className="rounded-xl border border-violet-200 bg-violet-50 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-700">Total Directives</p>
                      <p className="mt-2 text-3xl font-black text-slate-900">{implementationStats?.totalDirectives ?? 0}</p>
                      <p className="text-sm text-slate-700">Actionable implementation steps in this session.</p>
                    </div>
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700">Average Guide Depth</p>
                      <p className="mt-2 text-3xl font-black text-slate-900">{implementationStats?.averageDepth ?? 0}</p>
                      <p className="text-sm text-slate-700">Average directives per platform guide.</p>
                    </div>
                  </div>

                  {renderImplementationGuideCards(result.assets.implementationGuide, copiedKey, copyToClipboard)}
                </TabsContent>

                <TabsContent value="optionalExtras" className="mt-0 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-3xl font-black text-slate-900">Optional Extras</h2>
                    <Button size="sm" variant="outline" onClick={() => void copyToClipboard(optionalExtrasToText(result), 'tab-optionalExtras')}>
                      {copiedKey === 'tab-optionalExtras' ? 'Copied' : 'Copy'}
                    </Button>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2">
                    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
                      <div className="border-b border-slate-700 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-200">llms.txt</div>
                      <pre className="max-h-[62vh] overflow-auto whitespace-pre-wrap break-words px-4 py-4 text-xs leading-relaxed text-slate-100 md:text-sm">
                        {maskContent(result.assets.optionalExtras.llmsTxt, 4_500)}
                      </pre>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
                      <div className="border-b border-slate-700 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-200">agents.md</div>
                      <pre className="max-h-[62vh] overflow-auto whitespace-pre-wrap break-words px-4 py-4 text-xs leading-relaxed text-slate-100 md:text-sm">
                        {maskContent(result.assets.optionalExtras.agentsMd, 4_500)}
                      </pre>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </Card>

        {loadError && (
          <Card className="border border-amber-200 bg-amber-50 p-4 text-amber-800">
            <div className="flex items-start gap-2 text-sm">
              <AlertTriangle className="mt-0.5 h-4 w-4" />
              <p>{loadError}</p>
            </div>
          </Card>
        )}

        {result.meta.warnings.length > 0 && (
          <Card className="border border-amber-200 bg-amber-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-700">Runtime Warnings</p>
            <ul className="mt-2 space-y-1 text-sm text-amber-900">
              {result.meta.warnings.slice(0, 5).map((warning) => (
                <li key={warning}>- {warning}</li>
              ))}
            </ul>
          </Card>
        )}

        <Card className="border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
                <ShieldCheck className="h-4 w-4" />
                Validation Reminder
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Confirm live URL status, indexability, internal links, schema visibility, and robots resolution after publishing.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
                <WandSparkles className="h-4 w-4" />
                Next Step
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Use this delivery pack as your implementation handoff, then update your /ai page when services or positioning changes.
              </p>
            </div>
          </div>
        </Card>
    </div>,
    { includeBottomCta: true },
  );
}
