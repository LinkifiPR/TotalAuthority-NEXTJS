"use client";


import React from 'react';
import { LiveAuditRenderer } from './LiveAuditRenderer';
import { LiveAuditRendererV4 } from './LiveAuditRendererV4';
import { SnapshotAuditRendererV1 } from './SnapshotAuditRendererV1';
import { SnapshotAuditRendererV2 } from './SnapshotAuditRendererV2';
import { SnapshotAuditRendererV3 } from './SnapshotAuditRendererV3';
import { SnapshotAuditRendererV4 } from './SnapshotAuditRendererV4';
import { StaticAuditRenderer } from './StaticAuditRenderer';

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
  snapshot_version?: string;
}

interface AuditContentRendererProps {
  auditData: AuditData;
  isFromSnapshot?: boolean;
}

export const AuditContentRenderer: React.FC<AuditContentRendererProps> = ({
  auditData,
  isFromSnapshot = false
}) => {
  console.log('AuditContentRenderer DEBUG:', {
    client_name: auditData.client_name,
    is_locked: auditData.is_locked,
    has_html_snapshot: !!auditData.html_snapshot,
    html_snapshot_length: auditData.html_snapshot?.length || 0,
    has_json_snapshot: !!auditData.snapshot_data,
    snapshot_version: auditData.snapshot_version,
    isFromSnapshot: isFromSnapshot
  });

  // CRITICAL: Priority 1 - If locked and has HTML snapshot, use ONLY static HTML
  // This completely bypasses all React components and live rendering
  if (auditData.is_locked && auditData.html_snapshot) {
    console.log('✅ Using StaticAuditRenderer - COMPLETELY ISOLATED from live code');
    return (
      <StaticAuditRenderer
        htmlSnapshot={auditData.html_snapshot}
        clientName={auditData.client_name}
      />
    );
  }

  // Priority 2: If locked and has JSON snapshot, use VERSIONED snapshot renderer
  if (auditData.is_locked && auditData.snapshot_data) {
    const version = auditData.snapshot_version || 'v1'; // Default to v1 for legacy locks
    console.log(`✅ Using SnapshotAuditRenderer${version.toUpperCase()} for locked audit`);
    
    // Versioned renderer switching - this ensures locked audits NEVER change
    switch (version) {
      case 'v1':
        return (
          <SnapshotAuditRendererV1
            snapshotData={auditData.snapshot_data}
            auditData={auditData}
          />
        );
      case 'v2':
        return (
          <SnapshotAuditRendererV2
            snapshotData={auditData.snapshot_data}
            auditData={auditData}
          />
        );
      case 'v3':
        return (
          <SnapshotAuditRendererV3
            snapshotData={auditData.snapshot_data}
            auditData={auditData}
          />
        );
      case 'v4':
        return (
          <SnapshotAuditRendererV4
            snapshotData={auditData.snapshot_data}
            auditData={auditData}
          />
        );
      default:
        return (
          <SnapshotAuditRendererV1
            snapshotData={auditData.snapshot_data}
            auditData={auditData}
          />
        );
    }
  }

  // Priority 3: Live rendering for unlocked audits - check for V4 preference
  if (!auditData.is_locked) {
    // For now, we'll use V4 by default for unlocked audits to enable PDF export
    // This can be made configurable later
    const useV4 = true; // This could be based on user preference or audit settings
    
    if (useV4) {
      console.log('✅ Using LiveAuditRendererV4 for unlocked audit with PDF export');
      return <LiveAuditRendererV4 auditData={auditData} />;
    } else {
      console.log('✅ Using LiveAuditRenderer for unlocked audit');
      return <LiveAuditRenderer auditData={auditData} />;
    }
  }

  // Fallback: Should never happen
  console.error('❌ CRITICAL: Locked audit has no snapshots available!', {
    client_name: auditData.client_name,
    is_locked: auditData.is_locked,
    has_html_snapshot: !!auditData.html_snapshot,
    has_json_snapshot: !!auditData.snapshot_data
  });
  
  return (
    <div className="p-8 bg-red-50 border border-red-200 rounded-lg">
      <h3 className="text-red-800 font-semibold mb-2">Rendering Error</h3>
      <p className="text-red-700">
        This audit is locked but no snapshot data is available. 
        Please contact support with audit code: {auditData.client_name}
      </p>
    </div>
  );
};
