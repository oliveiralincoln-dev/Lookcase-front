'use client'

import React, { useId } from 'react'

type MarqueeProps = {
  children: React.ReactNode
  direction?: 'left' | 'right'
  speed?: number
  pauseOnHover?: boolean
  className?: string
}

export function Marquee({
  children,
  direction = 'left',
  speed = 30,
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  const id = useId().replace(/:/g, '')
  const animationName = direction === 'left' ? `marquee-l-${id}` : `marquee-r-${id}`

  return (
    <>
      <style>{`
        @keyframes ${animationName} {
          from { transform: translateX(${direction === 'left' ? '0' : '-50%'}); }
          to   { transform: translateX(${direction === 'left' ? '-50%' : '0'}); }
        }
      `}</style>
      <div
        className={className}
        style={{
          overflow: 'hidden',
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 'max-content',
            animation: `${animationName} ${speed}s linear infinite`,
          }}
          {...(pauseOnHover ? {
            onMouseEnter: (e) => { (e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused' },
            onMouseLeave: (e) => { (e.currentTarget as HTMLDivElement).style.animationPlayState = 'running' },
          } : {})}
        >
          {children}
          {children}
        </div>
      </div>
    </>
  )
}

type MarqueeCardProps = {
  icon: React.ReactNode
  title: string
  description: string
}

export function MarqueeCard({ icon, title, description }: MarqueeCardProps) {
  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid rgba(10,10,10,0.08)',
        borderRadius: '12px',
        padding: '20px',
        minWidth: '220px',
        maxWidth: '240px',
        flexShrink: 0,
        marginRight: '12px',
      }}
    >
      <div style={{ color: '#F97316', width: 20, height: 20 }}>
        {icon}
      </div>
      <p
        style={{
          fontSize: '14px',
          fontWeight: 500,
          color: '#0A0A0A',
          marginTop: '12px',
          lineHeight: 1.3,
        }}
      >
        {title}
      </p>
      <p
        style={{
          fontSize: '12px',
          color: '#6B6257',
          lineHeight: 1.5,
          marginTop: '6px',
        }}
      >
        {description}
      </p>
    </div>
  )
}
