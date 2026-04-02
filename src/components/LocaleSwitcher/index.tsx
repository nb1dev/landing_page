'use client'

import { usePathname, useRouter } from 'next/navigation'
import React, { useMemo, useRef, useState, useEffect } from 'react'

const SUPPORTED_LOCALES = ['en', 'de'] as const
type AppLocale = (typeof SUPPORTED_LOCALES)[number]

function normalizePath(p: string) {
  if (!p) return '/'
  if (p.length > 1 && p.endsWith('/')) return p.slice(0, -1)
  return p
}

function stripLeadingLocale(pathname: string, currentLocale: string) {
  const p = normalizePath(pathname)
  const prefix = `/${currentLocale}`
  if (p === prefix) return ''
  if (p.startsWith(prefix + '/')) return p.slice(prefix.length)
  return p
}

function buildLocalePath(targetLocale: AppLocale, pathname: string, currentLocale: string) {
  const rest = stripLeadingLocale(pathname, currentLocale)
  return `/${targetLocale}${rest}` || `/${targetLocale}`
}

type Props = {
  locale?: string
  textColor?: string
}

export const LocaleSwitcher: React.FC<Props> = ({ locale, textColor = 'white' }) => {
  const pathname = usePathname() || '/'
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const activeLocale = useMemo<AppLocale>(() => {
    if (locale && SUPPORTED_LOCALES.includes(locale as AppLocale)) return locale as AppLocale
    const firstSegment = pathname.split('/')[1]
    return (SUPPORTED_LOCALES.includes(firstSegment as AppLocale) ? firstSegment : 'en') as AppLocale
  }, [locale, pathname])

  const goToLocale = (nextLocale: AppLocale) => {
    setOpen(false)
    const nextPath = buildLocalePath(nextLocale, pathname, activeLocale)
    router.push(nextPath)
  }

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      {/* Trigger */}
      <button
        type="button"
        className="flex items-center gap-1"
        style={{ fontFamily: 'Instrument Sans', fontWeight: 500, fontSize: '14px', lineHeight: '30px', letterSpacing: '0', color: textColor, background: 'none', border: 'none', cursor: 'pointer' }}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{activeLocale.charAt(0).toUpperCase() + activeLocale.slice(1)}</span>
        {/* Chevron */}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute left-0 top-full z-50 mt-2 min-w-[80px] overflow-hidden rounded-[12px] bg-white py-1 shadow-lg"
        >
          {SUPPORTED_LOCALES.map((loc) => (
            <button
              key={loc}
              type="button"
              className="flex w-full items-center justify-between px-4 py-2 text-left hover:bg-gray-50"
              style={{ fontFamily: 'Instrument Sans', fontWeight: 500, fontSize: '14px', lineHeight: '30px', letterSpacing: '0', color: '#393939', cursor: 'pointer', background: 'none', border: 'none' }}
              onClick={() => goToLocale(loc)}
            >
              <span>{loc.charAt(0).toUpperCase() + loc.slice(1)}</span>
              {activeLocale === loc && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 7L5.5 10.5L12 3.5" stroke="#393939" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
