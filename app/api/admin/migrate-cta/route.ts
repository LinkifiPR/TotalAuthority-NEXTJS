import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// GET /api/admin/migrate-cta?action=fix    → apply fix
// GET /api/admin/migrate-cta?action=preview → preview without saving
// DELETE THIS FILE after use

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

    const fixed = replaceAllCTABlocks(post.content);
    const changed = fixed !== post.content;

    if (!changed) {
      results.push({ title: post.title, status: 'no change needed' });
      continue;
    }

    if (action === 'preview') {
      results.push({ title: post.title, status: 'would update', preview: fixed.substring(fixed.indexOf('cta-block') - 20, fixed.indexOf('cta-block') + 800) });
      continue;
    }

    const { error: updateError } = await supabase
      .from('blog_posts')
      .update({ content: fixed })
      .eq('id', post.id);

    results.push({ title: post.title, status: updateError ? `ERROR: ${updateError.message}` : 'updated' });
  }

  return NextResponse.json({
    message: `${action === 'fix' ? 'Fix' : 'Preview'} complete. ${results.filter(r => r.status === 'updated' || r.status === 'would update').length} post(s) affected.`,
    results,
  });
}

/**
 * Finds every CTA block in the content using proper div-depth tracking,
 * replaces the FIRST one with clean HTML, and removes any duplicates.
 */
function replaceAllCTABlocks(content: string): string {
  const blocks = findAllCTABlocks(content);
  if (blocks.length === 0) return content;

  // Extract block ID from the first block
  const firstBlock = content.substring(blocks[0].start, blocks[0].end);
  const blockIdMatch = firstBlock.match(/data-block-id="([^"]+)"/);
  const blockId = blockIdMatch ? blockIdMatch[1] : `cta-block-${Date.now()}`;

  // Build result: replace first block with clean HTML, remove all others
  let result = '';
  let cursor = 0;

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    result += content.substring(cursor, block.start);
    if (i === 0) {
      result += cleanCTABlock(blockId);
    }
    // else: skip (removes duplicate blocks)
    cursor = block.end;
  }

  result += content.substring(cursor);
  return result;
}

/**
 * Finds all CTA blocks by locating `data-block-type="floating-particles"`,
 * then uses div-depth tracking to find the exact opening and closing tags.
 */
function findAllCTABlocks(content: string): Array<{ start: number; end: number }> {
  const blocks: Array<{ start: number; end: number }> = [];
  let searchFrom = 0;

  while (true) {
    const markerIdx = content.indexOf('data-block-type="floating-particles"', searchFrom);
    if (markerIdx === -1) break;

    // Walk backwards to find the opening <div
    let divStart = markerIdx;
    while (divStart > 0 && content[divStart] !== '<') divStart--;

    // Walk forward with div-depth tracking to find the matching </div>
    let depth = 0;
    let i = divStart;
    let divEnd = -1;

    while (i < content.length) {
      if (content[i] === '<') {
        // Self-closing or void elements — skip
        if (content.startsWith('<br', i) || content.startsWith('<hr', i) || content.startsWith('<img', i) || content.startsWith('<input', i)) {
          i++;
          continue;
        }
        if (content.startsWith('</div>', i)) {
          depth--;
          if (depth === 0) {
            divEnd = i + 6;
            break;
          }
          i += 6;
          continue;
        }
        if (content.startsWith('<div', i) && (content[i + 4] === ' ' || content[i + 4] === '>')) {
          depth++;
          i += 4;
          continue;
        }
      }
      i++;
    }

    if (divEnd === -1) break;

    blocks.push({ start: divStart, end: divEnd });
    searchFrom = divEnd;
  }

  return blocks;
}

function cleanCTABlock(blockId: string): string {
  return `<div class="relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-2xl p-8 border border-orange-400/30 shadow-xl overflow-hidden my-6 max-w-2xl mx-auto cta-block" data-block-type="floating-particles" data-block-id="${blockId}">
        <button class="cta-remove-btn absolute top-3 right-3 z-20 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 text-sm font-bold leading-none" data-block-id="${blockId}" title="Remove this block" type="button">×</button>
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
          <a href="https://totalauthority.com/llm-visibility-audit" class="relative inline-block bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 text-lg font-bold rounded-xl shadow-xl transition-all duration-300 transform hover:scale-105 border border-orange-400/50 mb-4" style="text-decoration: none; color: white !important;">Start Audit Now →</a>
          <div class="mt-3 text-orange-300 text-xs font-semibold" style="color: rgb(253, 186, 116) !important;">+ Over $300 worth of free bonuses</div>
        </div>
      </div>`;
}
