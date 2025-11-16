"use client";


import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Copy, Eye, Trash2, CheckCircle2, Edit, Key } from 'lucide-react';
import { ReviewForm } from './ReviewForm';

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
  loom_video_url: string;
  key_strengths: string;
  priority_actions: string;
  strategic_insights: string;
}

interface AuditCardProps {
  audit: AuditReport;
  isSelected: boolean;
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

export const AuditCard: React.FC<AuditCardProps> = ({
  audit,
  isSelected,
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
  return (
    <div className="border rounded-lg bg-gray-50">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <Checkbox
            checked={isSelected}
            onCheckedChange={(checked) => onSelectAudit(audit.id, !!checked)}
          />
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{audit.client_name}</h3>
            <p className="text-sm text-gray-600">
              Created: {new Date(audit.created_at).toLocaleDateString()}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Slug: {audit.share_url_slug}
            </p>
            {audit.audit_code && (
              <p className="text-xs text-blue-600 mt-1 font-mono">
                Code: {audit.audit_code}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge 
            variant={audit.review_status === 'completed' ? 'default' : 'secondary'}
            className={audit.review_status === 'completed' ? 'bg-green-100 text-green-800 hover:bg-green-200' : ''}
          >
            {audit.review_status === 'completed' ? 'Completed' : 'Pending'}
          </Badge>
          
          {audit.review_status === 'completed' && (
            <>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEditAudit(audit.id)}
              >
                <Edit className="w-4 h-4" />
              </Button>
            </>
          )}
          
          {audit.audit_code && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onCopyAuditCode(audit.audit_code!, audit.client_name)}
              title="Copy Audit Code"
            >
              <Key className="w-4 h-4" />
            </Button>
          )}
          
          <Button
            size="sm"
            variant="outline"
            onClick={() => onViewAudit(audit.share_url_slug)}
          >
            <Eye className="w-4 h-4" />
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={() => onCopyShareUrl(audit.share_url_slug)}
          >
            <Copy className="w-4 h-4" />
          </Button>
          
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDeleteAudit(audit.id, audit.client_name)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {(audit.review_status === 'pending' || editingAudit === audit.id) && (
        <ReviewForm
          audit={audit}
          submittingReview={submittingReview}
          onSubmit={onSubmitReview}
          onCancel={onCancelEdit}
        />
      )}
    </div>
  );
};
