import type { Metadata } from 'next'
import { Footer } from '@/components/footer'
import { H1, P } from '@/components/content-typography'

export const metadata: Metadata = {
  title: 'Lookcase — Sobre',
  description: 'Conheça a Lookcase: vitrine digital pra quem vende roupa pelo WhatsApp, sem taxa por venda e sem complicação.',
  alternates: { canonical: 'https://lookcase.app.br/sobre' },
  openGraph: {
    title: 'Lookcase — Sobre',
    description: 'Conheça a Lookcase: vitrine digital pra quem vende roupa pelo WhatsApp, sem taxa por venda e sem complicação.',
    url: 'https://lookcase.app.br/sobre',
    siteName: 'Lookcase',
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function SobrePage() {
  return (
    <main className="min-h-screen pt-32" style={{ background: 'var(--color-lk-surface)' }}>
      <article className="max-w-[680px] mx-auto px-5 lg:px-0 pb-24">
        <H1>Sobre o Lookcase</H1>
        <P>
          A Lookcase nasceu de um problema simples: lojista de roupa que vende pelo WhatsApp perde
          venda toda hora porque o WhatsApp não foi feito pra ser vitrine. Não separa &ldquo;só
          perguntando&rdquo; de &ldquo;já vou levar&rdquo;, não guarda catálogo, não soma pedido.
        </P>
        <P>
          A gente resolve essa parte específica. Você monta sua vitrine uma vez — fotos, preço,
          variações — e manda o link pra cliente. Ela escolhe os itens num carrinho normal, como
          faria em qualquer loja online, e o pedido chega pronto no seu WhatsApp: produto, quantidade
          e total, sem depender de ninguém escrever certo. O fechamento continua sendo por WhatsApp,
          do jeito que já funciona pra você — só a parte de montar o pedido sai da sua cabeça.
        </P>
        <P>
          Sem taxa por venda, sem aplicativo complicado pro seu cliente instalar, sem curva de
          aprendizado. Uma mensalidade, loja no ar, você vende.
        </P>
      </article>
      <Footer />
    </main>
  )
}
