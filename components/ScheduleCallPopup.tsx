"use client";

import React, { useEffect } from 'react';
import { X, Calendar, Users, Clock } from 'lucide-react';

interface ScheduleCallPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleCallPopup: React.FC<ScheduleCallPopupProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  
  useEffect(() => {
    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      setIsLoading(true);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Removed script loading since it causes cross-origin conflicts
  // The iframe should work directly without the additional script

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop with orange gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-orange-900/80 via-red-900/90 to-yellow-900/80 backdrop-blur-sm animate-in fade-in-0 duration-300"
        onClick={onClose}
      />
      
      {/* Popup Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] animate-in zoom-in-95 slide-in-from-bottom-4 duration-500 overflow-y-auto">
        {/* Gorgeous orange header */}
        <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 p-6 rounded-t-3xl relative overflow-hidden">
          {/* Animated background patterns */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/30 via-red-500/20 to-yellow-500/30 animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,146,60,0.4),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(239,68,68,0.3),transparent_50%)]"></div>
          
          {/* Floating decorative elements */}
          <div className="absolute top-4 left-8 w-3 h-3 border-2 border-orange-200/50 rounded-lg rotate-45 animate-pulse"></div>
          <div className="absolute bottom-4 right-8 w-2 h-2 border border-red-200/50 rounded-full animate-bounce"></div>
          <div className="absolute top-6 right-16 w-1.5 h-1.5 bg-yellow-300/60 rounded-full animate-ping"></div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Brand icon */}
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-orange-200/40 opacity-40"></div>
                <div className="absolute inset-1 rounded-full border border-orange-300/60 opacity-60"></div>
                <div className="relative w-8 h-8 bg-gradient-to-br from-white to-orange-100 rounded-full flex items-center justify-center shadow-xl">
                  <Calendar className="w-4 h-4 text-orange-600" />
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                  Schedule Your Strategy Call
                </h2>
                <p className="text-orange-100 text-lg drop-shadow">
                  Let's discuss how to dominate AI search for your business
                </p>
              </div>
            </div>
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="relative w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 group backdrop-blur-sm border border-white/20"
              aria-label="Close schedule call form"
            >
              <X className="w-6 h-6 text-white group-hover:text-orange-100" />
            </button>
          </div>
          
          {/* Trust indicators */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 mt-6">
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 md:px-4 py-2 border border-white/30">
              <Users className="w-4 h-4 text-white" />
              <span className="text-white text-xs md:text-sm font-medium">Expert Team</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 md:px-4 py-2 border border-white/30">
              <Clock className="w-4 h-4 text-white" />
              <span className="text-white text-xs md:text-sm font-medium">30 Min Call</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 md:px-4 py-2 border border-white/30">
              <Calendar className="w-4 h-4 text-white" />
              <span className="text-white text-xs md:text-sm font-medium">Free Consultation</span>
            </div>
          </div>
        </div>
        
        {/* Form container */}
        <div className="bg-gradient-to-br from-white to-orange-50/30 rounded-b-3xl shadow-2xl overflow-hidden border-2 border-orange-200/50">
          <div className="relative">
            {/* Top accent gradient */}
            <div className="h-1 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500"></div>
            
            {/* Form iframe container */}
            <div className="p-4 bg-white/95 backdrop-blur-sm">
              <div className="relative bg-white rounded-2xl shadow-lg border border-orange-200/50 overflow-hidden min-h-[800px]">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-10">
                    <div className="text-center">
                      <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-orange-600 font-medium">Loading booking form...</p>
                    </div>
                  </div>
                )}
                <iframe
                  src="https://go.totalauthority.com/widget/booking/71xPzBFUPZ6BMdYpAvB7"
                  className="w-full h-[800px] border-0 rounded-2xl"
                  id="71xPzBFUPZ6BMdYpAvB7_1758740595647"
                  title="TotalAuthority Calendar Booking"
                  scrolling="no"
                  allow="camera; microphone; geolocation; encrypted-media"
                  sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                  loading="lazy"
                  onLoad={() => setIsLoading(false)}
                  onError={() => setIsLoading(false)}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom branding accent */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 rounded-full opacity-80"></div>
      </div>
    </div>
  );
};