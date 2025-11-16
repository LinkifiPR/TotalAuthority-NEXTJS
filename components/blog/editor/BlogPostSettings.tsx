
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  status: 'draft' | 'published';
  published_at?: string;
  meta_title: string;
  meta_description: string;
  og_image_url: string;
  og_image_alt: string;
  featured_image_url: string;
  featured_image_alt: string;
  canonical_url: string;
  is_indexed: boolean;
  tags: string[];
  reading_time?: number;
  author_id?: string;
}

interface BlogPostSettingsProps {
  formData: BlogPost;
  onInputChange: (field: keyof BlogPost, value: any) => void;
}

export const BlogPostSettings: React.FC<BlogPostSettingsProps> = ({
  formData,
  onInputChange
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label>Search Engine Indexing</Label>
          <p className="text-sm text-gray-500">Allow search engines to index this page</p>
        </div>
        <Switch
          checked={formData.is_indexed}
          onCheckedChange={(checked) => onInputChange('is_indexed', checked)}
        />
      </div>

      {formData.reading_time && (
        <div>
          <Label>Reading Time</Label>
          <p className="text-sm text-gray-500">{formData.reading_time} minutes (auto-calculated)</p>
        </div>
      )}

      <div>
        <Label>Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value) => onInputChange('status', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
