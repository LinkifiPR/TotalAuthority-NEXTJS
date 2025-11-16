"use client";


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Globe, Target, AlertCircle, Building, Lightbulb, CheckCircle } from 'lucide-react';

interface KnowledgeGraphSnapshotProps {
  data: any;
}

export const KnowledgeGraphSnapshot: React.FC<KnowledgeGraphSnapshotProps> = ({ data }) => {
  // Determine if knowledge panel is present
  const knowledgePanelPresent = data.knowledge_panel === 'Present' || data.knowledge_panel_status?.toLowerCase().includes('present');
  const knowledgePanelStatus = data.knowledge_panel || data.knowledge_panel_status || 'Not detected';
  
  return (
    <Card className="mb-8 animate-fade-in hover:shadow-lg transition-all duration-500 border-l-4 border-l-slate-400">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-100/20 to-gray-100/20 animate-pulse"></div>
        <CardTitle className="flex items-center space-x-3 text-slate-900 relative z-10">
          <div className="relative">
            <Shield className="w-7 h-7 animate-pulse" />
            <Globe className="w-4 h-4 absolute -bottom-1 -right-1 text-slate-500 animate-bounce" />
          </div>
          <span className="text-xl">Google Knowledge‑Graph Snapshot</span>
          <div className="flex items-center space-x-2 ml-auto">
            <img 
              src="https://cdn.brandfetch.io/google.com/w/501/h/512/symbol?c=1idP0DrE2OZDRG5HYTw" 
              alt="Google" 
              className="w-5 h-5 animate-pulse"
            />
            <Target className="w-5 h-5 animate-pulse" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className={`p-5 bg-gradient-to-r rounded-xl border-2 hover:shadow-md transition-all duration-300 relative overflow-hidden ${
                knowledgePanelPresent 
                  ? 'from-green-50 to-emerald-50 border-green-200' 
                  : 'from-red-50 to-pink-50 border-red-200'
              }`}>
                <div className={`absolute top-0 right-0 w-16 h-16 rounded-full -translate-y-8 translate-x-8 ${
                  knowledgePanelPresent ? 'bg-green-200/20' : 'bg-red-200/20'
                }`}></div>
                <div className="flex items-center space-x-3 mb-3 relative z-10">
                  <div className={`p-2 rounded-full ${
                    knowledgePanelPresent ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {knowledgePanelPresent ? (
                      <CheckCircle className="w-5 h-5 text-green-600 animate-pulse" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600 animate-pulse" />
                    )}
                  </div>
                  <span className={`font-bold text-lg ${
                    knowledgePanelPresent ? 'text-green-700' : 'text-red-700'
                  }`}>Knowledge Panel</span>
                </div>
                <p className={`font-medium leading-relaxed ${
                  knowledgePanelPresent ? 'text-green-600' : 'text-red-600'
                }`}>
                  {knowledgePanelStatus}
                </p>
              </div>
              
              <div className="p-5 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border-2 border-orange-200 hover:shadow-md transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-orange-200/20 rounded-full -translate-y-8 translate-x-8"></div>
                <div className="flex items-center space-x-3 mb-3 relative z-10">
                  <div className="p-2 bg-orange-100 rounded-full">
                    <Building className="w-5 h-5 text-orange-600 animate-pulse" />
                  </div>
                  <span className="font-bold text-orange-700 text-lg">Schema Markup</span>
                </div>
                <p className="text-orange-600 font-medium leading-relaxed">
                  {data.schema_status || 'No schema markup detected'}
                </p>
              </div>
            </div>
            
            <div className="p-6 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border-2 border-yellow-300 hover:shadow-lg transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/30 to-amber-100/30 animate-pulse"></div>
              <div className="flex items-center space-x-3 mb-4 relative z-10">
                <div className="p-2 bg-yellow-100 rounded-full">
                  <Target className="w-6 h-6 text-yellow-700 animate-spin" style={{ animationDuration: '4s' }} />
                </div>
                <span className="font-bold text-yellow-800 text-lg">Impact & Implication</span>
                <Lightbulb className="w-5 h-5 text-yellow-600 animate-bounce ml-auto" />
              </div>
              <p className="text-yellow-800 font-medium leading-relaxed relative z-10">
                {data.kg_implication || 'Without a resolved entity, AI systems may have weaker trust signals for this business.'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
