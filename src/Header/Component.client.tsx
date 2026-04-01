'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'

import type { Header } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'

interface HeaderClientProps {
  data: Header
  locale: string
}

const SUPPORTED_LOCALES = ['en', 'de'] as const
type AppLocale = (typeof SUPPORTED_LOCALES)[number]

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, locale }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()

  const pathname = usePathname() || '/'

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

  return (
    <header className="container relative z-20" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="py-8 flex justify-between items-center gap-4">
        {/* <Link href={`/${activeLocale}`}>
          <Logo loading="eager" priority="high" className="invert dark:invert-0" />
        </Link> */}

        <div className="flex items-center gap-6 ml-auto">
          {/* <HeaderNav data={data} locale={activeLocale} /> */}

          {/* ✅ Login + Locale switch */}
          <div className="flex items-center">
            {/* <div
              className="mr-4"
              style={{ color: 'white', cursor: 'pointer' }}
              onClick={() => router.push('/login')} // ✅ no locale
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && router.push('/login')}
            >
              Login
            </div> */}

            <LocaleSwitcher locale={activeLocale} />
          </div>
        </div>
      </div>
    </header>
  )
}
