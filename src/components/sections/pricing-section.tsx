'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { DiaTextReveal } from '@/components/ui/dia-text-reveal'

// URL do app (auth/dashboard/vitrine) — fica em outro repositório.
// Placeholder até o domínio próprio existir; trocar via env var na Vercel quando mudar.
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://look-case.vercel.app'

const BASIC_FEATURES = [
  'Até 50 produtos',
  'Painel visual completo',
  'Vitrine com carrinho',
  'Analytics completo',
  'Pagamento direto no carrinho',
  'Cupom de desconto automático',
]

const PRO_FEATURES = [
  'Produtos ilimitados',
  'Produto em destaque',
  'Exportar relatórios (CSV/PDF)',
  'Sem marca Lookcase na vitrine',
]


const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
}

export function PricingSection() {
  const [active, setActive] = useState<'basic' | 'pro'>('pro')

  return (
    <section id="planos" className="px-5 lg:px-10 py-14 lg:py-20">

      <p
        className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] flex items-center gap-2 mb-5"
        style={{ color: 'var(--color-lk-gray-600)' }}
      >
        <span className="block w-[18px] h-[1px]" style={{ background: 'var(--color-lk-gray-600)' }} />
        Planos
      </p>

      <h2 className="font-display text-[28px] lg:text-[40px] font-medium tracking-[-0.03em] leading-[1.05] mb-2">
        Simples e transparente.
      </h2>
      <p className="font-body text-[15px] mb-12" style={{ color: 'var(--color-lk-gray-500)' }}>
        Sem taxa por venda. Sem surpresa na fatura.
      </p>

      <div className="max-w-3xl mx-auto flex gap-3 items-stretch">

        {/* ── BASIC ── */}
        <motion.div
          layout
          onClick={() => setActive('basic')}
          style={{
            flex: active === 'basic' ? '1.6 1 0%' : '0.8 1 0%',
            opacity: active === 'basic' ? 1 : 0.45,
            background: 'var(--color-lk-surface)',
            border: active === 'basic' ? '1px solid var(--color-lk-orange)' : '1px solid var(--color-lk-border)',
            borderRadius: 16,
            padding: '1.5rem',
            position: 'relative',
            cursor: 'pointer',
            overflow: 'hidden',
            transition: 'flex 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease',
          }}
        >
          {active === 'basic' && (
            <motion.div
              style={{
                position: 'absolute', inset: 0, borderRadius: 16,
                border: '1px solid var(--color-lk-orange)',
                pointerEvents: 'none',
              }}
              animate={{ opacity: [1, 0.15, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}

          <DiaTextReveal text="ATELIER" textColor="var(--color-lk-gray-500)" className="font-body text-[10px] font-semibold uppercase tracking-[0.12em] mb-3 block" />

          <div className="flex items-baseline gap-1 mb-1">
            <DiaTextReveal text="R$" textColor="var(--color-lk-gray-100)" className="font-display text-[15px] font-medium" />
            <DiaTextReveal text="59" textColor="var(--color-lk-white)" delay={0.1} className="font-display font-bold leading-none tracking-[-0.03em]" style={{ fontSize: 40, fontVariantNumeric: 'tabular-nums' }} />
            <DiaTextReveal text="/mês" textColor="var(--color-lk-gray-500)" delay={0.2} className="font-body text-[12px] pb-1" />
          </div>
          <DiaTextReveal text="Até 50 produtos" textColor="var(--color-lk-gray-500)" delay={0.3} className="font-body text-[12px] mb-4 block" />

          <a
            href={`${APP_URL}/cadastro?plano=basic`}
            onClick={(e) => e.stopPropagation()}
            className="block text-center font-display text-[13px] font-medium py-[10px] rounded-full transition-opacity hover:opacity-90 mb-4"
            style={{
              background: 'var(--color-lk-card)',
              border: '1px solid var(--color-lk-border-strong)',
              color: 'var(--color-lk-gray-400)',
            }}
          >
            Começar grátis
          </a>

          <div style={{ borderTop: '1px dashed var(--color-lk-border)', marginBottom: '1rem' }} />

          <ul className="space-y-2.5">
            {BASIC_FEATURES.map((feat, i) => (
              <motion.li
                key={feat}
                custom={i}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex items-center gap-2"
              >
                <span
                  style={{
                    width: 15, height: 15, borderRadius: '50%', flexShrink: 0,
                    border: '1px solid var(--color-lk-border-strong)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 8, color: 'var(--color-lk-orange)',
                    background: 'var(--color-lk-card)',
                  }}
                >
                  ✓
                </span>
                <span className="font-body text-[12.5px]" style={{ color: 'var(--color-lk-gray-400)' }}>
                  {feat}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* ── PRO ── */}
        <motion.div
          layout
          onClick={() => setActive('pro')}
          style={{
            flex: active === 'pro' ? '1.6 1 0%' : '0.8 1 0%',
            opacity: active === 'pro' ? 1 : 0.45,
            background: 'var(--color-lk-surface)',
            border: active === 'pro' ? '1px solid var(--color-lk-orange)' : '1px solid var(--color-lk-border)',
            borderRadius: 16,
            padding: '1.5rem',
            position: 'relative',
            cursor: 'pointer',
            overflow: 'hidden',
            transition: 'flex 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease',
          }}
        >
          {/* Borda pulsante */}
          {active === 'pro' && (
            <motion.div
              style={{
                position: 'absolute', inset: 0, borderRadius: 16,
                border: '1px solid var(--color-lk-orange)',
                pointerEvents: 'none',
              }}
              animate={{ opacity: [1, 0.15, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}

          {/* Badge */}
          <div
            style={{
              position: 'absolute', top: 0, right: '1.25rem',
              background: 'var(--color-lk-orange-dim)',
              borderLeft: '1px solid rgba(249,115,22,0.4)',
              borderRight: '1px solid rgba(249,115,22,0.4)',
              borderBottom: '1px solid rgba(249,115,22,0.4)',
              color: 'var(--color-lk-orange)',
              fontSize: 9, fontWeight: 700, letterSpacing: '0.06em',
              textTransform: 'uppercase', padding: '4px 10px',
              borderRadius: '0 0 6px 6px',
            }}
          >
            Mais popular
          </div>

          <DiaTextReveal text="PRO" textColor="var(--color-lk-orange)" className="font-body text-[10px] font-semibold uppercase tracking-[0.12em] mb-3 block" />

          <div className="flex items-baseline gap-1 mb-1">
            <DiaTextReveal text="R$" textColor="var(--color-lk-gray-100)" className="font-display text-[15px] font-medium" />
            <DiaTextReveal text="99" textColor="var(--color-lk-white)" delay={0.1} className="font-display font-bold leading-none tracking-[-0.03em]" style={{ fontSize: 40, fontVariantNumeric: 'tabular-nums' }} />
            <DiaTextReveal text="/mês" textColor="var(--color-lk-gray-500)" delay={0.2} className="font-body text-[12px] pb-1" />
          </div>
          <DiaTextReveal text="Produtos ilimitados" textColor="var(--color-lk-gray-500)" delay={0.3} className="font-body text-[12px] mb-4 block" />

          <a
            href={`${APP_URL}/cadastro?plano=pro`}
            onClick={(e) => e.stopPropagation()}
            className="block text-center font-display text-[13px] font-medium py-[10px] rounded-full transition-opacity hover:opacity-90 mb-4"
            style={{ background: 'var(--color-lk-white)', color: '#000' }}
          >
            Começar grátis
          </a>

          <div style={{ borderTop: '1px dashed var(--color-lk-border)', marginBottom: '1rem' }} />

          <p
            className="font-body text-[11px] font-semibold mb-3"
            style={{ color: 'var(--color-lk-gray-400)' }}
          >
            Tudo do Basic, mais:
          </p>

          <ul className="space-y-2.5">
            {PRO_FEATURES.map((feat, i) => (
              <motion.li
                key={feat}
                custom={i}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex items-center gap-2"
              >
                <span
                  style={{
                    width: 15, height: 15, borderRadius: '50%', flexShrink: 0,
                    border: '1px solid rgba(249,115,22,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 8, color: 'var(--color-lk-orange)',
                    background: 'var(--color-lk-card)',
                  }}
                >
                  ✓
                </span>
                <span className="font-body text-[12.5px]" style={{ color: 'var(--color-lk-gray-400)' }}>
                  {feat}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

      </div>

      <p
        className="font-body text-[13px] mt-8 flex items-center gap-2 max-w-3xl mx-auto"
        style={{ color: 'var(--color-lk-gray-600)' }}
      >
        <span className="text-[11px] font-bold" style={{ color: 'var(--color-lk-gray-600)' }}>✓</span>
        7 dias grátis em qualquer plano · Sem cartão de crédito · Cancele quando quiser
      </p>

    </section>
  )
}
