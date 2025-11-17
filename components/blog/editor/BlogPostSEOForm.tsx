
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
}

interface BlogPostSEOFormProps {
  formData: BlogPost;
  onInputChange: (field: keyof BlogPost, value: any) => void;
}

export const BlogPostSEOForm: React.FC<BlogPostSEOFormProps> = ({
  formData,
  onInputChange
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="meta_title">Meta Title</Label>
        <Input
          id="meta_title"
          value={formData.meta_title}
          onChange={(e) => onInputChange('meta_title', e.target.value)}
          placeholder="SEO title (defaults to post title)"
        />
      </div>

      <div>
        <Label htmlFor="meta_description">Meta Description</Label>
        <Textarea
          id="meta_description"
          value={formData.meta_description}
          onChange={(e) => onInputChange('meta_description', e.target.value)}
          placeholder="SEO description (defaults to excerpt)"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="canonical_url">Canonical URL</Label>
        <Input
          id="canonical_url"
          value={formData.canonical_url}
          onChange={(e) => onInputChange('canonical_url', e.target.value)}
          placeholder={`${siteUrl}/blog/post-slug`}
        />
      </div>

      <div>
        <Label htmlFor="og_image_url">Social Media Image URL</Label>
        <Input
          id="og_image_url"
          value={formData.og_image_url}
          onChange={(e) => onInputChange('og_image_url', e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <Label htmlFor="og_image_alt">Social Media Image Alt Text</Label>
        <Input
          id="og_image_alt"
          value={formData.og_image_alt}
          onChange={(e) => onInputChange('og_image_alt', e.target.value)}
          placeholder="Describe the social media image"
        />
      </div>
    </div>
  );
};
