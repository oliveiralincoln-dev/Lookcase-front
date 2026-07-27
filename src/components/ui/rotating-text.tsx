'use client'

import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

type RotatingTextProps = {
  texts: string[]
  variant?: 'default' | 'slide'
  transition?: Record<string, unknown>
  initial?: Record<string, unknown>
  animate?: Record<string, unknown>
  exit?: Record<string, unknown>
  animatePresenceMode?: 'wait' | 'sync' | 'popLayout'
  animatePresenceInitial?: boolean
  rotationInterval?: number
  staggerDuration?: number
  staggerFrom?: 'first' | 'last' | 'center' | 'random' | number
  loop?: boolean
  auto?: boolean
  splitBy?: 'characters' | 'words' | 'lines' | string
  onNext?: (index: number) => void
  mainClassName?: string
  splitLevelClassName?: string
  elementLevelClassName?: string
  style?: React.CSSProperties
}

export type RotatingTextRef = {
  next: () => void
  previous: () => void
  jumpTo: (index: number) => void
  reset: () => void
}

const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>((props, ref) => {
  const {
    texts,
    variant = 'default',
    transition = { type: 'spring', damping: 25, stiffness: 300 },
    initial = { y: '100%', opacity: 0 },
    animate = { y: 0, opacity: 1 },
    exit = { y: '-120%', opacity: 0 },
    animatePresenceMode = 'wait',
    animatePresenceInitial = false,
    rotationInterval = 2000,
    staggerDuration = 0,
    staggerFrom = 'first',
    loop = true,
    auto = true,
    splitBy = 'characters',
    onNext,
    mainClassName,
    splitLevelClassName,
    elementLevelClassName,
    style,
    ...rest
  } = props

  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  const splitIntoCharacters = (text: string): string[] => {
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter('pt', { granularity: 'grapheme' })
      return Array.from(segmenter.segment(text), (s) => s.segment)
    }
    return Array.from(text)
  }

  const elements = useMemo(() => {
    const currentText = texts[currentTextIndex]
    if (splitBy === 'characters') {
      const words = currentText.split(' ')
      return words.map((word, i) => ({
        characters: splitIntoCharacters(word),
        needsSpace: i !== words.length - 1,
      }))
    }
    if (splitBy === 'words') {
      return currentText.split(' ').map((word, i, arr) => ({
        characters: [word],
        needsSpace: i !== arr.length - 1,
      }))
    }
    if (splitBy === 'lines') {
      return currentText.split('\n').map((line, i, arr) => ({
        characters: [line],
        needsSpace: i !== arr.length - 1,
      }))
    }
    return currentText.split(splitBy).map((part, i, arr) => ({
      characters: [part],
      needsSpace: i !== arr.length - 1,
    }))
  }, [texts, currentTextIndex, splitBy])

  const getStaggerDelay = useCallback(
    (index: number, totalChars: number) => {
      if (staggerFrom === 'first') return index * staggerDuration
      if (staggerFrom === 'last') return (totalChars - 1 - index) * staggerDuration
      if (staggerFrom === 'center') {
        const center = Math.floor(totalChars / 2)
        return Math.abs(center - index) * staggerDuration
      }
      if (staggerFrom === 'random') {
        return Math.abs(Math.floor(Math.random() * totalChars) - index) * staggerDuration
      }
      return Math.abs((staggerFrom as number) - index) * staggerDuration
    },
    [staggerFrom, staggerDuration]
  )

  const handleIndexChange = useCallback(
    (newIndex: number) => {
      setCurrentTextIndex(newIndex)
      onNext?.(newIndex)
    },
    [onNext]
  )

  const next = useCallback(() => {
    const nextIndex =
      currentTextIndex === texts.length - 1
        ? loop ? 0 : currentTextIndex
        : currentTextIndex + 1
    if (nextIndex !== currentTextIndex) handleIndexChange(nextIndex)
  }, [currentTextIndex, texts.length, loop, handleIndexChange])

  const previous = useCallback(() => {
    const prevIndex =
      currentTextIndex === 0
        ? loop ? texts.length - 1 : currentTextIndex
        : currentTextIndex - 1
    if (prevIndex !== currentTextIndex) handleIndexChange(prevIndex)
  }, [currentTextIndex, texts.length, loop, handleIndexChange])

  const jumpTo = useCallback(
    (index: number) => {
      const validIndex = Math.max(0, Math.min(index, texts.length - 1))
      if (validIndex !== currentTextIndex) handleIndexChange(validIndex)
    },
    [texts.length, currentTextIndex, handleIndexChange]
  )

  const reset = useCallback(() => {
    if (currentTextIndex !== 0) handleIndexChange(0)
  }, [currentTextIndex, handleIndexChange])

  useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [
    next, previous, jumpTo, reset,
  ])

  useEffect(() => {
    if (!auto) return
    const id = setInterval(next, rotationInterval)
    return () => clearInterval(id)
  }, [next, rotationInterval, auto])

  if (variant === 'slide') {
    return (
      <motion.span
        className={cn(mainClassName)}
        style={{ overflow: 'hidden', display: 'inline-block', ...style }}
        layout
        {...(rest as Record<string, unknown>)}
      >
        <span className="text-rotate-sr-only">{texts[currentTextIndex]}</span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentTextIndex}
            initial={{ y: 36, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } }}
            exit={{ y: -36, opacity: 0, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } }}
            style={{ display: 'inline-block' }}
            aria-hidden="true"
          >
            {texts[currentTextIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    )
  }

  return (
    <motion.span
      className={cn('text-rotate', mainClassName)}
      style={style}
      {...(rest as Record<string, unknown>)}
      layout
      transition={transition as object}
    >
      <span className="text-rotate-sr-only">{texts[currentTextIndex]}</span>
      <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
        <motion.span
          key={currentTextIndex}
          className={cn(splitBy === 'lines' ? 'text-rotate-lines' : 'text-rotate')}
          layout
          aria-hidden="true"
        >
          {elements.map((wordObj, wordIndex, array) => {
            const prevCount = array
              .slice(0, wordIndex)
              .reduce((sum, w) => sum + w.characters.length, 0)
            const total = array.reduce((sum, w) => sum + w.characters.length, 0)
            return (
              <span
                key={wordIndex}
                className={cn('text-rotate-word', splitLevelClassName)}
              >
                {wordObj.characters.map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={initial as any}
                    animate={animate as any}
                    exit={exit as any}
                    transition={{
                      ...(transition as object),
                      delay: getStaggerDelay(prevCount + charIndex, total),
                    }}
                    className={cn('text-rotate-element', elementLevelClassName)}
                  >
                    {char}
                  </motion.span>
                ))}
                {wordObj.needsSpace && (
                  <span className="text-rotate-space"> </span>
                )}
              </span>
            )
          })}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  )
})

RotatingText.displayName = 'RotatingText'
export default RotatingText
