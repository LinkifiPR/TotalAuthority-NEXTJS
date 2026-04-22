"use client";

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const hasSupabaseEnv = Boolean(supabaseUrl && supabaseAnonKey);
const fallbackUrl = 'https://example.supabase.co';
const fallbackAnonKey = 'public-anon-key-placeholder';

if (!hasSupabaseEnv) {
  console.warn(
    'Supabase environment variables are missing on the client. ' +
      'Auth/data features that rely on Supabase may not function until NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are configured.',
  );
}

export const supabase = createBrowserClient<Database>(
  supabaseUrl || fallbackUrl,
  supabaseAnonKey || fallbackAnonKey,
);
