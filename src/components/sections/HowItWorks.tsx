import { Reveal } from '../motion/Reveal'
import { StepCard } from '../ui/StepCard'
import { STEPS } from '../../content/steps'
import { Step1Animation } from '../ui/Step1Animation'
import { Step2Animation } from '../ui/Step2Animation'
import { Step3Animation } from '../ui/Step3Animation'

export function HowItWorks() {
  return (
    <section id="how" className="relative scroll-mt-24 py-24 sm:py-32 overflow-x-hidden">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        {/* header */}
        <div className="flex flex-col gap-6 border-b-2 border-ink pb-10 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <span className="label-mono text-ink/60">How it works</span>
            <h2 className="display-tight mt-5 text-[clamp(2.4rem,7vw,5.5rem)]">
              <span className="block text-mute">Three steps</span>
              <span className="block text-ink">to a human seal.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="max-w-xs font-mono text-xs leading-relaxed text-ink/70">
              Verification happens during creation. Only timing is stored, never the content.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid scroll-mt-24 gap-5 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.index} delay={i * 0.1} className="h-full">
              <StepCard
                step={step}
                inverted={i === 1}
                customContent={
                  i === 0 ? (
                    <Step1Animation
                      title={step.title}
                      body={step.body}
                      mutedClass="text-ink/65"
                    />
                  ) : i === 1 ? (
                    <Step2Animation
                      body={step.body}
                      mutedClass="text-mute-dark"
                    />
                  ) : (
                    <Step3Animation
                      body={step.body}
                      mutedClass="text-ink/65"
                    />
                  )
                }
              />
            </Reveal>
          ))}
        </div>

        {/* privacy footnote band */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-start gap-4 border-2 border-accent bg-accent/10 px-6 py-6 sm:flex-row sm:items-center sm:gap-6">
            <span className="label-mono shrink-0 bg-accent px-3 py-1.5 text-ink">
              Privacy-first
            </span>
            <p className="font-sans text-sm leading-relaxed text-ink/85">
              The verification engine never sees what you write. It logs{' '}
              <span className="font-mono text-accent-deep">when</span> keys are
              pressed, never <span className="font-mono text-accent-deep">which</span>.
              Your words stay yours.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
