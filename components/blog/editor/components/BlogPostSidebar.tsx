
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FeaturedImageUpload } from '../../FeaturedImageUpload';
import { ReusableBlocksManager } from '../../ReusableBlocksManager';

interface BlogPostSidebarProps {
  featuredImageUrl: string;
  featuredImageAlt: string;
  onFeaturedImageChange: (url: string, alt: string) => void;
  onFeaturedImageRemove: () => void;
  onInsertBlock: (blockContent: string) => void;
}

export const BlogPostSidebar: React.FC<BlogPostSidebarProps> = ({
  featuredImageUrl,
  featuredImageAlt,
  onFeaturedImageChange,
  onFeaturedImageRemove,
  onInsertBlock
}) => {
  return (
    <div className="lg:col-span-1 space-y-6">
      <FeaturedImageUpload
        imageUrl={featuredImageUrl}
        imageAlt={featuredImageAlt}
        onImageChange={onFeaturedImageChange}
        onImageRemove={onFeaturedImageRemove}
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Content Blocks</CardTitle>
        </CardHeader>
        <CardContent>
          <ReusableBlocksManager 
            onInsertBlock={onInsertBlock} 
            onOpenForm={() => alert('Form popup would open on the live site')} 
          />
        </CardContent>
      </Card>
    </div>
  );
};
