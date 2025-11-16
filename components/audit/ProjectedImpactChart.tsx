"use client";


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { TrendingUp, Zap, Calendar, Target, Activity } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface ProjectedImpactChartProps {
  data: any;
}

export const ProjectedImpactChart: React.FC<ProjectedImpactChartProps> = ({ data }) => {
  const isMobile = useIsMobile();
  const currentScore = parseInt(data.overall_score || "7");
  const projectedScore = Math.min(currentScore + 2.2, 10);
  
  const projectedData = [
    { week: 'Current', score: currentScore, label: 'Starting Point' },
    { week: 'Week 1', score: currentScore + 0.5, label: 'Schema Implementation' },
    { week: 'Week 2', score: currentScore + 1.2, label: 'Review Campaign' },
    { week: 'Week 3', score: currentScore + 1.8, label: 'Content Optimization' },
    { week: 'Week 4', score: projectedScore, label: 'Full Implementation' }
  ];

  const projectedPieData = [
    { name: 'Projected Score', value: projectedScore, fill: '#10b981' },
    { name: 'Remaining', value: 10 - projectedScore, fill: '#e5e7eb' }
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
    <Card className="mb-8 animate-fade-in hover:shadow-lg transition-all duration-500 border-l-4 border-l-blue-500">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-indigo-100/20 animate-pulse"></div>
        <CardTitle className="flex items-center space-x-3 text-blue-900 relative z-10">
          <div className="relative">
            <TrendingUp className="w-7 h-7 animate-bounce" />
            <Zap className="w-4 h-4 absolute -top-1 -right-1 text-blue-500 animate-ping" />
          </div>
          <span className={`${isMobile ? 'text-lg' : 'text-xl'}`}>Projected AI Visibility Impact</span>
          <div className="flex items-center space-x-2 ml-auto">
            <img 
              src="https://cdn.brandfetch.io/openai.com/w/512/h/512/symbol?c=1idP0DrE2OZDRG5HYTw" 
              alt="OpenAI" 
              className="w-5 h-5 animate-pulse"
            />
            <img 
              src="https://cdn.brandfetch.io/google.com/w/501/h/512/symbol?c=1idP0DrE2OZDRG5HYTw" 
              alt="Google" 
              className="w-5 h-5 animate-pulse"
            />
          </div>
        </CardTitle>
        <CardDescription className="relative z-10">30-day implementation timeline with projected outcome</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
          {/* Timeline Chart */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2 self-start w-full">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>Implementation Timeline</span>
            </h3>
            <div className="w-full flex justify-center">
              <ChartContainer config={chartConfig} className={`${isMobile ? 'h-60 w-full max-w-sm' : 'h-80 w-full max-w-lg'}`}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={projectedData} 
                    margin={{ 
                      top: 20, 
                      right: isMobile ? 5 : 20, 
                      left: isMobile ? 0 : 10, 
                      bottom: isMobile ? 60 : 5 
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="week" 
                      stroke="#64748b"
                      fontSize={isMobile ? 9 : 12}
                      angle={isMobile ? -45 : 0}
                      textAnchor={isMobile ? 'end' : 'middle'}
                      height={isMobile ? 50 : 30}
                      interval={0}
                      tick={{ fontSize: isMobile ? 9 : 12 }}
                    />
                    <YAxis 
                      stroke="#64748b"
                      fontSize={isMobile ? 9 : 12}
                      domain={[0, 10]}
                      width={isMobile ? 20 : 40}
                      tick={{ fontSize: isMobile ? 9 : 12 }}
                    />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      labelFormatter={(value) => `Timeline: ${value}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#f97316" 
                      strokeWidth={isMobile ? 2 : 3}
                      dot={{ fill: '#f97316', strokeWidth: 2, r: isMobile ? 4 : 6 }}
                      activeDot={{ r: isMobile ? 6 : 8, stroke: '#f97316', strokeWidth: 2, fill: '#fff' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>

          {/* Projected Score Pie Chart */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2 self-start w-full">
              <Target className="w-5 h-5 text-green-600" />
              <span>Projected Score</span>
            </h3>
            <div className="w-full flex flex-col items-center">
              <div className="relative flex justify-center">
                <ChartContainer config={chartConfig} className={`${isMobile ? 'h-48 w-48' : 'h-64 w-64'}`}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={projectedPieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={isMobile ? 45 : 60}
                        outerRadius={isMobile ? 75 : 100}
                        startAngle={90}
                        endAngle={450}
                        dataKey="value"
                      >
                        {projectedPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <div className={`font-bold text-green-600 ${isMobile ? 'text-3xl' : 'text-4xl'}`}>{projectedScore.toFixed(1)}</div>
                    <div className={`text-gray-500 ${isMobile ? 'text-xs' : 'text-sm'}`}>projected</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg text-center w-full max-w-xs">
                <div className="text-sm text-green-700 font-medium">
                  +{(projectedScore - currentScore).toFixed(1)} point improvement
                </div>
                <div className="text-xs text-green-600 mt-1">
                  {Math.round(((projectedScore - currentScore) / currentScore) * 100)}% increase
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`mt-6 grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-800">Quick Win Potential</span>
            </div>
            <p className={`text-green-700 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>
              +{(projectedScore - currentScore).toFixed(1)} point increase possible
            </p>
            <Badge className="bg-green-100 text-green-800">
              {Math.round(((projectedScore - currentScore) / currentScore) * 100)}% visibility improvement
            </Badge>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-800">Implementation Timeline</span>
            </div>
            <p className={`text-blue-700 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>
              4 weeks to maximum impact
            </p>
            <Badge className="bg-blue-100 text-blue-800">
              Fast-track available
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
