'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import RotatingText from '@/components/ui/rotating-text'
import { Footer } from '@/components/footer'
import { Marquee, MarqueeCard } from '@/components/ui/marquee'
import { Link2, Percent, Zap, Package, Share2, Palette, Shield, ClipboardList, Layers, Headphones, Infinity, RefreshCw, Shirt, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react'
import { AnimatedList } from '@/components/ui/animated-list'
import { FeaturesSection } from '@/components/sections/features-section'
import { PromiseSection } from '@/components/sections/promise-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { motion, useReducedMotion, AnimatePresence, useScroll, useTransform, useSpring, useMotionTemplate } from 'motion/react'

// URL do app (auth/dashboard/vitrine) — fica em outro repositório.
// Placeholder até o domínio próprio existir; trocar via env var na Vercel quando mudar.
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://look-case.vercel.app'

const FAQ_ITEMS = [
  {
    q: 'Preciso saber mexer em tecnologia?',
    a: 'Não. Tudo acontece no painel visual da Lookcase, sem curva de aprendizado — poucos cliques pra cadastrar produto, configurar a loja e acompanhar pedidos.',
  },
  {
    q: 'Minha cliente precisa baixar algum aplicativo?',
    a: 'Não. A vitrine abre no navegador do celular normalmente. Sem download, sem cadastro, sem senha. Ela acessa, escolhe e manda mensagem pelo WhatsApp que já tem.',
  },
  {
    q: 'Como funciona o pagamento das vendas?',
    a: 'Você combina direto com a cliente pelo WhatsApp — Pix, dinheiro ou cartão na entrega, do jeito que preferir. O dinheiro cai na sua conta, sem passar pela Lookcase e sem taxa por venda.',
  },
  {
    q: 'E se eu não gostar?',
    a: 'Cancela quando quiser, direto no painel, em menos de 1 minuto. Sem ligar pra ninguém, sem justificar, sem multa.',
  },
  {
    q: 'Quantos produtos posso cadastrar?',
    a: 'Quantos você quiser — não tem limite. O cadastro é feito pelo painel, com foto real do produto, e já entra na sua vitrine na hora.',
  },
]

const notifications = [
  { icon: '🛍️', title: 'Novo pedido',         desc: 'Vestido Midi P · R$ 189',    time: 'agora' },
  { icon: '👤', title: 'Nova visita',          desc: 'Ana Lima · via Instagram',   time: '1m'    },
  { icon: '⭐', title: 'Nova avaliação',        desc: 'Vestido Midi · 5 estrelas',  time: '1m'    },
  { icon: '🛍️', title: 'Novo pedido',         desc: 'Conjunto Linho M · R$ 234',  time: '3m'    },
  { icon: '👤', title: 'Nova visita',          desc: 'Carla M. · via link bio',    time: '5m'    },
  { icon: '🛍️', title: 'Novo pedido',         desc: 'Saia Plissada G · R$ 142',   time: '8m'    },
  { icon: '📦', title: 'Pedido enviado',       desc: 'Ana Lima · Correios',         time: '12m'   },
]

function NotificationItem({ icon, title, desc, time }: {
  icon: string; title: string; desc: string; time: string
}) {
  return (
    <div className="flex items-center gap-3 px-3 py-[10px] mx-[6px] mb-[5px] bg-lk-card border border-lk-border rounded-xl">
      <div className="w-8 h-8 rounded-lg bg-lk-surface border border-lk-border flex items-center justify-center text-[14px] flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-body text-[11px] font-semibold text-lk-gray-100 leading-none mb-[3px]">{title}</p>
        <p className="font-body text-[10px] text-lk-gray-600 truncate">{desc}</p>
      </div>
      <span className="font-body text-[9px] text-lk-gray-600 flex-shrink-0">{time}</span>
    </div>
  )
}

function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  const toggleItem = (i: number) => {
    setOpenItems(prev => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <section id="faq" className="px-5 lg:px-10 py-14 lg:py-20">

      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-[28px] lg:text-[40px] font-medium tracking-[-0.03em] leading-[1.05] mb-12 text-center">
          Perguntas frequentes.
        </h2>

        <div className="flex flex-col gap-2">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden"
              style={{
                background: 'var(--color-lk-card)',
                border: openItems.has(i)
                  ? '1px solid rgba(249,115,22,0.25)'
                  : '1px solid var(--color-lk-border)',
                transition: 'border-color 0.2s ease',
              }}
            >
              <button
                onClick={() => toggleItem(i)}
                className="w-full flex items-center justify-between gap-6 px-5 py-[18px] text-left"
              >
                <p
                  className="font-display text-[15px] font-medium tracking-[-0.01em] transition-colors duration-200"
                  style={{ color: openItems.has(i) ? 'var(--color-lk-white)' : 'var(--color-lk-gray-100)' }}
                >
                  {item.q}
                </p>

                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    border: openItems.has(i)
                      ? '1px solid rgba(249,115,22,0.35)'
                      : '1px solid var(--color-lk-border-strong)',
                    color: openItems.has(i) ? 'var(--color-lk-orange)' : 'var(--color-lk-gray-500)',
                    transform: openItems.has(i) ? 'rotate(45deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease, border-color 0.2s ease, color 0.2s ease',
                  }}
                >
                  <span className="text-[17px] leading-none font-light">+</span>
                </div>
              </button>

              <div
                className="overflow-hidden"
                style={{
                  maxHeight: openItems.has(i) ? '480px' : '0px',
                  opacity: openItems.has(i) ? 1 : 0,
                  transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease',
                }}
              >
                <p
                  className="font-body text-[13.5px] leading-[1.7] px-5 pb-5 text-center"
                  style={{ color: 'var(--color-lk-gray-500)' }}
                >
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}

function AnimatedListLoop({
  items,
  delay,
}: {
  items: typeof notifications
  delay: number
}) {
  const [cycleKey, setCycleKey] = React.useState(0)

  React.useEffect(() => {
    const total = items.length * delay + 1000
    const timer = setTimeout(() => setCycleKey((k) => k + 1), total)
    return () => clearTimeout(timer)
  }, [cycleKey, items.length, delay])

  return (
    <AnimatedList key={cycleKey} delay={delay}>
      {items.map((item, i) => (
        <NotificationItem key={i} {...item} />
      ))}
    </AnimatedList>
  )
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const galleryContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
}

const galleryCell = {
  hidden: { opacity: 0, scale: 0.94, y: 10, filter: 'blur(8px)' },
  visible: { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
}

const promiseSlides = [
  { text: 'A vitrine que a sua marca sempre mereceu.',          bg: '#F1EEE6', color: '#3A362E' },
  { text: 'Cole no Instagram, no WhatsApp, em qualquer lugar.', bg: '#FAFAF8', color: '#1A1A18' },
  { text: 'Cada peça, com foto e preço em segundos.',           bg: '#FCE8D8', color: '#7A3B12' },
  { text: 'Nenhum pedido se perde no meio da conversa.',        bg: '#E7EBEC', color: '#2B3436' },
  { text: 'Sua loja com cara de marca grande.',                 bg: '#E8ECE5', color: '#33402F' },
  { text: 'Do clique à compra, tudo num toque.',                bg: '#EFEAE4', color: '#4A4038' },
]

const blurFadeIn = {
  hidden: { opacity: 0, filter: 'blur(6px)' },
  visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const } },
}

function CTAFinalSection() {
  const shouldReduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 26, mass: 0.5 })

  // Luz laranja: nasce pequena e distante, cresce ate cobrir a tela
  const glowSize = useTransform(smooth, [0, 0.55, 1], ['16vmax', '90vmax', '260vmax'])
  const glowBlurValue = useTransform(smooth, [0, 0.7, 1], [90, 60, 0])
  const glowBlur = useMotionTemplate`blur(${glowBlurValue}px)`
  const glowRadius = useTransform(smooth, [0, 0.78, 1], ['50%', '50%', '0%'])

  // Texto entra cedo, e inverte de claro pra escuro quando o fundo vira laranja solido
  const contentOpacity = useTransform(smooth, [0, 0.35], [0, 1])
  const contentY = useTransform(smooth, [0, 0.35], [18, 0])
  const headingColor = useTransform(smooth, [0.72, 0.86], ['#0A0A0A', '#1A1A18'])
  const subColor = useTransform(smooth, [0.72, 0.86], ['rgba(10,10,10,0.62)', 'rgba(26,26,24,0.72)'])
  const btnBg = useTransform(smooth, [0.72, 0.86], ['#0A0A0A', '#1A1A18'])
  const btnColor = useTransform(smooth, [0.72, 0.86], ['#FFFFFF', '#FFFFFF'])

  return (
    <div ref={containerRef} style={{ height: '220vh', position: 'relative' }}>
      <section
        className="px-5 lg:px-10 text-center relative overflow-hidden flex items-center justify-center"
        style={{
          background: 'var(--color-lk-base)',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 1,
        }}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none"
          style={
            shouldReduceMotion
              ? {
                  position: 'absolute',
                  inset: 0,
                  background: '#F97035',
                }
              : {
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  x: '-50%',
                  y: '-50%',
                  width: glowSize,
                  height: glowSize,
                  background: '#F97035',
                  borderRadius: glowRadius,
                  filter: glowBlur,
                  willChange: 'width, height, filter',
                }
          }
        />

        <motion.div
          className="relative z-10 max-w-2xl mx-auto"
          style={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: contentOpacity, y: contentY }
          }
        >
          <motion.h2
            className="font-display text-[36px] lg:text-[56px] font-medium tracking-[-0.04em] leading-[1.05] mb-5"
            style={shouldReduceMotion ? { color: '#1A1A18' } : { color: headingColor }}
          >
            Sua vitrine está esperando por você.
          </motion.h2>

          <motion.p
            className="font-body text-[15px] leading-[1.65] mb-8 max-w-[400px] mx-auto"
            style={shouldReduceMotion ? { color: 'rgba(26,26,24,0.72)' } : { color: subColor }}
          >
            Um link com a sua cara, os seus produtos e a sua marca. Lookcase cuida do resto.
          </motion.p>

          <motion.div
            className="inline-block"
            style={shouldReduceMotion ? { background: '#1A1A18', borderRadius: 999 } : { background: btnBg, borderRadius: 999 }}
          >
            <Link href={`${APP_URL}/cadastro`} className="block">
              <motion.span
                className="inline-flex items-center gap-2 font-display text-[15px] lg:text-[16px] font-semibold px-10 py-[16px] rounded-full hover:opacity-90 transition-opacity tracking-[-0.01em]"
                style={shouldReduceMotion ? { color: '#FFFFFF' } : { color: btnColor }}
              >
                Criar minha loja →
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}

// ============================================================
// HERO — "fita que torce" (spec: docs/superpowers/specs/2026-11-13-hero-fita-design.md)
// Duas curvas se desenham e se cruzam duas vezes. Só laranja e preto: as áreas
// entre as curvas trocam de cor a cada cruzamento.
// Coordenadas em viewBox 160x100, esticado ao hero (preserveAspectRatio none).
// ============================================================

type RibbonGeometry = {
  /** Curva A — divisão inicial laranja (acima) / preto (abaixo) */
  a: string
  /** Curva B — cruza A duas vezes; vira a borda final entre as cores */
  b: string
  /** Amplitude da onda (unidades do viewBox; 100 = altura do hero) */
  wave: number
}

// As curvas ficam no rodapé do hero, abaixo do texto e dos botões.
const RIBBON_DESKTOP: RibbonGeometry = {
  a: 'M0,77.5 C24,80 40,80.5 56,79.2 C80,77.1 92,70.8 104,66.6 C116,62.4 132,60.3 160,59.5',
  b: 'M0,82.6 C16,82.6 24,80 34,77.9 C52,74.2 70,71.6 86,68.3 C100,65.3 112,62.4 126,61.6 C138,61.1 150,62 160,62.8',
  wave: 1.1,
}

const RIBBON_MOBILE: RibbonGeometry = {
  a: 'M0,89.3 C20,89.7 34,89 46,87.1 C62,84.4 70,80.6 84,78.3 C100,76 130,75.5 160,75.5',
  b: 'M0,91 C14,91.2 24,90.1 34,88.6 C46,86.3 52,82.9 60,80.6 C70,77.9 84,76 104,75.3 C124,74.5 144,75.7 160,77.2',
  wave: 0.7,
}

const ORANGE = '#F97316'
const BLACK = '#0A0A0A'
const WHITE = '#FFFFFF'

/** Região acima de uma curva que começa em x=0 e termina em x=160 */
const regionAbove = (d: string) => `M0,-10 L${d.slice(1)} L160,-10 Z`
/** Região abaixo de uma curva (vai além do rodapé para cobrir a subida da entrada) */
const regionBelow = (d: string) => `M0,130 L${d.slice(1)} L160,130 Z`

// Onda sutil: cada ponto da curva sobe e desce num seno que viaja da esquerda
// para a direita. Gera quadros com a mesma estrutura de comandos, para o SVG
// interpolar o atributo `d` (SMIL) sem trocar o formato do path.
const WAVE_FRAMES = 12
function waveFrames(d: string, amp: number, phaseOffset: number): string[] {
  return Array.from({ length: WAVE_FRAMES + 1 }, (_, i) => {
    const phase = (i / WAVE_FRAMES) * Math.PI * 2 + phaseOffset
    return d.replace(/(-?\d+\.?\d*),(-?\d+\.?\d*)/g, (_m, xs: string, ys: string) => {
      const x = parseFloat(xs)
      const y = parseFloat(ys) + amp * Math.sin((x / 160) * Math.PI * 2 * 1.25 - phase)
      return `${xs},${y.toFixed(2)}`
    })
  })
}

function WavePath({
  frames,
  animate,
  ...props
}: { frames: string[]; animate: boolean } & React.SVGProps<SVGPathElement>) {
  return (
    <path d={frames[0]} {...props}>
      {animate && <animate attributeName="d" dur="9s" repeatCount="indefinite" values={frames.join(';')} />}
    </path>
  )
}

// Laranja acima das linhas, preto abaixo e branco nos espaços que os cruzamentos
// criam entre elas (revelados por uma varredura da esquerda para a direita).
// As linhas são brancas e ondulam devagar, sempre abaixo do texto.
function RibbonBackground({ geo, id, className }: { geo: RibbonGeometry; id: string; className: string }) {
  const reduceMotion = useReducedMotion()
  const wave = !reduceMotion

  const aFrames = waveFrames(geo.a, geo.wave, 0)
  const bFrames = waveFrames(geo.b, geo.wave, Math.PI / 2)
  const belowA = aFrames.map(regionBelow)
  const lens = aFrames.map((a, i) => `${regionAbove(a)} ${regionAbove(bFrames[i])}`)

  return (
    <svg
      aria-hidden
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      viewBox="0 0 160 100"
      preserveAspectRatio="none"
    >
      <defs>
        <clipPath id={`${id}-lens`}>
          <WavePath frames={lens} animate={wave} clipRule="evenodd" />
        </clipPath>
        <mask id={`${id}-wipe`} maskUnits="userSpaceOnUse" x="0" y="-10" width="160" height="120">
          <rect className="lk-hero-wipe" x="0" y="-10" width="160" height="120" fill="#fff" />
        </mask>
      </defs>

      <rect width="160" height="100" fill={ORANGE} />

      {/* A onda inteira (preto, branco e linhas) sobe do rodapé e aparece suavemente */}
      <g className="lk-hero-rise">
        {/* Preto abaixo da curva A */}
        <WavePath frames={belowA} animate={wave} fill={BLACK} />

        {/* Espaços entre as linhas (gerados pelos cruzamentos) ficam brancos, da esquerda para a direita */}
        <g clipPath={`url(#${id}-lens)`} mask={`url(#${id}-wipe)`}>
          <rect x="0" y="-10" width="160" height="130" fill={WHITE} />
        </g>

        {/* Linhas brancas se desenhando e depois ondulando */}
        <WavePath frames={aFrames} animate={wave} className="lk-hero-line lk-hero-line-a" pathLength={1} fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
        <WavePath frames={bFrames} animate={wave} className="lk-hero-line lk-hero-line-b" pathLength={1} fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
      </g>
    </svg>
  )
}

const HERO_TEXTS = [
  'Catálogo organizado.',
  'Pedidos sem bagunça.',
  'Sua marca, do seu jeito.',
  'Direto onde você já vende.',
]

// O conteúdo entra junto com a onda, linha a linha
const heroContentContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.45 } },
}

// Mesmo padrão de blur + fade do site, mas cada linha é revelada da esquerda
// para a direita (no sentido da varredura da onda). O recorte tem folga para
// não cortar sombra, acentos e o brilho do botão.
const heroSlideIn = {
  hidden: { opacity: 0, x: -28, filter: 'blur(6px)', clipPath: 'inset(-30% 100% -30% -10%)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    clipPath: 'inset(-30% -10% -30% -10%)',
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
  },
}

function Hero() {
  const reduceMotion = useReducedMotion()
  // Trocar a key remonta o fundo e o conteúdo, e as animações de entrada rodam de novo
  const [replayKey, setReplayKey] = useState(0)

  const headingStyle: React.CSSProperties = {
    fontSize: 'clamp(2rem, 4.6vw, 3.2rem)',
    lineHeight: 1.18,
    letterSpacing: '-1.5px',
    color: '#FFFFFF',
    textShadow: '0 1px 24px rgba(90,30,0,0.22)',
  }

  return (
    <section
      className="relative overflow-hidden flex flex-col items-center justify-start text-center px-6 pt-[calc(80px+5vh)] md:pt-[calc(80px+7vh)] pb-24 rounded-b-[32px] lg:rounded-b-[48px] bg-[#0A0A0A]"
      style={{ marginTop: -80, minHeight: 'calc(100vh + 80px)' }}
    >
      <RibbonBackground key={`d-${replayKey}`} geo={RIBBON_DESKTOP} id="lk-ribbon-d" className="hidden md:block" />
      <RibbonBackground key={`m-${replayKey}`} geo={RIBBON_MOBILE} id="lk-ribbon-m" className="md:hidden" />

      <motion.div
        key={`content-${replayKey}`}
        className="relative z-10 flex flex-col items-center"
        variants={heroContentContainer}
        initial={reduceMotion ? 'visible' : 'hidden'}
        animate="visible"
      >
        <h1 className="font-display font-medium max-w-[760px]" style={headingStyle}>
          <motion.span variants={heroSlideIn} style={{ display: 'block' }}>
            Você não precisa saber nada de tecnologia
          </motion.span>
          <motion.span variants={heroSlideIn} style={{ display: 'block' }}>
            pra ter uma loja digital de verdade.
          </motion.span>
        </h1>

        <motion.div variants={heroSlideIn}>
          <RotatingText
            texts={HERO_TEXTS}
            variant="slide"
            rotationInterval={2600}
            mainClassName="font-display font-medium"
            style={headingStyle}
          />
        </motion.div>

        <motion.p
          variants={heroSlideIn}
          className="font-body font-medium max-w-[520px] mt-5"
          style={{ color: '#FFFFFF', lineHeight: 1.65, fontSize: '1.0625rem', textShadow: '0 1px 14px rgba(90,30,0,0.35)' }}
        >
          Catálogo, link único e pedidos organizados num só lugar — sua loja pronta em minutos.
        </motion.p>

        <motion.div variants={heroSlideIn} className="flex flex-wrap justify-center gap-3 mt-8">
          <Link
            href={`${APP_URL}/cadastro`}
            className="inline-flex items-center gap-2 font-semibold text-[15px] rounded-full px-6 py-3.5 transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F97316]"
            style={{ background: '#FFFFFF', color: '#0A0A0A', boxShadow: '0 10px 30px -12px rgba(249,115,22,0.45)' }}
          >
            Criar minha loja <span>→</span>
          </Link>
          <a
            href="#como-funciona"
            className="font-semibold text-[15px] rounded-full px-6 py-3.5 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            style={{ color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.7)' }}
          >
            Ver como funciona
          </a>
        </motion.div>
      </motion.div>

      {/* Só para testes locais (npm run dev): reinicia a animação de entrada.
          No build de produção NODE_ENV é 'production' e o botão nem é renderizado. */}
      {process.env.NODE_ENV === 'development' && (
      <button
        type="button"
        onClick={() => setReplayKey(k => k + 1)}
        className="absolute z-20 bottom-[104px] right-6 lg:right-10 inline-flex items-center gap-2 min-h-[44px] rounded-full px-4 font-body text-[13px] font-semibold cursor-pointer transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F97316]"
        style={{ background: '#FFFFFF', color: '#0A0A0A', boxShadow: '0 8px 24px -10px rgba(10,10,10,0.5)' }}
      >
        <RotateCcw size={15} aria-hidden />
        Rever animação
      </button>
      )}
    </section>
  )
}

export default function Home() {

  const shouldReduceMotion = useReducedMotion()


  const [activeIndex, setActiveIndex] = useState(0)
  const activeTimer = useRef<ReturnType<typeof setInterval> | null>(null)

  const startActiveTimer = () => {
    if (activeTimer.current) clearInterval(activeTimer.current)
    activeTimer.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % promiseSlides.length)
    }, 3200)
  }

  useEffect(() => {
    startActiveTimer()
    return () => { if (activeTimer.current) clearInterval(activeTimer.current) }
  }, [])

  const goToSlide = (i: number) => {
    setActiveIndex(i)
    startActiveTimer()
  }

  return (
    <main className="min-h-screen bg-lk-base pt-20">

      {/* ============================================================
          HERO
          ============================================================ */}
      <Hero />





      {/* ============================================================
          FEATURE MARQUEE
          ============================================================ */}
      <section className="py-12 overflow-hidden flex flex-col gap-3">

        <Marquee direction="left" speed={35}>
          {[
            { icon: <Link2 size={20} />,    title: 'Sua URL própria',       description: 'lookcase.com/suamarca. Sem @plataforma no link.' },
            { icon: <Percent size={20} />,  title: 'Zero taxa por venda',   description: '100% do que você vende fica com você. Sempre.' },
            { icon: <Zap size={20} />,      title: 'No ar em 10 minutos',   description: 'Cadastra, personaliza e compartilha. Simples assim.' },
            { icon: <Package size={20} />,  title: 'Catálogo organizado',   description: 'Produtos, tamanhos e cores. Tudo sem confusão no DM.' },
            { icon: <Share2 size={20} />,   title: 'Parceiro Oficial Meta', description: 'Integração nativa com Instagram e WhatsApp.' },
            { icon: <Palette size={20} />,  title: 'Design profissional',   description: 'Visual da sua marca sem precisar de designer.' },
          ].map((card) => (
            <MarqueeCard key={card.title} icon={card.icon} title={card.title} description={card.description} />
          ))}
        </Marquee>

        <Marquee direction="right" speed={28}>
          {[
            { icon: <Shield size={20} />,        title: 'Dados protegidos',      description: 'Conformidade total com a LGPD brasileira.' },
            { icon: <ClipboardList size={20} />,  title: 'Pedidos rastreados',    description: 'Cada pedido registrado. Sem perder nada no histórico.' },
            { icon: <Layers size={20} />,         title: 'Looks completos',       description: 'Monte combinações e venda conjuntos em um clique.' },
            { icon: <Headphones size={20} />,     title: 'Suporte em português',  description: 'Time brasileiro, disponível quando você precisar.' },
            { icon: <Infinity size={20} />,       title: 'Sem limite de produtos',description: 'Cadastre quantas peças quiser, sem restrições.' },
            { icon: <RefreshCw size={20} />,      title: 'Estoque em tempo real', description: 'Disponibilidade atualizada automaticamente.' },
          ].map((card) => (
            <MarqueeCard key={card.title} icon={card.icon} title={card.title} description={card.description} />
          ))}
        </Marquee>

      </section>


      {/* ============================================================
          DIVISOR
          ============================================================ */}
      <div
        className="mx-0"
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--color-lk-border) 20%, var(--color-lk-border) 80%, transparent)',
        }}
      />


      {/* ============================================================
          SEÇÃO — PROPOSTA DE VALOR
          ============================================================ */}
      <section id="produto" className="px-5 lg:px-10 py-16 lg:py-24">
        <motion.div
          className="max-w-[1200px] mx-auto rounded-[28px] relative overflow-hidden"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -24px 0px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeIndex}
              className="absolute inset-0"
              style={{ background: promiseSlides[activeIndex].bg }}
              initial={shouldReduceMotion ? false : { clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              exit={shouldReduceMotion ? {} : { opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            />
          </AnimatePresence>

          <div className="relative z-[1] flex flex-col items-center justify-center text-center px-6 py-20 sm:px-12 sm:py-28 min-h-[420px]">

            <p
              className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] flex items-center gap-2 mb-8"
              style={{ color: promiseSlides[activeIndex].color, transition: 'color 0.4s' }}
            >
              <span className="w-[6px] h-[6px] rounded-full flex-shrink-0" style={{ background: 'currentColor' }} />
              Lookcase
            </p>

            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={activeIndex}
                className="font-display text-[28px] lg:text-[40px] font-medium tracking-[-0.03em] leading-[1.2] max-w-[560px]"
                style={{ color: promiseSlides[activeIndex].color }}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? {} : { opacity: 0, y: -12, transition: { duration: 0.2 } }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] as const }}
              >
                {promiseSlides[activeIndex].text}
              </motion.p>
            </AnimatePresence>

            <div className="flex items-center gap-5 mt-12">
              <button
                onClick={() => goToSlide((activeIndex - 1 + promiseSlides.length) % promiseSlides.length)}
                aria-label="Slide anterior"
                className="flex items-center justify-center p-2 -m-2 transition-opacity duration-200 hover:opacity-60"
                style={{ color: promiseSlides[activeIndex].color }}
              >
                <ArrowLeft size={16} />
              </button>

              <div className="flex items-center gap-2">
                {promiseSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    aria-label={`Slide ${i + 1}`}
                    className="rounded-full transition-all duration-300"
                    style={{
                      height: 8,
                      width: activeIndex === i ? 24 : 8,
                      background: activeIndex === i ? promiseSlides[activeIndex].color : `${promiseSlides[activeIndex].color}40`,
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() => goToSlide((activeIndex + 1) % promiseSlides.length)}
                aria-label="Próximo slide"
                className="flex items-center justify-center p-2 -m-2 transition-opacity duration-200 hover:opacity-60"
                style={{ color: promiseSlides[activeIndex].color }}
              >
                <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </motion.div>
      </section>


      {/* ============================================================
          DIVISOR
          ============================================================ */}
      <div
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--color-lk-border) 20%, var(--color-lk-border) 80%, transparent)',
        }}
      />


      <div id="como-funciona">
        <FeaturesSection />
      </div>


      {/* ============================================================
          DIVISOR
          ============================================================ */}
      <div
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--color-lk-border) 20%, var(--color-lk-border) 80%, transparent)',
        }}
      />


      {/* ============================================================
          SEÇÃO — PROMESSAS
          ============================================================ */}
      <PromiseSection />


      {/* ============================================================
          DIVISOR
          ============================================================ */}
      <div
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--color-lk-border) 20%, var(--color-lk-border) 80%, transparent)',
        }}
      />


      {/* ============================================================
          SEÇÃO — O QUE MUDA
          ============================================================ */}
      <section id="o-que-muda" className="px-5 lg:px-10 py-14 lg:py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT — stagger content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-col"
          >
            <motion.h2
              variants={fadeUp}
              className="font-display text-[28px] lg:text-[40px] font-medium tracking-[-0.03em] leading-[1.05] mb-10"
            >
              Por que escolher a Lookcase?
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="font-body text-[15px] leading-[1.7] text-lk-gray-400 max-w-[440px] mb-8"
            >
              Menos tempo mexendo em sistema, mais tempo vendendo: pedido organizado num só lugar, produto editado em segundos, venda acompanhada em tempo real. Tudo direto do celular, sem precisar de curso nem manual pra entender.
            </motion.p>

            <motion.div variants={fadeUp}>
              <Link
                href={`${APP_URL}/cadastro`}
                className="inline-flex items-center gap-2 font-semibold text-[15px] rounded-full px-6 py-3.5 transition-transform hover:-translate-y-0.5"
                style={{ background: 'var(--color-lk-white)', color: '#FFFFFF' }}
              >
                Criar minha loja <span>→</span>
              </Link>
            </motion.div>

          </motion.div>

          {/* RIGHT — gallery grid */}
          <motion.div
            variants={galleryContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-2 gap-3"
          >
            <motion.div variants={galleryCell} className="rounded-2xl overflow-hidden aspect-[3/4]">
              <img src="/products/p1.png" alt="Vestido Midi Floral" className="w-full h-full object-cover scale-110" />
            </motion.div>

            <motion.div variants={galleryCell} className="rounded-2xl overflow-hidden aspect-[3/4]">
              <img src="/products/p2.png" alt="Conjunto Linho" className="w-full h-full object-cover scale-110" />
            </motion.div>

            <motion.div variants={galleryCell} className="rounded-2xl overflow-hidden aspect-[3/4]">
              <img src="/products/p3.png" alt="Blusa Cropped" className="w-full h-full object-cover scale-110" />
            </motion.div>

            <motion.div
              variants={galleryCell}
              className="rounded-2xl aspect-[3/4] flex items-center justify-center p-6"
              style={{ background: 'var(--color-lk-surface)', border: '1px solid var(--color-lk-border)' }}
            >
              <p className="font-display text-[22px] font-medium leading-[1.2] tracking-[-0.02em] text-lk-white text-center">
                Uma loja que trabalha por você.
              </p>
            </motion.div>
          </motion.div>

        </div>
      </section>


      {/* ============================================================
          DIVISOR
          ============================================================ */}
      <div
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--color-lk-border) 20%, var(--color-lk-border) 80%, transparent)',
        }}
      />


      {/* ============================================================
          SEÇÃO — DEPOIMENTOS
          ============================================================ */}
      <TestimonialsSection />


      {/* ============================================================
          DIVISOR
          ============================================================ */}
      <div
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--color-lk-border) 20%, var(--color-lk-border) 80%, transparent)',
        }}
      />


      {/* ============================================================
          SEÇÃO — FAQ
          ============================================================ */}
      <FAQSection />


      {/* ============================================================
          DIVISOR
          ============================================================ */}
      <div
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--color-lk-border) 20%, var(--color-lk-border) 80%, transparent)',
        }}
      />


      {/* ============================================================
          CTA FINAL
          ============================================================ */}
      <div style={{ position: 'relative', isolation: 'isolate' }}>
      <CTAFinalSection />


      {/* ============================================================
          FOOTER
          ============================================================ */}
      <Footer />
      </div>

    </main>
  )
}
