'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

import { LocaleSwitcher } from '@/components/LocaleSwitcher'

type Theme = 'light' | 'dark'

type HeaderVariant = {
  variantKey: string
  theme: Theme
  loginTextColor?: string | null
}

export interface HeaderClientProps {
  locale: string
  logo?: { url?: string | null; alt?: string | null } | null
  logoDark?: { url?: string | null; alt?: string | null } | null
  defaultTheme?: Theme
  loginText?: string | null
  loginUrl?: string | null
  loginTextColor?: string | null
  variants?: HeaderVariant[]
}

export const HeaderClient: React.FC<HeaderClientProps> = ({
  locale,
  logo,
  logoDark,
  defaultTheme = 'light',
  loginText,
  loginUrl,
  loginTextColor: defaultLoginTextColor,
  variants = [],
}) => {
  const searchParams = useSearchParams()
  const variantParam = searchParams.get('v')

  let theme: Theme = defaultTheme
  let loginTextColor: string | null | undefined = defaultLoginTextColor

  if (variantParam) {
    const match = variants.find((v) => v.variantKey === variantParam)
    if (match) {
      theme = match.theme
      if (match.loginTextColor) loginTextColor = match.loginTextColor
    }
  }

  const isDark = theme === 'dark'
  const activeLogo = isDark && logoDark?.url ? logoDark : logo
  const resolvedLoginColor = loginTextColor || (isDark ? '#ffffff' : '#12314d')

  return (
    <>
      <style jsx>{`
        .nb1-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 200;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2.5rem;
          background: ${isDark ? 'rgba(10,30,53,0.92)' : 'rgba(255,255,255,0.92)'};
          backdrop-filter: blur(20px) saturate(140%);
          -webkit-backdrop-filter: blur(20px) saturate(140%);
          border-bottom: 1px solid
            ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(18,49,77,0.06)'};
          box-sizing: border-box;
        }
        .nb1-nav-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          flex-shrink: 0;
        }
        .nb1-nav-r {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        :global(.nb1-nav-login) {
          font-size: 0.82rem;
          font-weight: 500;
          color: ${resolvedLoginColor};
          text-decoration: none;
          letter-spacing: -0.005em;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.4rem 0.65rem;
          border-radius: 6px;
          transition: color 0.2s, background 0.2s;
        }
        :global(.nb1-nav-login:hover) {
          color: #008498;
          background: rgba(10, 143, 176, 0.1);
        }
        @media (max-width: 880px) {
          .nb1-nav {
            padding: 0 1rem;
          }
          .nb1-nav-r {
            gap: 0.75rem;
          }
        }
      `}</style>

      <nav className="nb1-nav">
        {activeLogo?.url && (
          <Link href={`/${locale}`} className="nb1-nav-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeLogo.url}
              alt={activeLogo.alt || 'Logo'}
              style={{ width: 54, height: 32, objectFit: 'contain', display: 'block' }}
            />
          </Link>
        )}

        <div className="nb1-nav-r">
          <LocaleSwitcher locale={locale} isDark={isDark} />

          {loginText && loginUrl && (
            <a href={loginUrl} className="nb1-nav-login">
              {loginText}
            </a>
          )}
        </div>
      </nav>
    </>
  )
}
