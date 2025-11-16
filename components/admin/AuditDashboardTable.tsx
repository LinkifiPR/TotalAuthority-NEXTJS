"use client";

import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { AuditTableFilters } from './table/AuditTableFilters';
import { AuditTableGroup } from './table/AuditTableGroup';

interface AuditReport {
  id: string;
  client_name: string;
  share_url_slug: string;
  audit_code: string | null;
  created_at: string;
  status: string;
  reviewer_name?: string;
  loom_video_url?: string;
  key_strengths?: string[];
  priority_actions?: string[];
  strategic_insights?: string[];
  review_status?: string;
  assigned_user_id?: string;
  is_locked?: boolean;
  snapshot_generated_at?: string;
  snapshot_version?: string;
  user_audit_codes?: Array<{
    audit_report_id: string;
    user_id: string;
    created_at: string;
    profiles: {
      email: string;
      full_name: string;
    } | null;
  }>;
}

interface AuditDashboardTableProps {
  audits: AuditReport[];
  selectedAudits: Set<string>;
  onSelectAudit: (auditId: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onCopyAuditCode: (auditCode: string, clientName: string) => void;
  onViewAudit: (slug: string) => void;
  onCopyShareUrl: (slug: string) => void;
  onDeleteAudit: (id: string, clientName: string) => void;
  onEditAudit: (auditId: string) => void;
  onToggleLock?: (auditId: string, currentLockStatus: boolean) => void;
}

type SortField = 'client_name' | 'created_at' | 'status' | 'review_status' | 'reviewer_name';
type SortDirection = 'asc' | 'desc';
type GroupBy = 'none' | 'month' | 'status' | 'review_status';

export const AuditDashboardTable: React.FC<AuditDashboardTableProps> = ({
  audits,
  selectedAudits,
  onSelectAudit,
  onSelectAll,
  onCopyAuditCode,
  onViewAudit,
  onCopyShareUrl,
  onDeleteAudit,
  onEditAudit,
  onToggleLock
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [groupBy, setGroupBy] = useState<GroupBy>('none');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [reviewStatusFilter, setReviewStatusFilter] = useState<string>('all');

  const filteredAndSortedAudits = useMemo(() => {
    let filtered = audits.filter(audit => {
      const matchesSearch = audit.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          audit.audit_code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          audit.reviewer_name?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || audit.status === statusFilter;
      const matchesReviewStatus = reviewStatusFilter === 'all' || audit.review_status === reviewStatusFilter;
      
      return matchesSearch && matchesStatus && matchesReviewStatus;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];
      
      if (sortField === 'created_at') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      } else {
        aValue = aValue?.toString().toLowerCase() || '';
        bValue = bValue?.toString().toLowerCase() || '';
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [audits, searchTerm, sortField, sortDirection, statusFilter, reviewStatusFilter]);

  const groupedAudits = useMemo(() => {
    if (groupBy === 'none') {
      return { 'All Audits': filteredAndSortedAudits };
    }

    const groups: Record<string, AuditReport[]> = {};
    
    filteredAndSortedAudits.forEach(audit => {
      let groupKey = '';
      
      switch (groupBy) {
        case 'month':
          groupKey = format(new Date(audit.created_at), 'MMMM yyyy');
          break;
        case 'status':
          groupKey = audit.status || 'Unknown Status';
          break;
        case 'review_status':
          groupKey = audit.review_status === 'completed' ? 'Completed' : 'Pending';
          break;
      }
      
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(audit);
    });

    return groups;
  }, [filteredAndSortedAudits, groupBy]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setReviewStatusFilter('all');
    setGroupBy('none');
  };

  return (
    <div className="space-y-6">
      <AuditTableFilters
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        reviewStatusFilter={reviewStatusFilter}
        groupBy={groupBy}
        filteredCount={filteredAndSortedAudits.length}
        onSearchChange={setSearchTerm}
        onStatusFilterChange={setStatusFilter}
        onReviewStatusFilterChange={setReviewStatusFilter}
        onGroupByChange={setGroupBy}
        onClearAllFilters={clearAllFilters}
      />

      {/* Audit Reports Table */}
      <Card>
        <div className="p-6 pb-4">
          <CardTitle className="flex items-center justify-between">
            <span>Audit Reports</span>
            {selectedAudits.size > 0 && (
              <Badge variant="outline" className="ml-2">
                {selectedAudits.size} selected
              </Badge>
            )}
          </CardTitle>
        </div>
        <CardContent>
          {Object.entries(groupedAudits).map(([groupName, groupAudits]) => (
            <AuditTableGroup
              key={groupName}
              groupName={groupName}
              audits={groupAudits}
              selectedAudits={selectedAudits}
              sortField={sortField}
              sortDirection={sortDirection}
              groupBy={groupBy}
              onSelectAudit={onSelectAudit}
              onSelectAll={onSelectAll}
              onSort={handleSort}
              onCopyAuditCode={onCopyAuditCode}
              onViewAudit={onViewAudit}
              onCopyShareUrl={onCopyShareUrl}
              onDeleteAudit={onDeleteAudit}
              onEditAudit={onEditAudit}
              onToggleLock={onToggleLock}
            />
          ))}
          
          {filteredAndSortedAudits.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No audits found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
