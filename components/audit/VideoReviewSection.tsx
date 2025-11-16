"use client";


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Video, Play, Users, CheckCircle, Target, Lightbulb, Calendar, Award, MessageSquare } from 'lucide-react';

interface VideoReviewSectionProps {
  auditData: any;
}

export const VideoReviewSection: React.FC<VideoReviewSectionProps> = ({ auditData }) => {
  const isCompleted = auditData?.review_status === 'completed';
  const hasVideoUrl = auditData?.loom_video_url;
  const hasAIFeedback = auditData?.ai_feedback;
  
  return (
    <Card className="mb-8 animate-fade-in hover:shadow-lg transition-all duration-500 border-l-4 border-l-purple-500">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 border-b relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/20 to-violet-100/20 animate-pulse"></div>
        <CardTitle className="flex items-center space-x-3 text-purple-900 relative z-10">
          <div className="relative">
            {hasVideoUrl ? (
              <>
                <Video className="w-7 h-7 animate-pulse" />
                <Play className="w-4 h-4 absolute -bottom-1 -right-1 text-purple-500 animate-bounce" />
              </>
            ) : (
              <>
                <MessageSquare className="w-7 h-7 animate-pulse" />
                <Award className="w-4 h-4 absolute -bottom-1 -right-1 text-purple-500 animate-bounce" />
              </>
            )}
          </div>
          <span className="text-xl">
            {hasVideoUrl ? 'Reviewers Notes' : 'Reviewers Notes'}
          </span>
          <Award className="w-5 h-5 ml-auto animate-pulse text-purple-600" />
        </CardTitle>
        <CardDescription className="relative z-10 flex items-center space-x-2">
          <Users className="w-4 h-4 text-purple-600" />
          <span>Reviewed by: <strong className="text-purple-700">
            {auditData?.reviewer_name || "[Reviewer Name - To be added]"}
          </strong></span>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video or AI Feedback Section */}
          <div className="lg:col-span-2">
            {isCompleted && hasVideoUrl ? (
              <div className="relative bg-black rounded-xl overflow-hidden">
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                  <iframe
                    src={auditData.loom_video_url}
                    className="absolute top-0 left-0 w-full h-full rounded-xl"
                    frameBorder="0"
                    allowFullScreen
                    title="Audit Review Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              </div>
            ) : isCompleted && hasAIFeedback ? (
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-200">
                <div className="flex items-center space-x-2 mb-4">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-purple-800">Summary</h3>
                </div>
                <div className="prose prose-purple max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {auditData.ai_feedback}
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative bg-gradient-to-br from-purple-100 to-violet-100 rounded-xl p-8 h-64 flex items-center justify-center border-2 border-dashed border-purple-300 hover:shadow-lg transition-all duration-300">
                <div className="text-center">
                  <div className="relative mb-4">
                    <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto animate-pulse">
                      <MessageSquare className="w-8 h-8 text-purple-600" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
                      <Play className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-purple-800 mb-2">Review Coming Soon</h3>
                  <p className="text-purple-600 text-sm">Executive review will be added here after completion</p>
                  <Badge className="mt-3 bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors duration-200">
                    <Calendar className="w-3 h-3 mr-1" />
                    Pending Review
                  </Badge>
                </div>
              </div>
            )}
          </div>
          
          {/* Key Insights Panel - Only show if we have video with detailed insights */}
          {hasVideoUrl && (
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:shadow-md transition-all duration-300">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">Key Strengths</span>
                </div>
                {isCompleted && auditData?.key_strengths?.length ? (
                  <ul className="text-sm text-green-700 space-y-1">
                    {auditData.key_strengths.map((strength: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-green-700">Detailed analysis of your competitive advantages</p>
                )}
              </div>
              
              <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200 hover:shadow-md transition-all duration-300">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-5 h-5 text-orange-600" />
                  <span className="font-semibold text-orange-800">Priority Actions</span>
                </div>
                {isCompleted && auditData?.priority_actions?.length ? (
                  <ul className="text-sm text-orange-700 space-y-1">
                    {auditData.priority_actions.map((action: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-orange-700">Focused recommendations for maximum impact</p>
                )}
              </div>
              
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:shadow-md transition-all duration-300">
                <div className="flex items-center space-x-2 mb-2">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-800">Strategic Insights</span>
                </div>
                {isCompleted && auditData?.strategic_insights?.length ? (
                  <ul className="text-sm text-blue-700 space-y-1">
                    {auditData.strategic_insights.map((insight: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-blue-700">Expert perspective on market positioning</p>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
