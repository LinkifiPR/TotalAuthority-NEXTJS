"use client";


import React, { useEffect, useState } from 'react';

export const ThankYouAnimation: React.FC = () => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 300);
    const timer2 = setTimeout(() => setStage(2), 1000);
    const timer3 = setTimeout(() => setStage(3), 2000);
    const timer4 = setTimeout(() => setStage(4), 3000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-orange-50 rounded-2xl">
      {/* Enhanced CSS for multiple animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.3); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
            50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8), 0 0 60px rgba(147, 51, 234, 0.6); }
          }
          @keyframes dataFlow {
            0% { transform: translateX(-100px) translateY(-100px) scale(0); opacity: 0; }
            20% { opacity: 1; transform: translateX(-50px) translateY(-50px) scale(1); }
            80% { opacity: 1; transform: translateX(50px) translateY(50px) scale(1); }
            100% { transform: translateX(100px) translateY(100px) scale(0); opacity: 0; }
          }
          @keyframes robotBounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-15px); }
            60% { transform: translateY(-8px); }
          }
          .twinkle { animation: twinkle 2s infinite; }
          .float { animation: float 3s ease-in-out infinite; }
          .glow { animation: glow 2s ease-in-out infinite; }
          .data-flow { animation: dataFlow 2s ease-in-out infinite; }
          .robot-bounce { animation: robotBounce 2s ease-in-out infinite; }
        `
      }} />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating geometric shapes */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute transition-all duration-2000 ${stage >= 1 ? 'opacity-40' : 'opacity-0'}`}
            style={{
              left: `${10 + (i * 8)}%`,
              top: `${10 + (Math.sin(i) * 30)}%`,
              animationDelay: `${i * 0.2}s`
            }}
          >
            <div className={`w-3 h-3 ${i % 3 === 0 ? 'bg-blue-400' : i % 3 === 1 ? 'bg-purple-400' : 'bg-orange-400'} rounded-full twinkle`}></div>
          </div>
        ))}
        
        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-300/30 to-purple-400/30 rounded-full blur-xl float" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-300/30 to-cyan-400/30 rounded-full blur-xl float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Enhanced Robot Animation Container */}
      <div className="relative mb-12 z-10">
        {/* Main Robot with enhanced animations */}
        <div className={`relative transition-all duration-1000 ${stage >= 1 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'} ${stage >= 2 ? 'robot-bounce' : ''}`}>
          {/* Robot Body with glow effect */}
          <div className={`w-24 h-28 bg-gradient-to-b from-blue-500 via-purple-600 to-indigo-700 rounded-2xl relative mx-auto shadow-2xl ${stage >= 2 ? 'glow' : ''}`}>
            {/* Robot Head with enhanced styling */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 rounded-xl shadow-2xl overflow-hidden">
              {/* Eyes with enhanced animation */}
              <div className={`absolute top-5 left-4 w-3 h-3 bg-white rounded-full transition-all duration-300 ${stage >= 2 ? 'animate-pulse shadow-lg shadow-cyan-400' : ''}`}>
                <div className="absolute top-0.5 left-0.5 w-2 h-2 bg-cyan-400 rounded-full"></div>
              </div>
              <div className={`absolute top-5 right-4 w-3 h-3 bg-white rounded-full transition-all duration-300 ${stage >= 2 ? 'animate-pulse shadow-lg shadow-cyan-400' : ''}`}>
                <div className="absolute top-0.5 left-0.5 w-2 h-2 bg-cyan-400 rounded-full"></div>
              </div>
              
              {/* Enhanced Antenna */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-gradient-to-t from-orange-300 to-yellow-400 rounded-full">
                <div className={`absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full transition-all duration-500 ${stage >= 2 ? 'animate-bounce shadow-lg shadow-blue-400' : ''}`}>
                  <div className="absolute inset-0.5 bg-white rounded-full opacity-60"></div>
                </div>
              </div>
              
              {/* Animated Mouth */}
              <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${stage >= 3 ? 'w-8 h-2' : 'w-6 h-1'} bg-white rounded-full`}></div>
              
              {/* Face expressions */}
              {stage >= 3 && (
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-200 rounded-full animate-ping"></div>
              )}
            </div>
            
            {/* Enhanced Control Panel */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 space-y-2">
              <div className={`w-10 h-1.5 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full transition-all duration-300 ${stage >= 2 ? 'animate-pulse shadow-md shadow-cyan-300' : ''}`}></div>
              <div className={`w-8 h-1.5 bg-gradient-to-r from-green-300 to-emerald-400 rounded-full transition-all duration-300 delay-100 ${stage >= 2 ? 'animate-pulse shadow-md shadow-green-300' : ''}`}></div>
              <div className={`w-6 h-1.5 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full transition-all duration-300 delay-200 ${stage >= 2 ? 'animate-pulse shadow-md shadow-yellow-300' : ''}`}></div>
            </div>
            
            {/* Enhanced Arms */}
            <div className="absolute top-10 -left-5 w-4 h-10 bg-gradient-to-b from-blue-400 via-purple-500 to-indigo-600 rounded-full transform rotate-12 shadow-lg"></div>
            <div className="absolute top-10 -right-5 w-4 h-10 bg-gradient-to-b from-blue-400 via-purple-500 to-indigo-600 rounded-full transform -rotate-12 shadow-lg"></div>
            
            {/* Robot feet */}
            <div className="absolute -bottom-2 left-2 w-6 h-3 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full"></div>
            <div className="absolute -bottom-2 right-2 w-6 h-3 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full"></div>
          </div>
        </div>

        {/* Enhanced Data Particles with flowing animation */}
        {stage >= 2 && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute data-flow"
                style={{
                  left: `${30 + (i * 5)}%`,
                  top: `${25 + (i % 5) * 15}%`,
                  animationDelay: `${i * 150}ms`,
                }}
              >
                <div className={`w-2 h-2 ${i % 4 === 0 ? 'bg-gradient-to-br from-cyan-400 to-blue-500' : 
                  i % 4 === 1 ? 'bg-gradient-to-br from-purple-400 to-pink-500' : 
                  i % 4 === 2 ? 'bg-gradient-to-br from-orange-400 to-red-500' : 
                  'bg-gradient-to-br from-green-400 to-emerald-500'} rounded-full shadow-lg`}></div>
              </div>
            ))}
          </div>
        )}

        {/* Enhanced Transmission Lines */}
        {stage >= 3 && (
          <div className="absolute -inset-12 pointer-events-none">
            <div className="absolute inset-0 border-2 border-dashed border-cyan-300/60 rounded-full animate-spin opacity-40 shadow-lg" style={{ animationDuration: '8s' }}></div>
            <div className="absolute inset-6 border border-dashed border-purple-300/60 rounded-full animate-spin opacity-50 shadow-md" style={{ animationDuration: '6s', animationDirection: 'reverse' }}></div>
            <div className="absolute inset-12 border border-dotted border-orange-300/50 rounded-full animate-spin opacity-30" style={{ animationDuration: '10s' }}></div>
          </div>
        )}
      </div>

      {/* Enhanced Thank You Message */}
      <div className={`space-y-6 transition-all duration-1000 delay-300 ${stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} z-10`}>
        <div className="relative">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-500 via-purple-600 to-blue-600 bg-clip-text text-transparent relative">
            Mission Received! 🚀
            {stage >= 2 && (
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/20 via-purple-600/20 to-blue-600/20 blur-xl rounded-lg animate-pulse"></div>
            )}
          </h2>
        </div>
        
        <div className={`transition-all duration-1000 delay-700 ${stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} space-y-3`}>
          <p className="text-xl text-gray-800 font-medium">
            Our team is <span className="text-purple-600 font-bold">hard at work</span> on your audit.
          </p>
          <p className="text-base text-gray-700">
            We're reviewing every detail, checking data accuracy, and making sure nothing's missed.
          </p>
        </div>

        <div className={`transition-all duration-1000 delay-1200 ${stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="flex items-center justify-center space-x-3 text-orange-600 mb-6 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-bounce shadow-md"></div>
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce shadow-md" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-bounce shadow-md" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-sm font-semibold bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
              Processing your audit with expert precision...
            </span>
          </div>
        </div>

      </div>

      {/* Enhanced Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute transition-all duration-3000 ${stage >= 2 ? 'opacity-60' : 'opacity-0'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`
            }}
          >
            <div className={`w-1 h-1 ${i % 3 === 0 ? 'bg-blue-400' : i % 3 === 1 ? 'bg-purple-400' : 'bg-orange-400'} rounded-full twinkle shadow-lg`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};
