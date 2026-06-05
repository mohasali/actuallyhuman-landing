import { supabase, isSupabaseConfigured } from './supabase'

export type JoinResult =
  | { status: 'joined' }
  | { status: 'already' }
  | { status: 'error'; message: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim())
}

/**
 * Adds an email to the waitlist.
 *
 * - With Supabase configured: inserts into the `waitlist` table. The unique
 *   constraint on `email` lets us detect repeat sign-ups (Postgres code 23505).
 * - Without Supabase: simulates success so the UI is demoable immediately.
 */
export async function joinWaitlist(rawEmail: string, rawHandle: string): Promise<JoinResult> {
  const email = rawEmail.trim().toLowerCase()
  const handle = rawHandle.trim().toLowerCase()

  if (!isValidEmail(email)) {
    return { status: 'error', message: 'That email doesn’t look right.' }
  }

  if (handle.length < 2) {
    return { status: 'error', message: 'That handle is too short.' }
  }

  if (!isSupabaseConfigured || !supabase) {
    // Local fallback — no backend wired yet.
    // eslint-disable-next-line no-console
    console.info('[waitlist:simulated]', { email, handle })
    await new Promise((r) => setTimeout(r, 650))
    return { status: 'joined' }
  }

  const { error } = await supabase.from('waitlist').insert({
    email,
    handle,
    referrer: typeof document !== 'undefined' ? document.referrer || null : null,
  })

  if (!error) return { status: 'joined' }

  // 23505 = unique_violation → they're already on the list.
  if (error.code === '23505') {
    if (error.message?.toLowerCase().includes('handle')) {
      return { status: 'error', message: 'That handle is already taken.' }
    }
    return { status: 'already' }
  }

  return {
    status: 'error',
    message: 'Something went wrong on our end. Try again in a moment.',
  }
}
