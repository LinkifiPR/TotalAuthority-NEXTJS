"use client";

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Search, 
  Star, 
  Users, 
  Shield, 
  Network, 
  Zap,
  Eye,
  Brain,
  Target,
  Award,
  BarChart,
  Activity
} from 'lucide-react';

interface Factor {
  name: string;
  siteA: {
    score: number;
    reason: string;
    weight: number;
  };
  siteB: {
    score: number;
    reason: string;
    weight: number;
  };
}

interface FactorSummaryPillsProps {
  factors: Factor[];
  onFactorSelect: (factorName: string) => void;
  selectedFactor?: string;
}

const getFactorIcon = (factorName: string) => {
  const name = factorName.toLowerCase();
  if (name.includes('seo') || name.includes('search')) return Search;
  if (name.includes('review') || name.includes('rating')) return Star;
  if (name.includes('social') || name.includes('media')) return Users;
  if (name.includes('security') || name.includes('ssl')) return Shield;
  if (name.includes('link') || name.includes('backlink')) return Network;
  if (name.includes('speed') || name.includes('performance')) return Zap;
  if (name.includes('visibility') || name.includes('serp')) return Eye;
  if (name.includes('ai') || name.includes('llm')) return Brain;
  if (name.includes('local') || name.includes('gbp')) return Target;
  if (name.includes('authority') || name.includes('domain')) return Award;
  if (name.includes('traffic') || name.includes('analytics')) return BarChart;
  return Activity;
};

const getFactorStatus = (siteAScore: number, siteBScore: number) => {
  const diff = siteAScore - siteBScore;
  if (Math.abs(diff) < 0.1) return 'competitive';
  return diff > 0 ? 'ahead' : 'behind';
};

const formatFactorName = (name: string) => {
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .replace('GBP', 'Google Business Profile')
    .replace('sameAs', 'Identity Links')
    .trim();
};

export const FactorSummaryPills: React.FC<FactorSummaryPillsProps> = ({
  factors,
  onFactorSelect,
  selectedFactor
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Factor Overview</h3>
        <Badge variant="outline" className="text-xs">
          {factors.length} factors analyzed
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {factors.map((factor) => {
          const Icon = getFactorIcon(factor.name);
          const status = getFactorStatus(factor.siteA.score, factor.siteB.score);
          const diff = factor.siteA.score - factor.siteB.score;
          const isSelected = selectedFactor === factor.name;
          
          return (
            <div
              key={factor.name}
              onClick={() => onFactorSelect(factor.name)}
              className={cn(
                "group cursor-pointer rounded-lg border bg-card p-4 transition-all hover:shadow-md",
                "hover:border-primary/20 hover:bg-card/80",
                isSelected && "border-primary bg-primary/5 shadow-md"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className={cn(
                    "flex-shrink-0 p-1.5 rounded-md",
                    status === 'ahead' && "bg-green-100 text-green-700",
                    status === 'behind' && "bg-red-100 text-red-700",
                    status === 'competitive' && "bg-blue-100 text-blue-700"
                  )}>
                    <Icon size={14} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {formatFactorName(factor.name)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Weight: {factor.siteA.weight.toFixed(1)}
                    </p>
                  </div>
                </div>
                
                <div className="flex-shrink-0 flex flex-col items-end gap-1">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs px-2 py-0.5",
                      status === 'ahead' && "bg-green-50 text-green-700 border-green-200",
                      status === 'behind' && "bg-red-50 text-red-700 border-red-200", 
                      status === 'competitive' && "bg-blue-50 text-blue-700 border-blue-200"
                    )}
                  >
                    {status === 'ahead' && <TrendingUp size={10} className="mr-1" />}
                    {status === 'behind' && <TrendingDown size={10} className="mr-1" />}
                    {status === 'competitive' && <Minus size={10} className="mr-1" />}
                    {status === 'ahead' ? 'Ahead' : status === 'behind' ? 'Behind' : 'Even'}
                  </Badge>
                  
                  <span className={cn(
                    "text-xs font-medium",
                    diff > 0 ? "text-green-600" : diff < 0 ? "text-red-600" : "text-muted-foreground"
                  )}>
                    {diff > 0 ? '+' : ''}{diff.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};