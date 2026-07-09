'use client'
import { useEffect } from 'react'

type RevealVariant = 'rv' | 'rvf'

/**
 * Fade-and-rise scroll reveal for a set of child elements within a container,
 * matching the mockup's global "TIER 1" reveal system: opacity 0->1 (+ translateY(15px)->none
 * for variant 'rv'; opacity-only for 'rvf'), 0.62s cubic-bezier(.22,.61,.36,1), staggered by
 * up to 5 * 0.06s per child, IntersectionObserver-triggered (threshold 0.05, rootMargin -10%
 * bottom), and skipped entirely under prefers-reduced-motion.
 *
 * Applies via inline styles (not CSS classes) so it works even when the target elements are
 * rendered by a separate child component that wouldn't share this component's styled-jsx scope.
 */
export function useReveal(
  containerRef: React.RefObject<HTMLElement | null>,
  selector: string,
  variant: RevealVariant = 'rv',
) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    if (typeof window === 'undefined') return
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!('IntersectionObserver' in window)) return

    const els = Array.from(container.querySelectorAll<HTMLElement>(selector))
    if (els.length === 0) return

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
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    )

    els.forEach((el, i) => {
      el.style.opacity = '0'
      if (variant === 'rv') el.style.transform = 'translateY(15px)'
      el.style.transition = 'opacity .62s cubic-bezier(.22,.61,.36,1), transform .62s cubic-bezier(.22,.61,.36,1)'
      el.style.transitionDelay = `${Math.min(i, 5) * 0.06}s`
      io.observe(el)
    })

    return () => io.disconnect()
  }, [containerRef, selector, variant])
}
