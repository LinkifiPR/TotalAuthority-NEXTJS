"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  CheckCheck,
  Clipboard,
  ClipboardCheck,
  Download,
  FileCode2,
  FileText,
  Globe,
  Loader2,
  MapPin,
  Network,
  Rocket,
  Shield,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  readDeliverySessionPayload,
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

const RETRYABLE_API_STATUS = new Set([502, 503, 504]);

type OutputTabValue = (typeof OUTPUT_TAB_ORDER)[number]['value'];

type ParsedApiResponse<T> = {
  payload: T | null;
  rawText: string | null;
  isJson: boolean;
};

type ParsedGuideBuckets = {
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

function maskContent(content: string, maxLength = 2_800): string {
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

function parseGuideBuckets(steps: string[]): ParsedGuideBuckets {
  const buckets: ParsedGuideBuckets = {
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

function bucketCompletenessScore(buckets: ParsedGuideBuckets): number {
  const totalChecks = 6;
  let completed = 0;

  if (buckets.what.length > 0) completed += 1;
  if (buckets.where.length > 0) completed += 1;
  if (buckets.steps.length > 0) completed += 1;
  if (buckets.preserve.length > 0) completed += 1;
  if (buckets.verify.length > 0) completed += 1;
  if (buckets.mistakes.length > 0) completed += 1;

  return Math.round((completed / totalChecks) * 100);
}

function extractPromptBody(steps: string[]): string | null {
  const promptStartIndex = steps.findIndex((step) => /^vibe coding prompt template:?/i.test(step.trim()));
  if (promptStartIndex < 0 || steps.length <= promptStartIndex + 1) {
    return null;
  }

  const promptBody = steps.slice(promptStartIndex + 1).join('\n').trim();
  return promptBody || null;
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
      steps: guide.wordpress,
      tone: 'from-blue-100/70 via-white to-blue-50',
      badge: 'CMS',
    },
    {
      key: 'webflow',
      title: 'Webflow',
      steps: guide.webflow,
      tone: 'from-emerald-100/70 via-white to-emerald-50',
      badge: 'No-Code',
    },
    {
      key: 'shopify',
      title: 'Shopify',
      steps: guide.shopify,
      tone: 'from-orange-100/70 via-white to-orange-50',
      badge: 'Ecommerce',
    },
    {
      key: 'customHtml',
      title: 'Custom HTML / Developer',
      steps: guide.customHtml,
      tone: 'from-slate-100/80 via-white to-slate-50',
      badge: 'Code',
    },
    {
      key: 'vibeCoded',
      title: 'Vibe-Coded Sites Prompt',
      steps: guide.vibeCoded ?? [],
      tone: 'from-violet-100/65 via-white to-fuchsia-50',
      badge: 'Prompt',
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {cards.map((card) => {
        const buckets = parseGuideBuckets(card.steps);
        const promptBody = extractPromptBody(card.steps);
        const readinessScore = bucketCompletenessScore(buckets);
        const timelineSteps = buckets.steps.length > 0 ? buckets.steps : card.steps;

        return (
          <div
            key={card.key}
            className={`rounded-3xl border border-slate-200 bg-gradient-to-br ${card.tone} p-5 shadow-sm shadow-slate-300/40 md:p-6`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{card.badge}</p>
                <h4 className="mt-1 text-lg font-black text-slate-950">{card.title}</h4>
                <p className="mt-1 text-xs text-slate-600">{card.steps.length} implementation directives</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                  {readinessScore}% complete
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-slate-300 bg-white/90 text-slate-900 hover:bg-white"
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
            </div>

            <div className="mt-4 grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
              <div className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-4">
                    <p className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700">
                      <Wrench className="h-3.5 w-3.5" />
                      What You Are Adding
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      {buckets.what[0] ?? 'Structured page, robots, schema, and internal linking assets for deployment.'}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-violet-200 bg-violet-50/70 p-4">
                    <p className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-700">
                      <MapPin className="h-3.5 w-3.5" />
                      Where To Add It
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      {buckets.where[0] ?? 'Use your CMS page editor, SEO settings, and template code areas.'}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/80 bg-white/85 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">Step-By-Step Execution</p>
                  <div className="mt-3 space-y-3">
                    {timelineSteps.map((step, index) => (
                      <div key={`${card.key}-${index}`} className="relative pl-10">
                        {index < timelineSteps.length - 1 && (
                          <div className="absolute left-[15px] top-6 h-[calc(100%-0.35rem)] w-px bg-slate-300" />
                        )}
                        <div className="absolute left-0 top-0 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-xs font-semibold text-slate-700">
                          {index + 1}
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3">
                          <p className="text-sm leading-relaxed text-slate-700">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
                  <p className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
                    <Shield className="h-3.5 w-3.5" />
                    Preserve + Verify
                  </p>
                  <div className="mt-3 space-y-3">
                    <div className="rounded-xl border border-emerald-200 bg-white/90 p-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-700">
                        Preserve Existing Setup
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-700">
                        {buckets.preserve[0] ?? 'Review existing pages, robots rules, and schema before merging new assets.'}
                      </p>
                    </div>
                    <div className="rounded-xl border border-emerald-200 bg-white/90 p-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-700">
                        Verify It Worked
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-700">
                        {buckets.verify[0] ?? 'Check live URLs, indexability, schema visibility, robots accessibility, and internal links.'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
                  <p className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-700">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    Common Mistakes To Avoid
                  </p>
                  <div className="mt-3 space-y-2">
                    {(buckets.mistakes.length > 0
                      ? buckets.mistakes
                      : ['Avoid replacing live files blindly. Merge changes and validate before publish.']
                    ).map((mistake, index) => (
                      <div key={`${card.key}-mistake-${index}`} className="rounded-xl border border-amber-200 bg-white/90 p-3 text-sm text-slate-700">
                        {mistake}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                  <p className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                    <CheckCheck className="h-3.5 w-3.5" />
                    QA Checklist
                  </p>
                  <div className="mt-2 space-y-2 text-sm text-slate-700">
                    <p>1. Publish changes to a live URL returning HTTP 200.</p>
                    <p>2. Confirm page is indexable and linked from crawlable templates.</p>
                    <p>3. Validate schema syntax and check it appears once in source.</p>
                    <p>4. Confirm `/robots.txt` is plain text and sitemap URL resolves.</p>
                  </div>
                </div>
              </div>
            </div>

            {buckets.notes.length > 0 && (
              <div className="mt-4 rounded-2xl border border-slate-200 bg-white/85 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">Additional Deployment Notes</p>
                <div className="mt-2 space-y-2 text-sm text-slate-700">
                  {buckets.notes.map((note, index) => (
                    <p key={`${card.key}-note-${index}`}>{note}</p>
                  ))}
                </div>
              </div>
            )}

            {promptBody && (
              <div className="mt-4 overflow-hidden rounded-2xl border border-slate-300 bg-slate-950 shadow-inner">
                <div className="flex items-center justify-between gap-2 border-b border-slate-700 px-3 py-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-200">Ready-To-Use Prompt</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 border-slate-500 bg-slate-800 px-2.5 text-[11px] text-slate-100 hover:bg-slate-700"
                    onClick={() => void onCopy(promptBody, `prompt-${card.key}`)}
                  >
                    {copiedKey === `prompt-${card.key}` ? 'Copied' : 'Copy Prompt'}
                  </Button>
                </div>
                <pre className="max-h-[320px] overflow-auto whitespace-pre-wrap p-3 text-xs leading-relaxed text-slate-100">
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
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session') ?? '';
  const generationStartedRef = useRef<string | null>(null);

  const [result, setResult] = useState<AiSetupResponse | null>(null);
  const [requestPayload, setRequestPayload] = useState<AiSetupRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<OutputTabValue>('aiInfoPage');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

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

  useEffect(() => {
    let cancelled = false;
    let stepInterval: number | null = null;

    const runGeneration = async (payload: AiSetupRequest) => {
      setIsGenerating(true);
      setLoadError(null);
      setLoadingStepIndex(0);
      stepInterval = window.setInterval(() => {
        setLoadingStepIndex((previous) => Math.min(previous + 1, LOADING_STEPS.length - 1));
      }, 1200);

      try {
        const maxAttempts = 3;

        for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
          const response = await fetch('/api/ai-setup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify(payload),
          });

          const parsedResponse = await parseApiResponse<AiSetupResponse & { error?: string }>(response);
          const apiPayload = parsedResponse.payload;

          if (response.ok && parsedResponse.isJson && apiPayload) {
            if (cancelled) {
              return;
            }
            setResult(apiPayload as AiSetupResponse);
            writeDeliverySessionResult(sessionId, apiPayload as AiSetupResponse);
            setIsGenerating(false);
            setLoadingStepIndex(LOADING_STEPS.length - 1);
            return;
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

          if (attempt < maxAttempts) {
            await sleep(500 * attempt);
            continue;
          }

          throw new Error(
            `The AI setup API returned a non-JSON response (status ${response.status}). Please retry the deploy and test again.`,
          );
        }
      } catch (error) {
        if (!cancelled) {
          setLoadError(error instanceof Error ? error.message : 'Unable to generate your delivery pack.');
          setIsGenerating(false);
        }
      } finally {
        if (stepInterval) {
          window.clearInterval(stepInterval);
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

    if (!sessionPayload.request) {
      setLoadError('No input payload found for this delivery session. Start a new run from /ai-setup.');
      return () => {
        cancelled = true;
      };
    }

    setRequestPayload(sessionPayload.request);

    if (generationStartedRef.current !== sessionId) {
      generationStartedRef.current = sessionId;
      void runGeneration(sessionPayload.request);
    }

    return () => {
      cancelled = true;
      if (stepInterval) {
        window.clearInterval(stepInterval);
      }
    };
  }, [sessionId]);

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
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
    return (
      <div className="min-h-screen bg-slate-950 px-4 py-20 text-white">
        <div className="mx-auto max-w-3xl animate-pulse rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Opening Delivery Pack</p>
          <h1 className="mt-3 text-3xl font-black">Preparing your dashboard</h1>
        </div>
      </div>
    );
  }

  if (isGenerating && !result) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_15%_0%,#1e293b,transparent_45%),radial-gradient(circle_at_90%_8%,#7c2d12,transparent_40%),#020617] px-4 py-10 text-white">
        <div className="mx-auto max-w-6xl space-y-6">
          <Card className="border border-white/20 bg-white/10 p-6 backdrop-blur md:p-8">
            <p className="text-sm uppercase tracking-[0.22em] text-orange-200">Delivery Pack</p>
            <h1 className="mt-2 text-3xl font-black text-white md:text-4xl">Running AI setup generation</h1>
            <p className="mt-2 text-sm text-slate-200">
              Target: <span className="font-semibold">{requestPayload?.url ?? 'Website URL'}</span>
            </p>
          </Card>

          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="border border-white/20 bg-white/10 p-5 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">Generation Pipeline</p>
              <div className="mt-4 space-y-3">
                {LOADING_STEPS.map((step, index) => {
                  const isActive = index === loadingStepIndex;
                  const isComplete = index < loadingStepIndex;

                  return (
                    <div
                      key={step}
                      className={`rounded-2xl border px-4 py-3 ${
                        isComplete
                          ? 'border-emerald-300/60 bg-emerald-500/20'
                          : isActive
                            ? 'border-orange-300/60 bg-orange-500/20'
                            : 'border-white/15 bg-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-medium text-white">{step}</p>
                        {isComplete ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                        ) : isActive ? (
                          <Loader2 className="h-4 w-4 animate-spin text-orange-200" />
                        ) : (
                          <div className="h-2.5 w-2.5 rounded-full bg-slate-400" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="border border-white/20 bg-white/10 p-5 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">Pack Includes</p>
              <div className="mt-4 grid gap-2">
                {[
                  'AI Info Page',
                  'robots.txt recommendation',
                  'Schema JSON-LD set',
                  'Internal linking plan',
                  'Implementation guides',
                  'Downloadable delivery pack',
                ].map((item) => (
                  <div key={item} className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white">
                    {item}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-slate-950 px-4 py-20 text-white">
        <div className="mx-auto max-w-3xl rounded-3xl border border-red-400/40 bg-red-500/10 p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-red-200">Delivery Session Error</p>
          <p className="mt-3 text-lg">{loadError ?? 'Unable to load this delivery pack session.'}</p>
          <Link href="/ai-setup" className="mt-6 inline-flex">
            <Button className="bg-orange-500 text-white hover:bg-orange-600">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to AI Setup
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_10%_0%,#1f2937,transparent_45%),radial-gradient(circle_at_90%_5%,#7c2d12,transparent_40%),#020617] px-4 py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <Card className="overflow-hidden border border-white/15 bg-white/95 p-6 shadow-2xl shadow-black/35 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Delivery Pack</p>
              <h1 className="mt-2 text-3xl font-black text-slate-950 md:text-4xl">AI Setup Dashboard</h1>
              <p className="mt-2 text-sm text-slate-600">
                Domain: <span className="font-semibold text-slate-900">{result.site.normalizedUrl}</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/ai-setup">
                <Button variant="outline" className="border-slate-300 text-slate-900 hover:bg-slate-100">
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

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Pages scanned</p>
              <p className="mt-2 text-3xl font-black text-slate-900">{summaryMetrics?.pages ?? 0}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-emerald-50 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Existing assets</p>
              <p className="mt-2 text-3xl font-black text-slate-900">{summaryMetrics?.existing ?? 0}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-orange-50 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Missing assets</p>
              <p className="mt-2 text-3xl font-black text-slate-900">{summaryMetrics?.missing ?? 0}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-blue-50 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Link placements</p>
              <p className="mt-2 text-3xl font-black text-slate-900">{summaryMetrics?.links ?? 0}</p>
            </div>
          </div>
        </Card>

        <Card className="border border-white/15 bg-white/95 p-6 shadow-2xl shadow-black/35 md:p-8">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as OutputTabValue)}>
            <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
              <TabsList className="grid h-fit w-full grid-cols-2 gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 lg:grid-cols-1">
                {OUTPUT_TAB_ORDER.map((tab) => {
                  const Icon = tab.icon;

                  return (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="flex items-center justify-start gap-2 rounded-xl border border-transparent bg-white px-3 py-3 text-left text-sm font-semibold text-slate-700 data-[state=active]:border-slate-300 data-[state=active]:bg-slate-900 data-[state=active]:text-white"
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <TabsContent value="aiInfoPage" className="mt-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">AI Info Page</p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => void copyToClipboard(result.assets.aiInfoPage, 'tab-aiInfoPage')}
                    >
                      {copiedKey === 'tab-aiInfoPage' ? 'Copied' : 'Copy'}
                    </Button>
                  </div>
                  <pre className="max-h-[620px] overflow-auto rounded-xl border border-slate-300 bg-slate-950 p-4 text-sm leading-relaxed text-slate-100">
                    {maskContent(result.assets.aiInfoPage)}
                  </pre>
                </TabsContent>

                <TabsContent value="robotsTxt" className="mt-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">robots.txt</p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => void copyToClipboard(result.assets.robotsTxt, 'tab-robotsTxt')}
                    >
                      {copiedKey === 'tab-robotsTxt' ? 'Copied' : 'Copy'}
                    </Button>
                  </div>
                  <pre className="max-h-[620px] overflow-auto rounded-xl border border-slate-300 bg-slate-50 p-4 text-sm leading-relaxed text-slate-800">
                    {maskContent(result.assets.robotsTxt)}
                  </pre>
                </TabsContent>

                <TabsContent value="schema" className="mt-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">Schema JSON-LD</p>
                    <Button size="sm" variant="outline" onClick={() => void copyToClipboard(schemaToText(result), 'tab-schema')}>
                      {copiedKey === 'tab-schema' ? 'Copied' : 'Copy'}
                    </Button>
                  </div>
                  <pre className="max-h-[620px] overflow-auto rounded-xl border border-slate-300 bg-slate-950 p-4 text-xs leading-relaxed text-slate-100">
                    {maskContent(schemaToText(result), 3_300)}
                  </pre>
                </TabsContent>

                <TabsContent value="internalLinking" className="mt-0 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">Internal Linking Plan</p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        void copyToClipboard(internalLinkingToText(result.assets.internalLinking), 'tab-internalLinking')
                      }
                    >
                      {copiedKey === 'tab-internalLinking' ? 'Copied' : 'Copy'}
                    </Button>
                  </div>
                  {result.assets.internalLinking.map((item, index) => (
                    <div key={`${item.fromPage}-${index}`} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                      <p className="font-semibold text-slate-900">
                        {index + 1}. {item.fromPage}
                      </p>
                      <p className="mt-1">
                        <span className="font-medium text-slate-500">Anchor:</span> {item.anchorText}
                      </p>
                      <p className="mt-1">
                        <span className="font-medium text-slate-500">Placement:</span> {item.placement}
                      </p>
                      <p className="mt-1">
                        <span className="font-medium text-slate-500">Reason:</span> {item.reason}
                      </p>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="implementationGuide" className="mt-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">Implementation Guide</p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        void copyToClipboard(implementationGuideToText(result.assets.implementationGuide), 'tab-implementationGuide')
                      }
                    >
                      {copiedKey === 'tab-implementationGuide' ? 'Copied' : 'Copy'}
                    </Button>
                  </div>
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700">Platform Playbooks</p>
                      <p className="mt-1 text-2xl font-black text-slate-900">{implementationStats?.platforms ?? 0}</p>
                      <p className="text-xs text-slate-600">WordPress, Webflow, Shopify, custom, and vibe-coded workflow</p>
                    </div>
                    <div className="rounded-xl border border-violet-200 bg-violet-50/70 p-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-700">Total Directives</p>
                      <p className="mt-1 text-2xl font-black text-slate-900">{implementationStats?.totalDirectives ?? 0}</p>
                      <p className="text-xs text-slate-600">Actionable steps generated for this delivery session</p>
                    </div>
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700">Average Guide Depth</p>
                      <p className="mt-1 text-2xl font-black text-slate-900">{implementationStats?.averageDepth ?? 0}</p>
                      <p className="text-xs text-slate-600">Average directives per platform guide</p>
                    </div>
                  </div>
                  {renderImplementationGuideCards(result.assets.implementationGuide, copiedKey, copyToClipboard)}
                </TabsContent>

                <TabsContent value="optionalExtras" className="mt-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">Optional Extras</p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => void copyToClipboard(optionalExtrasToText(result), 'tab-optionalExtras')}
                    >
                      {copiedKey === 'tab-optionalExtras' ? 'Copied' : 'Copy'}
                    </Button>
                  </div>
                  <div className="grid gap-4 lg:grid-cols-2">
                    <pre className="max-h-[400px] overflow-auto rounded-xl border border-slate-300 bg-slate-950 p-4 text-xs leading-relaxed text-slate-100">
                      {maskContent(result.assets.optionalExtras.llmsTxt, 2_200)}
                    </pre>
                    <pre className="max-h-[400px] overflow-auto rounded-xl border border-slate-300 bg-slate-950 p-4 text-xs leading-relaxed text-slate-100">
                      {maskContent(result.assets.optionalExtras.agentsMd, 2_200)}
                    </pre>
                  </div>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </Card>

        {loadError && (
          <Card className="border border-red-300 bg-red-50 p-4 text-sm text-red-700">{loadError}</Card>
        )}
      </div>
    </div>
  );
}
