
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { siteUrl } from '@/lib/siteConfig';

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
  author_name?: string;
}

interface BlogPostFormProps {
  formData: BlogPost;
  onInputChange: (field: keyof BlogPost, value: any) => void;
}

export const BlogPostForm: React.FC<BlogPostFormProps> = ({
  formData,
  onInputChange
}) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => onInputChange('title', e.target.value)}
          placeholder="Enter post title"
          className="text-lg font-semibold"
        />
      </div>

      <div>
        <Label htmlFor="slug">URL Slug</Label>
        <Input
          id="slug"
          value={formData.slug}
          onChange={(e) => onInputChange('slug', e.target.value)}
          placeholder="url-slug"
        />
        <p className="text-sm text-gray-500 mt-1">
          {siteUrl}/{formData.slug}
        </p>
      </div>

      <div>
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => onInputChange('excerpt', e.target.value)}
          placeholder="Brief description of the post for listings and SEO"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="author_name">Author Name</Label>
        <Input
          id="author_name"
          value={formData.author_name || ''}
          onChange={(e) => onInputChange('author_name', e.target.value)}
          placeholder="Author name (e.g., TotalAuthority Team)"
        />
      </div>
    </div>
  );
};
