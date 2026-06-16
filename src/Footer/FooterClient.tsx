'use client'

import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

type Theme = 'light' | 'dark'

type FooterVariant = {
  variantKey: string
  theme: Theme
  linkColor?: string | null
  logo?: { url?: string | null; alt?: string | null } | null
}

type NavLink = { label?: string | null; url?: string | null }

type Props = {
  logo?: { url?: string | null; alt?: string | null } | null
  tagline?: string | null
  subnote?: string | null
  disclaimer?: string | null
  copyrightText?: string | null
  instagramUrl?: string | null
  exploreLinks?: NavLink[]
  getStartedLinks?: NavLink[]
  defaultTheme?: Theme
  defaultLinkColor?: string | null
  variants?: FooterVariant[]
}

export function FooterClient({
  logo,
  tagline,
  subnote,
  disclaimer,
  copyrightText,
  instagramUrl,
  exploreLinks = [],
  getStartedLinks = [],
  defaultTheme = 'dark',
  defaultLinkColor,
  variants = [],
}: Props) {
  const searchParams = useSearchParams()
  const variantParam = searchParams.get('v')
  const [email, setEmail] = useState('')

  let theme: Theme = defaultTheme
  let resolvedLogo = logo
  if (variantParam) {
    const match = variants.find((v) => v.variantKey === variantParam)
    if (match) {
      theme = match.theme
      if (match.logo) resolvedLogo = match.logo
    }
  }

  const isDark = theme === 'dark'

  return (
    <>
      <style jsx global>{`
        .nbf { background: ${isDark ? '#0B1E33' : '#ffffff'}; color: ${isDark ? '#fff' : '#0B1E33'}; font-family: 'Inter', system-ui, sans-serif; }
        .nbf * { box-sizing: border-box; }
        .nbf-in { max-width: 1200px; margin: 0 auto; padding: 72px 32px 36px; }
        .nbf-top { display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 48px; padding-bottom: 42px; border-bottom: 1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(18,49,77,0.1)'}; }
        .nbf-brand { max-width: 390px; }
        .nbf-logo { height: 30px; width: auto; display: block; }
        .nbf-tag { font-size: 14px; line-height: 1.6; color: ${isDark ? 'rgba(255,255,255,0.62)' : 'rgba(18,49,77,0.62)'}; margin: 18px 0 22px; }
        .nbf-sub { display: flex; align-items: center; gap: 8px; max-width: 330px; }
        .nbf-sub input { flex: 1; background: ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(18,49,77,0.04)'}; border: 1px solid ${isDark ? 'rgba(255,255,255,0.16)' : 'rgba(18,49,77,0.16)'}; border-radius: 100px; padding: 12px 18px; color: ${isDark ? '#fff' : '#0B1E33'}; font-size: 14px; font-family: inherit; }
        .nbf-sub input::placeholder { color: ${isDark ? 'rgba(255,255,255,0.4)' : 'rgba(18,49,77,0.4)'}; }
        .nbf-sub input:focus { outline: none; border-color: rgba(19,166,204,0.6); }
        .nbf-sub button { width: 44px; height: 44px; flex: none; border: none; border-radius: 50%; background: #13A6CC; color: #0B1E33; font-size: 18px; font-weight: 700; cursor: pointer; transition: background 0.15s; }
        .nbf-sub button:hover { background: #0A8FB0; }
        .nbf-subnote { font-size: 12px; color: ${isDark ? 'rgba(255,255,255,0.4)' : 'rgba(18,49,77,0.4)'}; margin-top: 12px; }
        .nbf-col h4 { font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: ${isDark ? 'rgba(255,255,255,0.45)' : 'rgba(18,49,77,0.45)'}; margin: 0 0 14px; }
        .nbf-col a { display: block; font-size: 14px; color: ${isDark ? 'rgba(255,255,255,0.74)' : 'rgba(18,49,77,0.74)'}; text-decoration: none; padding: 7px 0; transition: color 0.15s; }
        .nbf-col a:hover { color: ${isDark ? '#fff' : '#0B1E33'}; }
        .nbf-bot { display: flex; align-items: center; justify-content: space-between; gap: 18px; flex-wrap: wrap; padding-top: 26px; }
        .nbf-copy { font-size: 13px; color: ${isDark ? 'rgba(255,255,255,0.5)' : 'rgba(18,49,77,0.5)'}; }
        .nbf-legal { display: flex; gap: 22px; }
        .nbf-legal a, .nbf-soc a { font-size: 13px; color: ${isDark ? 'rgba(255,255,255,0.5)' : 'rgba(18,49,77,0.5)'}; text-decoration: none; transition: color 0.15s; }
        .nbf-legal a:hover, .nbf-soc a:hover { color: ${isDark ? '#fff' : '#0B1E33'}; }
        .nbf-disc { font-size: 11.5px; line-height: 1.6; color: ${isDark ? 'rgba(255,255,255,0.34)' : 'rgba(18,49,77,0.34)'}; margin: 24px 0 0; max-width: 820px; }
        @media (max-width: 820px) {
          .nbf-top { grid-template-columns: 1fr 1fr; }
          .nbf-brand { grid-column: 1 / -1; max-width: none; }
        }
        @media (max-width: 560px) {
          .nbf-top { grid-template-columns: 1fr; gap: 34px; }
          .nbf-bot { flex-direction: column; align-items: flex-start; gap: 14px; }
        }
      `}</style>

      <footer className="nbf">
        <div className="nbf-in">
          <div className="nbf-top">
            {/* Brand column */}
            <div className="nbf-brand">
              {resolvedLogo?.url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="nbf-logo" src={resolvedLogo.url} alt={resolvedLogo.alt || 'NB1'} />
              )}
              {tagline && <p className="nbf-tag">{tagline}</p>}
              <form className="nbf-sub" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email"
                  aria-label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" aria-label="Subscribe">→</button>
              </form>
              {subnote && <p className="nbf-subnote">{subnote}</p>}
            </div>

            {/* Explore column */}
            {exploreLinks.length > 0 && (
              <nav className="nbf-col">
                <h4>Explore</h4>
                {exploreLinks.map((link, i) => (
                  <a key={i} href={link.url || '#'}>{link.label}</a>
                ))}
              </nav>
            )}

            {/* Get Started column */}
            {getStartedLinks.length > 0 && (
              <nav className="nbf-col">
                <h4>Get started</h4>
                {getStartedLinks.map((link, i) => (
                  <a key={i} href={link.url || '#'}>{link.label}</a>
                ))}
              </nav>
            )}
          </div>

          <div className="nbf-bot">
            {copyrightText && <span className="nbf-copy">{copyrightText}</span>}
            <div className="nbf-legal">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Imprint</a>
            </div>
            {instagramUrl && (
              <div className="nbf-soc">
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer">Instagram ↗</a>
              </div>
            )}
          </div>

          {disclaimer && <p className="nbf-disc">{disclaimer}</p>}
        </div>
      </footer>
    </>
  )
}
