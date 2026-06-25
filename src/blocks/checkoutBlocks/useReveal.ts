'use client'

import { useEffect, useRef, useState } from 'react'

export function useReveal(threshold = 0.05) {
  const ref = useRef<any>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Already in viewport on mount → reveal immediately
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight) {
      setRevealed(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); io.disconnect() } },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return { ref, revealed }
}
