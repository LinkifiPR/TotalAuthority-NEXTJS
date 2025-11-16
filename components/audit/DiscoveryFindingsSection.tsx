"use client";


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, MessageSquare, ChevronRight, CheckCircle, AlertCircle, Lightbulb, Star, Sparkles } from 'lucide-react';

interface DiscoveryFindingsSectionProps {
  data: any;
}

export const DiscoveryFindingsSection: React.FC<DiscoveryFindingsSectionProps> = ({ data }) => (
  <Card className="mb-8 animate-fade-in hover:shadow-lg transition-all duration-500 border-l-4 border-l-blue-400">
    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-indigo-100/20 animate-pulse"></div>
      <CardTitle className="flex items-center space-x-3 text-blue-900 relative z-10">
        <div className="relative">
          <Search className="w-7 h-7 animate-pulse" />
          <MessageSquare className="w-4 h-4 absolute -bottom-1 -right-1 text-blue-500 animate-bounce" />
        </div>
        <span className="text-xl">Discovery-Phrase Findings</span>
        <div className="flex items-center space-x-2 ml-auto">
          <img 
            src="https://cdn.brandfetch.io/openai.com/w/512/h/512/symbol?c=1idP0DrE2OZDRG5HYTw" 
            alt="OpenAI" 
            className="w-5 h-5 animate-pulse"
          />
          <ChevronRight className="w-5 h-5 animate-pulse" />
        </div>
      </CardTitle>
      <CardDescription className="relative z-10">Fresh ChatGPT runs; bullet order mirrors model output</CardDescription>
    </CardHeader>
    <CardContent className="p-6">
      <div className="space-y-6">
        {data.discovery_phrases?.map((phrase: any, index: number) => (
          <div key={index} className="border-2 rounded-xl p-5 hover:shadow-lg transition-all duration-500 hover:scale-[1.01] transform animate-fade-in bg-gradient-to-r from-gray-50 to-blue-50/30" style={{ animationDelay: `${index * 150}ms` }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                </div>
                <h4 className="font-bold text-lg text-gray-800">{phrase.query}</h4>
              </div>
              <div className="flex items-center space-x-2">
                {phrase.mentioned ? (
                  <>
                    <CheckCircle className="w-6 h-6 text-green-500 animate-pulse" />
                    <Sparkles className="w-4 h-4 text-green-400 animate-ping" />
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-6 h-6 text-red-500 animate-pulse" />
                    <div className="w-4 h-4 bg-red-400 rounded-full animate-ping"></div>
                  </>
                )}
              </div>
            </div>
            <div className="text-sm text-gray-700 leading-relaxed mb-3 p-3 bg-white/70 rounded-lg">
              <div className="flex items-start space-x-2">
                <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-gray-800">Results:</strong> {phrase.results}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={phrase.mentioned ? "default" : "destructive"} className="animate-fade-in hover:scale-105 transition-transform duration-200">
                {phrase.mentioned ? `✅ ${phrase.mention_type}` : "❌ Not mentioned"}
              </Badge>
              {phrase.mentioned && <Star className="w-4 h-4 text-yellow-500 animate-spin" style={{ animationDuration: '2s' }} />}
            </div>
          </div>
        )) || (
          <div className="text-center text-gray-500 py-8 flex items-center justify-center space-x-2">
            <Search className="w-5 h-5 animate-pulse" />
            <span>No discovery phrase data available</span>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);
