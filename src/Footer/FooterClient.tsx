'use client'

import { useSearchParams } from 'next/navigation'
import React from 'react'

import { CMSLink } from '@/components/Link'

type Theme = 'light' | 'dark'

type FooterVariant = {
  variantKey: string
  theme: Theme
  linkColor?: string | null
  logo?: { url?: string | null; alt?: string | null } | null
}

type NavItem = {
  link?: {
    label?: string | null
    localizedLabel?: string | null
    [key: string]: unknown
  } | null
}

type Props = {
  logo?: { url?: string | null; alt?: string | null } | null
  tagline?: string | null
  navItems?: NavItem[]
  address?: string | null
  copyrightText?: string | null
  defaultTheme?: Theme
  defaultLinkColor?: string | null
  variants?: FooterVariant[]
}

export function FooterClient({
  logo,
  tagline,
  navItems = [],
  address,
  copyrightText,
  defaultTheme = 'light',
  defaultLinkColor,
  variants = [],
}: Props) {
  const searchParams = useSearchParams()
  const variantParam = searchParams.get('v')

  let theme: Theme = defaultTheme
  let linkColor: string | null | undefined = defaultLinkColor
  let resolvedLogo = logo
  if (variantParam) {
    const match = variants.find((v) => v.variantKey === variantParam)
    if (match) {
      theme = match.theme
      if (match.linkColor) linkColor = match.linkColor
      if (match.logo) resolvedLogo = match.logo
    }
  }

  const isDark = theme === 'dark'
  const resolvedLinkColor = linkColor || (isDark ? 'rgba(255,255,255,0.55)' : 'rgba(18,49,77,0.55)')

  return (
    <>
      <style jsx>{`
        .nb1-footer {
          background: ${isDark ? '#0a1e35' : '#ffffff'};
          border-top: 1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(18,49,77,0.06)'};
          padding: 3rem 2.5rem;
        }
        .nb1-footer-inner {
          max-width: 1180px;
          margin: 0 auto;
        }
        .nb1-foot-bot {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 2rem;
        }
        .nb1-foot-l {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .nb1-foot-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          height: 26px;
        }
        .nb1-foot-logo img {
          height: 100%;
          width: auto;
          display: block;
        }
        .nb1-foot-meta {
          font-size: 0.72rem;
          font-weight: 300;
          color: ${isDark ? 'rgba(255,255,255,0.45)' : 'rgba(18,49,77,0.45)'};
        }
        .nb1-foot-r {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.85rem;
          text-align: right;
        }
        .nb1-foot-links {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          flex-wrap: wrap;
          justify-content: flex-end;
        }
        :global(.nb1-foot-link) {
          font-size: 0.65rem;
          font-weight: 400;
          color: ${resolvedLinkColor};
          text-decoration: none;
          letter-spacing: 0.005em;
          transition: color 0.2s;
        }
        :global(.nb1-foot-link:hover) {
          color: #008498;
        }
        .nb1-foot-divider {
          font-size: 0.72rem;
          color: ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(18,49,77,0.2)'};
          user-select: none;
        }
        .nb1-foot-legal {
          font-size: 0.66rem;
          font-weight: 300;
          color: ${isDark ? 'rgba(255,255,255,0.35)' : 'rgba(18,49,77,0.35)'};
          letter-spacing: 0.02em;
          line-height: 1.6;
        }
      `}</style>

      <footer className="nb1-footer">
        <div className="nb1-footer-inner">
          <div className="nb1-foot-bot">
            {/* Left: logo + tagline */}
            <div className="nb1-foot-l">
              {resolvedLogo?.url && (
                // eslint-disable-next-line @next/next/no-html-link-for-pages
                <a href="/" className="nb1-foot-logo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={resolvedLogo!.url ?? ''}
                    alt={resolvedLogo!.alt || 'Logo'}
                    style={{ height: '100%', width: 'auto', display: 'block' }}
                  />
                </a>
              )}
              {tagline && <span className="nb1-foot-meta">{tagline}</span>}
            </div>

            {/* Right: nav links + legal */}
            <div className="nb1-foot-r">
              {navItems.length > 0 && (
                <div className="nb1-foot-links">
                  {navItems.map(({ link }, i) => {
                    if (!link) return null
                    const label =
                      typeof link.localizedLabel === 'string' && link.localizedLabel.trim()
                        ? link.localizedLabel
                        : link.label
                    return (
                      <React.Fragment key={i}>
                        {i > 0 && <span className="nb1-foot-divider">·</span>}
                        <CMSLink {...link} label={label} className="nb1-foot-link" />
                      </React.Fragment>
                    )
                  })}
                </div>
              )}

              {(address || copyrightText) && (
                <div className="nb1-foot-legal">
                  {address && <div>{address}</div>}
                  {copyrightText && <div>{copyrightText}</div>}
                </div>
              )}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
