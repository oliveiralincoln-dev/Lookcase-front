'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ShoppingBag } from 'lucide-react'

const ORANGE = '#F97316'

const PRODUCTS = [
  { name: 'Conjunto Urban',    price: 'R$ 189', sizes: ['P', 'M', 'G'],      img: '/products/vitrine-p1.png' },
  { name: 'Camisa Listrada',   price: 'R$ 234', sizes: ['P', 'M'],            img: '/products/vitrine-p2.png' },
  { name: 'Camisa Vinho',      price: 'R$ 79',  sizes: ['P', 'M', 'G', 'GG'],img: '/products/vitrine-p3.png' },
]

const ORDERS = [
  { from: 'Ana Lima',    item: 'Vestido Midi · P', price: 'R$ 189' },
  { from: 'Mari Santos', item: 'Conjunto Linho · M', price: 'R$ 234' },
  { from: 'Carol Melo',  item: 'Blusa Cropped · G', price: 'R$ 79'  },
]

export function StorefrontMockup() {
  const [orderIdx, setOrderIdx] = useState(0)
  const [visible, setVisible]   = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!visible) return
    const hide = setTimeout(() => {
      setVisible(false)
      const next = setTimeout(() => {
        setOrderIdx(p => (p + 1) % ORDERS.length)
        setVisible(true)
      }, 600)
      return () => clearTimeout(next)
    }, 3000)
    return () => clearTimeout(hide)
  }, [visible, orderIdx])

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Safari frame */}
      <div
        style={{
          background: '#1A1A1A',
          borderRadius: 14,
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
        }}
      >
        {/* Browser chrome */}
        <div
          style={{
            background: '#2A2A2A',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
            {['#FF5F57', '#FFBD2E', '#28CA41'].map((c, i) => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
            ))}
          </div>

          <div
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.06)',
              borderRadius: 6,
              padding: '5px 10px',
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>
              lookcase.com/ateliedarose
            </span>
          </div>

          <div style={{ width: 52, flexShrink: 0 }} />
        </div>

        {/* Store content */}
        <div style={{ background: '#F8F6F3', position: 'relative' }}>

          {/* Store header */}
          <div
            style={{
              background: 'white',
              borderBottom: '1px solid #EBEBEB',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#111', margin: 0, lineHeight: 1 }}>
                Ateliê da Rose
              </p>
              <p style={{ fontSize: 10, color: '#888', margin: '2px 0 0', lineHeight: 1 }}>
                Moda feminina · São Paulo
              </p>
            </div>
          </div>

          {/* Product grid */}
          <div style={{ padding: 12, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
            {PRODUCTS.map((p, i) => (
              <div
                key={i}
                style={{
                  background: 'white', borderRadius: 8, overflow: 'hidden',
                  border: '1px solid #F0F0F0',
                }}
              >
                <img
                  src={p.img}
                  alt={p.name}
                  style={{ width: '100%', height: 140, objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                />
                <div style={{ padding: '7px 8px' }}>
                  <p style={{ fontSize: 10, fontWeight: 600, color: '#111', margin: '0 0 3px', lineHeight: 1.3 }}>
                    {p.name}
                  </p>
                  <p style={{ fontSize: 11, fontWeight: 700, color: ORANGE, margin: '0 0 5px' }}>
                    {p.price}
                  </p>
                  <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                    {p.sizes.map(s => (
                      <span
                        key={s}
                        style={{
                          fontSize: 8, padding: '1px 4px', borderRadius: 3,
                          background: '#F5F5F5', color: '#666', fontWeight: 600,
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Notificação de pedido animada */}
          <div style={{ height: 56, position: 'relative' }}>
            <AnimatePresence mode="wait">
              {visible && (
                <motion.div
                  key={orderIdx}
                  initial={{ opacity: 0, y: 16, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0,  scale: 1    }}
                  exit={   { opacity: 0, y: 8,   scale: 0.96 }}
                  transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{
                    position: 'absolute',
                    bottom: 10, left: 10, right: 10,
                    background: 'white',
                    borderRadius: 10,
                    padding: '9px 12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    border: '1px solid #F0F0F0',
                  }}
                >
                  <div
                    style={{
                      width: 28, height: 28, borderRadius: 7, flexShrink: 0,
                      background: 'rgba(249,115,22,0.1)',
                      border: '1px solid rgba(249,115,22,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <ShoppingBag size={13} color={ORANGE} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 10, fontWeight: 700, color: '#111', margin: 0, lineHeight: 1 }}>
                      Novo pedido · {ORDERS[orderIdx].from}
                    </p>
                    <p style={{ fontSize: 9, color: '#888', margin: '2px 0 0', lineHeight: 1 }}>
                      {ORDERS[orderIdx].item} · {ORDERS[orderIdx].price}
                    </p>
                  </div>
                  <span style={{ fontSize: 9, color: '#BBB', flexShrink: 0 }}>agora</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  )
}
