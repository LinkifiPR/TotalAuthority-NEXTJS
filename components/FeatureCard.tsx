"use client";


import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradientColor: string;
  hoverColor: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: IconComponent,
  title,
  description,
  gradientColor,
  hoverColor
}) => {
  return (
    <div className={`group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200 hover:border-${hoverColor}-300 relative overflow-hidden hover:-translate-y-2`}>
      <div className={`absolute inset-0 bg-gradient-to-br from-${hoverColor}-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      <div className={`absolute -top-10 -right-10 w-20 h-20 bg-${hoverColor}-100 rounded-full opacity-0 group-hover:opacity-50 transition-all duration-500 group-hover:scale-150`}></div>
      <div className="relative z-10">
        <div className={`w-16 h-16 bg-gradient-to-br ${gradientColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-${hoverColor}-300`}>
          <IconComponent className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">
          {title}
        </h3>
        <p className="text-slate-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};
