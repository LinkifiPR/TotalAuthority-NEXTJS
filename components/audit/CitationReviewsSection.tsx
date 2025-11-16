"use client";


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Sparkles, Activity, Building, ExternalLink, CheckCircle, AlertCircle, Globe, ChevronRight, XCircle } from 'lucide-react';

interface CitationReviewsSectionProps {
  data: any;
}

export const CitationReviewsSection: React.FC<CitationReviewsSectionProps> = ({ data }) => (
  <Card className="mb-8 animate-fade-in hover:shadow-lg transition-all duration-500 border-l-4 border-l-green-400">
    <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-green-100/20 to-emerald-100/20 animate-pulse"></div>
      <CardTitle className="flex items-center space-x-3 text-green-900 relative z-10">
        <div className="relative">
          <Star className="w-7 h-7 animate-pulse text-yellow-500" />
          <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-green-500 animate-ping" />
        </div>
        <span className="text-xl">Citation & Review Pulse</span>
        <Activity className="w-5 h-5 ml-auto animate-pulse" />
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <Building className="w-5 h-5 text-green-600" />
            <h4 className="font-bold text-lg text-gray-800">Platform Presence</h4>
            <div className="flex-1 h-px bg-green-200"></div>
          </div>
          <div className="space-y-4">
            {data.platforms?.map((platform: any, index: number) => {
              // Determine if platform is present based on status, reviews, or rating data
              const isPresent = platform.status === 'Present' || platform.reviews || platform.rating;
              const bgColor = isPresent ? 'from-green-50 to-emerald-50' : 'from-red-50 to-pink-50';
              const borderColor = isPresent ? 'border-green-200' : 'border-red-200';
              const textColor = isPresent ? 'text-green-800' : 'text-red-800';
              const statusIcon = isPresent ? 
                <CheckCircle className="w-5 h-5 text-green-500 animate-pulse" /> : 
                <XCircle className="w-5 h-5 text-red-500" />;
              
              // Create details string from available data
              let details = '';
              if (platform.reviews && platform.rating) {
                details = `${platform.reviews} reviews, ${platform.rating}★`;
              } else if (platform.reviews) {
                details = platform.reviews;
              } else if (platform.rating) {
                details = `${platform.rating}★`;
              } else if (platform.details) {
                details = platform.details;
              } else if (platform.status === 'Present') {
                details = 'Present';
              } else {
                details = 'Not Found';
              }
              
              return (
                <div key={index} className={`flex items-center justify-between p-4 bg-gradient-to-r ${bgColor} rounded-lg hover:shadow-md transition-all duration-300 hover:scale-[1.02] transform animate-fade-in border ${borderColor}`} style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full animate-pulse ${isPresent ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className={`font-medium ${textColor}`}>{platform.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className={`${isPresent ? 'hover:bg-green-100' : 'hover:bg-red-100'} transition-colors duration-200`}>
                      {isPresent ? (
                        <>
                          <Star className="w-3 h-3 mr-1 text-yellow-500" />
                          {details}
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3 mr-1 text-red-500" />
                          {details}
                        </>
                      )}
                    </Badge>
                    {statusIcon}
                  </div>
                </div>
              );
            }) || (
              <div className="text-gray-500 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4" />
                <span>No platform data available</span>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <ExternalLink className="w-5 h-5 text-blue-600" />
            <h4 className="font-bold text-lg text-gray-800">Top Citation Domains</h4>
            <div className="flex-1 h-px bg-blue-200"></div>
          </div>
          <div className="space-y-3">
            {data.citation_domains?.map((domain: string, index: number) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg hover:shadow-sm transition-all duration-300 hover:scale-[1.01] transform animate-fade-in border border-blue-200" style={{ animationDelay: `${index * 100}ms` }}>
                <Globe className="w-4 h-4 text-blue-500 animate-pulse" />
                <span className="text-sm font-medium text-blue-700">{domain}</span>
                <ChevronRight className="w-3 h-3 text-blue-400 ml-auto" />
              </div>
            )) || (
              <div className="text-gray-500 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4" />
                <span>No citation data available</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);
