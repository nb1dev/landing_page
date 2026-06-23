'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { pushEvent } from '@/lib/dataLayer'

export function PageViewTracker() {
  const pathname = usePathname()
  const prevPath = useRef<string | null>(null)

  useEffect(() => {
    if (prevPath.current === pathname) return
    prevPath.current = pathname

    pushEvent('page_view', {
      page_location: window.location.href,
      page_title: document.title,
      page_referrer: document.referrer,
    })

    // Detect funnel pages by slug segment
    const slug = pathname.split('/').filter(Boolean).at(-1) ?? ''

    if (slug === 'order') {
      pushEvent('start_order', {
        page_location: window.location.href,
        page_title: document.title,
        page_referrer: document.referrer,
      })
    }

    if (slug === 'order-details') {
      // begin_checkout fires in CheckoutForm on mount (it has plan/price context)
      // Nothing to fire here without item data
    }
  }, [pathname])

  return null
}
