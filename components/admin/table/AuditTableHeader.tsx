
import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronUp, ChevronDown } from 'lucide-react';

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

type SortField = 'client_name' | 'created_at' | 'status' | 'review_status' | 'reviewer_name';
type SortDirection = 'asc' | 'desc';

interface AuditTableHeaderProps {
  audits: AuditReport[];
  selectedAudits: Set<string>;
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  onSelectAll: (checked: boolean) => void;
}

export const AuditTableHeader: React.FC<AuditTableHeaderProps> = ({
  audits,
  selectedAudits,
  sortField,
  sortDirection,
  onSort,
  onSelectAll
}) => {
  const allSelected = audits.length > 0 && selectedAudits.size === audits.length;
  const someSelected = selectedAudits.size > 0 && selectedAudits.size < audits.length;

  const SortButton: React.FC<{ field: SortField; children: React.ReactNode }> = ({ field, children }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => onSort(field)}
      className="h-auto p-1 font-medium justify-start"
    >
      {children}
      {sortField === field && (
        sortDirection === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
      )}
    </Button>
  );

  return (
    <thead className="bg-gray-50">
      <tr>
        <th className="p-4 text-left">
          <Checkbox
            checked={allSelected}
            onCheckedChange={onSelectAll}
            className={someSelected ? "data-[state=checked]:bg-blue-600" : ""}
          />
        </th>
        <th className="p-4 text-left">
          <SortButton field="client_name">Client</SortButton>
        </th>
        <th className="p-4 text-left">
          <SortButton field="created_at">Created</SortButton>
        </th>
        <th className="p-4 text-left">
          <SortButton field="status">Status</SortButton>
        </th>
        <th className="p-4 text-left">
          <SortButton field="review_status">Review</SortButton>
        </th>
        <th className="p-4 text-left">
          <SortButton field="reviewer_name">Reviewer</SortButton>
        </th>
        <th className="p-4 text-left">Lock Status</th>
        <th className="p-4 text-left">Code</th>
        <th className="p-4 text-left">Actions</th>
      </tr>
    </thead>
  );
};
