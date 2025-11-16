
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface BlogPostTagsProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

export const BlogPostTags: React.FC<BlogPostTagsProps> = ({
  tags,
  onTagsChange
}) => {
  const [newTag, setNewTag] = useState('');
  const [existingTags, setExistingTags] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    fetchExistingTags();
  }, []);

  const fetchExistingTags = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('tags')
        .not('tags', 'is', null);

      if (error) {
        console.error('Error fetching tags:', error);
        return;
      }

      // Extract all unique tags from all posts
      const allTags = new Set<string>();
      data?.forEach(post => {
        if (post.tags && Array.isArray(post.tags)) {
          post.tags.forEach((tag: string) => allTags.add(tag));
        }
      });

      setExistingTags(Array.from(allTags).sort());
    } catch (error) {
      console.error('Error fetching existing tags:', error);
    }
  };

  const addTag = (tagToAdd?: string) => {
    const tag = tagToAdd || newTag.trim();
    if (tag && !tags.includes(tag)) {
      onTagsChange([...tags, tag]);
      setNewTag('');
      setShowSuggestions(false);
      // Refresh existing tags to include new one
      fetchExistingTags();
    }
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const filteredSuggestions = existingTags.filter(tag => 
    !tags.includes(tag) && 
    tag.toLowerCase().includes(newTag.toLowerCase())
  ).slice(0, 8);

  return (
    <div>
      <Label>Tags</Label>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <Badge key={index} variant="secondary" className="flex items-center gap-1">
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="ml-1 hover:text-red-500"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
      </div>
      <div className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a tag or select from existing"
              onKeyPress={(e) => e.key === 'Enter' && addTag()}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
            
            {/* Tag suggestions dropdown */}
            {showSuggestions && (filteredSuggestions.length > 0 || existingTags.length > 0) && (
              <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                <div className="p-2">
                  <div className="text-xs text-gray-500 mb-1">Existing tags:</div>
                  <div className="flex flex-wrap gap-1">
                    {(newTag ? filteredSuggestions : existingTags.filter(tag => !tags.includes(tag)).slice(0, 10)).map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => addTag(tag)}
                        className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <Button type="button" onClick={() => addTag()} size="sm">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
