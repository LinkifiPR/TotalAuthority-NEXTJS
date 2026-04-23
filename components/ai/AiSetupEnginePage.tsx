"use client";

import { FormEvent, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
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
  Globe,
  Layers,
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

const TECHNICAL_CAPABILITIES = [
  {
    title: 'Deterministic Signal Extraction',
    description:
      'Collects key site signals from core URLs, metadata, headings, schema, canonical tags, internal links, robots, and sitemap.',
    icon: Database,
  },
  {
    title: 'Setup Gap Detection',
    description:
      'Maps what already exists versus what is missing for AI discovery readiness, then prioritizes practical implementation actions.',
    icon: Layers,
  },
  {
    title: 'Implementation-Ready Asset Generation',
    description:
      'Produces deployable AI page copy, robots recommendations, schema suggestions, linking strategy, and platform-specific handoff instructions.',
    icon: Workflow,
  },
];

const ENGINE_FLOW = [
  {
    step: '01',
    title: 'Targeted Website Scan',
    description: 'Fetches homepage and core routes including about/services/contact, plus robots.txt and sitemap.xml when available.',
  },
  {
    step: '02',
    title: 'Technical Signal Parsing',
    description: 'Extracts title/meta/headings, visible text, internal links, canonical references, and JSON-LD schema blocks.',
  },
  {
    step: '03',
    title: 'Setup Gap Identification',
    description: 'Classifies existing assets, missing assets, and immediate setup opportunities without presenting a generic audit experience.',
  },
  {
    step: '04',
    title: 'Generated Asset Pack',
    description: 'Creates AI Info Page, robots recommendations, schema suggestions, internal linking plan, and implementation guide.',
  },
];

const ENTERPRISE_STANDARDS = [
  'Graceful partial-result handling when some pages are blocked or unavailable',
  'Model-backed generation with rule-based fallback for reliability',
  'Structured outputs designed for direct implementation and dev handoff',
  'Commercially oriented content that avoids overclaiming outcomes',
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
        <div
          key={card.title}
          className="rounded-xl border border-slate-700/80 bg-gradient-to-br from-slate-900 to-slate-950 p-5"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-300">{card.title}</p>
          <ol className="mt-3 space-y-2 text-sm text-slate-200">
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
      'AI Info Page draft optimized for machine readability',
      'Recommended robots.txt update with sitemap directives',
      'Schema JSON-LD suggestions (Organization/WebSite/Service)',
      'Internal linking deployment plan for authority transfer',
      'Platform implementation guide for WordPress/Webflow/Shopify/Custom',
      'Optional llms.txt + agents.md future-facing templates',
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
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-[#05070d] text-slate-100">
        <Header onOpenForm={openForm} />

        <main className="relative overflow-hidden pb-20">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-72 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-orange-500/20 blur-[140px]" />
            <div className="absolute right-[-8rem] top-36 h-[16rem] w-[16rem] rounded-full bg-blue-500/25 blur-[100px]" />
            <div className="absolute bottom-[-7rem] left-[-7rem] h-[18rem] w-[18rem] rounded-full bg-cyan-500/20 blur-[95px]" />
          </div>

          <section className="relative z-10 px-4 pb-14 pt-14 md:pt-20">
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-orange-400/45 bg-orange-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-200">
                  <Cpu className="h-3.5 w-3.5" />
                  Enterprise AI Discovery Setup Engine
                </p>
                <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight text-white md:text-6xl">
                  Set up your website for AI discovery in one click
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-200 md:text-xl">
                  This engine scans your core web assets, identifies missing AI discovery setup components, and generates
                  implementation-ready outputs your team can ship immediately.
                </p>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300 md:text-base">
                  It is a setup system, not a generic audit dashboard. You get deployable assets: AI Info Page content,
                  robots guidance, schema suggestions, internal linking recommendations, and platform-specific
                  implementation instructions.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button
                    onClick={scrollToInput}
                    size="lg"
                    className="h-12 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-8 text-base font-semibold text-white shadow-[0_0_34px_rgba(249,115,22,0.35)] hover:from-orange-400 hover:to-orange-500"
                  >
                    Generate My AI Setup
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <p className="text-sm text-slate-300">
                    Built for teams who need technical clarity and implementation speed.
                  </p>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-slate-700/70 bg-slate-900/65 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Scan Scope</p>
                    <p className="mt-2 text-sm text-slate-200">Core pages + robots + sitemap + schema signals</p>
                  </div>
                  <div className="rounded-xl border border-slate-700/70 bg-slate-900/65 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Output Type</p>
                    <p className="mt-2 text-sm text-slate-200">Implementation-ready setup pack, not high-level commentary</p>
                  </div>
                  <div className="rounded-xl border border-slate-700/70 bg-slate-900/65 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Delivery</p>
                    <p className="mt-2 text-sm text-slate-200">Copy/export/download format for handoff and deployment</p>
                  </div>
                </div>
              </div>

              <Card className="border border-slate-700/80 bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-slate-950/95 p-6 shadow-2xl shadow-black/40 md:p-8">
                <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-orange-300">
                  <TerminalSquare className="h-4 w-4" />
                  What this engine does
                </p>
                <div className="mt-4 space-y-4">
                  {ENGINE_FLOW.map((item) => (
                    <div key={item.step} className="rounded-xl border border-slate-700/70 bg-slate-950/70 p-4">
                      <div className="flex items-center gap-3">
                        <span className="rounded-md border border-orange-400/40 bg-orange-500/15 px-2 py-1 text-xs font-semibold text-orange-200">
                          {item.step}
                        </span>
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.description}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </section>

          <section className="relative z-10 px-4 pb-10">
            <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-3">
              {TECHNICAL_CAPABILITIES.map((item) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={item.title}
                    className="border border-slate-700/80 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6"
                  >
                    <div className="inline-flex rounded-lg border border-orange-400/30 bg-orange-500/10 p-2">
                      <Icon className="h-5 w-5 text-orange-300" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.description}</p>
                  </Card>
                );
              })}
            </div>
          </section>

          <section className="relative z-10 px-4 pb-12">
            <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <Card className="border border-slate-700/80 bg-slate-900/80 p-6 md:p-8">
                <p className="text-xs uppercase tracking-[0.18em] text-orange-300">Technical Positioning</p>
                <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">
                  A setup platform for AI discovery clarity, not another reporting screen
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-300 md:text-base">
                  Most tools stop at scorecards. This workflow generates the exact pages, files, and implementation
                  instructions your team needs to improve machine understanding of your brand identity, services, and
                  authority signals.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-300 md:text-base">
                  The output is structured for execution: content blocks for the AI page, robots recommendations,
                  schema snippets, internal linking placements, and CMS-specific deployment instructions.
                </p>
              </Card>

              <Card className="border border-slate-700/80 bg-slate-900/80 p-6 md:p-8">
                <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-orange-300">
                  <ShieldCheck className="h-4 w-4" />
                  Delivery Standards
                </p>
                <ul className="mt-4 space-y-3 text-sm text-slate-200">
                  {ENTERPRISE_STANDARDS.map((item) => (
                    <li key={item} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </section>

          <section ref={inputRef} className="relative z-10 px-4 pb-12">
            <div className="mx-auto max-w-6xl">
              <Card className="border border-slate-700/80 bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-6 shadow-2xl shadow-black/40 md:p-8">
                <div className="mb-6 flex flex-col gap-2">
                  <p className="text-sm uppercase tracking-[0.2em] text-orange-300">Configuration Console</p>
                  <h2 className="text-3xl font-bold text-white">Build your AI setup pack</h2>
                  <p className="text-sm text-slate-300 md:text-base">
                    Provide your site context. We run the setup engine and return a deployment-ready pack your team can
                    copy, export, and implement immediately.
                  </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                  <div>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid gap-5 md:grid-cols-2">
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="website-url" className="text-slate-200">
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
                            className="h-12 border-slate-600 bg-slate-950/90 text-white placeholder:text-slate-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="brand-name" className="text-slate-200">
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
                            className="h-12 border-slate-600 bg-slate-950/90 text-white placeholder:text-slate-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="country" className="text-slate-200">
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
                            className="h-12 border-slate-600 bg-slate-950/90 text-white placeholder:text-slate-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-slate-200">
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
                          className="min-h-[110px] border-slate-600 bg-slate-950/90 text-white placeholder:text-slate-500"
                        />
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs text-slate-400">
                          Partial result handling is enabled when selected pages cannot be fetched.
                        </p>
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="h-12 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-8 font-semibold text-white hover:from-orange-400 hover:to-orange-500"
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
                      <div className="mt-5 rounded-xl border border-red-400/40 bg-red-950/40 p-4 text-sm text-red-200">
                        {apiError}
                      </div>
                    )}
                  </div>

                  <div className="rounded-2xl border border-slate-700/80 bg-slate-950/70 p-5">
                    <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-orange-300">
                      <Building2 className="h-4 w-4" />
                      Included in this run
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-slate-200">
                      {generatedAssetsList.map((item) => (
                        <li key={item} className="flex gap-2">
                          <Sparkles className="mt-0.5 h-4 w-4 text-blue-300" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 rounded-xl border border-slate-700 bg-slate-900/80 p-4 text-xs leading-relaxed text-slate-300">
                      Recommended output path for the primary asset: <span className="font-semibold text-white">/ai</span> or{' '}
                      <span className="font-semibold text-white">/ai-info</span>.
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {isLoading && (
            <section className="relative z-10 px-4 pb-14">
              <div className="mx-auto max-w-5xl rounded-2xl border border-slate-700/70 bg-slate-900/85 p-6 md:p-8">
                <p className="text-sm uppercase tracking-[0.2em] text-orange-300">Generating</p>
                <h3 className="mt-2 text-2xl font-bold text-white">Building your AI setup pack</h3>
                <div className="mt-6 space-y-3">
                  {LOADING_STEPS.map((step, index) => {
                    const isActive = index === loadingStepIndex;
                    const isComplete = index < loadingStepIndex;

                    return (
                      <div
                        key={step}
                        className={`rounded-xl border px-4 py-3 transition ${
                          isComplete
                            ? 'border-green-400/40 bg-green-500/10'
                            : isActive
                              ? 'border-orange-400/60 bg-orange-500/10'
                              : 'border-slate-700 bg-slate-950/65'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-medium text-slate-100">{step}</p>
                          {isComplete ? (
                            <CheckCircle2 className="h-4 w-4 text-green-300" />
                          ) : isActive ? (
                            <Loader2 className="h-4 w-4 animate-spin text-orange-300" />
                          ) : (
                            <div className="h-2 w-2 rounded-full bg-slate-500" />
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
                <Card className="border border-slate-700/70 bg-slate-900/85 p-6 md:p-8">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-orange-300">Setup Summary</p>
                      <h3 className="mt-2 text-2xl font-bold text-white md:text-3xl">{result.summary.headline}</h3>
                      <p className="mt-2 text-sm text-slate-300">
                        Scanned: <span className="font-medium text-slate-100">{result.site.normalizedUrl}</span>
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-700/80 bg-slate-950/70 px-4 py-3 text-sm text-slate-300">
                      <p>Generation mode: {result.meta.generationMode === 'openrouter' ? 'OpenRouter + Rules' : 'Rule-based fallback'}</p>
                      {result.meta.partial && <p className="mt-1 text-orange-200">Partial fetch completed, results still generated.</p>}
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border border-slate-700 bg-slate-950/70 p-4">
                      <p className="text-xs uppercase tracking-wider text-slate-400">What already exists</p>
                      <ul className="mt-3 space-y-2 text-sm text-slate-200">
                        {(result.summary.existingAssets.length > 0
                          ? result.summary.existingAssets
                          : ['No major setup assets detected yet.']).map((item) => (
                          <li key={item} className="flex gap-2">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-300" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-slate-700 bg-slate-950/70 p-4">
                      <p className="text-xs uppercase tracking-wider text-slate-400">What was missing</p>
                      <ul className="mt-3 space-y-2 text-sm text-slate-200">
                        {(result.summary.missingAssets.length > 0
                          ? result.summary.missingAssets
                          : ['No critical setup gaps found.']).map((item) => (
                          <li key={item} className="flex gap-2">
                            <Bot className="mt-0.5 h-4 w-4 text-orange-300" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-slate-700 bg-slate-950/70 p-4">
                      <p className="text-xs uppercase tracking-wider text-slate-400">What we generated</p>
                      <ul className="mt-3 space-y-2 text-sm text-slate-200">
                        {generatedAssetsList.map((item) => (
                          <li key={item} className="flex gap-2">
                            <Sparkles className="mt-0.5 h-4 w-4 text-blue-300" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-slate-700 bg-slate-950/70 p-4">
                      <p className="text-xs uppercase tracking-wider text-slate-400">What to do next</p>
                      <ul className="mt-3 space-y-2 text-sm text-slate-200">
                        {result.summary.recommendations.slice(0, 4).map((item) => (
                          <li key={item} className="flex gap-2">
                            <ArrowRight className="mt-0.5 h-4 w-4 text-orange-300" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>

                <Card className="border border-slate-700/70 bg-slate-900/85 p-6 md:p-8">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-orange-300">Output Tabs</p>
                      <h3 className="mt-2 text-2xl font-bold text-white">Implementation-ready setup assets</h3>
                    </div>
                    {!isUnlocked ? (
                      <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/40 bg-orange-500/10 px-4 py-2 text-xs text-orange-100">
                        <Lock className="h-3.5 w-3.5" />
                        Lead gate active: unlock to export full pack
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        <Button onClick={copyAll} size="sm" className="bg-slate-100 text-slate-900 hover:bg-white">
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
                        <Button onClick={downloadPack} size="sm" className="bg-orange-500 text-white hover:bg-orange-400">
                          <Download className="mr-2 h-4 w-4" />
                          Download Pack
                        </Button>
                        <Link href="/strategy-blueprint">
                          <Button size="sm" variant="outline" className="border-slate-500 bg-transparent text-white hover:bg-slate-800">
                            Book Strategy Call
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>

                  {!isUnlocked && (
                    <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-950/70 p-5">
                      <p className="text-sm font-semibold text-white">Unlock full export</p>
                      <p className="mt-1 text-sm text-slate-300">
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
                          className="h-11 border-slate-600 bg-slate-900 text-white placeholder:text-slate-400"
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
                          className="h-11 border-slate-600 bg-slate-900 text-white placeholder:text-slate-400"
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
                          className="h-11 border-slate-600 bg-slate-900 text-white placeholder:text-slate-400"
                        />
                      </div>
                      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        {leadError ? <p className="text-sm text-red-300">{leadError}</p> : <div />}
                        <Button
                          onClick={unlockResults}
                          className="h-11 bg-gradient-to-r from-orange-500 to-orange-600 px-6 text-white hover:from-orange-400 hover:to-orange-500"
                        >
                          Unlock Full Output
                        </Button>
                      </div>
                    </div>
                  )}

                  <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as OutputTabValue)} className="mt-8">
                    <TabsList className="grid h-auto w-full grid-cols-2 gap-2 rounded-xl bg-slate-950 p-2 md:grid-cols-3 lg:grid-cols-6">
                      {OUTPUT_TAB_ORDER.map((tab) => {
                        const Icon = tab.icon;
                        return (
                          <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            className="flex h-12 items-center justify-center gap-2 rounded-lg border border-transparent bg-slate-900/70 px-2 text-xs font-semibold text-slate-200 data-[state=active]:border-orange-400/60 data-[state=active]:bg-orange-500/20 data-[state=active]:text-white"
                          >
                            <Icon className="h-3.5 w-3.5" />
                            <span>{tab.label}</span>
                          </TabsTrigger>
                        );
                      })}
                    </TabsList>

                    <TabsContent value="aiInfoPage" className="mt-4">
                      <div className="rounded-xl border border-slate-700 bg-slate-950/70 p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <p className="text-sm font-semibold text-white">AI Info Page</p>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={!isUnlocked}
                            onClick={() => copyTab('aiInfoPage')}
                            className="border-slate-600 bg-transparent text-slate-100 hover:bg-slate-800"
                          >
                            {copiedKey === 'tab-aiInfoPage' ? 'Copied' : 'Copy'}
                          </Button>
                        </div>
                        <pre className="max-h-[520px] overflow-auto whitespace-pre-wrap rounded-lg bg-[#03050a] p-4 text-sm leading-relaxed text-slate-200">
                          {maskContent(result.assets.aiInfoPage, isUnlocked)}
                        </pre>
                      </div>
                    </TabsContent>

                    <TabsContent value="robotsTxt" className="mt-4">
                      <div className="rounded-xl border border-slate-700 bg-slate-950/70 p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <p className="text-sm font-semibold text-white">Recommended robots.txt</p>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={!isUnlocked}
                            onClick={() => copyTab('robotsTxt')}
                            className="border-slate-600 bg-transparent text-slate-100 hover:bg-slate-800"
                          >
                            {copiedKey === 'tab-robotsTxt' ? 'Copied' : 'Copy'}
                          </Button>
                        </div>
                        <pre className="max-h-[520px] overflow-auto rounded-lg bg-[#03050a] p-4 font-mono text-sm leading-relaxed text-emerald-200">
                          {maskContent(result.assets.robotsTxt, isUnlocked)}
                        </pre>
                      </div>
                    </TabsContent>

                    <TabsContent value="schema" className="mt-4">
                      <div className="rounded-xl border border-slate-700 bg-slate-950/70 p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <p className="text-sm font-semibold text-white">Schema Suggestions</p>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={!isUnlocked}
                            onClick={() => copyTab('schema')}
                            className="border-slate-600 bg-transparent text-slate-100 hover:bg-slate-800"
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
                            <div key={item.title} className="rounded-lg border border-slate-700 bg-[#03050a] p-3">
                              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-orange-300">{item.title}</p>
                              <pre className="max-h-[280px] overflow-auto whitespace-pre-wrap text-xs text-slate-200">
                                {maskContent(item.value, isUnlocked, 850)}
                              </pre>
                            </div>
                          ))}
                        </div>

                        {result.assets.schema.notes.length > 0 && (
                          <div className="mt-4 rounded-lg border border-slate-700 bg-[#03050a] p-3">
                            <p className="text-xs font-semibold uppercase tracking-wider text-orange-300">Schema Notes</p>
                            <ul className="mt-2 space-y-2 text-sm text-slate-200">
                              {result.assets.schema.notes.map((note) => (
                                <li key={note} className="flex gap-2">
                                  <ArrowRight className="mt-0.5 h-4 w-4 text-orange-300" />
                                  <span>{note}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="internalLinking" className="mt-4">
                      <div className="rounded-xl border border-slate-700 bg-slate-950/70 p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <p className="text-sm font-semibold text-white">Internal Linking Plan</p>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={!isUnlocked}
                            onClick={() => copyTab('internalLinking')}
                            className="border-slate-600 bg-transparent text-slate-100 hover:bg-slate-800"
                          >
                            {copiedKey === 'tab-internalLinking' ? 'Copied' : 'Copy'}
                          </Button>
                        </div>

                        <div className="space-y-3">
                          {result.assets.internalLinking.map((item, index) => (
                            <div
                              key={`${item.fromPage}-${index}`}
                              className="rounded-lg border border-slate-700 bg-[#03050a] p-4 text-sm text-slate-200"
                            >
                              <p className="font-semibold text-white">
                                {index + 1}. {item.fromPage}
                              </p>
                              <p className="mt-1">
                                <span className="text-slate-400">Anchor: </span>
                                <span className="text-orange-200">{item.anchorText}</span>
                              </p>
                              <p>
                                <span className="text-slate-400">Placement: </span>
                                {item.placement}
                              </p>
                              <p>
                                <span className="text-slate-400">Why: </span>
                                {item.reason}
                              </p>
                            </div>
                          ))}
                        </div>

                        {!isUnlocked && (
                          <p className="mt-3 text-xs text-slate-400">Unlock to copy/export the complete linking plan.</p>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="implementationGuide" className="mt-4">
                      <div className="rounded-xl border border-slate-700 bg-slate-950/70 p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <p className="text-sm font-semibold text-white">Implementation Guide</p>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={!isUnlocked}
                            onClick={() => copyTab('implementationGuide')}
                            className="border-slate-600 bg-transparent text-slate-100 hover:bg-slate-800"
                          >
                            {copiedKey === 'tab-implementationGuide' ? 'Copied' : 'Copy'}
                          </Button>
                        </div>

                        {isUnlocked ? (
                          renderGuideCards(result.assets.implementationGuide)
                        ) : (
                          <pre className="max-h-[520px] overflow-auto whitespace-pre-wrap rounded-lg bg-[#03050a] p-4 text-sm text-slate-200">
                            {maskContent(implementationGuideToText(result.assets.implementationGuide), false)}
                          </pre>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="optionalExtras" className="mt-4">
                      <div className="rounded-xl border border-slate-700 bg-slate-950/70 p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <p className="text-sm font-semibold text-white">Optional / Future-Facing Extras</p>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={!isUnlocked}
                            onClick={() => copyTab('optionalExtras')}
                            className="border-slate-600 bg-transparent text-slate-100 hover:bg-slate-800"
                          >
                            {copiedKey === 'tab-optionalExtras' ? 'Copied' : 'Copy'}
                          </Button>
                        </div>

                        <div className="grid gap-4 lg:grid-cols-2">
                          <div className="rounded-lg border border-slate-700 bg-[#03050a] p-3">
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-orange-300">llms.txt</p>
                            <pre className="max-h-[280px] overflow-auto whitespace-pre-wrap text-xs text-slate-200">
                              {maskContent(result.assets.optionalExtras.llmsTxt, isUnlocked, 900)}
                            </pre>
                          </div>
                          <div className="rounded-lg border border-slate-700 bg-[#03050a] p-3">
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-orange-300">agents.md</p>
                            <pre className="max-h-[280px] overflow-auto whitespace-pre-wrap text-xs text-slate-200">
                              {maskContent(result.assets.optionalExtras.agentsMd, isUnlocked, 900)}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </Card>

                <section className="rounded-2xl border border-orange-400/30 bg-gradient-to-r from-orange-500/20 via-slate-900 to-slate-900 p-7 md:p-10">
                  <p className="text-sm uppercase tracking-[0.2em] text-orange-200">Next Step Support</p>
                  <h3 className="mt-2 text-3xl font-bold text-white">Need help implementing this setup?</h3>
                  <p className="mt-3 max-w-3xl text-slate-200">
                    We can implement this pack for your team, validate rollout quality, and align your AI visibility setup
                    with your broader authority strategy.
                  </p>
                  <div className="mt-6 grid gap-3 md:grid-cols-3">
                    <div className="rounded-xl border border-slate-600/70 bg-slate-950/70 p-4 text-sm text-slate-200">
                      Implementation support
                    </div>
                    <div className="rounded-xl border border-slate-600/70 bg-slate-950/70 p-4 text-sm text-slate-200">
                      Strategy call + roadmap
                    </div>
                    <div className="rounded-xl border border-slate-600/70 bg-slate-950/70 p-4 text-sm text-slate-200">
                      Done-for-you AI visibility execution
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link href="/strategy-blueprint">
                      <Button className="bg-orange-500 text-white hover:bg-orange-400">Book Strategy Call</Button>
                    </Link>
                    <Button
                      variant="outline"
                      onClick={openForm}
                      className="border-slate-300 bg-transparent text-white hover:bg-slate-800"
                    >
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
