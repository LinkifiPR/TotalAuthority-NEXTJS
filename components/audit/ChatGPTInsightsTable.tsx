"use client";


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Brain, Sparkles, Zap, Eye, Target, BarChart3 } from 'lucide-react';

interface ChatGPTInsightsTableProps {
  data: any;
  clientName?: string;
}

export const ChatGPTInsightsTable: React.FC<ChatGPTInsightsTableProps> = ({ data, clientName }) => {
  // Only show the component if we have actual insights data
  if (!data.chatgpt_insights || !Array.isArray(data.chatgpt_insights) || data.chatgpt_insights.length === 0) {
    return (
      <Card className="mb-8 animate-fade-in hover:shadow-lg transition-all duration-500 border-l-4 border-l-cyan-400">
        <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-100/20 to-blue-100/20 animate-pulse"></div>
          <CardTitle className="flex items-center space-x-3 text-cyan-900 relative z-10">
            <div className="relative">
              <Brain className="w-7 h-7 animate-pulse" />
              <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-cyan-500 animate-ping" />
            </div>
            <span className="text-xl">Insight — Why ChatGPT Picks These Names</span>
            <div className="flex items-center space-x-2 ml-auto">
              <img 
                src="https://cdn.brandfetch.io/openai.com/w/512/h/512/symbol?c=1idP0DrE2OZDRG5HYTw" 
                alt="OpenAI" 
                className="w-5 h-5 animate-pulse"
              />
              <BarChart3 className="w-5 h-5 animate-pulse" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-8 text-gray-500">
            <Brain className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">No ChatGPT Insights Available</p>
            <p className="text-sm">
              ChatGPT insights data is not available for this audit report.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-8 animate-fade-in hover:shadow-lg transition-all duration-500 border-l-4 border-l-cyan-400">
      <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-100/20 to-blue-100/20 animate-pulse"></div>
        <CardTitle className="flex items-center space-x-3 text-cyan-900 relative z-10">
          <div className="relative">
            <Brain className="w-7 h-7 animate-pulse" />
            <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-cyan-500 animate-ping" />
          </div>
          <span className="text-xl">Insight — Why ChatGPT Picks These Names</span>
          <div className="flex items-center space-x-2 ml-auto">
            <img 
              src="https://cdn.brandfetch.io/openai.com/w/512/h/512/symbol?c=1idP0DrE2OZDRG5HYTw" 
              alt="OpenAI" 
              className="w-5 h-5 animate-pulse"
            />
            <BarChart3 className="w-5 h-5 animate-pulse" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="overflow-x-auto">
          <Table className="relative">
            <TableHeader>
              <TableRow className="hover:bg-cyan-50/50 transition-colors duration-300">
                <TableHead className="font-bold text-cyan-900 text-base">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 animate-pulse" />
                    <span>Model Signal</span>
                  </div>
                </TableHead>
                <TableHead className="font-bold text-cyan-900 text-base">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 animate-pulse" />
                    <span>Evidence</span>
                  </div>
                </TableHead>
                <TableHead className="font-bold text-cyan-900 text-base">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 animate-pulse" />
                    <span>Implication for {clientName?.split(' ')[0] || 'Client'}</span>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.chatgpt_insights.map((insight: any, index: number) => (
                <TableRow key={index} className="hover:bg-gradient-to-r hover:from-cyan-50/50 hover:to-blue-50/50 transition-all duration-300 animate-fade-in border-b border-cyan-100" style={{ animationDelay: `${index * 100}ms` }}>
                  <TableCell className="font-semibold text-cyan-800 p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
                      <span>{insight.signal}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-700 p-4 leading-relaxed">{insight.evidence}</TableCell>
                  <TableCell className="text-sm text-gray-700 p-4 leading-relaxed font-medium">{insight.implication}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
