import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Diagnostic + fix route — DELETE after use
// GET /api/admin/migrate-cta?action=diagnose  → shows raw CTA HTML from first affected post
// GET /api/admin/migrate-cta?action=fix       → runs the actual fix on all posts
// GET /api/admin/migrate-cta?action=preview   → shows before/after for first post without saving

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action') || 'diagnose';

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: 'Missing Supabase env vars' }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, serviceKey);

  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('id, title, content')
    .not('content', 'is', null);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const affected = (posts ?? []).filter(p =>
    p.content?.includes('cta-block') ||
    p.content?.includes('24-hour delivery') ||
    p.content?.includes('No sales call') ||
    p.content?.includes('Start Free Audit') ||
    p.content?.includes('Start Audit Now')
  );

  // DIAGNOSE: return raw CTA HTML snippet from first affected post
  if (action === 'diagnose') {
    const post = affected[0];
    if (!post) return NextResponse.json({ message: 'No affected posts found' });

    // Extract just the CTA block portion
    const start = post.content.indexOf('cta-block');
    const snippet = start >= 0
      ? post.content.substring(Math.max(0, start - 50), start + 2000)
      : post.content.substring(0, 2000);

    return NextResponse.json({
      total_affected: affected.length,
      post_title: post.title,
      cta_snippet: snippet,
    });
  }

  // PREVIEW or FIX
  const results = [];

  for (const post of affected) {
    const fixed = fixCTA(post.content);
    const changed = fixed !== post.content;

    if (action === 'preview') {
      const origStart = post.content.indexOf('cta-block');
      const fixStart = fixed.indexOf('cta-block');
      results.push({
        title: post.title,
        changed,
        original_snippet: origStart >= 0 ? post.content.substring(Math.max(0, origStart - 20), origStart + 1500) : '(no cta-block found)',
        fixed_snippet: fixStart >= 0 ? fixed.substring(Math.max(0, fixStart - 20), fixStart + 1500) : '(no cta-block found)',
      });
      continue;
    }

    if (action === 'fix' && changed) {
      const { error: updateError } = await supabase
        .from('blog_posts')
        .update({ content: fixed })
        .eq('id', post.id);

      results.push({
        title: post.title,
        status: updateError ? `ERROR: ${updateError.message}` : 'updated',
      });
    } else if (action === 'fix') {
      results.push({ title: post.title, status: 'no change needed' });
    }
  }

  return NextResponse.json({
    message: action === 'fix'
      ? `Fix complete. ${results.filter(r => r.status === 'updated').length} post(s) updated.`
      : `Preview for ${results.length} post(s).`,
    results,
  });
}

function fixCTA(content: string): string {
  if (!content) return content;

  // We'll do a targeted replacement of the entire CTA inner content
  // Strategy: find the cta-block div and replace its inner content wholesale
  // This is more reliable than trying to patch individual pieces with regex

  // Replace the entire CTA block with a clean version
  // Match from the opening cta-block div to its closing </div>
  const fixed = content.replace(
    /(<div[^>]*class="[^"]*cta-block[^"]*"[^>]*data-block-type="floating-particles"[^>]*>)([\s\S]*?)(<\/div>\s*$)/m,
    (fullMatch, openTag, inner, closeTag) => {
      // Extract block ID from opening tag
      const blockIdMatch = openTag.match(/data-block-id="([^"]+)"/);
      const blockId = blockIdMatch ? blockIdMatch[1] : 'cta-block';

      return `${openTag}
        <!-- Remove button -->
        <button class="cta-remove-btn absolute top-3 right-3 z-20 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 text-sm font-bold leading-none" data-block-id="${blockId}" title="Remove this block" type="button">
          ×
        </button>

        <!-- Floating particles -->
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute top-1/4 left-1/4 w-1 h-1 bg-orange-400 rounded-full animate-bounce opacity-60"></div>
          <div class="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-bounce opacity-60"></div>
          <div class="absolute bottom-1/3 left-1/3 w-1 h-1 bg-purple-400 rounded-full animate-bounce opacity-60"></div>
          <div class="absolute bottom-1/4 right-1/4 w-1 h-1 bg-orange-300 rounded-full animate-bounce opacity-60"></div>
        </div>

        <div class="relative z-10 text-center">
          <div class="mb-4">
            <h3 class="text-white font-black text-sm sm:text-xl mb-2 drop-shadow-lg leading-tight" style="color: white !important;">Get Your LLM Visibility Audit</h3>
            <p class="text-white/90 text-xs sm:text-sm font-semibold drop-shadow leading-tight" style="color: rgba(255, 255, 255, 0.9) !important;">Discover how visible your brand is across AI platforms</p>
          </div>
          <a href="https://totalauthority.com/llm-visibility-audit" class="relative inline-block bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 text-lg font-bold rounded-xl shadow-xl transition-all duration-300 transform hover:scale-105 border border-orange-400/50 cursor-pointer border-none mb-4" style="text-decoration: none; color: white !important;">Start Audit Now →</a>
          <div class="mt-3 text-orange-300 text-xs font-semibold" style="color: rgb(253, 186, 116) !important;">+ Over $300 worth of free bonuses</div>
        </div>
      ${closeTag}`;
    }
  );

  // If the block-level replacement didn't fire (different HTML structure),
  // fall back to targeted string fixes
  if (fixed === content) {
    let out = content;
    out = out.replace(/Get Your Free LLM Visibility Audit/g, 'Get Your LLM Visibility Audit');
    out = out.replace(/Start Free Audit\s*→/g, 'Start Audit Now →');
    out = out.replace(/Start Audit Now\s*→/g, 'Start Audit Now →'); // normalise
    // Remove 24-hour + no sales call line (simple contains check)
    out = out.replace(/24-hour delivery/g, '');
    out = out.replace(/No sales call/g, '');
    return out;
  }

  return fixed;
}
