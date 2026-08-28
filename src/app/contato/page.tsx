import type { Metadata } from 'next'
import { Footer } from '@/components/footer'
import { H1, P } from '@/components/content-typography'

export const metadata: Metadata = {
  title: 'Lookcase — Contato',
  description: 'Fale com a Lookcase por e-mail ou WhatsApp. Respondemos em até 24 horas.',
  alternates: { canonical: 'https://lookcase.app.br/contato' },
  openGraph: {
    title: 'Lookcase — Contato',
    description: 'Fale com a Lookcase por e-mail ou WhatsApp. Respondemos em até 24 horas.',
    url: 'https://lookcase.app.br/contato',
    siteName: 'Lookcase',
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function ContatoPage() {
  return (
    <main className="min-h-screen pt-32" style={{ background: 'var(--color-lk-surface)' }}>
      <article className="max-w-[680px] mx-auto px-5 lg:px-0 pb-24">
        <H1>Fala com a gente</H1>
        <P>Respondemos em até 24 horas.</P>

        <div className="flex flex-col gap-3 mt-8">
          <a
            href="mailto:contato@lookcase.app.br"
            className="flex items-center justify-between px-6 py-4 rounded-2xl font-body text-[15px] transition-colors"
            style={{
              background: 'var(--color-lk-card)',
              border: '1px solid var(--color-lk-border)',
              color: 'var(--color-lk-white)',
            }}
          >
            <span>E-mail</span>
            <span style={{ color: 'var(--color-lk-orange)' }}>contato@lookcase.app.br</span>
          </a>
          <a
            href="https://wa.me/5592981362063"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-6 py-4 rounded-2xl font-body text-[15px] transition-colors"
            style={{
              background: 'var(--color-lk-card)',
              border: '1px solid var(--color-lk-border)',
              color: 'var(--color-lk-white)',
            }}
          >
            <span>WhatsApp</span>
            <span style={{ color: 'var(--color-lk-orange)' }}>(55) 92 8136-2063</span>
          </a>
        </div>
      </article>
      <Footer />
    </main>
  )
}
