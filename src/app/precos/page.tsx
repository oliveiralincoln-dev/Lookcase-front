import type { Metadata } from 'next'
import { PricingSection } from '@/components/sections/pricing-section'

export const metadata: Metadata = {
  title: 'Lookcase — Planos e preços',
  description: 'Planos a partir de R$ 59/mês, sem taxa por venda. 7 dias grátis em qualquer plano, sem cartão de crédito.',
}

export default function PrecosPage() {
  return (
    <main className="min-h-screen bg-lk-base pt-20">
      <PricingSection />
    </main>
  )
}
