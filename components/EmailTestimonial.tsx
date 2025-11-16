"use client";

import React from 'react';
import { Mail } from 'lucide-react';

export const EmailTestimonial: React.FC = () => {
  return (
    <div className="relative max-w-4xl mx-auto mb-16 px-4">
      {/* Orange slanted background */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-400 transform -skew-y-1 rounded-2xl shadow-2xl"></div>
      
      {/* Email container */}
      <div className="relative bg-white rounded-xl shadow-xl overflow-hidden transform skew-y-0">
        {/* Email header */}
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full flex items-center justify-center">
              <Mail className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-slate-700">From:</span>
                <span className="text-sm font-semibold text-slate-900">Matt</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">to Total Authority Team</div>
            </div>
          </div>
        </div>
        
        {/* Email body */}
        <div className="p-8">
          <div className="text-slate-800 space-y-4 font-medium leading-relaxed">
            <p className="text-lg">Hey ya'll</p>
            <p>Got the schema plan done.</p>
            <p>Also I did the content gap stuff you recommend as well.</p>
            <p className="font-semibold text-orange-600">
              LLMs are already pointing to it and using it as source material.
            </p>
            <p className="text-lg font-semibold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              Great work here and very appreciative of your help!
            </p>
          </div>
          
          {/* Signature */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                M
              </div>
              <div>
                <div className="font-semibold text-slate-900">Matt</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-50 to-transparent rounded-full transform -translate-x-12 translate-y-12"></div>
      </div>
    </div>
  );
};