"use client";


import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Search, Building, Brain, Activity, Home, Sparkles, Lock, Clock } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface AuditHeaderProps {
  clientName?: string;
  createdAt: string;
  userOwnsAudit: boolean;
  isLocked?: boolean;
  snapshotVersion?: string;
  isFromSnapshot?: boolean;
  snapshotData?: any;
}

export const AuditHeader: React.FC<AuditHeaderProps> = ({
  clientName,
  createdAt,
  userOwnsAudit,
  isLocked,
  snapshotVersion,
  isFromSnapshot = false,
  snapshotData
}) => {
  const isMobile = useIsMobile();

  // Determine title and UI elements based on snapshot data
  let titleText;
  let showLiveInsightsBadge = true;
  let displayDate;
  let displayTime;
  
  if (isFromSnapshot && snapshotData) {
    // Use EXACT template from snapshot - this ensures locked audits NEVER change
    if (snapshotData.header_template?.title) {
      titleText = snapshotData.header_template.title;
      console.log('Using exact snapshot title:', titleText);
    } else {
      // Fallback for older snapshots - force single sparkle for locked audits
      titleText = "🔍 Free LLM Visibility Mini‑Audit ✨";
      console.log('Using fallback locked title with single sparkle');
    }
    
    // Use frozen date/time from snapshot if available
    if (snapshotData.header_template?.display_date) {
      displayDate = snapshotData.header_template.display_date;
      displayTime = snapshotData.header_template.display_time;
      console.log('Using frozen snapshot date/time:', { displayDate, displayTime });
    } else {
      // Fallback for older snapshots without frozen time
      displayDate = new Date(createdAt).toLocaleDateString();
      displayTime = null;
    }
    
    // Check snapshot UI template for live insights badge
    if (snapshotData.ui_template?.show_live_insights_badge !== undefined) {
      showLiveInsightsBadge = snapshotData.ui_template.show_live_insights_badge;
    } else {
      // For locked audits, insights are not "live" anymore
      showLiveInsightsBadge = false;
    }
    
    console.log('Locked audit rendering with snapshot:', {
      title: titleText,  
      showLiveInsights: showLiveInsightsBadge,
      frozenTime: displayTime
    });
  } else {
    // Current live template for unlocked audits - NOW WITH FIRE EMOJI
    titleText = "🔍 Free LLM Visibility Mini‑Audit 🔥 ✨";
    showLiveInsightsBadge = true;
    
    // Live current date/time for unlocked audits
    displayDate = new Date().toLocaleDateString();
    displayTime = new Date().toLocaleTimeString();
    
    console.log('Live audit rendering with current template and time');
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 animate-fade-in hover:shadow-xl transition-all duration-500 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-orange-50/30"></div>
      <div className={`relative z-10 ${isMobile ? 'space-y-4' : 'flex items-center justify-between'}`}>
        <div className="flex-1">
          <div className={`flex items-center space-x-2 sm:space-x-3 mb-3 ${isMobile ? 'flex-wrap' : ''}`}>
            <div className="p-2 bg-blue-100 rounded-full flex-shrink-0">
              <Search className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <h1 className={`font-bold text-gray-900 ${isMobile ? 'text-lg sm:text-xl leading-tight' : 'text-2xl sm:text-3xl'}`}>
              {titleText}
            </h1>
            <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-500 flex-shrink-0" />
          </div>
          <h2 className={`text-orange-600 font-bold mb-3 sm:mb-4 flex items-center space-x-2 ${isMobile ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'}`}>
            <Building className={`flex-shrink-0 ${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`} />
            <span className="break-words">{clientName}</span>
          </h2>
          <div className={`flex items-center space-x-2 sm:space-x-4 ${isMobile ? 'flex-wrap gap-2' : 'flex-wrap'}`}>
            <Badge variant="secondary" className="animate-fade-in hover:scale-105 transition-transform duration-200 text-xs sm:text-sm">
              <Brain className="w-3 h-3 mr-1" />
              ChatGPT‑only • {isFromSnapshot ? `prepared ${displayDate}` : `live report • ${displayDate}`}
            </Badge>
            {displayTime && (
              <Badge variant="outline" className="animate-fade-in hover:scale-105 transition-transform duration-200 text-xs sm:text-sm">
                <Clock className="w-3 h-3 mr-1" />
                {displayTime}
              </Badge>
            )}
            <Badge className="bg-green-100 text-green-800 animate-fade-in hover:scale-105 transition-transform duration-200 text-xs sm:text-sm">
              <CheckCircle className="w-3 h-3 mr-1" />
              ✓ Comprehensive Analysis
            </Badge>
            {showLiveInsightsBadge && (
              <Badge className="bg-blue-100 text-blue-800 animate-fade-in hover:scale-105 transition-transform duration-200 text-xs sm:text-sm">
                <Activity className="w-3 h-3 mr-1" />
                Live Insights
              </Badge>
            )}
            {isLocked && (
              <Badge className="bg-gray-100 text-gray-800 animate-fade-in hover:scale-105 transition-transform duration-200 text-xs sm:text-sm" title={`Locked snapshot${snapshotVersion ? ` (v${snapshotVersion})` : ''}`}>
                <Lock className="w-3 h-3 mr-1" />
                Locked Report
              </Badge>
            )}
            {userOwnsAudit && (
              <Badge className="bg-purple-100 text-purple-800 animate-fade-in hover:scale-105 transition-transform duration-200 text-xs sm:text-sm">
                ✓ Your Audit
              </Badge>
            )}
          </div>
        </div>
        <div className={`${isMobile ? 'w-full flex justify-center' : 'text-right'}`}>
          <a 
            href="/" 
            className="group cursor-pointer block hover:scale-105 transition-transform duration-300"
            title="Visit TotalAuthority Homepage"
          >
            <div className={`font-bold text-orange-500 mb-1 group-hover:text-orange-600 transition-colors duration-200 flex items-center space-x-2 ${isMobile ? 'text-xl justify-center' : 'text-2xl sm:text-3xl justify-end'}`}>
              <span>TotalAuthority</span>
              <Home className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`} />
            </div>
            <div className={`text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-200 ${isMobile ? 'text-center' : 'text-right'}`}>
              LLM Visibility Team
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
