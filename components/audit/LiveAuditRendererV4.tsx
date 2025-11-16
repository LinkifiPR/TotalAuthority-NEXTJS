"use client";

import React, { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
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
import { exportToPDF } from './utils/pdfExport';

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

interface LiveAuditRendererV4Props {
  auditData: AuditData;
}

export const LiveAuditRendererV4: React.FC<LiveAuditRendererV4Props> = ({ auditData }) => {
  console.log('LiveAuditRendererV4: Rendering live/unlocked audit V4 with PDF export');
  
  const contentRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    if (contentRef.current) {
      await exportToPDF(contentRef.current, auditData.client_name || 'audit-report');
    }
  };

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
      <div className="space-y-6">
        {/* PDF Export Button */}
        <div className="flex justify-end">
          <Button onClick={handleExportPDF} className="flex items-center gap-2">
            <Download size={16} />
            Export as PDF
          </Button>
        </div>
        
        <div ref={contentRef} className="prose max-w-none space-y-8">
          <VideoReviewSection auditData={auditData} />
          <Card className="animate-fade-in">
            <CardContent className="p-8">
              <pre className="whitespace-pre-wrap bg-gray-50 p-6 rounded-lg text-sm leading-relaxed">
                {parsedData.content}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // V4 Template: Original layout with PDF export capability
  return (
    <div className="space-y-6">
      {/* PDF Export Button */}
      <div className="flex justify-end">
        <Button onClick={handleExportPDF} className="flex items-center gap-2">
          <Download size={16} />
          Export as PDF
        </Button>
      </div>
      
      <div ref={contentRef} className="space-y-8">
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
        
        {/* Fallback: Show raw data if structured sections don't have data */}
        {(!parsedData.overall_score && !parsedData.discovery_phrases && !parsedData.chatgpt_knowledge) && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Complete Audit Analysis (Live V4)</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap bg-gray-50 p-6 rounded-lg text-sm">
                {JSON.stringify(parsedData, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};