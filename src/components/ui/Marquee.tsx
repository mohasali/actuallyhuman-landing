interface MarqueeProps {
  items: string[]
  className?: string
}

/**
 * A seamless infinite marquee. The track holds the items twice and animates
 * by -50%, so the loop is invisible. Pauses on hover; halts under reduced motion.
 */
export function Marquee({ items, className }: MarqueeProps) {
  const sequence = [...items, ...items]

  return (
    <div
      className={`group relative w-full overflow-hidden ${className ?? ''}`}
      aria-hidden="true"
    >
      <div className="marquee-track flex shrink-0 items-center group-hover:[animation-play-state:paused]">
        {sequence.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="label-mono whitespace-nowrap px-6">{item}</span>
            <span className="text-accent">/</span>
          </span>
        ))}
      </div>
    </div>
  )
}
