"use client";


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Sparkles, CheckCircle, Target } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface VisibilityScoreChartProps {
  data: any;
}

export const VisibilityScoreChart: React.FC<VisibilityScoreChartProps> = ({ data }) => {
  const isMobile = useIsMobile();
  const score = parseInt(data.overall_score || "7");
  const pieData = [
    { name: 'Current Score', value: score, fill: '#f97316' },
    { name: 'Potential', value: 10 - score, fill: '#e5e7eb' }
  ];

  const chartConfig = {
    score: {
      label: "Visibility Score",
      theme: {
        light: "#f97316",
        dark: "#f97316"
      }
    }
  };

  return (
    <Card className="mb-8 animate-fade-in hover:shadow-lg transition-all duration-500 border-l-4 border-l-orange-500">
      <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100/20 to-red-100/20 animate-pulse"></div>
        <CardTitle className="flex items-center space-x-3 text-orange-900 relative z-10">
          <div className="relative">
            <BarChart3 className="w-7 h-7 animate-bounce" />
            <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-yellow-500 animate-ping" />
          </div>
          <span className="text-xl">AI Visibility Score Analysis</span>
          <img 
            src="https://cdn.brandfetch.io/openai.com/w/512/h/512/symbol?c=1idP0DrE2OZDRG5HYTw" 
            alt="OpenAI" 
            className="w-6 h-6 ml-auto animate-pulse"
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className={`grid gap-8 items-center ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
          <div className="relative w-full flex justify-center">
            <div className="relative">
              <ChartContainer config={chartConfig} className={`${isMobile ? 'h-48 w-48' : 'h-64 w-64'}`}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={isMobile ? 45 : 60}
                      outerRadius={isMobile ? 75 : 100}
                      startAngle={90}
                      endAngle={450}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <div className={`font-bold text-orange-600 ${isMobile ? 'text-3xl' : 'text-4xl'}`}>{score}</div>
                  <div className={`text-gray-500 ${isMobile ? 'text-xs' : 'text-sm'}`}>out of 10</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">Strong Performance</span>
              </div>
              <p className={`text-green-700 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                Your current AI visibility puts you ahead of {score * 10}% of competitors in your market.
              </p>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="w-5 h-5 text-orange-600" />
                <span className="font-semibold text-orange-800">Growth Potential</span>
              </div>
              <p className={`text-orange-700 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                Implementing quick wins could boost your score to {Math.min(10, score + 2)}/10 within 30 days.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
