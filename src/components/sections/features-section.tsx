'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import type { MotionValue } from 'motion/react'

const steps = [
  {
    number: '01',
    title: 'Crie sua conta',
    description: 'Email, nome da loja e plano. Menos de 2 minutos, sem cartão para começar.',
    tag: 'Cadastro',
    chips: ['Sem cartão de crédito', '7 dias grátis', 'Menos de 2 min'],
  },
  {
    number: '02',
    title: 'Monte sua vitrine',
    description: 'Adicione produtos, fotos e preços. Personalize cores e nome da sua loja do seu jeito.',
    tag: 'Configuração',
    chips: ['Produtos ilimitados', 'Fotos e descrições', 'Sua identidade'],
  },
  {
    number: '03',
    title: 'Compartilhe e venda',
    description: 'Sua vitrine tem um link único. Suas clientes chegam, escolhem e pedem.',
    tag: 'Vendas',
    chips: ['Link exclusivo', 'Pedidos via WhatsApp', 'Sem taxas extras'],
  },
]

const glowBorder = {
  borderTop: '1px solid rgba(249,115,22,0.25)',
  borderRight: '1px solid rgba(255,255,255,0.06)',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
  borderLeft: '1px solid rgba(255,255,255,0.06)',
}

function StepCard({
  step,
  index,
  progress,
}: {
  step: (typeof steps)[0]
  index: number
  progress: MotionValue<number>
}) {
  const total = steps.length
  const isLast = index === total - 1
  const scale = useTransform(progress, [index / total, (index + 1) / total], [1, 0.93])
  const opacity = useTransform(progress, [(index + 0.5) / total, (index + 1) / total], [1, 0.55])

  return (
    <div
      className="sticky"
      style={{ top: `${88 + index * 18}px`, zIndex: 10 + index }}
    >
      <motion.div
        style={
          isLast
            ? { ...glowBorder }
            : { scale, opacity, transformOrigin: 'top center', ...glowBorder }
        }
        className="mx-auto max-w-2xl rounded-[20px] bg-lk-card overflow-hidden"
      >
        <div className="relative flex flex-col gap-8 px-8 py-10 lg:px-12 lg:py-12 min-h-[380px]">

          {/* Glow laranja no topo */}
          <div
            aria-hidden
            className="pointer-events-none select-none absolute inset-x-0 top-0 h-[90px]"
            style={{
              background:
                'radial-gradient(ellipse at 50% -10%, rgba(249,115,22,0.13) 0%, transparent 80%)',
            }}
          />

          {/* Tag */}
          <span
            className="relative inline-flex w-fit items-center rounded-full px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.12em] text-lk-gray-600"
            style={{ border: '1px solid rgba(255,255,255,0.07)' }}
          >
            {step.tag}
          </span>

          {/* Título e descrição */}
          <div className="relative space-y-3">
            <h3 className="font-display text-[34px] lg:text-[46px] font-medium tracking-[-0.03em] leading-[1.05] text-lk-white">
              {step.title}
            </h3>
            <p className="font-body text-[15px] lg:text-[16px] leading-[1.75] text-lk-gray-400 max-w-sm">
              {step.description}
            </p>
          </div>

          {/* Chips + contador */}
          <div className="relative mt-auto flex flex-wrap items-center gap-2">
            {step.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-md px-2.5 py-1 font-body text-[11px] text-lk-gray-500"
                style={{ border: '1px solid rgba(255,255,255,0.07)' }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      ref={sectionRef}
      id="como-funciona"
      className="relative px-5 lg:px-10"
      style={{ minHeight: '220vh' }}
    >
      <div className="pointer-events-none sticky top-0 z-50 pt-14 pb-6 lg:pt-20">
        <p className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-lk-gray-600 flex items-center gap-2">
          <span className="block h-px w-[18px] bg-lk-gray-600" />
          Como funciona
        </p>
      </div>

      {steps.map((step, i) => (
        <StepCard
          key={step.number}
          step={step}
          index={i}
          progress={scrollYProgress}
        />
      ))}
    </section>
  )
}
