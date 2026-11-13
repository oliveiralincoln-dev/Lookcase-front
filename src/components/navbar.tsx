'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LookcaseMark } from '@/components/ui/lookcase-mark'
import { HERO_NAV_ZONES } from '@/lib/hero-zones'

// URL do app (auth/dashboard/vitrine) — fica em outro repositório.
// Placeholder até o domínio próprio existir; trocar via env var na Vercel quando mudar.
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://look-case.vercel.app'

const SECTIONS = [
  'produto',
  'como-funciona',
  'o-que-muda',
  'faq',
]

const NAV_LINKS = [
  { href: '/#produto',      label: 'Produto',         section: 'produto'      },
  { href: '/#como-funciona', label: 'Como funciona',  section: 'como-funciona' },
  { href: '/#o-que-muda',   label: 'Benefícios',      section: 'o-que-muda'   },
  { href: '/precos',        label: 'Assinatura',       section: 'planos'       },
  { href: '/#faq',          label: 'FAQ',              section: 'faq'          },
]

export default function Navbar() {
  const pathname = usePathname()
  const isPrecos = pathname === '/precos'
  const [activeSection, setActiveSectionState] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [pillStyle, setPillStyle] = useState<React.CSSProperties>({})
  const [limelightStyle, setLimelightStyle] = useState<React.CSSProperties>({})
  const capsuleRef = useRef<HTMLDivElement>(null)
  // Na home, o topo do hero é laranja e a parte de baixo é preta.
  // Cada zona da navbar fica clara enquanto está sobre a área preta.
  const [heroDark, setHeroDark] = useState({ left: false, mid: false, right: false })
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

    const updateHeroDark = () => {
      if (pathname !== '/') { setHeroDark({ left: false, mid: false, right: false }); return }
      const H = window.innerHeight + 80
      const y = window.scrollY
      const z = window.innerWidth >= 768 ? HERO_NAV_ZONES.desktop : HERO_NAV_ZONES.mobile
      // Laranja acima da curva A, preto abaixo: a zona fica clara depois que a
      // curva passou pela navbar e enquanto o hero ainda está atrás dela.
      const onBlack = (f: number, navBottom: number) => y >= H * f - navBottom && y < H - navBottom
      setHeroDark({ left: onBlack(z.left, 72), mid: onBlack(z.mid, 72), right: onBlack(z.right, 64) })
    }

    const onScroll = () => {
      updateHeroDark()
      if (!ticking) {
        requestAnimationFrame(() => {
          updateFromScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateHeroDark)
    updateHeroDark()
    requestAnimationFrame(() => {
      if (pathname === '/precos') {
        setActive('planos')
      } else {
        updateFromScroll()
        if (itemRefs.current[0]) placePill(0)
      }
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateHeroDark)
    }
  }, [setActive, placePill, pathname])

  useEffect(() => {
    if (pathname === '/precos') {
      setActive('planos')
    }
  }, [pathname, setActive])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 lg:px-24 py-4">

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 z-10 flex-shrink-0">
        <LookcaseMark size={36} />
        <span style={{ color: heroDark.left ? '#FFFFFF' : 'var(--color-lk-white)', transition: 'color 0.25s', fontWeight: 700, fontSize: '14px', letterSpacing: '-0.02em' }}>
          Lookcase
        </span>
      </Link>

      {/* Nav Capsule — a partir de 960px */}
      <div
        ref={capsuleRef}
        className="absolute left-1/2 -translate-x-1/2 hidden min-[960px]:flex items-center gap-[2px] rounded-full px-[6px] py-[5px]"
        style={{
          background: 'rgba(255,255,255,0.85)',
          border: '1px solid rgba(249,115,22,0.28)',
          backdropFilter: 'blur(16px) saturate(140%)',
          boxShadow: '0 2px 20px rgba(10,10,10,0.06)',
          overflow: 'visible',
        }}
      >
        {/* Pill — subtle white fill, just for legibility */}
        <span
          className="rounded-full pointer-events-none"
          style={{
            ...pillStyle,
            backgroundColor: 'rgba(249,115,22,0.08)',
            border: '1px solid rgba(249,115,22,0.16)',
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
            background: 'radial-gradient(ellipse 65% 100% at 50% 0%, rgba(249,115,22,0.22) 0%, rgba(249,115,22,0.06) 42%, transparent 68%)',
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
            className={`relative z-10 font-body text-[13.5px] font-medium px-3 lg:px-[18px] py-[8px] rounded-full transition-colors duration-200 whitespace-nowrap ${
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
      <div className="hidden min-[960px]:flex items-center gap-3 z-10 flex-shrink-0">
        <Link
          href={`${APP_URL}/entrar`}
          className={`font-body text-sm transition-colors ${
            isPrecos
              ? 'text-[rgba(23,13,6,0.82)] hover:text-[rgba(23,13,6,1)]'
              : heroDark.right
                ? 'text-white/70 hover:text-white'
                : pathname === '/'
                  ? 'text-[rgba(10,10,10,0.78)] hover:text-black'
                  : 'text-lk-gray-500 hover:text-lk-gray-400'
          }`}
        >
          Entrar
        </Link>
        <Link
          href={`${APP_URL}/cadastro`}
          className="font-body text-[13px] font-semibold px-[16px] py-[8px] rounded-full hover:opacity-90 transition-opacity"
          style={heroDark.right ? { backgroundColor: '#FFFFFF', color: '#0A0A0A', transition: 'background-color 0.25s, color 0.25s' } : { backgroundColor: '#0A0A0A', color: '#FFFFFF', transition: 'background-color 0.25s, color 0.25s' }}
        >
          Criar minha loja
        </Link>
      </div>

      {/* CTA compacto — abaixo de 960px, sempre visível */}
      <div className="min-[960px]:hidden flex items-center gap-2 z-10 flex-shrink-0">
        <Link
          href={`${APP_URL}/entrar`}
          className={`font-body text-[13px] transition-colors ${
            isPrecos
              ? 'text-[rgba(23,13,6,0.82)] hover:text-[rgba(23,13,6,1)]'
              : heroDark.mid
                ? 'text-white/70 hover:text-white'
                : pathname === '/'
                  ? 'text-[rgba(10,10,10,0.78)] hover:text-black'
                  : 'text-lk-gray-500 hover:text-lk-gray-400'
          }`}
        >
          Entrar
        </Link>
        <Link
          href={`${APP_URL}/cadastro`}
          className="font-body text-[13px] font-semibold px-[14px] py-[7px] rounded-full hover:opacity-90 transition-opacity"
          style={heroDark.mid ? { backgroundColor: '#FFFFFF', color: '#0A0A0A', transition: 'background-color 0.25s, color 0.25s' } : { backgroundColor: '#0A0A0A', color: '#FFFFFF', transition: 'background-color 0.25s, color 0.25s' }}
        >
          Criar loja
        </Link>
      </div>

      {/* Hamburger — abaixo de 960px */}
      <button
        className="min-[960px]:hidden z-50 flex flex-col items-center justify-center gap-[5px] p-2 flex-shrink-0"
        style={{ minWidth: 44, minHeight: 44 }}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Abrir menu"
      >
        <span
          className={`block w-[22px] h-[1.5px] ${heroDark.right && !mobileMenuOpen ? 'bg-white/80' : 'bg-lk-gray-400'} transition-all duration-300 origin-center`}
          style={{ transform: mobileMenuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }}
        />
        <span
          className={`block w-[22px] h-[1.5px] ${heroDark.right && !mobileMenuOpen ? 'bg-white/80' : 'bg-lk-gray-400'} transition-all duration-200`}
          style={{ opacity: mobileMenuOpen ? 0 : 1 }}
        />
        <span
          className={`block w-[22px] h-[1.5px] ${heroDark.right && !mobileMenuOpen ? 'bg-white/80' : 'bg-lk-gray-400'} transition-all duration-300 origin-center`}
          style={{ transform: mobileMenuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }}
        />
      </button>

      {/* Menu mobile overlay */}
      <div
        className="min-[960px]:hidden fixed inset-0 top-[60px] z-40 flex flex-col transition-all duration-300"
        style={{
          background: 'rgba(250,247,242,0.97)',
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
            style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF' }}
          >
            Comece gratuitamente
          </Link>
        </div>
      </div>
    </header>
  )
}
