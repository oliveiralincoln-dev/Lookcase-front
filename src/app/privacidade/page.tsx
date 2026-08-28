import type { Metadata } from 'next'
import { Footer } from '@/components/footer'
import { H1, H2, P, List } from '@/components/content-typography'

export const metadata: Metadata = {
  title: 'Lookcase — Política de Privacidade',
  description: 'Como a Lookcase coleta, usa e protege seus dados pessoais, em conformidade com a LGPD.',
  alternates: { canonical: 'https://lookcase.app.br/privacidade' },
  openGraph: {
    title: 'Lookcase — Política de Privacidade',
    description: 'Como a Lookcase coleta, usa e protege seus dados pessoais, em conformidade com a LGPD.',
    url: 'https://lookcase.app.br/privacidade',
    siteName: 'Lookcase',
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen pt-32" style={{ background: 'var(--color-lk-surface)' }}>
      <article className="max-w-[680px] mx-auto px-5 lg:px-0 pb-24">
        <H1>Política de Privacidade</H1>
        <p className="font-body text-[13px] mb-10" style={{ color: 'var(--color-lk-gray-500)' }}>
          Última atualização: 28 de agosto de 2026
        </p>

        <P>
          Esta política explica como a Lookcase coleta, usa e protege seus dados pessoais, em
          conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
        </P>

        <H2>1. Quem é o controlador</H2>
        <P>
          <strong>Lincoln Oliveira</strong>, responsável pela Lookcase, é o controlador dos dados
          tratados neste serviço. Contato:{' '}
          <a href="mailto:contato@lookcase.app.br" className="underline hover:no-underline" style={{ color: 'var(--color-lk-orange)' }}>
            contato@lookcase.app.br
          </a>
          .
        </P>

        <H2>2. Quais dados coletamos</H2>
        <List
          items={[
            <>
              <strong>Dados de cadastro</strong> (lojista): nome e e-mail, coletados no momento da
              criação da conta via Clerk.
            </>,
            <>
              <strong>Dados de pagamento</strong> (lojista): processados diretamente pelo Stripe — a
              Lookcase não armazena número de cartão.
            </>,
            <>
              <strong>Dados da vitrine e pedidos</strong>: produtos cadastrados pelo lojista e
              informações de pedidos montados pelos clientes finais (nome do item, quantidade,
              valor), armazenados em nosso banco de dados (Supabase).
            </>,
            <>
              <strong>Dados de navegação</strong>: informações básicas de uso do site coletadas
              automaticamente (ex.: logs de acesso).
            </>,
          ]}
        />

        <H2>3. Para que usamos esses dados</H2>
        <List
          items={[
            'Viabilizar login e uso da plataforma (execução de contrato).',
            'Processar cobrança da assinatura (execução de contrato).',
            'Comunicação sobre o serviço, suporte e avisos importantes (execução de contrato / legítimo interesse).',
          ]}
        />

        <H2>4. Com quem compartilhamos dados</H2>
        <P>
          Usamos os seguintes parceiros (operadores, na definição da LGPD) para viabilizar o serviço:
        </P>
        <List
          items={[
            <><strong>Clerk</strong> — autenticação e gestão de contas.</>,
            <><strong>Stripe</strong> — processamento de pagamentos e cobrança recorrente.</>,
            <><strong>Supabase</strong> — armazenamento de banco de dados.</>,
            <><strong>Vercel</strong> — hospedagem da aplicação.</>,
          ]}
        />
        <P>
          Esses parceiros podem processar dados fora do Brasil. Não vendemos dados pessoais a
          terceiros para fins de publicidade.
        </P>

        <H2>5. Por quanto tempo guardamos os dados</H2>
        <P>
          Mantemos os dados enquanto sua conta estiver ativa. Após o encerramento da conta, os dados
          são excluídos logo em seguida, exceto quando houver obrigação legal que exija guarda por
          prazo maior (ex.: dados de cobrança, para fins fiscais).
        </P>

        <H2>6. Seus direitos como titular</H2>
        <P>
          Conforme o art. 18 da LGPD, você pode solicitar a qualquer momento: confirmação de
          tratamento, acesso aos dados, correção de dados incompletos ou desatualizados,
          anonimização/eliminação de dados desnecessários, portabilidade, informação sobre
          compartilhamento, e revogação do consentimento. Solicitações podem ser feitas por{' '}
          <a href="mailto:contato@lookcase.app.br" className="underline hover:no-underline" style={{ color: 'var(--color-lk-orange)' }}>
            contato@lookcase.app.br
          </a>
          .
        </P>

        <H2>7. Canal de comunicação (LGPD para pequenos negócios)</H2>
        <P>
          Em conformidade com a Resolução CD/ANPD nº 2/2022, que dispensa micro e pequenos negócios
          da nomeação formal de um Encarregado de Dados (DPO), o canal oficial para questões de
          privacidade é: contato@lookcase.app.br.
        </P>

        <H2>8. Cookies</H2>
        <P>
          A Lookcase não utiliza cookies de analytics ou rastreamento hoje. Usamos apenas cookies
          estritamente necessários para manter sua sessão de login ativa (via Clerk). Se isso mudar
          no futuro, esta seção será atualizada.
        </P>

        <H2>9. Alterações nesta política</H2>
        <P>
          Podemos atualizar esta política periodicamente. Mudanças relevantes serão comunicadas por
          e-mail ou aviso no site.
        </P>
      </article>
      <Footer />
    </main>
  )
}
