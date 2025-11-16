"use client";

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';

export const StatusLegend: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-muted/30 rounded-lg border">
      <div className="flex items-center gap-2">
        <Info size={16} className="text-muted-foreground" />
        <span className="text-sm font-medium">Status Legend:</span>
      </div>
      
      <div className="flex flex-wrap gap-3">
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 border-green-200"
        >
          <TrendingUp size={12} className="mr-1" />
          Ahead: +0.1 or higher
        </Badge>
        
        <Badge
          variant="outline"
          className="bg-red-50 text-red-700 border-red-200"
        >
          <TrendingDown size={12} className="mr-1" />
          Behind: -0.1 or lower
        </Badge>
        
        <Badge
          variant="outline"
          className="bg-blue-50 text-blue-700 border-blue-200"
        >
          <Minus size={12} className="mr-1" />
          Competitive: Within ±0.1
        </Badge>
      </div>
    </div>
  );
};