
import React from 'react';
import { AuditCard } from '../AuditCard';
import { AuditReport, ReviewFormData } from './types';
import { BarChart3 } from 'lucide-react';

interface AuditListProps {
  filteredAudits: AuditReport[];
  selectedAudits: Set<string>;
  showArchived: boolean;
  editingAudit: string | null;
  submittingReview: string | null;
  onSelectAudit: (auditId: string, checked: boolean) => void;
  onEditAudit: (auditId: string) => void;
  onCopyAuditCode: (auditCode: string, clientName: string) => void;
  onViewAudit: (slug: string) => void;
  onCopyShareUrl: (slug: string) => void;
  onDeleteAudit: (id: string, clientName: string) => void;
  onSubmitReview: (auditId: string, formData: ReviewFormData) => void;
  onCancelEdit: () => void;
}

export const AuditList: React.FC<AuditListProps> = ({
  filteredAudits,
  selectedAudits,
  showArchived,
  editingAudit,
  submittingReview,
  onSelectAudit,
  onEditAudit,
  onCopyAuditCode,
  onViewAudit,
  onCopyShareUrl,
  onDeleteAudit,
  onSubmitReview,
  onCancelEdit
}) => {
  if (filteredAudits.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <BarChart3 className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {showArchived 
            ? "No archived audit reports found"
            : "No active audit reports found"
          }
        </h3>
        <p className="text-gray-500">
          {showArchived 
            ? "All your archived audits will appear here."
            : "Create your first audit report to get started!"
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredAudits.map(audit => (
        <AuditCard
          key={audit.id}
          audit={audit}
          isSelected={selectedAudits.has(audit.id)}
          editingAudit={editingAudit}
          submittingReview={submittingReview}
          onSelectAudit={onSelectAudit}
          onEditAudit={onEditAudit}
          onCopyAuditCode={onCopyAuditCode}
          onViewAudit={onViewAudit}
          onCopyShareUrl={onCopyShareUrl}
          onDeleteAudit={onDeleteAudit}
          onSubmitReview={onSubmitReview}
          onCancelEdit={onCancelEdit}
        />
      ))}
    </div>
  );
};
