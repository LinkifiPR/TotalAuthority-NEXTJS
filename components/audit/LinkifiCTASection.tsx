"use client";


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Award, TrendingUp } from 'lucide-react';

export const LinkifiCTASection: React.FC = () => {
  return (
    <Card className="animate-fade-in hover:shadow-xl transition-all duration-500 border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-100/20 to-red-100/20 animate-pulse"></div>
      <CardContent className="p-6 sm:p-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0 lg:space-x-8">
          {/* Logo and Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-4 mb-4">
              <img 
                src="https://cdn.prod.website-files.com/66dd9a41ff24843692f6f750/66dd9a41ff24843692f6f770_Linkifi%20Logo%20-%20white%20vector.svg" 
                alt="Linkifi Digital PR Logo" 
                className="h-8 sm:h-10 w-auto"
              />
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-orange-600" />
                <span className="text-orange-800 font-semibold text-sm">Trusted Partner</span>
              </div>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
              Ready to Scale Your Digital PR & Link Building?
            </h3>
            
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
              Partner with <span className="font-semibold text-orange-600">Linkifi Digital PR</span> - 
              the world's best digital PR and link building agency for SEO and LLMO. 
              Get featured and build authority with coverage in top-tier publications.
            </p>
            
            <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-600 mb-4">
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span className="font-medium">Forbes</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-red-600" />
                <span className="font-medium">New York Times</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-orange-600" />
                <span className="font-medium">BBC</span>
              </div>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="flex-shrink-0">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => window.open('https://linkifi.com', '_blank')}
            >
              <span>Get Premium Digital PR</span>
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
