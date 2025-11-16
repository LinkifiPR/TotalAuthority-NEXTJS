"use client";


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Zap, Calendar, Lightbulb, Activity, AlertCircle } from 'lucide-react';

interface QuickWinsSectionProps {
  data: any;
}

export const QuickWinsSection: React.FC<QuickWinsSectionProps> = ({ data }) => (
  <Card className="mb-8 animate-fade-in hover:shadow-lg transition-all duration-500 border-l-4 border-l-yellow-400">
    <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-100/20 to-orange-100/20 animate-pulse"></div>
      <CardTitle className="flex items-center space-x-3 text-yellow-900 relative z-10">
        <div className="relative">
          <TrendingUp className="w-7 h-7 animate-bounce" />
          <Zap className="w-4 h-4 absolute -top-1 -right-1 text-yellow-500 animate-ping" />
        </div>
        <span className="text-xl">Quick-Win Actions (&lt; 30 days)</span>
        <Calendar className="w-5 h-5 ml-auto animate-pulse" />
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <div className="space-y-5">
        {data.quick_wins?.map((action: any, index: number) => (
          <div key={index} className="border-l-4 border-yellow-400 pl-6 py-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-r-xl hover:shadow-lg transition-all duration-500 hover:scale-[1.01] transform animate-fade-in relative overflow-hidden" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-200/20 rounded-full -translate-y-12 translate-x-12"></div>
            <div className="flex items-start justify-between relative z-10">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-yellow-900 animate-pulse">
                    {index + 1}
                  </div>
                  <h4 className="font-bold text-gray-800 text-lg leading-tight">
                    {action.title}
                  </h4>
                  <Lightbulb className="w-5 h-5 text-yellow-600 animate-bounce" />
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed font-medium pl-11">{action.description}</p>
                <div className="flex space-x-3 pl-11">
                  <Badge variant={action.effort === 'Low' ? 'default' : action.effort === 'Med' ? 'secondary' : 'destructive'} className="hover:scale-105 transition-transform duration-200">
                    <Activity className="w-3 h-3 mr-1" />
                    {action.effort} Effort
                  </Badge>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200 transition-colors duration-200">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {action.impact}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        )) || (
          <div className="text-gray-500 text-center py-8 flex items-center justify-center space-x-2">
            <AlertCircle className="w-5 h-5" />
            <span>No quick wins data available</span>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);
