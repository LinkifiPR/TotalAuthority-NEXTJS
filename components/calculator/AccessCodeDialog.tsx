"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle2, X, KeyRound, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface AccessCodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCorrectCode: () => void;
}

const CORRECT_CODE = 'TACALC001';

export const AccessCodeDialog = ({ isOpen, onClose, onCorrectCode }: AccessCodeDialogProps) => {
  const [code, setCode] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (code.toUpperCase() === CORRECT_CODE) {
      toast.success('🎉 Access granted! Unlocking your results...', {
        duration: 3000,
      });
      setTimeout(() => {
        onCorrectCode();
      }, 500);
    } else {
      setIsError(true);
      toast.error('❌ Invalid access code. Please check your email and try again.', {
        duration: 4000,
      });
      setTimeout(() => setIsError(false), 600);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg border-2 border-orange-200 dark:border-orange-800 bg-gradient-to-b from-white to-orange-50/30 dark:from-gray-900 dark:to-orange-950/20 z-[10001]">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="p-4 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-800 rounded-full shadow-lg">
              <KeyRound className="w-10 h-10 text-orange-600 dark:text-orange-300" />
            </div>
          </div>
          <DialogTitle className="text-center text-3xl font-bold text-gray-900 dark:text-white">
            Enter Access Code 🔑
          </DialogTitle>
          <DialogDescription className="text-center pt-4 text-base text-gray-700 dark:text-gray-300">
            Enter the code from your email to unlock your personalized AI visibility analysis
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-3">
            <Input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                setIsError(false);
              }}
              placeholder="ENTER CODE HERE"
              className={`text-center text-2xl font-mono tracking-widest uppercase h-16 border-2 ${
                isError 
                  ? 'border-red-500 bg-red-50 dark:bg-red-950/20 animate-shake' 
                  : 'border-orange-300 dark:border-orange-700 bg-white dark:bg-gray-800 focus:border-orange-500 focus:ring-orange-500'
              }`}
              autoFocus
              maxLength={20}
            />
            {isError && (
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                <p className="text-sm text-red-600 dark:text-red-400 text-center font-medium">
                  ❌ Invalid code. Please check your email and try again.
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
              size="lg"
            >
              <X className="w-5 h-5 mr-2" />
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all"
              size="lg"
            >
              <CheckCircle2 className="w-5 h-5" />
              Unlock Results
            </Button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-orange-200 dark:border-orange-800">
          <div className="bg-orange-50 dark:bg-orange-950/30 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
            <p className="text-sm text-center text-gray-700 dark:text-gray-300 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-500" />
              Check your email inbox (and spam folder) for your access code
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
