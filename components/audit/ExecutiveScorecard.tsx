"use client";


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Sparkles, Search, Brain, AlertCircle, Target, Zap, Activity, Eye, BarChart3 } from 'lucide-react';

interface ExecutiveScorecardProps {
  data: any;
}

export const ExecutiveScorecard: React.FC<ExecutiveScorecardProps> = ({ data }) => (
  <Card className="mb-8 animate-fade-in hover:shadow-lg transition-all duration-500 border-l-4 border-l-orange-400">
    <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-100/20 to-red-100/20 animate-pulse"></div>
      <CardTitle className="flex items-center space-x-3 text-orange-900 relative z-10">
        <div className="relative">
          <Award className="w-7 h-7 animate-bounce" />
          <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-yellow-500 animate-ping" />
        </div>
        <span className="text-xl">Executive Scorecard</span>
        <div className="flex items-center space-x-2 ml-auto">
          <img 
            src="https://cdn.brandfetch.io/openai.com/w/512/h/512/symbol?c=1idP0DrE2OZDRG5HYTw" 
            alt="OpenAI" 
            className="w-5 h-5 animate-pulse"
          />
          <BarChart3 className="w-5 h-5 animate-pulse text-orange-600" />
        </div>
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6 relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-100/30 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg hover:shadow-md transition-all duration-300 hover:scale-[1.02] transform border border-green-200">
            <div className="flex items-center space-x-2">
              <Search className="w-5 h-5 text-green-600 animate-pulse" />
              <span className="font-medium text-green-800">Discovery Phrases Coverage</span>
            </div>
            <Badge className="bg-green-100 text-green-800 animate-fade-in hover:bg-green-200 transition-colors duration-200">
              <Activity className="w-3 h-3 mr-1" />
              {data.discovery_coverage || "3 of 4 queries"}
            </Badge>
          </div>
          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg hover:shadow-md transition-all duration-300 hover:scale-[1.02] transform border border-blue-200">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-blue-600 animate-pulse" />
              <span className="font-medium text-blue-800">Company Knowledge Accuracy</span>
            </div>
            <Badge variant="secondary" className="animate-fade-in hover:bg-gray-200 transition-colors duration-200">
              <Eye className="w-3 h-3 mr-1" />
              {data.knowledge_accuracy || "Partial"}
            </Badge>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg hover:shadow-md transition-all duration-300 hover:scale-[1.02] transform border border-red-200">
            <div className="flex items-center space-x-2">
              <img 
                src="https://cdn.brandfetch.io/google.com/w/501/h/512/symbol?c=1idP0DrE2OZDRG5HYTw" 
                alt="Google" 
                className="w-5 h-5 animate-pulse"
              />
              <span className="font-medium text-red-800">Google Knowledge Panel</span>
            </div>
            <Badge variant="destructive" className="animate-fade-in hover:bg-red-600 transition-colors duration-200">
              <AlertCircle className="w-3 h-3 mr-1" />
              {data.knowledge_panel || "Not Present"}
            </Badge>
          </div>
          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-violet-100 rounded-lg border-2 border-purple-300 hover:shadow-xl transition-all duration-500 hover:scale-[1.03] transform">
            <div className="flex items-center space-x-2">
              <Target className="w-6 h-6 text-purple-700 animate-spin" style={{ animationDuration: '3s' }} />
              <span className="font-bold text-purple-900">Overall Visibility Score</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-4xl font-bold text-purple-600 animate-pulse">
                {data.overall_score || "7"}
              </div>
              <div className="text-lg text-purple-500">/10</div>
              <Zap className="w-5 h-5 text-yellow-500 animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);
