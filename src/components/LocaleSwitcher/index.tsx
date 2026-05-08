'use client'

import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useRef, useState } from 'react'

const SUPPORTED_LOCALES = ['en', 'de'] as const
type AppLocale = (typeof SUPPORTED_LOCALES)[number]

const LOCALE_LABELS: Record<AppLocale, string> = {
  en: 'English',
  de: 'Deutsch',
}

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
  isDark?: boolean
  textColor?: string
}

export const LocaleSwitcher: React.FC<Props> = ({ locale, isDark = false, textColor: textColorProp }) => {
  const pathname = usePathname() || '/'
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const activeLocale = useMemo<AppLocale>(() => {
    if (locale && SUPPORTED_LOCALES.includes(locale as AppLocale)) return locale as AppLocale
    const firstSegment = pathname.split('/')[1]
    return (SUPPORTED_LOCALES.includes(firstSegment as AppLocale) ? firstSegment : 'en') as AppLocale
  }, [locale, pathname])

  const goToLocale = (next: AppLocale) => {
    setOpen(false)
    router.push(buildLocalePath(next, pathname, activeLocale))
  }

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const textColor = textColorProp ?? (isDark ? 'rgba(255,255,255,0.9)' : 'rgba(18,49,77,0.9)')
  const mutedColor = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(18,49,77,0.45)'
  const hoverBg = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(18,49,77,0.05)'

  return (
    <div className="nb1-lang" ref={ref}>
      <style jsx>{`
        .nb1-lang {
          position: relative;
          display: inline-flex;
          align-items: center;
        }
        .nb1-lang-trigger {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: ${textColor};
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.4rem 0.55rem;
          border-radius: 6px;
          transition: background 0.2s, color 0.2s;
          font-family: inherit;
        }
        .nb1-lang-trigger:hover {
          background: ${hoverBg};
        }
        .nb1-lang-chevron {
          transition: transform 0.2s;
          color: ${mutedColor};
          display: flex;
          align-items: center;
        }
        .nb1-lang-chevron.open {
          transform: rotate(180deg);
          color: ${textColor};
        }
        .nb1-lang-menu {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          min-width: 160px;
          background: #ffffff;
          border: 1px solid rgba(18,49,77,0.1);
          border-radius: 10px;
          padding: 0.4rem;
          box-shadow: 0 14px 36px rgba(18,49,77,0.12), 0 0 0 1px rgba(18,49,77,0.06);
          z-index: 50;
          animation: nb1-fadedown 0.15s ease;
        }
        @keyframes nb1-fadedown {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nb1-lang-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          width: 100%;
          padding: 0.6rem 0.8rem;
          border-radius: 6px;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          transition: background 0.15s;
          font-family: inherit;
        }
        .nb1-lang-item:hover {
          background: rgba(10,143,176,0.07);
        }
        .nb1-lang-item-label {
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: #12314d;
        }
        .nb1-lang-item-sub {
          font-size: 0.68rem;
          font-weight: 400;
          color: rgba(18,49,77,0.5);
          margin-top: 0.1rem;
        }
        .nb1-lang-item.active .nb1-lang-item-label {
          color: #008498;
        }
        .nb1-lang-item-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
      `}</style>

      <button
        type="button"
        className="nb1-lang-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${activeLocale.toUpperCase()}`}
      >
        <span>{activeLocale.toUpperCase()}</span>
        <span className={`nb1-lang-chevron${open ? ' open' : ''}`}>
          <svg width="9" height="6" viewBox="0 0 9 6" fill="none" aria-hidden="true">
            <path
              d="M1 1l3.5 3.5L8 1"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {open && (
        <div className="nb1-lang-menu" role="listbox">
          {SUPPORTED_LOCALES.map((loc) => (
            <button
              key={loc}
              type="button"
              className={`nb1-lang-item${activeLocale === loc ? ' active' : ''}`}
              role="option"
              aria-selected={activeLocale === loc}
              onClick={() => goToLocale(loc)}
            >
              <div className="nb1-lang-item-left">
                <span className="nb1-lang-item-label">{loc.toUpperCase()}</span>
                <span className="nb1-lang-item-sub">{LOCALE_LABELS[loc]}</span>
              </div>
              {activeLocale === loc && (
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  <path
                    d="M2 6.5L5 9.5L11 3"
                    stroke="#008498"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
