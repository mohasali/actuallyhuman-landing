import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { CadenceSignal } from '../ui/CadenceSignal'
import { Marquee } from '../ui/Marquee'
import { scrollToId } from '../../lib/scroll'

const MARQUEE = [
  'Proof of Human',
  'Written, not generated',
  'No paste, just people',
  'Keystroke cadence',
  'actuallyhuman.ink',
]

function TypingHeadline() {
  const [line1, setLine1] = useState('')
  const [line2, setLine2] = useState('')
  const [line3, setLine3] = useState('')
  const [activeLine, setActiveLine] = useState(1)

  useEffect(() => {
    const l1Full = 'Every word'
    const l2Full = 'was typed'
    const l3Part1 = 'by a humen' // Typo
    const l3Full = 'by a human'

    let timeout: ReturnType<typeof setTimeout>

    const typeLine1 = (idx: number) => {
      if (idx <= l1Full.length) {
        setLine1(l1Full.slice(0, idx))
        timeout = setTimeout(() => typeLine1(idx + 1), 70 + Math.random() * 50)
      } else {
        setActiveLine(2)
        timeout = setTimeout(() => typeLine2(0), 250)
      }
    }

    const typeLine2 = (idx: number) => {
      if (idx <= l2Full.length) {
        setLine2(l2Full.slice(0, idx))
        timeout = setTimeout(() => typeLine2(idx + 1), 60 + Math.random() * 40)
      } else {
        setActiveLine(3)
        timeout = setTimeout(() => typeLine3(0), 250)
      }
    }

    const typeLine3 = (idx: number) => {
      if (idx <= l3Part1.length) {
        setLine3(l3Part1.slice(0, idx))
        timeout = setTimeout(() => typeLine3(idx + 1), 80 + Math.random() * 60)
      } else {
        // Pause at typo
        timeout = setTimeout(() => backspaceLine3(l3Part1.length), 400)
      }
    }

    const backspaceLine3 = (idx: number) => {
      if (idx >= l3Full.length - 2) { // Backspace 'en'
        setLine3(l3Part1.slice(0, idx))
        timeout = setTimeout(() => backspaceLine3(idx - 1), 100 + Math.random() * 50)
      } else {
        // Fix typo
        timeout = setTimeout(() => fixLine3(l3Full.length - 2), 250)
      }
    }

    const fixLine3 = (idx: number) => {
      if (idx <= l3Full.length) {
        setLine3(l3Full.slice(0, idx))
        timeout = setTimeout(() => fixLine3(idx + 1), 120 + Math.random() * 80)
      } else {
        setActiveLine(0) // No active line typing just show all
      }
    }

    timeout = setTimeout(() => typeLine1(0), 500)

    return () => clearTimeout(timeout)
  }, [])

  return (
      <h1 className="display-tight mt-8 tracking-tighter text-[clamp(2.5rem,8.5vw,9rem)]">
        <span className="block whitespace-nowrap text-mute">
          {line1}
          {activeLine === 1 && <span className="caret" aria-hidden="true" />}
        </span>
        <span className="block whitespace-nowrap text-ink">
          {line2}
          {activeLine === 2 && <span className="caret" aria-hidden="true" />}
        </span>
        <span className="block whitespace-nowrap text-ink">
          {line3}
          {(activeLine === 3 || activeLine === 0) && (
          <span className="caret" aria-hidden="true" />)}
        </span>
      </h1>
  )
}

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section className="relative overflow-hidden pt-[var(--nav-h,72px)]">
      <div className="mx-auto max-w-[1320px] px-5 pb-10 pt-8 sm:px-8 sm:pt-12">
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05, duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <span className="h-2 w-2 bg-accent" />
          <span className="label-mono text-ink/70">
            actuallyhuman.ink — pre-launch
          </span>
        </motion.div>

        {/* headline */}
        {reduce ? (
          <h1 className="display-tight mt-8 text-[clamp(3.2rem,12vw,11rem)]">
            <span className="block text-mute">Every word</span>
            <span className="block text-ink">was typed</span>
            <span className="block text-ink">
              by a human <span className="caret" aria-hidden="true" />
            </span>
          </h1>
        ) : (
          <TypingHeadline />
        )}

        {/* sub + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <p className="max-w-md font-sans text-lg leading-relaxed text-ink/80 text-balance">
            A dedicated space for human thoughts. <b>Real blogs</b> without the <b>AI slop. </b>
            Authenticity is verified through keystroke rhythm, <b>not AI detectors.</b>
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollToId('waitlist')}
              className="label-mono border-2 bg-ink px-7 py-4 text-paper transition-colors hover:bg-accent hover:text-ink cursor-pointer"
            >
              Join the waitlist
            </button>
            <button
              onClick={() => scrollToId('how')}
              className="label-mono border-2 border-ink  px-7 py-4 text-ink bg-paper transition-colors hover:bg-accent hover:text-ink cursor-pointer"
            >
              How it works
            </button>
          </div>
        </motion.div>
      </div>

      {/* live signal strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85, duration: 0.9 }}
        className="relative border-y-2 border-ink/90 bg-paper-dim"
      >
        <div className="mx-auto flex max-w-[1320px] items-center gap-6 px-5 py-6 sm:px-8">
          <span className="label-mono hidden shrink-0 text-ink/60 sm:block">
            live&nbsp;cadence
          </span>
          <CadenceSignal className="h-20 w-full sm:h-24" />
        </div>
      </motion.div>

      {/* marquee */}
      <div className="border-b-2 border-ink bg-ink py-3 text-paper">
        <Marquee items={MARQUEE} />
      </div>
    </section>
  )
}
