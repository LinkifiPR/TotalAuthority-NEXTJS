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
import { MegaSummarySection } from './MegaSummarySection';
// NOTE: LinkifiCTASection is intentionally NOT imported - locked audits should not show CTA

interface SnapshotAuditRendererV2Props {
  snapshotData: any;
  auditData: any;
}

export const SnapshotAuditRendererV2: React.FC<SnapshotAuditRendererV2Props> = ({ 
  snapshotData, 
  auditData 
}) => {
  console.log('SnapshotAuditRendererV2: Rendering locked audit with V2 template - FROZEN VERSION');

  // Parse the audit_data from snapshot - it might be a string or already an object
  let parsedData;
  try {
    if (typeof snapshotData.audit_data === 'string') {
      parsedData = JSON.parse(snapshotData.audit_data);
    } else {
      parsedData = snapshotData.audit_data;
    }
  } catch (error) {
    console.error('Error parsing snapshot audit data:', error);
    parsedData = snapshotData.audit_data;
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
        <MegaSummarySection data={parsedData} clientName={auditData?.client_name} />
        {/* NO Linkifi CTA for locked audits */}
      </div>
    );
  }

  // V2 Template: Original audit layout + NEW Mega Summary section
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
      
      {/* NEW in V2: Mega Summary Section */}
      <MegaSummarySection data={parsedData} clientName={auditData?.client_name} />
      
      {/* NO Linkifi CTA - This is the ONLY difference from live audits */}
      
      {/* Fallback: Show raw data if structured sections don't have data */}
      {(!parsedData.overall_score && !parsedData.discovery_phrases && !parsedData.chatgpt_knowledge) && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Complete Audit Analysis (Locked V2)</CardTitle>
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
