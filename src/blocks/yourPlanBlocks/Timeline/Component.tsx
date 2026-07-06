'use client'

import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import React, { useEffect, useRef, useState } from 'react'

import RichText from '@/components/RichText'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type BgColorPreset = 'paper' | 'off' | 'cream' | 'navy' | 'navyDeep' | 'teal' | 'custom'
type BgType = 'color' | 'image'
type MediaLike = { url?: string | null; alt?: string | null } | null

function isDarkPreset(p?: BgColorPreset | null) {
  return p === 'navy' || p === 'navyDeep' || p === 'teal'
}
function resolveBg(p?: BgColorPreset | null, c?: string | null) {
  if (!p || p === 'paper') return '#FFFFFF'
  if (p === 'off') return '#F1F4F7'
  if (p === 'cream') return '#FAF8F2'
  if (p === 'navy') return '#12314D'
  if (p === 'navyDeep') return '#0E2740'
  if (p === 'teal') return '#0A8FB0'
  if (p === 'custom') return c || '#FFFFFF'
  return '#FFFFFF'
}
const numFrom = (s?: string | null) => {
  const n = parseFloat(String(s ?? '').replace(',', '.'))
  return isFinite(n) ? Math.max(0, Math.min(100, n)) : 0
}

type Item = {
  timeWk?: string | null
  title?: string | null
  badge?: string | null
  body?: DefaultTypedEditorState | null
  note?: string | null
}
type Stat = { label?: string | null; value?: string | null }

export type YpTimelineBlockType = {
  blockType?: 'ypTimeline'
  backgroundColor?: BgColorPreset | null
  backgroundColorCustom?: string | null
  backgroundType?: BgType | null
  backgroundImage?: MediaLike
  grain?: boolean | null
  eyebrow?: string | null
  heading?: DefaultTypedEditorState | null
  lede?: DefaultTypedEditorState | null
  items?: Item[] | null
  photo?: MediaLike
  statsLabel?: string | null
  stats?: Stat[] | null
}

function imgUrl(img?: MediaLike) {
  if (!img || typeof img === 'string') return ''
  return img.url ? getMediaUrl(img.url) : ''
}

export const YpTimelineComponent: React.FC<YpTimelineBlockType> = ({
  backgroundColor,
  backgroundColorCustom,
  backgroundType,
  backgroundImage,
  grain,
  eyebrow,
  heading,
  lede,
  items,
  photo,
  statsLabel,
  stats,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [revealed, setRevealed] = useState(false)

  const isImageMode = backgroundType === 'image'
  const isDark = isImageMode || isDarkPreset(backgroundColor)
  const resolvedBg = resolveBg(backgroundColor, backgroundColorCustom)
  const bgImg = imgUrl(backgroundImage)
  const sectionStyle: React.CSSProperties =
    isImageMode && bgImg
      ? {
          background: `linear-gradient(180deg, rgba(10,27,46,.55) 0%, rgba(10,27,46,.35) 100%), url('${bgImg}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }
      : { background: resolvedBg }

  const steps = items ?? []
  const statRows = stats ?? []
  const photoUrl = imgUrl(photo)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setRevealed(true), {
      threshold: 0.12,
    })
    o.observe(el)
    return () => o.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={sectionStyle}
      className={['yp-time', grain !== false ? 'grain' : '', isDark ? 'is-dark' : ''].join(' ')}
    >
      <style jsx>{`
        .yp-time {
          padding: 84px 0;
          position: relative;
          color: #12314d;
        }
        .yp-time.is-dark {
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
          transition-delay: 0.1s;
        }

        /* head */
        .section-head {
          max-width: 680px;
        }
        .section-head.center {
          margin: 0 auto;
          text-align: center;
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
        .eyebrow::before,
        .eyebrow.center::after {
          content: '';
          width: 28px;
          height: 1px;
          background: #0a8fb0;
        }
        .section-head :global(h2) {
          margin: 18px auto 0;
          max-width: 650px;
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          letter-spacing: -0.03em;
          line-height: 1.02;
          font-size: clamp(32px, 4vw, 52px);
        }
        .yp-time.is-dark .section-head :global(h2) {
          color: #ffffff;
        }
        .section-head :global(.teal) {
          color: #0a8fb0;
        }
        .time-lede {
          margin-top: 18px;
          font-size: clamp(16px, 1.4vw, 19px);
          font-weight: 400;
          color: rgba(18, 49, 77, 0.7);
          line-height: 1.6;
        }
        .yp-time.is-dark .time-lede {
          color: rgba(255, 255, 255, 0.7);
        }
        .time-lede :global(p) {
          margin: 0;
        }

        /* layout */
        .time-body {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 56px;
          margin-top: 54px;
          align-items: start;
        }
        .time-track {
          position: relative;
        }
        .time-track::before {
          content: '';
          position: absolute;
          left: 0;
          top: 7px;
          bottom: 16px;
          width: 2px;
          border-radius: 2px;
          background: linear-gradient(
            180deg,
            rgba(14, 143, 176, 0.2) 0%,
            rgba(14, 143, 176, 0.5) 55%,
            #0e8fb0 100%
          );
        }
        .time-item {
          position: relative;
          border-left: none;
          padding: 0 0 38px 34px;
        }
        .time-item:last-child {
          padding-bottom: 0;
        }
        .time-item .dot {
          position: absolute;
          left: -7px;
          top: 3px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #f1f4f7;
          border: 2px solid rgba(14, 143, 176, 0.5);
        }
        .time-item:nth-child(1) .dot {
          border-color: transparent;
          background: transparent;
        }
        .time-item:nth-child(1) .dot::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #0e8fb0;
        }
        .time-item:nth-child(2) .dot {
          border-color: #0e8fb0;
        }
        .time-item:nth-child(2) .dot::after {
          content: '';
          position: absolute;
          inset: 4px;
          border-radius: 50%;
          background: #0e8fb0;
        }
        .time-item:nth-child(3) .dot {
          border-color: #0e8fb0;
          background: #0e8fb0;
        }
        .time-item:nth-child(3) .dot::after {
          content: '';
          position: absolute;
          inset: 3px;
          border-radius: 50%;
          background: #0e8fb0;
        }
        .time-item:nth-child(4) .dot {
          border-color: #0e8fb0;
          background: #0e8fb0;
          box-shadow: 0 0 0 6px rgba(14, 143, 176, 0.18);
        }
        .time-item:nth-child(4) .dot::after {
          content: '';
          position: absolute;
          inset: 3px;
          border-radius: 50%;
          background: #0e8fb0;
        }
        .time-wk {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #fff;
          background: #0a8fb0;
          padding: 4px 11px;
          border-radius: 100px;
          margin-bottom: 10px;
        }
        .time-item h4 {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: 20px;
          letter-spacing: -0.02em;
          margin: 0;
          color: #12314d;
        }
        .yp-time.is-dark .time-item h4 {
          color: #ffffff;
        }
        .time-adv {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #0a8fb0;
          background: rgba(10, 143, 176, 0.08);
          border: 1px solid rgba(10, 143, 176, 0.3);
          border-radius: 100px;
          padding: 3px 9px;
          margin-left: 8px;
          vertical-align: middle;
        }
        .time-body :global(p.time-p) {
          font-size: 14.5px;
          color: rgba(18, 49, 77, 0.7);
          line-height: 1.6;
          margin-top: 8px;
        }
        .yp-time.is-dark .time-body :global(p.time-p) {
          color: rgba(255, 255, 255, 0.7);
        }
        .time-p :global(p) {
          margin: 0;
          font-size: 14.5px;
          color: rgba(18, 49, 77, 0.7);
          line-height: 1.6;
        }
        .yp-time.is-dark .time-p :global(p) {
          color: rgba(255, 255, 255, 0.7);
        }
        .time-core-note {
          display: block;
          margin-top: 8px;
          font-size: 12.5px;
          color: rgba(18, 49, 77, 0.55);
        }
        .yp-time.is-dark .time-core-note {
          color: rgba(255, 255, 255, 0.55);
        }

        /* stats card */
        .time-stats {
          position: sticky;
          top: 90px;
          border-radius: 18px;
          overflow: hidden;
          padding: 0;
          background: #0a1b2e;
          aspect-ratio: 4/5;
        }
        .time-photo {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 18%;
          margin: 0;
          border-radius: 0;
          filter: brightness(0.86) saturate(1.08) contrast(1.04);
          display: block;
        }
        .ts-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(8, 20, 34, 0.12) 0%,
            rgba(8, 20, 34, 0.2) 42%,
            rgba(8, 20, 34, 0.66) 72%,
            rgba(8, 20, 34, 0.95) 100%
          );
        }
        .ts-data {
          /* Hidden per design direction — stats + progress bar no longer shown.
             Fields stay editable in Payload; they simply never render. */
          display: none !important;
          position: absolute;
          left: 16px;
          right: 16px;
          bottom: 16px;
          padding: 22px 24px;
        }
        .ts-data > :global(*) {
          position: relative;
          z-index: 1;
        }
        .ts-data::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 0;
          background:
            radial-gradient(130% 100% at 100% 0%, rgba(10, 143, 176, 0.24) 0%, transparent 55%),
            linear-gradient(155deg, rgba(16, 42, 62, 0.5) 0%, rgba(9, 21, 36, 0.58) 80%);
          -webkit-backdrop-filter: blur(14px) saturate(130%);
          backdrop-filter: blur(14px) saturate(130%);
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 16px;
        }
        .ts-lbl {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #13a6cc;
          margin-bottom: 11px;
        }
        .stat-r {
          margin-bottom: 9px;
        }
        .stat-r:last-child {
          margin-bottom: 0;
        }
        .stat-top {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .stat-lbl {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.7);
          max-width: 72%;
          line-height: 1.4;
        }
        .stat-v {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: 15px;
          color: #13a6cc;
        }
        .stat-bar {
          height: 4px;
          border-radius: 3px;
          background: rgba(255, 255, 255, 0.1);
          margin-top: 5px;
          overflow: hidden;
        }
        .stat-fill {
          height: 100%;
          border-radius: 3px;
          background: #13a6cc;
          width: 0;
          transition: width 1.1s cubic-bezier(0.16, 0.84, 0.44, 1);
        }


        @media (prefers-reduced-motion: no-preference) {
          .time-track::before {
            background: rgba(18, 49, 77, 0.1) !important;
          }
          .time-track::after {
            content: '';
            position: absolute;
            left: 0;
            top: 7px;
            bottom: 16px;
            width: 2px;
            border-radius: 2px;
            background: linear-gradient(
              180deg,
              rgba(14, 143, 176, 0.2) 0%,
              rgba(14, 143, 176, 0.5) 55%,
              #0e8fb0 100%
            );
            transform: scaleY(0);
            transform-origin: top;
            transition: transform 1.15s cubic-bezier(0.16, 0.84, 0.44, 1) 0.1s;
          }
          .time-track.in::after {
            transform: scaleY(1);
          }
          .time-item {
            opacity: 0;
            transform: translateY(16px);
            transition:
              opacity 0.6s cubic-bezier(0.16, 0.84, 0.44, 1),
              transform 0.6s cubic-bezier(0.16, 0.84, 0.44, 1);
          }
          .time-track.in .time-item {
            opacity: 1;
            transform: none;
          }
          .time-track.in .time-item:nth-child(1) {
            transition-delay: 0.12s;
          }
          .time-track.in .time-item:nth-child(2) {
            transition-delay: 0.3s;
          }
          .time-track.in .time-item:nth-child(3) {
            transition-delay: 0.48s;
          }
          .time-track.in .time-item:nth-child(4) {
            transition-delay: 0.66s;
          }
        }

        @media (max-width: 860px) {
          .yp-time {
            padding: 56px 0;
          }
          .wrap {
            padding: 0 20px;
          }
          .time-body {
            grid-template-columns: 1fr;
            gap: 24px;
            align-items: start;
          }
          .time-stats {
            position: relative;
            top: auto;
            aspect-ratio: auto;
          }
          .time-photo {
            position: static;
            height: auto;
            min-height: 460px;
            max-height: 520px;
          }
        }
      `}</style>

      <div className="wrap">
        {(eyebrow || heading || lede) && (
          <div className={['section-head center reveal', revealed ? 'in' : ''].join(' ')}>
            {eyebrow && <span className="eyebrow center">{eyebrow}</span>}
            {heading && <RichText data={heading as any} enableGutter={false} enableProse={false} />}
            {lede && (
              <div className="time-lede">
                <RichText data={lede as any} enableGutter={false} enableProse={false} />
              </div>
            )}
          </div>
        )}

        <div className="time-body">
          {steps.length > 0 && (
            <div className={['time-track reveal', revealed ? 'in' : ''].join(' ')}>
              {steps.map((it, i) => (
                <div className="time-item" key={i}>
                  <div className="dot" />
                  {it.timeWk && <span className="time-wk">{it.timeWk}</span>}
                  <h4>
                    {it.title}
                    {it.badge && <span className="time-adv">{it.badge}</span>}
                  </h4>
                  {it.body && (
                    <div className="time-p">
                      <RichText data={it.body as any} enableGutter={false} enableProse={false} />
                    </div>
                  )}
                  {it.note && <span className="time-core-note">{it.note}</span>}
                </div>
              ))}
            </div>
          )}

          {(photoUrl || statsLabel || statRows.length > 0) && (
            <div className={['time-stats reveal', revealed ? 'in d1' : 'd1'].join(' ')}>
              {photoUrl && (
                <img className="time-photo" src={photoUrl} alt={(photo as any)?.alt || ''} />
              )}
              <div className="ts-scrim" />
              <div className="ts-data">
                {statsLabel && <div className="ts-lbl">{statsLabel}</div>}
                {statRows.map((s, i) => (
                  <div className="stat-r" key={i}>
                    <div className="stat-top">
                      <span className="stat-lbl">{s.label}</span>
                      <span className="stat-v">{s.value}</span>
                    </div>
                    <div className="stat-bar">
                      <div
                        className="stat-fill"
                        style={{ width: revealed ? `${numFrom(s.value)}%` : '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
