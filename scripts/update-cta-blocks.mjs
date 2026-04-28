/**
 * Migration script: Update CTA blocks in all existing blog posts
 *
 * This replaces old CTA HTML baked into blog post content in Supabase
 * with the updated version (no "Free", correct button link, no 24-hour delivery/no sales call)
 *
 * Run with: node scripts/update-cta-blocks.mjs
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pgbcixncaeyjunwxrsik.supabase.co';
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SERVICE_ROLE_KEY) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY is required. Set it as an env var.');
  process.exit(1);
}

const headers = {
  'Content-Type': 'application/json',
  'apikey': SERVICE_ROLE_KEY,
  'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
};

async function fetchAllPosts() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?select=id,title,content&content=neq.null`, { headers });
  if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status} ${await res.text()}`);
  return res.json();
}

async function updatePost(id, content) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?id=eq.${id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error(`Failed to update post ${id}: ${res.status} ${await res.text()}`);
}

function updateCTAContent(content) {
  if (!content) return { updated: false, content };

  let updated = content;

  // 1. Fix headline - remove "Free"
  updated = updated.replace(/Get Your Free LLM Visibility Audit/g, 'Get Your LLM Visibility Audit');

  // 2. Fix button - replace old postMessage button with a link
  updated = updated.replace(
    /<button[^>]*onclick="window\.parent\.postMessage\(\{type: 'OPEN_FORM'\}[^"]*\)"[^>]*>\s*Start Free Audit\s*→\s*<\/button>/g,
    `<a href="https://totalauthority.com/llm-visibility-audit" class="relative inline-block bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 text-lg font-bold rounded-xl shadow-xl transition-all duration-300 transform hover:scale-105 border border-orange-400/50 cursor-pointer border-none mb-4" style="text-decoration: none;">\n            Start Audit Now →\n          </a>`
  );

  // 3. Fix button text if it already says "Start Audit Now" but still uses old button tag
  updated = updated.replace(
    /<button[^>]*onclick="window\.parent\.postMessage\(\{type: 'OPEN_FORM'\}[^"]*\)"[^>]*>\s*Start Audit Now\s*→\s*<\/button>/g,
    `<a href="https://totalauthority.com/llm-visibility-audit" class="relative inline-block bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 text-lg font-bold rounded-xl shadow-xl transition-all duration-300 transform hover:scale-105 border border-orange-400/50 cursor-pointer border-none mb-4" style="text-decoration: none;">\n            Start Audit Now →\n          </a>`
  );

  // 4. Remove 24-hour delivery and No sales call flex row
  updated = updated.replace(
    /<div class="flex items-center justify-center gap-4 text-white\/80 text-sm font-medium"[^>]*>[\s\S]*?<span>24-hour delivery<\/span>[\s\S]*?<span>No sales call<\/span>[\s\S]*?<\/div>/g,
    ''
  );

  // 5. Add bonuses line if not already present
  if (!updated.includes('Over $300 worth of free bonuses') && updated.includes('cta-block')) {
    updated = updated.replace(
      /(<\/a>\s*)([\s]*<\/div>\s*<\/div>)/,
      `$1\n          <div class="mt-3 text-orange-300 text-xs font-semibold" style="color: rgb(253, 186, 116) !important;">+ Over $300 worth of free bonuses</div>$2`
    );
  }

  const wasChanged = updated !== content;
  return { updated: wasChanged, content: updated };
}

async function main() {
  console.log('🔍 Fetching all blog posts from Supabase...');
  const posts = await fetchAllPosts();
  console.log(`📝 Found ${posts.length} blog posts`);

  let updatedCount = 0;
  let skippedCount = 0;

  for (const post of posts) {
    const { updated, content: newContent } = updateCTAContent(post.content);

    if (updated) {
      console.log(`✅ Updating: "${post.title}" (id: ${post.id})`);
      await updatePost(post.id, newContent);
      updatedCount++;
    } else {
      skippedCount++;
    }
  }

  console.log(`\n🎉 Done! Updated ${updatedCount} posts, skipped ${skippedCount} (no CTA found).`);
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
