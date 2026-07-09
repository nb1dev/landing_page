'use client'

import { useEffect } from 'react'

// Ported from the "Your Biology" mockup's global ".reveal" scroll-reveal
// script — a SEPARATE, simpler system from useReveal.ts (that one matches
// the Lab mockup's Tier-1 data-rv system, which has different timing/
// stagger). Each matched element fades/slides in independently — no stagger
// between siblings — once it crosses the threshold, then is never re-observed.
export function useBiologyReveal(containerRef: React.RefObject<HTMLElement | null>, selector: string) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    if (typeof window === 'undefined') return
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = Array.from(container.querySelectorAll<HTMLElement>(selector))
    if (els.length === 0) return

    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach((el) => {
        el.style.opacity = '1'
        el.style.transform = 'none'
      })
      return
    }

    const isMobile = window.matchMedia('(max-width:900px)').matches
    els.forEach((el) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(18px)'
      el.style.transition = 'opacity .7s ease, transform .7s ease'
    })
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.style.opacity = '1'
            el.style.transform = 'none'
            io.unobserve(el)
          }
        })
      },
      { threshold: isMobile ? 0.02 : 0.15, rootMargin: isMobile ? '0px 0px 14% 0px' : '0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [containerRef, selector])
}
