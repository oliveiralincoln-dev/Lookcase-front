import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/footer'
import { FAQSection } from '@/components/sections/faq-section'

export const metadata: Metadata = {
  title: 'Lookcase — Perguntas frequentes',
  description: 'Tire suas dúvidas sobre a Lookcase: como funciona, pagamento das vendas, cancelamento e limite de produtos.',
  alternates: { canonical: 'https://lookcase.app.br/faq' },
  openGraph: {
    title: 'Lookcase — Perguntas frequentes',
    description: 'Tire suas dúvidas sobre a Lookcase: como funciona, pagamento das vendas, cancelamento e limite de produtos.',
    url: 'https://lookcase.app.br/faq',
    siteName: 'Lookcase',
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function FAQPage() {
  return (
    <main className="min-h-screen pt-20" style={{ background: 'var(--color-lk-surface)' }}>
      <FAQSection headingAs="h1" />

      <div className="px-5 lg:px-10 pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-display text-[20px] lg:text-[24px] font-medium tracking-[-0.02em] mb-3 text-lk-white">
            Não achou sua resposta?
          </p>
          <p className="font-body text-[14px] leading-[1.7] mb-6 text-lk-gray-500">
            Fala com a gente. Respondemos por WhatsApp em minutos.
          </p>
          <Link
            href="/contato"
            className="inline-block font-display text-[14px] font-semibold px-6 py-3 rounded-full border border-lk-orange text-lk-orange hover:bg-lk-subtle transition-colors"
          >
            Falar com a gente
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
