'use client'

import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import React, { useEffect, useRef, useState } from 'react'

import RichText from '@/components/RichText'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type BgColorPreset = 'navyDeep' | 'inkDeep' | 'navy' | 'off' | 'paper' | 'cream' | 'teal' | 'custom'
type BgType = 'color' | 'image'
type MediaLike = { url?: string | null; alt?: string | null } | null

function isDarkPreset(p?: BgColorPreset | null) {
  return p === 'navy' || p === 'navyDeep' || p === 'inkDeep' || p === 'teal'
}
function resolveBg(p?: BgColorPreset | null, c?: string | null) {
  if (p === 'navyDeep') return '#0E2740'
  if (p === 'inkDeep') return '#0A1B2E'
  if (p === 'navy') return '#12314D'
  if (p === 'off') return '#F1F4F7'
  if (p === 'paper') return '#FFFFFF'
  if (p === 'cream') return '#FAF8F2'
  if (p === 'teal') return '#0A8FB0'
  if (p === 'custom') return c || '#0A1B2E'
  return '#0E2740'
}

export type YpBreakupBlockType = {
  blockType?: 'ypBreakup'
  backgroundColor?: BgColorPreset | null
  backgroundColorCustom?: string | null
  backgroundType?: BgType | null
  backgroundImage?: MediaLike
  grain?: boolean | null
  eyebrow?: string | null
  line?: DefaultTypedEditorState | null
}

function imgUrl(img?: MediaLike) {
  if (!img || typeof img === 'string') return ''
  return img.url ? getMediaUrl(img.url) : ''
}

export const YpBreakupComponent: React.FC<YpBreakupBlockType> = ({
  backgroundColor,
  backgroundColorCustom,
  backgroundType,
  backgroundImage,
  grain,
  eyebrow,
  line,
}) => {
  const [revealed, setRevealed] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)

  const isImageMode = backgroundType === 'image'
  const bgImg = imgUrl(backgroundImage)
  const hasImage = isImageMode && !!bgImg
  const isDark = hasImage || isDarkPreset(backgroundColor)
  const resolvedBg = resolveBg(backgroundColor, backgroundColorCustom)

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
      style={{ background: resolvedBg }}
      className={['breakup-type', grain ? 'grain' : '', hasImage ? 'has-img' : '', isDark ? 'is-dark' : 'is-light'].join(' ')}
    >
      <style jsx>{`
        .breakup-type {
          position: relative;
          overflow: hidden;
          min-height: 420px;
          display: flex;
          align-items: center;
          padding: 50px 0;
          text-align: center;
        }
        .breakup-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 30%;
          z-index: 0;
          filter: brightness(1) saturate(1.05);
        }
        .breakup-type.has-img::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(8, 18, 30, 0.7) 0%,
            rgba(8, 18, 30, 0.45) 45%,
            rgba(8, 18, 30, 0.55) 100%
          );
          z-index: 1;
        }
        .grain::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0.5;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
        }
        .wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: center;
          width: 100%;
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
        .bk-card {
          background: rgba(255, 255, 255, 0.07);
          -webkit-backdrop-filter: blur(16px) saturate(130%);
          backdrop-filter: blur(16px) saturate(130%);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 18px;
          padding: clamp(28px, 3vw, 40px) clamp(32px, 4vw, 52px);
          max-width: 820px;
          text-align: center;
          box-shadow: 0 40px 90px -50px rgba(0, 0, 0, 0.6);
        }
        /* Light backgrounds: darken the glass card so text stays legible */
        .breakup-type.is-light:not(.has-img) .bk-card {
          background: rgba(18, 49, 77, 0.05);
          border-color: rgba(18, 49, 77, 0.12);
        }
        .bk-eyebrow {
          /* Hidden per design direction — the statement leads the card.
             Field stays editable in Payload; it simply never renders. */
          display: none !important;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #13a6cc;
          margin-bottom: 18px;
        }
        .breakup-line {
          color: #fff;
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: clamp(22px, 2.4vw, 32px);
          line-height: 1.18;
          letter-spacing: -0.02em;
          margin: 0;
        }
        .breakup-type.is-light:not(.has-img) .breakup-line {
          color: #12314d;
        }
        .breakup-line :global(p) {
          margin: 0;
        }
        .breakup-line :global(.teal) {
          color: #13a6cc;
        }

        @media (max-width: 640px) {
          .breakup-type {
            min-height: 360px;
            padding: 44px 0;
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

      {hasImage && <img className="breakup-bg" src={bgImg} alt="" />}

      <div className="wrap">
        <div className={['bk-card reveal', revealed ? 'in' : ''].join(' ')}>
          {eyebrow && <div className="bk-eyebrow">{eyebrow}</div>}
          {line && (
            <div className="breakup-line">
              <RichText data={line as any} enableGutter={false} enableProse={false} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
