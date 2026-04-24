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
  { value: 'llmsTxt', label: 'llms.txt', icon: FileText },
  { value: 'agentsMd', label: 'agents.md', icon: Sparkles },
  { value: 'implementationGuide', label: 'Implementation Guide', icon: Rocket },
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

type GuidePlatformKey = 'wordpress' | 'webflow' | 'shopify' | 'customHtml' | 'vibeCoded';
type InsightKey = 'pages' | 'existing' | 'missing' | 'links';

type InsightItem = {
  label: string;
  detail: string;
  reason?: string;
};

type InsightPanel = {
  title: string;
  eyebrow: string;
  description: string;
  items: InsightItem[];
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

  if (tab === 'llmsTxt') {
    return result.assets.optionalExtras.llmsTxt;
  }

  if (tab === 'agentsMd') {
    return result.assets.optionalExtras.agentsMd;
  }

  if (tab === 'implementationGuide') {
    return implementationGuideToText(result.assets.implementationGuide);
  }

  return '';
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

    if (/^how to preserve existing (?:settings|setup) \/ avoid overwriting:/i.test(step)) {
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

function getGuideCards(guide: ImplementationGuide) {
  return [
    {
      key: 'wordpress' as const,
      title: 'WordPress',
      badge: 'CMS',
      icon: FileText,
      accent: 'from-blue-500 to-cyan-500',
      steps: guide.wordpress,
    },
    {
      key: 'webflow' as const,
      title: 'Webflow',
      badge: 'No-code',
      icon: Globe,
      accent: 'from-violet-500 to-indigo-500',
      steps: guide.webflow,
    },
    {
      key: 'shopify' as const,
      title: 'Shopify',
      badge: 'Commerce',
      icon: Network,
      accent: 'from-emerald-500 to-teal-500',
      steps: guide.shopify,
    },
    {
      key: 'customHtml' as const,
      title: 'Custom HTML / Developer',
      badge: 'Code',
      icon: FileCode2,
      accent: 'from-slate-700 to-slate-950',
      steps: guide.customHtml,
    },
    {
      key: 'vibeCoded' as const,
      title: 'Vibe-Coded Sites Prompt',
      badge: 'Prompt',
      icon: WandSparkles,
      accent: 'from-orange-500 to-amber-500',
      steps: guide.vibeCoded ?? [],
    },
  ];
}

function renderImplementationGuideConsole(
  guide: ImplementationGuide,
  activeGuide: GuidePlatformKey,
  onSelectGuide: (key: GuidePlatformKey) => void,
  copiedKey: string | null,
  onCopy: (text: string, key: string) => Promise<void>,
) {
  const cards = [
    ...getGuideCards(guide),
  ];
  const activeCard = cards.find((card) => card.key === activeGuide) ?? cards[0];

  if (!activeCard) {
    return null;
  }

  const buckets = parseGuideBuckets(activeCard.steps);
  const promptBody = extractPromptBody(activeCard.steps);
  const executionSteps = safeItems(buckets.steps, activeCard.steps);
  const preserveItems = safeItems(buckets.preserve, ['Review existing setup before applying generated changes.']);
  const verifyItems = safeItems(buckets.verify, ['Confirm live URL status, indexability, schema visibility, and robots accessibility.']);
  const mistakesItems = safeItems(buckets.mistakes, ['Do not overwrite live files blindly; merge and validate before publish.']);
  const ActiveIcon = activeCard.icon;

  const renderChecklist = (title: string, items: string[], tone: string) => (
    <div className={`min-w-0 rounded-2xl border p-4 ${tone}`}>
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">{title}</p>
      <div className="mt-3 space-y-2">
        {items.map((item, index) => (
          <div key={`${title}-${index}`} className="flex min-w-0 items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
            <p className="min-w-0 text-[13px] leading-5 text-slate-700">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
      <div className="border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.13),transparent_32%),linear-gradient(135deg,#ffffff,#f8fafc)] px-5 py-5 md:px-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-orange-600">Implementation Console</p>
            <h3 className="mt-1 text-xl font-black tracking-tight text-slate-950 md:text-2xl">
              Platform playbooks, cleaned into one focused workflow
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
              Choose the build environment, copy the exact handoff, then work through execution, preservation, validation, and mistakes without giant stacked cards.
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="w-fit border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
            onClick={() => void onCopy(implementationGuideToText(guide), 'tab-implementationGuide')}
          >
            {copiedKey === 'tab-implementationGuide' ? 'Copied Full Guide' : 'Copy Full Guide'}
          </Button>
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="border-b border-slate-200 bg-slate-50/80 p-3 lg:border-b-0 lg:border-r">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {cards.map((card) => {
              const Icon = card.icon;
              const isActive = card.key === activeCard.key;

              return (
                <button
                  key={card.key}
                  type="button"
                  onClick={() => onSelectGuide(card.key)}
                  className={`group flex min-w-0 items-center gap-3 rounded-2xl border p-3 text-left transition-all ${
                    isActive
                      ? 'border-slate-900 bg-slate-950 text-white shadow-lg shadow-slate-900/10'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${card.accent} text-white`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block truncate text-sm font-extrabold ${isActive ? 'text-white' : 'text-slate-950'}`}>
                      {card.title}
                    </span>
                    <span className={`mt-0.5 block text-[11px] font-semibold uppercase tracking-[0.13em] ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                      {card.badge} · {card.steps.length} steps
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        <section className="min-w-0 p-4 md:p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <div className="flex min-w-0 items-center gap-3">
                <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${activeCard.accent} text-white shadow-sm`}>
                  <ActiveIcon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">{activeCard.badge} Playbook</p>
                  <h4 className="truncate text-xl font-black tracking-tight text-slate-950">{activeCard.title}</h4>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-600">
                  {executionSteps.length} execution steps
                </span>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-700">
                  QA included
                </span>
                <span className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-orange-700">
                  Copy-ready
                </span>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="w-fit border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
              onClick={() =>
                void onCopy(
                  activeCard.steps.map((step, index) => `${index + 1}. ${step}`).join('\n'),
                  `guide-${activeCard.key}`,
                )
              }
            >
              {copiedKey === `guide-${activeCard.key}` ? 'Copied' : 'Copy Playbook'}
            </Button>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <div className="min-w-0 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-700">What You Are Adding</p>
              <p className="mt-2 text-[13px] leading-5 text-slate-700">
                {safeItems(buckets.what, ['Core setup assets including /ai page, robots, schema, and linking updates.'])[0]}
              </p>
            </div>
            <div className="min-w-0 rounded-2xl border border-violet-100 bg-violet-50/70 p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-violet-700">Where To Add It</p>
              <p className="mt-2 text-[13px] leading-5 text-slate-700">
                {safeItems(buckets.where, ['Use platform page settings, SEO config, and template code areas.'])[0]}
              </p>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Execution Timeline</p>
                <p className="text-sm font-semibold text-slate-900">Follow in order, then validate before release.</p>
              </div>
              <span className="rounded-full bg-slate-950 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white">
                {executionSteps.length} steps
              </span>
            </div>
            <div className="divide-y divide-slate-200">
              {executionSteps.map((step, index) => (
                <div key={`${activeCard.key}-step-${index}`} className="grid gap-3 bg-white/70 px-4 py-3 md:grid-cols-[42px_minmax(0,1fr)]">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-black text-slate-900 shadow-sm">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="min-w-0 text-[13px] leading-6 text-slate-700">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-3 xl:grid-cols-3">
            {renderChecklist('Preserve', preserveItems, 'border-emerald-100 bg-emerald-50/70')}
            {renderChecklist('Verify', verifyItems, 'border-sky-100 bg-sky-50/70')}
            {renderChecklist('Avoid', mistakesItems, 'border-amber-100 bg-amber-50/70')}
          </div>

          {buckets.notes.length > 0 && (
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Additional Notes</p>
              <div className="mt-3 grid gap-2 md:grid-cols-2">
                {buckets.notes.map((item, index) => (
                  <div key={`${activeCard.key}-note-${index}`} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[13px] leading-5 text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}

          {promptBody && (
            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-inner">
              <div className="flex flex-col gap-2 border-b border-slate-800 bg-slate-900 px-4 py-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-orange-300">Vibe Coding Prompt</p>
                  <p className="text-xs text-slate-400">Paste into your coding tool with this project open.</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 w-fit border-slate-600 bg-slate-800 px-3 text-xs text-slate-100 hover:bg-slate-700"
                  onClick={() => void onCopy(promptBody, `prompt-${activeCard.key}`)}
                >
                  {copiedKey === `prompt-${activeCard.key}` ? 'Copied' : 'Copy Prompt'}
                </Button>
              </div>
              <pre className="max-h-[300px] overflow-auto whitespace-pre-wrap break-words px-4 py-4 text-xs leading-6 text-slate-100">
                {promptBody}
              </pre>
            </div>
          )}
        </section>
      </div>
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
  const [activeGuide, setActiveGuide] = useState<GuidePlatformKey>('wordpress');
  const [activeInsight, setActiveInsight] = useState<InsightKey>('pages');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const renderShell = (body: ReactNode, options?: { includeBottomCta?: boolean }) => (
    <>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.10),transparent_28%),radial-gradient(circle_at_85%_18%,rgba(59,130,246,0.08),transparent_26%),linear-gradient(180deg,#f8fafc_0%,#eef2f7_48%,#ffffff_100%)] text-slate-900">
        <Header onOpenForm={openForm} />
        <main className="pb-12 pt-5 md:pt-7">{body}</main>

        {options?.includeBottomCta && (
          <section className="px-4 pb-10 md:px-8">
            <div className="mx-auto max-w-[1180px] overflow-hidden rounded-[28px] border border-slate-800 bg-slate-950 text-white shadow-[0_24px_80px_rgba(15,23,42,0.22)]">
              <div className="bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.35),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent)] p-6 md:p-8">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-orange-300">Need Implementation Support?</p>
                  <h3 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">Ship this AI setup without guesswork</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                    Get hands-on help publishing the AI page, robots updates, schema, and internal linking plan correctly on your stack.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link href="/strategy-blueprint">
                    <Button className="bg-orange-500 text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600">Book Strategy Call</Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="border-white/15 bg-white/10 text-white hover:bg-white/15"
                    onClick={openForm}
                  >
                    Get Implementation Help
                  </Button>
                </div>
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

  const insightDetails = useMemo<Record<InsightKey, InsightPanel> | null>(() => {
    if (!result) {
      return null;
    }

    const origin = (() => {
      try {
        return new URL(result.site.normalizedUrl).origin;
      } catch {
        return result.site.normalizedUrl.replace(/\/$/, '');
      }
    })();

    const toAbsoluteUrl = (path: string) => {
      if (/^https?:\/\//i.test(path)) {
        return path;
      }

      if (path === '/') {
        return `${origin}/`;
      }

      return `${origin}${path.startsWith('/') ? path : `/${path}`}`;
    };

    const existingAssets = result.summary.existingAssets.length > 0
      ? result.summary.existingAssets
      : result.detected.existingAssets;

    return {
      pages: {
        eyebrow: 'Discovery Map',
        title: 'Pages scanned',
        description: 'The pages and files checked before the delivery pack was generated.',
        items: result.site.scannedPaths.map((path) => ({
          label: path,
          detail: toAbsoluteUrl(path),
        })),
      },
      existing: {
        eyebrow: 'Already Found',
        title: 'Existing assets detected',
        description: 'Useful discovery foundations already present on the site or visible from live signals.',
        items: existingAssets.map((asset) => ({
          label: asset,
          detail: 'Detected during setup discovery',
        })),
      },
      missing: {
        eyebrow: 'Generated For You',
        title: 'Missing assets covered',
        description: 'Assets this pack generated or gave precise implementation guidance for.',
        items: result.summary.missingAssets.map((asset) => ({
          label: asset,
          detail: 'Included in this delivery pack',
        })),
      },
      links: {
        eyebrow: 'Placement Plan',
        title: 'Recommended link placements',
        description: 'Where the AI Information page should be linked so people and crawlers can discover it.',
        items: result.assets.internalLinking.map((link) => ({
          label: link.fromPage,
          detail: `${link.anchorText} · ${link.placement}`,
          reason: link.reason,
        })),
      },
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
      <div className="px-4 py-14 text-slate-900 md:px-8">
        <div className="mx-auto w-full max-w-[880px] overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.10)]">
          <div className="border-b border-slate-200 bg-slate-950 px-6 py-5 text-white">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-orange-300">Opening Delivery Pack</p>
            <h1 className="mt-2 text-2xl font-black tracking-tight">Preparing your dashboard</h1>
            <p className="mt-2 text-sm leading-6 text-slate-300">Loading session data and restoring your generated assets.</p>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
              <Loader2 className="h-4 w-4 animate-spin text-orange-500" />
              Initializing delivery session
            </div>
          </div>
        </div>
      </div>,
    );
  }

  if (isGenerating && !result) {
    return renderShell(
      <div className="px-4 py-8 text-slate-900 md:px-8 md:py-10">
        <div className="mx-auto w-full max-w-[1180px] space-y-5">
          <Card className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.10)]">
            <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_360px]">
              <div className="min-w-0 p-6 md:p-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-orange-600">Delivery Pack</p>
                <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">Running AI setup generation</h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                  We are scanning the site, extracting brand signals, calling OpenRouter, and assembling the final implementation pack.
                </p>
                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Target</p>
                  <p className="mt-1 break-all text-sm font-bold text-slate-950">{requestPayload?.url ?? 'Website URL'}</p>
                </div>
              </div>
              <div className="border-t border-slate-200 bg-slate-950 p-6 text-white lg:border-l lg:border-t-0">
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-bold text-orange-200">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  {loadingStepLabel}
                </div>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-orange-400 to-amber-300 transition-all duration-500"
                    style={{ width: `${Math.max(18, ((loadingStepIndex + 1) / LOADING_STEPS.length) * 100)}%` }}
                  />
                </div>
                <p className="mt-3 text-xs leading-5 text-slate-300">
                  Background generation can take a little while because the AI pass is producing full copy-ready assets, not a thin report.
                </p>
              </div>
            </div>
          </Card>

          <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
            <Card className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm md:p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Generation Pipeline</p>
              <div className="mt-4 space-y-2.5">
                {LOADING_STEPS.map((step, index) => {
                  const isComplete = index < loadingStepIndex;
                  const isActive = index === loadingStepIndex;

                  return (
                    <div
                      key={step}
                      className={`rounded-2xl border px-4 py-3 transition-all ${
                        isComplete
                          ? 'border-emerald-200 bg-emerald-50'
                          : isActive
                            ? 'border-orange-300 bg-orange-50'
                            : 'border-slate-200 bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-bold text-slate-800">{step}</p>
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

            <Card className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm md:p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Pack Includes</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                {[
                  'AI Info Page',
                  'Recommended robots.txt',
                  'Schema JSON-LD',
                  'Internal linking plan',
                  'llms.txt file',
                  'agents.md file',
                  'Implementation guides',
                  'Downloadable delivery pack',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[13px] font-semibold text-slate-700">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    <span>{item}</span>
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

  const summaryCards = [
    {
      key: 'pages' as const,
      label: 'Pages scanned',
      value: summaryMetrics?.pages ?? 0,
      detail: 'View scan map',
      className: 'border-slate-200 bg-slate-50/90 text-slate-700',
      activeClassName: 'ring-slate-950/15 border-slate-900 bg-white',
    },
    {
      key: 'existing' as const,
      label: 'Existing assets',
      value: summaryMetrics?.existing ?? 0,
      detail: 'Inspect found signals',
      className: 'border-emerald-200 bg-emerald-50/90 text-emerald-800',
      activeClassName: 'ring-emerald-500/20 border-emerald-500 bg-white',
    },
    {
      key: 'missing' as const,
      label: 'Missing assets',
      value: summaryMetrics?.missing ?? 0,
      detail: 'See generated gaps',
      className: 'border-orange-200 bg-orange-50/90 text-orange-800',
      activeClassName: 'ring-orange-500/20 border-orange-500 bg-white',
    },
    {
      key: 'links' as const,
      label: 'Link placements',
      value: summaryMetrics?.links ?? 0,
      detail: 'Open placement plan',
      className: 'border-blue-200 bg-blue-50/90 text-blue-800',
      activeClassName: 'ring-blue-500/20 border-blue-500 bg-white',
    },
  ];

  const activeInsightDetail = insightDetails?.[activeInsight];
  const leftExistingAssets = insightDetails?.existing.items ?? [];

  return renderShell(
    <div className="mx-auto w-full max-w-[1180px] space-y-5 px-4 pt-1 md:px-8">
        <Card className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.10)]">
          <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="min-w-0 p-5 md:p-7">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-orange-600">Delivery Pack</p>
                  <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">AI Setup Dashboard</h1>
                  <p className="mt-2 max-w-2xl break-all text-sm leading-6 text-slate-600">
                    Domain: <span className="font-bold text-slate-950">{result.site.normalizedUrl}</span>
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px]">
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-bold uppercase tracking-[0.1em] text-emerald-700">
                      {result.meta.generationMode === 'openrouter' ? 'OpenRouter + Rules' : 'Rules-only fallback'}
                    </span>
                    {result.meta.model && (
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-bold text-slate-600">
                        {result.meta.model}
                      </span>
                    )}
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-bold text-slate-600">
                      {new Date(result.site.scannedAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 bg-slate-950 p-5 text-white lg:border-l lg:border-t-0 md:p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-orange-300">Actions</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Copy the full pack or download a markdown handoff for your developer, CMS owner, or vibe-coding workflow.
              </p>
              <div className="mt-4 grid gap-2">
                <Link href="/ai-setup">
                  <Button variant="outline" className="w-full justify-start border-white/15 bg-white/10 text-white hover:bg-white/15">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </Link>
              <Button onClick={copyAll} className="w-full justify-start bg-orange-500 text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600">
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
              <Button onClick={downloadPack} className="w-full justify-start bg-white text-slate-950 hover:bg-slate-100">
                <Download className="mr-2 h-4 w-4" />
                Download Pack
              </Button>
            </div>
            </div>
          </div>

          {result.meta.generationMode !== 'openrouter' && (
            <div className="mx-5 mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 md:mx-7">
              OpenRouter was not used for this run. Start a new run and verify deployment environment variables.
            </div>
          )}

          <div className="grid gap-0 border-t border-slate-200 sm:grid-cols-2 xl:grid-cols-4">
            {summaryCards.map((card) => {
              const isActive = activeInsight === card.key;

              return (
                <button
                  key={card.key}
                  type="button"
                  onClick={() => setActiveInsight(card.key)}
                  className={`group border-b p-4 text-left transition-all hover:bg-white xl:border-b-0 xl:border-r last:xl:border-r-0 ${card.className} ${
                    isActive ? `${card.activeClassName} ring-2` : ''
                  }`}
                >
                  <span className="block text-[10px] font-black uppercase tracking-[0.16em]">{card.label}</span>
                  <span className="mt-1 block text-3xl font-black text-slate-950">{card.value}</span>
                  <span className="mt-1 inline-flex items-center rounded-full bg-white/75 px-2.5 py-1 text-[11px] font-bold text-slate-600 shadow-sm">
                    {card.detail}
                  </span>
                </button>
              );
            })}
          </div>

          {activeInsightDetail && (
            <div className="border-t border-slate-200 bg-white px-4 py-4 md:px-6">
              <div className="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{activeInsightDetail.eyebrow}</p>
                  <h2 className="mt-1 text-lg font-black tracking-tight text-slate-950">{activeInsightDetail.title}</h2>
                </div>
                <p className="max-w-xl text-[13px] leading-5 text-slate-600">{activeInsightDetail.description}</p>
              </div>

              <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                {activeInsightDetail.items.length > 0 ? (
                  activeInsightDetail.items.slice(0, 12).map((item, index) => (
                    <div key={`${activeInsight}-${item.label}-${index}`} className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 shadow-sm">
                      <p className="truncate text-sm font-black text-slate-950">{item.label}</p>
                      <p className="mt-1 break-words text-[12px] leading-5 text-slate-600">{item.detail}</p>
                      {item.reason && <p className="mt-2 text-[12px] leading-5 text-slate-500">{item.reason}</p>}
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-600">
                    No items were found in this category for this run.
                  </div>
                )}
              </div>

              {activeInsightDetail.items.length > 12 && (
                <p className="mt-3 text-xs font-semibold text-slate-500">
                  Showing the first 12 items. Download the delivery pack for the full handoff.
                </p>
              )}
            </div>
          )}
        </Card>

        <Card className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as OutputTabValue)}>
            <div className="grid gap-0 lg:grid-cols-[250px_minmax(0,1fr)]">
              <aside className="border-b border-slate-200 bg-slate-50 lg:sticky lg:top-6 lg:h-fit lg:border-b-0 lg:border-r">
                <TabsList className="grid h-fit w-full grid-cols-2 gap-2 rounded-none border-0 bg-transparent p-3 lg:grid-cols-1">
                  {OUTPUT_TAB_ORDER.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="flex min-w-0 items-center justify-start gap-2 rounded-xl border border-transparent bg-white px-3 py-2.5 text-left text-sm font-bold text-slate-700 shadow-sm data-[state=active]:border-slate-900 data-[state=active]:bg-slate-950 data-[state=active]:text-white"
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">{tab.label}</span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                <div className="mx-3 mb-3 rounded-2xl border border-emerald-200 bg-white p-3 shadow-sm">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-700">Existing assets</p>
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-black text-emerald-700">
                      {leftExistingAssets.length}
                    </span>
                  </div>
                  <div className="mt-3 space-y-2">
                    {leftExistingAssets.length > 0 ? (
                      leftExistingAssets.slice(0, 4).map((item, index) => (
                        <button
                          key={`${item.label}-${index}`}
                          type="button"
                          onClick={() => setActiveInsight('existing')}
                          className="flex w-full min-w-0 items-start gap-2 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-left transition-colors hover:border-emerald-300 hover:bg-emerald-50"
                        >
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                          <span className="min-w-0 truncate text-[12px] font-bold text-slate-700">{item.label}</span>
                        </button>
                      ))
                    ) : (
                      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-3 text-[12px] leading-5 text-slate-600">
                        No existing setup assets were detected. The generated files below cover the missing foundations.
                      </div>
                    )}
                  </div>
                </div>
              </aside>

              <div className="min-w-0 bg-slate-50 p-4 md:p-5">
                <TabsContent value="aiInfoPage" className="mt-0 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Primary Asset</p>
                      <h2 className="text-2xl font-black tracking-tight text-slate-950">AI Info Page</h2>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => void copyToClipboard(result.assets.aiInfoPage, 'tab-aiInfoPage')}>
                      {copiedKey === 'tab-aiInfoPage' ? 'Copied' : 'Copy'}
                    </Button>
                  </div>
                  <pre className="max-h-[68vh] overflow-auto whitespace-pre-wrap break-words rounded-2xl border border-slate-800 bg-slate-950 p-4 text-xs leading-6 text-slate-100 shadow-inner md:p-5">
                    {maskContent(result.assets.aiInfoPage, 5_400)}
                  </pre>
                </TabsContent>

                <TabsContent value="robotsTxt" className="mt-0 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Crawler Guidance</p>
                      <h2 className="text-2xl font-black tracking-tight text-slate-950">robots.txt</h2>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => void copyToClipboard(result.assets.robotsTxt, 'tab-robotsTxt')}>
                      {copiedKey === 'tab-robotsTxt' ? 'Copied' : 'Copy'}
                    </Button>
                  </div>
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] leading-5 text-amber-800">
                    robots.txt is crawler guidance, not security access control.
                  </div>
                  <pre className="max-h-[68vh] overflow-auto whitespace-pre-wrap break-words rounded-2xl border border-slate-200 bg-white p-4 text-xs leading-6 text-slate-800 shadow-inner md:p-5">
                    {maskContent(result.assets.robotsTxt, 5_400)}
                  </pre>
                </TabsContent>

                <TabsContent value="schema" className="mt-0 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Structured Data</p>
                      <h2 className="text-2xl font-black tracking-tight text-slate-950">Schema</h2>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => void copyToClipboard(schemaToText(result), 'tab-schema')}>
                      {copiedKey === 'tab-schema' ? 'Copied' : 'Copy'}
                    </Button>
                  </div>
                  <pre className="max-h-[68vh] overflow-auto whitespace-pre-wrap break-words rounded-2xl border border-slate-800 bg-slate-950 p-4 text-xs leading-6 text-slate-100 shadow-inner md:p-5">
                    {maskContent(schemaToText(result), 6_000)}
                  </pre>
                </TabsContent>

                <TabsContent value="internalLinking" className="mt-0 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Crawl Paths</p>
                      <h2 className="text-2xl font-black tracking-tight text-slate-950">Internal Linking Plan</h2>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => void copyToClipboard(internalLinkingToText(result.assets.internalLinking), 'tab-internalLinking')}
                    >
                      {copiedKey === 'tab-internalLinking' ? 'Copied' : 'Copy'}
                    </Button>
                  </div>
                  <div className="grid gap-3 xl:grid-cols-2">
                    {result.assets.internalLinking.map((item, index) => (
                      <div key={`${item.fromPage}-${index}`} className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="flex items-start gap-3">
                          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-white">
                            {index + 1}
                          </span>
                          <div className="min-w-0">
                            <p className="break-words text-sm font-black text-slate-950">{item.fromPage}</p>
                            <p className="mt-1 text-[13px] leading-5 text-slate-600">{item.reason}</p>
                          </div>
                        </div>
                        <p className="mt-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[13px] text-slate-700">
                          <span className="font-bold text-slate-950">Anchor:</span> {item.anchorText}
                        </p>
                        <p className="mt-2 rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-[13px] text-slate-700">
                          <span className="font-bold text-slate-950">Placement:</span> {item.placement}
                        </p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="llmsTxt" className="mt-0 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">AI Reference File</p>
                      <h2 className="text-2xl font-black tracking-tight text-slate-950">llms.txt</h2>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => void copyToClipboard(result.assets.optionalExtras.llmsTxt, 'tab-llmsTxt')}>
                      {copiedKey === 'tab-llmsTxt' ? 'Copied' : 'Copy'}
                    </Button>
                  </div>
                  <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-[13px] leading-5 text-blue-900">
                    Publish this as a plain text markdown-style file at <span className="font-black">/llms.txt</span> to give AI systems a concise map of the most important site references.
                  </div>
                  <pre className="max-h-[68vh] overflow-auto whitespace-pre-wrap break-words rounded-2xl border border-slate-800 bg-slate-950 p-4 text-xs leading-6 text-slate-100 shadow-inner md:p-5">
                    {maskContent(result.assets.optionalExtras.llmsTxt, 5_400)}
                  </pre>
                </TabsContent>

                <TabsContent value="agentsMd" className="mt-0 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Agent Guidance File</p>
                      <h2 className="text-2xl font-black tracking-tight text-slate-950">agents.md</h2>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => void copyToClipboard(result.assets.optionalExtras.agentsMd, 'tab-agentsMd')}>
                      {copiedKey === 'tab-agentsMd' ? 'Copied' : 'Copy'}
                    </Button>
                  </div>
                  <div className="rounded-2xl border border-violet-100 bg-violet-50 px-4 py-3 text-[13px] leading-5 text-violet-900">
                    Publish this as <span className="font-black">/agents.md</span> when you want a factual guide for AI agents and coding tools without telling them what opinion to hold.
                  </div>
                  <pre className="max-h-[68vh] overflow-auto whitespace-pre-wrap break-words rounded-2xl border border-slate-800 bg-slate-950 p-4 text-xs leading-6 text-slate-100 shadow-inner md:p-5">
                    {maskContent(result.assets.optionalExtras.agentsMd, 5_400)}
                  </pre>
                </TabsContent>

                <TabsContent value="implementationGuide" className="mt-0 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Publishing Workflow</p>
                      <h2 className="text-2xl font-black tracking-tight text-slate-950">Implementation Guide</h2>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => void copyToClipboard(implementationGuideToText(result.assets.implementationGuide), 'tab-implementationGuide')}
                    >
                      {copiedKey === 'tab-implementationGuide' ? 'Copied' : 'Copy'}
                    </Button>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="rounded-2xl border border-blue-100 bg-blue-50/80 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-700">Platform Playbooks</p>
                      <p className="mt-1 text-2xl font-black text-slate-950">{implementationStats?.platforms ?? 0}</p>
                      <p className="mt-1 text-[13px] leading-5 text-slate-600">CMS, no-code, commerce, custom, and vibe-coded flow.</p>
                    </div>
                    <div className="rounded-2xl border border-violet-100 bg-violet-50/80 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-violet-700">Total Directives</p>
                      <p className="mt-1 text-2xl font-black text-slate-950">{implementationStats?.totalDirectives ?? 0}</p>
                      <p className="mt-1 text-[13px] leading-5 text-slate-600">Actionable implementation instructions.</p>
                    </div>
                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700">Average Guide Depth</p>
                      <p className="mt-1 text-2xl font-black text-slate-950">{implementationStats?.averageDepth ?? 0}</p>
                      <p className="mt-1 text-[13px] leading-5 text-slate-600">Average directives per platform.</p>
                    </div>
                  </div>

                  {renderImplementationGuideConsole(
                    result.assets.implementationGuide,
                    activeGuide,
                    setActiveGuide,
                    copiedKey,
                    copyToClipboard,
                  )}
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </Card>

        {loadError && (
          <Card className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-800">
            <div className="flex items-start gap-2 text-[13px] leading-5">
              <AlertTriangle className="mt-0.5 h-4 w-4" />
              <p>{loadError}</p>
            </div>
          </Card>
        )}

        {result.meta.warnings.length > 0 && (
          <Card className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-amber-700">Runtime Warnings</p>
            <ul className="mt-2 space-y-1 text-[13px] leading-5 text-amber-900">
              {result.meta.warnings.slice(0, 5).map((warning) => (
                <li key={warning}>- {warning}</li>
              ))}
            </ul>
          </Card>
        )}

        <Card className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">
                <ShieldCheck className="h-4 w-4" />
                Validation Reminder
              </p>
              <p className="mt-2 text-[13px] leading-5 text-slate-700">
                Confirm live URL status, indexability, internal links, schema visibility, and robots resolution after publishing.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">
                <WandSparkles className="h-4 w-4" />
                Next Step
              </p>
              <p className="mt-2 text-[13px] leading-5 text-slate-700">
                Use this delivery pack as your implementation handoff, then update your /ai page when services or positioning changes.
              </p>
            </div>
          </div>
        </Card>
    </div>,
    { includeBottomCta: true },
  );
}
