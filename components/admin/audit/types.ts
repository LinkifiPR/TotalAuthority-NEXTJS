
export interface AuditReport {
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
  audit_data?: any;
  ai_feedback?: string;
  is_locked?: boolean;
  snapshot_data?: any;
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

export interface ReviewFormData {
  reviewer_name: string;
  video_option: 'include' | 'exclude';
  loom_video_url: string;
  key_strengths: string;
  priority_actions: string;
  strategic_insights: string;
  ai_feedback: string;
}

export interface AuditDashboardProps {
  refreshTrigger: number;
}
