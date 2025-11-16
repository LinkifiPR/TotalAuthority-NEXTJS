"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus, Target, Zap } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';

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

interface GapData {
  score_diff: number;
  by_factor: Array<{
    factor: string;
    delta: number;
  }>;
}

interface ComparisonChartsProps {
  siteA: SiteData;
  siteB: SiteData;
  gap: GapData;
}

const COLORS = {
  siteA: 'hsl(var(--orange))',
  siteB: 'hsl(var(--blue))', 
  positive: 'hsl(var(--green))',
  negative: 'hsl(var(--red))',
  neutral: 'hsl(var(--muted-foreground))'
};

const ScoreDonut: React.FC<{ value10: number; color: string; subtitle?: string; }> = ({ value10, color, subtitle }) => {
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(10, value10)) / 10;
  return (
    <div className="relative w-28 h-28 mx-auto mb-6">
      <svg className="w-full h-full transform -rotate-90">
        <circle cx="56" cy="56" r={radius} stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
        <circle
          cx="56"
          cy="56"
          r={radius}
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeDasharray={`${progress * circumference} ${circumference}`}
          className="transition-all duration-1000 ease-out drop-shadow-lg"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <div>
          <div className="text-3xl font-bold text-white">{value10.toFixed(1)}</div>
          <div className="text-sm text-white/70 font-medium">/ 10</div>
          {subtitle && <div className="text-xs text-white/60 mt-1">{subtitle}</div>}
        </div>
      </div>
    </div>
  );
};

export const ComparisonCharts: React.FC<ComparisonChartsProps> = ({ siteA, siteB, gap }) => {
  // Prepare data for different chart types - ensure meaningful data
  const radarData = siteA.factors
    .filter(f => f.applicable)
    .map(factorA => {
      const factorB = siteB.factors.find(f => f.factor === factorA.factor);
      return {
        factor: factorA.factor.replace(/([A-Z])/g, ' $1').trim().substring(0, 20), // Truncate long labels
        siteA: Number(factorA.value) || 0,
        siteB: Number(factorB?.value) || 0,
        weight: factorA.weight
      };
    });

  // Calculate dynamic scale for better visibility - ensure we always have a meaningful scale
  const allValues = radarData.flatMap(item => [item.siteA, item.siteB]).filter(v => v > 0);
  const maxValue = allValues.length > 0 ? Math.max(...allValues) : 1;
  const minValue = allValues.length > 0 ? Math.min(...allValues) : 0;
  
  // Set scale to show meaningful spread - use full 0-1 range for visibility scores
  const radarScale = {
    min: 0,
    max: 1
  };


  const showSiteB = radarData.some((d) => (d.siteB || 0) > 0);

  return (
    <div className="space-y-6">
      {/* Enhanced Competitive Visibility Analysis with Animations */}
      <Card className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 border-2 border-white/20 backdrop-blur-sm overflow-hidden animate-fade-in">
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-blue-500/10 animate-pulse"></div>
        
        {/* Animated border glow */}
        <div className="absolute inset-0 rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-purple-400 to-blue-400 rounded-lg blur-sm opacity-30 animate-pulse"></div>
        </div>
        
        <CardHeader className="relative pb-6 z-10">
          <CardTitle className="text-white flex items-center gap-4 text-2xl font-bold">
            <div className="relative w-12 h-12 bg-gradient-to-br from-orange-500 via-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-2xl animate-scale-in">
              <Target className="w-7 h-7 text-white" />
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-purple-400 to-blue-400 rounded-xl blur-md opacity-50 animate-pulse"></div>
            </div>
            <span className="bg-gradient-to-r from-orange-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Competitive Visibility Analysis
            </span>
          </CardTitle>
          
          {/* Enhanced animated gradient line */}
          <div className="relative h-2 w-full rounded-full overflow-hidden mt-4">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 rounded-full shadow-lg"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-purple-400 to-blue-400 rounded-full opacity-50 animate-pulse"></div>
            <div className="absolute top-0 left-0 h-full w-1/3 bg-white/20 rounded-full animate-slide-in-right"></div>
          </div>
        </CardHeader>
        
        <CardContent className="relative pb-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Enhanced Your Brand Card */}
            <div className="group relative animate-fade-in hover-scale">
              {/* Glowing background */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/30 to-orange-600/20 blur-xl opacity-50 group-hover:opacity-80 transition-all duration-500 animate-pulse"></div>
              
              {/* Main card */}
              <div className="relative text-center p-8 rounded-2xl border-2 border-orange-400/50 h-full min-h-[320px] flex flex-col justify-between bg-gradient-to-br from-orange-500/20 via-orange-600/15 to-orange-700/10 backdrop-blur-lg shadow-2xl group-hover:shadow-orange-500/30 transition-all duration-500">
                {/* Animated sparkles */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                <div className="absolute top-6 right-8 w-1 h-1 bg-orange-300 rounded-full animate-ping"></div>
                
                <ScoreDonut value10={siteA.score_10} color="#f97316" />
                <div className="space-y-3">
                  <div className="font-bold text-white text-xl group-hover:text-orange-200 transition-colors duration-300">Your Brand</div>
                  <div className="text-orange-300 text-base font-medium group-hover:text-orange-200 transition-colors duration-300">{siteA.domain}</div>
                  
                  {/* Enhanced badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/30 border border-orange-400/50 rounded-full backdrop-blur-sm group-hover:bg-orange-500/40 transition-all duration-300">
                    <div className="w-2.5 h-2.5 bg-orange-400 rounded-full animate-pulse"></div>
                    <span className="text-orange-200 text-sm font-semibold">Primary</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Gap Card */}
            <div className="group relative animate-fade-in hover-scale" style={{ animationDelay: '0.1s' }}>
              {(() => {
                const diff = siteA.score_10 - siteB.score_10;
                const ahead = diff > 0;
                const tied = diff === 0;
                const bgColor = tied ? 'from-slate-600/30 to-slate-700/20' : ahead ? 'from-green-500/30 to-emerald-600/20' : 'from-red-500/30 to-red-600/20';
                const borderColor = tied ? 'border-slate-500/50' : ahead ? 'border-green-400/50' : 'border-red-400/50';
                const textColor = tied ? 'text-slate-300' : ahead ? 'text-green-400' : 'text-red-400';
                const glowColor = tied ? 'slate-500/30' : ahead ? 'green-500/30' : 'red-500/30';
                
                return (
                  <>
                    {/* Dynamic glowing background */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${ahead ? 'from-green-500/30' : tied ? 'from-slate-600/30' : 'from-red-500/30'} ${ahead ? 'to-green-600/20' : tied ? 'to-slate-700/20' : 'to-red-600/20'} blur-xl opacity-50 group-hover:opacity-80 transition-all duration-500 animate-pulse`}></div>
                    
                    <div className={`relative text-center p-8 rounded-2xl border-2 ${borderColor} h-full min-h-[320px] flex flex-col items-center justify-between bg-gradient-to-br ${bgColor} backdrop-blur-lg shadow-2xl group-hover:shadow-${ahead ? 'green' : tied ? 'slate' : 'red'}-500/30 transition-all duration-500`}>
                      {/* Floating icon */}
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                        {ahead ? (
                          <TrendingUp className="w-6 h-6 text-green-400 animate-bounce" />
                        ) : tied ? (
                          <Minus className="w-6 h-6 text-slate-400 animate-pulse" />
                        ) : (
                          <TrendingDown className="w-6 h-6 text-red-400 animate-bounce" />
                        )}
                      </div>
                      
                      <ScoreDonut value10={Math.abs(diff)} color={tied ? COLORS.neutral : ahead ? COLORS.positive : COLORS.negative} />
                      
                      <div className="space-y-2">
                        <div className={`font-bold text-xl ${textColor} group-hover:scale-105 transition-transform duration-300`}>
                          {tied ? 'Tied Performance' : ahead ? 'You Are Ahead' : 'You Are Behind'}
                        </div>
                        <div className="text-white/60 text-sm">Visibility Gap</div>
                        
                        {/* Animated status indicator */}
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${ahead ? 'bg-green-500/20 border-green-400/40' : tied ? 'bg-slate-500/20 border-slate-400/40' : 'bg-red-500/20 border-red-400/40'}`}>
                          <div className={`w-2 h-2 rounded-full animate-pulse ${ahead ? 'bg-green-400' : tied ? 'bg-slate-400' : 'bg-red-400'}`}></div>
                          <span className="text-xs text-white/80">{Math.abs(diff).toFixed(1)} gap</span>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Enhanced Competitor Card */}
            <div className="group relative animate-fade-in hover-scale" style={{ animationDelay: '0.2s' }}>
              {/* Glowing background */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/30 to-blue-600/20 blur-xl opacity-50 group-hover:opacity-80 transition-all duration-500 animate-pulse"></div>
              
              {/* Main card */}
              <div className="relative text-center p-8 rounded-2xl border-2 border-blue-400/50 h-full min-h-[320px] flex flex-col justify-between bg-gradient-to-br from-blue-500/20 via-blue-600/15 to-blue-700/10 backdrop-blur-lg shadow-2xl group-hover:shadow-blue-500/30 transition-all duration-500">
                {/* Animated sparkles */}
                <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="absolute top-6 left-8 w-1 h-1 bg-blue-300 rounded-full animate-ping"></div>
                
                <ScoreDonut value10={siteB.score_10} color="#3b82f6" />
                <div className="space-y-3">
                  <div className="font-bold text-white text-xl group-hover:text-blue-200 transition-colors duration-300">Competitor</div>
                  <div className="text-blue-300 text-base font-medium group-hover:text-blue-200 transition-colors duration-300">{siteB.domain}</div>
                  
                  {/* Enhanced badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/30 border border-blue-400/50 rounded-full backdrop-blur-sm group-hover:bg-blue-500/40 transition-all duration-300">
                    <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-blue-200 text-sm font-semibold">Benchmark</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced floating particles effect */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-orange-400 rounded-full animate-float opacity-60"></div>
            <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-float opacity-60" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-purple-400 rounded-full animate-float opacity-60" style={{ animationDelay: '4s' }}></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};