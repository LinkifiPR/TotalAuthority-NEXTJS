"use client";

import { FormEvent, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  Bot,
  Building2,
  CheckCircle2,
  Clipboard,
  ClipboardCheck,
  Cpu,
  Database,
  Download,
  FileCode2,
  FileText,
  Gauge,
  Globe,
  Layers,
  LineChart,
  Loader2,
  Network,
  PanelTopOpen,
  Rocket,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  WandSparkles,
  Workflow,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FormPopup } from '@/components/FormPopup';
import { useFormPopup } from '@/hooks/useFormPopup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createPendingDeliverySession } from '@/lib/ai/delivery-session';
import type { AiSetupRequest, AiSetupResponse, ImplementationGuide, InternalLinkSuggestion } from '@/lib/types/ai-setup';

const LOADING_STEPS = [
  'Scanning your website',
  'Checking key signals',
  'Generating your AI setup',
  'Preparing implementation guide',
];

const OUTPUT_TAB_ORDER = [
  { value: 'aiInfoPage', label: 'AI Info Page', icon: FileText },
  { value: 'robotsTxt', label: 'robots.txt', icon: FileCode2 },
  { value: 'schema', label: 'Schema', icon: Network },
  { value: 'internalLinking', label: 'Internal Linking', icon: Globe },
  { value: 'llmsTxt', label: 'llms.txt', icon: FileText },
  { value: 'agentsMd', label: 'agents.md', icon: Sparkles },
  { value: 'implementationGuide', label: 'Implementation Guide', icon: Rocket },
] as const;

const TAB_CONTENT_ANIMATION_CLASS =
  'mt-0 data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:zoom-in-95 data-[state=active]:slide-in-from-bottom-2 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0 data-[state=inactive]:zoom-out-95 data-[state=inactive]:slide-out-to-top-1 duration-300';

const ENTERPRISE_CAPABILITIES = [
  {
    title: 'Signal Extraction Layer',
    description:
      'Scans core routes and extracts metadata, headings, structured data, internal links, canonical tags, robots, and sitemap signals.',
    icon: Database,
  },
  {
    title: 'Setup Intelligence Layer',
    description:
      'Classifies what already exists, what is missing, and what should be shipped next for stronger AI discovery clarity.',
    icon: Layers,
  },
  {
    title: 'Delivery Layer',
    description:
      'Outputs implementation-ready assets with platform-specific instructions so teams can deploy quickly without guesswork.',
    icon: Workflow,
  },
];

const ENTERPRISE_STANDARDS = [
  'Rule-based detection with model-backed generation and fallback reliability',
  'Retry-backed generation designed to return complete output packs',
  'Structured outputs designed for direct implementation and handoff',
  'Commercially credible copy that avoids overclaiming outcomes',
];

const AI_PLATFORM_LOGOS = [
  {
    name: 'OpenAI',
    url: 'https://cdn.brandfetch.io/openai.com/w/512/h/139/logo?c=1idP0DrE2OZDRG5HYTw',
  },
  {
    name: 'Claude',
    url: 'https://cdn.brandfetch.io/claude.ai/w/512/h/111/logo?c=1idP0DrE2OZDRG5HYTw',
  },
  {
    name: 'Perplexity',
    url: 'https://cdn.brandfetch.io/perplexity.ai/w/512/h/512?c=1idP0DrE2OZDRG5HYTw',
  },
  {
    name: 'Google Gemini',
    url: 'https://cdn.brandfetch.io/gemini.google.com/w/512/h/512/logo',
  },
];

const ONE_CLICK_OUTPUTS = [
  {
    title: 'AI Info Page Draft',
    description: 'Structured source-of-truth content for /ai or /ai-info that assistants can parse quickly.',
  },
  {
    title: 'Recommended robots.txt',
    description: 'Deployment-safe recommendations with sitemap handling and optional AI directives.',
  },
  {
    title: 'Schema JSON-LD Pack',
    description: 'Organization, WebSite, Service, and optional Person schema suggestions.',
  },
  {
    title: 'Internal Linking Blueprint',
    description: 'Exactly where to link the AI page, with anchor text and placement guidance.',
  },
  {
    title: 'Platform Implementation Guides',
    description: 'WordPress, Webflow, Shopify, custom HTML, and vibe-coded handoff instructions.',
  },
  {
    title: 'llms.txt + agents.md Files',
    description: 'Machine-readable page files for concise site references and factual agent guidance.',
  },
];

const IMPLEMENTATION_SCORE = 92;

const IMPLEMENTATION_SUMMARY_METRICS = [
  { label: 'Asset Pack', value: '6 Outputs' },
  { label: 'Delivery', value: 'Copy + Paste' },
  { label: 'Guides', value: '4 Platforms' },
];

const IMPLEMENTATION_BREAKDOWN = [
  { label: 'Content Assets', value: 94 },
  { label: 'Technical Files', value: 90 },
  { label: 'Implementation Guides', value: 92 },
];

const IMPROVEMENT_TREND = [
  { label: 'Baseline', score: 58 },
  { label: 'Week 1', score: 64 },
  { label: 'Week 2', score: 71 },
  { label: 'Week 3', score: 79 },
  { label: 'Week 4', score: 86 },
  { label: 'Post Setup', score: 92 },
];

const SIGNAL_COVERAGE = [
  {
    title: 'Metadata + Canonicals',
    coverage: 96,
    icon: FileText,
  },
  {
    title: 'Schema + JSON-LD',
    coverage: 84,
    icon: Network,
  },
  {
    title: 'Internal Linking Signals',
    coverage: 89,
    icon: Globe,
  },
  {
    title: 'Robots + Sitemap Signals',
    coverage: 91,
    icon: ShieldCheck,
  },
];

const OUTPUT_METRICS = [
  {
    label: 'Detection Confidence',
    value: 'High',
    trend: '+14%',
    icon: Gauge,
  },
  {
    label: 'Implementation Readiness',
    value: 'Deployable',
    trend: '6 Assets',
    icon: BarChart3,
  },
  {
    label: 'Execution Velocity',
    value: 'Fast',
    trend: '< 3 min',
    icon: LineChart,
  },
];

type OutputTabValue = (typeof OUTPUT_TAB_ORDER)[number]['value'];

function maskContent(content: string, maxLength = 1_250): string {
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

  if (tab === 'llmsTxt') {
    return result.assets.optionalExtras.llmsTxt;
  }

  if (tab === 'agentsMd') {
    return result.assets.optionalExtras.agentsMd;
  }

  return optionalExtrasToText(result);
}

function buildExportPack(result: AiSetupResponse): string {
  const sections = OUTPUT_TAB_ORDER.map((tab) => {
    const title = `## ${tab.label}`;
    const content = buildTabCopyText(result, tab.value);
    return `${title}\n\n${content}`;
  }).join('\n\n---\n\n');

  return `# AI Setup Pack\n\nGenerated for: ${result.site.normalizedUrl}\nGenerated at: ${new Date().toISOString()}\n\n${sections}`;
}

function getGenerationModeMeta(mode: AiSetupResponse['meta']['generationMode']) {
  if (mode === 'openrouter') {
    return {
      label: 'OpenRouter + Rules',
      description: 'Hybrid generation using model output plus deterministic checks',
    };
  }

  return {
    label: 'Rules-only (fallback mode)',
    description: 'Deterministic generation used because model output was unavailable',
  };
}

function textStats(text: string) {
  const normalized = text.trim();

  if (!normalized) {
    return { words: 0, lines: 0 };
  }

  return {
    words: normalized.split(/\s+/).filter(Boolean).length,
    lines: normalized.split(/\r?\n/).length,
  };
}

function renderGuideCards(
  guide: ImplementationGuide,
  copiedKey: string | null,
  onCopy: (text: string, key: string) => Promise<void>,
) {
  const cards = [
    {
      key: 'wordpress',
      title: 'WordPress',
      steps: guide.wordpress,
      badge: 'CMS',
      tone: 'from-blue-50 via-white to-blue-100/60',
    },
    {
      key: 'webflow',
      title: 'Webflow',
      steps: guide.webflow,
      badge: 'No-code',
      tone: 'from-emerald-50 via-white to-emerald-100/60',
    },
    {
      key: 'shopify',
      title: 'Shopify',
      steps: guide.shopify,
      badge: 'Ecommerce',
      tone: 'from-orange-50 via-white to-orange-100/60',
    },
    {
      key: 'customHtml',
      title: 'Custom HTML / Developer Handoff',
      steps: guide.customHtml,
      badge: 'Code',
      tone: 'from-slate-50 via-white to-slate-100/70',
    },
    {
      key: 'vibeCoded',
      title: 'Vibe-Coded Sites Prompt',
      steps: guide.vibeCoded ?? [],
      badge: 'Prompt',
      tone: 'from-violet-50 via-white to-fuchsia-100/55',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {cards.map((card) => (
        <div key={card.key} className={`rounded-2xl border border-slate-200 bg-gradient-to-br ${card.tone} p-5 shadow-sm`}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">{card.badge}</p>
              <p className="mt-1 text-sm font-bold text-slate-950">{card.title}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-slate-300 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                {card.steps.length} steps
              </span>
              <Button
                size="sm"
                variant="outline"
                className="h-8 border-slate-300 bg-white/90 px-3 text-xs text-slate-900 hover:bg-white"
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

          <div className="mt-4 space-y-2.5">
            {card.steps.map((step, index) => (
              <div key={`${card.key}-${index}`} className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white/90 p-2.5">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
                  {index + 1}
                </span>
                <p className="text-sm leading-relaxed text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AiSetupEnginePage() {
  const { isOpen, openForm, closeForm } = useFormPopup();
  const inputRef = useRef<HTMLDivElement | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const brandInputRef = useRef<HTMLInputElement | null>(null);
  const brandFlashIntervalRef = useRef<number | null>(null);

  const [formValues, setFormValues] = useState({
    url: '',
    brandName: '',
    shortDescription: '',
    country: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const [apiError, setApiError] = useState<string | null>(null);
  const [result, setResult] = useState<AiSetupResponse | null>(null);
  const [activeTab, setActiveTab] = useState<OutputTabValue>('aiInfoPage');

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [quickWebsiteUrl, setQuickWebsiteUrl] = useState('');
  const [quickInputError, setQuickInputError] = useState<string | null>(null);
  const [brandFieldFlashActive, setBrandFieldFlashActive] = useState(false);
  const [deliverySessionId, setDeliverySessionId] = useState<string | null>(null);

  const generatedAssetsList = useMemo(
    () => [
      'AI Info Page content draft optimized for machine extraction',
      'Recommended robots.txt version with sitemap handling',
      'Schema JSON-LD suggestions for Organization, WebSite, and Service',
      'Internal linking deployment recommendations',
      'llms.txt page file for AI reference discovery',
      'agents.md page file for factual agent guidance',
      'Implementation instructions by platform',
    ],
    [],
  );

  const resultOverview = useMemo(() => {
    if (!result) {
      return null;
    }

    const scannedPages = result.site.scannedPaths.length;
    const coreCoverage = scannedPages > 0 ? Math.round((result.detected.corePagesFound.length / scannedPages) * 100) : 0;

    return {
      scannedPages,
      coreCoverage,
      existingCount: result.summary.existingAssets.length,
      missingCount: result.summary.missingAssets.length,
      recommendationCount: result.summary.recommendations.length,
      generatedCount: generatedAssetsList.length,
      schemaCount: result.detected.schemaTypes.length,
      internalLinkCount: result.assets.internalLinking.length,
    };
  }, [result, generatedAssetsList]);

  const generationModeMeta = useMemo(() => {
    if (!result) {
      return null;
    }

    return getGenerationModeMeta(result.meta.generationMode);
  }, [result]);

  const tabSummaries = useMemo(() => {
    if (!result) {
      return new Map<OutputTabValue, { words: number; lines: number }>();
    }

    return new Map(
      OUTPUT_TAB_ORDER.map((tab) => [tab.value, textStats(buildTabCopyText(result, tab.value))]),
    );
  }, [result]);

  const improvementTrendChart = useMemo(() => {
    const width = 560;
    const height = 220;
    const paddingX = 28;
    const paddingTop = 16;
    const paddingBottom = 34;
    const scores = IMPROVEMENT_TREND.map((point) => point.score);
    const minScore = Math.min(...scores, 50);
    const maxScore = Math.max(...scores, 100);
    const scoreRange = Math.max(maxScore - minScore, 1);
    const chartWidth = width - paddingX * 2;
    const chartHeight = height - paddingTop - paddingBottom;
    const stepX = IMPROVEMENT_TREND.length > 1 ? chartWidth / (IMPROVEMENT_TREND.length - 1) : 0;

    const mapY = (score: number) => {
      const ratio = (score - minScore) / scoreRange;
      return paddingTop + (1 - ratio) * chartHeight;
    };

    const points = IMPROVEMENT_TREND.map((point, index) => ({
      ...point,
      x: paddingX + index * stepX,
      y: mapY(point.score),
    }));

    const baselineY = height - paddingBottom;
    const firstPoint = points[0] ?? { label: 'Baseline', score: 0, x: paddingX, y: baselineY };
    const lastPoint = points[points.length - 1] ?? firstPoint;
    const linePath = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
    const areaPath =
      points.length > 0
        ? `${linePath} L ${lastPoint.x} ${baselineY} L ${firstPoint.x} ${baselineY} Z`
        : '';

    const gridScores = [minScore, minScore + scoreRange * 0.33, minScore + scoreRange * 0.66, maxScore].map((score) =>
      Math.round(score),
    );

    const uniqueGridScores = Array.from(new Set(gridScores));

    return {
      width,
      height,
      points,
      linePath,
      areaPath,
      uplift: lastPoint.score - firstPoint.score,
      baseline: firstPoint.score,
      latest: lastPoint.score,
      gridLines: uniqueGridScores.map((score) => ({ score, y: mapY(score) })),
    };
  }, []);

  const scrollToInput = () => {
    inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openDeliveryDashboard = (sessionId: string) => {
    const dashboardUrl = `/ai-setup/delivery?session=${encodeURIComponent(sessionId)}`;
    window.location.assign(dashboardUrl);
  };

  const buildRequestPayload = (normalizedUrl: string): AiSetupRequest => {
    const normalizeOptionalValue = (value: string): string | undefined => {
      const trimmed = value.trim();
      return trimmed ? trimmed : undefined;
    };

    return {
      url: normalizedUrl,
      brandName: normalizeOptionalValue(formValues.brandName),
      shortDescription: normalizeOptionalValue(formValues.shortDescription),
      country: normalizeOptionalValue(formValues.country),
    };
  };

  const normalizeWebsiteUrl = (value: string): string | null => {
    const trimmed = value.trim();

    if (!trimmed) {
      return null;
    }

    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

    try {
      const parsed = new URL(withProtocol);

      if (!parsed.hostname || !parsed.hostname.includes('.')) {
        return null;
      }

      return parsed.toString().replace(/\/$/, '');
    } catch {
      return null;
    }
  };

  const triggerBrandFieldFlash = () => {
    if (brandFlashIntervalRef.current) {
      window.clearInterval(brandFlashIntervalRef.current);
      brandFlashIntervalRef.current = null;
    }

    brandInputRef.current?.focus({ preventScroll: true });

    let pulseCount = 0;
    brandFlashIntervalRef.current = window.setInterval(() => {
      pulseCount += 1;
      setBrandFieldFlashActive((current) => !current);

      if (pulseCount >= 6) {
        if (brandFlashIntervalRef.current) {
          window.clearInterval(brandFlashIntervalRef.current);
          brandFlashIntervalRef.current = null;
        }
        setBrandFieldFlashActive(false);
      }
    }, 220);
  };

  const handleQuickUrlSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedUrl = normalizeWebsiteUrl(quickWebsiteUrl);

    if (!normalizedUrl) {
      setQuickInputError('Please enter a valid website URL (for example: yoursite.com).');
      return;
    }

    setQuickInputError(null);
    setQuickWebsiteUrl(normalizedUrl);
    setFormValues((current) => ({
      ...current,
      url: normalizedUrl,
    }));

    scrollToInput();

    window.setTimeout(() => {
      triggerBrandFieldFlash();
    }, 550);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedUrl = normalizeWebsiteUrl(formValues.url);

    if (!normalizedUrl) {
      setApiError('Please enter a valid website URL (for example: yoursite.com).');
      return;
    }

    setFormValues((current) => ({
      ...current,
      url: normalizedUrl,
    }));
    setQuickWebsiteUrl(normalizedUrl);

    const requestPayload = buildRequestPayload(normalizedUrl);

    setApiError(null);
    setResult(null);
    setCopiedKey(null);
    setDeliverySessionId(null);
    setIsLoading(true);

    try {
      const sessionId = createPendingDeliverySession(requestPayload);
      if (!sessionId) {
        throw new Error('Unable to initialize delivery session. Please refresh and try again.');
      }
      setDeliverySessionId(sessionId);
      openDeliveryDashboard(sessionId);
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Unable to open delivery dashboard.');
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey((current) => (current === key ? null : current)), 1800);
    } catch {
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
        window.setTimeout(() => setCopiedKey((current) => (current === key ? null : current)), 1800);
      } catch {
        setApiError('Clipboard copy failed in this browser. You can still copy manually.');
      }
    }
  };

  const copyTab = async (tab: OutputTabValue) => {
    if (!result) {
      return;
    }

    await copyToClipboard(buildTabCopyText(result, tab), `tab-${tab}`);
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

    const exportText = buildExportPack(result);
    const blob = new Blob([exportText], { type: 'text/plain;charset=utf-8' });
    const objectUrl = URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    const safeDomain = result.site.domain.replace(/[^a-z0-9.-]/gi, '-');
    anchor.href = objectUrl;
    anchor.download = `${safeDomain}-ai-setup-pack.txt`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(objectUrl);
  };

  return (
    <>
      <div className="min-h-screen bg-[#080808] text-white">
        <Header onOpenForm={openForm} />

        <main className="relative isolate overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[760px] bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.22),transparent_34%),radial-gradient(circle_at_18%_16%,rgba(255,255,255,0.10),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_68%)]" />
          <div className="pointer-events-none absolute left-1/2 top-24 -z-10 h-px w-[min(980px,80vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/18 to-transparent" />

          <section className="px-4 pb-12 pt-16 md:pb-16 md:pt-24">
            <div className="mx-auto max-w-6xl">
              <div className="mx-auto max-w-4xl text-center">
                <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-400 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-400 shadow-[0_0_18px_rgba(249,115,22,0.9)]" />
                  AI discovery setup engine
                </p>

                <h1 className="mt-7 text-balance text-5xl font-black leading-[0.92] tracking-[-0.06em] text-white md:text-7xl lg:text-8xl">
                  Build the setup layer <span className="block text-zinc-500">AI systems can read.</span>
                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-pretty text-sm leading-6 text-zinc-400 md:text-base">
                  Enter a website URL and generate the AI Info Page, schema, crawler guidance, link plan, and implementation playbooks that help AI systems understand the brand with less guesswork.
                </p>
              </div>

              <form
                onSubmit={handleQuickUrlSubmit}
                className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-[26px] border border-orange-400/45 bg-[#111111]/95 p-2 shadow-[0_0_0_1px_rgba(249,115,22,0.12),0_32px_120px_rgba(0,0,0,0.65),0_0_70px_rgba(249,115,22,0.16)] backdrop-blur"
              >
                <div className="flex flex-col gap-2 rounded-[20px] border border-white/8 bg-black/35 p-2 sm:flex-row sm:items-center">
                  <div className="flex min-w-0 flex-1 items-center gap-3 px-3 py-2">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-orange-400/30 bg-orange-400/12 text-orange-300">
                      <Globe className="h-4 w-4" />
                    </span>
                    <Input
                      type="text"
                      value={quickWebsiteUrl}
                      onChange={(event) => {
                        setQuickWebsiteUrl(event.target.value);
                        if (quickInputError) {
                          setQuickInputError(null);
                        }
                      }}
                      placeholder="yourwebsite.com"
                      className="h-12 border-0 bg-transparent px-0 text-lg font-semibold text-white placeholder:text-zinc-600 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="h-12 rounded-2xl bg-orange-500 px-6 text-sm font-black text-white shadow-[0_16px_40px_rgba(249,115,22,0.28)] hover:bg-orange-400"
                  >
                    Generate My AI Setup
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                {quickInputError && (
                  <div className="mt-2 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-200">
                    {quickInputError}
                  </div>
                )}
              </form>

              <div className="mx-auto mt-6 grid max-w-3xl grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03] text-center shadow-[0_18px_70px_rgba(0,0,0,0.34)] backdrop-blur">
                {[
                  ['7', 'deliverables'],
                  ['1', 'source-of-truth page'],
                  ['4+', 'implementation paths'],
                ].map(([value, label]) => (
                  <div key={label} className="px-3 py-4">
                    <p className="text-2xl font-black tracking-tight text-white md:text-3xl">{value}</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-4 pb-16">
            <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
              <Card className="overflow-hidden rounded-[28px] border border-white/10 bg-[#101010]/85 text-white shadow-[0_22px_90px_rgba(0,0,0,0.5)] backdrop-blur">
                <div className="border-b border-white/10 px-5 py-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">
                      <TerminalSquare className="h-3.5 w-3.5 text-orange-300" />
                      Live output console
                    </p>
                    <span className="rounded-full border border-orange-400/25 bg-orange-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-orange-200">
                      One run
                    </span>
                  </div>
                </div>

                <div className="grid gap-0 md:grid-cols-[220px_minmax(0,1fr)]">
                  <div className="border-b border-white/10 bg-white/[0.02] p-4 md:border-b-0 md:border-r">
                    {['scan', 'detect', 'generate', 'ship'].map((item, index) => (
                      <div key={item} className="flex items-center gap-3 border-b border-white/8 py-3 last:border-b-0">
                        <span className={`h-2 w-2 rounded-full ${index === 2 ? 'bg-orange-400 shadow-[0_0_18px_rgba(249,115,22,0.75)]' : 'bg-white/20'}`} />
                        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-5">
                    <div className="rounded-2xl border border-white/10 bg-black/35 p-4 font-mono text-[12px] leading-6 text-zinc-300">
                      <p><span className="text-orange-300">setup.run</span> --target website</p>
                      <p className="text-zinc-500">extract: title, headings, schema, links, robots, sitemap</p>
                      <p className="text-zinc-500">generate: /ai page, schema pack, llms.txt, agents.md</p>
                      <p className="mt-3 text-white">status: <span className="text-orange-300">ready for implementation handoff</span></p>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {[
                        ['AI page', 'brand source of truth'],
                        ['Files', 'robots + llms + agents'],
                        ['Guides', 'CMS + code workflows'],
                      ].map(([label, detail]) => (
                        <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                          <p className="text-sm font-black text-white">{label}</p>
                          <p className="mt-1 text-xs leading-5 text-zinc-500">{detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="rounded-[28px] border border-white/10 bg-[#101010]/85 p-5 text-white shadow-[0_22px_90px_rgba(0,0,0,0.5)] backdrop-blur md:p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">Pack includes</p>
                  <Sparkles className="h-4 w-4 text-orange-300" />
                </div>
                <h2 className="mt-3 text-2xl font-black tracking-tight text-white">Everything needed to publish a clearer AI discovery layer.</h2>
                <div className="mt-5 space-y-2">
                  {ONE_CLICK_OUTPUTS.map((output) => (
                    <div key={output.title} className="group rounded-2xl border border-white/10 bg-white/[0.025] p-3 transition hover:border-orange-400/35 hover:bg-orange-400/[0.045]">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-orange-400/30 bg-orange-400/10 text-orange-300">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </span>
                        <div>
                          <p className="text-sm font-bold text-zinc-100">{output.title}</p>
                          <p className="mt-1 text-xs leading-5 text-zinc-500">{output.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </section>

          <section className="border-y border-white/8 bg-[#0d0d0d] px-4 py-20">
            <div className="mx-auto max-w-6xl">
              <div className="max-w-2xl">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-orange-300">The delivery suite</p>
                <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.04em] text-white md:text-6xl">
                  Seven files and playbooks. <span className="text-zinc-600">Built to ship together.</span>
                </h2>
                <p className="mt-4 text-sm leading-6 text-zinc-500">
                  The system combines rules-based site extraction with LLM generation so the final pack reads like a practical implementation handoff, not an audit report.
                </p>
              </div>

              <div className="mt-10 grid gap-px overflow-hidden rounded-[26px] border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
                {[
                  ['AI Info Page', 'Official brand fact sheet for /ai or /ai-info.', FileText],
                  ['robots.txt', 'Merged crawler guidance with sitemap handling.', FileCode2],
                  ['Schema Pack', 'Organization, WebSite, Service, and Person when supported.', Network],
                  ['Internal Links', 'Placement plan for footer, about, services, and resource pages.', Globe],
                  ['llms.txt', 'Concise markdown map of important source pages.', Bot],
                  ['agents.md', 'Factual guidance file for AI agents and coding tools.', Cpu],
                ].map(([title, description, Icon]) => {
                  const ProductIcon = Icon as typeof FileText;
                  return (
                    <div key={title as string} className="bg-[#101010] p-5 transition hover:bg-[#151515]">
                      <div className="mb-8 flex items-center justify-between">
                        <ProductIcon className="h-4 w-4 text-orange-300" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-700">Live</span>
                      </div>
                      <h3 className="text-lg font-black tracking-tight text-white">{title as string}</h3>
                      <p className="mt-2 text-sm leading-6 text-zinc-500">{description as string}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="px-4 py-20">
            <div className="mx-auto max-w-6xl">
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-orange-300">From prompt to production</p>
                <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-white md:text-6xl">Scan. Generate. Ship.</h2>
                <p className="mt-4 text-sm leading-6 text-zinc-500">
                  Designed for marketers, founders, and developers who need a deployable setup pack rather than another vague dashboard.
                </p>
              </div>

              <div className="mt-10 grid gap-5 lg:grid-cols-3">
                {[
                  ['01', 'Describe', 'Paste the domain and add optional brand context. The scanner pulls site signals and key pages before generation starts.', Database],
                  ['02', 'Orchestrate', 'OpenRouter generates grounded assets while deterministic checks keep the output structured and implementation-focused.', Workflow],
                  ['03', 'Ship', 'Download the delivery pack, copy individual files, or hand the platform guide to WordPress, Webflow, Shopify, custom, or vibe-coded builds.', Rocket],
                ].map(([number, title, description, Icon]) => {
                  const StepIcon = Icon as typeof Database;
                  return (
                    <Card key={title as string} className="rounded-[26px] border border-white/10 bg-[#101010] p-5 text-white shadow-[0_22px_80px_rgba(0,0,0,0.35)]">
                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <p className="font-mono text-xs text-zinc-600">{number as string}</p>
                        <StepIcon className="h-4 w-4 text-orange-300" />
                      </div>
                      <h3 className="mt-5 text-2xl font-black tracking-tight text-white">{title as string}.</h3>
                      <p className="mt-3 text-sm leading-6 text-zinc-500">{description as string}</p>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>

          <section ref={inputRef} className="px-4 pb-20">
            <div className="mx-auto max-w-6xl">
              <Card className="overflow-hidden rounded-[32px] border border-white/10 bg-[#101010] text-white shadow-[0_28px_110px_rgba(0,0,0,0.55)]">
                <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
                  <div className="p-5 md:p-8">
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-orange-300">Configuration console</p>
                    <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-white md:text-5xl">Build the delivery pack.</h2>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
                      Add the site URL and optional context. We’ll open the delivery dashboard and run the generation there so the user sees the process as it happens.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="website-url" className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
                          Website URL
                        </Label>
                        <Input
                          id="website-url"
                          type="url"
                          required
                          placeholder="https://yourwebsite.com"
                          value={formValues.url}
                          onChange={(event) =>
                            setFormValues((current) => ({
                              ...current,
                              url: event.target.value,
                            }))
                          }
                          className="h-[52px] rounded-2xl border-white/10 bg-black/35 px-4 text-white placeholder:text-zinc-700 focus-visible:ring-orange-400"
                        />
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="brand-name" className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
                            Brand name optional
                          </Label>
                          <Input
                            ref={brandInputRef}
                            id="brand-name"
                            placeholder="Total Authority"
                            value={formValues.brandName}
                            onChange={(event) =>
                              setFormValues((current) => ({
                                ...current,
                                brandName: event.target.value,
                              }))
                            }
                            className={`h-[52px] rounded-2xl border-white/10 bg-black/35 px-4 text-white placeholder:text-zinc-700 focus-visible:ring-orange-400 ${
                              brandFieldFlashActive ? 'border-orange-400 ring-2 ring-orange-400/45' : ''
                            }`}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="country" className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
                            Country optional
                          </Label>
                          <Input
                            id="country"
                            placeholder="United Kingdom"
                            value={formValues.country}
                            onChange={(event) =>
                              setFormValues((current) => ({
                                ...current,
                                country: event.target.value,
                              }))
                            }
                            className="h-[52px] rounded-2xl border-white/10 bg-black/35 px-4 text-white placeholder:text-zinc-700 focus-visible:ring-orange-400"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
                          Short description optional
                        </Label>
                        <Textarea
                          id="description"
                          placeholder="What you do and who you help in one or two lines"
                          value={formValues.shortDescription}
                          onChange={(event) =>
                            setFormValues((current) => ({
                              ...current,
                              shortDescription: event.target.value,
                            }))
                          }
                          className="min-h-[112px] rounded-2xl border-white/10 bg-black/35 px-4 py-3 text-white placeholder:text-zinc-700 focus-visible:ring-orange-400"
                        />
                      </div>

                      <div className="flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                        <p className="max-w-sm text-xs leading-5 text-zinc-500">
                          Generation runs inside the delivery dashboard and produces a complete pack, not partial filler.
                        </p>
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="h-12 rounded-2xl bg-orange-500 px-7 text-sm font-black text-white shadow-[0_18px_48px_rgba(249,115,22,0.25)] hover:bg-orange-400"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Opening dashboard
                            </>
                          ) : (
                            <>
                              Build My AI Setup
                              <WandSparkles className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </div>
                    </form>

                    {apiError && (
                      <div className="mt-5 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">
                        {apiError}
                      </div>
                    )}
                  </div>

                  <div className="border-t border-white/10 bg-black/25 p-5 lg:border-l lg:border-t-0 md:p-8">
                    <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">
                      <Building2 className="h-3.5 w-3.5 text-orange-300" />
                      Included in every run
                    </p>
                    <div className="mt-5 space-y-3">
                      {generatedAssetsList.map((item, index) => (
                        <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-3">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-400/10 font-mono text-[10px] font-bold text-orange-300">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <p className="text-sm leading-5 text-zinc-300">{item}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 rounded-2xl border border-orange-400/20 bg-orange-400/10 p-4 text-xs leading-5 text-orange-100">
                      Recommended primary asset path: <span className="font-black text-white">/ai</span> or <span className="font-black text-white">/ai-info</span>.
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {isLoading && (
            <section className="px-4 pb-16">
              <div className="mx-auto max-w-4xl rounded-[26px] border border-white/10 bg-[#101010] p-5 shadow-[0_22px_80px_rgba(0,0,0,0.5)] md:p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-orange-300">Opening delivery session</p>
                <div className="mt-5 space-y-2">
                  {LOADING_STEPS.map((step, index) => {
                    const isActive = index === loadingStepIndex;
                    const isComplete = index < loadingStepIndex;

                    return (
                      <div
                        key={step}
                        className={`rounded-2xl border px-4 py-3 transition ${
                          isComplete
                            ? 'border-orange-400/25 bg-orange-400/10 text-orange-100'
                            : isActive
                              ? 'border-white/18 bg-white/[0.055] text-white'
                              : 'border-white/10 bg-black/25 text-zinc-500'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-bold">{step}</p>
                          {isComplete ? (
                            <CheckCircle2 className="h-4 w-4 text-orange-300" />
                          ) : isActive ? (
                            <Loader2 className="h-4 w-4 animate-spin text-orange-300" />
                          ) : (
                            <div className="h-2 w-2 rounded-full bg-zinc-700" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}
        </main>

        <Footer onOpenForm={openForm} />
      </div>

      <FormPopup isOpen={isOpen} onClose={closeForm} />
    </>
  );
}
