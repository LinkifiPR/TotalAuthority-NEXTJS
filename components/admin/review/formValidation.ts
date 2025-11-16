
import { useToast } from '@/hooks/use-toast';

export interface ReviewFormData {
  reviewer_name: string;
  video_option: 'include' | 'exclude';
  loom_video_url: string;
  key_strengths: string;
  priority_actions: string;
  strategic_insights: string;
  ai_feedback: string;
}

export const useFormValidation = () => {
  const { toast } = useToast();

  const validateForm = (data: ReviewFormData): boolean => {
    console.log('Validating form data:', data);
    
    if (!data.reviewer_name?.trim()) {
      toast({
        title: "Validation Error",
        description: "Reviewer name is required",
        variant: "destructive",
      });
      return false;
    }

    if (data.video_option === 'include') {
      if (!data.loom_video_url?.trim()) {
        toast({
          title: "Validation Error",
          description: "Loom video URL is required when including video",
          variant: "destructive",
        });
        return false;
      }
      if (!data.key_strengths?.trim() || !data.priority_actions?.trim() || !data.strategic_insights?.trim()) {
        toast({
          title: "Validation Error",
          description: "Key strengths, priority actions, and strategic insights are required when including video",
          variant: "destructive",
        });
        return false;
      }
    } else if (data.video_option === 'exclude') {
      if (!data.ai_feedback?.trim()) {
        toast({
          title: "Validation Error",
          description: "AI feedback is required when excluding video. Please generate AI feedback first.",
          variant: "destructive",
        });
        return false;
      }
    }

    return true;
  };

  return { validateForm };
};
