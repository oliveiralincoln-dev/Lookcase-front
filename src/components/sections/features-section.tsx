'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react'
import type { MotionValue } from 'motion/react'
import { Iphone } from '@/components/ui/iphone'
import { ProductMarquee } from '@/components/ui/product-marquee'

const steps = [
  {
    number: '01',
    title: 'Crie sua conta',
    description: 'Email, nome da loja e plano. Menos de 2 minutos e sua loja está no ar.',
    image: '/como-funciona/crie-sua-conta.jpeg' as string | null,
    video: null as string | null,
    marquee: false,
  },
  {
    number: '02',
    title: 'Monte sua vitrine',
    description: 'Adicione produtos, fotos e preços. Personalize cores e nome da sua loja do seu jeito.',
    image: null as string | null,
    video: '/como-funciona/monte-vitrine.mp4' as string | null,
    marquee: false,
  },
  {
    number: '03',
    title: 'Compartilhe e venda',
    description: 'Sua vitrine tem um link único. Suas clientes chegam, escolhem e pedem.',
    image: null as string | null,
    video: null as string | null,
    marquee: true,
  },
]

const glowBorder = {
  borderTop: '1px solid rgba(249,115,22,0.45)',
  borderRight: '1px solid rgba(10,10,10,0.07)',
  borderBottom: '1px solid rgba(10,10,10,0.07)',
  borderLeft: '1px solid rgba(10,10,10,0.07)',
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
  const prefersReducedMotion = useReducedMotion()
  const hasMedia = Boolean(step.image || step.video || step.marquee)
  const spacerRef = useRef<HTMLDivElement>(null)

  const scale = useTransform(progress, [index / total, (index + 1) / total], [1, 0.93])

  const { scrollYProgress: enterProgress } = useScroll({
    target: spacerRef,
    offset: ['start 130%', 'end start'],
  })
  const smooth = useSpring(enterProgress, { stiffness: 70, damping: 24, mass: 0.6 })
  const phoneX = useTransform(smooth, [0, 0.5], [180, 0])
  const phoneOpacity = useTransform(smooth, [0, 0.3], [0, 1])

  const marqueeY = useTransform(smooth, [0, 0.5], [220, 0])
  const marqueeOpacity = useTransform(smooth, [0, 0.3], [0, 1])

  return (
    <>
      <div
        className="sticky"
        style={{ top: `${88 + index * 18}px`, zIndex: 10 + index }}
      >
        <motion.div
          style={{
            scale,
            transformOrigin: 'top center',
            willChange: 'transform',
            ...glowBorder,
            backgroundColor: 'var(--color-lk-card)',
            boxShadow: '0 -30px 60px -24px rgba(10,10,10,0.18)',
          }}
          className="mx-auto max-w-[1200px] rounded-[32px] overflow-hidden"
        >
          <div
            className={
              hasMedia
                ? 'relative flex flex-col lg:flex-row lg:items-center gap-10 px-8 py-12 lg:px-14 lg:py-14 min-h-[460px] lg:min-h-[520px]'
                : 'relative flex flex-col gap-8 px-8 py-10 lg:px-14 lg:py-14 min-h-[460px] lg:min-h-[520px]'
            }
          >

            <div
              aria-hidden
              className="pointer-events-none select-none absolute inset-x-0 top-0 h-[90px]"
              style={{
                background:
                  'radial-gradient(ellipse at 50% -10%, rgba(249,115,22,0.13) 0%, transparent 80%)',
              }}
            />

            <div className={hasMedia ? 'relative flex flex-col gap-8 lg:w-[420px] lg:flex-shrink-0' : 'contents'}>

              <div className="relative space-y-3">
                <h3 className="font-display text-[34px] lg:text-[46px] font-medium tracking-[-0.03em] leading-[1.05] text-lk-white">
                  {step.title}
                </h3>
                <p className="font-body text-[15px] lg:text-[16px] leading-[1.75] text-lk-gray-400 max-w-sm">
                  {step.description}
                </p>
              </div>

            </div>

            {hasMedia && (
              <div className="relative flex-1 flex justify-center lg:self-center">
                {step.video ? (
                  <div
                    className="relative rounded-[24px] overflow-hidden aspect-square"
                    style={{
                      width: '100%',
                      maxWidth: 340,
                    }}
                  >
                    <video
                      src={step.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : step.marquee ? (
                  <motion.div
                    className="relative rounded-[24px] overflow-hidden flex items-center w-full"
                    style={
                      prefersReducedMotion
                        ? { maxWidth: 460, height: 300, background: '#F4F4F2' }
                        : { maxWidth: 460, height: 300, background: '#F4F4F2', y: marqueeY, opacity: marqueeOpacity, willChange: 'transform' }
                    }
                  >
                    <ProductMarquee />
                  </motion.div>
                ) : (
                  <motion.div
                    style={
                      prefersReducedMotion
                        ? { width: 220 }
                        : { width: 220, x: phoneX, opacity: phoneOpacity, willChange: 'transform' }
                    }
                  >
                    <Iphone src={step.image!} />
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <div ref={spacerRef} aria-hidden className="h-[55vh] pointer-events-none" />
    </>
  )
}

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Fundo por cross-fade de camadas: animar `opacity` é composited (a GPU só mistura
  // camadas já rasterizadas), enquanto animar `backgroundColor` forçava repaint da
  // section inteira a cada frame — causa confirmada do tremor no Android.
  // Mesma paleta e mesmos breakpoints de antes; cada camada acende/apaga sobre o
  // MESMO scrollYProgress. Base #0A0A0A sempre opaca; as demais entram por cima.
  const orangeMid = useTransform(scrollYProgress, [0, 0.2, 0.38, 0.55, 0.7, 1], [0, 1, 1, 1, 0, 0])
  const orangeBright = useTransform(scrollYProgress, [0, 0.2, 0.38, 0.55, 0.7, 1], [0, 0, 1, 0, 0, 0])
  const black = useTransform(scrollYProgress, [0, 0.2, 0.38, 0.55, 0.7, 1], [0, 0, 0, 0, 1, 1])

  return (
    <motion.section
      ref={sectionRef}
      id="como-funciona"
      className="relative px-5 lg:px-10"
    >
      {/* Camadas de fundo — IRMÃS dos cards (nunca pai). Ficam em position:absolute,
          fora do fluxo, então não interferem no sticky-stack. zIndex 0 as mantém
          sob os cards (que usam zIndex 10 + index). */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--color-lk-base)' }} />
        <motion.div style={{ position: 'absolute', inset: 0, backgroundColor: '#FDE2C8', opacity: orangeMid }} />
        <motion.div style={{ position: 'absolute', inset: 0, backgroundColor: '#F97316', opacity: orangeBright }} />
        <motion.div style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--color-lk-base)', opacity: black }} />
      </div>

      {steps.map((step, i) => (
        <StepCard
          key={step.number}
          step={step}
          index={i}
          progress={scrollYProgress}
        />
      ))}
    </motion.section>
  )
}
