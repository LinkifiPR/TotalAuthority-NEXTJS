
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { supabase } from '@/lib/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ReviewFormData } from './formValidation';

interface AuditReport {
  id: string;
  client_name: string;
  audit_data?: any;
}

interface AIFeedbackGeneratorProps {
  form: UseFormReturn<ReviewFormData>;
  audit: AuditReport;
}

export const AIFeedbackGenerator: React.FC<AIFeedbackGeneratorProps> = ({ form, audit }) => {
  const [generatingAI, setGeneratingAI] = useState(false);
  const { toast } = useToast();

  const generateAIFeedback = async () => {
    setGeneratingAI(true);
    try {
      console.log('Generating AI feedback for:', audit.client_name);
      console.log('Audit ID:', audit.id);
      
      const { data, error } = await supabase.functions.invoke('generate-audit-feedback', {
        body: {
          clientName: audit.client_name,
          auditData: audit.audit_data,
          auditId: audit.id
        }
      });

      console.log('AI feedback response:', data);
      console.log('AI feedback error:', error);

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Failed to generate AI feedback');
      }

      if (!data?.feedback) {
        throw new Error('No feedback received from AI service');
      }

      form.setValue('ai_feedback', data.feedback);
      toast({
        title: "Success",
        description: "AI feedback generated successfully!",
      });
    } catch (error: any) {
      console.error('AI feedback generation error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate AI feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setGeneratingAI(false);
    }
  };

  return (
    <FormField
      control={form.control}
      name="ai_feedback"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm">AI-Generated Feedback *</FormLabel>
          <div className="space-y-2">
            <Button
              type="button"
              variant="outline"
              onClick={generateAIFeedback}
              disabled={generatingAI}
              className="w-full"
            >
              {generatingAI ? 'Generating...' : 'Generate AI Feedback'}
            </Button>
            <FormControl>
              <Textarea 
                placeholder="AI-generated feedback will appear here. You can edit it after generation..."
                className="min-h-[120px]"
                {...field}
                value={field.value || ''}
              />
            </FormControl>
            <p className="text-xs text-gray-500">
              Tip: After generating AI feedback, you can edit the content above to customize it as needed.
            </p>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
