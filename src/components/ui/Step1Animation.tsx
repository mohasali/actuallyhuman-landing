import { useState, useEffect } from 'react'
import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

interface Step1AnimationProps {
  title: string
  body: string
  mutedClass?: string
}

export function Step1Animation({ title, body, mutedClass }: Step1AnimationProps) {
  const [displayTitle, setDisplayTitle] = useState('')
  const [showBody, setShowBody] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return

    let timeout: ReturnType<typeof setTimeout>
    
    const typeTitle = (idx: number) => {
      if (idx <= title.length) {
        setDisplayTitle(title.slice(0, idx))
        timeout = setTimeout(() => typeTitle(idx + 1), 50 + Math.random() * 50)
      } else {
        timeout = setTimeout(() => setShowBody(true), 400)
      }
    }

    typeTitle(0)
    return () => clearTimeout(timeout)
  }, [isInView, title])

  return (
    <div ref={ref}>
      <h3 className="mt-8 font-sans text-2xl font-extrabold leading-tight tracking-tight sm:text-[1.7rem] min-h-[2lh]">
        {displayTitle}
        {!showBody && <span className="caret ml-1" aria-hidden="true" />}
      </h3>

      <div className="mt-4 flex-1 min-h-[100px]">
        {showBody && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1 }}
            className={`font-sans text-[0.975rem] leading-relaxed ${mutedClass}`}
          >
            {body}
          </motion.p>
        )}
      </div>
    </div>
  )
}
