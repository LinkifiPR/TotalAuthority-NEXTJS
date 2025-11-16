import React from 'react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Copy, Eye, Trash2, Edit, Key, CheckCircle2, Lock, Unlock, User } from 'lucide-react';

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

interface AuditTableRowProps {
  audit: AuditReport;
  isSelected: boolean;
  onSelectAudit: (auditId: string, checked: boolean) => void;
  onCopyAuditCode: (auditCode: string, clientName: string) => void;
  onViewAudit: (slug: string) => void;
  onCopyShareUrl: (slug: string) => void;
  onDeleteAudit: (id: string, clientName: string) => void;
  onEditAudit: (auditId: string) => void;
  onToggleLock?: (auditId: string, currentLockStatus: boolean) => void;
}

export const AuditTableRow: React.FC<AuditTableRowProps> = ({
  audit,
  isSelected,
  onSelectAudit,
  onCopyAuditCode,
  onViewAudit,
  onCopyShareUrl,
  onDeleteAudit,
  onEditAudit,
  onToggleLock
}) => {
  const handleEditClick = () => {
    onEditAudit(audit.id);
  };

  const handleToggleLock = () => {
    if (onToggleLock) {
      onToggleLock(audit.id, !!audit.is_locked);
    }
  };

  const getLockStatusBadge = () => {
    if (audit.is_locked) {
      const timestamp = audit.snapshot_generated_at 
        ? format(new Date(audit.snapshot_generated_at), 'MMM d, yyyy h:mm a')
        : 'Unknown';
      return (
        <Badge 
          variant="default" 
          className="bg-green-100 text-green-800"
          title={`Locked on ${timestamp}${audit.snapshot_version ? ` (v${audit.snapshot_version})` : ''}`}
        >
          ✅ Locked
        </Badge>
      );
    } else {
      return (
        <Badge 
          variant="secondary" 
          className="bg-yellow-100 text-yellow-800"
          title="Live render - uses latest templates"
        >
          ⚠️ Unlocked
        </Badge>
      );
    }
  };

  const isClaimed = audit.user_audit_codes && audit.user_audit_codes.length > 0;
  const claimer = isClaimed ? audit.user_audit_codes[0] : null;

  return (
    <tr className={`border-b ${isClaimed ? 'bg-green-100 hover:bg-green-200' : 'hover:bg-gray-50'}`}>
      <td className="p-4">
        <Checkbox
          checked={isSelected}
          onCheckedChange={(checked) => onSelectAudit(audit.id, !!checked)}
        />
      </td>
      <td className="p-4">
        <div className="flex items-center space-x-2">
          <div>
            <div className="font-medium">{audit.client_name}</div>
            <div className="text-sm text-gray-500">{audit.share_url_slug}</div>
          </div>
          {isClaimed && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center">
                    <User className="w-4 h-4 text-green-600" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Claimed by: {claimer?.profiles?.email || 'Unknown user'}</p>
                  <p className="text-xs text-gray-500">
                    {claimer?.created_at ? format(new Date(claimer.created_at), 'MMM d, yyyy h:mm a') : ''}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </td>
      <td className="p-4 text-sm text-gray-600">
        <div>{format(new Date(audit.created_at), 'MMM d, yyyy')}</div>
        <div className="text-xs">{format(new Date(audit.created_at), 'h:mm a')}</div>
      </td>
      <td className="p-4">
        <Badge variant={audit.status === 'active' ? 'default' : 'secondary'}>
          {audit.status}
        </Badge>
      </td>
      <td className="p-4">
        <div className="flex items-center space-x-2">
          <Badge 
            variant={audit.review_status === 'completed' ? 'default' : 'secondary'}
            className={audit.review_status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
          >
            {audit.review_status === 'completed' ? 'Completed' : 'Pending'}
          </Badge>
          {audit.review_status === 'completed' && (
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          )}
        </div>
      </td>
      <td className="p-4 text-sm">
        {audit.reviewer_name || 'Not assigned'}
      </td>
      <td className="px-4 py-4 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          {audit.is_locked ? (
            <>
              <Lock className="w-4 h-4 text-orange-500" />
              <span className="text-orange-600 font-medium">
                Locked {audit.snapshot_version ? `(${audit.snapshot_version.toUpperCase()})` : '(Legacy)'}
              </span>
            </>
          ) : (
            <>
              <Unlock className="w-4 h-4 text-green-500" />
              <span className="text-green-600">Live</span>
            </>
          )}
        </div>
      </td>
      <td className="p-4 text-sm font-mono">
        {audit.audit_code || 'N/A'}
      </td>
      <td className="p-4">
        <div className="flex items-center space-x-1">
          {onToggleLock && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleToggleLock}
              title={audit.is_locked ? 'Unlock Audit' : 'Lock Audit'}
              className={audit.is_locked ? 'text-red-600' : 'text-green-600'}
            >
              {audit.is_locked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </Button>
          )}
          
          <Button
            size="sm"
            variant="outline"
            onClick={handleEditClick}
            title={audit.review_status === 'completed' ? 'Edit Review' : 'Complete Review'}
            className={audit.review_status === 'pending' ? 'bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100' : ''}
          >
            <Edit className="w-4 h-4" />
          </Button>
          
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
            title="View Audit"
          >
            <Eye className="w-4 h-4" />
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={() => onCopyShareUrl(audit.share_url_slug)}
            title="Copy Share URL"
          >
            <Copy className="w-4 h-4" />
          </Button>
          
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDeleteAudit(audit.id, audit.client_name)}
            title="Delete Audit"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
};
