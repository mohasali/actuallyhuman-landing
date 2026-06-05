interface WordmarkProps {
  /** stacked = two lines (hero/footer), inline = one line (navbar) */
  variant?: 'stacked' | 'inline'
  className?: string
  onDark?: boolean
}

/**
 * The ActuallyHuman lockup. Two-tone like the reference: the first word sits
 * back in muted grey, the second lands in solid ink (or paper, on dark).
 */
export function Wordmark({ variant = 'inline', className, onDark = false }: WordmarkProps) {
  const solid = onDark ? 'text-paper' : 'text-ink'

  if (variant === 'stacked') {
    return (
      <div className={`display-tight leading-[0.82] ${className ?? ''}`}>
        <span className="block text-mute">Actually</span>
        <span className={`block ${solid}`}>
          Human<span className="text-accent">.</span>
        </span>
      </div>
    )
  }

  return (
    <span className={`display-tight text-xl tracking-[-0.04em] ${className ?? ''}`}>
      <span className="text-mute">Actually</span>
      <span className={solid}>Human</span>
      <span className="text-accent">.</span>
    </span>
  )
}
