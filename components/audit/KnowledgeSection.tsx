"use client";


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, MessageSquare, Eye, AlertCircle } from 'lucide-react';

interface KnowledgeSectionProps {
  data: any;
}

export const KnowledgeSection: React.FC<KnowledgeSectionProps> = ({ data }) => (
  <Card className="mb-8 animate-fade-in hover:shadow-lg transition-all duration-500 border-l-4 border-l-purple-400">
    <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-100/20 to-pink-100/20 animate-pulse"></div>
      <CardTitle className="flex items-center space-x-3 text-purple-900 relative z-10">
        <div className="relative">
          <Brain className="w-7 h-7 animate-pulse" />
          <MessageSquare className="w-4 h-4 absolute -top-1 -right-1 text-purple-500 animate-bounce" />
        </div>
        <span className="text-xl">What does ChatGPT know about them?</span>
        <div className="flex items-center space-x-2 ml-auto">
          <img 
            src="https://cdn.brandfetch.io/openai.com/w/512/h/512/symbol?c=1idP0DrE2OZDRG5HYTw" 
            alt="OpenAI" 
            className="w-5 h-5 animate-pulse"
          />
          <Eye className="w-5 h-5 animate-pulse" />
        </div>
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl mb-6 hover:shadow-md transition-all duration-300 border border-purple-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-purple-200/30 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
        <div className="flex items-start space-x-3 relative z-10">
          <MessageSquare className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0 animate-pulse" />
          <blockquote className="text-gray-800 italic leading-relaxed text-lg font-medium">
            "{data.chatgpt_knowledge || 'No knowledge data available'}"
          </blockquote>
        </div>
      </div>
      {data.knowledge_gaps && (
        <div className="animate-fade-in">
          <div className="flex items-center space-x-2 mb-4">
            <AlertCircle className="w-5 h-5 text-red-600 animate-pulse" />
            <h4 className="font-bold text-red-700 text-lg">Gaps / Issues</h4>
            <div className="flex-1 h-px bg-red-200"></div>
          </div>
          <ul className="space-y-3">
            {data.knowledge_gaps.map((gap: string, index: number) => (
              <li key={index} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200 animate-fade-in border border-red-200" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                <span className="text-red-700 font-medium">{gap}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </CardContent>
  </Card>
);
