"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface EnhancedVideoPlayerProps {
  vimeoId: string;
  title: string;
  className?: string;
}

export const EnhancedVideoPlayer: React.FC<EnhancedVideoPlayerProps> = ({
  vimeoId,
  title,
  className = ""
}) => {
  const [isInView, setIsInView] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [scrubPosition, setScrubPosition] = useState(0);
  const videoRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const scrubRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for autoplay on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-play when in view
  useEffect(() => {
    if (isInView && !isPlaying) {
      setIsPlaying(true);
    }
  }, [isInView, isPlaying]);

  const toggleMute = useCallback(() => {
    setIsMuted(!isMuted);
    // Send message to Vimeo iframe to toggle mute
    if (iframeRef.current) {
      const message = isMuted ? 'setVolume:1' : 'setVolume:0';
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ method: 'setVolume', value: isMuted ? 1 : 0 }),
        'https://player.vimeo.com'
      );
    }
  }, [isMuted]);

  const togglePlay = useCallback(() => {
    const newPlayState = !isPlaying;
    setIsPlaying(newPlayState);
    
    if (iframeRef.current) {
      const method = newPlayState ? 'play' : 'pause';
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ method }),
        'https://player.vimeo.com'
      );
    }
  }, [isPlaying]);

  const handleScrub = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrubRef.current || !isHovering) return;
    
    const rect = scrubRef.current.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    setScrubPosition(Math.max(0, Math.min(1, position)));
    
    // Send seek command to Vimeo (assuming 30 second video duration for demo)
    const seekTime = position * 30; // Adjust based on actual video duration
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ method: 'setCurrentTime', value: seekTime }),
        'https://player.vimeo.com'
      );
    }
  }, [isHovering]);

  // Build Vimeo URL with parameters
  const vimeoUrl = `https://player.vimeo.com/video/${vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=${isInView ? 1 : 0}&muted=${isMuted ? 1 : 0}&background=0&title=0&byline=0&portrait=0&controls=0&loop=1`;

  return (
    <div 
      ref={videoRef}
      className={`relative group ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative" style={{padding:'56.25% 0 0 0'}}>
        <iframe 
          ref={iframeRef}
          src={vimeoUrl}
          frameBorder="0" 
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}} 
          title={title}
          className="w-full h-full rounded-lg"
        />
        
        {/* Enhanced Controls Overlay */}
        <div className={`absolute inset-0 transition-all duration-300 ${isHovering ? 'bg-black/20' : 'bg-transparent'}`}>
          
          {/* Top Controls */}
          <div className="absolute top-4 left-4 flex items-center space-x-2">
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-ping"></div>
              LIVE
            </div>
          </div>
          
          <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
            SEO Estonia Conference
          </div>

          {/* Center Play/Pause Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className={`bg-black/50 hover:bg-black/70 text-white rounded-full p-4 backdrop-blur-sm transition-all duration-300 ${isHovering ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
            </button>
          </div>

          {/* Enhanced Bottom Controls */}
          <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 transition-all duration-300 ${isHovering ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            
            {/* Scrub Bar */}
            <div 
              ref={scrubRef}
              className="relative h-2 bg-white/20 rounded-full mb-4 cursor-pointer group/scrub"
              onClick={handleScrub}
              onMouseMove={handleScrub}
            >
              <div 
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-150"
                style={{ width: `${scrubPosition * 100}%` }}
              />
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover/scrub:opacity-100 transition-all duration-150"
                style={{ left: `${scrubPosition * 100}%`, transform: 'translateX(-50%) translateY(-50%)' }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {/* Super Obvious Unmute Button */}
                <button
                  onClick={toggleMute}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
                    isMuted 
                      ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-5 h-5" />
                      <span>CLICK TO UNMUTE</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-5 h-5" />
                      <span>SOUND ON</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-white text-sm bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                {isPlaying ? 'Playing' : 'Paused'}
              </div>
            </div>
          </div>
        </div>

        {/* Hover Instructions */}
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm transition-all duration-300 pointer-events-none ${
          isHovering && !isPlaying ? 'opacity-100' : 'opacity-0'
        }`}>
          Hover to scrub through video
        </div>
      </div>
    </div>
  );
};