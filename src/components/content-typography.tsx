import Link from 'next/link'

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-body text-[11px] font-semibold uppercase tracking-[0.12em] mb-4"
      style={{ color: 'var(--color-lk-orange)' }}
    >
      {children}
    </p>
  )
}

export function H1({ children }: { children: React.ReactNode }) {
  return (
    <h1
      className="font-display text-[32px] lg:text-[44px] font-medium tracking-[-0.03em] leading-[1.08] mb-6"
      style={{ color: 'var(--color-lk-white)' }}
    >
      {children}
    </h1>
  )
}

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-display text-[24px] lg:text-[28px] font-medium tracking-[-0.02em] leading-[1.15] mt-12 mb-4"
      style={{ color: 'var(--color-lk-white)' }}
    >
      {children}
    </h2>
  )
}

export function P({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-body text-[15px] lg:text-[16px] leading-[1.8] mb-5"
      style={{ color: 'var(--color-lk-gray-400)' }}
    >
      {children}
    </p>
  )
}

export function List({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mb-5 pl-5" style={{ listStyleType: 'disc' }}>
      {items.map((item, i) => (
        <li
          key={i}
          className="font-body text-[15px] lg:text-[16px] leading-[1.8] mb-2"
          style={{ color: 'var(--color-lk-gray-400)' }}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

export function ContentLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="underline hover:no-underline" style={{ color: 'var(--color-lk-orange)' }}>
      {children}
    </Link>
  )
}
