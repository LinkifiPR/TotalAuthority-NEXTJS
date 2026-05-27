"use client";

import React from 'react';
import { ArrowUpRight, Calendar, Play, Rss, Youtube, Eye, Radio } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FormPopup } from '@/components/FormPopup';
import { Button } from '@/components/ui/button';
import { useFormPopup } from '@/hooks/useFormPopup';
import type { YouTubeVideo } from '@/lib/youtube-feed';

const TOTAL_AUTHORITY_YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@Total-Authority';
const TOTAL_AUTHORITY_YOUTUBE_FEED_URL = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCVn4DAbIvM0huIvIBPeRVhQ';

interface PodcastPageClientProps {
  videos: YouTubeVideo[];
  feedError?: boolean;
}

const formatDate = (date: string) => {
  if (!date) return 'Latest episode';

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
};

const formatViews = (views: number) => {
  if (!views) return 'New';

  return new Intl.NumberFormat('en-US', {
    notation: views >= 10000 ? 'compact' : 'standard',
    maximumFractionDigits: 1,
  }).format(views);
};

const trimDescription = (description: string) => {
  const firstParagraph = description.split('\n').find((line) => line.trim().length > 0)?.trim() || '';
  if (firstParagraph.length <= 170) return firstParagraph;
  return `${firstParagraph.slice(0, 167).trim()}...`;
};

export function PodcastPageClient({ videos, feedError = false }: PodcastPageClientProps) {
  const { isOpen, openForm, closeForm } = useFormPopup();
  const featuredVideo = videos.find((video) => video.url.includes('/watch')) || videos[0];
  const episodeVideos = featuredVideo ? videos.filter((video) => video.id !== featuredVideo.id) : [];

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Header onOpenForm={openForm} />

      <main>
        <section className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.045)_1px,transparent_1px)] bg-[size:34px_34px]">
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-[0.95fr_1.05fr] md:py-24">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Live YouTube Feed
              </div>
              <h1 className="max-w-2xl text-4xl font-black leading-tight tracking-normal text-slate-950 md:text-6xl">
                AI Visibility in the Wild
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                New TotalAuthority videos on AI search, LLM visibility, digital PR, and the tactics shaping how brands get recommended.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a href={TOTAL_AUTHORITY_YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
                  <Button className="h-11 gap-2 rounded-lg bg-orange-600 px-5 font-bold text-white hover:bg-orange-700">
                    <Youtube className="h-4 w-4" />
                    YouTube
                  </Button>
                </a>
                <a href={TOTAL_AUTHORITY_YOUTUBE_FEED_URL} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="h-11 gap-2 rounded-lg border-slate-300 bg-white px-5 font-bold text-slate-800 hover:bg-slate-50">
                    <Rss className="h-4 w-4" />
                    RSS Feed
                  </Button>
                </a>
              </div>
            </div>

            <div className="relative">
              {featuredVideo ? (
                <a
                  href={featuredVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-2xl shadow-slate-300/70"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={featuredVideo.thumbnailUrl}
                      alt={featuredVideo.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />
                    <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-900">
                      <Radio className="h-3.5 w-3.5 text-orange-600" />
                      Latest
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-600 text-white shadow-xl transition group-hover:scale-110 group-hover:bg-orange-500">
                        <Play className="ml-1 h-7 w-7 fill-current" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 hidden p-5 sm:block">
                      <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-normal text-orange-200">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(featuredVideo.publishedAt)}
                      </p>
                      <h2 className="text-2xl font-black leading-tight text-white md:text-3xl">
                        {featuredVideo.title}
                      </h2>
                    </div>
                  </div>
                  <div className="bg-slate-950 p-4 sm:hidden">
                    <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-normal text-orange-200">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(featuredVideo.publishedAt)}
                    </p>
                    <h2 className="text-xl font-black leading-tight text-white">
                      {featuredVideo.title}
                    </h2>
                  </div>
                </a>
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
                  <h2 className="text-2xl font-black text-slate-950">Videos are temporarily unavailable</h2>
                  <p className="mt-3 text-slate-600">The YouTube feed did not return episodes. The channel link is still available above.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <div className="mb-3 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-normal text-orange-600">
              <span className="h-px w-10 bg-orange-300" />
              Latest Episodes
              <span className="h-px w-10 bg-orange-300" />
            </div>
            <h2 className="text-3xl font-black text-slate-950 md:text-4xl">Deep in the weeds with AI</h2>
            <p className="mt-3 text-slate-600">
              We are testing what actually moves the needle in AI search, LLM visibility, and digital PR, then sharing the useful bits as soon as we find them.
            </p>
          </div>

          {feedError && (
            <div className="mb-8 rounded-lg border border-orange-200 bg-orange-50 px-4 py-3 text-sm font-medium text-orange-900">
              YouTube feed refresh failed, so this page may show the most recent successful response after deployment cache refresh.
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(episodeVideos.length > 0 ? episodeVideos : videos).map((video) => (
              <a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-slate-200/80"
              >
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-950/0 transition group-hover:bg-slate-950/15" />
                  <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-orange-600 shadow-sm">
                    <Play className="ml-0.5 h-4 w-4 fill-current" />
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between gap-3 text-xs font-semibold text-slate-500">
                    <span>{formatDate(video.publishedAt)}</span>
                    <span className="inline-flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      {formatViews(video.views)}
                    </span>
                  </div>
                  <h3 className="line-clamp-2 text-base font-black leading-snug text-slate-950">
                    {video.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                    {trimDescription(video.description)}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-orange-600">
                    Watch episode
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <a href={TOTAL_AUTHORITY_YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
              <Button className="h-12 gap-2 rounded-lg bg-slate-950 px-6 font-bold text-white hover:bg-slate-800">
                <Youtube className="h-4 w-4" />
                Watch more videos
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </section>
      </main>

      <Footer onOpenForm={openForm} />
      <FormPopup isOpen={isOpen} onClose={closeForm} />
    </div>
  );
}
