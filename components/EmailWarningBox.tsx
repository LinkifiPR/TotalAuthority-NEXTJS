"use client";

import React, { useState, useEffect } from 'react';
import { AlertTriangle, Mail } from 'lucide-react';

export const EmailWarningBox = () => {
  const [animationStage, setAnimationStage] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationStage(1), 2000);
    const timer2 = setTimeout(() => setAnimationStage(2), 4000);
    const timer3 = setTimeout(() => setAnimationStage(0), 6000);
    
    const interval = setInterval(() => {
      setAnimationStage(1);
      setTimeout(() => setAnimationStage(2), 2000);
      setTimeout(() => setAnimationStage(0), 4000);
    }, 8000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-4 md:p-6 shadow-lg">
      <style>
        {`
          .email-move {
            animation: emailMove 1s ease-in-out forwards;
          }
          
          @keyframes emailMove {
            0% {
              transform: translateX(-20px) translateY(0);
              opacity: 0.8;
            }
            50% {
              transform: translateX(20px) translateY(-10px);
              opacity: 1;
            }
            100% {
              transform: translateX(-20px) translateY(0);
              opacity: 0.9;
            }
          }
          
          .folder-highlight {
            box-shadow: 0 0 15px rgba(239, 68, 68, 0.3);
            transform: scale(1.02);
          }
          
          .success-highlight {
            box-shadow: 0 0 15px rgba(34, 197, 94, 0.3);
            transform: scale(1.02);
          }
        `}
      </style>
      
      <div className="flex flex-col md:flex-row items-start gap-4">
        <div className="flex-shrink-0">
          <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-red-600" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
            <span>⚠️ Important: Don't Miss Your Audit!</span>
          </h3>
          
          <div className="space-y-3 text-red-700">
            <p className="font-semibold text-sm md:text-base">
              To ensure you receive your audit report:
            </p>
            <ul className="space-y-2 text-xs md:text-sm">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1 flex-shrink-0">•</span>
                <span>Add <strong>team@totalauthority.com</strong> to your email whitelist</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1 flex-shrink-0">•</span>
                <span>Check your spam/junk folder regularly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1 flex-shrink-0">•</span>
                <span>Mark our emails as "Not Spam" if they land there</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Email Animation - Desktop */}
        <div className="hidden md:flex flex-shrink-0 w-40 h-20 relative">
          {/* Animation Track */}
          <div className="absolute inset-0 flex items-center justify-between">
            {/* Spam Folder */}
            <div className={`w-16 h-12 bg-red-100 border-2 border-red-300 rounded-lg flex flex-col items-center justify-center text-xs font-semibold text-red-700 transition-all duration-300 ${animationStage === 1 ? 'folder-highlight' : ''}`}>
              <span className="text-lg">🗑️</span>
              <span className="text-xs">Spam</span>
            </div>
            
            {/* Arrow */}
            <div className="flex-1 flex items-center justify-center">
              <div className="text-2xl">→</div>
            </div>
            
            {/* Inbox Folder */}
            <div className={`w-16 h-12 bg-green-100 border-2 border-green-300 rounded-lg flex flex-col items-center justify-center text-xs font-semibold text-green-700 transition-all duration-300 ${animationStage === 2 ? 'success-highlight' : ''}`}>
              <span className="text-lg">📥</span>
              <span className="text-xs">Inbox</span>
            </div>
          </div>
          
          {/* Animated Email */}
          <div 
            className={`absolute top-1/2 w-5 h-4 bg-blue-500 rounded-sm flex items-center justify-center transition-all duration-700 transform -translate-y-1/2 ${
              animationStage === 0 ? 'left-2' :
              animationStage === 1 ? 'left-2 email-move' :
              'right-2'
            } z-10`}
          >
            <Mail className="w-3 h-3 text-white" />
          </div>
        </div>
      </div>
      
      {/* Mobile Animation */}
      <div className="md:hidden mt-4 flex items-center justify-center">
        <div className="flex items-center gap-2 relative w-full max-w-xs">
          {/* Spam Folder */}
          <div className={`flex-1 h-10 bg-red-100 border-2 border-red-300 rounded-lg flex items-center justify-center text-xs font-semibold text-red-700 transition-all duration-300 ${animationStage === 1 ? 'folder-highlight' : ''}`}>
            <span className="mr-1">🗑️</span>
            <span>Spam</span>
          </div>
          
          {/* Arrow */}
          <div className="text-lg text-gray-600">→</div>
          
          {/* Inbox Folder */}
          <div className={`flex-1 h-10 bg-green-100 border-2 border-green-300 rounded-lg flex items-center justify-center text-xs font-semibold text-green-700 transition-all duration-300 ${animationStage === 2 ? 'success-highlight' : ''}`}>
            <span className="mr-1">📥</span>
            <span>Inbox</span>
          </div>
          
          {/* Animated Email */}
          <div 
            className={`absolute w-4 h-3 bg-blue-500 rounded-sm flex items-center justify-center transition-all duration-700 top-1/2 transform -translate-y-1/2 ${
              animationStage === 0 ? 'left-4' :
              animationStage === 1 ? 'left-4 email-move' :
              'right-4'
            } z-10`}
          >
            <Mail className="w-2.5 h-2.5 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};