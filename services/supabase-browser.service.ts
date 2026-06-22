import { createBrowserClient as createSupabaseBrowserClient } from '@supabase/ssr';

// Browser Client (for Client Components only)
// This file does NOT import next/headers so it is fully compatible with client-side code
export function createBrowserClient() {
  return createSupabaseBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
