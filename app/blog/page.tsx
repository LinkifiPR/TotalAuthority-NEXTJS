"use client";

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FormPopup } from '@/components/FormPopup';
import { useFormPopup } from '@/hooks/useFormPopup';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, Eye, Search, X } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
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
const BlogList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('published_at');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;
  const [paginatedPosts, setPaginatedPosts] = useState<BlogPost[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    toast
  } = useToast();
  const {
    isOpen,
    openForm,
    closeForm
  } = useFormPopup();

  const handleBlogPostClick = (slug: string) => {
    navigate(`/${slug}`);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 150);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    setSearchParams({ tag });
  };

  const clearTagFilter = () => {
    setSelectedTag('');
    setSearchParams({});
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  
  useEffect(() => {
    // Check for tag filter in URL params
    const tagParam = searchParams.get('tag');
    if (tagParam) {
      setSelectedTag(tagParam);
    }
  }, [searchParams]);
  
  useEffect(() => {
    filterAndSortPosts();
  }, [posts, searchTerm, sortBy, selectedTag]);

  // Update pagination when filtered posts change
  useEffect(() => {
    updatePagination();
  }, [filteredPosts, currentPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedTag, sortBy]);
  const fetchPosts = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('blog_posts').select('*').eq('status', 'published').eq('is_indexed', true).order('published_at', {
        ascending: false
      });
      if (error) throw error;
      setPosts(data || []);
      
      // Extract all unique tags
      const allTags = new Set<string>();
      data?.forEach(post => {
        if (post.tags && Array.isArray(post.tags)) {
          post.tags.forEach((tag: string) => allTags.add(tag));
        }
      });
      setAvailableTags(Array.from(allTags).sort());
    } catch (error: any) {
      console.error('Error fetching blog posts:', error);
      toast({
        title: "Error",
        description: "Failed to load blog posts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const filterAndSortPosts = () => {
    let filtered = posts;

    // Filter by search term and tag
    filtered = posts.filter(post => {
      const matchesSearch = !searchTerm || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) || 
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
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
    setFilteredPosts(filtered);
  };

  const updatePagination = () => {
    const totalPosts = filteredPosts.length;
    const pages = Math.ceil(totalPosts / postsPerPage);
    setTotalPages(pages);
    
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    setPaginatedPosts(filteredPosts.slice(startIndex, endIndex));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of the page with a small delay to ensure state update
    setTimeout(() => {
      window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      });
    }, 50);
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  return <div className="min-h-screen bg-white">
      <Helmet>
        <title>Insights & Articles - Total Authority</title>
        <meta name="description" content="Expert insights on local SEO, digital marketing, and business growth strategies from Total Authority." />
        <link rel="canonical" href="https://totalauthority.com/insights" />
      </Helmet>
      
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
              <Input placeholder="Search articles..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Select value={selectedTag} onValueChange={handleTagClick}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by tag" />
                </SelectTrigger>
                <SelectContent>
                  {availableTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48">
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
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            </div>
          )}
        </div>

        {/* Blog Posts Grid */}
        <div className="blog-posts-section">{loading ? <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(9)].map((_, i) => <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </CardContent>
                </Card>)}
          </div> : filteredPosts.length === 0 ? <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {searchTerm ? 'No articles found matching your search.' : 'No articles available yet.'}
              </p>
            </div> : <div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {paginatedPosts.map((post, index) => {
                  // Check if this is the actual latest post (first in the original filtered list)
                  const isLatestPost = filteredPosts.length > 0 && post.id === filteredPosts[0].id;
                  
                  return (
                    <Card key={post.id} className="group hover:shadow-lg transition-shadow relative">
                      {/* New badge for the latest post only */}
                      {isLatestPost && (
                        <div className="absolute -top-2 -right-2 z-10">
                          <Badge 
                            className="new-badge bg-orange text-orange-foreground font-bold text-xs px-3 py-1 shadow-lg"
                          >
                            NEW
                          </Badge>
                        </div>
                      )}
                      <div 
                        onClick={() => handleBlogPostClick(post.slug)}
                        className="cursor-pointer"
                      >
                        {post.featured_image_url && <div className="overflow-hidden rounded-t-lg">
                            <img src={post.featured_image_url} alt={post.featured_image_alt || post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                          </div>}
                        
                        <CardHeader>
                          <CardTitle className="group-hover:text-blue-600 transition-colors line-clamp-2">
                            {post.title}
                          </CardTitle>
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
                              
                              {post.reading_time && <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{post.reading_time} min</span>
                                </div>}
                              
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                <span>{post.view_count}</span>
                              </div>
                            </div>
                          </div>
                          
                          {post.tags && post.tags.length > 0 && <div className="flex flex-wrap gap-2">
                              {post.tags.slice(0, 3).map((tag, index) => <Badge 
                                  key={index} 
                                  variant="secondary" 
                                  className="text-xs cursor-pointer hover:bg-orange-100"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleTagClick(tag);
                                  }}
                                >
                                  {tag}
                                </Badge>)}
                              {post.tags.length > 3 && <Badge variant="outline" className="text-xs">
                                  +{post.tags.length - 3} more
                                </Badge>}
                            </div>}
                        </CardContent>
                      </div>
                    </Card>
                  );
                })}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex items-center space-x-2 bg-gray-50 rounded-2xl p-2 border border-gray-200 shadow-lg">
                    {/* Previous Button */}
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
                    >
                      <span className="relative z-10 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="hidden sm:inline">Prev</span>
                      </span>
                      {currentPage !== 1 && (
                        <div className="absolute inset-0 bg-gradient-to-r from-orange/20 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                      )}
                    </button>

                    {/* Page Numbers */}
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
                          >
                            <span className="relative z-10">{pageNum}</span>
                            {!isCurrentPage && (
                              <div className="absolute inset-0 bg-gradient-to-r from-orange/20 to-orange/10 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl" />
                            )}
                            {isCurrentPage && (
                              <div className="absolute inset-0 bg-gradient-to-r from-orange to-orange/80 animate-pulse rounded-xl" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Next Button */}
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
                    >
                      <span className="relative z-10 flex items-center gap-1">
                        <span className="hidden sm:inline">Next</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                      {currentPage !== totalPages && (
                        <div className="absolute inset-0 bg-gradient-to-l from-orange/20 to-transparent transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>}
        </div>
      </div>
      
      <Footer onOpenForm={openForm} />
      <FormPopup isOpen={isOpen} onClose={closeForm} />
    </div>;
};
export default BlogList;