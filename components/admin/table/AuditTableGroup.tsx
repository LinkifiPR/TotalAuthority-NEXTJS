import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { AuditTableHeader } from './AuditTableHeader';
import { AuditTableRow } from './AuditTableRow';

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
}

type SortField = 'client_name' | 'created_at' | 'status' | 'review_status' | 'reviewer_name';
type SortDirection = 'asc' | 'desc';
type GroupBy = 'none' | 'month' | 'status' | 'review_status';

interface AuditTableGroupProps {
  groupName: string;
  audits: AuditReport[];
  selectedAudits: Set<string>;
  sortField: SortField;
  sortDirection: SortDirection;
  groupBy: GroupBy;
  onSelectAudit: (auditId: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onSort: (field: SortField) => void;
  onCopyAuditCode: (auditCode: string, clientName: string) => void;
  onViewAudit: (slug: string) => void;
  onCopyShareUrl: (slug: string) => void;
  onDeleteAudit: (id: string, clientName: string) => void;
  onEditAudit: (auditId: string) => void;
  onToggleLock?: (auditId: string, currentLockStatus: boolean) => void;
}

export const AuditTableGroup: React.FC<AuditTableGroupProps> = ({
  groupName,
  audits,
  selectedAudits,
  sortField,
  sortDirection,
  groupBy,
  onSelectAudit,
  onSelectAll,
  onSort,
  onCopyAuditCode,
  onViewAudit,
  onCopyShareUrl,
  onDeleteAudit,
  onEditAudit,
  onToggleLock
}) => {
  const groupAudits = audits.filter(audit => {
    const auditIds = audits.map(a => a.id);
    return auditIds.includes(audit.id);
  });

  const selectedInGroup = groupAudits.filter(audit => selectedAudits.has(audit.id)).length;
  const allSelected = selectedInGroup === groupAudits.length && groupAudits.length > 0;
  const someSelected = selectedInGroup > 0 && selectedInGroup < groupAudits.length;

  const handleSelectAllInGroup = (checked: boolean) => {
    groupAudits.forEach(audit => {
      onSelectAudit(audit.id, checked);
    });
  };

  if (audits.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      {groupBy !== 'none' && (
        <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Checkbox
              checked={allSelected}
              onCheckedChange={handleSelectAllInGroup}
              className={someSelected ? "data-[state=checked]:bg-blue-600" : ""}
            />
            <h3 className="font-semibold text-gray-900">{groupName}</h3>
            <Badge variant="outline">{groupAudits.length} audits</Badge>
          </div>
          {selectedInGroup > 0 && (
            <Badge variant="secondary">{selectedInGroup} selected</Badge>
          )}
        </div>
      )}

      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full">
          <AuditTableHeader
            audits={audits}
            selectedAudits={selectedAudits}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={onSort}
            onSelectAll={onSelectAll}
          />
          <tbody>
            {audits.map((audit) => (
              <AuditTableRow
                key={audit.id}
                audit={audit}
                isSelected={selectedAudits.has(audit.id)}
                onSelectAudit={onSelectAudit}
                onCopyAuditCode={onCopyAuditCode}
                onViewAudit={onViewAudit}
                onCopyShareUrl={onCopyShareUrl}
                onDeleteAudit={onDeleteAudit}
                onEditAudit={onEditAudit}
                onToggleLock={onToggleLock}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
