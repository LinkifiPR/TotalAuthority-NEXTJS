
import React from 'react';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { ReviewFormData } from './formValidation';

interface ReviewerNameFieldProps {
  form: UseFormReturn<ReviewFormData>;
}

export const ReviewerNameField: React.FC<ReviewerNameFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="reviewer_name"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm">Reviewer Name *</FormLabel>
          <FormControl>
            <Input 
              placeholder="Enter reviewer name" 
              {...field}
              value={field.value || ''}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
