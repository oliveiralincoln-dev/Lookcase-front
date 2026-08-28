import type { Metadata } from 'next'
import { Footer } from '@/components/footer'
import { H1, H2, P } from '@/components/content-typography'

export const metadata: Metadata = {
  title: 'Lookcase — Termos de Uso',
  description: 'Termos de uso da Lookcase: como funciona a assinatura, cancelamento, reajuste de preço e regras de uso do serviço.',
  alternates: { canonical: 'https://lookcase.app.br/termos' },
  openGraph: {
    title: 'Lookcase — Termos de Uso',
    description: 'Termos de uso da Lookcase: como funciona a assinatura, cancelamento, reajuste de preço e regras de uso do serviço.',
    url: 'https://lookcase.app.br/termos',
    siteName: 'Lookcase',
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function TermosPage() {
  return (
    <main className="min-h-screen pt-32" style={{ background: 'var(--color-lk-surface)' }}>
      <article className="max-w-[680px] mx-auto px-5 lg:px-0 pb-24">
        <H1>Termos de Uso</H1>
        <p className="font-body text-[13px] mb-10" style={{ color: 'var(--color-lk-gray-500)' }}>
          Última atualização: 28 de agosto de 2026
        </p>

        <H2>1. Quem somos</H2>
        <P>
          A Lookcase é um serviço de vitrine digital oferecido por <strong>Lincoln Oliveira</strong>,
          pessoa física (atualmente sem CNPJ), doravante &ldquo;Lookcase&rdquo;, &ldquo;nós&rdquo;.
          Contato:{' '}
          <a href="mailto:contato@lookcase.app.br" className="underline hover:no-underline" style={{ color: 'var(--color-lk-orange)' }}>
            contato@lookcase.app.br
          </a>
          .
        </P>

        <H2>2. O que é o serviço</H2>
        <P>
          A Lookcase permite que lojistas criem uma vitrine digital de produtos (fotos, preços,
          variações) para que seus clientes montem pedidos, que são então enviados via WhatsApp para
          o lojista fechar a venda diretamente com o cliente. A Lookcase não processa pagamento entre
          lojista e cliente final — isso continua acontecendo por fora, do jeito que o lojista já
          negocia hoje.
        </P>

        <H2>3. Cadastro e conta</H2>
        <P>
          Para usar a Lookcase, você cria uma conta com nome e e-mail (autenticação processada por
          nosso parceiro Clerk). Você é responsável por manter suas credenciais em sigilo e por toda
          atividade realizada na sua conta.
        </P>

        <H2>4. Planos e pagamento</H2>
        <P>
          O uso da Lookcase é pago por assinatura mensal recorrente, processada por nosso parceiro
          Stripe. Ao assinar, você autoriza cobranças recorrentes no método de pagamento cadastrado
          até que cancele.
        </P>
        <P>
          <strong>Cancelamento:</strong> você pode cancelar sua assinatura a qualquer momento, sem
          multa. O acesso continua disponível até o fim do ciclo já pago, sem reembolso proporcional
          pelo período não utilizado.
        </P>
        <P>
          <strong>Reajuste de preço:</strong> o valor da mensalidade pode ser reajustado, com aviso
          prévio de pelo menos 30 dias antes de o novo valor entrar em vigor na sua cobrança.
        </P>

        <H2>5. Uso aceitável</H2>
        <P>
          Você concorda em não usar a Lookcase para vender produtos ilegais, falsificados, ou para
          qualquer atividade fraudulenta. A Lookcase pode suspender contas que violem esta seção, com
          aviso prévio quando possível.
        </P>

        <H2>6. Disponibilidade do serviço</H2>
        <P>
          Fazemos o possível para manter o serviço disponível, mas não garantimos operação
          ininterrupta. Nossos provedores de infraestrutura (Vercel, Supabase) podem ter manutenções
          ou instabilidades pontuais fora do nosso controle.
        </P>

        <H2>7. Limitação de responsabilidade</H2>
        <P>
          Na máxima extensão permitida pela lei, a Lookcase não se responsabiliza por danos
          indiretos, lucros cessantes, perda de dados ou de oportunidade de negócio decorrentes do
          uso ou da impossibilidade de uso do serviço. A responsabilidade total da Lookcase perante
          você, em qualquer hipótese, está limitada ao valor pago por você nos últimos 3 (três) meses
          de assinatura.
        </P>

        <H2>8. Alterações nestes termos</H2>
        <P>
          Podemos atualizar estes Termos de Uso periodicamente. Mudanças relevantes serão
          comunicadas por e-mail ou aviso no painel.
        </P>

        <H2>9. Legislação aplicável</H2>
        <P>
          Estes termos são regidos pelas leis brasileiras, com foro eleito no domicílio do
          responsável pela Lookcase.
        </P>
      </article>
      <Footer />
    </main>
  )
}
