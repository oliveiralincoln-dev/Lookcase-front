import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, MessageCircle, ArrowRight } from 'lucide-react'
import { Footer } from '@/components/footer'
import { H1, P } from '@/components/content-typography'

export const metadata: Metadata = {
  title: 'Lookcase — Contato',
  description: 'Fale com a Lookcase pelo WhatsApp ou por e-mail. Respondemos por WhatsApp em minutos, por e-mail em até 24 horas.',
  alternates: { canonical: 'https://lookcase.app.br/contato' },
  openGraph: {
    title: 'Lookcase — Contato',
    description: 'Fale com a Lookcase pelo WhatsApp ou por e-mail. Respondemos por WhatsApp em minutos, por e-mail em até 24 horas.',
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
        <P>Respondemos por WhatsApp em minutos. Por e-mail, em até 24 horas.</P>

        <div className="flex flex-col gap-3 mt-8">
          <a
            href="https://wa.me/5592981362063"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between px-6 py-5 rounded-2xl bg-lk-card border-[1.5px] border-lk-orange transition-colors hover:bg-lk-subtle"
          >
            <div className="flex items-center gap-3">
              <MessageCircle size={22} className="text-lk-orange" />
              <div>
                <p className="font-display text-[14px] font-medium text-lk-white">WhatsApp</p>
                <p className="font-body text-[12px] text-lk-gray-400">(55) 92 8136-2063</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-lk-orange transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href="mailto:contato@lookcase.app.br"
            className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-lk-surface border border-lk-border transition-colors hover:border-lk-border-strong"
          >
            <Mail size={18} className="text-lk-gray-500" />
            <span className="font-body text-[13px] text-lk-gray-400">contato@lookcase.app.br</span>
          </a>
        </div>

        <p className="font-body text-[13px] text-lk-gray-500 mt-6">
          Quer saber como organizamos pedidos?{' '}
          <Link href="/guias/organizar-pedidos-whatsapp" className="text-lk-orange underline hover:no-underline">
            Veja o guia
          </Link>
          .
        </p>
      </article>
      <Footer />
    </main>
  )
}
