"use client";

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  Clipboard,
  ClipboardCheck,
  Download,
  FileCode2,
  FileText,
  Globe,
  Network,
  Rocket,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { readDeliverySession } from '@/lib/ai/delivery-session';
import type { AiSetupResponse, ImplementationGuide, InternalLinkSuggestion } from '@/lib/types/ai-setup';

const OUTPUT_TAB_ORDER = [
  { value: 'aiInfoPage', label: 'AI Info Page', icon: FileText },
  { value: 'robotsTxt', label: 'robots.txt', icon: FileCode2 },
  { value: 'schema', label: 'Schema', icon: Network },
  { value: 'internalLinking', label: 'Internal Linking', icon: Globe },
  { value: 'implementationGuide', label: 'Implementation Guide', icon: Rocket },
  { value: 'optionalExtras', label: 'Optional Extras', icon: Sparkles },
] as const;

type OutputTabValue = (typeof OUTPUT_TAB_ORDER)[number]['value'];

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
      tone: 'from-blue-50 via-white to-blue-100/60',
      badge: 'CMS',
    },
    {
      key: 'webflow',
      title: 'Webflow',
      steps: guide.webflow,
      tone: 'from-emerald-50 via-white to-emerald-100/60',
      badge: 'No-code',
    },
    {
      key: 'shopify',
      title: 'Shopify',
      steps: guide.shopify,
      tone: 'from-orange-50 via-white to-orange-100/60',
      badge: 'Ecommerce',
    },
    {
      key: 'customHtml',
      title: 'Custom HTML / Developer',
      steps: guide.customHtml,
      tone: 'from-slate-50 via-white to-slate-100/70',
      badge: 'Code',
    },
    {
      key: 'vibeCoded',
      title: 'Vibe-Coded Sites Prompt',
      steps: guide.vibeCoded ?? [],
      tone: 'from-violet-50 via-white to-fuchsia-100/50',
      badge: 'Prompt',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {cards.map((card) => (
        <div key={card.key} className={`rounded-2xl border border-slate-200 bg-gradient-to-br ${card.tone} p-4 shadow-sm`}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{card.badge}</p>
              <h4 className="mt-1 text-base font-bold text-slate-950">{card.title}</h4>
            </div>
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

          <div className="mt-4 space-y-2">
            {card.steps.map((step, index) => (
              <div key={`${card.key}-${index}`} className="rounded-xl border border-slate-200 bg-white/90 p-3 text-sm text-slate-700">
                <div className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[11px] font-semibold text-white">
                  {index + 1}
                </div>
                <p className="mt-2 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function DeliveryPackDashboardPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session') ?? '';
  const [result, setResult] = useState<AiSetupResponse | null>(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      setLoadError('No delivery session was provided.');
      return;
    }

    const sessionResult = readDeliverySession(sessionId);

    if (!sessionResult) {
      setLoading(false);
      setLoadError('This delivery session is missing or has expired. Generate a fresh setup pack and reopen the dashboard.');
      return;
    }

    setResult(sessionResult);
    setLoading(false);
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
                    <Button size="sm" variant="outline" onClick={() => void copyToClipboard(result.assets.aiInfoPage, 'tab-aiInfoPage')}>
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
                    <Button size="sm" variant="outline" onClick={() => void copyToClipboard(result.assets.robotsTxt, 'tab-robotsTxt')}>
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
                      onClick={() => void copyToClipboard(internalLinkingToText(result.assets.internalLinking), 'tab-internalLinking')}
                    >
                      {copiedKey === 'tab-internalLinking' ? 'Copied' : 'Copy'}
                    </Button>
                  </div>
                  {result.assets.internalLinking.map((item, index) => (
                    <div key={`${item.fromPage}-${index}`} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                      <p className="font-semibold text-slate-900">{index + 1}. {item.fromPage}</p>
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
                      onClick={() => void copyToClipboard(implementationGuideToText(result.assets.implementationGuide), 'tab-implementationGuide')}
                    >
                      {copiedKey === 'tab-implementationGuide' ? 'Copied' : 'Copy'}
                    </Button>
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
          <Card className="border border-red-300 bg-red-50 p-4 text-sm text-red-700">
            {loadError}
          </Card>
        )}
      </div>
    </div>
  );
}
