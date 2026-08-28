import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/footer'
import { H2, P } from '@/components/content-typography'

export const metadata: Metadata = {
  title: 'Como organizar pedidos pelo WhatsApp sem perder nenhum — Lookcase',
  description:
    'Pedido some no meio da conversa? Veja práticas simples pra organizar vendas pelo WhatsApp sem perder pedido nem cliente — sem planilha complicada.',
  alternates: {
    canonical: 'https://lookcase.app.br/guias/organizar-pedidos-whatsapp',
  },
  openGraph: {
    title: 'Como organizar pedidos pelo WhatsApp sem perder nenhum',
    description:
      'Práticas simples pra parar de perder pedido no meio da conversa e organizar suas vendas pelo WhatsApp.',
    url: 'https://lookcase.app.br/guias/organizar-pedidos-whatsapp',
    siteName: 'Lookcase',
    locale: 'pt_BR',
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Como organizar pedidos pelo WhatsApp sem perder nenhum',
  description:
    'Práticas simples pra parar de perder pedido no meio da conversa e organizar suas vendas pelo WhatsApp.',
  author: { '@type': 'Organization', name: 'Lookcase' },
  publisher: { '@type': 'Organization', name: 'Lookcase' },
  mainEntityOfPage: 'https://lookcase.app.br/guias/organizar-pedidos-whatsapp',
}

export default function GuiaOrganizarPedidosWhatsApp() {
  return (
    <main className="min-h-screen pt-32" style={{ background: 'var(--color-lk-surface)' }}>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="max-w-[680px] mx-auto px-5 lg:px-0 pb-24">
        <p
          className="font-body text-[11px] font-semibold uppercase tracking-[0.12em] mb-4"
          style={{ color: 'var(--color-lk-orange)' }}
        >
          Guia prático
        </p>

        <h1
          className="font-display text-[32px] lg:text-[44px] font-medium tracking-[-0.03em] leading-[1.08] mb-6"
          style={{ color: 'var(--color-lk-white)' }}
        >
          Como organizar pedidos pelo WhatsApp sem perder nenhum
        </h1>

        <P>
          Chega uma hora em que as conversas se acumulam: um pedido combinado ontem, uma pergunta de
          hoje de manhã, uma cliente que perguntou o preço e sumiu. No meio disso, é fácil confirmar um
          pedido, esquecer de anotar e só lembrar quando ela cobra a entrega. O problema não é você — é
          que o WhatsApp foi feito pra conversar, não pra ser sistema de pedido. Ele não separa
          &ldquo;só perguntando&rdquo; de &ldquo;já vou levar&rdquo;, não guarda endereço, não soma total.
          Isso sobra pra sua cabeça.
        </P>
        <P>
          Abaixo estão práticas simples, sem aplicativo complicado nem planilha de fórmula, pra reduzir
          esse ruído — e, no final, uma forma de tirar boa parte disso da sua cabeça de vez.
        </P>

        <H2>1. Separe &ldquo;interessou&rdquo; de &ldquo;pedido confirmado&rdquo;</H2>
        <P>
          A maior fonte de pedido perdido é tratar as duas coisas como se fossem a mesma. Alguém
          perguntar o preço não é pedido. Alguém mandar &ldquo;quero esse&rdquo; sem dizer tamanho, cor
          ou forma de retirada também não é — ainda falta fechar. Só conta como pedido confirmado quando
          tiver, por escrito, o quê, quanto e como. Se faltar qualquer um desses três, ainda está em
          aberto, mesmo que pareça resolvido na sua cabeça.
        </P>

        <H2>2. Sempre feche o pedido com um resumo por escrito</H2>
        <P>
          Depois de combinar os detalhes na conversa, mande um resumo curto: item, quantidade,
          tamanho/cor quando fizer sentido, valor e forma de entrega. Não precisa ser formal — duas
          linhas bastam. Isso faz duas coisas: a cliente confirma que entendeu certo (evita troca depois),
          e você cria um ponto fixo na conversa pra achar o pedido rápido, sem precisar rolar a tela pra
          cima procurando onde ele foi combinado.
        </P>

        <H2>3. Tenha uma lista única de pedidos em aberto</H2>
        <P>
          Não precisa ser sofisticada — pode ser um bloco de notas, uma nota fixada no celular, o que
          for. O importante é existir <em>fora</em> do WhatsApp, num lugar só, que você atualiza toda vez
          que um pedido fecha ou é entregue. O WhatsApp guarda a conversa, mas não guarda status. Sem uma
          lista separada, o único jeito de saber o que ainda falta entregar é reler dezenas de conversas
          — e é exatamente aí que um pedido escapa.
        </P>

        <H2>4. Combine um prazo de resposta e avise quando não puder cumprir</H2>
        <P>
          Boa parte da sensação de &ldquo;bagunça&rdquo; vem de expectativa quebrada, não de erro real.
          Se você normalmente responde em algumas horas, diga isso quando a cliente perguntar sobre o
          pedido — e, se um dia atrasar, mande um aviso curto antes que ela pergunte. Um pedido que
          demora mas é acompanhado gera muito menos reclamação do que um pedido rápido que fica em
          silêncio no meio do caminho.
        </P>

        <H2>5. Evite montar o pedido a partir de fotos soltas</H2>
        <P>
          Quando a cliente escolhe direto pelas fotos que você manda no chat, é fácil perder a referência
          de qual produto, tamanho e preço ela quis — principalmente se ela muda de ideia no meio. Ter um
          catálogo ou vitrine com preço e variações visíveis (mesmo que simples) resolve isso na origem:
          ela escolhe olhando os dados certos, e o que chega pra você já vem com essa parte resolvida.
        </P>

        <H2>Quando vale a pena automatizar essa parte</H2>
        <P>
          Essas práticas resolvem o problema até um certo volume — normalmente enquanto os pedidos ainda
          cabem na sua memória de curto prazo. Quando isso começa a virar trabalho todo dia, geralmente
          compensa tirar a montagem do pedido da sua cabeça. É esse pedaço específico que a{' '}
          <Link href="/" className="underline hover:no-underline" style={{ color: 'var(--color-lk-orange)' }}>
            Lookcase
          </Link>{' '}
          resolve: você monta a vitrine uma vez, a cliente escolhe os itens num carrinho normal, e a
          mensagem chega pronta no seu WhatsApp — já com produto, quantidade e total, sem depender de
          ninguém escrever certo. O fechamento continua sendo por WhatsApp, do jeito que já funciona pra
          você; só a parte de montar o pedido sai da sua cabeça.
        </P>
        <P>
          Se quiser ver como fica na prática, os planos e o passo a passo estão em{' '}
          <Link href="/precos" className="underline hover:no-underline" style={{ color: 'var(--color-lk-orange)' }}>
            lookcase.app.br/precos
          </Link>
          .
        </P>
      </article>
      <Footer />
    </main>
  )
}
