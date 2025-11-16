
import { useState } from 'react';
import { supabase } from '@/lib/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ReviewFormData } from './types';
import { convertLoomUrl } from './auditUtils';

export const useAuditReview = (onReviewComplete: () => void) => {
  const [submittingReview, setSubmittingReview] = useState<string | null>(null);
  const { toast } = useToast();

  const submitReview = async (auditId: string, formData: ReviewFormData) => {
    setSubmittingReview(auditId);
    
    try {
      let updateData: any = {
        reviewer_name: formData.reviewer_name,
        review_status: 'completed'
      };

      if (formData.video_option === 'include') {
        const convertedVideoUrl = convertLoomUrl(formData.loom_video_url);
        updateData = {
          ...updateData,
          loom_video_url: convertedVideoUrl,
          key_strengths: formData.key_strengths.split('\n').filter(item => item.trim()),
          priority_actions: formData.priority_actions.split('\n').filter(item => item.trim()),
          strategic_insights: formData.strategic_insights.split('\n').filter(item => item.trim()),
          ai_feedback: null
        };
      } else {
        updateData = {
          ...updateData,
          loom_video_url: null,
          key_strengths: null,
          priority_actions: null,
          strategic_insights: null,
          ai_feedback: formData.ai_feedback
        };
      }

      const { error } = await supabase
        .from('audit_reports')
        .update(updateData)
        .eq('id', auditId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Review submitted successfully!",
      });
      
      onReviewComplete();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to submit review",
        variant: "destructive",
      });
    } finally {
      setSubmittingReview(null);
    }
  };

  return {
    submittingReview,
    submitReview,
  };
};
