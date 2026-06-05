import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Wordmark } from '../ui/Wordmark'
import { scrollToId } from '../../lib/scroll'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'border-b border-ink/10 bg-paper/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-[var(--nav-h,72px)] max-w-[1320px] items-center justify-between px-5 sm:px-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2"
          aria-label="ActuallyHuman — back to top"
        >
          <Wordmark variant="inline" />
        </button>

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="hidden items-center gap-1 md:flex">
              <button
                onClick={() => scrollToId("philosophy")}
                className="label-mono px-4 py-2 text-ink/70 transition-colors hover:text-ink"
              >
                Philosophy
              </button>
              <button
                onClick={() => scrollToId("how")}
                className="label-mono px-4 py-2 text-ink/70 transition-colors hover:text-ink"
              >
                How it works
              </button>
          </div>

          <button
            onClick={() => scrollToId('waitlist')}
            className="label-mono ml-1 bg-ink px-5 py-2.5 text-paper transition-colors hover:bg-accent hover:text-ink"
          >
            Join waitlist
          </button>
            <button
                onClick={() => scrollToId('waitlist')}
                className=" hidden md:flex label-mono ml-1 bg-mute-dark px-5 py-2.5 text-paper transition-colors hover:bg-accent hover:text-ink"
            >
                Start Reading
            </button>
        </div>
      </nav>
    </motion.header>
  )
}
