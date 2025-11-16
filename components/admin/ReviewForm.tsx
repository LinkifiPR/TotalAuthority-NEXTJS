"use client";


import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { ReviewFormData, useFormValidation } from './review/formValidation';
import { ReviewerNameField } from './review/ReviewerNameField';
import { VideoOptionSelector } from './review/VideoOptionSelector';
import { VideoOptionFields } from './review/VideoOptionFields';
import { AIFeedbackGenerator } from './review/AIFeedbackGenerator';

interface AuditReport {
  id: string;
  client_name: string;
  share_url_slug: string;
  audit_code: string | null;
  created_at: string;
  status: string;
  reviewer_name?: string;
  loom_video_url?: string;
  key_strengths?: string[];
  priority_actions?: string[];
  strategic_insights?: string[];
  review_status?: string;
  audit_data?: any;
  ai_feedback?: string;
}

interface ReviewFormProps {
  audit: AuditReport;
  submittingReview: string | null;
  onSubmit: (auditId: string, formData: ReviewFormData) => void;
  onCancel: () => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
  audit,
  submittingReview,
  onSubmit,
  onCancel
}) => {
  const { validateForm } = useFormValidation();

  const form = useForm<ReviewFormData>({
    defaultValues: {
      reviewer_name: audit.reviewer_name || '',
      video_option: audit.loom_video_url ? 'include' : 'exclude',
      loom_video_url: audit.loom_video_url || '',
      key_strengths: audit.key_strengths?.join('\n') || '',
      priority_actions: audit.priority_actions?.join('\n') || '',
      strategic_insights: audit.strategic_insights?.join('\n') || '',
      ai_feedback: audit.ai_feedback || ''
    },
    mode: 'onChange'
  });

  const videoOption = form.watch('video_option');

  // Reset form when audit changes
  useEffect(() => {
    form.reset({
      reviewer_name: audit.reviewer_name || '',
      video_option: audit.loom_video_url ? 'include' : 'exclude',
      loom_video_url: audit.loom_video_url || '',
      key_strengths: audit.key_strengths?.join('\n') || '',
      priority_actions: audit.priority_actions?.join('\n') || '',
      strategic_insights: audit.strategic_insights?.join('\n') || '',
      ai_feedback: audit.ai_feedback || ''
    });
  }, [audit.id, form]);

  const handleSubmit = (data: ReviewFormData) => {
    console.log('Form submission data:', data);
    
    if (!validateForm(data)) {
      return;
    }

    onSubmit(audit.id, data);
  };

  const handleCancel = () => {
    form.reset();
    onCancel();
  };

  return (
    <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-sm text-yellow-800">
          {audit.review_status === 'completed' ? 'Edit Review' : 'Complete Review'}
        </h4>
        {audit.review_status === 'completed' && (
          <Button
            size="sm"
            variant="outline"
            onClick={handleCancel}
            type="button"
          >
            Cancel
          </Button>
        )}
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <ReviewerNameField form={form} />
          <VideoOptionSelector form={form} />

          {videoOption === 'include' && <VideoOptionFields form={form} />}
          {videoOption === 'exclude' && <AIFeedbackGenerator form={form} audit={audit} />}

          <Button 
            type="submit" 
            className="w-full"
            disabled={submittingReview === audit.id}
          >
            {submittingReview === audit.id ? 'Submitting...' : 
             audit.review_status === 'completed' ? 'Update Review' : 'Submit Review'}
          </Button>
        </form>
      </Form>
    </div>
  );
};
