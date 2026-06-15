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
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-in fade-in-0 duration-200"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl max-h-[90vh] animate-in zoom-in-95 duration-200 overflow-y-auto rounded-xl bg-white shadow-xl border border-slate-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-orange-600 mb-1">
              Total Authority
            </p>
            <h2 className="text-lg md:text-xl font-semibold tracking-tight text-slate-900">
              Get your free AI Visibility audit
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              See exactly where you stand in the AI landscape.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center transition-colors"
            aria-label="Close form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 md:p-8">
          <CustomAuditForm onSuccess={onClose} />
        </div>
      </div>
    </div>
  );
};
