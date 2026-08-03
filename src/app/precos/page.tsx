import type { Metadata } from 'next'
import { PricingSection } from '@/components/sections/pricing-section'

export const metadata: Metadata = {
  title: 'Lookcase — Planos e preços',
  description: 'Planos a partir de R$ 59/mês, sem taxa por venda. 7 dias grátis em qualquer plano, sem cartão de crédito.',
}

export default function PrecosPage() {
  return (
    <main
      className="min-h-screen pt-20"
      style={{
        background: 'linear-gradient(180deg, #170D06 0%, #170D06 6%, #F97316 22%, #FCE8D8 30%, #7A3B12 48%, #0A0A0A 68%, #0A0A0A 100%)',
      }}
    >
      <PricingSection />
    </main>
  )
}
