"use client";


import React from 'react';
import { Button } from '@/components/ui/button';
import { Archive } from 'lucide-react';

interface AuditFiltersProps {
  showArchived: boolean;
  activeCount: number;
  archivedCount: number;
  onToggleArchived: (showArchived: boolean) => void;
}

export const AuditFilters: React.FC<AuditFiltersProps> = ({
  showArchived,
  activeCount,
  archivedCount,
  onToggleArchived
}) => {
  return (
    <div className="flex items-center space-x-4">
      <Button
        variant={showArchived ? "outline" : "default"}
        size="sm"
        onClick={() => onToggleArchived(false)}
      >
        Active ({activeCount})
      </Button>
      <Button
        variant={showArchived ? "default" : "outline"}
        size="sm"
        onClick={() => onToggleArchived(true)}
      >
        <Archive className="w-4 h-4 mr-2" />
        Archived ({archivedCount})
      </Button>
    </div>
  );
};
