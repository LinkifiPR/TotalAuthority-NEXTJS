"use client";

import React, { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { 
  ChevronUp, 
  ChevronDown, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  LayoutGrid,
  LayoutList
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

type SortField = 'name' | 'diff' | 'weight' | 'scoreA' | 'scoreB';
type SortDirection = 'asc' | 'desc';
type StatusFilter = 'all' | 'ahead' | 'behind' | 'competitive';

interface FactorComparisonTableProps {
  factors: Factor[];
  onRowClick: (factorName: string) => void;
  selectedFactor?: string;
  siteAName: string;
  siteBName: string;
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

export const FactorComparisonTable: React.FC<FactorComparisonTableProps> = ({
  factors,
  onRowClick,
  selectedFactor,
  siteAName,
  siteBName
}) => {
  const [sortField, setSortField] = useState<SortField>('diff');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [isCompact, setIsCompact] = useState(false);

  const sortedAndFilteredFactors = useMemo(() => {
    let filtered = factors.filter(factor => {
      if (statusFilter === 'all') return true;
      const status = getFactorStatus(factor.siteA.score, factor.siteB.score);
      return status === statusFilter;
    });

    return filtered.sort((a, b) => {
      let aValue: number, bValue: number;
      
      switch (sortField) {
        case 'name':
          return sortDirection === 'asc' 
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        case 'diff':
          aValue = a.siteA.score - a.siteB.score;
          bValue = b.siteA.score - b.siteB.score;
          break;
        case 'weight':
          aValue = a.siteA.weight;
          bValue = b.siteA.weight;
          break;
        case 'scoreA':
          aValue = a.siteA.score;
          bValue = b.siteA.score;
          break;
        case 'scoreB':
          aValue = a.siteB.score;
          bValue = b.siteB.score;
          break;
        default:
          return 0;
      }
      
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    });
  }, [factors, sortField, sortDirection, statusFilter]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => handleSort(field)}
      className="h-auto p-0 font-medium hover:bg-transparent"
    >
      {children}
      {sortField === field && (
        sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
      )}
    </Button>
  );

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={statusFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('all')}
          >
            All ({factors.length})
          </Button>
          <Button
            variant={statusFilter === 'ahead' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('ahead')}
            className="text-green-700 hover:text-green-700"
          >
            <TrendingUp size={14} className="mr-1" />
            Ahead
          </Button>
          <Button
            variant={statusFilter === 'behind' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('behind')}
            className="text-red-700 hover:text-red-700"
          >
            <TrendingDown size={14} className="mr-1" />
            Behind
          </Button>
          <Button
            variant={statusFilter === 'competitive' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('competitive')}
            className="text-blue-700 hover:text-blue-700"
          >
            <Minus size={14} className="mr-1" />
            Even
          </Button>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsCompact(!isCompact)}
        >
          {isCompact ? <LayoutList size={14} /> : <LayoutGrid size={14} />}
          {isCompact ? 'Expanded' : 'Compact'}
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">
                <SortButton field="name">Factor</SortButton>
              </TableHead>
              <TableHead className="text-center">
                <SortButton field="scoreA">{siteAName}</SortButton>
              </TableHead>
              <TableHead className="text-center">
                <SortButton field="diff">Difference</SortButton>
              </TableHead>
              <TableHead className="text-center">
                <SortButton field="scoreB">{siteBName}</SortButton>
              </TableHead>
              <TableHead className="text-center">
                <SortButton field="weight">Weight</SortButton>
              </TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAndFilteredFactors.map((factor) => {
              const diff = factor.siteA.score - factor.siteB.score;
              const status = getFactorStatus(factor.siteA.score, factor.siteB.score);
              const isSelected = selectedFactor === factor.name;
              
              return (
                <TableRow
                  key={factor.name}
                  onClick={() => onRowClick(factor.name)}
                  className={cn(
                    "cursor-pointer hover:bg-muted/50 transition-colors",
                    isSelected && "bg-primary/5 border-primary/20"
                  )}
                >
                  <TableCell className="font-medium">
                    <div className={cn("space-y-1", isCompact && "py-1")}>
                      <p className="text-sm">{formatFactorName(factor.name)}</p>
                      {!isCompact && (
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {factor.siteA.reason}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="space-y-1">
                      <p className="font-medium">{factor.siteA.score.toFixed(1)}</p>
                      {!isCompact && (
                        <Progress 
                          value={factor.siteA.score * 10} 
                          className="h-1.5 w-16 mx-auto" 
                        />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="outline"
                      className={cn(
                        "font-medium",
                        diff > 0 && "text-green-700 bg-green-50 border-green-200",
                        diff < 0 && "text-red-700 bg-red-50 border-red-200",
                        Math.abs(diff) < 0.1 && "text-blue-700 bg-blue-50 border-blue-200"
                      )}
                    >
                      {diff > 0 ? '+' : ''}{diff.toFixed(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="space-y-1">
                      <p className="font-medium">{factor.siteB.score.toFixed(1)}</p>
                      {!isCompact && (
                        <Progress 
                          value={factor.siteB.score * 10} 
                          className="h-1.5 w-16 mx-auto" 
                        />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="text-xs">
                      {factor.siteA.weight.toFixed(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs",
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
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        
        {sortedAndFilteredFactors.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No factors match the selected filter.
          </div>
        )}
      </div>
    </div>
  );
};