import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

interface Step2AnimationProps {
  body: string
  mutedClass?: string
}

export function Step2Animation({body, mutedClass }: Step2AnimationProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const part1 = "Tracking the "
  const rhythm = "rhythm"
  const part3 = ", never the "
  const words = "words."

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  const rhythmLetterVariants = {
    hidden: { opacity: 0, y: 0 },
    animate: (i: number) => ({
      opacity: 1,
      y: [0, -8, 0],
      transition: {
        duration: 1.2,
        repeat: 0,
        ease: "easeInOut",
        delay: 2.5 + i * 0.1,
      },
    }),
  }

  return (
    <div ref={ref} className="mt-8">
      <motion.h3
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="font-sans text-2xl font-extrabold leading-tight tracking-tight sm:text-[1.7rem]"
      >
        <motion.span variants={itemVariants} transition={{ delay: 2 }}>{part1}</motion.span>
        
        <span className="inline-flex">
          {rhythm.split('').map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              // @ts-expect-error Just Ignore it
              variants={rhythmLetterVariants}
              initial="hidden"
              animate={isInView ? "animate" : "hidden"}
              className="text-accent inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>

        <motion.span variants={itemVariants} transition={{ delay: 3.5 }}>{part3}</motion.span>
        
        <motion.span 
          variants={itemVariants}
          animate={isInView ? { filter: ['blur(0px)', 'blur(4px)', 'blur(0px)'], opacity: [1, 0.3, 1] } : {}}
          transition={{ 
            duration: 1.5, 
            repeat: 0, 
            ease: "easeInOut", 
            delay: 4 // Start blurring after everything else
          }}
          className="inline-block"
        >
          {words}
        </motion.span>
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 5, duration: 0.6 }}
        className={`mt-4 flex-1 font-sans text-[0.975rem] leading-relaxed ${mutedClass}`}
      >
        {body}
      </motion.p>
    </div>
  )
}
