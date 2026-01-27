'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'

import type { Header } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
  locale: string
}

const SUPPORTED_LOCALES = ['en', 'de'] as const
type AppLocale = (typeof SUPPORTED_LOCALES)[number]

function normalizePath(p: string) {
  if (!p) return '/'
  // remove trailing slash except root
  if (p.length > 1 && p.endsWith('/')) return p.slice(0, -1)
  return p
}

function stripLeadingLocale(pathname: string, currentLocale: string) {
  const p = normalizePath(pathname)

  // If path starts with /{locale} or equals /{locale}
  const prefix = `/${currentLocale}`
  if (p === prefix) return '' // means home
  if (p.startsWith(prefix + '/')) return p.slice(prefix.length) // keep leading "/..."
  return p // if middleware removed locale from pathname already
}

function buildLocalePath(targetLocale: AppLocale, pathname: string, currentLocale: string) {
  const rest = stripLeadingLocale(pathname, currentLocale) // "" or "/posts/x"
  return `/${targetLocale}${rest}` || `/${targetLocale}`
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, locale }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()

  const pathname = usePathname() || '/'
  const router = useRouter()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const activeLocale = useMemo<AppLocale>(() => {
    return (SUPPORTED_LOCALES.includes(locale as AppLocale) ? locale : 'en') as AppLocale
  }, [locale])

  const goToLocale = (nextLocale: AppLocale) => {
    const nextPath = buildLocalePath(nextLocale, pathname, activeLocale)
    router.push(nextPath)
  }

  return (
    <header className="container relative z-20" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="py-8 flex justify-between items-center gap-4">
        {/* <Link href={`/${activeLocale}`}>
          <Logo loading="eager" priority="high" className="invert dark:invert-0" />
        </Link> */}

        <div className="flex items-center gap-6 ml-auto">
          <HeaderNav data={data} locale={activeLocale} />
          <div className="flex items-center">
            <div
              className="p-2"
              style={{
                backgroundColor: activeLocale === 'en' ? 'black' : 'white',
                color: activeLocale === 'en' ? 'white' : 'black',
                borderTopLeftRadius: '20px',
                borderBottomLeftRadius: '20px',
                cursor: 'pointer',
              }}
              onClick={() => goToLocale('en')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && goToLocale('en')}
            >
              <span
                style={{
                  fontFamily: 'Inter',
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '150%',
                }}
              >
                EN
              </span>
            </div>

            <div
              className="p-2"
              style={{
                backgroundColor: activeLocale === 'de' ? 'black' : 'white',
                color: activeLocale === 'de' ? 'white' : 'black',
                borderTopRightRadius: '20px',
                borderBottomRightRadius: '20px',
                cursor: 'pointer',
              }}
              onClick={() => goToLocale('de')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && goToLocale('de')}
            >
              <span
                style={{
                  fontFamily: 'Inter',
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '150%',
                }}
              >
                DE
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
