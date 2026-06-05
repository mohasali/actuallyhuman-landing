import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { joinWaitlist, isValidEmail, type JoinResult } from '../../lib/waitlist'

type Status = 'idle' | 'loading' | JoinResult['status']

const MESSAGES: Record<Exclude<Status, 'idle' | 'loading'>, string> = {
  joined: 'You’re on the list. We’ll be in touch when the doors open.',
  already: 'You’re already on the list — sit tight.',
  error: 'Something went wrong. Try again in a moment.',
}

export function WaitlistForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState('')
  const [handle, setHandle] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (status === 'loading') return

    if (!isValidEmail(email)) {
      setStatus('error')
      setErrorMsg('That email doesn’t look right.')
      return
    }

    if (handle.trim().length < 2) {
      setStatus('error')
      setErrorMsg('Please choose a handle (at least 2 characters).')
      return
    }

    setStatus('loading')
    setErrorMsg(null)
    const result = await joinWaitlist(email, handle)
    setStatus(result.status)
    if (result.status === 'error') setErrorMsg(result.message)
  }

  const done = status === 'joined' || status === 'already'

  // palette swaps for use on light vs dark sections
  const fieldBorder = dark ? 'border-paper/25 focus-within:border-accent' : 'border-ink/20 focus-within:border-accent'
  const inputText = dark ? 'text-paper placeholder:text-mute-dark' : 'text-ink placeholder:text-mute'
  const btnBase = dark ? 'bg-accent text-ink hover:bg-paper' : 'bg-ink text-paper hover:bg-accent hover:text-ink'

  return (
    <div className="w-full max-w-xl">
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`flex items-center gap-4 border-2 px-5 py-5 ${dark ? 'border-accent' : 'border-ink'}`}
          >
            <span
              className={`grid h-9 w-9 shrink-0 place-items-center font-display text-lg ${dark ? 'bg-accent text-ink' : 'bg-ink text-accent'}`}
            >
              ✓
            </span>
            <p className={`font-sans text-base font-medium ${dark ? 'text-paper' : 'text-ink'}`}>
              {MESSAGES[status as 'joined' | 'already']}
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            initial={false}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <div
              className={`flex flex-col border-2 bg-transparent p-2 transition-colors ${fieldBorder}`}
            >
              <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:gap-0">
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (status === 'error') setStatus('idle')
                  }}
                  placeholder="you@yourdomain.com"
                  aria-label="Email address"
                  className={`min-w-0 flex-1 bg-transparent px-4 py-3 font-mono text-sm outline-none ${inputText}`}
                />
                <div className={`hidden w-px self-stretch bg-current opacity-10 sm:block ${dark ? 'text-paper' : 'text-ink'}`} />
                <input
                  type="text"
                  required
                  value={handle}
                  onChange={(e) => {
                    setHandle(e.target.value)
                    if (status === 'error') setStatus('idle')
                  }}
                  placeholder="@handle"
                  aria-label="Writer handle"
                  className={`min-w-0 flex-1 bg-transparent px-4 py-3 font-mono text-sm outline-none ${inputText}`}
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className={`label-mono mt-2 shrink-0 px-7 py-3 transition-colors disabled:opacity-60 lg:mt-0 ${btnBase}`}
              >
                {status === 'loading' ? 'Joining…' : 'Join waitlist'}
              </button>
            </div>

            <div className="h-5 pt-2">
              {status === 'error' && errorMsg && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-mono text-xs text-[#d1453b]"
                >
                  {errorMsg}
                </motion.p>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
