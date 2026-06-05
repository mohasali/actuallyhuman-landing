import { Reveal } from '../motion/Reveal'

export function Philosophy() {
  return (
    <section id="philosophy" className="relative scroll-mt-24 py-24 sm:py-32 bg-ink text-paper overflow-hidden">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Reveal>
              <span className="label-mono text-paper/60">The Philosophy</span>
              <h2 className="display-tight mt-5 text-[clamp(2.4rem,7vw,5.5rem)]">
                <span className="block text-paper">Why I built</span>
                <span className="block text-accent">Actually Human.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1} className="mt-12">
              <div className="space-y-6 font-sans text-lg leading-relaxed text-paper/80">
                <p>
                  I wanted to create and post stuff, but you can't be seen anymore because everything is just over-inflated AI slop. People are losing their human touch.
                </p>
                <p>
                  AI is a great tool to help you work, fix typos, draft ideas, or accelerate your work. But if AI is doing your work <i>and</i> also posting your opinion and blogs, then what even are you at that point?
                </p>
                <p>
                  Everyone is just going to end up being an AI. Our opinions, humor, reactions, and weird quirks is what makes us human. If you delegate that to an LLM, you become nothing.
                </p>
                <p className="font-bold text-accent">
                  AI should accelerate your work, not replace your voice.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="relative lg:mt-24">
             <div className="border-2 border-paper/20 p-8 sm:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      <path d="M12 8v4"/>
                      <path d="M12 16h.01"/>
                   </svg>
                </div>
                <h3 className="label-mono text-accent mb-6">Manifesto</h3>
                <blockquote className="space-y-4">
                   <p className="text-2xl sm:text-3xl font-serif italic leading-snug">
                     "When you delegate your opinions, your humor, and your quirks to an LLM, you become nothing."
                   </p>
                   <footer className="label-mono text-paper/50">— The Nerd Behind the Ink</footer>
                </blockquote>
             </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
