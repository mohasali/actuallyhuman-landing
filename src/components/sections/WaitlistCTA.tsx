import { Reveal } from '../motion/Reveal'
import { WaitlistForm } from '../ui/WaitlistForm'
import { SealBadge } from '../ui/SealBadge'

export function WaitlistCTA() {
  return (
    <section
      id="waitlist"
      className="relative scroll-mt-24 overflow-hidden bg-ink text-paper"
    >
      {/* faint grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--color-paper) 1px, transparent 1px), linear-gradient(to bottom, var(--color-paper) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative mx-auto max-w-[1320px] px-5 py-28 sm:px-8 sm:py-36">
        <div className="grid items-center gap-16 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Reveal>
              <span className="label-mono text-accent">The waitlist</span>
              <h2 className="display-tight mt-5 text-[clamp(2.6rem,6vw,6.5rem)]">
                <span className="block text-accent">Claim your</span>
                <span className="block text-paper">Writer Handle</span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-7 max-w-md font-sans text-lg leading-relaxed text-paper/75 text-balance">
                ActuallyHuman is still in active development. Drop your email and the handle you want to reserve your spot.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-9">
                <WaitlistForm dark />
              </div>
            </Reveal>

            <Reveal delay={0.28}>
              <p className="mt-4 font-mono text-xs text-mute-dark">
                No spam. One email when we launch.
              </p>
            </Reveal>
          </div>

          {/* seal */}
          <Reveal delay={0.15} className="hidden justify-self-center lg:block">
            <SealBadge size={260} className="text-paper/90" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
