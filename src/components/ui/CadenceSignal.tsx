import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

/**
 * CadenceSignal — a scrolling visualisation of human typing rhythm.
 *
 * Each bar is one keystroke; its height is the inter-keystroke delta (ms).
 * Irregular heights = human. Tall bars = pauses (thinking); the occasional
 * red-tinted bar = a deletion/revision. This is the "live signal" the whole
 * product is built to read — rendered here as pure decoration.
 *
 * Canvas + rAF for 60fps; collapses to a static representative trace when the
 * user prefers reduced motion.
 */
export function CadenceSignal({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const styles = getComputedStyle(document.documentElement)
    const accent = styles.getPropertyValue('--color-accent').trim() || '#2dd46a'
    const ink = styles.getPropertyValue('--color-ink').trim() || '#0b0b0b'

    const BAR_W = 5
    const GAP = 3
    const SLOT = BAR_W + GAP

    let raf = 0
    let width = 0
    let height = 0
    const bars: { h: number; deletion: boolean }[] = []
    let offset = 0

    // A keystroke delta sampled from a human-like, heavy-tailed distribution.
    const sampleDelta = () => {
      const r = Math.random()
      // most strokes are quick & varied; a few are long "thinking" pauses
      const base = 0.12 + Math.random() * 0.5
      const pause = r > 0.9 ? 0.35 + Math.random() * 0.55 : 0
      return Math.min(1, base + pause)
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const needed = Math.ceil(width / SLOT) + 4
      while (bars.length < needed) {
        bars.push({ h: sampleDelta(), deletion: Math.random() > 0.92 })
      }
    }

    const draw = (animate: boolean) => {
      ctx.clearRect(0, 0, width, height)
      const mid = height * 0.5

      // baseline
      ctx.strokeStyle = `${ink}1a`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(0, mid)
      ctx.lineTo(width, mid)
      ctx.stroke()

      for (let i = 0; i < bars.length; i++) {
        const bar = bars[i]
        const x = i * SLOT - (offset % SLOT)
        if (x < -BAR_W || x > width) continue

        const amp = bar.h * (height * 0.42)
        ctx.fillStyle = bar.deletion ? '#d1453b' : accent
        // mirror the bar across the baseline for a waveform feel
        ctx.fillRect(x, mid - amp, BAR_W, amp)
        ctx.globalAlpha = 0.45
        ctx.fillRect(x, mid, BAR_W, amp * 0.7)
        ctx.globalAlpha = 1
      }

      if (animate) {
        offset += 0.85
        if (offset >= SLOT) {
          offset -= SLOT
          bars.shift()
          bars.push({ h: sampleDelta(), deletion: Math.random() > 0.92 })
        }
        raf = requestAnimationFrame(() => draw(true))
      }
    }

    resize()
    window.addEventListener('resize', resize)

    if (reduce) {
      draw(false)
    } else {
      raf = requestAnimationFrame(() => draw(true))
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [reduce])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      role="presentation"
    />
  )
}
