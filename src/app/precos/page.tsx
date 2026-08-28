import type { Metadata } from 'next'
import { PricingSection } from '@/components/sections/pricing-section'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Lookcase — Preço da assinatura',
  description: 'R$ 47,90/mês, produtos ilimitados, sem taxa por venda. Cancele quando quiser, direto no painel.',
}

export default function PrecosPage() {
  return (
    <main
      className="pt-20"
      style={{
        background: 'linear-gradient(180deg, #F97035 0%, #F97035 52%, var(--color-lk-surface) 82%, var(--color-lk-base) 100%)',
      }}
    >
      <PricingSection />
      <Footer />
    </main>
  )
}
