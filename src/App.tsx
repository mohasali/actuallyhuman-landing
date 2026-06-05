import { Analytics } from '@vercel/analytics/react'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { HowItWorks } from './components/sections/HowItWorks'
import { Philosophy } from './components/sections/Philosophy'
import { WaitlistCTA } from './components/sections/WaitlistCTA'

export default function App() {
  return (
    <div className="relative min-h-dvh bg-paper text-ink">
      <Navbar />
      <main>
        <Hero />
        <Philosophy />
        <HowItWorks />
        <WaitlistCTA />
      </main>
      <Footer />
      <Analytics />
    </div>
  )
}
