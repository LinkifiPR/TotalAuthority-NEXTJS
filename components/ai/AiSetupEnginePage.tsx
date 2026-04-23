"use client";

import { FormEvent, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Activity,
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
  Lock,
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

const ENGINE_SEQUENCE = [
  {
    step: '01',
    title: 'Targeted Site Scan',
    description: 'Homepage + core pages + robots.txt + sitemap.xml',
  },
  {
    step: '02',
    title: 'Technical Parsing',
    description: 'Metadata, headings, schema, canonicals, links, and visible text signals',
  },
  {
    step: '03',
    title: 'Gap Identification',
    description: 'Existing assets, missing assets, and practical setup priorities',
  },
  {
    step: '04',
    title: 'Asset Generation',
    description: 'AI page, robots recommendations, schema suggestions, linking strategy, implementation guide',
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

const DASHBOARD_KPIS = [
  {
    label: 'Core Pages',
    value: '7 Targets',
    icon: Globe,
  },
  {
    label: 'Signals Parsed',
    value: '42',
    icon: Activity,
  },
  {
    label: 'Assets Generated',
    value: '6',
    icon: Sparkles,
  },
];

const PIPELINE_BARS = [
  { label: 'Scan', height: 32 },
  { label: 'Parse', height: 56 },
  { label: 'Detect', height: 44 },
  { label: 'Generate', height: 68 },
  { label: 'Guide', height: 50 },
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

function maskContent(content: string, unlocked: boolean, maxLength = 1_250): string {
  if (unlocked || content.length <= maxLength) {
    return content;
  }

  return `${content.slice(0, maxLength)}\n\n[Preview only - unlock full output to copy/export this section.]`;
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
        <div key={card.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-900">{card.title}</p>
          <ol className="mt-3 space-y-2 text-sm text-slate-700">
            {card.steps.map((step, index) => (
              <li key={`${card.title}-${index}`}>
                {index + 1}. {step}
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}

export default function AiSetupEnginePage() {
  const { isOpen, openForm, closeForm } = useFormPopup();
  const inputRef = useRef<HTMLDivElement | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);

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

  const [leadValues, setLeadValues] = useState({
    name: '',
    email: '',
    company: '',
  });
  const [leadError, setLeadError] = useState<string | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

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

  const scrollToInput = () => {
    inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    setIsUnlocked(false);
    setLeadError(null);
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

  const unlockResults = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!leadValues.name.trim() || !leadValues.email.trim() || !leadValues.company.trim()) {
      setLeadError('Please fill in your name, email, and company to unlock full export.');
      return;
    }

    if (!emailPattern.test(leadValues.email.trim())) {
      setLeadError('Please enter a valid email address.');
      return;
    }

    setLeadError(null);
    setIsUnlocked(true);
  };

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey((current) => (current === key ? null : current)), 1800);
    } catch {
      setApiError('Clipboard copy failed in this browser. You can still copy manually.');
    }
  };

  const copyTab = async (tab: OutputTabValue) => {
    if (!result || !isUnlocked) {
      return;
    }

    await copyToClipboard(buildTabCopyText(result, tab), `tab-${tab}`);
  };

  const copyAll = async () => {
    if (!result || !isUnlocked) {
      return;
    }

    await copyToClipboard(buildExportPack(result), 'copy-all');
  };

  const downloadPack = () => {
    if (!result || !isUnlocked) {
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
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 shadow-sm">
                  <Cpu className="h-3.5 w-3.5 text-slate-700" />
                  Enterprise AI Discovery Setup Engine
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
                    className="h-12 rounded-xl bg-slate-950 px-8 text-base font-semibold text-white hover:bg-slate-800"
                  >
                    Generate My AI Setup
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <p className="text-sm text-slate-600">Designed for technical marketing teams and enterprise handoff workflows.</p>
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

              <Card className="border border-slate-200 bg-white p-6 shadow-lg md:p-8">
                <div className="flex items-center justify-between gap-3">
                  <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-600">
                    <TerminalSquare className="h-4 w-4" />
                    Live Setup Preview
                  </p>
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    Enterprise Mode
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {DASHBOARD_KPIS.map((kpi) => {
                    const Icon = kpi.icon;
                    return (
                      <div key={kpi.label} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                        <div className="inline-flex rounded-md bg-white p-1.5">
                          <Icon className="h-3.5 w-3.5 text-slate-700" />
                        </div>
                        <p className="mt-2 text-xs text-slate-500">{kpi.label}</p>
                        <p className="text-sm font-semibold text-slate-900">{kpi.value}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 rounded-xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">Pipeline Throughput</p>
                  <div className="mt-3 flex h-24 items-end gap-2">
                    {PIPELINE_BARS.map((bar) => (
                      <div key={bar.label} className="flex flex-1 flex-col items-center gap-2">
                        <div
                          className="w-full rounded-md bg-gradient-to-t from-slate-900 to-slate-500"
                          style={{ height: `${bar.height}px` }}
                        />
                        <span className="text-[10px] font-medium uppercase tracking-wide text-slate-500">{bar.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {ENGINE_SEQUENCE.map((item) => (
                    <div key={item.step} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2">
                      <p className="text-xs font-semibold text-slate-900">
                        {item.step}. {item.title}
                      </p>
                      <span className="text-[11px] text-slate-500">{item.description}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </section>

          <section className="relative z-10 px-4 pb-10">
            <div className="mx-auto max-w-6xl">
              <Card className="border border-slate-200 bg-white p-5 shadow-sm md:p-7">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">
                    Optimized for AI Discovery Surfaces
                  </p>
                  <p className="text-sm text-slate-600">Generated outputs are structured for major AI assistants and search interfaces.</p>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {AI_PLATFORM_LOGOS.map((logo) => (
                    <div key={logo.name} className="flex h-20 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4">
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
                            id="brand-name"
                            placeholder="Total Authority"
                            value={formValues.brandName}
                            onChange={(event) =>
                              setFormValues((current) => ({
                                ...current,
                                brandName: event.target.value,
                              }))
                            }
                            className="h-12 border-slate-300 bg-white text-slate-900 placeholder:text-slate-400"
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
                          className="h-12 rounded-xl bg-slate-950 px-8 font-semibold text-white hover:bg-slate-800"
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
                <Card className="border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-slate-600">Setup Summary</p>
                      <h3 className="mt-2 text-2xl font-bold text-slate-950 md:text-3xl">{result.summary.headline}</h3>
                      <p className="mt-2 text-sm text-slate-600">
                        Scanned: <span className="font-medium text-slate-900">{result.site.normalizedUrl}</span>
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      <p>
                        Generation mode:{' '}
                        {result.meta.generationMode === 'openrouter' ? 'OpenRouter + Rules' : 'Rule-based fallback'}
                      </p>
                      {result.meta.partial && <p className="mt-1 text-slate-600">Partial fetch completed, results still generated.</p>}
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-wider text-slate-500">What already exists</p>
                      <ul className="mt-3 space-y-2 text-sm text-slate-700">
                        {(result.summary.existingAssets.length > 0
                          ? result.summary.existingAssets
                          : ['No major setup assets detected yet.']).map((item) => (
                          <li key={item} className="flex gap-2">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-wider text-slate-500">What was missing</p>
                      <ul className="mt-3 space-y-2 text-sm text-slate-700">
                        {(result.summary.missingAssets.length > 0
                          ? result.summary.missingAssets
                          : ['No critical setup gaps found.']).map((item) => (
                          <li key={item} className="flex gap-2">
                            <Bot className="mt-0.5 h-4 w-4 text-slate-700" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-wider text-slate-500">What we generated</p>
                      <ul className="mt-3 space-y-2 text-sm text-slate-700">
                        {generatedAssetsList.map((item) => (
                          <li key={item} className="flex gap-2">
                            <Sparkles className="mt-0.5 h-4 w-4 text-slate-700" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-wider text-slate-500">What to do next</p>
                      <ul className="mt-3 space-y-2 text-sm text-slate-700">
                        {result.summary.recommendations.slice(0, 4).map((item) => (
                          <li key={item} className="flex gap-2">
                            <ArrowRight className="mt-0.5 h-4 w-4 text-slate-700" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>

                <Card className="border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-slate-600">Output Tabs</p>
                      <h3 className="mt-2 text-2xl font-bold text-slate-950">Implementation-ready setup assets</h3>
                    </div>
                    {!isUnlocked ? (
                      <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-xs text-slate-700">
                        <Lock className="h-3.5 w-3.5" />
                        Lead gate active: unlock to export full pack
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        <Button onClick={copyAll} size="sm" className="bg-slate-950 text-white hover:bg-slate-800">
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
                        <Button onClick={downloadPack} size="sm" className="bg-slate-700 text-white hover:bg-slate-800">
                          <Download className="mr-2 h-4 w-4" />
                          Download Pack
                        </Button>
                        <Link href="/strategy-blueprint">
                          <Button size="sm" variant="outline" className="border-slate-300 text-slate-900 hover:bg-slate-100">
                            Book Strategy Call
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>

                  {!isUnlocked && (
                    <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <p className="text-sm font-semibold text-slate-900">Unlock full export</p>
                      <p className="mt-1 text-sm text-slate-600">
                        Enter your details to unlock full copy/export and handoff files.
                      </p>
                      <div className="mt-4 grid gap-3 md:grid-cols-3">
                        <Input
                          placeholder="Name"
                          value={leadValues.name}
                          onChange={(event) =>
                            setLeadValues((current) => ({
                              ...current,
                              name: event.target.value,
                            }))
                          }
                          className="h-11 border-slate-300 bg-white text-slate-900 placeholder:text-slate-400"
                        />
                        <Input
                          type="email"
                          placeholder="Email"
                          value={leadValues.email}
                          onChange={(event) =>
                            setLeadValues((current) => ({
                              ...current,
                              email: event.target.value,
                            }))
                          }
                          className="h-11 border-slate-300 bg-white text-slate-900 placeholder:text-slate-400"
                        />
                        <Input
                          placeholder="Company"
                          value={leadValues.company}
                          onChange={(event) =>
                            setLeadValues((current) => ({
                              ...current,
                              company: event.target.value,
                            }))
                          }
                          className="h-11 border-slate-300 bg-white text-slate-900 placeholder:text-slate-400"
                        />
                      </div>
                      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        {leadError ? <p className="text-sm text-red-600">{leadError}</p> : <div />}
                        <Button onClick={unlockResults} className="h-11 bg-slate-950 px-6 text-white hover:bg-slate-800">
                          Unlock Full Output
                        </Button>
                      </div>
                    </div>
                  )}

                  <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as OutputTabValue)} className="mt-8">
                    <TabsList className="grid h-auto w-full grid-cols-2 gap-2 rounded-xl bg-slate-100 p-2 md:grid-cols-3 lg:grid-cols-6">
                      {OUTPUT_TAB_ORDER.map((tab) => {
                        const Icon = tab.icon;
                        return (
                          <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            className="flex h-12 items-center justify-center gap-2 rounded-lg border border-transparent bg-white px-2 text-xs font-semibold text-slate-700 data-[state=active]:border-slate-300 data-[state=active]:bg-slate-900 data-[state=active]:text-white"
                          >
                            <Icon className="h-3.5 w-3.5" />
                            <span>{tab.label}</span>
                          </TabsTrigger>
                        );
                      })}
                    </TabsList>

                    <TabsContent value="aiInfoPage" className="mt-4">
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <p className="text-sm font-semibold text-slate-900">AI Info Page</p>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={!isUnlocked}
                            onClick={() => copyTab('aiInfoPage')}
                            className="border-slate-300 text-slate-900 hover:bg-slate-100"
                          >
                            {copiedKey === 'tab-aiInfoPage' ? 'Copied' : 'Copy'}
                          </Button>
                        </div>
                        <pre className="max-h-[520px] overflow-auto whitespace-pre-wrap rounded-lg bg-white p-4 text-sm leading-relaxed text-slate-800">
                          {maskContent(result.assets.aiInfoPage, isUnlocked)}
                        </pre>
                      </div>
                    </TabsContent>

                    <TabsContent value="robotsTxt" className="mt-4">
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <p className="text-sm font-semibold text-slate-900">Recommended robots.txt</p>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={!isUnlocked}
                            onClick={() => copyTab('robotsTxt')}
                            className="border-slate-300 text-slate-900 hover:bg-slate-100"
                          >
                            {copiedKey === 'tab-robotsTxt' ? 'Copied' : 'Copy'}
                          </Button>
                        </div>
                        <pre className="max-h-[520px] overflow-auto rounded-lg bg-white p-4 font-mono text-sm leading-relaxed text-slate-800">
                          {maskContent(result.assets.robotsTxt, isUnlocked)}
                        </pre>
                      </div>
                    </TabsContent>

                    <TabsContent value="schema" className="mt-4">
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <p className="text-sm font-semibold text-slate-900">Schema Suggestions</p>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={!isUnlocked}
                            onClick={() => copyTab('schema')}
                            className="border-slate-300 text-slate-900 hover:bg-slate-100"
                          >
                            {copiedKey === 'tab-schema' ? 'Copied' : 'Copy'}
                          </Button>
                        </div>

                        <div className="grid gap-4 lg:grid-cols-2">
                          {[
                            { title: 'Organization', value: result.assets.schema.organization },
                            { title: 'WebSite', value: result.assets.schema.website },
                            { title: 'Service', value: result.assets.schema.service },
                            ...(result.assets.schema.person
                              ? [{ title: 'Person', value: result.assets.schema.person }]
                              : []),
                          ].map((item) => (
                            <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-3">
                              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-700">{item.title}</p>
                              <pre className="max-h-[280px] overflow-auto whitespace-pre-wrap text-xs text-slate-700">
                                {maskContent(item.value, isUnlocked, 850)}
                              </pre>
                            </div>
                          ))}
                        </div>

                        {result.assets.schema.notes.length > 0 && (
                          <div className="mt-4 rounded-lg border border-slate-200 bg-white p-3">
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-700">Schema Notes</p>
                            <ul className="mt-2 space-y-2 text-sm text-slate-700">
                              {result.assets.schema.notes.map((note) => (
                                <li key={note} className="flex gap-2">
                                  <ArrowRight className="mt-0.5 h-4 w-4 text-slate-600" />
                                  <span>{note}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="internalLinking" className="mt-4">
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <p className="text-sm font-semibold text-slate-900">Internal Linking Plan</p>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={!isUnlocked}
                            onClick={() => copyTab('internalLinking')}
                            className="border-slate-300 text-slate-900 hover:bg-slate-100"
                          >
                            {copiedKey === 'tab-internalLinking' ? 'Copied' : 'Copy'}
                          </Button>
                        </div>

                        <div className="space-y-3">
                          {result.assets.internalLinking.map((item, index) => (
                            <div key={`${item.fromPage}-${index}`} className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700">
                              <p className="font-semibold text-slate-900">{index + 1}. {item.fromPage}</p>
                              <p className="mt-1">
                                <span className="text-slate-500">Anchor: </span>
                                <span className="text-slate-900">{item.anchorText}</span>
                              </p>
                              <p>
                                <span className="text-slate-500">Placement: </span>
                                {item.placement}
                              </p>
                              <p>
                                <span className="text-slate-500">Why: </span>
                                {item.reason}
                              </p>
                            </div>
                          ))}
                        </div>

                        {!isUnlocked && <p className="mt-3 text-xs text-slate-500">Unlock to copy/export the complete linking plan.</p>}
                      </div>
                    </TabsContent>

                    <TabsContent value="implementationGuide" className="mt-4">
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <p className="text-sm font-semibold text-slate-900">Implementation Guide</p>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={!isUnlocked}
                            onClick={() => copyTab('implementationGuide')}
                            className="border-slate-300 text-slate-900 hover:bg-slate-100"
                          >
                            {copiedKey === 'tab-implementationGuide' ? 'Copied' : 'Copy'}
                          </Button>
                        </div>

                        {isUnlocked ? (
                          renderGuideCards(result.assets.implementationGuide)
                        ) : (
                          <pre className="max-h-[520px] overflow-auto whitespace-pre-wrap rounded-lg bg-white p-4 text-sm text-slate-700">
                            {maskContent(implementationGuideToText(result.assets.implementationGuide), false)}
                          </pre>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="optionalExtras" className="mt-4">
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <p className="text-sm font-semibold text-slate-900">Optional / Future-Facing Extras</p>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={!isUnlocked}
                            onClick={() => copyTab('optionalExtras')}
                            className="border-slate-300 text-slate-900 hover:bg-slate-100"
                          >
                            {copiedKey === 'tab-optionalExtras' ? 'Copied' : 'Copy'}
                          </Button>
                        </div>

                        <div className="grid gap-4 lg:grid-cols-2">
                          <div className="rounded-lg border border-slate-200 bg-white p-3">
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-700">llms.txt</p>
                            <pre className="max-h-[280px] overflow-auto whitespace-pre-wrap text-xs text-slate-700">
                              {maskContent(result.assets.optionalExtras.llmsTxt, isUnlocked, 900)}
                            </pre>
                          </div>
                          <div className="rounded-lg border border-slate-200 bg-white p-3">
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-700">agents.md</p>
                            <pre className="max-h-[280px] overflow-auto whitespace-pre-wrap text-xs text-slate-700">
                              {maskContent(result.assets.optionalExtras.agentsMd, isUnlocked, 900)}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
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
