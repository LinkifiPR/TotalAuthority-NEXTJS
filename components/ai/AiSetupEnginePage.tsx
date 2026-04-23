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
import type { AiSetupResponse, ImplementationGuide, InternalLinkSuggestion } from '@/lib/types/ai-setup';

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
  { value: 'implementationGuide', label: 'Implementation Guide', icon: Rocket },
  { value: 'optionalExtras', label: 'Optional Extras', icon: Sparkles },
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
  'Partial-result resilience when some pages are blocked or unavailable',
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
    description: 'Structured page content for /ai or /ai-info that AI systems can parse fast.',
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
    description: 'WordPress, Webflow, Shopify, and custom HTML handoff instructions.',
  },
  {
    title: 'Optional Future-Facing Extras',
    description: 'llms.txt and agents.md templates in copy-paste format.',
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

function renderGuideCards(guide: ImplementationGuide) {
  const cards = [
    { title: 'WordPress', steps: guide.wordpress },
    { title: 'Webflow', steps: guide.webflow },
    { title: 'Shopify', steps: guide.shopify },
    { title: 'Custom HTML / Dev Handoff', steps: guide.customHtml },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {cards.map((card) => (
        <div key={card.title} className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">{card.title}</p>
            <span className="rounded-full border border-slate-300 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700">
              {card.steps.length} steps
            </span>
          </div>
          <div className="mt-4 space-y-2.5">
            {card.steps.map((step, index) => (
              <div key={`${card.title}-${index}`} className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white p-2.5">
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

  const generatedAssetsList = useMemo(
    () => [
      'AI Info Page content draft optimized for machine extraction',
      'Recommended robots.txt version with sitemap handling',
      'Schema JSON-LD suggestions for Organization, WebSite, and Service',
      'Internal linking deployment recommendations',
      'Implementation instructions by platform',
      'Optional future-facing llms.txt and agents.md templates',
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

    if (!formValues.url.trim()) {
      setApiError('Please enter a website URL.');
      return;
    }

    setIsLoading(true);
    setApiError(null);
    setResult(null);
    setCopiedKey(null);
    setLoadingStepIndex(0);

    const stepInterval = window.setInterval(() => {
      setLoadingStepIndex((previous) => Math.min(previous + 1, LOADING_STEPS.length - 1));
    }, 1200);

    try {
      const response = await fetch('/api/ai-setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || 'Unable to generate your AI setup right now.');
      }

      setResult(payload as AiSetupResponse);
      setActiveTab('aiInfoPage');
      setLoadingStepIndex(LOADING_STEPS.length - 1);

      window.setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Something went wrong while generating your setup.');
    } finally {
      window.clearInterval(stepInterval);
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
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
        <Header onOpenForm={openForm} />

        <main className="relative overflow-hidden pb-20">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-36 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-orange-100/70 blur-[120px]" />
            <div className="absolute right-[-6rem] top-28 h-[14rem] w-[14rem] rounded-full bg-blue-100/80 blur-[95px]" />
          </div>

          <section className="relative z-10 px-4 pb-12 pt-14 md:pt-20">
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 shadow-sm">
                  <Cpu className="h-3.5 w-3.5 text-slate-700" />
                  AI Discovery Setup Engine
                </p>

                <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight text-slate-950 md:text-6xl">
                  Set up your website for AI discovery in one click
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-700 md:text-xl">
                  Scan your site and generate the pages, files, and implementation instructions that help AI systems
                  understand your business with greater precision.
                </p>

                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
                  This is a setup engine, not a reporting dashboard. It identifies missing setup assets and outputs
                  implementation-ready deliverables your team can deploy quickly.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button
                    onClick={scrollToInput}
                    size="lg"
                    className="h-12 rounded-xl bg-orange-500 px-8 text-base font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600"
                  >
                    Generate My AI Setup
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <p className="text-sm text-slate-600">Designed for technical marketing teams and implementation handoff workflows.</p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                    <Database className="h-3.5 w-3.5" />
                    Rule-Based Scan
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                    <Network className="h-3.5 w-3.5" />
                    Setup Detection
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                    <Sparkles className="h-3.5 w-3.5" />
                    AI Asset Generation
                  </span>
                </div>
              </div>

              <Card className="relative self-start overflow-hidden border border-white/70 bg-white/65 p-6 shadow-2xl shadow-slate-200/70 backdrop-blur-xl md:p-8">
                <div className="pointer-events-none absolute -right-12 top-[-2.8rem] h-40 w-40 rounded-full bg-orange-200/45 blur-2xl animate-[pulse_8s_ease-in-out_infinite]" />
                <div className="pointer-events-none absolute -left-10 bottom-[-3.2rem] h-36 w-36 rounded-full bg-emerald-200/45 blur-2xl animate-[pulse_7s_ease-in-out_infinite]" />

                <div className="relative flex items-center justify-between gap-3">
                  <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-600">
                    <TerminalSquare className="h-4 w-4" />
                    One-Click Output Pack
                  </p>
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    Ready to Deploy
                  </span>
                </div>

                <h3 className="relative mt-4 text-2xl font-extrabold text-slate-950">
                  What You Get In One Run
                </h3>
                <p className="relative mt-2 text-sm text-slate-600">
                  The engine generates production-ready outputs your team can copy, paste, and implement without extra tooling.
                </p>

                <div className="relative mt-5 space-y-2">
                  {ONE_CLICK_OUTPUTS.map((output, index) => (
                    <div
                      key={output.title}
                      className="rounded-xl border border-slate-200/80 bg-white/80 p-2.5 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
                      style={{ animationDelay: `${index * 80}ms` }}
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{output.title}</p>
                          <p className="mt-0.5 text-[11px] leading-relaxed text-slate-600">{output.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </section>

          <section className="relative z-10 px-4 pb-8">
            <div className="mx-auto max-w-5xl">
              <div className="mb-3 flex items-center justify-center">
                <span className="rounded-full border border-orange-300/80 bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-orange-700">
                  Start Here
                </span>
              </div>
              <form
                onSubmit={handleQuickUrlSubmit}
                className="rounded-3xl border-2 border-orange-300 bg-white p-4 shadow-2xl shadow-orange-200/60 backdrop-blur-xl"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="flex flex-1 items-center gap-3 rounded-2xl border-2 border-orange-300 bg-orange-50/60 px-3 py-1.5 shadow-inner">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100">
                      <Globe className="h-5 w-5 text-orange-700" />
                    </div>
                    <Input
                      type="text"
                      value={quickWebsiteUrl}
                      onChange={(event) => {
                        setQuickWebsiteUrl(event.target.value);
                        if (quickInputError) {
                          setQuickInputError(null);
                        }
                      }}
                      placeholder="Enter your website URL (e.g. yoursite.com)"
                      className="h-12 border-0 bg-transparent px-0 text-lg font-medium text-slate-900 placeholder:text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="h-12 rounded-2xl bg-orange-500 px-6 text-base font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600"
                  >
                    <span className="hidden sm:inline">Start Setup</span>
                    <ArrowRight className="h-4 w-4 sm:ml-2" />
                  </Button>
                </div>
              </form>

              <p className="mt-3 px-2 text-center text-sm font-medium text-slate-700">
                Enter your website, hit Enter, and jump straight into your setup flow.
              </p>

              {quickInputError && (
                <div className="mt-3 rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700">{quickInputError}</div>
              )}
            </div>
          </section>

          <section className="relative z-10 px-4 pb-8">
            <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
              <Card className="border border-white/70 bg-white/75 p-5 shadow-sm backdrop-blur-xl">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">Implementation Readiness</p>
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                    High confidence
                  </span>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-[120px,1fr] sm:items-center">
                  <div className="relative mx-auto h-28 w-28">
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `conic-gradient(rgb(16 185 129) ${IMPLEMENTATION_SCORE * 3.6}deg, rgb(226 232 240) 0deg)`,
                      }}
                    />
                    <div className="absolute inset-[8px] flex items-center justify-center rounded-full bg-white shadow-inner">
                      <div className="text-center">
                        <p className="text-2xl font-extrabold text-slate-950">{IMPLEMENTATION_SCORE}%</p>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">First pass</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-emerald-700">Setup completeness after one run</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600">
                      Structured outputs are ready to deploy with minimal edits across content assets, technical files, and platform guides.
                    </p>
                    <div className="mt-3 space-y-2.5">
                      {IMPLEMENTATION_BREAKDOWN.map((item) => (
                        <div key={item.label}>
                          <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                            <span>{item.label}</span>
                            <span className="text-slate-700">{item.value}%</span>
                          </div>
                          <div className="mt-1.5 h-2.5 rounded-full bg-slate-200/90">
                            <div
                              className="h-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                              style={{ width: `${item.value}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                  {IMPLEMENTATION_SUMMARY_METRICS.map((metric) => (
                    <div key={metric.label} className="rounded-xl border border-slate-200 bg-white/90 p-2.5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">{metric.label}</p>
                      <p className="mt-1 text-sm font-bold text-slate-950">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="border border-white/70 bg-white/75 p-5 shadow-sm backdrop-blur-xl">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">Discovery Improvement Trend</p>
                  <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
                    +{improvementTrendChart.uplift} point uplift
                  </span>
                </div>

                <p className="mt-2 text-sm text-slate-600">
                  Forecasted readiness improvement from baseline to post-setup once the generated assets are published.
                </p>

                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-inner">
                  <svg viewBox={`0 0 ${improvementTrendChart.width} ${improvementTrendChart.height}`} className="h-52 w-full">
                    <defs>
                      <linearGradient id="ai-setup-trend-fill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgb(59 130 246 / 0.32)" />
                        <stop offset="100%" stopColor="rgb(59 130 246 / 0.05)" />
                      </linearGradient>
                    </defs>

                    {improvementTrendChart.gridLines.map((line) => (
                      <g key={`grid-${line.score}`}>
                        <line
                          x1="26"
                          y1={line.y}
                          x2={improvementTrendChart.width - 26}
                          y2={line.y}
                          stroke="rgb(226 232 240)"
                          strokeDasharray="4 4"
                        />
                        <text x="6" y={line.y + 3} className="fill-slate-400 text-[10px] font-medium">
                          {line.score}
                        </text>
                      </g>
                    ))}

                    {improvementTrendChart.areaPath && (
                      <path d={improvementTrendChart.areaPath} fill="url(#ai-setup-trend-fill)" />
                    )}
                    <path
                      d={improvementTrendChart.linePath}
                      fill="none"
                      stroke="rgb(15 23 42)"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {improvementTrendChart.points.map((point, index) => (
                      <g key={point.label}>
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r={index === improvementTrendChart.points.length - 1 ? 5 : 4}
                          fill={index === improvementTrendChart.points.length - 1 ? 'rgb(16 185 129)' : 'rgb(15 23 42)'}
                          stroke="white"
                          strokeWidth="2"
                        />
                        <text x={point.x} y={improvementTrendChart.height - 8} textAnchor="middle" className="fill-slate-500 text-[10px] font-medium">
                          {point.label}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  <div className="rounded-xl border border-slate-200 bg-white/90 p-2.5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Baseline</p>
                    <p className="mt-1 text-sm font-bold text-slate-900">{improvementTrendChart.baseline}%</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white/90 p-2.5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Post Setup</p>
                    <p className="mt-1 text-sm font-bold text-slate-900">{improvementTrendChart.latest}%</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white/90 p-2.5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Net Gain</p>
                    <p className="mt-1 text-sm font-bold text-emerald-700">+{improvementTrendChart.uplift} points</p>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          <section className="relative z-10 px-4 pb-10">
            <div className="mx-auto max-w-6xl">
              <Card className="border border-white/70 bg-white/70 p-5 shadow-sm backdrop-blur-xl md:p-7">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">
                    Optimized for AI Discovery Surfaces
                  </p>
                  <p className="text-sm text-slate-600">Generated outputs are structured for major AI assistants and search interfaces.</p>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {AI_PLATFORM_LOGOS.map((logo, index) => (
                    <div
                      key={logo.name}
                      className="flex h-20 items-center justify-center rounded-xl border border-slate-200/80 bg-white/80 px-4 shadow-sm backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
                      style={{ animationDelay: `${index * 0.25}s` }}
                    >
                      <img src={logo.url} alt={`${logo.name} logo`} className="h-8 w-auto object-contain opacity-95" />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </section>

          <section className="relative z-10 px-4 pb-10">
            <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-3">
              {ENTERPRISE_CAPABILITIES.map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.title} className="border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="inline-flex rounded-lg border border-slate-200 bg-gradient-to-br from-slate-100 to-white p-2">
                      <Icon className="h-5 w-5 text-slate-700" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                  </Card>
                );
              })}
            </div>
          </section>

          <section className="relative z-10 px-4 pb-12">
            <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <Card className="border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-600">Signal Coverage Matrix</p>
                <h2 className="mt-3 text-2xl font-bold text-slate-950 md:text-3xl">Technical depth with deployment clarity</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  The engine inspects high-impact AI discovery signals, flags setup gaps, and generates implementation-ready assets.
                </p>

                <div className="mt-6 space-y-3">
                  {SIGNAL_COVERAGE.map((signal) => {
                    const Icon = signal.icon;
                    return (
                      <div key={signal.title} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                            <Icon className="h-4 w-4 text-slate-700" />
                            {signal.title}
                          </p>
                          <span className="text-xs font-semibold text-slate-600">{signal.coverage}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-200">
                          <div className="h-2 rounded-full bg-gradient-to-r from-slate-900 to-slate-500" style={{ width: `${signal.coverage}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card className="border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-600">
                  <ShieldCheck className="h-4 w-4" />
                  Delivery Standards
                </p>
                <div className="mt-4 space-y-3">
                  {OUTPUT_METRICS.map((metric) => {
                    const Icon = metric.icon;
                    return (
                      <div key={metric.label} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                        <div className="flex items-center justify-between gap-3">
                          <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                            <Icon className="h-4 w-4 text-slate-700" />
                            {metric.label}
                          </p>
                          <span className="rounded-full border border-slate-300 bg-white px-2 py-0.5 text-xs font-medium text-slate-700">
                            {metric.trend}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-slate-600">{metric.value}</p>
                      </div>
                    );
                  })}
                </div>
                <ul className="mt-5 space-y-3 text-sm text-slate-700">
                  {ENTERPRISE_STANDARDS.map((item) => (
                    <li key={item} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </section>

          <section ref={inputRef} className="relative z-10 px-4 pb-12">
            <div className="mx-auto max-w-6xl">
              <Card className="border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <div className="mb-6 flex flex-col gap-2">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-600">Configuration Console</p>
                  <h2 className="text-3xl font-bold text-slate-950">Build your AI setup pack</h2>
                  <p className="text-sm text-slate-600 md:text-base">
                    Provide your website context and generate a structured setup pack your team can copy, export, and deploy.
                  </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                  <div>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid gap-5 md:grid-cols-2">
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="website-url" className="text-slate-700">
                            Website URL (required)
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
                            className="h-12 border-slate-300 bg-white text-slate-900 placeholder:text-slate-400"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="brand-name" className="text-slate-700">
                            Brand name (optional)
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
                            className={`h-12 border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 transition ${
                              brandFieldFlashActive ? 'border-orange-400 ring-2 ring-orange-300/70' : ''
                            }`}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="country" className="text-slate-700">
                            Country (optional)
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
                            className="h-12 border-slate-300 bg-white text-slate-900 placeholder:text-slate-400"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-slate-700">
                          Short description (optional)
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
                          className="min-h-[110px] border-slate-300 bg-white text-slate-900 placeholder:text-slate-400"
                        />
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs text-slate-500">
                          Partial result handling is enabled if some pages cannot be fetched.
                        </p>
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="h-12 rounded-xl bg-orange-500 px-8 font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Building setup
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
                      <div className="mt-5 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700">
                        {apiError}
                      </div>
                    )}
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-600">
                      <Building2 className="h-4 w-4" />
                      Included in this run
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-slate-700">
                      {generatedAssetsList.map((item) => (
                        <li key={item} className="flex gap-2">
                          <Sparkles className="mt-0.5 h-4 w-4 text-slate-700" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4 text-xs leading-relaxed text-slate-600">
                      Recommended primary asset path: <span className="font-semibold text-slate-900">/ai</span> or{' '}
                      <span className="font-semibold text-slate-900">/ai-info</span>.
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {isLoading && (
            <section className="relative z-10 px-4 pb-14">
              <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-600">Generating</p>
                <h3 className="mt-2 text-2xl font-bold text-slate-950">Building your AI setup pack</h3>
                <div className="mt-6 space-y-3">
                  {LOADING_STEPS.map((step, index) => {
                    const isActive = index === loadingStepIndex;
                    const isComplete = index < loadingStepIndex;

                    return (
                      <div
                        key={step}
                        className={`rounded-xl border px-4 py-3 transition ${
                          isComplete
                            ? 'border-emerald-200 bg-emerald-50'
                            : isActive
                              ? 'border-slate-300 bg-slate-100'
                              : 'border-slate-200 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-medium text-slate-800">{step}</p>
                          {isComplete ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          ) : isActive ? (
                            <Loader2 className="h-4 w-4 animate-spin text-slate-700" />
                          ) : (
                            <div className="h-2 w-2 rounded-full bg-slate-400" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {result && (
            <section ref={resultsRef} className="relative z-10 px-4 pb-16">
              <div className="mx-auto max-w-6xl space-y-8">
                <Card className="relative overflow-hidden border border-white/70 bg-gradient-to-br from-white via-slate-50/70 to-orange-50/30 p-6 shadow-xl shadow-slate-200/60 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 md:p-8">
                  <div className="pointer-events-none absolute -right-12 top-8 h-36 w-36 rounded-full bg-orange-200/40 blur-3xl" />
                  <div className="pointer-events-none absolute -left-12 bottom-6 h-32 w-32 rounded-full bg-blue-200/35 blur-3xl" />

                  <div className="relative flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-slate-600">Delivery Console</p>
                      <h3 className="mt-2 text-2xl font-black text-slate-950 md:text-3xl">{result.summary.headline}</h3>
                      <p className="mt-2 text-sm text-slate-600">
                        Scanned domain: <span className="font-semibold text-slate-900">{result.site.normalizedUrl}</span>
                      </p>
                    </div>
                    {generationModeMeta && (
                      <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm shadow-sm backdrop-blur">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Generation Source</p>
                        <p className="mt-1 font-semibold text-slate-900">{generationModeMeta.label}</p>
                        <p className="mt-1 text-xs text-slate-600">{generationModeMeta.description}</p>
                        {result.meta.partial && (
                          <p className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-2 py-1 text-xs text-amber-700">
                            Partial fetch completed. Outputs were still generated.
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="relative mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-sm">
                      <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-slate-500">
                        <Globe className="h-3.5 w-3.5" />
                        Pages scanned
                      </p>
                      <p className="mt-2 text-3xl font-black text-slate-900">{resultOverview?.scannedPages ?? result.site.scannedPaths.length}</p>
                      <p className="mt-1 text-xs text-slate-500">Core + secondary pages</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-sm">
                      <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-slate-500">
                        <Gauge className="h-3.5 w-3.5" />
                        Coverage
                      </p>
                      <p className="mt-2 text-3xl font-black text-slate-900">{resultOverview?.coreCoverage ?? 0}%</p>
                      <p className="mt-1 text-xs text-slate-500">Core page confidence</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-sm">
                      <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-slate-500">
                        <Rocket className="h-3.5 w-3.5" />
                        Assets generated
                      </p>
                      <p className="mt-2 text-3xl font-black text-slate-900">{resultOverview?.generatedCount ?? generatedAssetsList.length}</p>
                      <p className="mt-1 text-xs text-slate-500">Ready for copy + deploy</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-sm">
                      <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-slate-500">
                        <LineChart className="h-3.5 w-3.5" />
                        Action queue
                      </p>
                      <p className="mt-2 text-3xl font-black text-slate-900">{resultOverview?.recommendationCount ?? 0}</p>
                      <p className="mt-1 text-xs text-slate-500">Prioritized roll-out actions</p>
                    </div>
                  </div>

                  <div className="relative mt-6 grid gap-4 lg:grid-cols-3">
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">What already exists</p>
                      <ul className="mt-3 space-y-2 text-sm text-slate-700">
                        {(result.summary.existingAssets.length > 0
                          ? result.summary.existingAssets.slice(0, 5)
                          : ['No major setup assets were confidently detected.']).map((item) => (
                          <li key={item} className="flex gap-2">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-orange-200 bg-orange-50/70 p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-700">What was missing</p>
                      <ul className="mt-3 space-y-2 text-sm text-slate-700">
                        {(result.summary.missingAssets.length > 0
                          ? result.summary.missingAssets.slice(0, 5)
                          : ['No critical setup gaps found from the scan.']).map((item) => (
                          <li key={item} className="flex gap-2">
                            <Bot className="mt-0.5 h-4 w-4 text-orange-600" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">What to do next</p>
                      <ul className="mt-3 space-y-2">
                        {(result.summary.recommendations.length > 0
                          ? result.summary.recommendations.slice(0, 5)
                          : ['No immediate action required.']).map((item, index) => (
                          <li key={item} className="flex items-start gap-2 rounded-lg border border-slate-200 bg-slate-50/80 p-2.5 text-sm text-slate-700">
                            <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[11px] font-semibold text-white">
                              {index + 1}
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>

                <Card className="relative overflow-hidden border border-white/70 bg-gradient-to-br from-white via-slate-50/70 to-blue-50/30 p-6 shadow-xl shadow-slate-200/60 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 md:p-8">
                  <div className="pointer-events-none absolute -right-14 top-10 h-40 w-40 rounded-full bg-blue-200/35 blur-3xl" />
                  <div className="relative flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-slate-600">Output Studio</p>
                      <h3 className="mt-2 text-2xl font-black text-slate-950">Beautiful, copy-ready delivery pack</h3>
                      <p className="mt-2 max-w-2xl text-sm text-slate-600">
                        Every tab is formatted for direct handoff to marketing and dev teams, with implementation-grade detail.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button onClick={copyAll} size="sm" className="bg-orange-500 text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-200/60">
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
                      <Button onClick={downloadPack} size="sm" className="bg-slate-900 text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-300/60">
                        <Download className="mr-2 h-4 w-4" />
                        Download Pack
                      </Button>
                      <Link href="/strategy-blueprint">
                        <Button size="sm" variant="outline" className="border-slate-300 text-slate-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-100">
                          Book Strategy Call
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 md:grid-cols-4">
                    <div className="rounded-xl border border-slate-200 bg-white/90 p-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                      <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Schema types</p>
                      <p className="mt-1 text-2xl font-black text-slate-900">{resultOverview?.schemaCount ?? 0}</p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white/90 p-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                      <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Link placements</p>
                      <p className="mt-1 text-2xl font-black text-slate-900">{resultOverview?.internalLinkCount ?? 0}</p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white/90 p-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                      <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Warnings</p>
                      <p className="mt-1 text-2xl font-black text-slate-900">{result.meta.warnings.length}</p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white/90 p-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                      <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Mode</p>
                      <p className="mt-1 text-sm font-bold text-slate-900">{generationModeMeta?.label ?? 'Unknown'}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-slate-300 bg-white/90 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
                      Copy-ready formatting
                    </span>
                    <span className="rounded-full border border-slate-300 bg-white/90 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
                      Platform implementation steps
                    </span>
                    <span className="rounded-full border border-slate-300 bg-white/90 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
                      Fast export + handoff
                    </span>
                  </div>

                  <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as OutputTabValue)} className="mt-8">
                    <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
                      <TabsList className="grid h-fit w-full grid-cols-2 gap-2 rounded-2xl border border-slate-200 bg-white/90 p-2 backdrop-blur data-[state=open]:animate-in data-[state=open]:fade-in-0 lg:grid-cols-1">
                        {OUTPUT_TAB_ORDER.map((tab) => {
                          const Icon = tab.icon;
                          const summary = tabSummaries.get(tab.value);

                          return (
                            <TabsTrigger
                              key={tab.value}
                              value={tab.value}
                              className="relative flex h-auto flex-col items-start gap-1 rounded-xl border border-transparent bg-slate-50/70 px-3 py-3 text-left text-xs font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white data-[state=active]:border-slate-300 data-[state=active]:bg-slate-900 data-[state=active]:text-white after:absolute after:bottom-1.5 after:left-3 after:h-0.5 after:w-[calc(100%-1.5rem)] after:origin-left after:scale-x-0 after:rounded-full after:bg-orange-400 after:transition-transform after:duration-300 data-[state=active]:after:scale-x-100"
                            >
                              <span className="inline-flex items-center gap-2 text-sm font-semibold">
                                <Icon className="h-3.5 w-3.5" />
                                {tab.label}
                              </span>
                              <span className="text-[11px] opacity-80">
                                {summary?.words ?? 0} words · {summary?.lines ?? 0} lines
                              </span>
                            </TabsTrigger>
                          );
                        })}
                      </TabsList>

                      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur-sm transition-all duration-300">
                        <div className="pointer-events-none absolute -right-10 top-6 h-24 w-24 rounded-full bg-orange-100/60 blur-2xl" />

                        <TabsContent value="aiInfoPage" className={TAB_CONTENT_ANIMATION_CLASS}>
                          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <p className="text-sm font-semibold text-slate-900">AI Info Page Draft</p>
                                <p className="text-xs text-slate-600">Canonical /ai page content structured for assistants and humans.</p>
                              </div>
                              <Button size="sm" variant="outline" onClick={() => copyTab('aiInfoPage')} className="border-slate-300 text-slate-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-100">
                                {copiedKey === 'tab-aiInfoPage' ? 'Copied' : 'Copy'}
                              </Button>
                            </div>
                            <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-950">
                              <div className="flex items-center gap-2 border-b border-slate-700 px-3 py-2 text-[11px] text-slate-300">
                                <span className="h-2 w-2 rounded-full bg-red-400" />
                                <span className="h-2 w-2 rounded-full bg-yellow-400" />
                                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                <span className="ml-2">/ai-info.md</span>
                              </div>
                              <pre className="max-h-[560px] overflow-auto whitespace-pre-wrap px-4 py-4 text-sm leading-relaxed text-slate-100">
                                {maskContent(result.assets.aiInfoPage, 2_600)}
                              </pre>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="robotsTxt" className={TAB_CONTENT_ANIMATION_CLASS}>
                          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <p className="text-sm font-semibold text-slate-900">Recommended robots.txt</p>
                                <p className="text-xs text-slate-600">Merged recommendation. Review before replacing existing live rules.</p>
                              </div>
                              <Button size="sm" variant="outline" onClick={() => copyTab('robotsTxt')} className="border-slate-300 text-slate-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-100">
                                {copiedKey === 'tab-robotsTxt' ? 'Copied' : 'Copy'}
                              </Button>
                            </div>
                            <div className="mb-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">
                              robots.txt is crawler guidance, not security access control.
                            </div>
                            <pre className="max-h-[560px] overflow-auto rounded-2xl border border-slate-300 bg-white p-4 font-mono text-sm leading-relaxed text-slate-800">
                              {maskContent(result.assets.robotsTxt, 2_600)}
                            </pre>
                          </div>
                        </TabsContent>

                        <TabsContent value="schema" className={TAB_CONTENT_ANIMATION_CLASS}>
                          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <p className="text-sm font-semibold text-slate-900">Schema Suggestions</p>
                                <p className="text-xs text-slate-600">JSON-LD blocks with placement and validation guidance.</p>
                              </div>
                              <Button size="sm" variant="outline" onClick={() => copyTab('schema')} className="border-slate-300 text-slate-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-100">
                                {copiedKey === 'tab-schema' ? 'Copied' : 'Copy'}
                              </Button>
                            </div>

                            <div className="grid gap-4 lg:grid-cols-2">
                              {[
                                { title: 'Organization', value: result.assets.schema.organization },
                                { title: 'WebSite', value: result.assets.schema.website },
                                { title: 'Service', value: result.assets.schema.service },
                                ...(result.assets.schema.person ? [{ title: 'Person', value: result.assets.schema.person }] : []),
                              ].map((item) => (
                                <div key={item.title} className="overflow-hidden rounded-xl border border-slate-300 bg-slate-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-300/20">
                                  <p className="border-b border-slate-700 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200">
                                    {item.title}
                                  </p>
                                  <pre className="max-h-[320px] overflow-auto whitespace-pre-wrap p-3 text-xs leading-relaxed text-slate-100">
                                    {maskContent(item.value, 1_250)}
                                  </pre>
                                </div>
                              ))}
                            </div>

                            {result.assets.schema.notes.length > 0 && (
                              <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3">
                                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-700">Schema notes</p>
                                <ul className="mt-2 space-y-2 text-sm text-slate-700">
                                  {result.assets.schema.notes.map((note) => (
                                    <li key={note} className="flex gap-2">
                                      <ArrowRight className="mt-0.5 h-4 w-4 text-slate-500" />
                                      <span>{note}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </TabsContent>

                        <TabsContent value="internalLinking" className={TAB_CONTENT_ANIMATION_CLASS}>
                          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <p className="text-sm font-semibold text-slate-900">Internal Linking Plan</p>
                                <p className="text-xs text-slate-600">Prioritized placements with anchor and rollout rationale.</p>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => copyTab('internalLinking')}
                                className="border-slate-300 text-slate-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-100"
                              >
                                {copiedKey === 'tab-internalLinking' ? 'Copied' : 'Copy'}
                              </Button>
                            </div>

                            <div className="space-y-3">
                              {result.assets.internalLinking.map((item, index) => (
                                <div key={`${item.fromPage}-${index}`} className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                                      {index + 1}
                                    </span>
                                    <p className="font-semibold text-slate-900">{item.fromPage}</p>
                                  </div>
                                  <div className="mt-2 grid gap-2 text-sm">
                                    <p>
                                      <span className="font-medium text-slate-500">Anchor text:</span>{' '}
                                      <span className="font-semibold text-slate-900">{item.anchorText}</span>
                                    </p>
                                    <p>
                                      <span className="font-medium text-slate-500">Placement:</span> {item.placement}
                                    </p>
                                    <p>
                                      <span className="font-medium text-slate-500">Why it matters:</span> {item.reason}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="implementationGuide" className={TAB_CONTENT_ANIMATION_CLASS}>
                          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <p className="text-sm font-semibold text-slate-900">Implementation Guide</p>
                                <p className="text-xs text-slate-600">Platform-by-platform execution and QA checklist.</p>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => copyTab('implementationGuide')}
                                className="border-slate-300 text-slate-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-100"
                              >
                                {copiedKey === 'tab-implementationGuide' ? 'Copied' : 'Copy'}
                              </Button>
                            </div>

                            {renderGuideCards(result.assets.implementationGuide)}
                          </div>
                        </TabsContent>

                        <TabsContent value="optionalExtras" className={TAB_CONTENT_ANIMATION_CLASS}>
                          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <p className="text-sm font-semibold text-slate-900">Optional / Future-Facing Extras</p>
                                <p className="text-xs text-slate-600">Helpful but non-essential files for emerging AI indexing workflows.</p>
                              </div>
                              <Button size="sm" variant="outline" onClick={() => copyTab('optionalExtras')} className="border-slate-300 text-slate-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-100">
                                {copiedKey === 'tab-optionalExtras' ? 'Copied' : 'Copy'}
                              </Button>
                            </div>

                            <div className="grid gap-4 lg:grid-cols-2">
                              <div className="overflow-hidden rounded-xl border border-slate-300 bg-slate-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-300/20">
                                <p className="border-b border-slate-700 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200">
                                  llms.txt
                                </p>
                                <pre className="max-h-[320px] overflow-auto whitespace-pre-wrap p-3 text-xs leading-relaxed text-slate-100">
                                  {maskContent(result.assets.optionalExtras.llmsTxt, 1_400)}
                                </pre>
                              </div>
                              <div className="overflow-hidden rounded-xl border border-slate-300 bg-slate-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-300/20">
                                <p className="border-b border-slate-700 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200">
                                  agents.md
                                </p>
                                <pre className="max-h-[320px] overflow-auto whitespace-pre-wrap p-3 text-xs leading-relaxed text-slate-100">
                                  {maskContent(result.assets.optionalExtras.agentsMd, 1_400)}
                                </pre>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </div>
                    </div>
                  </Tabs>
                </Card>

                <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-600">Next Step Support</p>
                  <h3 className="mt-2 text-3xl font-bold text-slate-950">Need implementation support?</h3>
                  <p className="mt-3 max-w-3xl text-slate-600">
                    We can implement this setup pack, validate rollout quality, and align your AI visibility setup with
                    your broader authority and content strategy.
                  </p>
                  <div className="mt-6 grid gap-3 md:grid-cols-3">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                      Implementation support
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                      Strategy call + roadmap
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                      Done-for-you AI visibility execution
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link href="/strategy-blueprint">
                      <Button className="bg-slate-950 text-white hover:bg-slate-800">Book Strategy Call</Button>
                    </Link>
                    <Button variant="outline" onClick={openForm} className="border-slate-300 text-slate-900 hover:bg-slate-100">
                      Talk to the Team
                    </Button>
                  </div>
                </section>
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
