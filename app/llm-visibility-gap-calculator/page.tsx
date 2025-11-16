"use client";

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FormPopup } from '@/components/FormPopup';
import { useFormPopup } from '@/hooks/useFormPopup';
import { Bot, Sparkles, Zap, Search, TrendingUp, BarChart3, Brain, Activity, Network, Target, Eye, Shield, Cpu, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';
import { ComparisonCharts } from '@/components/audit/ComparisonCharts';
import { DetailedFactorAnalysis } from '@/components/audit/DetailedFactorAnalysis';
import { ResultsUnlockOverlay } from '@/components/calculator/ResultsUnlockOverlay';
import { FormSubmittedDialog } from '@/components/calculator/FormSubmittedDialog';
import { AccessCodeDialog } from '@/components/calculator/AccessCodeDialog';

interface BrandData {
  brand: string;
  url: string;
  spokesperson: string;
  role: string;
}

// Zod schemas for validation
const FactorSchema = z.object({
  factor: z.string(),
  weight: z.number(),
  applicable: z.boolean(),
  value: z.number(),
  reason: z.string()
});

const SiteResultSchema = z.object({
  domain: z.string(),
  score_10: z.number(),
  applicable_weight_sum: z.number(),
  factors: z.array(FactorSchema),
  citations: z.array(z.string())
});

const GapSchema = z.object({
  score_diff: z.number(),
  by_factor: z.array(z.object({
    factor: z.string(),
    delta: z.number()
  }))
});

const AnalysisResultSchema = z.object({
  siteA: SiteResultSchema,
  siteB: SiteResultSchema,
  gap: GapSchema
});

type AnalysisResult = z.infer<typeof AnalysisResultSchema>;

const LLMVisibilityGapCalculator = () => {
  const { isOpen, openForm, closeForm } = useFormPopup();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [webSearchPerformed, setWebSearchPerformed] = useState(false);
  const [citationsFromWeb, setCitationsFromWeb] = useState<Array<{url: string, title?: string}>>([]);
  const [executionTrace, setExecutionTrace] = useState<{
    model: string;
    pluginActive: boolean;
    annotationCount: number;
    timing: number;
  } | null>(null);
  
  const [isResultsLocked, setIsResultsLocked] = useState(true);
  const [showUnlockOverlay, setShowUnlockOverlay] = useState(false);
  const [showFormSubmittedDialog, setShowFormSubmittedDialog] = useState(false);
  const [showAccessCodeDialog, setShowAccessCodeDialog] = useState(false);
  const [yourBrand, setYourBrand] = useState<BrandData>({
    brand: '',
    url: '',
    spokesperson: '',
    role: ''
  });
  
  const [competitorBrand, setCompetitorBrand] = useState<BrandData>({
    brand: '',
    url: '',
    spokesperson: '',
    role: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!yourBrand.brand || !yourBrand.url || !competitorBrand.brand || !competitorBrand.url) {
      toast({
        title: "Missing Information",
        description: "Please fill in brand names and URLs for both brands.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setProgress(0);
    setResult(null);

    try {
      // More realistic progress simulation
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev < 25) return prev + 3;  // Slow start (3% every 800ms)
          if (prev < 50) return prev + 2;  // Medium pace (2% every 800ms) 
          if (prev < 75) return prev + 1;  // Slower pace (1% every 800ms)
          if (prev < 85) return prev + 0.5; // Very slow near end
          return prev; // Stop at 85% until API completes
        });
      }, 800);

      const payload = {
        siteA: {
          url: yourBrand.url,
          brand: yourBrand.brand || undefined,
          personName: yourBrand.spokesperson || undefined,
          personRole: yourBrand.role || undefined
        },
        siteB: {
          url: competitorBrand.url,
          brand: competitorBrand.brand || undefined,
          personName: competitorBrand.spokesperson || undefined,
          personRole: competitorBrand.role || undefined
        }
      };

      const startTime = Date.now();
      const { data, error } = await supabase.functions.invoke('llm-visibility-run-analysis', {
        body: payload
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (error) throw error;

      console.log('Raw response from edge function:', data);

      // Provider or parsing error passthrough from edge function
      if (data?.ok === false) {
        throw new Error(data.error || (data.providerError ? JSON.stringify(data.providerError) : 'Provider error'));
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (!data || (!data.data && !data.siteA)) {
        throw new Error('No valid data received from analysis function');
      }

      // Check if response has the expected structure
      const analysisData = data?.data || data;
      console.log('Analysis data to validate:', analysisData);
      
      // Extract web search info and execution trace
      const timing = Date.now() - startTime;
      const wsFlag = (data.webSearchPerformed ?? analysisData?.webSearchPerformed) || false;
      const cites = (data.citationsFromWeb ?? analysisData?.citationsFromWeb) || [];
      setWebSearchPerformed(wsFlag);
      setCitationsFromWeb(cites);
      setExecutionTrace({
        model: 'perplexity/sonar-pro',
        pluginActive: true, // Sonar Pro inherently performs live search
        annotationCount: cites.length,
        timing
      });

      // Validate response with Zod
      const validatedResult = AnalysisResultSchema.parse(analysisData);
      setResult(validatedResult);
      setProgress(100);
      
      // Show unlock overlay when results are ready
      setIsResultsLocked(true);
      setShowUnlockOverlay(true);
      
      toast({
        title: "Analysis Complete",
        description: "Fill out the form to unlock your results.",
      });
    } catch (error) {
      console.error('Error analyzing visibility gap:', error);
      if (error instanceof z.ZodError) {
        toast({
          title: "Analysis Failed",
          description: "Invalid response format received. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Analysis Failed",
          description: "Failed to analyze visibility gap. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
      setTimeout(() => setProgress(0), 2000);
    }
  };

  // Helper function to extract URL from markdown format [text](url)
  const extractUrlFromMarkdown = (text: string): string => {
    const markdownLinkMatch = text.match(/\[.*?\]\((.*?)\)/);
    return markdownLinkMatch ? markdownLinkMatch[1] : text;
  };

  const renderScoreCard = (
    title: string,
    siteData: AnalysisResult['siteA'] | AnalysisResult['siteB'],
    bgColor: string,
    textColor: string
  ) => {
    // Merge citations from site data and web citations
    const allCitations = [
      ...siteData.citations.map(extractUrlFromMarkdown),
      ...citationsFromWeb.map(c => extractUrlFromMarkdown(c.url))
    ].filter((url, index, self) => self.indexOf(url) === index); // Remove duplicates

    return (
      <div className={`${bgColor} p-6 rounded-lg backdrop-blur-sm border border-white/10`}>
        <h3 className={`${textColor} text-xl font-bold mb-4`}>{title}</h3>
        <div className="mb-4">
          <div className={`${textColor} text-3xl font-mono mb-2`}>
            {siteData.score_10.toFixed(1)}/10
          </div>
          <div className="text-white/60 text-sm font-mono">
            {siteData.domain}
          </div>
        </div>
        <div className="space-y-2 mb-4">
          {siteData.factors.filter(f => f.applicable).map((factor) => (
            <div key={factor.factor} className="flex justify-between text-sm">
              <span className="text-white/80 text-xs flex-1 pr-2">
                {factor.factor}
              </span>
              <span className={`${textColor} font-mono min-w-[3rem] text-right`}>
                {factor.value.toFixed(1)}/{factor.weight}
              </span>
            </div>
          ))}
        </div>
        {allCitations.length > 0 && (
          <div className="border-t border-white/10 pt-3">
            <div className="text-white/60 text-xs mb-2">Sources ({allCitations.length}):</div>
            <div className="space-y-1">
              {allCitations.slice(0, 3).map((citation, idx) => (
                <a
                  key={idx}
                  href={citation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-xs block truncate"
                >
                  {citation}
                </a>
              ))}
              {allCitations.length > 3 && (
                <div className="text-white/40 text-xs">
                  +{allCitations.length - 3} more sources
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>AI Visibility Gap Calculator | TotalAuthority</title>
        <meta 
          name="description" 
          content="Compare your brand's AI visibility against competitors. Get detailed gap analysis and recommendations to improve your AI search presence." 
        />
        <meta name="keywords" content="LLM visibility, brand comparison, AI search analysis, competitor analysis" />
        <link rel="canonical" href="https://totalauthority.io/llm-visibility-gap-calculator" />
      </Helmet>

      <div className="min-h-screen bg-beige dark:bg-beige-dark relative overflow-hidden">
        <Header onOpenForm={openForm} />
        
        {/* Subtle beige glow background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,hsl(var(--beige-accent)/0.35)_0%,transparent_60%)]" />
        </div>



        <main className="relative z-20">
          <div className="container mx-auto px-4 py-8">
            {/* Calculator Header */}
            <div className="text-center mb-12 relative">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="inline-flex items-center space-x-3 bg-beige-accent/40 border border-orange/30 rounded-lg px-6 py-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                  <span className="text-foreground font-mono font-bold text-sm tracking-wider">DIGITAL CALCULATOR</span>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                </div>
                
                {/* Web Search Status Badge */}
                {executionTrace && (
                  <Badge 
                    variant="outline" 
                    className="bg-green-500/10 border-green-400/30 text-green-400 font-mono text-xs"
                  >
                    <Search className="w-3 h-3 mr-1" />
                    Web search: {executionTrace.pluginActive ? 'ON' : 'OFF'} ({executionTrace.annotationCount} sources)
                  </Badge>
                )}
                
                {/* Small CALC READY display next to badge */}
                <div className="pointer-events-none">
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-green-600 rounded blur opacity-75 animate-pulse"></div>
                    <div className="relative bg-black/90 border border-green-400 rounded px-3 py-2 backdrop-blur-sm shadow-lg shadow-green-400/20">
                      <div className="text-green-400 font-mono text-xs flex items-center">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping mr-2"></div>
                        {isLoading ? `${progress}%` : 'CALC READY'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold font-mono mb-6">
                <span className="text-foreground">LLM VISIBILITY</span>
                <span className="block mt-2 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                  GAP CALCULATOR
                </span>
              </h1>
              
              <div className="bg-beige border border-foreground/20 rounded-lg p-4 max-w-2xl mx-auto">
                <p className="text-orange font-mono text-sm mb-2">INPUT PARAMETERS</p>
                <p className="text-foreground/80 text-sm">
                  Enter brand data → AI processing → Visibility scores & gap analysis
                </p>
              </div>
            </div>

            {/* Methodology Explanation */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="relative">
                <div className="relative bg-beige border border-foreground/20 rounded-lg p-8 shadow-lg">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange via-orange to-orange rounded-lg flex items-center justify-center flex-shrink-0">
                      <Brain className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-3 font-mono">HOW WE DISCOVER YOUR LLM VISIBILITY GAP</h2>
                      <p className="text-foreground/80 leading-relaxed text-lg">
                        Our AI Visibility Gap Calculator is built on insights from <span className="text-orange font-semibold">thousands of LLM visibility audits</span> we've conducted across different industries. From that research we identified the signals that matter most for how brands are recognised in <span className="text-blue font-semibold">AI-powered search</span>, and we built a weighting system to reflect their real-world impact. Factors like schema markup, knowledge panel presence, Google Business Profile signals, high-authority media citations, and author credibility are scored and weighted, then combined into a clear <span className="text-orange font-semibold">0–10 score</span>. The result is a <span className="text-blue font-semibold">side-by-side comparison</span> of your brand and a competitor, showing both the overall gap and the specific areas where visibility gains are possible.
                      </p>
                    </div>
                  </div>

                  {/* Collapsible Technical Details */}
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="methodology" className="border-foreground/20">
                      <AccordionTrigger className="text-foreground hover:text-orange font-mono text-lg py-4">
                        <div className="flex items-center space-x-3">
                          <span>VIEW DETAILED METHODOLOGY</span>
                          <div className="w-2 h-2 bg-orange rounded-full animate-pulse"></div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-6">
                        <div className="space-y-12">
                          
                          {/* Data Sources and Collection */}
                          <div className="space-y-6">
                            <div className="flex items-center space-x-4 mb-6">
                              <div className="w-10 h-10 bg-blue rounded-lg flex items-center justify-center">
                                <Search className="w-6 h-6 text-white" />
                              </div>
                              <h3 className="text-xl font-bold text-blue font-mono">DATA SOURCES AND COLLECTION</h3>
                            </div>
                            
                            <div className="bg-beige-dark border border-blue/30 rounded-lg p-6">
                              <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                  <div className="flex items-start space-x-3">
                                    <div className="w-3 h-3 bg-blue rounded-full mt-1 animate-pulse"></div>
                                    <div>
                                      <div className="text-blue font-semibold mb-1">Inputs</div>
                                      <div className="text-sm text-foreground/80">Brand A URL and Brand B URL. Optional: brand names and spokesperson name/role.</div>
                                    </div>
                                  </div>
                                  <div className="flex items-start space-x-3">
                                    <div className="w-3 h-3 bg-blue rounded-full mt-1 animate-pulse"></div>
                                    <div>
                                      <div className="text-blue font-semibold mb-1">On-site Crawl (Lightweight)</div>
                                      <div className="text-sm text-foreground/80">Homepage → About/Team → Press/Media → one recent Blog/News article → Contact. We extract JSON-LD, NAP details, bylines/bios, and technical basics (HTTPS, robots.txt, sitemap).</div>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-4">
                                  <div className="flex items-start space-x-3">
                                    <div className="w-3 h-3 bg-blue rounded-full mt-1 animate-pulse"></div>
                                    <div>
                                      <div className="text-blue font-semibold mb-1">Web Lookups</div>
                                      <div className="text-sm text-foreground/80">3–6 targeted queries per brand to confirm Google Business Profile presence, Knowledge Panel/Wikipedia/Wikidata, and Tier-1/Tier-2 media citations. External claims are returned with citations.</div>
                                    </div>
                                  </div>
                                  <div className="flex items-start space-x-3">
                                    <div className="w-3 h-3 bg-blue rounded-full mt-1 animate-pulse"></div>
                                    <div>
                                      <div className="text-blue font-semibold mb-1">Model</div>
                                      <div className="text-sm text-foreground/80">Claude 3.5 Haiku via OpenRouter. It evaluates the inputs, applies the scoring rubric, and produces structured JSON.</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* What We Evaluate (Scoring Rubric) */}
                          <div className="space-y-6">
                            <div className="flex items-center space-x-4 mb-6">
                              <div className="w-10 h-10 bg-orange rounded-lg flex items-center justify-center">
                                <BarChart3 className="w-6 h-6 text-white" />
                              </div>
                              <h3 className="text-xl font-bold text-orange font-mono">WHAT WE EVALUATE (SCORING RUBRIC)</h3>
                            </div>
                            
                            <div className="bg-beige-dark border border-orange/30 rounded-lg p-6">
                              <div className="text-sm text-foreground/70 mb-6">Each factor is scored 0, 0.5, or 1.0 from evidence we can verify on site or via citations.</div>
                              
                              <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                  <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                      <div className="text-orange font-semibold">Organization/LocalBusiness schema validity</div>
                                      <div className="text-xs text-foreground/60 mt-1">JSON-LD with Organization/LocalBusiness including name, url, logo, sameAs.</div>
                                    </div>
                                    <div className="text-orange font-mono text-lg font-bold ml-4">(18)</div>
                                  </div>
                                  <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                      <div className="text-orange font-semibold">sameAs coverage to authoritative profiles</div>
                                      <div className="text-xs text-foreground/60 mt-1">LinkedIn, YouTube, Wikipedia/Wikidata, Crunchbase or similar.</div>
                                    </div>
                                    <div className="text-orange font-mono text-lg font-bold ml-4">(12)</div>
                                  </div>
                                  <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                      <div className="text-orange font-semibold">Google Business Profile signals</div>
                                      <div className="text-xs text-foreground/60 mt-1">NAP, hours, Maps/GBP links, or LocalBusiness fields, corroborated in search.</div>
                                    </div>
                                    <div className="text-orange font-mono text-lg font-bold ml-4">(10)</div>
                                  </div>
                                  <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                      <div className="text-orange font-semibold">Knowledge Panel presence or strong evidence</div>
                                      <div className="text-xs text-foreground/60 mt-1">Panel detected, or strong precursors such as org schema + reputable sameAs.</div>
                                    </div>
                                    <div className="text-orange font-mono text-lg font-bold ml-4">(10)</div>
                                  </div>
                                </div>
                                <div className="space-y-4">
                                  <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                      <div className="text-orange font-semibold">Tier-1/Tier-2 citations</div>
                                      <div className="text-xs text-foreground/60 mt-1">"As seen in"/Press pages validated by external sources; national or high-authority industry outlets score highest.</div>
                                    </div>
                                    <div className="text-orange font-mono text-lg font-bold ml-4">(15)</div>
                                  </div>
                                  <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                      <div className="text-orange font-semibold">E-E-A-T cues</div>
                                      <div className="text-xs text-foreground/60 mt-1">Named authors, real bios, contact and policy pages visible.</div>
                                    </div>
                                    <div className="text-orange font-mono text-lg font-bold ml-4">(12)</div>
                                  </div>
                                  <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                      <div className="text-orange font-semibold">Content schema on a sample article</div>
                                      <div className="text-xs text-foreground/60 mt-1">Valid Article and, where present, FAQPage/HowTo.</div>
                                    </div>
                                    <div className="text-orange font-mono text-lg font-bold ml-4">(7)</div>
                                  </div>
                                  <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                      <div className="text-orange font-semibold">Technical trust basics</div>
                                      <div className="text-xs text-foreground/60 mt-1">HTTPS valid, robots.txt, sitemap, no obvious noindex on core pages.</div>
                                    </div>
                                    <div className="text-orange font-mono text-lg font-bold ml-4">(8)</div>
                                  </div>
                                  <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                      <div className="text-orange font-semibold">Spokesperson entity signals (optional)</div>
                                      <div className="text-xs text-foreground/60 mt-1">Only applied if a spokesperson is provided or discoverable: Team/About page and Person schema with worksFor and credible sameAs.</div>
                                    </div>
                                    <div className="text-orange font-mono text-lg font-bold ml-4">(8)</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Weighting and Calculation */}
                          <div className="space-y-6">
                            <div className="flex items-center space-x-4 mb-6">
                              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                                <Brain className="w-6 h-6 text-white" />
                              </div>
                              <h3 className="text-xl font-bold text-green-400 font-mono">WEIGHTING AND CALCULATION</h3>
                            </div>
                            
                            <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-green-400/30 rounded-lg p-6">
                              <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                  <div>
                                    <div className="text-green-300 font-semibold mb-2">Why these weights</div>
                                    <div className="text-sm text-slate-300">Derived from thousands of visibility audits and tuned to reflect observed impact on entity recognition and branded retrieval in AI-powered results.</div>
                                  </div>
                                  <div>
                                    <div className="text-green-300 font-semibold mb-2">Normalisation</div>
                                    <div className="text-sm text-slate-300 space-y-1">
                                      <div className="font-mono bg-black/40 p-2 rounded text-xs">applicable_weight_sum = sum(weights where factor applies)</div>
                                      <div className="font-mono bg-black/40 p-2 rounded text-xs">weighted_score = Σ(value × weight)</div>
                                      <div className="font-mono bg-black/40 p-2 rounded text-xs">score_10 = (weighted_score / applicable_weight_sum) × 10</div>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-4">
                                  <div>
                                    <div className="text-green-300 font-semibold mb-2">Gap reporting</div>
                                    <div className="text-sm text-slate-300">
                                      <div className="mb-2">Overall gap = Competitor score − Your score.</div>
                                      <div>By-factor deltas show exactly where one brand leads.</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Guardrails and Limits */}
                          <div className="space-y-6">
                            <div className="flex items-center space-x-4 mb-6">
                              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <Shield className="w-6 h-6 text-white" />
                              </div>
                              <h3 className="text-xl font-bold text-purple-400 font-mono">GUARDRAILS AND LIMITS</h3>
                            </div>
                            
                            <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-purple-400/30 rounded-lg p-6">
                              <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                  <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                                    <div>
                                      <span className="text-purple-300 font-semibold">Fetch cap:</span>
                                      <span className="text-slate-300 text-sm ml-2">Up to 5 on-site pages per brand; one recent article sampled.</span>
                                    </div>
                                  </div>
                                  <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                                    <div>
                                      <span className="text-purple-300 font-semibold">Search cap:</span>
                                      <span className="text-slate-300 text-sm ml-2">Up to 6 web queries per brand.</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-3">
                                  <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                                    <div>
                                      <span className="text-purple-300 font-semibold">Evidence rule:</span>
                                      <span className="text-slate-300 text-sm ml-2">If a claim cannot be verified from crawl or citations, the factor scores 0 with a short reason.</span>
                                    </div>
                                  </div>
                                  <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                                    <div>
                                      <span className="text-purple-300 font-semibold">Scope:</span>
                                      <span className="text-slate-300 text-sm ml-2">This is a targeted audit designed for speed and decision-ready signals, not a full crawl.</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Outputs You'll See */}
                          <div className="space-y-6">
                            <div className="flex items-center space-x-4 mb-6">
                              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center">
                                <Eye className="w-6 h-6 text-white" />
                              </div>
                              <h3 className="text-xl font-bold text-cyan-400 font-mono">OUTPUTS YOU'LL SEE</h3>
                            </div>
                            
                            <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-cyan-400/30 rounded-lg p-6">
                              <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                  <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                                    <div className="text-sm text-slate-300">A score out of 10 for each brand.</div>
                                  </div>
                                  <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                                    <div className="text-sm text-slate-300">A gap card showing the difference.</div>
                                  </div>
                                </div>
                                <div className="space-y-3">
                                  <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                                    <div className="text-sm text-slate-300">A factor table with both scores and per-factor deltas.</div>
                                  </div>
                                  <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                                    <div className="text-sm text-slate-300">A sources list linking to the evidence used.</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Bottom stats bar */}
                          <div className="mt-8 pt-6 border-t border-white/10">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-orange-400 font-mono">5 pages</div>
                                <div className="text-xs text-slate-400 font-mono">MAX CRAWL DEPTH</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-blue-400 font-mono">6 queries</div>
                                <div className="text-xs text-slate-400 font-mono">SEARCH LIMIT</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-green-400 font-mono">0-1.0</div>
                                <div className="text-xs text-slate-400 font-mono">FACTOR SCORING</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-purple-400 font-mono">JSON</div>
                                <div className="text-xs text-slate-400 font-mono">OUTPUT FORMAT</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>

            {/* Calculator Form Section */}
            <div className="max-w-6xl mx-auto mb-16">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Your Brand - Clean Beige Style */}
                  <div className="relative">
                    <div className="bg-beige-dark border-2 border-orange/50 p-8 rounded-lg shadow-lg">
                      {/* Calculator Display Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-orange rounded-lg flex items-center justify-center">
                            <Zap className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-foreground font-mono">YOUR BRAND</h3>
                            <div className="text-xs text-orange font-mono">PARAM_A</div>
                          </div>
                        </div>
                        <div className="bg-beige border border-orange/30 rounded px-3 py-1">
                          <span className="text-orange font-mono text-xs">INPUT</span>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="your-brand" className="text-foreground font-mono text-sm tracking-wide">BRAND_NAME</Label>
                          <div className="relative">
                            <Input
                              id="your-brand"
                              value={yourBrand.brand}
                              onChange={(e) => setYourBrand({...yourBrand, brand: e.target.value})}
                              placeholder="Enter brand name"
                              required
                              className="bg-beige border-2 border-orange/40 text-foreground placeholder:text-muted-foreground focus:border-orange focus:ring-orange/20 font-mono h-12"
                            />
                            <div className="absolute right-3 top-3 w-2 h-2 bg-orange rounded-full animate-pulse"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="your-url" className="text-foreground font-mono text-sm tracking-wide">URL_ADDR</Label>
                          <div className="relative">
                            <Input
                              id="your-url"
                              type="url"
                              value={yourBrand.url}
                              onChange={(e) => setYourBrand({...yourBrand, url: e.target.value})}
                              placeholder="https://yourbrand.com"
                              required
                              className="bg-beige border-2 border-orange/40 text-foreground placeholder:text-muted-foreground focus:border-orange focus:ring-orange/20 font-mono h-12"
                            />
                            <div className="absolute right-3 top-3 w-2 h-2 bg-orange rounded-full animate-pulse"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="your-spokesperson" className="text-foreground font-mono text-sm tracking-wide">SPOKESPERSON</Label>
                          <Input
                            id="your-spokesperson"
                            value={yourBrand.spokesperson}
                            onChange={(e) => setYourBrand({...yourBrand, spokesperson: e.target.value})}
                            placeholder="Optional field"
                            className="bg-beige border-2 border-orange/40 text-foreground placeholder:text-muted-foreground focus:border-orange focus:ring-orange/20 font-mono h-12"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="your-role" className="text-foreground font-mono text-sm tracking-wide">ROLE_TITLE</Label>
                          <Input
                            id="your-role"
                            value={yourBrand.role}
                            onChange={(e) => setYourBrand({...yourBrand, role: e.target.value})}
                            placeholder="Optional field"
                            className="bg-beige border-2 border-orange/40 text-foreground placeholder:text-muted-foreground focus:border-orange focus:ring-orange/20 font-mono h-12 px-4 py-3"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Competitor Brand - Clean Blue Style */}
                  <div className="relative">
                    <div className="bg-beige-dark border-2 border-blue/50 p-8 rounded-lg shadow-lg">
                      {/* Calculator Display Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue rounded-lg flex items-center justify-center">
                            <Search className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-foreground font-mono">COMPETITOR</h3>
                            <div className="text-xs text-blue font-mono">PARAM_B</div>
                          </div>
                        </div>
                        <div className="bg-beige border border-blue/30 rounded px-3 py-1">
                          <span className="text-blue font-mono text-xs">INPUT</span>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="competitor-brand" className="text-foreground font-mono text-sm tracking-wide">BRAND_NAME</Label>
                          <div className="relative">
                            <Input
                              id="competitor-brand"
                              value={competitorBrand.brand}
                              onChange={(e) => setCompetitorBrand({...competitorBrand, brand: e.target.value})}
                              placeholder="Enter competitor name"
                              required
                              className="bg-beige border-2 border-blue/40 text-foreground placeholder:text-muted-foreground focus:border-blue focus:ring-blue/20 font-mono h-12"
                            />
                            <div className="absolute right-3 top-3 w-2 h-2 bg-blue rounded-full animate-pulse"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="competitor-url" className="text-foreground font-mono text-sm tracking-wide">URL_ADDR</Label>
                          <div className="relative">
                            <Input
                              id="competitor-url"
                              type="url"
                              value={competitorBrand.url}
                              onChange={(e) => setCompetitorBrand({...competitorBrand, url: e.target.value})}
                              placeholder="https://competitor.com"
                              required
                              className="bg-beige border-2 border-blue/40 text-foreground placeholder:text-muted-foreground focus:border-blue focus:ring-blue/20 font-mono h-12"
                            />
                            <div className="absolute right-3 top-3 w-2 h-2 bg-blue rounded-full animate-pulse"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="competitor-spokesperson" className="text-foreground font-mono text-sm tracking-wide">SPOKESPERSON</Label>
                          <Input
                            id="competitor-spokesperson"
                            value={competitorBrand.spokesperson}
                            onChange={(e) => setCompetitorBrand({...competitorBrand, spokesperson: e.target.value})}
                            placeholder="Optional field"
                            className="bg-beige border-2 border-blue/40 text-foreground placeholder:text-muted-foreground focus:border-blue focus:ring-blue/20 font-mono h-12"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="competitor-role" className="text-foreground font-mono text-sm tracking-wide">ROLE_TITLE</Label>
                          <Input
                            id="competitor-role"
                            value={competitorBrand.role}
                            onChange={(e) => setCompetitorBrand({...competitorBrand, role: e.target.value})}
                            placeholder="Optional field"
                            className="bg-beige border-2 border-blue/40 text-foreground placeholder:text-muted-foreground focus:border-blue focus:ring-blue/20 font-mono h-12 px-4 py-3"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Calculator Execute Button */}
                <div className="text-center">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="relative bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-mono text-lg px-12 py-6 rounded-lg border-2 border-orange-400 shadow-lg hover:shadow-orange-500/25 transition-all duration-300 min-w-64"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>CALCULATING... {progress}%</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <Activity className="w-6 h-6" />
                        <span>EXECUTE CALCULATION</span>
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </div>

            {/* Analysis Results */}
            {result && (
              <div className={`max-w-7xl mx-auto space-y-8 relative transition-all duration-500 ${
                isResultsLocked ? 'filter blur-[8px] grayscale-[0.3] pointer-events-none select-none' : ''
              }`}>
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-bold font-mono mb-6">
                    <span className="text-green-400">ANALYSIS</span>
                    <span className="block mt-2 bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
                      COMPLETE
                    </span>
                  </h2>
                  <div className="inline-flex items-center gap-4 bg-black/50 border border-green-400/30 rounded-lg px-6 py-3 backdrop-blur-sm">
                    <div className="text-white font-mono">
                      Visibility Gap: <span className={`font-bold ${
                        result.siteA.score_10 > result.siteB.score_10 ? 'text-green-400' : 
                        Math.abs(result.siteA.score_10 - result.siteB.score_10) > 2 ? 'text-red-400' : 
                        Math.abs(result.siteA.score_10 - result.siteB.score_10) > 1 ? 'text-orange-400' : 'text-green-400'
                      }`}>
                        {Math.abs(result.siteA.score_10 - result.siteB.score_10).toFixed(1)} points
                      </span>
                    </div>
                    <div className="text-white/60 text-sm">
                      {result.siteA.score_10 > result.siteB.score_10 ? 'You are ahead' : result.siteA.score_10 < result.siteB.score_10 ? 'You are behind' : 'Tied performance'}
                    </div>
                  </div>
                </div>

                <ComparisonCharts 
                  siteA={result.siteA as any}
                  siteB={result.siteB as any}
                  gap={result.gap as any}
                />

                <DetailedFactorAnalysis 
                  siteA={result.siteA as any}
                  siteB={result.siteB as any}
                  gap={result.gap as any}
                />

                {/* Execution Trace Panel */}
                {executionTrace && (
                  <div className="max-w-4xl mx-auto">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="execution-trace" className="border-white/10">
                        <AccordionTrigger className="text-green-400 hover:text-green-300 font-mono text-lg py-4 hover:bg-green-500/5 transition-colors duration-200 border border-green-400/20 rounded-lg px-4">
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center space-x-3">
                              <Cpu className="w-5 h-5" />
                              <span>EXECUTION TRACE</span>
                              <Badge 
                                variant="outline" 
                                className="bg-green-500/10 border-green-400/30 text-green-400 font-mono text-xs"
                              >
                                {executionTrace.timing}ms
                              </Badge>
                            </div>
                            <div className="text-xs text-green-400/60 font-mono animate-pulse">▼ Click to expand</div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-6">
                          <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-green-400/30 rounded-lg p-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-green-400 font-mono">Sonar Pro</div>
                                <div className="text-xs text-slate-400 font-mono">AI MODEL</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-green-400 font-mono">Performed</div>
                                <div className="text-xs text-slate-400 font-mono">LIVE SEARCH</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-blue-400 font-mono">{executionTrace.annotationCount}</div>
                                <div className="text-xs text-slate-400 font-mono">CITATIONS</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-orange-400 font-mono">{(executionTrace.timing / 1000).toFixed(1)}s</div>
                                <div className="text-xs text-slate-400 font-mono">RESPONSE TIME</div>
                              </div>
                            </div>
                            
                            {citationsFromWeb.length > 0 && (
                              <div className="mt-6 pt-6 border-t border-white/10">
                                <div className="text-green-400 font-mono text-sm mb-3">WEB SEARCH CITATIONS:</div>
                                <div className="grid md:grid-cols-2 gap-2">
                                  {citationsFromWeb.map((citation, idx) => {
                                    const url = extractUrlFromMarkdown(citation.url);
                                    return (
                                      <a
                                        key={idx}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:text-blue-300 text-xs block truncate p-2 bg-black/40 rounded border border-blue-400/20"
                                        title={url}
                                      >
                                        {url}
                                      </a>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>

        <Footer onOpenForm={openForm} />
        <FormPopup isOpen={isOpen} onClose={closeForm} />
        
        {/* Unlock Flow Components */}
        {showUnlockOverlay && (
          <ResultsUnlockOverlay
            onFormSubmitted={() => {
              setShowUnlockOverlay(false);
              setShowAccessCodeDialog(true);
            }}
          />
        )}

        <FormSubmittedDialog
          isOpen={showFormSubmittedDialog}
          onEnterCode={() => {
            setShowFormSubmittedDialog(false);
            setShowAccessCodeDialog(true);
          }}
        />
        
        <AccessCodeDialog
          isOpen={showAccessCodeDialog}
          onClose={() => setShowAccessCodeDialog(false)}
          onCorrectCode={() => {
            setShowAccessCodeDialog(false);
            setIsResultsLocked(false);
          }}
        />
      </div>
    </>
  );
};

export default LLMVisibilityGapCalculator;