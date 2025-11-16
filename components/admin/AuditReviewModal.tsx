"use client";


import React from 'react';
import { AuditCard } from './AuditCard';
import { X } from 'lucide-react';

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
}

interface ReviewFormData {
  reviewer_name: string;
  video_option: 'include' | 'exclude';
  loom_video_url: string;
  key_strengths: string;
  priority_actions: string;
  strategic_insights: string;
  ai_feedback: string;
}

interface AuditReviewModalProps {
  editingAudit: string | null;
  submittingReview: string | null;
  filteredAudits: AuditReport[];
  selectedAudits: Set<string>;
  onSelectAudit: (auditId: string, checked: boolean) => void;
  onEditAudit: (auditId: string | null) => void;
  onCopyAuditCode: (auditCode: string, clientName: string) => void;
  onViewAudit: (slug: string) => void;
  onCopyShareUrl: (slug: string) => void;
  onDeleteAudit: (id: string, clientName: string) => void;
  onSubmitReview: (auditId: string, formData: ReviewFormData) => void;
  onCancelEdit: () => void;
}

export const AuditReviewModal: React.FC<AuditReviewModalProps> = ({
  editingAudit,
  submittingReview,
  filteredAudits,
  selectedAudits,
  onSelectAudit,
  onEditAudit,
  onCopyAuditCode,
  onViewAudit,
  onCopyShareUrl,
  onDeleteAudit,
  onSubmitReview,
  onCancelEdit
}) => {
  if (!editingAudit) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close button */}
        <button
          onClick={onCancelEdit}
          className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
          type="button"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
        
        {filteredAudits
          .filter(audit => audit.id === editingAudit)
          .map(audit => (
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
          ))
        }
      </div>
    </div>
  );
};
