'use client'

import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import React, { useEffect, useRef, useState } from 'react'

import RichText from '@/components/RichText'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type BgColorPreset = 'cream' | 'off' | 'paper' | 'navy' | 'navyDeep' | 'teal' | 'custom'
type BgType = 'color' | 'image'
type MediaLike = { url?: string | null; alt?: string | null } | null

function isDarkPreset(p?: BgColorPreset | null) {
  return p === 'navy' || p === 'navyDeep' || p === 'teal'
}
function resolveBg(p?: BgColorPreset | null, c?: string | null) {
  if (!p || p === 'cream') return '#FAF8F2'
  if (p === 'off') return '#F1F4F7'
  if (p === 'paper') return '#FFFFFF'
  if (p === 'navy') return '#12314D'
  if (p === 'navyDeep') return '#0E2740'
  if (p === 'teal') return '#0A8FB0'
  if (p === 'custom') return c || '#FAF8F2'
  return '#FAF8F2'
}

type Item = {
  question?: string | null
  answer?: DefaultTypedEditorState | null
}

export type YpFaqBlockType = {
  blockType?: 'ypFaq'
  backgroundColor?: BgColorPreset | null
  backgroundColorCustom?: string | null
  backgroundType?: BgType | null
  backgroundImage?: MediaLike
  grain?: boolean | null
  eyebrow?: string | null
  heading?: DefaultTypedEditorState | null
  items?: Item[] | null
}

function imgUrl(img?: MediaLike) {
  if (!img || typeof img === 'string') return ''
  return img.url ? getMediaUrl(img.url) : ''
}

export const YpFaqClient: React.FC<YpFaqBlockType> = ({
  backgroundColor,
  backgroundColorCustom,
  backgroundType,
  backgroundImage,
  grain,
  eyebrow,
  heading,
  items,
}) => {
  const [revealed, setRevealed] = useState(false)
  const [open, setOpen] = useState<Record<number, boolean>>({})
  const sectionRef = useRef<HTMLElement | null>(null)
  const answerRefs = useRef<Array<HTMLDivElement | null>>([])

  const isImageMode = backgroundType === 'image'
  const bgImg = imgUrl(backgroundImage)
  const hasImage = isImageMode && !!bgImg
  const isDark = hasImage || isDarkPreset(backgroundColor)
  const resolvedBg = resolveBg(backgroundColor, backgroundColorCustom)
  const sectionStyle: React.CSSProperties =
    hasImage
      ? {
          background: `linear-gradient(180deg, rgba(10,27,46,.55) 0%, rgba(10,27,46,.35) 100%), url('${bgImg}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }
      : { background: resolvedBg }

  const list = items ?? []

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setRevealed(true), {
      threshold: 0.1,
    })
    o.observe(el)
    return () => o.disconnect()
  }, [])

  const toggle = (i: number) => setOpen((prev) => ({ ...prev, [i]: !prev[i] }))

  return (
    <section
      ref={sectionRef}
      style={sectionStyle}
      className={['yp-faq', grain ? 'grain' : '', isDark ? 'is-dark' : ''].join(' ')}
    >
      <style jsx>{`
        .yp-faq {
          padding: 84px 0;
          position: relative;
          color: #12314d;
        }
        .yp-faq.is-dark {
          color: #ffffff;
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
        .grain > :global(*) {
          position: relative;
          z-index: 1;
        }
        .wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
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

        .faq-body {
          display: grid;
          grid-template-columns: 0.7fr 1.3fr;
          gap: 48px;
          align-items: start;
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
          color: #0a8fb0;
        }
        .eyebrow::before {
          content: '';
          width: 28px;
          height: 1px;
          background: #0a8fb0;
        }
        .yp-faq.is-dark .eyebrow {
          color: #13a6cc;
        }
        .yp-faq.is-dark .eyebrow::before {
          background: #13a6cc;
        }
        .section-head :global(h2) {
          margin: 18px 0 0;
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          letter-spacing: -0.03em;
          line-height: 1.02;
          font-size: clamp(32px, 4vw, 52px);
        }
        .yp-faq.is-dark .section-head :global(h2) {
          color: #ffffff;
        }
        .section-head :global(.teal) {
          color: #0a8fb0;
        }

        .faq-list {
          border-top: 1px solid rgba(18, 49, 77, 0.1);
        }
        .yp-faq.is-dark .faq-list {
          border-top-color: rgba(255, 255, 255, 0.16);
        }
        .faq-item {
          border-bottom: 1px solid rgba(18, 49, 77, 0.1);
        }
        .yp-faq.is-dark .faq-item {
          border-bottom-color: rgba(255, 255, 255, 0.16);
        }
        .faq-q {
          display: flex;
          align-items: center;
          gap: 18px;
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          padding: 22px 0;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
        }
        .faq-q .num {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #0a8fb0;
          font-variant-numeric: tabular-nums;
        }
        .faq-q .qt {
          flex: 1;
          font-size: 16.5px;
          font-weight: 500;
          color: #12314d;
        }
        .yp-faq.is-dark .faq-q .qt {
          color: #ffffff;
        }
        .faq-q .pm {
          position: relative;
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }
        .faq-q .pm::before,
        .faq-q .pm::after {
          content: '';
          position: absolute;
          background: rgba(18, 49, 77, 0.55);
          transition:
            transform 0.3s,
            opacity 0.3s;
        }
        .yp-faq.is-dark .faq-q .pm::before,
        .yp-faq.is-dark .faq-q .pm::after {
          background: rgba(255, 255, 255, 0.6);
        }
        .faq-q .pm::before {
          left: 0;
          top: 8px;
          width: 18px;
          height: 2px;
        }
        .faq-q .pm::after {
          left: 8px;
          top: 0;
          width: 2px;
          height: 18px;
        }
        .faq-item.open .pm::after {
          transform: scaleY(0);
        }
        .faq-item.open .qt {
          color: #0a8fb0;
        }
        .yp-faq.is-dark .faq-item.open .qt {
          color: #13a6cc;
        }
        .faq-a {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s cubic-bezier(0.16, 0.84, 0.44, 1);
        }
        .faq-a-in {
          padding: 0 0 24px 38px;
          font-size: 15px;
          color: rgba(18, 49, 77, 0.7);
          line-height: 1.65;
          max-width: 680px;
        }
        .yp-faq.is-dark .faq-a-in {
          color: rgba(255, 255, 255, 0.7);
        }
        .faq-a-in :global(p) {
          margin: 0 0 12px;
        }
        .faq-a-in :global(p:last-child) {
          margin-bottom: 0;
        }
        .faq-a-in :global(a) {
          color: #0a8fb0;
        }

        @media (max-width: 860px) {
          .faq-body {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 640px) {
          .yp-faq {
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
        <div className="faq-body">
          {(eyebrow || heading) && (
            <div className={['section-head reveal', revealed ? 'in' : ''].join(' ')}>
              {eyebrow && <span className="eyebrow">{eyebrow}</span>}
              {heading && (
                <RichText data={heading as any} enableGutter={false} enableProse={false} />
              )}
            </div>
          )}

          {list.length > 0 && (
            <div className={['faq-list reveal', revealed ? 'in d1' : 'd1'].join(' ')}>
              {list.map((it, i) => {
                const isOpen = !!open[i]
                const num = String(i + 1).padStart(2, '0')
                return (
                  <div key={i} className={['faq-item', isOpen ? 'open' : ''].join(' ')}>
                    <button
                      className="faq-q"
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => toggle(i)}
                    >
                      <span className="num">{num}</span>
                      <span className="qt">{it.question}</span>
                      <span className="pm" aria-hidden="true" />
                    </button>
                    <div
                      className="faq-a"
                      style={{
                        maxHeight: isOpen
                          ? `${answerRefs.current[i]?.scrollHeight ?? 600}px`
                          : 0,
                      }}
                    >
                      <div className="faq-a-in" ref={(el) => { answerRefs.current[i] = el }}>
                        {it.answer && (
                          <RichText
                            data={it.answer as any}
                            enableGutter={false}
                            enableProse={false}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
