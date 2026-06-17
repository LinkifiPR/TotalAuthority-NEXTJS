import React from 'react';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';
import { LIVE_INDUSTRIES } from '@/lib/industries';

interface BlogPostIndustriesProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

/**
 * Industry picker — toggles an industry SLUG inside the post's `tags[]` (the
 * same field the rest of the site reads). Selecting an industry here is
 * identical to typing its exact slug as a tag, but typo-proof. Leave empty for
 * general posts — only tag the industries a post is genuinely about.
 */
export const BlogPostIndustries: React.FC<BlogPostIndustriesProps> = ({
  tags,
  onTagsChange,
}) => {
  const toggle = (slug: string) => {
    if (tags.includes(slug)) {
      onTagsChange(tags.filter((t) => t !== slug));
    } else {
      onTagsChange([...tags, slug]);
    }
  };

  return (
    <div className="mt-6">
      <Label>Industries</Label>
      <p className="text-xs text-gray-500 mb-2">
        Select the industries this post is specifically about — it will be linked to those
        industry pages. Leave empty for general posts.
      </p>
      <div className="flex flex-wrap gap-2">
        {LIVE_INDUSTRIES.map((ind) => {
          const selected = tags.includes(ind.slug);
          return (
            <button
              key={ind.slug}
              type="button"
              onClick={() => toggle(ind.slug)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                selected
                  ? 'border-orange-300 bg-orange-100 text-orange-800'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-orange-200 hover:text-orange-700'
              }`}
            >
              {selected && <Check className="w-3 h-3" />}
              {ind.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
