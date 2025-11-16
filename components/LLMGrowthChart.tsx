"use client";

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, BarChart } from 'lucide-react';

const data = [
  { year: '2025', traditional: 95, llm: 15, total: 110 },
  { year: '2026', traditional: 82, llm: 28, total: 110 },
  { year: '2027', traditional: 68, llm: 45, total: 113 },
  { year: '2028', traditional: 52, llm: 65, total: 117 },
  { year: '2029', traditional: 38, llm: 85, total: 123 },
];

export const LLMGrowthChart = () => {
  const [animationStep, setAnimationStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const chartElement = document.getElementById('llm-growth-chart');
    if (chartElement) {
      observer.observe(chartElement);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setInterval(() => {
        setAnimationStep(prev => {
          if (prev >= data.length) {
            clearInterval(timer);
            return prev;
          }
          return prev + 1;
        });
      }, 800); // Slower, smoother transition

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  const getVisibleData = () => {
    return data.map((item, index) => ({
      ...item,
      traditional: index < animationStep ? item.traditional : null,
      llm: index < animationStep ? item.llm : null,
      total: index < animationStep ? item.total : null,
    }));
  };

  const chartData = getVisibleData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-xl p-4 shadow-2xl">
          <p className="font-semibold text-slate-900 mb-2">{`Year: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
              {`${entry.name}: ${Math.round(entry.value)}M visitors`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section id="llm-growth-chart" className="py-8 md:py-12 bg-gradient-to-br from-slate-50 via-orange-50/30 to-blue-50/30 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500/10 to-blue-500/10 border border-orange-500/20 rounded-full mb-6 backdrop-blur-sm">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            <span className="text-lg font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
              📈 Market Shift Analysis
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
            LLM Search Growth Projection
          </h2>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            The future of search is here. See how AI-powered search is reshaping the digital landscape and why you need to adapt now.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
            {/* Stylized grid overlay */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}></div>
            
            <div className="relative z-10">
              <div className="h-96 md:h-[500px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke="rgba(148, 163, 184, 0.2)"
                      strokeWidth={1}
                    />
                    <XAxis 
                      dataKey="year" 
                      stroke="#475569"
                      fontSize={14}
                      fontWeight={600}
                      tick={{ fill: '#475569' }}
                    />
                    <YAxis 
                      stroke="#475569"
                      fontSize={12}
                      fontWeight={500}
                      tick={{ fill: '#475569' }}
                      label={{ value: 'Annual Visitors (Millions)', angle: -90, position: 'insideLeft' }}
                    />
                    <CustomTooltip />
                    
                    {/* Traditional Search Line */}
                    <Line
                      type="monotone"
                      dataKey="traditional"
                      stroke="#3B82F6"
                      strokeWidth={4}
                      dot={{ fill: '#3B82F6', strokeWidth: 3, r: 6 }}
                      activeDot={{ r: 8, stroke: '#3B82F6', strokeWidth: 2, fill: '#ffffff' }}
                      name="Traditional Organic Search"
                      connectNulls={false}
                      animationDuration={500}
                      style={{
                        filter: 'drop-shadow(0 4px 8px rgba(59, 130, 246, 0.3))'
                      }}
                    />
                    
                    {/* LLM Search Line */}
                    <Line
                      type="monotone"
                      dataKey="llm"
                      stroke="#FF6B35"
                      strokeWidth={5}
                      dot={{ fill: '#FF6B35', strokeWidth: 3, r: 7 }}
                      activeDot={{ r: 10, stroke: '#FF6B35', strokeWidth: 3, fill: '#ffffff' }}
                      name="LLMs (Including Google AI)"
                      connectNulls={false}
                      animationDuration={500}
                      animationBegin={300}
                      style={{
                        filter: 'drop-shadow(0 4px 12px rgba(255, 107, 53, 0.4))'
                      }}
                    />
                    
                    {/* Total Line */}
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="#10B981"
                      strokeWidth={3}
                      dot={{ fill: '#10B981', strokeWidth: 2, r: 5 }}
                      activeDot={{ r: 7, stroke: '#10B981', strokeWidth: 2, fill: '#ffffff' }}
                      name="Total Traffic"
                      connectNulls={false}
                      animationDuration={500}
                      animationBegin={600}
                      style={{
                        filter: 'drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3))'
                      }}
                    />
                    
                    <Legend 
                      wrapperStyle={{
                        paddingTop: '20px',
                        fontWeight: 600,
                        fontSize: '14px'
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              {/* Key insights */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl border border-blue-200/50">
                  <div className="text-2xl font-bold text-blue-600 mb-2">-60%</div>
                  <div className="text-sm font-medium text-blue-800">Traditional Search Decline</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl border border-orange-200/50">
                  <div className="text-2xl font-bold text-orange-600 mb-2">+467%</div>
                  <div className="text-sm font-medium text-orange-800">LLM Search Growth</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl border border-green-200/50">
                  <div className="text-2xl font-bold text-green-600 mb-2">2028</div>
                  <div className="text-sm font-medium text-green-800">LLM Dominance Year</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};