'use client'

import { LookcaseMark } from '@/components/ui/lookcase-mark'

const ORANGE = '#F97035'

export function PromiseSection() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-20 max-w-[1200px] mx-auto">
      <div
        className="rounded-[28px] overflow-hidden relative min-h-[460px] sm:min-h-[420px]"
        style={{ background: ORANGE }}
      >
        {/* Vídeo ocupa o card inteiro como fundo */}
        <video
          src="/promise-card.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
          }}
        />

        {/* Overlay laranja: opaco à esquerda, some à direita */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to right,
              ${ORANGE} 0%,
              ${ORANGE} 30%,
              rgba(249,112,53,0.88) 48%,
              rgba(249,112,53,0.25) 68%,
              transparent 100%
            )`,
            zIndex: 1,
          }}
        />

        {/* Fade sutil na base — disfarça marca d'água naturalmente */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 90,
            background: `linear-gradient(to top, ${ORANGE} 0%, transparent 100%)`,
            zIndex: 2,
          }}
        />

        {/* Logo — canto superior esquerdo, absoluta */}
        <div className="absolute z-[4] top-5 left-5 sm:top-8 sm:left-12">
          <LookcaseMark size={44} />
        </div>

        {/* Conteúdo: texto base-esquerda */}
        <div className="relative z-[3] flex flex-col justify-end px-6 py-10 sm:px-12 sm:py-11 max-w-full sm:max-w-[52%] min-h-[460px] sm:min-h-[420px]">
          <div>
            <h2
              style={{
                color: 'rgba(0,0,0,0.9)',
                fontSize: 'clamp(24px, 2.6vw, 40px)',
                fontWeight: 700,
                lineHeight: 1.15,
                margin: '0 0 12px',
                letterSpacing: '-0.02em',
              }}
            >
              A loja que trabalha por você.
            </h2>
            <p
              style={{
                color: 'rgba(0,0,0,0.58)',
                fontSize: 15,
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              Seus produtos organizados, seus pedidos chegando, sua marca crescendo — tudo num só lugar.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
