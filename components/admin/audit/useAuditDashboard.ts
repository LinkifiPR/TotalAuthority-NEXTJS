
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AuditReport, ReviewFormData } from './types';
import { lockAudit, unlockAudit, bulkLockAudits, bulkUnlockAudits } from './snapshotUtils';

export const useAuditDashboard = (refreshTrigger: number) => {
  const [audits, setAudits] = useState<AuditReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingAudit, setEditingAudit] = useState<string | null>(null);
  const [selectedAudits, setSelectedAudits] = useState<Set<string>>(new Set());
  const [showArchived, setShowArchived] = useState(false);
  const { toast } = useToast();

  const fetchAudits = async () => {
    try {
      // First get all audit reports
      const { data: auditsData, error: auditsError } = await supabase
        .from('audit_reports')
        .select('id, client_name, share_url_slug, audit_code, created_at, status, reviewer_name, loom_video_url, key_strengths, priority_actions, strategic_insights, review_status, audit_data, ai_feedback, is_locked, snapshot_data, snapshot_generated_at, snapshot_version')
        .order('created_at', { ascending: false });

      if (auditsError) throw auditsError;

      // Then get claim information for each audit
      const { data: claimsData, error: claimsError } = await supabase
        .from('user_audit_codes')
        .select('audit_report_id, user_id, created_at');

      if (claimsError) throw claimsError;

      // Get user profiles for the claimed audits
      const userIds = [...new Set((claimsData || []).map(claim => claim.user_id))];
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, full_name')
        .in('id', userIds);

      if (profilesError) throw profilesError;

      // Combine the data
      const auditsWithClaims = (auditsData || []).map(audit => {
        const claims = (claimsData || [])
          .filter(claim => claim.audit_report_id === audit.id)
          .map(claim => ({
            ...claim,
            profiles: (profilesData || []).find(profile => profile.id === claim.user_id) || null
          }));
        
        return {
          ...audit,
          user_audit_codes: claims
        };
      });

      setAudits(auditsWithClaims);
    } catch (error: any) {
      console.error('Error fetching audits:', error);
      toast({
        title: "Error",
        description: "Failed to fetch audit reports",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAudits();
  }, [refreshTrigger]);

  const copyShareUrl = (slug: string) => {
    const url = `${window.location.origin}/audit/${slug}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Success",
      description: "Share URL copied to clipboard!",
    });
  };

  const viewAudit = (slug: string) => {
    window.open(`/audit/${slug}`, '_blank');
  };

  const deleteAudit = async (id: string, clientName: string) => {
    if (!confirm(`Are you sure you want to delete the audit for ${clientName}?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('audit_reports')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Audit for ${clientName} deleted successfully`,
      });
      
      fetchAudits();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete audit report",
        variant: "destructive",
      });
    }
  };

  const toggleAuditLock = async (auditId: string, currentLockStatus: boolean) => {
    try {
      if (currentLockStatus) {
        // Confirm unlock
        if (!confirm("Unlocking this audit will cause it to re-render using the latest templates. Any previous snapshot will be lost. Are you sure you want to unlock it?")) {
          return;
        }
        await unlockAudit(auditId);
        toast({
          title: "Success",
          description: "Audit unlocked successfully",
        });
      } else {
        await lockAudit(auditId);
        toast({
          title: "Success",
          description: "Audit locked and snapshot generated",
        });
      }
      fetchAudits();
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to ${currentLockStatus ? 'unlock' : 'lock'} audit`,
        variant: "destructive",
      });
    }
  };

  const archiveAudits = async (auditIds: string[]) => {
    try {
      const { error } = await supabase
        .from('audit_reports')
        .update({ status: 'archived' })
        .in('id', auditIds);

      if (error) throw error;

      toast({
        title: "Success",
        description: `${auditIds.length} audit(s) archived successfully`,
      });
      
      setSelectedAudits(new Set());
      fetchAudits();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to archive audits",
        variant: "destructive",
      });
    }
  };

  const restoreAudits = async (auditIds: string[]) => {
    try {
      const { error } = await supabase
        .from('audit_reports')
        .update({ status: 'active' })
        .in('id', auditIds);

      if (error) throw error;

      toast({
        title: "Success",
        description: `${auditIds.length} audit(s) restored successfully`,
      });
      
      setSelectedAudits(new Set());
      fetchAudits();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to restore audits",
        variant: "destructive",
      });
    }
  };

  const bulkLockSelected = async () => {
    const auditIds = Array.from(selectedAudits);
    try {
      await bulkLockAudits(auditIds);
      toast({
        title: "Success",
        description: `${auditIds.length} audit(s) locked successfully`,
      });
      setSelectedAudits(new Set());
      fetchAudits();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to lock selected audits",
        variant: "destructive",
      });
    }
  };

  const bulkUnlockSelected = async () => {
    if (!confirm("Unlocking these audits will cause them to re-render using the latest templates. Any previous snapshots will be lost. Are you sure?")) {
      return;
    }

    const auditIds = Array.from(selectedAudits);
    try {
      await bulkUnlockAudits(auditIds);
      toast({
        title: "Success",
        description: `${auditIds.length} audit(s) unlocked successfully`,
      });
      setSelectedAudits(new Set());
      fetchAudits();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to unlock selected audits",
        variant: "destructive",
      });
    }
  };

  const handleSelectAudit = (auditId: string, checked: boolean) => {
    const newSelected = new Set(selectedAudits);
    if (checked) {
      newSelected.add(auditId);
    } else {
      newSelected.delete(auditId);
    }
    setSelectedAudits(newSelected);
  };

  const handleSelectAll = (checked: boolean) => {
    const filteredAudits = audits.filter(audit => 
      showArchived ? audit.status === 'archived' : audit.status !== 'archived'
    );
    if (checked) {
      const visibleAudits = filteredAudits.map(audit => audit.id);
      setSelectedAudits(new Set(visibleAudits));
    } else {
      setSelectedAudits(new Set());
    }
  };

  const copyAuditCode = (auditCode: string, clientName: string) => {
    navigator.clipboard.writeText(auditCode);
    toast({
      title: "Success",
      description: `Audit code for ${clientName} copied to clipboard!`,
    });
  };

  return {
    audits,
    loading,
    editingAudit,
    setEditingAudit,
    selectedAudits,
    showArchived,
    setShowArchived,
    copyShareUrl,
    viewAudit,
    deleteAudit,
    archiveAudits,
    restoreAudits,
    handleSelectAudit,
    handleSelectAll,
    copyAuditCode,
    fetchAudits,
    toggleAuditLock,
    bulkLockSelected,
    bulkUnlockSelected,
  };
};
