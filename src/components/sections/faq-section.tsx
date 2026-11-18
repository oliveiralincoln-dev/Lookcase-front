'use client'

import { useState } from 'react'

export const FAQ_ITEMS = [
  {
    q: 'Preciso saber mexer em tecnologia?',
    a: 'Não. Tudo acontece no painel visual da Lookcase, sem curva de aprendizado — poucos cliques pra cadastrar produto, configurar a loja e acompanhar pedidos.',
  },
  {
    q: 'Minha cliente precisa baixar algum aplicativo?',
    a: 'Não. A vitrine abre no navegador do celular normalmente. Sem download, sem cadastro, sem senha. Ela acessa, escolhe e manda mensagem pelo WhatsApp que já tem.',
  },
  {
    q: 'Como funciona o pagamento das vendas?',
    a: 'Você combina direto com a cliente pelo WhatsApp — Pix, dinheiro ou cartão na entrega, do jeito que preferir. O dinheiro cai na sua conta, sem passar pela Lookcase e sem taxa por venda.',
  },
  {
    q: 'E se eu não gostar?',
    a: 'Cancela quando quiser, direto no painel, em menos de 1 minuto. Sem ligar pra ninguém, sem justificar, sem multa.',
  },
  {
    q: 'Quantos produtos posso cadastrar?',
    a: 'Quantos você quiser — não tem limite. O cadastro é feito pelo painel, com foto real do produto, e já entra na sua vitrine na hora.',
  },
]

export function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  const toggleItem = (i: number) => {
    setOpenItems(prev => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <section id="faq" className="px-5 lg:px-10 py-14 lg:py-20">

      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-[28px] lg:text-[40px] font-medium tracking-[-0.03em] leading-[1.05] mb-12 text-center">
          Perguntas frequentes.
        </h2>

        <div className="flex flex-col gap-2">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden"
              style={{
                background: 'var(--color-lk-card)',
                border: openItems.has(i)
                  ? '1px solid rgba(249,115,22,0.25)'
                  : '1px solid var(--color-lk-border)',
                transition: 'border-color 0.2s ease',
              }}
            >
              <button
                onClick={() => toggleItem(i)}
                className="w-full flex items-center justify-between gap-6 px-5 py-[18px] text-left"
              >
                <p
                  className="font-display text-[15px] font-medium tracking-[-0.01em] transition-colors duration-200"
                  style={{ color: openItems.has(i) ? 'var(--color-lk-white)' : 'var(--color-lk-gray-100)' }}
                >
                  {item.q}
                </p>

                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    border: openItems.has(i)
                      ? '1px solid rgba(249,115,22,0.35)'
                      : '1px solid var(--color-lk-border-strong)',
                    color: openItems.has(i) ? 'var(--color-lk-orange)' : 'var(--color-lk-gray-500)',
                    transform: openItems.has(i) ? 'rotate(45deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease, border-color 0.2s ease, color 0.2s ease',
                  }}
                >
                  <span className="text-[17px] leading-none font-light">+</span>
                </div>
              </button>

              <div
                className="overflow-hidden"
                style={{
                  maxHeight: openItems.has(i) ? '480px' : '0px',
                  opacity: openItems.has(i) ? 1 : 0,
                  transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease',
                }}
              >
                <p
                  className="font-body text-[13.5px] leading-[1.7] px-5 pb-5 text-center"
                  style={{ color: 'var(--color-lk-gray-500)' }}
                >
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
