
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { ReviewFormData } from './formValidation';

interface VideoOptionFieldsProps {
  form: UseFormReturn<ReviewFormData>;
}

export const VideoOptionFields: React.FC<VideoOptionFieldsProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="loom_video_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm">Loom Video (URL or Embed Code) *</FormLabel>
            <FormControl>
              <Input 
                placeholder="Paste Loom share URL or embed code" 
                {...field}
                value={field.value || ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="key_strengths"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm">Key Strengths (one per line) *</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter key strengths, one per line"
                className="min-h-[60px]"
                {...field}
                value={field.value || ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="priority_actions"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm">Priority Actions (one per line) *</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter priority actions, one per line"
                className="min-h-[60px]"
                {...field}
                value={field.value || ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="strategic_insights"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm">Strategic Insights (one per line) *</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter strategic insights, one per line"
                className="min-h-[60px]"
                {...field}
                value={field.value || ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
