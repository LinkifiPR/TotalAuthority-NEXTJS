"use client";


import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { CustomAuditForm } from './CustomAuditForm';

interface FormPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FormPopup: React.FC<FormPopupProps> = ({ isOpen, onClose }) => {
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
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop with brand gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-slate-900/90 to-blue-900/80 backdrop-blur-sm animate-in fade-in-0 duration-300"
        onClick={onClose}
      />
      
      {/* Popup Container */}
      <div className="relative w-full max-w-2xl max-h-[90vh] animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 overflow-y-auto">
        {/* Custom branded header */}
        <div className="bg-gradient-to-r from-orange-500 via-purple-600 to-blue-600 p-4 rounded-t-2xl relative overflow-hidden">
          {/* Animated background patterns */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-purple-500/20 to-blue-500/20 animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,146,60,0.3),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.3),transparent_50%)]"></div>
          
          {/* Floating elements */}
          <div className="absolute top-2 left-4 w-2 h-2 border border-orange-300/40 rounded-lg rotate-45 animate-pulse"></div>
          <div className="absolute bottom-2 right-6 w-1.5 h-1.5 border border-blue-300/40 rounded-full animate-bounce"></div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Brand logo */}
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-orange-200/30 opacity-30"></div>
                <div className="absolute inset-0.5 rounded-full border border-orange-300/50 opacity-50"></div>
                <div className="relative w-6 h-6 bg-gradient-to-br from-white to-orange-100 rounded-full flex items-center justify-center shadow-lg">
                  <div className="absolute top-1 left-0.5 w-0.5 h-0.5 bg-orange-600 rounded-full"></div>
                  <div className="absolute top-1 right-0.5 w-0.5 h-0.5 bg-orange-600 rounded-full"></div>
                  <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-0.5 bg-orange-600 rounded-full"></div>
                  <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-0.5 h-0.5 bg-orange-500 rounded-full"></div>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Get Your Free AI Visibility Audit</h2>
                <p className="text-orange-100 text-sm">See exactly where you stand in the AI landscape</p>
              </div>
            </div>
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="relative w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 group"
              aria-label="Close form"
            >
              <X className="w-5 h-5 text-white group-hover:text-orange-100" />
            </button>
          </div>
        </div>
        
        {/* Form container */}
        <div className="bg-white rounded-b-2xl shadow-2xl overflow-hidden">
          <div className="relative">
            {/* Top accent line */}
            <div className="h-0.5 bg-gradient-to-r from-orange-500 via-purple-600 to-blue-600"></div>
            
            {/* Custom Form */}
            <div className="p-8">
              <CustomAuditForm onSuccess={onClose} />
            </div>
          </div>
        </div>
        
        {/* Bottom branding accent */}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full opacity-60"></div>
      </div>
    </div>
  );
};
