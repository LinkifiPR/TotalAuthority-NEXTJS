"use client";

import { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FormPopup } from '@/components/FormPopup';
import { useFormPopup } from '@/hooks/useFormPopup';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Eye, Search, X } from 'lucide-react';

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

interface BlogListClientProps {
  initialPosts: BlogPost[];
  availableTags: string[];
  basePath: string;
}

function BlogListContent({ initialPosts, availableTags, basePath }: BlogListClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('published_at');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isOpen, openForm, closeForm } = useFormPopup();

  // Check for tag filter in URL params on mount
  useEffect(() => {
    const tagParam = searchParams.get('tag');
    if (tagParam) {
      setSelectedTag(tagParam);
    }
  }, [searchParams]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedTag, sortBy]);

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    router.push(`${basePath}?tag=${encodeURIComponent(tag)}`);
  };

  const clearTagFilter = () => {
    setSelectedTag('');
    router.push(basePath);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Filter and sort posts (memoized for performance)
  const filteredPosts = useMemo(() => {
    let filtered = initialPosts;

    // Filter by search term and tag
    filtered = initialPosts.filter(post => {
      const matchesSearch = !searchTerm || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      
      const matchesTag = !selectedTag || (post.tags && post.tags.includes(selectedTag));
      
      return matchesSearch && matchesTag;
    });

    // Sort posts
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'view_count':
          return (b.view_count || 0) - (a.view_count || 0);
        case 'published_at':
        default:
          return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
      }
    });

    return filtered;
  }, [initialPosts, searchTerm, sortBy, selectedTag]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(startIndex, startIndex + postsPerPage);
  }, [filteredPosts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onOpenForm={openForm} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Latest Articles</h1>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search articles..." 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)} 
                className="pl-10"
                data-testid="input-search"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedTag} onValueChange={handleTagClick}>
                <SelectTrigger className="w-full md:w-48" data-testid="select-tag">
                  <SelectValue placeholder="Filter by tag" />
                </SelectTrigger>
                <SelectContent>
                  {availableTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48" data-testid="select-sort">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="published_at">Latest</SelectItem>
                  <SelectItem value="title">Title A-Z</SelectItem>
                  <SelectItem value="view_count">Most Viewed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Active tag filter display */}
          {selectedTag && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Filtered by:</span>
              <Badge 
                variant="secondary" 
                className="bg-orange-100 text-orange-800 flex items-center gap-1"
              >
                {selectedTag}
                <button
                  onClick={clearTagFilter}
                  className="ml-1 hover:text-red-500"
                  data-testid="button-clear-tag"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            </div>
          )}
        </div>

        {/* Blog Posts Grid */}
        <div className="blog-posts-section">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {searchTerm ? 'No articles found matching your search.' : 'No articles available yet.'}
              </p>
            </div>
          ) : (
            <div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {paginatedPosts.map((post) => {
                  const isLatestPost = filteredPosts.length > 0 && post.id === filteredPosts[0].id;
                  
                  return (
                    <Card key={post.id} className="group hover:shadow-lg transition-shadow relative" data-testid={`card-post-${post.id}`}>
                      {isLatestPost && (
                        <div className="absolute -top-2 -right-2 z-10">
                          <Badge className="new-badge bg-orange text-orange-foreground font-bold text-xs px-3 py-1 shadow-lg">
                            NEW
                          </Badge>
                        </div>
                      )}
                      
                      {post.featured_image_url && (
                        <Link href={`/${post.slug}`} className="block overflow-hidden rounded-t-lg">
                          <img 
                            src={post.featured_image_url} 
                            alt={post.featured_image_alt || post.title} 
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                            loading="lazy" 
                          />
                        </Link>
                      )}
                      
                      <CardHeader>
                        <Link href={`/${post.slug}`} className="relative after:content-[''] after:block after:absolute after:inset-0">
                          <CardTitle className="group-hover:text-blue-600 transition-colors line-clamp-2">
                            {post.title}
                          </CardTitle>
                        </Link>
                        <CardDescription className="line-clamp-3">
                          {post.excerpt}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(post.published_at)}</span>
                            </div>
                            
                            {post.reading_time && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{post.reading_time} min</span>
                              </div>
                            )}
                            
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              <span>{post.view_count}</span>
                            </div>
                          </div>
                        </div>
                        
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 relative z-10">
                            {post.tags.slice(0, 3).map((tag, index) => (
                              <button 
                                key={index}
                                type="button"
                                onClick={() => handleTagClick(tag)}
                                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-orange-100"
                                data-testid={`button-tag-${tag}`}
                              >
                                {tag}
                              </button>
                            ))}
                            {post.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{post.tags.length - 3} more
                              </Badge>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex items-center space-x-2 bg-gray-50 rounded-2xl p-2 border border-gray-200 shadow-lg">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`
                        group relative overflow-hidden px-4 py-2 rounded-xl font-medium transition-all duration-300
                        ${currentPage === 1 
                          ? 'text-gray-400 cursor-not-allowed bg-gray-100' 
                          : 'text-gray-700 hover:text-orange hover:bg-orange/10 hover:scale-105 bg-white shadow-sm hover:shadow-md'
                        }
                      `}
                      data-testid="button-prev-page"
                    >
                      <span className="relative z-10 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="hidden sm:inline">Prev</span>
                      </span>
                    </button>

                    <div className="flex space-x-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                        const isCurrentPage = pageNum === currentPage;
                        const isNearCurrentPage = Math.abs(pageNum - currentPage) <= 1;
                        const isFirstOrLast = pageNum === 1 || pageNum === totalPages;
                        const shouldShow = isNearCurrentPage || isFirstOrLast || totalPages <= 5;
                        
                        if (!shouldShow && Math.abs(pageNum - currentPage) === 2) {
                          return (
                            <span key={`ellipsis-${pageNum}`} className="px-3 py-2 text-gray-400 font-mono">
                              ...
                            </span>
                          );
                        }
                        
                        if (!shouldShow) return null;
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`
                              group relative overflow-hidden min-w-[40px] h-10 rounded-xl font-mono font-bold transition-all duration-300 transform
                              ${isCurrentPage
                                ? 'bg-orange text-orange-foreground shadow-lg scale-110 ring-2 ring-orange/30' 
                                : 'bg-white text-gray-700 hover:text-orange hover:bg-orange/10 hover:scale-105 shadow-sm hover:shadow-md'
                              }
                            `}
                            data-testid={`button-page-${pageNum}`}
                          >
                            <span className="relative z-10">{pageNum}</span>
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`
                        group relative overflow-hidden px-4 py-2 rounded-xl font-medium transition-all duration-300
                        ${currentPage === totalPages 
                          ? 'text-gray-400 cursor-not-allowed bg-gray-100' 
                          : 'text-gray-700 hover:text-orange hover:bg-orange/10 hover:scale-105 bg-white shadow-sm hover:shadow-md'
                        }
                      `}
                      data-testid="button-next-page"
                    >
                      <span className="relative z-10 flex items-center gap-1">
                        <span className="hidden sm:inline">Next</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <Footer onOpenForm={openForm} />
      <FormPopup isOpen={isOpen} onClose={closeForm} />
    </div>
  );
}

export function BlogListClient(props: BlogListClientProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    }>
      <BlogListContent {...props} />
    </Suspense>
  );
}
