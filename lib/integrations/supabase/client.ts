"use client";

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './types';

// Create a Supabase client for use in client components
export const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://pgbcixncaeyjunwxrsik.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnYmNpeG5jYWV5anVud3hyc2lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwOTgzMDMsImV4cCI6MjA2NTY3NDMwM30.TUsBYptM7RIcVWZ0IQiGGNViSnlxr8ruN_zwiAup5Fc"
);
