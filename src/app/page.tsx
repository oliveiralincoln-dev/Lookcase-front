'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import RotatingText from '@/components/ui/rotating-text'
import { Iphone } from '@/components/ui/iphone'
import { LookcaseMark } from '@/components/ui/lookcase-mark'
import { Marquee, MarqueeCard } from '@/components/ui/marquee'
import { Link2, Percent, Zap, Package, Share2, Palette, Shield, ClipboardList, Layers, Headphones, Infinity, RefreshCw, Shirt } from 'lucide-react'
import { AnimatedList } from '@/components/ui/animated-list'
import { FeaturesSection } from '@/components/sections/features-section'
import { PromiseSection } from '@/components/sections/promise-section'
import { StorefrontMockup } from '@/components/ui/storefront-mockup'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { PricingSection } from '@/components/sections/pricing-section'
import { motion } from 'motion/react'
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

export default function Home() {

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

  const [featOpen, setFeatOpen] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-lk-base pt-20">

      {/* ============================================================
          HERO
          ============================================================ */}
      <section
        className="relative px-5 lg:px-10 pt-[72px] pb-16 overflow-hidden hero-grid"
        style={{ minHeight: '88vh' }}
      >
        {/* Dot grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            maskImage: 'radial-gradient(ellipse 90% 90% at 55% 40%, black 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 55% 40%, black 30%, transparent 80%)',
          }}
        />

        {/* Glow — lado direito, atrás do mockup */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '-80px',
            right: '-60px',
            width: '640px',
            height: '640px',
            background: 'radial-gradient(ellipse, rgba(249,115,22,0.08) 0%, transparent 62%)',
            filter: 'blur(1px)',
          }}
        />

        {/* LEFT — copy */}
        <div className="relative z-10">

          {/* Badge social proof */}
          <div className="hero-fade-up" style={{ animationDelay: '0ms' }}>
            <div className="inline-flex items-center gap-[7px] bg-lk-orange-dim border border-lk-orange-rim rounded-full px-[14px] py-[5px] mb-6">
              <div className="w-[6px] h-[6px] rounded-full bg-lk-orange flex-shrink-0 animate-pulse" />
              <span className="font-body text-[12px] text-lk-gray-100">
                Feito para quem vende moda de verdade
              </span>
            </div>
          </div>

          {/* Headline */}
          <div className="mb-5">
            <h1
              className="font-display text-[36px] lg:text-[58px] font-medium tracking-[-0.04em] leading-[1.02] hero-fade-up"
              style={{ animationDelay: '0.1s' }}>
              Sua vitrine <span className="italic">profissional,</span>
            </h1>

            <h1
              className="font-display text-[36px] lg:text-[58px] font-medium text-lk-white tracking-[-0.04em] leading-[1.02] hero-fade-up italic"
              style={{ animationDelay: '0.2s' }}>
              no ar em minutos.
            </h1>

            <h1
              className="font-display text-[36px] lg:text-[58px] font-medium tracking-[-0.04em] leading-[1.02] hero-fade-up"
              style={{ animationDelay: '0.3s' }}>
              <RotatingText
                texts={["Sem complicar.", "Do seu jeito.", "Agora."]}
                rotationInterval={2400}
                variant="slide"
                mainClassName="font-display font-medium"
                style={{ color: 'inherit', display: 'inline-block' }}
              />
            </h1>
          </div>

          {/* Subtext */}
          <p
            className="font-body text-[15px] leading-[1.65] text-lk-gray-400 max-w-full lg:max-w-[420px] mb-8 font-light hero-fade-up"
            style={{ animationDelay: '400ms' }}
          >
            Crie uma loja bonita, organizada e com a sua cara. Suas clientes navegam, escolhem e pedem — você só confirma.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap items-center gap-3 mb-6 hero-fade-up"
            style={{ animationDelay: '480ms' }}
          >
            <a
              href={`${APP_URL}/cadastro`}
              className="bg-lk-white text-black font-display text-[14px] font-medium px-6 py-[14px] rounded-full flex items-center gap-2 hover:opacity-90 transition-opacity tracking-[-0.01em]"
            >
              Criar minha loja grátis <span>→</span>
            </a>
            <a
              href={`${APP_URL}/exemplo`}
              className="text-lk-gray-400 font-body text-[14px] px-6 py-[13px] rounded-full hover:text-lk-white transition-colors"
              style={{ border: '1px solid rgba(249,115,22,0.35)' }}
            >
              Ver exemplo de loja
            </a>
          </div>

          {/* Microcopy confiança */}
          <div
            className="flex items-center gap-4 hero-fade-up"
            style={{ animationDelay: '560ms' }}
          >
            <span className="font-body text-[12px] text-lk-gray-500 flex items-center gap-[6px]">
              <span className="text-lk-orange text-[11px] font-bold">✓</span>
              Comece gratuitamente
            </span>
            <div className="w-[3px] h-[3px] rounded-full bg-lk-border-strong" />
            <span className="font-body text-[12px] text-lk-gray-500 flex items-center gap-[6px]">
              <span className="text-lk-orange text-[11px] font-bold">✓</span>
              Sem cartão de crédito
            </span>
            <div className="w-[3px] h-[3px] rounded-full bg-lk-border-strong" />
            <span className="font-body text-[12px] text-lk-gray-500 flex items-center gap-[6px]">
              <span className="text-lk-orange text-[11px] font-bold">✓</span>
              Cancele quando quiser
            </span>
          </div>

        </div>

        {/* RIGHT — iPhone mockup com vídeo */}
        <div
          className="relative z-10 hero-slide-in flex justify-center items-center"
          style={{ animationDelay: '200ms' }}
        >
          {/* Glow embaixo */}
          <div
            className="absolute pointer-events-none"
            style={{
              bottom: '-40px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '300px',
              height: '120px',
              background: 'radial-gradient(ellipse, rgba(249,115,22,0.18) 0%, transparent 70%)',
              filter: 'blur(24px)',
            }}
          />

          {/* 3D tilt wrapper */}
          <div
            style={{
              transform: 'perspective(1100px) rotateY(-9deg) rotateX(3deg)',
              transformOrigin: 'center center',
              willChange: 'transform',
              width: '350px',
              position: 'relative',
            }}
          >
            <Iphone
              videoSrc="/phone.mp4"
              className="w-full"
            />

            {/* Camada 1 — gradiente escuro no rodapé da tela */}
            <div
              style={{
                position: 'absolute',
                bottom: '8%',
                left: '6%',
                right: '6%',
                height: '28%',
                background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 40%, transparent 100%)',
                pointerEvents: 'none',
                zIndex: 9,
                borderRadius: '0 0 4px 4px',
              }}
            />

            {/* Camada 2 — badge URL por cima do gradiente */}
            <div
              style={{
                position: 'absolute',
                bottom: '13%',
                right: '8%',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(0,0,0,0.75)',
                border: '1px solid rgba(249,115,22,0.3)',
                borderRadius: '20px',
                padding: '5px 10px 5px 6px',
                backdropFilter: 'blur(8px)',
                pointerEvents: 'none',
                zIndex: 10,
              }}
            >
              <div
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '3px',
                  background: '#F97316',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: '10px',
                  fontFamily: 'var(--font-body)',
                  color: 'rgba(255,255,255,0.8)',
                  letterSpacing: '0.01em',
                  whiteSpace: 'nowrap',
                }}
              >
                lookcase.io/moda-da-mari
              </span>
            </div>
          </div>
        </div>
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
      <section id="produto" className="px-5 lg:px-10 py-16 lg:py-24 flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* LEFT — Texto aspiracional */}
        <div className="scroll-reveal" data-scroll data-scroll-delay="0">

          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] flex items-center gap-2 mb-5" style={{ color: 'var(--color-lk-orange)' }}>
            <span className="w-[6px] h-[6px] rounded-full flex-shrink-0" style={{ background: 'var(--color-lk-orange)' }} />
            Lookcase
          </p>

          <h2 className="font-display text-[32px] lg:text-[44px] font-medium tracking-[-0.03em] leading-[1.05] text-lk-white mb-5">
            A vitrine que a sua marca sempre mereceu.
          </h2>

          <p className="font-body text-[15px] text-lk-gray-400 leading-[1.7] max-w-[380px] mb-8">
            Catálogo completo, pedidos organizados e identidade própria — tudo em um link que é só seu. Pronto em minutos.
          </p>

          <div className="flex flex-col mb-10">
            {[
              { title: 'URL com o nome da sua marca',          sub: 'lookcase.com/suamarca — sem @plataforma no link' },
              { title: 'Catálogo visual, sempre atualizado',   sub: 'Produtos, tamanhos e preços num só lugar' },
              { title: 'Pedidos registrados automaticamente',  sub: 'Histórico completo, sem anotar em lugar nenhum' },
              { title: 'Design profissional sem designer',     sub: 'Personalizado com as cores e identidade da sua marca' },
              { title: 'Zero taxa por venda',                  sub: 'Cada venda é 100% sua. Sempre.' },
            ].map((item, i) => (
              <div
                key={i}
                className="border-b border-lk-border"
                style={{ borderTop: i === 0 ? '1px solid var(--color-lk-border)' : 'none' }}
              >
                <button
                  onClick={() => setFeatOpen(featOpen === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-4 text-left"
                >
                  <p className="font-body text-[14px] font-medium text-lk-gray-100 leading-snug">
                    {item.title}
                  </p>
                  <div
                    className="w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{
                      color: featOpen === i ? 'var(--color-lk-orange)' : 'var(--color-lk-gray-600)',
                      borderColor: featOpen === i ? 'rgba(249,115,22,0.4)' : 'var(--color-lk-border)',
                      transform: featOpen === i ? 'rotate(45deg)' : 'none',
                    }}
                  >
                    <span className="text-[16px] leading-none">+</span>
                  </div>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: featOpen === i ? '80px' : '0px',
                    opacity: featOpen === i ? 1 : 0,
                  }}
                >
                  <p className="font-body text-[13px] text-lk-gray-500 leading-[1.6] pb-4">
                    {item.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT — Safari mockup da vitrine */}
        <div className="scroll-reveal hidden lg:flex items-center justify-center" data-scroll data-scroll-delay="120">
          <StorefrontMockup />
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


      <FeaturesSection />


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
