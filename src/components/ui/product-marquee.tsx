'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useAnimationFrame, useReducedMotion } from 'motion/react'

const PRODUCTS = [
  { name: 'Tênis Street Jeans', price: 'R$ 259', img: '/marquee/produto-1.jpg' },
  { name: 'iPhone Premium', price: 'R$ 2.499', img: '/marquee/produto-2.jpg' },
  { name: 'Boné Premium', price: 'R$ 89', img: '/marquee/produto-3.jpg' },
  { name: 'Smartwatch Sport', price: 'R$ 219', img: '/marquee/produto-4.jpg' },
]

const CARD_WIDTH = 220
const CARD_HEIGHT = 220
const GAP = 20
const SPEED = 40 // px por segundo
const RESUME_DELAY = 800 // ms de pausa após soltar o drag

function ProductCard({ p }: { p: (typeof PRODUCTS)[number] }) {
  return (
    <div
      className="flex-shrink-0 rounded-2xl overflow-hidden bg-white select-none"
      style={{ width: CARD_WIDTH }}
    >
      <img
        src={p.img}
        alt={p.name}
        draggable={false}
        className="w-full object-cover pointer-events-none"
        style={{ height: CARD_HEIGHT }}
      />
      <div className="px-3 py-3 flex items-center justify-between gap-2">
        <span className="text-[13px] font-medium text-[#1A1A1A] truncate">{p.name}</span>
        <span
          className="text-[11px] font-semibold px-2.5 py-1 rounded-full text-white whitespace-nowrap"
          style={{ background: '#F97316' }}
        >
          {p.price}
        </span>
      </div>
    </div>
  )
}

export function ProductMarquee() {
  const prefersReducedMotion = useReducedMotion()
  const x = useMotionValue(0)
  const isDragging = useRef(false)
  const [resumeAt, setResumeAt] = useState(0)

  const items = [...PRODUCTS, ...PRODUCTS]
  const setWidth = PRODUCTS.length * (CARD_WIDTH + GAP)

  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion) return
    if (isDragging.current) return
    if (performance.now() < resumeAt) return

    let next = x.get() - (SPEED * delta) / 1000
    if (next <= -setWidth) next += setWidth
    x.set(next)
  })

  return (
    <div
      className="relative overflow-hidden py-2"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}
    >
      <motion.div
        className="flex"
        style={{ x, gap: GAP, cursor: 'grab', touchAction: 'pan-y' }}
        drag="x"
        dragConstraints={{ left: -setWidth * 3, right: setWidth }}
        dragElastic={0.08}
        onDragStart={() => {
          isDragging.current = true
        }}
        onDragEnd={() => {
          isDragging.current = false
          setResumeAt(performance.now() + RESUME_DELAY)
          const raw = x.get()
          const wrapped = ((raw % setWidth) + setWidth) % setWidth
          x.set(-wrapped)
        }}
        whileTap={{ cursor: 'grabbing' }}
      >
        {items.map((p, i) => (
          <ProductCard key={i} p={p} />
        ))}
      </motion.div>
    </div>
  )
}
