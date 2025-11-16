"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StatusLegend } from './StatusLegend';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Helper function to extract URL from markdown format [text](url)
const extractUrlFromMarkdown = (text: string): string => {
  const markdownLinkMatch = text.match(/\[.*?\]\((.*?)\)/);
  return markdownLinkMatch ? markdownLinkMatch[1] : text;
};

// Data types
interface Factor {
  factor: string;
  weight: number;
  applicable: boolean;
  value: number;
  reason: string;
}

interface SiteData {
  domain: string;
  score_10: number;
  applicable_weight_sum: number;
  factors: Factor[];
  citations: string[];
}

interface DetailedFactorAnalysisProps {
  siteA: SiteData;
  siteB: SiteData;
  gap: {
    score_diff: number;
    by_factor: Array<{
      factor: string;
      delta: number;
    }>;
  };
}

export const DetailedFactorAnalysis: React.FC<DetailedFactorAnalysisProps> = ({ siteA, siteB, gap }) => {
  // Normalize factors for consistent processing
  const normalizedFactors = useMemo(() => {
    // Get all unique factors from both sites
    const allFactors = new Set([
      ...siteA.factors.map(f => f.factor),
      ...siteB.factors.map(f => f.factor)
    ]);
    
    return Array.from(allFactors).map(factorName => {
      const factorA = siteA.factors.find(f => f.factor === factorName);
      const factorB = siteB.factors.find(f => f.factor === factorName);
      
      return {
        name: factorName,
        siteA: {
          score: factorA?.value || 0,
          reason: factorA?.reason || 'No data available',
          weight: factorA?.weight || 0,
        },
        siteB: {
          score: factorB?.value || 0,
          reason: factorB?.reason || 'No data available',
          weight: factorB?.weight || 0,
        },
      };
    });
  }, [siteA.factors, siteB.factors, gap.by_factor]);

  const getFactorStatus = (siteAScore: number, siteBScore: number) => {
    const diff = siteAScore - siteBScore;
    if (Math.abs(diff) < 0.1) return 'competitive';
    return diff > 0 ? 'ahead' : 'behind';
  };

  const formatFactorName = (name: string) => {
    return name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim();
  };

  if (!normalizedFactors.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Detailed Factor Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No detailed factor analysis available yet. The analysis is still processing or no factors were identified for comparison.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Factor Analysis</CardTitle>
        <p className="text-sm text-muted-foreground">
          Comprehensive breakdown of {normalizedFactors.length} factors comparing {siteA.domain} vs {siteB.domain}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <StatusLegend />
        
        <Accordion type="multiple" className="w-full space-y-4">
          {normalizedFactors.map((factor, index) => {
            const status = getFactorStatus(factor.siteA.score, factor.siteB.score);
            const scoreDiff = factor.siteA.score - factor.siteB.score;
            
            return (
              <AccordionItem key={factor.name} value={factor.name} className="border rounded-lg bg-gradient-to-r from-card/80 to-muted/20 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200">
                <AccordionTrigger className="px-4 sm:px-6 py-4 hover:no-underline">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-3 sm:gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 min-w-0">
                      <span className="font-medium text-foreground text-left truncate">
                        {formatFactorName(factor.name)}
                      </span>
                      <Badge 
                        variant={status === 'ahead' ? 'default' : status === 'behind' ? 'destructive' : 'secondary'}
                        className={`text-xs self-start sm:self-auto ${
                          status === 'ahead' ? 'bg-green-500/10 border-green-400/30 text-green-400' : 
                          status === 'behind' ? 'bg-red-500/10 border-red-400/30 text-red-400' : 
                          'bg-blue-500/10 border-blue-400/30 text-blue-400'
                        }`}
                      >
                        {status === 'ahead' ? '🟢 Ahead' : status === 'behind' ? '🔴 Behind' : '🟡 Competitive'}
                      </Badge>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        <span className="font-mono">
                          {siteA.domain}: {factor.siteA.score.toFixed(1)} • {siteB.domain}: {factor.siteB.score.toFixed(1)}
                        </span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="animate-pulse hover:animate-none bg-orange-500/10 hover:bg-orange-500/20 border-orange-400/50 text-orange-400 hover:text-orange-300 font-medium text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 whitespace-nowrap"
                      >
                        <span className="sm:hidden">📊 Details</span>
                        <span className="hidden sm:inline">📊 Click for more info</span>
                      </Button>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-6 pb-6">
                  <div className="space-y-6">
                    {/* Score Comparison */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground">Score Comparison</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-3 p-3 sm:p-4 rounded-lg bg-gradient-to-br from-green-50/50 to-green-100/30 border border-green-200/50">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium flex items-center gap-2 truncate">
                              🏢 {siteA.domain}
                            </span>
                            <span className="font-mono font-bold text-green-700 whitespace-nowrap">{factor.siteA.score.toFixed(1)}/1.0</span>
                          </div>
                          <Progress value={factor.siteA.score * 100} className="h-3 bg-green-100" />
                        </div>
                        <div className="space-y-3 p-3 sm:p-4 rounded-lg bg-gradient-to-br from-blue-50/50 to-blue-100/30 border border-blue-200/50">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium flex items-center gap-2 truncate">
                              🏢 {siteB.domain}
                            </span>
                            <span className="font-mono font-bold text-blue-700 whitespace-nowrap">{factor.siteB.score.toFixed(1)}/1.0</span>
                          </div>
                          <Progress value={factor.siteB.score * 100} className="h-3 bg-blue-100" />
                        </div>
                      </div>
                      <div className="text-center">
                        <Badge variant={scoreDiff > 0 ? 'default' : scoreDiff < 0 ? 'destructive' : 'secondary'}>
                          {scoreDiff > 0 ? '+' : ''}{scoreDiff.toFixed(1)} difference
                        </Badge>
                      </div>
                    </div>

                    {/* Analysis Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-medium text-foreground flex items-center gap-2">
                          📈 {siteA.domain} Analysis
                        </h4>
                        <div className="p-3 sm:p-4 rounded-lg bg-gradient-to-br from-green-50/80 to-green-100/50 border border-green-200">
                          <div className="text-xs sm:text-sm text-green-700 mb-2 font-medium break-words">
                            ⚖️ Weight: {factor.siteA.weight} • 🎯 Score: {factor.siteA.score.toFixed(1)}
                          </div>
                          <p className="text-xs sm:text-sm leading-relaxed text-green-800">{factor.siteA.reason}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-medium text-foreground flex items-center gap-2">
                          📊 {siteB.domain} Analysis
                        </h4>
                        <div className="p-3 sm:p-4 rounded-lg bg-gradient-to-br from-blue-50/80 to-blue-100/50 border border-blue-200">
                          <div className="text-xs sm:text-sm text-blue-700 mb-2 font-medium break-words">
                            ⚖️ Weight: {factor.siteB.weight} • 🎯 Score: {factor.siteB.score.toFixed(1)}
                          </div>
                          <p className="text-xs sm:text-sm leading-relaxed text-blue-800">{factor.siteB.reason}</p>
                        </div>
                      </div>
                    </div>

                    {/* Strategic Guidance */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground flex items-center gap-2">
                        💡 Strategic Recommendations
                      </h4>
                      <div className="p-4 rounded-lg bg-gradient-to-br from-amber-50/80 to-orange-50/50 border border-amber-200">
                        <p className="text-sm leading-relaxed">
                          {status === 'behind' && (
                            `Focus on improving ${formatFactorName(factor.name)} for ${siteA.domain}. ${
                              factor.name.includes('schema') ? 'Implement proper structured data markup to help search engines understand your content better.' :
                              factor.name.includes('gbp') || factor.name.includes('business') ? 'Create and optimize your Google Business Profile with complete information, photos, and regular updates.' :
                              factor.name.includes('leadership') || factor.name.includes('team') ? 'Add team member profiles and leadership information to build authority and trust.' :
                              factor.name.includes('citation') || factor.name.includes('mention') ? 'Work on getting more quality mentions and citations from authoritative sources in your industry.' :
                              'Focus on the specific recommendations in the analysis above.'
                            }`
                          )}
                          {status === 'ahead' && (
                            `${siteA.domain} is performing well in ${formatFactorName(factor.name)}. Maintain this advantage and consider leveraging this strength in other areas.`
                          )}
                          {status === 'competitive' && (
                            `Both sites are competitive in ${formatFactorName(factor.name)}. Small improvements here could provide a meaningful edge.`
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Citations */}
                    {(siteA.citations.length > 0 || siteB.citations.length > 0) && (
                      <div className="space-y-3">
                        <h4 className="font-medium text-foreground">Source Citations</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          {siteA.citations.length > 0 && (
                            <div>
                              <h5 className="text-sm font-medium mb-2">{siteA.domain} Sources</h5>
                              <div className="space-y-1">
                                {siteA.citations.slice(0, 3).map((citation, i) => {
                                  const cleanUrl = extractUrlFromMarkdown(citation);
                                  return (
                                    <a
                                      key={i}
                                      href={cleanUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="block text-xs text-primary hover:underline truncate"
                                    >
                                      {cleanUrl}
                                    </a>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                          {siteB.citations.length > 0 && (
                            <div>
                              <h5 className="text-sm font-medium mb-2">{siteB.domain} Sources</h5>
                              <div className="space-y-1">
                                {siteB.citations.slice(0, 3).map((citation, i) => {
                                  const cleanUrl = extractUrlFromMarkdown(citation);
                                  return (
                                    <a
                                      key={i}
                                      href={cleanUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="block text-xs text-primary hover:underline truncate"
                                    >
                                      {cleanUrl}
                                    </a>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
};