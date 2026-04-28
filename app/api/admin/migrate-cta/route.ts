import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Temporary one-time migration route - DELETE THIS FILE after running
// Visits: GET /api/admin/migrate-cta

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: 'Missing Supabase env vars' }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, serviceKey);

  // Fetch all posts with CTA blocks
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('id, title, content')
    .not('content', 'is', null);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const results: { id: string; title: string; status: string }[] = [];

  for (const post of posts ?? []) {
    if (!post.content) continue;

    const hasCTA =
      post.content.includes('cta-block') ||
      post.content.includes('Start Free Audit') ||
      post.content.includes('Get Your Free LLM') ||
      post.content.includes('24-hour delivery');

    if (!hasCTA) continue;

    let updated: string = post.content;

    // 1. Remove "Free" from headline
    updated = updated.replace(/Get Your Free LLM Visibility Audit/g, 'Get Your LLM Visibility Audit');

    // 2. Replace old postMessage button (any variant) with proper anchor link
    updated = updated.replace(
      /<button[^>]*onclick="window\.parent\.postMessage[^"]*"[^>]*>[\s\S]*?<\/button>/g,
      `<a href="https://totalauthority.com/llm-visibility-audit" class="relative inline-block bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 text-lg font-bold rounded-xl shadow-xl transition-all duration-300 transform hover:scale-105 border border-orange-400/50 cursor-pointer border-none mb-4" style="text-decoration: none;">Start Audit Now →</a>`
    );

    // 3. Remove 24-hour delivery + No sales call flex row (the whole div)
    updated = updated.replace(
      /<div class="flex items-center justify-center gap-4 text-white\/80 text-sm font-medium"[^>]*>[\s\S]*?<\/div>\s*<\/div>/,
      (match) => {
        // Only remove the inner badges div, keep the outer closing div
        return match.replace(/<div class="flex items-center justify-center gap-4[^"]*"[\s\S]*?<\/div>/, '');
      }
    );

    // Simpler targeted removal of the flex badges row
    updated = updated.replace(
      /<div class="flex items-center justify-center gap-4 text-white\/80 text-sm font-medium"[^>]*>[\s\S]*?<span>No sales call<\/span>\s*<\/div>\s*<\/div>/g,
      '</div>'
    );

    // 4. Add bonuses line if missing
    if (!updated.includes('Over $300 worth of free bonuses') && updated.includes('cta-block')) {
      updated = updated.replace(
        /(<\/a>)(\s*\n?\s*<div class="mt-3)/,
        '$1\n          <div class="mt-3 text-orange-300 text-xs font-semibold" style="color: rgb(253, 186, 116) !important;">+ Over $300 worth of free bonuses</div>$2'
      );
      // Fallback: insert before closing inner div
      if (!updated.includes('Over $300 worth of free bonuses')) {
        updated = updated.replace(
          /(<\/a>)(\s*<\/div>\s*<\/div>)/,
          '$1\n          <div class="mt-3 text-orange-300 text-xs font-semibold" style="color: rgb(253, 186, 116) !important;">+ Over $300 worth of free bonuses</div>$2'
        );
      }
    }

    const { error: updateError } = await supabase
      .from('blog_posts')
      .update({ content: updated })
      .eq('id', post.id);

    results.push({
      id: post.id,
      title: post.title,
      status: updateError ? `ERROR: ${updateError.message}` : 'updated',
    });
  }

  return NextResponse.json({
    message: `Migration complete. ${results.length} post(s) updated.`,
    results,
  });
}
