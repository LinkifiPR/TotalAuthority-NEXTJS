"use client";


import React from 'react';
import { BlogPostHeader } from './editor/BlogPostHeader';
import { BlogPostTabs } from './editor/components/BlogPostTabs';
import { BlogPostSidebar } from './editor/components/BlogPostSidebar';
import { useBlogPostEditor } from './editor/hooks/useBlogPostEditor';

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

interface BlogPostEditorProps {
  post?: BlogPost;
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
}

export const BlogPostEditor: React.FC<BlogPostEditorProps> = ({ post, onSave, onCancel }) => {
  const {
    formData,
    saving,
    handleInputChange,
    handleTagsChange,
    handleFeaturedImageChange,
    handleFeaturedImageRemove,
    handlePreview,
    handleSave
  } = useBlogPostEditor({ post, onSave });

  const insertBlockIntoContent = (blockContent: string) => {
    const newContent = formData.content + '\n\n' + blockContent;
    handleInputChange('content', newContent);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <BlogPostHeader
        isEditing={!!post}
        saving={saving}
        onPreview={handlePreview}
        onSaveDraft={() => handleSave('draft')}
        onPublish={() => handleSave('published')}
        onCancel={onCancel}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <BlogPostTabs
            formData={formData}
            onInputChange={handleInputChange}
            onTagsChange={handleTagsChange}
          />
        </div>

        <BlogPostSidebar
          featuredImageUrl={formData.featured_image_url}
          featuredImageAlt={formData.featured_image_alt}
          onFeaturedImageChange={handleFeaturedImageChange}
          onFeaturedImageRemove={handleFeaturedImageRemove}
          onInsertBlock={insertBlockIntoContent}
        />
      </div>
    </div>
  );
};
