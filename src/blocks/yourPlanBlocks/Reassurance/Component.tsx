'use client'

import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import React, { useEffect, useRef, useState } from 'react'

import RichText from '@/components/RichText'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type BgColorPreset = 'navyDeep' | 'navy' | 'inkDeep' | 'teal' | 'off' | 'paper' | 'cream' | 'custom'
type BgType = 'color' | 'image'
type MediaLike = { url?: string | null; alt?: string | null } | null

function isDarkPreset(p?: BgColorPreset | null) {
  return p === 'navyDeep' || p === 'navy' || p === 'inkDeep' || p === 'teal'
}
function resolveBg(p?: BgColorPreset | null, c?: string | null) {
  if (!p || p === 'navyDeep') return 'linear-gradient(160deg, #0E2740, #0A1B2E)'
  if (p === 'navy') return '#12314D'
  if (p === 'inkDeep') return '#0A1B2E'
  if (p === 'teal') return '#0A8FB0'
  if (p === 'off') return '#F1F4F7'
  if (p === 'paper') return '#FFFFFF'
  if (p === 'cream') return '#FAF8F2'
  if (p === 'custom') return c || '#0A1B2E'
  return 'linear-gradient(160deg, #0E2740, #0A1B2E)'
}

type Card = {
  tag?: string | null
  title?: string | null
  body?: string | null
  points?: { text?: string | null }[] | null
}

export type YpReassuranceBlockType = {
  blockType?: 'ypReassurance'
  backgroundColor?: BgColorPreset | null
  backgroundColorCustom?: string | null
  backgroundType?: BgType | null
  backgroundImage?: MediaLike
  grain?: boolean | null
  eyebrow?: string | null
  heading?: DefaultTypedEditorState | null
  lede?: DefaultTypedEditorState | null
  cards?: Card[] | null
}

function imgUrl(img?: MediaLike) {
  if (!img || typeof img === 'string') return ''
  return img.url ? getMediaUrl(img.url) : ''
}

export const YpReassuranceComponent: React.FC<YpReassuranceBlockType> = ({
  backgroundColor,
  backgroundColorCustom,
  backgroundType,
  backgroundImage,
  grain,
  eyebrow,
  heading,
  lede,
  cards,
}) => {
  const [revealed, setRevealed] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)

  const isImageMode = backgroundType === 'image'
  const bgImg = imgUrl(backgroundImage)
  const hasImage = isImageMode && !!bgImg
  const isDark = hasImage || isDarkPreset(backgroundColor)
  const resolvedBg = resolveBg(backgroundColor, backgroundColorCustom)
  const sectionStyle: React.CSSProperties = hasImage
    ? {
        background: `linear-gradient(160deg, rgba(14,39,64,.78), rgba(10,27,46,.82)), url('${bgImg}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }
    : { background: resolvedBg }

  const list = cards ?? []

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setRevealed(true), {
      threshold: 0.1,
    })
    o.observe(el)
    return () => o.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={sectionStyle}
      className={['reassure', grain ? 'grain' : '', isDark ? 'is-dark' : 'is-light'].join(' ')}
    >
      <style jsx>{`
        .reassure {
          position: relative;
          overflow: hidden;
          padding: 84px 0;
          color: #ffffff;
        }
        .reassure.is-light {
          color: #12314d;
        }
        /* radial teal glow — only on dark backgrounds */
        .reassure.is-dark::after {
          content: '';
          position: absolute;
          top: -30%;
          right: -10%;
          width: 50%;
          height: 140%;
          background: radial-gradient(circle, rgba(10, 143, 176, 0.22), transparent 65%);
          pointer-events: none;
        }
        .grain::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.5;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
        }
        .wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
          position: relative;
          z-index: 1;
        }
        .reveal {
          opacity: 0;
          transform: translateY(22px);
          transition:
            opacity 0.7s cubic-bezier(0.16, 0.84, 0.44, 1),
            transform 0.7s cubic-bezier(0.16, 0.84, 0.44, 1);
        }
        .reveal.in {
          opacity: 1;
          transform: none;
        }
        .reveal.d1 {
          transition-delay: 0.08s;
        }
        .reveal.d2 {
          transition-delay: 0.16s;
        }

        .reassure-head {
          max-width: 680px;
        }
        .eyebrow {
          /* Hidden per design direction — headlines lead the section heads.
             Field stays editable in Payload; it simply never renders. */
          display: none !important;
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #13a6cc;
        }
        .eyebrow::before {
          content: '';
          width: 28px;
          height: 1px;
          background: #13a6cc;
        }
        .reassure.is-light .eyebrow,
        .reassure.is-light .eyebrow::before {
          color: #0a8fb0;
          background: #0a8fb0;
        }
        .reassure-head :global(h2) {
          margin: 16px 0 0;
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          letter-spacing: -0.03em;
          line-height: 1.02;
          font-size: clamp(32px, 4vw, 52px);
          color: #fff;
        }
        .reassure.is-light .reassure-head :global(h2) {
          color: #12314d;
        }
        .reassure-head :global(.teal) {
          color: #13a6cc;
        }
        .reassure.is-light .reassure-head :global(.teal) {
          color: #0a8fb0;
        }
        .reassure-lede {
          margin-top: 18px;
          font-size: clamp(16px, 1.4vw, 19px);
          font-weight: 400;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
        }
        .reassure.is-light .reassure-lede {
          color: rgba(18, 49, 77, 0.7);
        }
        .reassure-lede :global(p) {
          margin: 0;
        }

        .reassure-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 44px;
          position: relative;
          z-index: 1;
        }
        .reassure-card {
          background: rgba(255, 255, 255, 0.05);
          -webkit-backdrop-filter: blur(12px);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 18px;
          padding: 32px;
        }
        .reassure.is-light .reassure-card {
          background: rgba(18, 49, 77, 0.04);
          border-color: rgba(18, 49, 77, 0.12);
        }
        .tag {
          display: inline-block;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #fff;
          background: #0a8fb0;
          padding: 5px 12px;
          border-radius: 6px;
        }
        .reassure-card h3 {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: 22px;
          color: #fff;
          margin: 16px 0 12px;
          letter-spacing: -0.02em;
        }
        .reassure.is-light .reassure-card h3 {
          color: #12314d;
        }
        .reassure-card p {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin: 0;
        }
        .reassure.is-light .reassure-card p {
          color: rgba(18, 49, 77, 0.7);
        }
        .reassure-card ul {
          list-style: none;
          margin: 18px 0 0;
          padding: 0;
        }
        .reassure-card li {
          display: flex;
          gap: 11px;
          align-items: flex-start;
          padding: 8px 0;
          font-size: 13.5px;
          color: rgba(255, 255, 255, 0.9);
        }
        .reassure.is-light .reassure-card li {
          color: rgba(18, 49, 77, 0.9);
        }
        .reassure-card li .ck {
          color: #13a6cc;
          flex-shrink: 0;
          font-weight: 700;
        }
        .reassure.is-light .reassure-card li .ck {
          color: #0a8fb0;
        }

        @media (max-width: 860px) {
          .reassure-grid {
            grid-template-columns: 1fr;
          }
          .reassure.is-dark::after {
            top: -12%;
            right: auto;
            left: 50%;
            transform: translateX(-50%);
            width: 150%;
            height: 60%;
            background: radial-gradient(ellipse at 50% 0%, rgba(10, 143, 176, 0.2), transparent 70%);
          }
        }
        @media (max-width: 640px) {
          .reassure {
            padding: 56px 0;
          }
          .wrap {
            padding: 0 20px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal {
            transition: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      <div className="wrap">
        {(eyebrow || heading || lede) && (
          <div className={['reassure-head section-head reveal', revealed ? 'in' : ''].join(' ')}>
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            {heading && <RichText data={heading as any} enableGutter={false} enableProse={false} />}
            {lede && (
              <div className="reassure-lede">
                <RichText data={lede as any} enableGutter={false} enableProse={false} />
              </div>
            )}
          </div>
        )}

        {list.length > 0 && (
          <div className="reassure-grid">
            {list.map((c, i) => {
              const pts = c.points ?? []
              return (
                <div
                  key={i}
                  className={['reassure-card reveal', revealed ? `in d${i + 1}` : `d${i + 1}`].join(
                    ' ',
                  )}
                >
                  {c.tag && <span className="tag">{c.tag}</span>}
                  {c.title && <h3>{c.title}</h3>}
                  {c.body && <p>{c.body}</p>}
                  {pts.length > 0 && (
                    <ul>
                      {pts.map((p, j) => (
                        <li key={j}>
                          <span className="ck">✓</span>
                          {p.text}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
