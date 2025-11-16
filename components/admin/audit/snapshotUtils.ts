import { supabase } from '@/integrations/supabase/client';
import { AuditReport } from './types';
import { lockAuditWithSnapshot } from './htmlSnapshotUtils';

// CURRENT SNAPSHOT VERSION - update this when creating new versions
const CURRENT_SNAPSHOT_VERSION = 'v4'; // Updated to v4 - Added PDF export functionality

export const generateAuditSnapshot = async (audit: AuditReport): Promise<any> => {
  try {
    // Capture the current display state including time
    const currentDate = new Date();
    const displayDate = currentDate.toLocaleDateString();
    const displayTime = currentDate.toLocaleTimeString();
    
    // Create a comprehensive snapshot that preserves the current live state
    const snapshot = {
      id: audit.id,
      client_name: audit.client_name,
      share_url_slug: audit.share_url_slug,
      audit_code: audit.audit_code,
      created_at: audit.created_at,
      status: audit.status,
      reviewer_name: audit.reviewer_name,
      loom_video_url: audit.loom_video_url,
      key_strengths: audit.key_strengths,
      priority_actions: audit.priority_actions,
      strategic_insights: audit.strategic_insights,
      review_status: audit.review_status,
      audit_data: audit.audit_data,
      ai_feedback: audit.ai_feedback,
      snapshot_created_at: new Date().toISOString(),
      snapshot_version: CURRENT_SNAPSHOT_VERSION, // Will be saved to the audit record
      // Capture the header template state at time of locking
      header_template: {
        title: "🔍 Free LLM Visibility Mini‑Audit 🔥 ✨", // Current live template
        display_date: displayDate,
        display_time: displayTime, // Freeze the current time
        locked_at: currentDate.toISOString()
      },
      // Capture UI template state
      ui_template: {
        show_live_insights_badge: false, // Insights are no longer "live" once locked
        show_time_badge: true // Keep showing the time that was displayed when locked
      }
    };

    console.log(`Generated comprehensive snapshot with version ${CURRENT_SNAPSHOT_VERSION}:`, {
      client_name: snapshot.client_name,
      snapshot_version: snapshot.snapshot_version,
      display_time: displayTime,
      locked_at: snapshot.header_template.locked_at
    });

    return snapshot;
  } catch (error) {
    console.error('Error generating audit snapshot:', error);
    throw error;
  }
};

export const lockAudit = async (auditId: string): Promise<void> => {
  try {
    console.log(`Starting enhanced lock process with version ${CURRENT_SNAPSHOT_VERSION} for audit:`, auditId);
    
    // Try HTML snapshot first (if this works, we use it)
    try {
      await lockAuditWithSnapshot(auditId);
      console.log('Successfully locked audit with complete HTML snapshot');
      return;
    } catch (htmlError) {
      console.log('HTML snapshot failed, falling back to versioned JSON snapshot...');
    }
    
    // Fallback to versioned JSON snapshot
    const { data: audit, error: fetchError } = await supabase
      .from('audit_reports')
      .select('*')
      .eq('id', auditId)
      .single();

    if (fetchError) throw fetchError;

    const snapshot = await generateAuditSnapshot(audit);

    const { error: updateError } = await supabase
      .from('audit_reports')
      .update({
        is_locked: true,
        snapshot_data: snapshot,
        snapshot_generated_at: new Date().toISOString(),
        snapshot_version: CURRENT_SNAPSHOT_VERSION // This is the key field for versioning
      })
      .eq('id', auditId);

    if (updateError) throw updateError;
    
    console.log(`Successfully locked audit with ${CURRENT_SNAPSHOT_VERSION} JSON snapshot`);
  } catch (error) {
    console.error('Error locking audit:', error);
    throw error;
  }
};

export const unlockAudit = async (auditId: string): Promise<void> => {
  try {
    console.log('Unlocking audit:', auditId);
    
    const { error } = await supabase
      .from('audit_reports')
      .update({
        is_locked: false,
        snapshot_data: null,
        snapshot_generated_at: null,
        snapshot_version: null,
        html_snapshot: null // Clear HTML snapshot too
      })
      .eq('id', auditId);

    if (error) throw error;

    console.log('Successfully unlocked audit - will now use live templates');
  } catch (error) {
    console.error('Error unlocking audit:', error);
    throw error;
  }
};

export const bulkLockAudits = async (auditIds: string[]): Promise<void> => {
  try {
    console.log(`Bulk locking audits with version ${CURRENT_SNAPSHOT_VERSION}:`, auditIds.length);
    
    // Lock each audit individually to ensure proper snapshot generation
    for (const auditId of auditIds) {
      await lockAudit(auditId);
    }
    
    console.log(`Successfully bulk locked all audits with ${CURRENT_SNAPSHOT_VERSION} snapshots`);
  } catch (error) {
    console.error('Error bulk locking audits:', error);
    throw error;
  }
};

export const bulkUnlockAudits = async (auditIds: string[]): Promise<void> => {
  try {
    console.log('Bulk unlocking audits:', auditIds.length);
    
    const { error } = await supabase
      .from('audit_reports')
      .update({
        is_locked: false,
        snapshot_data: null,
        snapshot_generated_at: null,
        snapshot_version: null,
        html_snapshot: null
      })
      .in('id', auditIds);

    if (error) throw error;
    
    console.log('Successfully bulk unlocked audits - they will use live templates');
  } catch (error) {
    console.error('Error bulk unlocking audits:', error);
    throw error;
  }
};

// Utility function to get the current snapshot version
export const getCurrentSnapshotVersion = (): string => {
  return CURRENT_SNAPSHOT_VERSION;
};

// Documentation for future version updates:
// 
// TO CREATE A NEW VERSION:
// 1. Copy the latest SnapshotAuditRendererVX.tsx to SnapshotAuditRendererVY.tsx
// 2. Make your changes in the new VY file
// 3. Update CURRENT_SNAPSHOT_VERSION above to 'vY'
// 4. Add the new case to AuditContentRenderer.tsx switch statement
// 5. Test that old locked audits still use their original version
