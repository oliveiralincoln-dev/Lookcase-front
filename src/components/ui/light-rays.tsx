'use client'

import { motion } from 'motion/react'

const RAYS = [
  { left: '5%',  angle: -14, opacity: 0.10, dur: 7.2,  delay: 0,    w: 70 },
  { left: '16%', angle: -8,  opacity: 0.07, dur: 9.5,  delay: 1.2,  w: 55 },
  { left: '26%', angle: -4,  opacity: 0.12, dur: 6.8,  delay: 0.5,  w: 80 },
  { left: '38%', angle: -1,  opacity: 0.08, dur: 11.0, delay: 2.1,  w: 60 },
  { left: '50%', angle: 0,   opacity: 0.14, dur: 8.3,  delay: 0.3,  w: 95 },
  { left: '61%', angle: 3,   opacity: 0.08, dur: 10.2, delay: 1.7,  w: 60 },
  { left: '72%', angle: 6,   opacity: 0.12, dur: 7.6,  delay: 0.9,  w: 78 },
  { left: '83%', angle: 10,  opacity: 0.07, dur: 9.0,  delay: 2.5,  w: 55 },
  { left: '93%', angle: 15,  opacity: 0.09, dur: 6.5,  delay: 1.4,  w: 65 },
]

export function LightRays() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {RAYS.map((ray, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            top: 0,
            left: ray.left,
            width: ray.w,
            height: '80%',
            rotate: ray.angle,
            transformOrigin: 'top center',
            background: `linear-gradient(to bottom, rgba(249,115,22,${ray.opacity}) 0%, rgba(249,115,22,0) 100%)`,
            filter: 'blur(44px)',
            borderRadius: '0 0 100px 100px',
          }}
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: ray.dur, delay: ray.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
