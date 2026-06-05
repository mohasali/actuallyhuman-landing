import type { Step } from '../../content/steps'
import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

interface StepCardProps {
  step: Step
  /** invert to black card for visual rhythm */
  inverted?: boolean
  /** Optional custom content to replace title and body for special animations */
  customContent?: ReactNode
}

export function StepCard({ step, inverted = false, customContent }: StepCardProps) {
  const reduce = useReducedMotion()
  const surface = inverted
    ? 'bg-ink text-paper border-ink'
    : 'bg-paper text-ink border-ink/15'
  const muted = inverted ? 'text-mute-dark' : 'text-ink/65'
  const signalBorder = inverted ? 'border-paper/20' : 'border-ink/15'

  return (
    <motion.article
      whileHover={reduce ? {} : { 
        rotate: [0, -1, 1, -0.5, 0.5, 0],
        transition: { duration: 0.5, ease: "easeInOut" }
      }}
      style={{ transformOrigin: 'top center' }}
      className={`group relative flex h-full flex-col border-2 p-7 transition-colors duration-300 sm:p-9 ${surface}`}
    >
      <div className="flex items-baseline justify-between">
        <span className="display-tight text-6xl sm:text-7xl">{step.index}</span>
        <span
          className="h-3 w-3 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150"
          aria-hidden="true"
        />
      </div>

      {customContent && !reduce ? (
        customContent
      ) : (
        <>
          <h3 className="mt-8 font-sans text-2xl font-extrabold leading-tight tracking-tight sm:text-[1.7rem]">
            {step.title}
          </h3>

          <p className={`mt-4 flex-1 font-sans text-[0.975rem] leading-relaxed ${muted}`}>
            {step.body}
          </p>
        </>
      )}

      <code
        className={`mt-7 block border-t pt-4 font-mono text-xs text-accent ${signalBorder}`}
      >
        {step.signal}
      </code>
    </motion.article>
  )
}
