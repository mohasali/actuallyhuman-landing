import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  /** seconds */
  delay?: number
  /** initial vertical offset in px */
  y?: number
  className?: string
}

/**
 * Scroll-triggered entrance: fades + lifts into place once, when scrolled into
 * view. Renders nothing special under `prefers-reduced-motion`.
 */
export function Reveal({ children, delay = 0, y = 26, className }: RevealProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-72px' }}
      transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
