"use client";

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  ExternalLink,
  X,
  Lightbulb,
  BarChart3
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

interface SiteData {
  name: string;
  citations?: Array<{
    title: string;
    url: string;
    domain?: string;
  }>;
}

interface FactorDetailsSheetProps {
  factor: Factor | null;
  siteA: SiteData;
  siteB: SiteData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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

const getGuidance = (status: string, factorName: string) => {
  const factorType = factorName.toLowerCase();
  
  const guidance: Record<string, Record<string, string>> = {
    ahead: {
      default: "You're performing well in this area. Consider maintaining your current strategy while monitoring competitor improvements.",
      seo: "Your SEO performance is strong. Focus on maintaining rankings and exploring new keyword opportunities.",
      social: "Your social media presence is effective. Continue engaging with your audience and expanding reach.",
      reviews: "Your review profile is solid. Keep encouraging satisfied customers to leave reviews.",
      technical: "Your technical implementation is superior. Use this advantage to explore advanced optimizations."
    },
    behind: {
      default: "This area needs improvement. Focus resources here for maximum competitive impact.",
      seo: "Invest in SEO optimization, including content creation, technical fixes, and link building.",
      social: "Develop a stronger social media strategy with regular posting and community engagement.",
      reviews: "Implement a systematic review collection process and address negative feedback promptly.",
      technical: "Prioritize technical improvements to enhance user experience and search performance."
    },
    competitive: {
      default: "You're evenly matched. Small improvements here could provide a competitive edge.",
      seo: "Fine-tune your SEO strategy to gain an edge over competitors.",
      social: "Enhance your social media engagement to stand out from competitors.",
      reviews: "Focus on review quality and response rates to differentiate your brand.",
      technical: "Implement advanced technical optimizations to pull ahead."
    }
  };

  const categoryKey = Object.keys(guidance[status]).find(key => 
    key !== 'default' && factorType.includes(key)
  ) || 'default';
  
  return guidance[status][categoryKey];
};

export const FactorDetailsSheet: React.FC<FactorDetailsSheetProps> = ({
  factor,
  siteA,
  siteB,
  open,
  onOpenChange
}) => {
  if (!factor) return null;

  const diff = factor.siteA.score - factor.siteB.score;
  const status = getFactorStatus(factor.siteA.score, factor.siteB.score);
  const guidance = getGuidance(status, factor.name);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[500px] bg-card border-l overflow-y-auto">
        <SheetHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <SheetTitle className="text-lg pr-8">
              {formatFactorName(factor.name)}
            </SheetTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 p-0"
            >
              <X size={16} />
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={cn(
                "text-sm px-3 py-1",
                status === 'ahead' && "bg-green-50 text-green-700 border-green-200",
                status === 'behind' && "bg-red-50 text-red-700 border-red-200",
                status === 'competitive' && "bg-blue-50 text-blue-700 border-blue-200"
              )}
            >
              {status === 'ahead' && <TrendingUp size={14} className="mr-1" />}
              {status === 'behind' && <TrendingDown size={14} className="mr-1" />}
              {status === 'competitive' && <Minus size={14} className="mr-1" />}
              {status === 'ahead' ? 'Ahead' : status === 'behind' ? 'Behind' : 'Competitive'}
            </Badge>
            
            <Badge variant="outline" className="text-sm px-3 py-1">
              Weight: {factor.siteA.weight.toFixed(1)}
            </Badge>
          </div>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Score Comparison */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BarChart3 size={16} className="text-muted-foreground" />
              <h3 className="font-medium">Score Comparison</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{siteA.name}</span>
                  <span className="text-lg font-bold">{factor.siteA.score.toFixed(1)}</span>
                </div>
                <Progress value={factor.siteA.score * 10} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{siteB.name}</span>
                  <span className="text-lg font-bold">{factor.siteB.score.toFixed(1)}</span>
                </div>
                <Progress value={factor.siteB.score * 10} className="h-2" />
              </div>
            </div>
            
            <div className="text-center">
              <Badge
                variant="outline"
                className={cn(
                  "text-sm px-3 py-1",
                  diff > 0 && "text-green-700 bg-green-50 border-green-200",
                  diff < 0 && "text-red-700 bg-red-50 border-red-200",
                  Math.abs(diff) < 0.1 && "text-blue-700 bg-blue-50 border-blue-200"
                )}
              >
                Difference: {diff > 0 ? '+' : ''}{diff.toFixed(1)}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Analysis Details */}
          <div className="space-y-4">
            <h3 className="font-medium">Analysis Details</h3>
            
            <div className="space-y-3">
              <div className="p-3 bg-muted/50 rounded-lg">
                <h4 className="text-sm font-medium mb-2">{siteA.name}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {factor.siteA.reason}
                </p>
              </div>
              
              <div className="p-3 bg-muted/50 rounded-lg">
                <h4 className="text-sm font-medium mb-2">{siteB.name}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {factor.siteB.reason}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Strategic Guidance */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Lightbulb size={16} className="text-muted-foreground" />
              <h3 className="font-medium">Strategic Recommendations</h3>
            </div>
            
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="text-sm leading-relaxed">
                {guidance}
              </p>
            </div>
          </div>

          {/* Citations */}
          {(siteA.citations || siteB.citations) && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-medium">Source Citations</h3>
                
                <div className="space-y-3">
                  {siteA.citations && siteA.citations.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">{siteA.name}</h4>
                      <div className="space-y-2">
                        {siteA.citations.slice(0, 3).map((citation, index) => (
                          <a
                            key={index}
                            href={citation.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 p-2 text-sm bg-muted/30 hover:bg-muted/50 rounded border transition-colors"
                          >
                            <ExternalLink size={12} className="text-muted-foreground flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="font-medium truncate">{citation.title}</p>
                              <p className="text-xs text-muted-foreground truncate">
                                {citation.domain || new URL(citation.url).hostname}
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {siteB.citations && siteB.citations.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">{siteB.name}</h4>
                      <div className="space-y-2">
                        {siteB.citations.slice(0, 3).map((citation, index) => (
                          <a
                            key={index}
                            href={citation.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 p-2 text-sm bg-muted/30 hover:bg-muted/50 rounded border transition-colors"
                          >
                            <ExternalLink size={12} className="text-muted-foreground flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="font-medium truncate">{citation.title}</p>
                              <p className="text-xs text-muted-foreground truncate">
                                {citation.domain || new URL(citation.url).hostname}
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};