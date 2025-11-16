"use client";


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MegaSummarySectionProps {
  data: any;
  clientName?: string;
}

export const MegaSummarySection: React.FC<MegaSummarySectionProps> = ({ data, clientName }) => {
  // Extract key metrics and insights for the mega summary
  const overallScore = data?.overall_score || data?.visibility_score || 'N/A';
  const totalFindings = data?.discovery_phrases?.length || 0;
  const knowledgeItems = data?.chatgpt_knowledge?.length || 0;
  const quickWins = data?.quick_wins?.length || 0;

  return (
    <Card className="animate-fade-in bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-blue-800">
          🎯 Mega Summary for {clientName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-blue-600">{overallScore}</div>
            <div className="text-sm text-gray-600">Overall Score</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-green-600">{totalFindings}</div>
            <div className="text-sm text-gray-600">Key Findings</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-purple-600">{knowledgeItems}</div>
            <div className="text-sm text-gray-600">Knowledge Items</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-orange-600">{quickWins}</div>
            <div className="text-sm text-gray-600">Quick Wins</div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Executive Summary</h3>
          <p className="text-gray-700 leading-relaxed">
            This comprehensive audit reveals significant opportunities for {clientName} to enhance their local visibility presence. 
            With an overall score of {overallScore}, we've identified {totalFindings} key discovery areas, 
            analyzed {knowledgeItems} knowledge graph elements, and outlined {quickWins} immediate quick wins 
            that can drive measurable improvements in local search performance.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
