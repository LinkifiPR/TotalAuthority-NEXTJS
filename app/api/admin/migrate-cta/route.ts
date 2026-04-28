import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// GET /api/admin/migrate-cta?action=fix     → apply fix
// GET /api/admin/migrate-cta?action=preview → show before/after without saving
// DELETE THIS FILE after confirmed working

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action') || 'preview';

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

  const results = [];

  for (const post of posts ?? []) {
    if (!post.content?.includes('floating-particles')) continue;

    const fixed = fixAllCTAs(post.content);
    const changed = fixed !== post.content;

    if (!changed) {
      results.push({ title: post.title, status: 'no change needed' });
      continue;
    }

    if (action === 'preview') {
      // Find the ACTUAL end of the cta-block div in the fixed content using depth tracking
      const ctaMarker = fixed.indexOf('data-block-type="floating-particles"');
      let divStart = ctaMarker;
      while (divStart > 0 && fixed[divStart] !== '<') divStart--;
      const ctaBlockEnd = findDivEnd(fixed, divStart);

      results.push({
        title: post.title,
        status: 'would update',
        // Show 600 chars AFTER the actual end of the cta-block
        after_cta_end: ctaBlockEnd !== -1
          ? fixed.substring(ctaBlockEnd, ctaBlockEnd + 600)
          : '(could not find end)',
        // Check if old markers exist specifically AFTER the cta-block ends
        old_markers_after_cta: ctaBlockEnd !== -1
          ? ['24-hour delivery', 'No sales call', 'OPEN_FORM', 'relative z-10 text-center'].filter(
              m => fixed.substring(ctaBlockEnd).includes(m)
            )
          : [],
      });
      continue;
    }

    const { error: updateError } = await supabase
      .from('blog_posts')
      .update({ content: fixed })
      .eq('id', post.id);

    results.push({
      title: post.title,
      status: updateError ? `ERROR: ${updateError.message}` : 'updated',
    });
  }

  return NextResponse.json({
    message: `${action === 'fix' ? 'Fix' : 'Preview'} complete. ${results.filter(r => r.status === 'updated' || r.status === 'would update').length} post(s) affected.`,
    results,
  });
}

/**
 * Main entry point. Processes all CTA blocks in the content.
 * For each floating-particles block found:
 *   1. Uses div-depth to find the exact span of the cta-block div
 *   2. ALSO scans forward past any orphaned old-CTA HTML that follows
 *   3. Replaces the entire range (cta-block + orphan) with one clean block
 */
function fixAllCTAs(content: string): string {
  let result = content;
  let searchFrom = 0;
  let iterations = 0;

  while (iterations++ < 20) {
    const markerIdx = result.indexOf('data-block-type="floating-particles"', searchFrom);
    if (markerIdx === -1) break;

    // Walk back to the opening <div of this cta-block
    let divStart = markerIdx;
    while (divStart > 0 && result[divStart] !== '<') divStart--;

    // Extract block ID
    const blockIdMatch = result.substring(divStart, markerIdx + 200).match(/data-block-id="([^"]+)"/);
    const blockId = blockIdMatch ? blockIdMatch[1] : `cta-block-${Date.now()}-${iterations}`;

    // Step 1: Find the end of the cta-block div via depth tracking
    const ctaEnd = findDivEnd(result, divStart);
    if (ctaEnd === -1) break;

    // Step 2: Scan forward from ctaEnd and consume any orphaned old-CTA divs
    // Orphaned content is identified by containing known old-CTA strings
    const OLD_CTA_MARKERS = ['24-hour delivery', 'No sales call', 'Start Free Audit', 'OPEN_FORM', 'relative z-10 text-center', 'llm-visibility-audit', 'Start Audit Now'];
    let totalEnd = ctaEnd;

    // Keep consuming orphaned blocks as long as we find them
    let consumed = true;
    while (consumed) {
      consumed = false;

      // Skip whitespace / HTML comments after current end
      let scanPos = totalEnd;
      while (scanPos < result.length && /[\s\n\r]/.test(result[scanPos])) scanPos++;

      // If there's another <div immediately after, check if it's orphaned old-CTA content
      if (result.substring(scanPos, scanPos + 4) === '<div') {
        const nextDivEnd = findDivEnd(result, scanPos);
        if (nextDivEnd !== -1) {
          const candidate = result.substring(scanPos, nextDivEnd);
          const isOldCTA = OLD_CTA_MARKERS.some(m => candidate.includes(m));
          if (isOldCTA) {
            totalEnd = nextDivEnd;
            consumed = true;
            continue;
          }
        }
      }

      // Also consume orphaned </div> closing tags that immediately follow
      // (these are leftover outer-wrapper closes from botched previous migrations)
      const afterEnd = result.substring(totalEnd);
      const leadingClose = afterEnd.match(/^(\s*<\/div>)+/);
      if (leadingClose) {
        // Count how many orphaned closes there are
        const closingStr = leadingClose[0];
        const closeCount = (closingStr.match(/<\/div>/g) || []).length;
        // Only consume if the same range contains old-CTA markers
        // (to avoid eating legitimate blog structure closes)
        if (OLD_CTA_MARKERS.some(m => result.substring(ctaEnd, totalEnd + closingStr.length).includes(m))) {
          totalEnd += closingStr.length;
          consumed = true;
        }
      }
    }

    // Replace the entire range [divStart, totalEnd) with one clean CTA block
    result = result.substring(0, divStart) + cleanCTABlock(blockId) + result.substring(totalEnd);

    // Continue searching after the new block we just inserted
    searchFrom = divStart + cleanCTABlock(blockId).length;
  }

  return result;
}

/**
 * Walk forward from `start` (which must be a `<div` tag) counting div opens/closes
 * to find the position immediately after the matching `</div>`.
 * Returns -1 if not found.
 */
function findDivEnd(content: string, start: number): number {
  let depth = 0;
  let i = start;

  while (i < content.length) {
    if (content[i] === '<') {
      // Opening div
      if (
        content.substring(i, i + 4) === '<div' &&
        (content[i + 4] === ' ' || content[i + 4] === '>' || content[i + 4] === '\n')
      ) {
        depth++;
        i += 4;
        continue;
      }
      // Closing div
      if (content.substring(i, i + 6) === '</div>') {
        depth--;
        if (depth === 0) return i + 6;
        i += 6;
        continue;
      }
    }
    i++;
  }

  return -1;
}

function cleanCTABlock(blockId: string): string {
  return `<div class="relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-2xl p-8 border border-orange-400/30 shadow-xl overflow-hidden my-6 max-w-2xl mx-auto cta-block" data-block-type="floating-particles" data-block-id="${blockId}"><button class="cta-remove-btn absolute top-3 right-3 z-20 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 text-sm font-bold leading-none" data-block-id="${blockId}" title="Remove this block" type="button">×</button><div class="absolute inset-0 overflow-hidden"><div class="absolute top-1/4 left-1/4 w-1 h-1 bg-orange-400 rounded-full animate-bounce opacity-60"></div><div class="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-bounce opacity-60"></div><div class="absolute bottom-1/3 left-1/3 w-1 h-1 bg-purple-400 rounded-full animate-bounce opacity-60"></div><div class="absolute bottom-1/4 right-1/4 w-1 h-1 bg-orange-300 rounded-full animate-bounce opacity-60"></div></div><div class="relative z-10 text-center"><div class="mb-4"><h3 class="text-white font-black text-sm sm:text-xl mb-2 drop-shadow-lg leading-tight" style="color: white !important;">Get Your LLM Visibility Audit</h3><p class="text-white/90 text-xs sm:text-sm font-semibold drop-shadow leading-tight" style="color: rgba(255, 255, 255, 0.9) !important;">Discover how visible your brand is across AI platforms</p></div><a href="https://totalauthority.com/llm-visibility-audit" class="relative inline-block bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 text-lg font-bold rounded-xl shadow-xl transition-all duration-300 transform hover:scale-105 border border-orange-400/50 mb-4" style="text-decoration: none; color: white !important;">Start Audit Now →</a><div class="mt-3 text-orange-300 text-xs font-semibold" style="color: rgb(253, 186, 116) !important;">+ Over $300 worth of free bonuses</div></div></div>`;
}
