import { motion, useInView, type Variants } from 'motion/react'
import { useRef } from 'react'

interface Step3AnimationProps {
  body: string
  mutedClass?: string
}

export function Step3Animation({ body, mutedClass }: Step3AnimationProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // "Earn the "
  // "Proof-of-Human"
  // " seal."
  const part1 = "Earn the "
  const stampText = "Proof-of-Human"
  const part2 = " seal."

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  const stampVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 4,
      rotate: 0,
      filter: 'blur(4px)'
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      filter: 'blur(0px)',
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
        delay: 6 // Sequential flow: Step 1 (~2s) + Step 2 (~5-6s). Starting after Step 2.
      }
    }
  }

  return (
    <div ref={ref} className="mt-8">
      <motion.h3
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="font-sans text-2xl font-extrabold leading-tight tracking-tight sm:text-[1.7rem]"
      >
        <motion.span variants={itemVariants} transition={{ delay: 5.5 }}>{part1}</motion.span>
        
        <div className="relative inline-block ml-1 overflow-hidden align-middle">
          <motion.span
            variants={stampVariants}
            className="text-accent inline-block border-2 border-accent px-2 py-0.5 rounded-sm"
            style={{ 
                textTransform: 'uppercase', 
                fontSize: '0.85em', 
                letterSpacing: '0.05em',
                boxShadow: '0 0 0 1px var(--color-accent)',
                transformOrigin: 'center center'
            }}
          >
            {stampText}
          </motion.span>
        </div>

        <motion.span variants={itemVariants} transition={{ delay: 7 }}>{part2}</motion.span>
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 7.5, duration: 0.6 }}
        className={`mt-4 flex-1 font-sans text-[0.975rem] leading-relaxed ${mutedClass}`}
      >
        {body}
      </motion.p>
    </div>
  )
}
