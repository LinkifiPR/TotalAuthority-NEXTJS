"use client";

import React, { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
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

interface SnapshotAuditRendererV4Props {
  snapshotData: any;
  auditData: any;
}

export const SnapshotAuditRendererV4: React.FC<SnapshotAuditRendererV4Props> = ({ 
  snapshotData, 
  auditData 
}) => {
  console.log('SnapshotAuditRendererV4: Rendering locked audit with V4 template - WITH PDF EXPORT');
  
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    if (contentRef.current && !isExporting) {
      setIsExporting(true);
      try {
        await exportToPDF(contentRef.current, auditData.client_name || 'audit-report');
      } finally {
        setIsExporting(false);
      }
    }
  };

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
      <div className="space-y-6">
        {/* PDF Export Button */}
        <div className="flex justify-end">
          <Button onClick={handleExportPDF} disabled={isExporting} className="flex items-center gap-2">
            {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
            {isExporting ? 'Exporting...' : 'Export as PDF'}
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
        <Button onClick={handleExportPDF} disabled={isExporting} className="flex items-center gap-2">
          {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
          {isExporting ? 'Exporting...' : 'Export as PDF'}
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
              <CardTitle>Complete Audit Analysis (Locked V4)</CardTitle>
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