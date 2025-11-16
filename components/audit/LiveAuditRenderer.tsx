"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { VisibilityScoreChart } from './VisibilityScoreChart';
import { ProjectedImpactChart } from './ProjectedImpactChart';
import { VideoReviewSection } from './VideoReviewSection';
import { ExecutiveScorecard } from './ExecutiveScorecard';
import { DiscoveryFindingsSection } from './DiscoveryFindingsSection';
import { KnowledgeSection } from './KnowledgeSection';
import { CitationReviewsSection } from './CitationReviewsSection';
import { KnowledgeGraphSnapshot } from './KnowledgeGraphSnapshot';
import { ChatGPTInsightsTable } from './ChatGPTInsightsTable';
import { QuickWinsSection } from './QuickWinsSection';
import { NextStepsSection } from './NextStepsSection';
// NO MegaSummarySection import - removed
// NO PaidAuditCTA import - removed from all future audits

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
}

interface LiveAuditRendererProps {
  auditData: AuditData;
}

export const LiveAuditRenderer: React.FC<LiveAuditRendererProps> = ({ auditData }) => {
  console.log('LiveAuditRenderer: Rendering live/unlocked audit - NO Mega Summary, NO CTA');

  // Parse the audit_data - it might be a string or already an object
  let parsedData;
  try {
    if (typeof auditData.audit_data === 'string') {
      parsedData = JSON.parse(auditData.audit_data);
    } else {
      parsedData = auditData.audit_data;
    }
  } catch (error) {
    console.error('Error parsing audit data:', error);
    parsedData = auditData.audit_data;
  }

  // If it's just plain text content, display it in a readable format
  if (typeof parsedData === 'object' && parsedData.content && typeof parsedData.content === 'string') {
    return (
      <div className="prose max-w-none space-y-8">
        <VideoReviewSection auditData={auditData} />
        <Card className="animate-fade-in">
          <CardContent className="p-8">
            <pre className="whitespace-pre-wrap bg-gray-50 p-6 rounded-lg text-sm leading-relaxed">
              {parsedData.content}
            </pre>
          </CardContent>
        </Card>
        
        {/* NO Mega Summary - removed */}
        {/* NO CTA - removed from all future audits */}
      </div>
    );
  }

  // Structured audit report template - back to original without Mega Summary
  return (
    <div className="space-y-8">
      <VideoReviewSection auditData={auditData} />
      <VisibilityScoreChart data={parsedData} />
      <ProjectedImpactChart data={parsedData} />
      <ExecutiveScorecard data={parsedData} />
      <DiscoveryFindingsSection data={parsedData} />
      <KnowledgeSection data={parsedData} />
      <CitationReviewsSection data={parsedData} />
      <KnowledgeGraphSnapshot data={parsedData} />
      <ChatGPTInsightsTable data={parsedData} clientName={auditData?.client_name} />
      <QuickWinsSection data={parsedData} />
      <NextStepsSection data={parsedData} />
      
      {/* NO Mega Summary Section - removed */}
      {/* NO CTA - permanently removed from all future audits */}
      
      {/* Fallback: Show raw data if structured sections don't have data */}
      {(!parsedData.overall_score && !parsedData.discovery_phrases && !parsedData.chatgpt_knowledge) && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Complete Audit Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap bg-gray-50 p-6 rounded-lg text-sm">
              {JSON.stringify(parsedData, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
