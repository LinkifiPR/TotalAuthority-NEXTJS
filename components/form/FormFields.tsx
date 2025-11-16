"use client";


import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { FormData } from '@/types/form';

interface FormFieldsProps {
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (value: string) => void;
}

export const FormFields: React.FC<FormFieldsProps> = ({
  formData,
  onInputChange,
  onSelectChange
}) => {
  return (
    <>
      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={onInputChange}
            required
            className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={onInputChange}
            required
            className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={onInputChange}
          required
          className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
        />
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={onInputChange}
          required
          className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
        />
      </div>

      {/* Website */}
      <div className="space-y-2">
        <Label htmlFor="website">Website URL *</Label>
        <Input
          id="website"
          name="website"
          type="url"
          value={formData.website}
          onChange={onInputChange}
          required
          placeholder="https://yourwebsite.com"
          className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
        />
      </div>

      {/* Monthly Marketing Budget - Dropdown */}
      <div className="space-y-2">
        <Label htmlFor="monthlyMarketingBudget">Current Marketing Budget *</Label>
        <Select 
          value={formData.monthlyMarketingBudget} 
          onValueChange={(value) => {
            console.log('Select value changed:', value);
            onSelectChange(value);
          }}
        >
          <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-500">
            <SelectValue placeholder="Select your monthly marketing budget" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-lg z-[9999] max-h-[200px]">
            <SelectItem value="Less than $1,000 per month">Less than $1,000 per month</SelectItem>
            <SelectItem value="Between $1,000 - $3,000 per month">Between $1,000 - $3,000 per month</SelectItem>
            <SelectItem value="Between $3,000 - $5,000 per month">Between $3,000 - $5,000 per month</SelectItem>
            <SelectItem value="More than $5,000 per month">More than $5,000 per month</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
