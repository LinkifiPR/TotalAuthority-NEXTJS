
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BlogPostForm } from '../BlogPostForm';
import { BlogPostSEOForm } from '../BlogPostSEOForm';
import { BlogPostSettings } from '../BlogPostSettings';
import { BlogPostTags } from '../BlogPostTags';
import { WYSIWYGEditor } from '../../WYSIWYGEditor';

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

interface BlogPostTabsProps {
  formData: BlogPost;
  onInputChange: (field: keyof BlogPost, value: any) => void;
  onTagsChange: (tags: string[]) => void;
}

export const BlogPostTabs: React.FC<BlogPostTabsProps> = ({
  formData,
  onInputChange,
  onTagsChange
}) => {
  return (
    <Tabs defaultValue="content" className="space-y-6">
      <TabsList>
        <TabsTrigger value="content">Content</TabsTrigger>
        <TabsTrigger value="seo">SEO & Meta</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="content">
        <Card>
          <CardHeader>
            <CardTitle>Post Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <BlogPostForm
              formData={formData}
              onInputChange={onInputChange}
            />

            <div>
              <WYSIWYGEditor
                content={formData.content}
                onChange={(content) => onInputChange('content', content)}
              />
            </div>

            <BlogPostTags
              tags={formData.tags}
              onTagsChange={onTagsChange}
            />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="seo">
        <Card>
          <CardHeader>
            <CardTitle>SEO & Meta Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <BlogPostSEOForm
              formData={formData}
              onInputChange={onInputChange}
            />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle>Post Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <BlogPostSettings
              formData={formData}
              onInputChange={onInputChange}
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
