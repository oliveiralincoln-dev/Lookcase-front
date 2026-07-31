'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import RotatingText from '@/components/ui/rotating-text'
import { LookcaseMark } from '@/components/ui/lookcase-mark'
import { Marquee, MarqueeCard } from '@/components/ui/marquee'
import { Link2, Percent, Zap, Package, Share2, Palette, Shield, ClipboardList, Layers, Headphones, Infinity, RefreshCw, Shirt, ArrowLeft, ArrowRight } from 'lucide-react'
import { AnimatedList } from '@/components/ui/animated-list'
import { FeaturesSection } from '@/components/sections/features-section'
import { PromiseSection } from '@/components/sections/promise-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { PricingSection } from '@/components/sections/pricing-section'
import { motion, useReducedMotion, AnimatePresence } from 'motion/react'
import { LightRays } from '@/components/ui/light-rays'

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
    a: 'Você escolhe: ative o pagamento direto no carrinho (Pix e cartão, processado pela Lookcase) ou continue combinando com a cliente pelo WhatsApp — Pix, dinheiro, cartão na entrega.',
  },
  {
    q: 'Posso testar antes de pagar?',
    a: 'Sim. Você tem 7 dias grátis para configurar sua loja e sentir como funciona. Sem cartão de crédito no início.',
  },
  {
    q: 'E se eu quiser cancelar?',
    a: 'Cancela quando quiser, direto no painel, em menos de 1 minuto. Sem ligar pra ninguém, sem justificar, sem multa.',
  },
  {
    q: 'Quantos produtos posso cadastrar?',
    a: 'No plano Atelier você pode cadastrar até 50 produtos. No plano Pro os produtos são ilimitados. Em ambos os casos, o cadastro é feito pelo painel, com foto real do produto — simples e rápido.',
  },
]

const notifications = [
  { icon: '🛍️', title: 'Novo pedido',         desc: 'Vestido Midi P · R$ 189',    time: 'agora' },
  { icon: '👤', title: 'Nova visita',          desc: 'Ana Lima · via Instagram',   time: '1m'    },
  { icon: '✅', title: 'Pagamento confirmado', desc: 'R$ 189 · Pix',               time: '1m'    },
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
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="px-5 lg:px-10 py-14 lg:py-20">

      <div className="max-w-3xl mx-auto">
        <p className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-lk-gray-600 flex items-center justify-center gap-2 mb-5">
          <span className="block w-[18px] h-[1px] bg-lk-gray-600" />
          Dúvidas
          <span className="block w-[18px] h-[1px] bg-lk-gray-600" />
        </p>

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
                border: open === i
                  ? '1px solid rgba(249,115,22,0.25)'
                  : '1px solid var(--color-lk-border)',
                transition: 'border-color 0.2s ease',
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-6 px-5 py-[18px] text-left"
              >
                <p
                  className="font-display text-[15px] font-medium tracking-[-0.01em] transition-colors duration-200"
                  style={{ color: open === i ? 'var(--color-lk-white)' : 'var(--color-lk-gray-100)' }}
                >
                  {item.q}
                </p>

                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    border: open === i
                      ? '1px solid rgba(249,115,22,0.35)'
                      : '1px solid var(--color-lk-border-strong)',
                    color: open === i ? 'var(--color-lk-orange)' : 'var(--color-lk-gray-500)',
                    transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease, border-color 0.2s ease, color 0.2s ease',
                  }}
                >
                  <span className="text-[17px] leading-none font-light">+</span>
                </div>
              </button>

              <div
                className="overflow-hidden"
                style={{
                  maxHeight: open === i ? '240px' : '0px',
                  opacity: open === i ? 1 : 0,
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
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const promiseSlides = [
  { text: 'A vitrine que a sua marca sempre mereceu.',          bg: '#F1EEE6', color: '#3A362E' },
  { text: 'Cole no Instagram, no WhatsApp, em qualquer lugar.', bg: '#FAFAF8', color: '#1A1A18' },
  { text: 'Cada peça, com foto e preço em segundos.',           bg: '#FCE8D8', color: '#7A3B12' },
  { text: 'Nenhum pedido se perde no meio da conversa.',        bg: '#E7EBEC', color: '#2B3436' },
  { text: 'Sua loja com cara de marca grande.',                 bg: '#E8ECE5', color: '#33402F' },
  { text: 'Do clique à compra, tudo num toque.',                bg: '#EFEAE4', color: '#4A4038' },
]

const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
}

const blurFadeIn = {
  hidden: { opacity: 0, filter: 'blur(6px)' },
  visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function Home() {

  const shouldReduceMotion = useReducedMotion()

  // Scroll reveal — observa todos [data-scroll]
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-scroll]')

    const reveal = (el: HTMLElement) => {
      const delay = parseInt(el.dataset.scrollDelay || '0')
      setTimeout(() => el.classList.add('scroll-visible'), delay)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            reveal(entry.target as HTMLElement)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0, rootMargin: '0px 0px -24px 0px' }
    )

    // Elementos já visíveis no viewport inicial — revelar imediatamente
    requestAnimationFrame(() => {
      els.forEach(el => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight - 24 && rect.bottom > 0) {
          reveal(el)
        } else {
          observer.observe(el)
        }
      })
    })

    // Fallback de segurança: revelar tudo que ainda estiver oculto após 1.8s
    const fallback = setTimeout(() => {
      els.forEach(el => {
        if (!el.classList.contains('scroll-visible')) {
          el.classList.add('scroll-visible')
        }
      })
    }, 1800)

    return () => {
      observer.disconnect()
      clearTimeout(fallback)
    }
  }, [])

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
      <section
        className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center text-center px-6 py-24"
      >
        {/* Textura de linhas diagonais — canto superior direito */}
        <div
          className="absolute top-0 right-0 w-[340px] h-[140px] pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(-45deg, rgba(249,115,22,0.22) 0px, rgba(249,115,22,0.22) 1px, transparent 1px, transparent 16px)',
            WebkitMaskImage: 'linear-gradient(to bottom left, black, transparent 70%)',
            maskImage: 'linear-gradient(to bottom left, black, transparent 70%)',
          }}
        />

        {/* Glow radial laranja */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '58%',
            left: '58%',
            transform: 'translate(-50%, -50%)',
            width: 640,
            height: 560,
            background: 'radial-gradient(circle, rgba(249,115,22,0.24) 0%, rgba(249,115,22,0) 68%)',
          }}
        />

        {/* Conteúdo — blur+fade em cascata no mount */}
        <motion.div
          className="relative z-10 flex flex-col items-center"
          variants={heroContainer}
          initial={shouldReduceMotion ? 'visible' : 'hidden'}
          animate="visible"
        >

          {/* Headline — dividida em 2 linhas para animar individualmente */}
          <h1
            className="font-display font-medium max-w-[760px]"
            style={{
              fontSize: 'clamp(2rem, 4.6vw, 3.2rem)',
              lineHeight: 1.18,
              letterSpacing: '-1.5px',
              color: 'var(--color-lk-white)',
            }}
          >
            <motion.span variants={blurFadeIn} style={{ display: 'block' }}>
              Você não precisa saber nada de tecnologia
            </motion.span>
            <motion.span variants={blurFadeIn} style={{ display: 'block' }}>
              pra ter uma loja digital de verdade.
            </motion.span>
          </h1>

          {/* RotatingText — reaproveitando o componente existente */}
          <motion.div variants={blurFadeIn}>
            <RotatingText
              texts={[
                'Catálogo organizado.',
                'Pedidos sem bagunça.',
                'Sua marca, do seu jeito.',
                'Direto onde você já vende.',
              ]}
              variant="slide"
              rotationInterval={2600}
              mainClassName="font-display font-medium"
              style={{
                fontSize: 'clamp(2rem, 4.6vw, 3.2rem)',
                lineHeight: 1.18,
                letterSpacing: '-1.5px',
                color: 'var(--color-lk-white)',
              }}
            />
          </motion.div>

          {/* Subheadline */}
          <motion.p
            variants={blurFadeIn}
            className="font-body max-w-[520px] mt-5"
            style={{ color: 'var(--color-lk-gray-400)', lineHeight: 1.65, fontSize: '1.05rem' }}
          >
            Catálogo, link único e pedidos organizados num só lugar — sua loja pronta em minutos.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={blurFadeIn}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            <Link
              href="/cadastro"
              className="inline-flex items-center gap-2 font-semibold text-[15px] rounded-full px-6 py-3.5 transition-transform hover:-translate-y-0.5"
              style={{ background: 'var(--color-lk-white)', color: '#0A0A0A' }}
            >
              Criar minha loja <span>→</span>
            </Link>
            <a
              href="#como-funciona"
              className="font-semibold text-[15px] rounded-full px-6 py-3.5 transition-colors hover:opacity-80"
              style={{
                color: 'var(--color-lk-white)',
                border: '1px solid rgba(249,115,22,0.4)',
              }}
            >
              Ver como funciona
            </a>
          </motion.div>

        </motion.div>
      </section>





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
        <div className="max-w-[1200px] mx-auto rounded-[28px] relative overflow-hidden scroll-reveal" data-scroll data-scroll-delay="0">

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
            <motion.p
              variants={fadeUp}
              className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-lk-gray-600 flex items-center gap-2 mb-5"
            >
              <span className="block w-[18px] h-[1px] bg-lk-gray-600" />
              O que muda
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="font-display text-[28px] lg:text-[40px] font-medium tracking-[-0.03em] leading-[1.05] mb-10"
            >
              Sua loja do jeito que merece.
            </motion.h2>

            <div className="flex flex-col gap-2 mb-10">
              {[
                'Seus produtos com foto, preço e tamanho — sempre visíveis.',
                'Pedido com resumo completo direto no WhatsApp.',
                'Produto esgotado sinalizado automaticamente.',
                'Um link profissional que representa sua marca de verdade.',
                'Sua vitrine aberta 24h, mesmo quando você está offline.',
                'Sua marca crescendo com cada venda.',
              ].map((result, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="group py-3 px-4 transition-all duration-200"
                  style={{
                    borderLeft: '2px solid var(--color-lk-border)',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderLeftColor = 'var(--color-lk-orange)')}
                  onMouseLeave={e => (e.currentTarget.style.borderLeftColor = 'var(--color-lk-border)')}
                >
                  <p className="font-body text-[14px] font-medium text-lk-gray-100 leading-snug">
                    {result}
                  </p>
                </motion.div>
              ))}
            </div>

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
          SEÇÃO — PLANOS
          ============================================================ */}
      <PricingSection />


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
      <section className="px-5 lg:px-10 py-20 lg:py-32 text-center relative overflow-hidden">

        <LightRays />

        <div className="scroll-reveal relative z-10 max-w-2xl mx-auto" data-scroll data-scroll-delay="0">

          {/* Label da seção */}
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-lk-gray-600 flex items-center justify-center gap-2 mb-6">
            <span className="block w-[18px] h-[1px] bg-lk-gray-600" />
            Comece agora
            <span className="block w-[18px] h-[1px] bg-lk-gray-600" />
          </p>

          <h2 className="font-display text-[36px] lg:text-[56px] font-medium tracking-[-0.04em] leading-[1.05] mb-5">
            Sua vitrine está esperando por você.
          </h2>

          <p className="font-body text-[15px] text-lk-gray-500 leading-[1.65] mb-8 max-w-[400px] mx-auto">
            Um link com a sua cara, os seus produtos e a sua marca. Lookcase cuida do resto.
          </p>

          <div className="relative inline-block mb-8">
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: 'rgba(249,115,22,0.15)',
                filter: 'blur(20px)',
                transform: 'scale(1.25)',
              }}
            />
            <Link
              href={`${APP_URL}/cadastro`}
              className="relative inline-flex items-center gap-2 bg-lk-white text-black font-display text-[15px] lg:text-[16px] font-semibold px-10 py-[16px] rounded-full hover:opacity-90 transition-opacity tracking-[-0.01em]"
            >
              Criar minha loja grátis →
            </Link>
          </div>

          {/* Perks */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {[
              '7 dias grátis',
              'Sem cartão de crédito',
              'Cancele quando quiser',
            ].map((perk) => (
              <span
                key={perk}
                className="font-body text-[12px] text-lk-gray-600 flex items-center gap-[6px]"
              >
                <span className="text-lk-gray-500 text-[10px] font-bold">✓</span>
                {perk}
              </span>
            ))}
          </div>

        </div>
      </section>


      {/* ============================================================
          FOOTER
          ============================================================ */}
      <footer className="border-t border-lk-border">

        {/* Corpo do footer */}
        <div className="px-5 lg:px-10 py-10 lg:py-12 flex flex-col lg:grid lg:[grid-template-columns:1.2fr_1fr_1fr] gap-8 lg:gap-12">

          {/* Coluna 1 — Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <LookcaseMark size={24} />
              <span className="font-display text-[16px] font-medium text-lk-white">
                Lookcase
              </span>
            </div>
            <p className="font-body text-[13px] text-lk-gray-500 leading-[1.6] max-w-[200px] mb-6">
              A loja online do empreendedor de moda brasileiro.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Meta', 'WhatsApp API', 'SSL', 'LGPD'].map((badge) => (
                <span
                  key={badge}
                  className="font-body text-[11px] font-medium text-lk-gray-400 bg-lk-surface border border-lk-border rounded-md px-[10px] py-[4px]"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Coluna 2 — Produto */}
          <div>
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.08em] text-lk-gray-600 mb-4">
              Produto
            </p>
            {[
              'Como funciona',
              'Funcionalidades',
              'Planos e preços',
              'Exemplo de loja',
            ].map((link) => (
              <a
                key={link}
                href="#"
                className="block font-body text-[13px] text-lk-gray-500 mb-3 hover:text-lk-gray-100 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Coluna 3 — Empresa */}
          <div>
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.08em] text-lk-gray-600 mb-4">
              Empresa
            </p>
            {[
              'Sobre o Lookcase',
              'Contato',
              'Termos de uso',
              'Política de privacidade',
            ].map((link) => (
              <a
                key={link}
                href="#"
                className="block font-body text-[13px] text-lk-gray-500 mb-3 hover:text-lk-gray-100 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

        </div>

        {/* Rodapé do footer */}
        <div className="px-5 lg:px-10 py-5 border-t border-lk-border flex items-center justify-center">
          <span className="font-body text-[12px] text-lk-gray-600">
            © 2026 Lookcase · Todos os direitos reservados
          </span>
        </div>

      </footer>

    </main>
  )
}
