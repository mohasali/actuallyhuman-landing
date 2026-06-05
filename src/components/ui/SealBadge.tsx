interface SealBadgeProps {
  size?: number
  className?: string
  /** spin the outer ring of text */
  spin?: boolean
}

/**
 * A blocky, stamp-like "Proof of Human" seal. Outer ring carries circular mono
 * text; the centre holds a minimal pulse glyph. Used in the footer + CTA.
 */
export function SealBadge({ size = 132, className, spin = true }: SealBadgeProps) {
  const text = 'PROOF OF HUMAN · ACTUALLYHUMAN.INK · '
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="Proof of Human seal"
    >
      <defs>
        <path
          id="seal-circle"
          d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"
        />
      </defs>

      <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="58" fill="none" stroke="currentColor" strokeWidth="1.5" />

      <g
        style={
          spin
            ? { transformOrigin: '100px 100px', animation: 'seal-spin 22s linear infinite' }
            : undefined
        }
      >
        <text 
          fontSize="11.5" 
          letterSpacing="3.1" 
          fontFamily="var(--font-mono)" 
          fontWeight={600} 
          fill="var(--color-paper)"
        >
          <textPath href="#seal-circle" startOffset="0">
            {text}
          </textPath>
        </text>
      </g>

      {/* centre pulse glyph */}
      <polyline
        points="74,100 88,100 95,80 105,120 112,100 126,100"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      <style>{`@keyframes seal-spin{to{transform:rotate(360deg)}}
        @media (prefers-reduced-motion: reduce){g{animation:none!important}}`}</style>
    </svg>
  )
}
