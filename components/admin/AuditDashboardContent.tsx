"use client";


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AuditDashboardTable } from './AuditDashboardTable';
import { BarChart3 } from 'lucide-react';

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

interface AuditDashboardContentProps {
  filteredAudits: AuditReport[];
  selectedAudits: Set<string>;
  showArchived: boolean;
  onSelectAudit: (auditId: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onCopyAuditCode: (auditCode: string, clientName: string) => void;
  onViewAudit: (slug: string) => void;
  onCopyShareUrl: (slug: string) => void;
  onDeleteAudit: (id: string, clientName: string) => void;
  onEditAudit: (auditId: string) => void;
}

export const AuditDashboardContent: React.FC<AuditDashboardContentProps> = ({
  filteredAudits,
  selectedAudits,
  showArchived,
  onSelectAudit,
  onSelectAll,
  onCopyAuditCode,
  onViewAudit,
  onCopyShareUrl,
  onDeleteAudit,
  onEditAudit
}) => {
  if (filteredAudits.length === 0) {
    return (
      <CardContent>
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
      </CardContent>
    );
  }

  return (
    <CardContent className="p-0">
      <AuditDashboardTable
        audits={filteredAudits}
        selectedAudits={selectedAudits}
        onSelectAudit={onSelectAudit}
        onSelectAll={onSelectAll}
        onCopyAuditCode={onCopyAuditCode}
        onViewAudit={onViewAudit}
        onCopyShareUrl={onCopyShareUrl}
        onDeleteAudit={onDeleteAudit}
        onEditAudit={onEditAudit}
      />
    </CardContent>
  );
};
