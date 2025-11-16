
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { UseFormReturn } from 'react-hook-form';
import { ReviewFormData } from './formValidation';

interface VideoOptionSelectorProps {
  form: UseFormReturn<ReviewFormData>;
}

export const VideoOptionSelector: React.FC<VideoOptionSelectorProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="video_option"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm">Video Option</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="include" id="include" />
                <Label htmlFor="include">Include video (Loom)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="exclude" id="exclude" />
                <Label htmlFor="exclude">Do not include video (AI-generated feedback)</Label>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
