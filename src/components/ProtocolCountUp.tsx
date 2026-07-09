'use client'

import React, { useEffect, useRef, useState } from 'react'

// Ported verbatim from the mockup's animateNumber() function: parses a
// prefix/number/suffix out of the final text (so "17,000+" or "254" both
// work), eases from 0 to the target over 1100ms (ease-out-cubic), one-shot
// at 60% visible, comma-formatting preserved, and untouched under
// prefers-reduced-motion.
export const ProtocolCountUp: React.FC<{ value?: string | null; as?: 'span' | 'div' | 'b' }> = ({ value, as: As = 'span' }) => {
  const finalText = String(value ?? '')
  const elRef = useRef<HTMLElement | null>(null)
  const [display, setDisplay] = useState(finalText)

  useEffect(() => {
    setDisplay(finalText)
    const el = elRef.current
    if (!el) return
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const m = finalText.match(/^(\D*)([\d.,]+)(.*)$/)
    if (!m) return
    const prefix = m[1]
    const numStr = m[2]
    const suffix = m[3]
    const hasComma = numStr.indexOf(',') > -1
    const target = parseFloat(numStr.replace(/,/g, ''))
    if (!isFinite(target)) return

    const fmt = (v: number) => {
      v = Math.round(v)
      return hasComma ? v.toLocaleString('en-US') : String(v)
    }

    let raf = 0
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setDisplay(prefix + fmt(0) + suffix)
            let start: number | null = null
            const dur = 1100
            const tick = (ts: number) => {
              if (start === null) start = ts
              const p = Math.min((ts - start) / dur, 1)
              const e = 1 - Math.pow(1 - p, 3)
              setDisplay(prefix + fmt(target * e) + suffix)
              if (p < 1) raf = requestAnimationFrame(tick)
              else setDisplay(finalText)
            }
            raf = requestAnimationFrame(tick)
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalText])

  return React.createElement(As, { ref: elRef as any }, display)
}
