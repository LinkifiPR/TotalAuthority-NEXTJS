"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Mail, Sparkles } from 'lucide-react';

interface FormSubmittedDialogProps {
  isOpen: boolean;
  onEnterCode: () => void;
}

export const FormSubmittedDialog = ({ isOpen, onEnterCode }: FormSubmittedDialogProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-lg border-2 border-orange-200 dark:border-orange-800">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="p-4 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-800 rounded-full shadow-lg animate-scale-in">
              <CheckCircle2 className="w-10 h-10 text-orange-600 dark:text-orange-300" />
            </div>
          </div>
          <DialogTitle className="text-center text-3xl font-bold text-gray-900 dark:text-white">
            Check Your Email! 📧
          </DialogTitle>
          <DialogDescription className="text-center pt-6 space-y-6">
            <div className="flex items-center justify-center gap-3 text-lg">
              <Mail className="w-6 h-6 text-orange-500" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Your access code is on its way
              </span>
            </div>
            <div className="bg-orange-50 dark:bg-orange-950/30 rounded-xl p-4 border border-orange-200 dark:border-orange-800">
              <p className="text-base text-gray-700 dark:text-gray-300">
                We've sent an email with your unique access code to unlock your personalized AI visibility analysis
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-8 space-y-3">
          <Button 
            onClick={onEnterCode}
            className="w-full gap-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all"
            size="lg"
          >
            <Sparkles className="w-5 h-5" />
            Enter Access Code Now
          </Button>
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            Don't see the email? Check your spam folder
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
