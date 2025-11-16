"use client";


import React from 'react';
import { LucideIcon } from 'lucide-react';

interface TestimonialCardProps {
  platform: string;
  icon: LucideIcon;
  name: string;
  title: string;
  content: string;
  color: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  icon: IconComponent,
  name,
  title,
  content,
  color
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Header with platform */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
          <IconComponent className="w-5 h-5 text-white" />
        </div>
        <div>
          <h4 className="font-bold text-slate-900 text-sm">{name}</h4>
          <p className="text-slate-600 text-xs">{title}</p>
        </div>
      </div>
      
      {/* Content */}
      <div>
        <p className="text-slate-700 text-sm leading-relaxed mb-4 italic">
          "{content}"
        </p>
        
        {/* Engagement indicators */}
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-100 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
            </div>
            {Math.floor(Math.random() * 50) + 10}
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-blue-100 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
            </div>
            {Math.floor(Math.random() * 20) + 5}
          </span>
          <span className="text-slate-400">
            {Math.floor(Math.random() * 24) + 1}h
          </span>
        </div>
      </div>
    </div>
  );
};
