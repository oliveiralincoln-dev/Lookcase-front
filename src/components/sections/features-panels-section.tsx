'use client'

import Link from 'next/link'
import { useRef, useState, useSyncExternalStore } from 'react'
import type { CSSProperties } from 'react'
import { useScroll, useMotionValueEvent } from 'motion/react'

// ─── Types ───────────────────────────────────────────────────────────────────

type StepMedia =
  | { kind: 'stat1'; line1: string; connector: string; line2: string; caption: string }
  | { kind: 'stat2'; value: string; caption: string }
  | { kind: 'chat';  title: string; caption: string }

type Step = {
  title: string
  description: string
  media: StepMedia
  cta?: {
    primaryLabel: string
    primaryHref: string
    secondaryLabel: string
    secondaryHref: string
  }
}

// ─── Data (oferta: preço fixo, sem taxa por venda, suporte) ──────────────────

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://look-case.vercel.app'

const STEPS: Step[] = [
  {
    title: 'Um único valor, sem surpresas.',
    description: 'Sem pacotes pra escolher. A mensalidade é a mesma com 10 ou com 1.000 peças na vitrine.',
    media: {
      kind: 'stat1',
      line1: '10 peças',
      connector: 'ou',
      line2: '1.000 peças',
      caption: 'mesma mensalidade',
    },
  },
  {
    title: 'Vendeu mais? A mensalidade não muda.',
    description: 'Sem taxa por venda. A cliente pede pelo WhatsApp e paga direto pra você — o dinheiro não passa pela Lookcase.',
    media: {
      kind: 'stat2',
      value: '0%',
      caption: 'de taxa da Lookcase por venda',
    },
  },
  {
    title: 'Suporte em português, direto no WhatsApp.',
    description: 'Time brasileiro. Respondemos em minutos, e por e-mail em até 24 horas.',
    media: {
      kind: 'chat',
      title: 'Ficou em dúvida em algo?',
      caption: 'Suporte pronto pra te atender.',
    },
    cta: {
      primaryLabel: 'Criar minha loja',
      primaryHref: `${APP_URL}/cadastro`,
      secondaryLabel: 'Tirar dúvidas no WhatsApp',
      secondaryHref: 'https://wa.me/5592981362063',
    },
  },
]

// Cor de fundo do painel de mídia em cada passo (laranja / pêssego / preto)
const MEDIA_BG = ['#F97316', '#FDE2C8', '#0A0A0A'] as const

// Tailwind 4 aplica translate-* via propriedade CSS `translate`, não `transform`; por isso a transição precisa ser em `translate`.
const PANEL_TRANSITION: CSSProperties = {
  transitionProperty: 'translate',
  transitionDuration: '700ms',
  transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
}

// ─── Detecção de prefers-reduced-motion via useSyncExternalStore ─────────────
// getServerSnapshot retorna false para evitar mismatch de hidratação.

function subscribe(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  mq.addEventListener('change', callback)
  return () => mq.removeEventListener('change', callback)
}

function getSnapshot(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function getServerSnapshot(): boolean {
  return false
}

// ─── Painel de mídia tipográfica ──────────────────────────────────────────────

function MediaContent({ media }: { media: StepMedia }) {
  if (media.kind === 'stat1') {
    return (
      <>
        <span className="font-display text-[34px] lg:text-[46px] font-medium tracking-[-0.03em] leading-none tabular-nums text-lk-white">
          {media.line1}
        </span>
        <span className="font-body text-[13px] text-lk-gray-100 mt-3 mb-2">
          {media.connector}
        </span>
        <span className="font-display text-[34px] lg:text-[46px] font-medium tracking-[-0.03em] leading-none tabular-nums text-lk-white">
          {media.line2}
        </span>
        <span className="font-body text-[13px] lg:text-[14px] text-lk-gray-100 mt-4">
          {media.caption}
        </span>
      </>
    )
  }
  if (media.kind === 'stat2') {
    return (
      <>
        <span className="font-display text-[34px] lg:text-[46px] font-medium tracking-[-0.04em] leading-none tabular-nums text-lk-white">
          {media.value}
        </span>
        <span className="font-body text-[14px] lg:text-[16px] text-lk-gray-100 mt-4 max-w-[220px]">
          {media.caption}
        </span>
      </>
    )
  }
  // kind === 'chat' — fundo preto; lk-base/50 ≈ 5,1:1 sobre #0A0A0A
  return (
    <>
      <span aria-hidden="true" className="font-display text-[34px] lg:text-[46px] font-medium tracking-[-0.04em] leading-none text-lk-orange mb-4">?</span>
      <span className="font-display text-[22px] lg:text-[28px] font-medium tracking-[-0.02em] leading-[1.25] text-lk-base">
        {media.title}
      </span>
      <span className="font-body text-[14px] lg:text-[15px] text-lk-base/50 mt-3">
        {media.caption}
      </span>
    </>
  )
}

// ─── Versão estática (prefers-reduced-motion) ────────────────────────────────

function StaticFeaturesPanels() {
  return (
    <section id="como-funciona" className="px-5 lg:px-10 py-16 lg:py-24">
      <div className="max-w-[1200px] mx-auto space-y-16">
        {STEPS.map((step, index) => (
          <div
            key={step.title}
            className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-14"
          >
            {/* Texto */}
            <div className="lg:w-[420px] lg:flex-shrink-0 space-y-3">
              <h2 className="font-display text-[34px] lg:text-[46px] font-medium tracking-[-0.03em] leading-[1.05] text-lk-white">
                {step.title}
              </h2>
              <p className="font-body text-[15px] lg:text-[16px] leading-[1.75] text-lk-gray-400 max-w-sm">
                {step.description}
              </p>
              {step.cta && (
                <div className="flex flex-col items-start gap-3 pt-3">
                  <Link
                    href={step.cta.primaryHref}
                    className="inline-flex items-center gap-2 font-semibold text-[15px] rounded-full px-6 py-3.5 transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F97316]"
                    style={{ background: '#0A0A0A', color: '#FFFFFF' }}
                  >
                    {step.cta.primaryLabel} <span aria-hidden="true">→</span>
                  </Link>
                  <a
                    href={step.cta.secondaryHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-[13px] text-lk-gray-500 hover:underline min-h-[44px] flex items-center"
                  >
                    {step.cta.secondaryLabel}
                  </a>
                </div>
              )}
            </div>

            {/* Mídia tipográfica */}
            <div
              className="flex-1 flex flex-col items-start justify-center rounded-[24px] overflow-hidden min-h-[300px] p-8"
              style={{ background: MEDIA_BG[index] }}
            >
              <MediaContent media={step.media} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Camada de cada passo (animada) ──────────────────────────────────────────

type StepLayerProps = {
  step: Step
  index: number
  activeStep: number
}

function StepLayer({ step, index, activeStep }: StepLayerProps) {
  const isActive = index === activeStep
  // Passos após o ativo ficam fora da tela; passos antes ficam visíveis
  // mas cobertos pelas camadas de z-index maior.
  const isHidden = index > activeStep

  // Passo 02 (index 1): mídia à esquerda no desktop, texto à direita.
  const swapDesktop = index === 1

  // Classes de translate escritas como strings literais completas para o
  // scanner do Tailwind detectar todas as variantes sem interpolação.
  //
  // Mobile (< lg):
  //   Linha de cima (texto) → entra por baixo:  translate-y-full
  //   Linha de baixo (mídia) → entra por cima: -translate-y-full
  //
  // Desktop (lg+):
  //   Coluna esquerda → entra por baixo:  translate-y-full
  //   Coluna direita  → entra por cima:  -translate-y-full
  //
  // No passo 02 (swapDesktop): texto fica à direita no desktop → entra por cima
  //   no desktop e por baixo no mobile. Mídia fica à esquerda no desktop →
  //   entra por baixo no desktop e por cima no mobile.
  const textHiddenClass: string = swapDesktop
    ? 'translate-y-full lg:-translate-y-full'
    : 'translate-y-full'
  const mediaHiddenClass: string = swapDesktop
    ? '-translate-y-full lg:translate-y-full'
    : '-translate-y-full'

  const textTranslate = isHidden ? textHiddenClass : 'translate-y-0'
  const mediaTranslate = isHidden ? mediaHiddenClass : 'translate-y-0'

  return (
    <div
      className="absolute inset-0"
      style={{ zIndex: index }}
      aria-hidden={!isActive}
      inert={!isActive}
    >
      {/* Mobile: 2 linhas (54 / 46 %)  |  Desktop: 2 colunas */}
      <div className="h-full grid grid-rows-[54%_46%] lg:grid-rows-[100%] lg:grid-cols-2">

        {/* ── Painel de texto ──────────────────────────────────────────── */}
        <div className={`overflow-hidden${swapDesktop ? ' lg:order-2' : ''}`}>
          <div
            className={`h-full flex flex-col justify-center pt-20 px-8 lg:px-14 ${textTranslate}`}
            style={{ background: 'var(--color-lk-base)', ...PANEL_TRANSITION }}
          >
            <h2 className="font-display text-[28px] lg:text-[46px] font-medium tracking-[-0.03em] leading-[1.05] text-lk-white mb-3 lg:mb-4">
              {step.title}
            </h2>
            <p className="font-body text-[15px] lg:text-[16px] leading-[1.6] lg:leading-[1.75] text-lk-gray-400 max-w-sm">
              {step.description}
            </p>

            {step.cta && (
              <div className="flex flex-col items-start gap-3 mt-4 lg:mt-6">
                <Link
                  href={step.cta.primaryHref}
                  className="inline-flex items-center gap-2 font-semibold text-[15px] rounded-full px-6 py-3.5 transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F97316]"
                  style={{ background: '#0A0A0A', color: '#FFFFFF' }}
                >
                  {step.cta.primaryLabel} <span aria-hidden="true">→</span>
                </Link>
                <a
                  href={step.cta.secondaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[13px] text-lk-gray-500 hover:underline min-h-[44px] flex items-center"
                >
                  {step.cta.secondaryLabel}
                </a>
              </div>
            )}

            {/* Pontinhos de progresso — decorativos; ocultos em mobile para economizar espaço */}
            <div className="hidden lg:flex items-center gap-2 mt-8" aria-hidden>
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`rounded-full transition-all duration-300 ${
                    i === index
                      ? 'w-6 h-2 bg-lk-orange'
                      : 'w-2 h-2 bg-lk-border'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Painel de mídia ──────────────────────────────────────────── */}
        <div className={`overflow-hidden${swapDesktop ? ' lg:order-1' : ''}`}>
          <div
            className={`h-full flex flex-col items-start justify-center p-6 lg:p-10 ${mediaTranslate}`}
            style={{ background: MEDIA_BG[index], ...PANEL_TRANSITION }}
          >
            <MediaContent media={step.media} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Implementação animada ────────────────────────────────────────────────────

function AnimatedPanels() {
  const rootRef = useRef<HTMLElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ['start start', 'end end'],
  })

  // Converte o progresso contínuo no índice do passo ativo.
  // Só atualiza o estado quando o índice muda (evita re-renders desnecessários).
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = Math.min(STEPS.length - 1, Math.floor(value * STEPS.length))
    setActiveStep((prev) => (prev === next ? prev : next))
  })

  return (
    <section
      ref={rootRef}
      id="como-funciona"
      className="relative"
      style={{ height: '300dvh' }}
    >
      {/* Wrapper sticky: fixa a tela de visualização enquanto o scroll percorre os 300dvh */}
      <div
        className="sticky top-0 h-dvh overflow-hidden"
        style={{ background: 'var(--color-lk-base)' }}
      >
        {STEPS.map((step, index) => (
          <StepLayer
            key={step.title}
            step={step}
            index={index}
            activeStep={activeStep}
          />
        ))}
      </div>
    </section>
  )
}

// ─── Exportação pública ───────────────────────────────────────────────────────

export function FeaturesPanelsSection() {
  const prefersReduced = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  if (prefersReduced) return <StaticFeaturesPanels />
  return <AnimatedPanels />
}
