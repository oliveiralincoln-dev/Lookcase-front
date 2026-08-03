'use client'

import { motion, useReducedMotion } from 'motion/react'

interface VerticalCutRevealProps {
  text: string
  className?: string
  staggerDelay?: number
  startDelay?: number
}

export function VerticalCutReveal({
  text,
  className,
  staggerDelay = 0.1,
  startDelay = 0,
}: VerticalCutRevealProps) {
  const shouldReduceMotion = useReducedMotion()
  const words = text.split(' ')

  return (
    <span className={className} style={{ display: 'inline-flex', flexWrap: 'wrap' }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.28em' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={shouldReduceMotion ? false : { y: '100%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true }}
            transition={{
              type: 'spring',
              stiffness: 140,
              damping: 22,
              delay: startDelay + i * staggerDelay,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
