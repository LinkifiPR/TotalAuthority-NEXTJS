import { Metadata } from 'next';
import { createServerSupabaseClient } from '@/lib/integrations/supabase/server';
import { BlogListClient } from '@/components/blog/BlogListClient';

export const metadata: Metadata = {
  title: 'Latest Articles | Total Authority',
  description: 'Explore our latest insights on AI visibility, PR strategies, and marketing best practices to help your brand get discovered by AI systems.',
  openGraph: {
    title: 'Latest Articles | Total Authority',
    description: 'Explore our latest insights on AI visibility, PR strategies, and marketing best practices.',
    type: 'website',
  },
};

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  published_at: string;
  featured_image_url?: string;
  featured_image_alt?: string;
  view_count: number;
  reading_time?: number;
  tags: string[];
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, published_at, featured_image_url, featured_image_alt, view_count, reading_time, tags')
    .eq('status', 'published')
    .eq('is_indexed', true)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }

  return (data || []) as BlogPost[];
}

export default async function BlogPage() {
  const posts = await getBlogPosts();
  
  // Extract all unique tags for filtering
  const allTags = new Set<string>();
  posts.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag: string) => allTags.add(tag));
    }
  });
  const availableTags = Array.from(allTags).sort();

  return <BlogListClient initialPosts={posts} availableTags={availableTags} basePath="/blog" />;
}
