import { Wordmark } from '../ui/Wordmark'
import { SealBadge } from '../ui/SealBadge'
import { scrollToId } from '../../lib/scroll'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-330 px-5 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Wordmark variant="stacked" onDark className="text-5xl sm:text-6xl" />
            <p className="mt-6 max-w-xs font-sans text-sm leading-relaxed text-mute-dark">
              A dedicated space for human thoughts. Real blogs without the AI slop.
              Authenticity is verified through keystroke rhythm, not AI detectors.
            </p>
          </div>

          <div className="flex gap-14">
            <nav className="flex flex-col gap-3">
              <span className="label-mono mb-1 text-mute-dark">Explore</span>
              <button onClick={() => scrollToId('philosophy')} className="text-left font-sans text-sm text-paper/80 transition-colors hover:text-accent">
                Philosophy
              </button>
              <button onClick={() => scrollToId('how')} className="text-left font-sans text-sm text-paper/80 transition-colors hover:text-accent">
                How it works
              </button>
              <button onClick={() => scrollToId('waitlist')} className="text-left font-sans text-sm text-paper/80 transition-colors hover:text-accent">
                Join waitlist
              </button>
              <button className="text-left font-sans text-sm text-paper/80 transition-colors hover:text-accent">
                Start Reading
              </button>
            </nav>

            <div className="hidden sm:block">
              <SealBadge size={120} className="text-paper/85" />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-paper/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label-mono text-mute-dark">
            © {year} · actuallyhuman.ink
          </p>
          <p className="label-mono text-mute-dark">
            Built by Mohammed Salim
          </p>
        </div>
      </div>
    </footer>
  )
}
