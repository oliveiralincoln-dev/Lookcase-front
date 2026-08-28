import { LookcaseMark } from '@/components/ui/lookcase-mark'

export function Footer() {
  return (
    <footer className="border-t border-lk-border" style={{ position: 'sticky', bottom: 0, zIndex: -1 }}>

      {/* Corpo do footer */}
      <div className="px-5 lg:px-10 py-10 lg:py-12 flex flex-col lg:grid lg:[grid-template-columns:1.2fr_1fr_1fr] gap-8 lg:gap-12">

        {/* Coluna 1 — Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <LookcaseMark size={24} />
            <span className="font-display text-[16px] font-medium text-lk-white">
              Lookcase
            </span>
          </div>
          <p className="font-body text-[13px] text-lk-gray-500 leading-[1.6] max-w-[200px] mb-6">
            A loja online do empreendedor de moda brasileiro.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Meta', 'WhatsApp API', 'SSL', 'LGPD'].map((badge) => (
              <span
                key={badge}
                className="font-body text-[11px] font-medium text-lk-gray-400 bg-lk-surface border border-lk-border rounded-md px-[10px] py-[4px]"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Coluna 2 — Produto */}
        <div>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.08em] text-lk-gray-600 mb-4">
            Produto
          </p>
          {[
            { label: 'Como funciona', href: '/#como-funciona' },
            { label: 'Funcionalidades', href: '/#produto' },
            { label: 'Planos e preços', href: '/precos' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block font-body text-[13px] text-lk-gray-500 mb-3 hover:text-lk-gray-100 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Coluna 3 — Empresa */}
        <div>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.08em] text-lk-gray-600 mb-4">
            Empresa
          </p>
          {[
            { label: 'Sobre o Lookcase', href: '/sobre' },
            { label: 'Contato', href: '/contato' },
            { label: 'Termos de uso', href: '/termos' },
            { label: 'Política de privacidade', href: '/privacidade' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block font-body text-[13px] text-lk-gray-500 mb-3 hover:text-lk-gray-100 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

      </div>

      {/* Rodapé do footer */}
      <div className="px-5 lg:px-10 py-5 border-t border-lk-border flex items-center justify-center">
        <span className="font-body text-[12px] text-lk-gray-600">
          © 2026 Lookcase · Todos os direitos reservados
        </span>
      </div>

    </footer>
  )
}
