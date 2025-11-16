"use client";


import React from 'react';
import { Clock, Zap, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DeliverySectionProps {
  onOpenForm: () => void;
}

export const DeliverySection: React.FC<DeliverySectionProps> = ({ onOpenForm }) => {
  return (
    <div className="w-full mb-16 relative">
      <div className="relative w-full bg-gradient-to-r from-orange-500 via-purple-600 to-blue-600 rounded-3xl overflow-hidden shadow-2xl">
        {/* Animated background patterns with brand colors */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-purple-500/20 to-blue-500/20 animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,146,60,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.3),transparent_50%)]"></div>
        
        {/* Floating geometric shapes with brand colors */}
        <div className="absolute top-6 left-8 w-8 h-8 border-2 border-orange-300/40 rounded-lg rotate-45 animate-pulse"></div>
        <div className="absolute bottom-8 right-12 w-6 h-6 border-2 border-blue-300/40 rounded-full animate-bounce"></div>
        <div className="absolute top-12 right-20 w-4 h-4 bg-purple-300/30 rounded-full animate-ping"></div>
        <div className="absolute bottom-6 left-16 w-10 h-10 border border-orange-300/30 rounded-xl rotate-12 animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* Content container */}
        <div className="relative z-10 px-8 py-12 md:px-16 md:py-16 text-center">
          {/* Main icon with brand colors */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              {/* Glowing background rings with brand colors */}
              <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-orange-400 to-blue-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="absolute inset-2 w-16 h-16 bg-gradient-to-r from-purple-400 to-orange-500 rounded-full blur-lg opacity-60 animate-pulse" style={{animationDelay: '0.5s'}}></div>
              
              {/* Main icon container */}
              <div className="relative w-20 h-20 bg-gradient-to-br from-white to-orange-50 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-300">
                <Zap className="w-10 h-10 text-orange-600 animate-pulse" />
              </div>
              
              {/* Orbiting elements with brand colors */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full animate-bounce shadow-lg" style={{animationDelay: '0.2s'}}></div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full animate-pulse shadow-lg" style={{animationDelay: '0.8s'}}></div>
            </div>
          </div>
          
          {/* Title with gradient text using brand colors */}
          <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-orange-100 to-blue-100 bg-clip-text text-transparent leading-tight">
            Lightning Fast Delivery
          </h3>
          
          {/* Subtitle with brand colors */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center justify-center gap-4 text-xl md:text-2xl text-orange-100 font-semibold">
              <Clock className="w-6 h-6 text-orange-200 animate-spin" style={{animationDuration: '4s'}} />
              <span className="bg-gradient-to-r from-orange-100 to-white bg-clip-text text-transparent">
                Delivered to your inbox within one business day
              </span>
              <Clock className="w-6 h-6 text-blue-200 animate-spin" style={{animationDuration: '4s', animationDelay: '2s'}} />
            </div>
            
            {/* Professional badge with brand colors */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-white/20 to-orange-100/30 backdrop-blur-sm rounded-full border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="w-3 h-3 bg-orange-300 rounded-full animate-ping"></div>
                <span className="text-white font-medium text-lg tracking-wide">No sales call required</span>
                <CheckCircle className="w-6 h-6 text-orange-200 animate-pulse" />
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mb-8">
            <Button 
              size="lg" 
              onClick={onOpenForm}
              className="bg-white hover:bg-orange-50 text-orange-600 hover:text-orange-700 px-8 py-4 text-lg font-bold rounded-xl shadow-2xl hover:shadow-white/20 transition-all duration-300 transform hover:scale-105 border-2 border-white/20 hover:border-orange-200"
            >
              Get My Free Audit Now →
            </Button>
          </div>
          
          {/* Additional professional elements with brand colors */}
          <div className="flex justify-center space-x-8 text-orange-100">
            <div className="flex items-center gap-2 text-sm font-medium">
              <div className="w-2 h-2 bg-orange-300 rounded-full animate-pulse"></div>
              <span>Instant Access</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <span>Expert Analysis</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              <span>Actionable Results</span>
            </div>
          </div>
        </div>
        
        {/* Animated border effect with brand colors */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-400/50 via-transparent to-blue-400/50 p-[2px]">
          <div className="h-full w-full rounded-3xl bg-transparent"></div>
        </div>
      </div>
    </div>
  );
};
