'use client'
import { useEffect } from 'react'

// Matches The Protocol mockup's own generic [data-rv] reveal-on-scroll system
// exactly: rootMargin -10% bottom, threshold 0.05, one-time reveal, and a
// Math.min(i % 6, 5) * 0.05s stagger (note the %6 modulo — resets every 6
// elements, unlike the Lab page's useReveal which caps at index 5 forever).
export function useProtocolReveal(containerRef: React.RefObject<HTMLElement | null>, selector: string) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    if (typeof window === 'undefined') return
    if (!('IntersectionObserver' in window)) return
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    document.documentElement.classList.add('pr-rv-on')

    const els = Array.from(container.querySelectorAll<HTMLElement>(selector))
    if (els.length === 0) return

    els.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i % 6, 5) * 0.05}s`
    })

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            io.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [containerRef, selector])
}
