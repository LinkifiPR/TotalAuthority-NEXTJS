"use client";


import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Archive, ArchiveRestore, Lock, Unlock } from 'lucide-react';

interface BulkActionsProps {
  selectedCount: number;
  totalCount: number;
  showArchived: boolean;
  onSelectAll: (checked: boolean) => void;
  onBulkArchive: () => void;
  onBulkRestore: () => void;
  onBulkLock?: () => void;
  onBulkUnlock?: () => void;
}

export const BulkActions: React.FC<BulkActionsProps> = ({
  selectedCount,
  totalCount,
  showArchived,
  onSelectAll,
  onBulkArchive,
  onBulkRestore,
  onBulkLock,
  onBulkUnlock
}) => {
  if (totalCount === 0) return null;

  return (
    <div className="flex items-center justify-between pb-2 border-b">
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={selectedCount === totalCount && totalCount > 0}
          onCheckedChange={onSelectAll}
        />
        <span className="text-sm text-gray-600">Select All</span>
      </div>
      
      {selectedCount > 0 && (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            {selectedCount} selected
          </span>
          
          {/* Lock/Unlock Actions */}
          {onBulkLock && (
            <Button
              size="sm"
              variant="outline"
              onClick={onBulkLock}
            >
              <Lock className="w-4 h-4 mr-1" />
              Lock
            </Button>
          )}
          
          {onBulkUnlock && (
            <Button
              size="sm"
              variant="outline"
              onClick={onBulkUnlock}
            >
              <Unlock className="w-4 h-4 mr-1" />
              Unlock
            </Button>
          )}
          
          {/* Archive/Restore Actions */}
          {!showArchived ? (
            <Button
              size="sm"
              variant="outline"
              onClick={onBulkArchive}
            >
              <Archive className="w-4 h-4 mr-1" />
              Archive
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={onBulkRestore}
            >
              <ArchiveRestore className="w-4 h-4 mr-1" />
              Restore
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
