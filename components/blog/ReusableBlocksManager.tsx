"use client";


import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { DeliverySection } from '@/components/DeliverySection';
import { Clock, Zap, CheckCircle, Sparkles } from 'lucide-react';

interface ReusableBlocksManagerProps {
  onInsertBlock: (content: string) => void;
  onOpenForm?: () => void;
}

export const ReusableBlocksManager: React.FC<ReusableBlocksManagerProps> = ({
  onInsertBlock,
  onOpenForm
}) => {
  const { toast } = useToast();

  const generateBlockId = () => {
    return `cta-block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const ctaBlocks = [
    {
      name: 'Free LLM Visibility Audit CTA',
      description: 'Sleek CTA with animated particles',
      preview: (
        <div className="scale-75 origin-top-left transform w-full h-24 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl relative">
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-0.5 h-0.5 bg-orange-400 rounded-full animate-bounce opacity-60"></div>
            <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-blue-400 rounded-full animate-bounce opacity-60"></div>
            <div className="absolute bottom-1/3 left-1/3 w-0.5 h-0.5 bg-purple-400 rounded-full animate-bounce opacity-60"></div>
            <div className="absolute bottom-1/4 right-1/4 w-0.5 h-0.5 bg-orange-300 rounded-full animate-bounce opacity-60"></div>
          </div>
          
          <div className="relative z-10 p-3 text-center">
            <div className="mb-1">
              <span className="text-orange-200 font-semibold text-xs">Get Your Free LLM Visibility Audit</span>
            </div>
            
            <button 
              onClick={onOpenForm}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 text-xs font-bold rounded-lg shadow-lg"
            >
              Start Free Audit →
            </button>
            
            <div className="mt-1 text-slate-400 text-xs">24-hour delivery</div>
          </div>
        </div>
      ),
      getContent: (blockId: string) => `<div class="relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-2xl p-8 border border-orange-400/30 shadow-xl overflow-hidden my-6 max-w-2xl mx-auto cta-block" data-block-type="floating-particles" data-block-id="${blockId}">
        <!-- Remove button -->
        <button class="cta-remove-btn absolute top-3 right-3 z-20 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 text-sm font-bold leading-none" data-block-id="${blockId}" title="Remove this block" type="button">
          ×
        </button>
        
        <!-- Floating particles -->
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute top-1/4 left-1/4 w-1 h-1 bg-orange-400 rounded-full animate-bounce opacity-60"></div>
          <div class="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-bounce opacity-60"></div>
          <div class="absolute bottom-1/3 left-1/3 w-1 h-1 bg-purple-400 rounded-full animate-bounce opacity-60"></div>
          <div class="absolute bottom-1/4 right-1/4 w-1 h-1 bg-orange-300 rounded-full animate-bounce opacity-60"></div>
        </div>
        
         <div class="relative z-10 text-center">
           <div class="mb-4">
             <h3 class="text-white font-black text-sm sm:text-xl mb-2 drop-shadow-lg leading-tight" style="color: white !important;">Get Your Free LLM Visibility Audit</h3>
             <p class="text-white/90 text-xs sm:text-sm font-semibold drop-shadow leading-tight" style="color: rgba(255, 255, 255, 0.9) !important;">Discover how visible your brand is across AI platforms</p>
           </div>
          
          <button onclick="window.parent.postMessage({type: 'OPEN_FORM'}, '*')" class="relative inline-block bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 text-lg font-bold rounded-xl shadow-xl transition-all duration-300 transform hover:scale-105 border border-orange-400/50 cursor-pointer border-none mb-4">
            Start Free Audit →
          </button>
          
          <div class="flex items-center justify-center gap-4 text-white/80 text-sm font-medium" style="color: rgba(255, 255, 255, 0.8) !important;">
            <div class="flex items-center gap-1">
              <div class="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              <span>24-hour delivery</span>
            </div>
            <div class="flex items-center gap-1">
              <div class="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span>No sales call</span>
            </div>
          </div>
        </div>
      </div>`
    }
  ];

  const insertBlock = (getContent: (blockId: string) => string) => {
    // Prevent double insertions by checking if button is disabled
    const button = document.activeElement as HTMLButtonElement;
    if (button && button.disabled) return;
    
    // Temporarily disable the button to prevent double clicks
    if (button) {
      button.disabled = true;
      setTimeout(() => {
        button.disabled = false;
      }, 1000);
    }
    
    const blockId = generateBlockId();
    const content = getContent(blockId);
    onInsertBlock(content);
    
    toast({
      title: "Success",
      description: "CTA block inserted into content",
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Homepage CTAs</h3>
      <div className="space-y-4">
        {ctaBlocks.map((block, index) => (
          <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-sm font-semibold text-gray-900">{block.name}</CardTitle>
                  <p className="text-xs text-gray-500 mt-1">{block.description}</p>
                </div>
                <Button
                  size="sm"
                  onClick={() => insertBlock(block.getContent)}
                  className="ml-3 bg-orange-500 hover:bg-orange-600"
                  type="button"
                >
                  Insert
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-xs text-gray-600 mb-2">Preview:</div>
              <div className="border rounded-lg overflow-hidden bg-gray-50">
                {block.preview}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
