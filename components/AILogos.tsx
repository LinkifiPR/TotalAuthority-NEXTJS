"use client";

import React from 'react';
import { Brain, Cpu, Zap, Sparkles, Bot, Network } from 'lucide-react';
export const AILogos = () => {
  const logos = [{
    name: "OpenAI",
    url: "https://cdn.brandfetch.io/openai.com/w/512/h/139/logo?c=1idP0DrE2OZDRG5HYTw",
    size: "h-8"
  }, {
    name: "Claude",
    url: "https://cdn.brandfetch.io/claude.ai/w/512/h/111/logo?c=1idP0DrE2OZDRG5HYTw",
    size: "h-8"
  }, {
    name: "Perplexity",
    url: "https://cdn.brandfetch.io/perplexity.ai/w/512/h/512?c=1idP0DrE2OZDRG5HYTw",
    size: "h-10 w-10"
  }, {
    name: "Google",
    url: "https://cdn.brandfetch.io/google.com/w/512/h/161/logo?c=1idP0DrE2OZDRG5HYTw",
    size: "h-8"
  }];
  const aiGraphics = [{
    icon: Brain,
    position: {
      x: -220,
      y: -180
    },
    color: "text-blue-500"
  }, {
    icon: Cpu,
    position: {
      x: 240,
      y: -160
    },
    color: "text-purple-500"
  }, {
    icon: Zap,
    position: {
      x: -260,
      y: 120
    },
    color: "text-yellow-500"
  }, {
    icon: Sparkles,
    position: {
      x: 280,
      y: 140
    },
    color: "text-pink-500"
  }, {
    icon: Bot,
    position: {
      x: -180,
      y: 220
    },
    color: "text-green-500"
  }, {
    icon: Network,
    position: {
      x: 200,
      y: 240
    },
    color: "text-indigo-500"
  }, {
    icon: Brain,
    position: {
      x: 320,
      y: -60
    },
    color: "text-orange-500"
  }, {
    icon: Cpu,
    position: {
      x: -300,
      y: -40
    },
    color: "text-red-500"
  }];
  const cornerLogos = [{
    icon: Brain,
    position: "top-4 left-4",
    color: "text-blue-500"
  }, {
    icon: Cpu,
    position: "top-4 right-4",
    color: "text-purple-500"
  }, {
    icon: Bot,
    position: "bottom-4 left-4",
    color: "text-green-500"
  }, {
    icon: Sparkles,
    position: "bottom-4 right-4",
    color: "text-pink-500"
  }];
  return <div className="mt-16 relative overflow-hidden">
      <div className="text-center mb-8">
        <p className="text-lg text-slate-600 font-medium">We test across major AI platforms (ChatGPT for Free Audit*)</p>
      </div>
      
      {/* Main container with orbital animation */}
      <div className="relative flex justify-center items-center min-h-[500px]">
        {/* Corner spinning AI logos */}
        {cornerLogos.map((corner, index) => {
        const IconComponent = corner.icon;
        return <div key={`corner-${index}`} className={`absolute ${corner.position} bg-white rounded-full p-4 shadow-lg border border-slate-100 animate-spin z-20`}>
              <IconComponent className={`w-8 h-8 ${corner.color}`} />
            </div>;
      })}
        
        {/* Enhanced orbital rings with more outer rings */}
        <div className="absolute inset-0 flex justify-center items-center">
          {/* Outermost rings */}
          <div className="w-[650px] h-[650px] border border-slate-100 rounded-full animate-spin-very-slow opacity-10"></div>
          <div className="w-[600px] h-[600px] border border-blue-100 rounded-full animate-spin-reverse-slow opacity-12"></div>
          <div className="w-[550px] h-[550px] border border-purple-100 rounded-full animate-spin-slow opacity-15"></div>
          
          {/* Original rings */}
          <div className="w-[500px] h-[500px] border border-orange-200 rounded-full animate-spin-slow opacity-20"></div>
          <div className="absolute w-96 h-96 border border-blue-200 rounded-full animate-spin-reverse opacity-30"></div>
          <div className="absolute w-80 h-80 border border-purple-200 rounded-full animate-spin opacity-25"></div>
          <div className="absolute w-64 h-64 border border-slate-200 rounded-full animate-spin-reverse opacity-20"></div>
          <div className="absolute w-[450px] h-[450px] border border-pink-200 rounded-full animate-spin-slow opacity-15"></div>
          <div className="absolute w-[420px] h-[420px] border border-green-200 rounded-full animate-spin opacity-18"></div>
        </div>
        
        {/* AI Graphics positioned around the orbit */}
        {aiGraphics.map((graphic, index) => {
        const IconComponent = graphic.icon;
        return <div key={index} className="absolute bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-slate-100" style={{
          left: `calc(50% + ${graphic.position.x}px - 1.5rem)`,
          top: `calc(50% + ${graphic.position.y}px - 1.5rem)`,
          animation: `float-ai-${index} ${4 + index % 3}s ease-in-out infinite`
        }}>
              <IconComponent className={`w-6 h-6 ${graphic.color} opacity-80 hover:opacity-100 transition-opacity duration-300`} />
            </div>;
      })}
        
        {/* Logo positions in orbital formation */}
        <div className="relative w-96 h-96">
          {logos.map((logo, index) => {
          const angle = index * 90 - 45; // Position logos at 45, 135, 225, 315 degrees
          const radius = 160; // Increased radius for more spacing
          const x = Math.cos(angle * Math.PI / 180) * radius;
          const y = Math.sin(angle * Math.PI / 180) * radius;
          return <div key={logo.name} className="absolute bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-slate-100 z-10" style={{
            left: `calc(50% + ${x}px - 2rem)`,
            top: `calc(50% + ${y}px - 2rem)`,
            animation: `float-${index} 4s ease-in-out infinite`
          }}>
                <img src={logo.url} alt={logo.name} className={`${logo.size} object-contain opacity-80 hover:opacity-100 transition-opacity duration-300`} loading="lazy" />
              </div>;
        })}
        </div>
        
        {/* Enhanced central glow effect */}
        <div className="absolute w-20 h-20 bg-gradient-to-r from-orange-400 via-purple-400 to-blue-400 rounded-full opacity-20 blur-xl animate-pulse"></div>
        <div className="absolute w-12 h-12 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full opacity-30 blur-lg animate-pulse"></div>
      </div>
      
      <style dangerouslySetInnerHTML={{
      __html: `
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes spin-reverse {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
          
          @keyframes spin-very-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes spin-reverse-slow {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
          
          @keyframes float-0 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(5deg); }
          }
          
          @keyframes float-1 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(-3deg); }
          }
          
          @keyframes float-2 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-8px) rotate(4deg); }
          }
          
          @keyframes float-3 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-12px) rotate(-2deg); }
          }
          
          @keyframes float-ai-0 {
            0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
            50% { transform: translateY(-8px) rotate(10deg) scale(1.1); }
          }
          
          @keyframes float-ai-1 {
            0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
            50% { transform: translateY(-12px) rotate(-8deg) scale(1.05); }
          }
          
          @keyframes float-ai-2 {
            0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
            50% { transform: translateY(-6px) rotate(12deg) scale(1.08); }
          }
          
          @keyframes float-ai-3 {
            0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
            50% { transform: translateY(-10px) rotate(-5deg) scale(1.12); }
          }
          
          @keyframes float-ai-4 {
            0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
            50% { transform: translateY(-14px) rotate(8deg) scale(1.06); }
          }
          
          @keyframes float-ai-5 {
            0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
            50% { transform: translateY(-7px) rotate(-12deg) scale(1.09); }
          }
          
          @keyframes float-ai-6 {
            0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
            50% { transform: translateY(-11px) rotate(6deg) scale(1.07); }
          }
          
          @keyframes float-ai-7 {
            0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
            50% { transform: translateY(-9px) rotate(-10deg) scale(1.04); }
          }
          
          .animate-spin-slow {
            animation: spin-slow 25s linear infinite;
          }
          
          .animate-spin-reverse {
            animation: spin-reverse 20s linear infinite;
          }
          
          .animate-spin {
            animation: spin-slow 18s linear infinite;
          }
          
          .animate-spin-very-slow {
            animation: spin-very-slow 35s linear infinite;
          }
          
          .animate-spin-reverse-slow {
            animation: spin-reverse-slow 30s linear infinite;
          }
        `
    }} />
    </div>;
};
