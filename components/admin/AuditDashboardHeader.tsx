"use client";


import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AuditFilters } from './AuditFilters';
import { BulkActions } from './BulkActions';
import { BarChart3 } from 'lucide-react';

interface AuditDashboardHeaderProps {
  showArchived: boolean;
  activeCount: number;
  archivedCount: number;
  selectedAudits: Set<string>;
  totalCount: number;
  onToggleArchived: (showArchived: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onBulkArchive: () => void;
  onBulkRestore: () => void;
  onBulkLock?: () => void;
  onBulkUnlock?: () => void;
}

export const AuditDashboardHeader: React.FC<AuditDashboardHeaderProps> = ({
  showArchived,
  activeCount,
  archivedCount,
  selectedAudits,
  totalCount,
  onToggleArchived,
  onSelectAll,
  onBulkArchive,
  onBulkRestore,
  onBulkLock,
  onBulkUnlock
}) => {
  return (
    <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2 text-xl">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            Audit Reports Dashboard
          </CardTitle>
          <CardDescription className="mt-1">
            Manage and track all audit reports with advanced filtering and sorting
          </CardDescription>
        </div>
        
        <div className="flex items-center space-x-4">
          <AuditFilters
            showArchived={showArchived}
            activeCount={activeCount}
            archivedCount={archivedCount}
            onToggleArchived={onToggleArchived}
          />
          
          {selectedAudits.size > 0 && (
            <BulkActions
              selectedCount={selectedAudits.size}
              totalCount={totalCount}
              showArchived={showArchived}
              onSelectAll={onSelectAll}
              onBulkArchive={onBulkArchive}
              onBulkRestore={onBulkRestore}
              onBulkLock={onBulkLock}
              onBulkUnlock={onBulkUnlock}
            />
          )}
        </div>
      </div>
    </CardHeader>
  );
};
