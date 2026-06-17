import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { RelatedPostCandidate } from '@/lib/blog/related';
import type { Industry } from '@/lib/industries';

interface RelatedPostsProps {
  posts: RelatedPostCandidate[];
  industries: Industry[];
}

/**
 * Rendered at the foot of every blog post: a "Related articles" grid
 * (blog↔blog) and, when the post is tagged with an industry slug, a
 * "Relevant industry guides" block (blog→industry hub). Pure presentational —
 * data is computed server-side in app/[slug]/page.tsx.
 */
export function RelatedPosts({ posts, industries }: RelatedPostsProps) {
  if (posts.length === 0 && industries.length === 0) return null;

  return (
    <section className="border-t border-slate-200 mt-12 pt-10">
      {posts.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-slate-900 mb-5">Related articles</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/${p.slug}`}
                className="group flex flex-col rounded-xl border border-slate-200 bg-white overflow-hidden hover:shadow-md hover:border-orange-200 transition-all"
              >
                {p.featured_image_url && (
                  <div className="h-40 overflow-hidden">
                    <img
                      src={p.featured_image_url}
                      alt={p.featured_image_alt || p.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-base font-semibold text-slate-900 leading-snug mb-2 line-clamp-2 group-hover:text-orange-700 transition-colors">
                    {p.title}
                  </h3>
                  {p.excerpt && (
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{p.excerpt}</p>
                  )}
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-orange-600">
                    Read more <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {industries.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-7">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500 mb-3">
            {industries.length > 1 ? 'Relevant industry guides' : 'Relevant industry guide'}
          </p>
          <ul className="flex flex-col gap-2.5">
            {industries.map((ind) => (
              <li key={ind.slug}>
                <Link
                  href={`/${ind.slug}`}
                  className="group inline-flex flex-wrap items-baseline gap-x-2 text-slate-700 hover:text-orange-700 transition-colors"
                >
                  <span className="font-medium">AI visibility for {ind.name}</span>
                  <span className="text-sm text-slate-500 group-hover:text-orange-600">
                    — {ind.shortDescription}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
