import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

/**
 * The Supabase client is only created when credentials are present.
 * This keeps the landing page fully runnable out-of-the-box (the waitlist
 * form falls back to a local simulation) and lets you wire the real backend
 * by dropping two values into `.env`. See README for the table + RLS policy.
 */
export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null

export const isSupabaseConfigured = Boolean(url && anonKey)
