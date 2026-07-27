'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { LookcaseMark } from '@/components/ui/lookcase-mark'

// URL do app (auth/dashboard/vitrine) — fica em outro repositório.
// Placeholder até o domínio próprio existir; trocar via env var na Vercel quando mudar.
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://look-case.vercel.app'

const SECTIONS = [
  'produto',
  'como-funciona',
  'o-que-muda',
  'planos',
  'faq',
]

const NAV_LINKS = [
  { href: '#produto',      label: 'Produto',         section: 'produto'      },
  { href: '#como-funciona', label: 'Como funciona',  section: 'como-funciona' },
  { href: '#o-que-muda',   label: 'Benefícios',      section: 'o-que-muda'   },
  { href: '#planos',       label: 'Preços',           section: 'planos'       },
  { href: '#faq',          label: 'FAQ',              section: 'faq'          },
]

export default function Navbar() {
  const [activeSection, setActiveSectionState] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [pillStyle, setPillStyle] = useState<React.CSSProperties>({})
  const [limelightStyle, setLimelightStyle] = useState<React.CSSProperties>({})
  const capsuleRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])

  const placePill = useCallback((index: number) => {
    const capsule = capsuleRef.current
    const item = itemRefs.current[index]
    if (!capsule || !item) return
    const cr = capsule.getBoundingClientRect()
    const er = item.getBoundingClientRect()
    const l = er.left - cr.left
    const w = er.width
    const h = er.height
    const t = (cr.height - h) / 2
    setPillStyle({ left: l, width: w, height: h, top: t, position: 'absolute' })
    // Limelight slightly wider than the pill
    setLimelightStyle({ left: l - w * 0.12, width: w * 1.24 })
  }, [])

  const setActive = useCallback((sectionId: string) => {
    setActiveSectionState(sectionId)
    const index = NAV_LINKS.findIndex(l => l.section === sectionId)
    if (index >= 0) placePill(index)
  }, [placePill])

  useEffect(() => {
    let ticking = false

    const updateFromScroll = () => {
      let active: string | null = null
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i])
        if (el && el.getBoundingClientRect().top <= 120) {
          active = SECTIONS[i]
          break
        }
      }
      if (active) setActive(active)
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateFromScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    requestAnimationFrame(() => {
      updateFromScroll()
      if (itemRefs.current[0]) placePill(0)
    })
    return () => window.removeEventListener('scroll', onScroll)
  }, [setActive, placePill])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 lg:px-24 py-4">

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 z-10 flex-shrink-0">
        <LookcaseMark size={36} />
        <span style={{ color: 'var(--color-lk-white)', fontWeight: 700, fontSize: '14px', letterSpacing: '-0.02em' }}>
          Lookcase
        </span>
      </Link>

      {/* Nav Capsule */}
      <div
        ref={capsuleRef}
        className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-[2px] rounded-full px-[6px] py-[5px]"
        style={{
          background: 'rgba(17,17,17,0.90)',
          border: '1px solid rgba(249,115,22,0.18)',
          backdropFilter: 'blur(16px) saturate(140%)',
          boxShadow: '0 2px 20px rgba(0,0,0,0.4)',
          overflow: 'visible',
        }}
      >
        {/* Pill — subtle white fill, just for legibility */}
        <span
          className="rounded-full pointer-events-none"
          style={{
            ...pillStyle,
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.07)',
            transition: 'left 350ms cubic-bezier(.4,0,.2,1), width 350ms cubic-bezier(.4,0,.2,1), top 100ms',
          }}
          aria-hidden="true"
        />

        {/* Limelight — orange spotlight from above */}
        <span
          className="absolute pointer-events-none"
          style={{
            ...limelightStyle,
            top: '-10px',
            height: 'calc(100% + 10px)',
            background: 'radial-gradient(ellipse 65% 100% at 50% 0%, rgba(249,115,22,0.30) 0%, rgba(249,115,22,0.08) 42%, transparent 68%)',
            transition: 'left 350ms cubic-bezier(.4,0,.2,1), width 350ms cubic-bezier(.4,0,.2,1)',
          }}
          aria-hidden="true"
        />

        {/* Limelight edge — thin orange line at the very top of the active item */}
        <span
          className="absolute pointer-events-none rounded-full"
          style={{
            ...limelightStyle,
            top: 0,
            height: '1.5px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(249,115,22,0.75) 35%, rgba(249,115,22,0.75) 65%, transparent 100%)',
            transition: 'left 350ms cubic-bezier(.4,0,.2,1), width 350ms cubic-bezier(.4,0,.2,1)',
          }}
          aria-hidden="true"
        />

        {/* Links */}
        {NAV_LINKS.map((link, index) => (
          <a
            key={link.href}
            href={link.href}
            ref={el => { itemRefs.current[index] = el }}
            onClick={() => setActive(link.section)}
            className={`relative z-10 font-body text-[13.5px] font-medium px-[18px] py-[8px] rounded-full transition-colors duration-200 whitespace-nowrap ${
              activeSection === link.section
                ? 'text-lk-white'
                : 'text-lk-gray-600 hover:text-lk-gray-400'
            }`}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* CTA */}
      <div className="hidden lg:flex items-center gap-3 z-10 flex-shrink-0">
        <Link href={`${APP_URL}/entrar`} className="font-body text-sm text-lk-gray-500 hover:text-lk-gray-400 transition-colors">
          Entrar
        </Link>
        <Link
          href={`${APP_URL}/cadastro`}
          className="font-body text-[13px] font-semibold px-[16px] py-[8px] rounded-full hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#FFFFFF', color: '#000000' }}
        >
          Criar minha loja
        </Link>
      </div>

      {/* CTA compacto — apenas mobile, sempre visível */}
      <div className="lg:hidden flex items-center gap-2 z-10 flex-shrink-0">
        <Link href={`${APP_URL}/entrar`} className="font-body text-[13px] text-lk-gray-500 hover:text-lk-gray-400 transition-colors">
          Entrar
        </Link>
        <Link
          href={`${APP_URL}/cadastro`}
          className="font-body text-[13px] font-semibold px-[14px] py-[7px] rounded-full hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#FFFFFF', color: '#000000' }}
        >
          Criar loja
        </Link>
      </div>

      {/* Hamburger — apenas mobile */}
      <button
        className="lg:hidden z-50 flex flex-col gap-[5px] p-2 flex-shrink-0"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Abrir menu"
      >
        <span
          className="block w-[22px] h-[1.5px] bg-lk-gray-400 transition-all duration-300 origin-center"
          style={{ transform: mobileMenuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }}
        />
        <span
          className="block w-[22px] h-[1.5px] bg-lk-gray-400 transition-all duration-200"
          style={{ opacity: mobileMenuOpen ? 0 : 1 }}
        />
        <span
          className="block w-[22px] h-[1.5px] bg-lk-gray-400 transition-all duration-300 origin-center"
          style={{ transform: mobileMenuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }}
        />
      </button>

      {/* Menu mobile overlay */}
      <div
        className="lg:hidden fixed inset-0 top-[60px] z-40 flex flex-col transition-all duration-300"
        style={{
          background: 'rgba(0,0,0,0.97)',
          backdropFilter: 'blur(20px)',
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
          transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-8px)',
        }}
      >
        {/* Links */}
        <nav className="flex flex-col px-6 pt-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => {
                setActive(link.section)
                setMobileMenuOpen(false)
              }}
              className="font-display text-[26px] font-medium text-lk-gray-500 hover:text-lk-white py-4 tracking-[-0.02em] transition-colors border-b border-lk-border last:border-0"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTAs mobile */}
        <div className="px-6 py-8 mt-auto flex flex-col gap-3">
          <Link
            href={`${APP_URL}/entrar`}
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center font-display text-[15px] font-semibold py-4 rounded-full border border-lk-border-strong text-lk-white hover:bg-lk-subtle transition-colors"
          >
            Fazer login
          </Link>
          <Link
            href={`${APP_URL}/cadastro`}
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center font-display text-[15px] font-semibold py-4 rounded-full hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#FFFFFF', color: '#000000' }}
          >
            Comece gratuitamente
          </Link>
        </div>
      </div>
    </header>
  )
}
