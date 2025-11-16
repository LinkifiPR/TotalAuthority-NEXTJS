"use client";


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ChevronRight, Target } from 'lucide-react';

interface NextStepsSectionProps {
  data: any;
}

export const NextStepsSection: React.FC<NextStepsSectionProps> = ({ data }) => (
  <Card className="animate-fade-in hover:shadow-lg transition-all duration-500 border-l-4 border-l-indigo-400">
    <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-100/20 to-purple-100/20 animate-pulse"></div>
      <CardTitle className="flex items-center space-x-3 text-indigo-900 relative z-10">
        <div className="relative">
          <Calendar className="w-7 h-7 animate-pulse" />
          <ChevronRight className="w-4 h-4 absolute -bottom-1 -right-1 text-indigo-500 animate-bounce" />
        </div>
        <span className="text-xl">Suggested Next Steps</span>
        <Target className="w-5 h-5 ml-auto animate-pulse" />
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <div className="space-y-4">
        {data.next_steps?.map((step: string, index: number) => (
          <div key={index} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl hover:shadow-md transition-all duration-300 hover:scale-[1.01] transform animate-fade-in border border-indigo-200" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 animate-pulse">
              <span className="text-sm font-bold text-white">{index + 1}</span>
            </div>
            <div className="flex-1">
              <span className="text-gray-800 font-medium leading-relaxed">{step}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-indigo-400 mt-1 animate-pulse" />
          </div>
        )) || (
          <div className="text-gray-500 text-center py-8 flex items-center justify-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>No next steps data available</span>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);
