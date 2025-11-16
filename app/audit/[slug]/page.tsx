"use client";


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { AuditPasswordForm } from '@/components/audit/AuditPasswordForm';
import { AuditLoadingState } from '@/components/audit/AuditLoadingState';
import { AuditHeader } from '@/components/audit/AuditHeader';
import { AuditContentRenderer } from '@/components/audit/AuditContentRenderer';

interface AuditData {
  id: string;
  client_name: string;
  audit_data: any;
  created_at: string;
  reviewer_name?: string;
  loom_video_url?: string;
  key_strengths?: string[];
  priority_actions?: string[];
  strategic_insights?: string[];
  review_status?: string;
  is_locked?: boolean;
  html_snapshot?: string;
  snapshot_data?: any;
  snapshot_generated_at?: string;
  snapshot_version?: string;
}

const AuditReport = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [auditData, setAuditData] = useState<AuditData | null>(null);
  const [loading, setLoading] = useState(true);
  const [userOwnsAudit, setUserOwnsAudit] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (slug) {
      checkAccess();
    }
  }, [slug, user]);

  const checkAccess = async () => {
    if (!slug) return;

    try {
      console.log('🔍 FETCHING AUDIT DATA for slug:', slug);
      
      // Fetch the audit data with HTML snapshot field
      const { data: audit, error: auditError } = await supabase
        .from('audit_reports')
        .select('*, is_locked, html_snapshot, snapshot_data, snapshot_generated_at, snapshot_version')
        .eq('share_url_slug', slug)
        .single();

      if (auditError) {
        console.error('Audit fetch error:', auditError);
        toast({
          title: "Error",
          description: "Audit report not found",
          variant: "destructive",
        });
        navigate('/');
        return;
      }

      console.log('📊 RAW AUDIT DATA FROM SUPABASE:', {
        id: audit.id,
        client_name: audit.client_name,
        is_locked: audit.is_locked,
        is_locked_type: typeof audit.is_locked,
        has_html_snapshot: !!audit.html_snapshot,
        has_json_snapshot: !!audit.snapshot_data,
        snapshot_version: audit.snapshot_version
      });

      setAuditData(audit);

      // If user is authenticated, check if they own this audit
      let ownsAudit = false;
      if (user) {
        const { data: userAuditCode } = await supabase
          .from('user_audit_codes')
          .select('*')
          .eq('user_id', user.id)
          .eq('audit_report_id', audit.id)
          .maybeSingle();

        if (userAuditCode) {
          console.log('User owns this audit through audit code');
          ownsAudit = true;
          setUserOwnsAudit(true);
        }
      }

      // Check if audit is locked - if so, require password unless user owns it
      if (audit.is_locked && !ownsAudit) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
      
      setLoading(false);
    } catch (error: any) {
      console.error('Error checking access:', error);
      toast({
        title: "Error",
        description: "Failed to load audit report",
        variant: "destructive",
      });
      navigate('/');
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'totalauthority123') {
      setIsAuthenticated(true);
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid password",
        variant: "destructive",
      });
    }
  };

  // Show password form only if audit is locked and user is not authenticated
  if (!isAuthenticated && !loading && auditData?.is_locked) {
    return (
      <AuditPasswordForm
        password={password}
        setPassword={setPassword}
        onSubmit={handlePasswordSubmit}
      />
    );
  }

  if (loading) {
    return <AuditLoadingState />;
  }

  // For locked audits with HTML snapshots, we render the audit data directly
  // without header modifications since the snapshot is completely self-contained
  const shouldUseCompleteSnapshot = auditData?.is_locked && auditData?.html_snapshot;
  
  if (shouldUseCompleteSnapshot) {
    console.log('✅ Rendering complete HTML snapshot - no header needed');
    return (
      <div className="min-h-screen">
        <AuditContentRenderer auditData={auditData} />
      </div>
    );
  }

  // For other audits (unlocked or JSON-snapshot locked), use normal rendering with header
  const isRenderingFromSnapshot = auditData?.is_locked && auditData?.snapshot_data;
  
  // CRITICAL FIX: Always pass the original auditData with metadata, not just snapshot_data
  // The snapshot_data only contains the audit content, not the is_locked metadata
  const renderData = auditData;

  console.log('🎨 PREPARING TO RENDER:', {
    is_locked: auditData?.is_locked,
    has_html_snapshot: !!auditData?.html_snapshot,
    has_json_snapshot: !!auditData?.snapshot_data,
    isRenderingFromSnapshot,
    renderData_is_locked: renderData?.is_locked,
    renderData_client_name: renderData?.client_name
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-4 sm:py-8 px-2 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <AuditHeader
          clientName={renderData?.client_name}
          createdAt={renderData?.created_at || auditData?.created_at || ''}
          userOwnsAudit={userOwnsAudit}
          isLocked={auditData?.is_locked}
          snapshotVersion={auditData?.snapshot_version}
          isFromSnapshot={isRenderingFromSnapshot}
          snapshotData={auditData?.snapshot_data}
        />

        <div className="bg-white rounded-xl shadow-lg border p-4 sm:p-6 lg:p-8 animate-fade-in hover:shadow-xl transition-all duration-500 relative overflow-hidden" data-audit-container>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 to-blue-50/30"></div>
          <div className="relative z-10">
            {renderData && (
              <AuditContentRenderer 
                auditData={renderData} 
                isFromSnapshot={isRenderingFromSnapshot} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditReport;
