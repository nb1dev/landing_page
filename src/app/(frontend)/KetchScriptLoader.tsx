/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    semaphore?: any[]
    ketch?: (...args: any[]) => void
  }
}

export function KetchScriptLoader() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // from your original snippet
    window.semaphore = window.semaphore || []
    window.ketch = function (...args: any[]) {
      window.semaphore!.push(args)
    }

    // don't inject twice
    if (document.querySelector<HTMLScriptElement>('script[data-ketch-boot="true"]')) {
      return
    }

    const n = document.createElement('script')
    n.type = 'text/javascript'
    n.src = 'https://global.ketchcdn.com/web/v3/config/nb1_health/website_smart_tag/boot.js'
    n.defer = true
    n.async = true
    n.setAttribute('data-ketch-boot', 'true')
    document.head.appendChild(n)
  }, [])

  // nothing to render
  return null
}
