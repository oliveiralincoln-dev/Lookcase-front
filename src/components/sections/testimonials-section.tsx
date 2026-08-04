'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Mariana Ferreira',
    company: 'Moda da Mari · Goiânia, GO',
    content: 'Antes eu perdia venda toda hora porque a cliente perguntava e eu demorava pra responder. Agora ela abre minha loja, escolhe sozinha e me manda o pedido pronto.',
    badge: '+67% de pedidos no 1º mês',
  },
  {
    id: 2,
    name: 'Camila Rocha',
    company: 'CR Modas · São Paulo, SP',
    content: 'Mando o link e a cliente já vê tudo: foto, tamanho e preço. Antes eu tinha que mandar foto por foto no DM e ainda perdia a pergunta no meio.',
    badge: null,
  },
  {
    id: 3,
    name: 'Juliana Santos',
    company: 'Juli Store · Belo Horizonte, MG',
    content: 'Configurei no sábado à tarde pelo WhatsApp. Na segunda já tinha 3 pedidos de clientes que nunca tinham comprado comigo antes.',
    badge: null,
  },
  {
    id: 4,
    name: 'Fernanda Lima',
    company: 'Fê Boutique · Recife, PE',
    content: 'Zero taxa por venda foi o que me convenceu. Tenho margem pequena e cada centavo conta. Aqui pago só a mensalidade — o lucro é todo meu.',
    badge: null,
  },
  {
    id: 5,
    name: 'Ana Paula Costa',
    company: 'AP Moda · Porto Alegre, RS',
    content: 'Minha cliente não precisa baixar nada nem fazer cadastro. Ela abre o link, escolhe e manda mensagem. Nunca tive uma reclamação sobre isso.',
    badge: null,
  },
]

const INTERVAL_MS = 3500

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex(i => (i + 1) % TESTIMONIALS.length)
    }, INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  const next = () => setActiveIndex(i => (i + 1) % TESTIMONIALS.length)

  return (
    <section id="depoimentos" className="px-5 lg:px-10 py-14 lg:py-20 overflow-x-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* LEFT — título + navegação */}
        <div>
          <h2 className="font-display text-[28px] lg:text-[40px] font-medium tracking-[-0.03em] leading-[1.05] mb-2">
            Quem usa, não volta<br />
            <span className="text-lk-gray-500">pro improviso de antes.</span>
          </h2>
          <p className="font-body text-[15px] text-lk-gray-500 mb-10">
            Resultados reais de lojistas que saíram do caos.
          </p>

          {/* Dots + botão próximo */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Depoimento ${i + 1}`}
                  className="rounded-full transition-all duration-300"
                  style={{
                    height: 8,
                    width: activeIndex === i ? 28 : 8,
                    background: activeIndex === i
                      ? 'var(--color-lk-orange)'
                      : 'rgba(255,255,255,0.12)',
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="flex items-center gap-1 font-body text-[12px] transition-all duration-200 hover:gap-2"
              style={{ color: 'var(--color-lk-gray-500)' }}
            >
              Próximo <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* RIGHT — cards empilhados animados */}
        <div className="relative min-h-[300px]">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              className="absolute inset-0"
              initial={{ opacity: 0, x: 60 }}
              animate={{
                opacity: activeIndex === i ? 1 : 0,
                x: activeIndex === i ? 0 : 60,
                scale: activeIndex === i ? 1 : 0.97,
              }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ zIndex: activeIndex === i ? 10 : 0 }}
            >
              <div
                className="h-full flex flex-col p-8 rounded-2xl"
                style={{
                  background: 'var(--color-lk-surface)',
                  border: '1px solid var(--color-lk-border)',
                }}
              >
                {/* Stars */}
                <div className="flex items-center gap-[5px] mb-6">
                  {[0,1,2,3,4].map(s => (
                    <svg key={s} width="15" height="15" viewBox="0 0 15 15" fill="none">
                      <path d="M7.5 1L9.18 5.45H14L10.41 8.05L11.91 12.5L7.5 9.9L3.09 12.5L4.59 8.05L1 5.45H5.82L7.5 1Z" fill="#E5E5E5"/>
                    </svg>
                  ))}
                </div>

                {/* Citação */}
                <p className="font-display text-[17px] lg:text-[19px] font-medium text-lk-white tracking-[-0.02em] leading-[1.5] flex-1 mb-6">
                  &quot;{t.content}&quot;
                </p>

                {/* Divisor */}
                <div className="h-[1px] bg-lk-border mb-5" />

                {/* Autor */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-display text-[14px] font-medium text-lk-white">{t.name}</p>
                    <p className="font-body text-[12px] text-lk-gray-500">{t.company}</p>
                  </div>
                  {t.badge && (
                    <div
                      className="font-body text-[11px] font-semibold px-3 py-[5px] rounded-lg whitespace-nowrap"
                      style={{
                        background: 'rgba(34,197,94,0.08)',
                        border: '1px solid rgba(34,197,94,0.15)',
                        color: '#4ade80',
                      }}
                    >
                      {t.badge}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
