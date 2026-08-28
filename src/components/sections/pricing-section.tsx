'use client'

import { motion } from 'motion/react'
import { DiaTextReveal } from '@/components/ui/dia-text-reveal'
import { VerticalCutReveal } from '@/components/ui/vertical-cut-reveal'

// URL do app (auth/dashboard/vitrine) — fica em outro repositório.
// Placeholder até o domínio próprio existir; trocar via env var na Vercel quando mudar.
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://look-case.vercel.app'

const FEATURES = [
  'Produtos ilimitados',
  'Produto em destaque na vitrine',
  'Vitrine com carrinho de compras',
  'Analytics completo de visitas e pedidos',
  'Exportar relatórios (CSV/PDF)',
  'Avaliações de clientes na vitrine',
  'Sem marca Lookcase — a vitrine é 100% sua',
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

const revealVariants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

const cardRevealVariants = {
  hidden: { y: 28, filter: 'blur(12px)' },
  visible: (i: number) => ({
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export function PricingSection() {
  return (
    <section id="planos" className="px-5 lg:px-10 py-14 lg:py-20">

      <h2 className="font-display text-[28px] lg:text-[40px] font-medium tracking-[-0.03em] leading-[1.05] mb-2">
        <VerticalCutReveal text="Simples e transparente." />
      </h2>
      <motion.p
        custom={1}
        variants={revealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="font-body text-[15px] mb-10"
        style={{ color: 'rgba(23,13,6,0.82)' }}
      >
        Uma assinatura. Um valor fixo por mês. Sem surpresa na fatura — você sabe exatamente quanto vai pagar, sempre.
      </motion.p>

      <div className="max-w-lg mx-auto">
        <motion.div
          custom={0}
          variants={cardRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            background: 'var(--color-lk-surface)',
            border: '1px solid var(--color-lk-white)',
            borderRadius: 16,
            padding: '1.5rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Borda pulsante */}
          <motion.div
            style={{
              position: 'absolute', inset: 0, borderRadius: 16,
              border: '1px solid var(--color-lk-white)',
              pointerEvents: 'none',
            }}
            animate={{ opacity: [1, 0.15, 1] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          />

          <DiaTextReveal
            text="SUA ASSINATURA"
            textColor="var(--color-lk-gray-500)"
            className="font-body text-[10px] font-semibold uppercase tracking-[0.12em] mb-3 block"
          />

          <div className="flex items-baseline gap-1 mb-1">
            <DiaTextReveal text="R$" textColor="var(--color-lk-gray-100)" className="font-display text-[15px] font-medium" />
            <DiaTextReveal
              text="47,90"
              textColor="var(--color-lk-white)"
              delay={0.1}
              className="font-display font-bold leading-none tracking-[-0.03em]"
              style={{ fontSize: 40, fontVariantNumeric: 'tabular-nums' }}
            />
            <DiaTextReveal text="/mês" textColor="var(--color-lk-gray-500)" delay={0.2} className="font-body text-[12px] pb-1" />
          </div>

          <DiaTextReveal
            text="Sem limite de produtos. Sem taxa por venda."
            textColor="var(--color-lk-gray-500)"
            delay={0.3}
            className="font-body text-[12px] mb-3 block"
          />

          <motion.p
            custom={0}
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-body text-[13px] mb-5"
            style={{ color: 'var(--color-lk-gray-400)' }}
          >
            Cadastra a peça com foto real, publica na vitrine, e o pedido cai direto no seu WhatsApp — do jeito que sua cliente já compra de você.
          </motion.p>

          <a
            href={`${APP_URL}/cadastro`}
            className="block text-center font-display text-[13px] font-medium py-[10px] rounded-full transition-opacity hover:opacity-90 mb-2"
            style={{ background: 'var(--color-lk-white)', color: '#000' }}
          >
            Criar minha loja
          </a>

          <p
            className="font-body text-center text-[11px] mb-5"
            style={{ color: 'var(--color-lk-gray-500)' }}
          >
            Cancele quando quiser, direto no painel.
          </p>

          <div style={{ borderTop: '1px dashed var(--color-lk-border)', marginBottom: '1rem' }} />

          <ul className="space-y-2.5">
            {FEATURES.map((feat, i) => (
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

    </section>
  )
}
