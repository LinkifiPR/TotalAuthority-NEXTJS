
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Eye, ExternalLink } from 'lucide-react';

interface BlogPostHeaderProps {
  isEditing: boolean;
  saving: boolean;
  onPreview: () => void;
  onSaveDraft: () => void;
  onPublish: () => void;
  onCancel: () => void;
}

export const BlogPostHeader: React.FC<BlogPostHeaderProps> = ({
  isEditing,
  saving,
  onPreview,
  onSaveDraft,
  onPublish,
  onCancel
}) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">
        {isEditing ? 'Edit Post' : 'New Post'}
      </h1>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          onClick={onPreview}
          className="flex items-center gap-2"
        >
          <ExternalLink className="w-4 h-4" />
          Preview
        </Button>
        <Button
          variant="outline"
          onClick={onSaveDraft}
          disabled={saving}
        >
          <Save className="w-4 h-4 mr-2" />
          Save Draft
        </Button>
        <Button
          onClick={onPublish}
          disabled={saving}
        >
          <Eye className="w-4 h-4 mr-2" />
          Publish
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
