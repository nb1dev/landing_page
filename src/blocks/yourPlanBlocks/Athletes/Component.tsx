'use client'

import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import React, { useEffect, useRef, useState } from 'react'

import RichText from '@/components/RichText'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type BgColorPreset = 'off' | 'paper' | 'cream' | 'navy' | 'navyDeep' | 'teal' | 'custom'
type BgType = 'color' | 'image'
type MediaLike = { url?: string | null; alt?: string | null } | null

function isDarkPreset(p?: BgColorPreset | null) {
  return p === 'navy' || p === 'navyDeep' || p === 'teal'
}
function resolveBg(p?: BgColorPreset | null, c?: string | null) {
  if (!p || p === 'off') return '#F1F4F7'
  if (p === 'paper') return '#FFFFFF'
  if (p === 'cream') return '#FAF8F2'
  if (p === 'navy') return '#12314D'
  if (p === 'navyDeep') return '#0E2740'
  if (p === 'teal') return '#0A8FB0'
  if (p === 'custom') return c || '#F1F4F7'
  return '#F1F4F7'
}

type Card = {
  image?: MediaLike
  quote?: string | null
  name?: string | null
  credit?: string | null
  isVideo?: boolean | null
  watchLabel?: string | null
  video?: MediaLike
  subtitlesUrl?: string | null
}

export type YpAthletesBlockType = {
  blockType?: 'ypAthletes'
  backgroundColor?: BgColorPreset | null
  backgroundColorCustom?: string | null
  backgroundType?: BgType | null
  backgroundImage?: MediaLike
  grain?: boolean | null
  eyebrow?: string | null
  heading?: DefaultTypedEditorState | null
  lede?: DefaultTypedEditorState | null
  cards?: Card[] | null
  recordLeft?: string | null
  recordValue?: string | null
  recordRight?: string | null
}

function imgUrl(img?: MediaLike) {
  if (!img || typeof img === 'string') return ''
  return img.url ? getMediaUrl(img.url) : ''
}

export const YpAthletesComponent: React.FC<YpAthletesBlockType> = ({
  backgroundColor,
  backgroundColorCustom,
  backgroundType,
  backgroundImage,
  grain,
  eyebrow,
  heading,
  lede,
  cards,
  recordLeft,
  recordValue,
  recordRight,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [active, setActive] = useState<Card | null>(null)
  const [lbOpen, setLbOpen] = useState(false)

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

  const list = cards ?? []
  const activeVideoUrl = imgUrl(active?.video)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setRevealed(true), { threshold: 0.1 })
    o.observe(el)
    return () => o.disconnect()
  }, [])

  useEffect(() => {
    if (!lbOpen) return
    const v = videoRef.current
    if (v) {
      try {
        v.currentTime = 0
      } catch {}
      const p = v.play()
      if (p && p.catch) p.catch(() => {})
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lbOpen, activeVideoUrl])

  const openVideo = (c: Card) => {
    setActive(c)
    setLbOpen(true)
  }
  const close = () => {
    const v = videoRef.current
    if (v) {
      v.pause()
      try {
        v.currentTime = 0
      } catch {}
    }
    setLbOpen(false)
  }

  return (
    <section
      ref={sectionRef}
      style={sectionStyle}
      className={['apx-sec', grain ? 'grain' : '', isDark ? 'is-dark' : ''].join(' ')}
    >
      <style jsx>{`
        .apx-sec {
          padding: 84px 0;
          position: relative;
          color: #12314d;
        }
        .apx-sec.is-dark {
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
        .reveal.d2 {
          transition-delay: 0.18s;
        }

        /* head (left, max 620) */
        .section-head {
          max-width: 620px;
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
        .section-head :global(h2) {
          margin: 12px 0 0;
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          letter-spacing: -0.03em;
          line-height: 1.02;
          font-size: clamp(32px, 4vw, 52px);
        }
        .apx-sec.is-dark .section-head :global(h2) {
          color: #ffffff;
        }
        .section-head :global(.teal) {
          color: #0a8fb0;
        }
        .apx-lede {
          margin-top: 18px;
          font-size: clamp(16px, 1.4vw, 19px);
          font-weight: 400;
          color: rgba(18, 49, 77, 0.7);
          line-height: 1.6;
        }
        .apx-sec.is-dark .apx-lede {
          color: rgba(255, 255, 255, 0.7);
        }
        .apx-lede :global(p) {
          margin: 0;
        }

        /* cards */
        .apx-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          margin-top: 36px;
        }
        .apx-card {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          aspect-ratio: 4/5;
          background: #0a1b2e;
        }
        .apx-card img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .apx-grad {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(8, 20, 34, 0) 38%,
            rgba(8, 20, 34, 0.55) 64%,
            rgba(8, 20, 34, 0.92) 100%
          );
        }
        .apx-q {
          position: absolute;
          left: 26px;
          right: 26px;
          bottom: 24px;
          z-index: 2;
        }
        .apx-qm {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 700;
          font-size: 46px;
          line-height: 0.6;
          color: #13a6cc;
          display: block;
          margin-bottom: 8px;
        }
        .apx-qt {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 500;
          font-size: clamp(16px, 1.5vw, 19px);
          line-height: 1.32;
          letter-spacing: -0.01em;
          color: #fff;
        }
        .apx-at {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 10.5px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.62);
          margin-top: 14px;
        }
        .apx-at b {
          color: #13a6cc;
          font-weight: 500;
        }

        /* video card */
        .apx-card--video {
          cursor: pointer;
        }
        .apx-play {
          position: absolute;
          top: 42%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 4;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.16);
          -webkit-backdrop-filter: blur(7px);
          backdrop-filter: blur(7px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          transition:
            transform 0.2s,
            background 0.2s;
        }
        .apx-card--video:hover .apx-play {
          transform: translate(-50%, -50%) scale(1.1);
          background: rgba(255, 255, 255, 0.28);
        }
        .apx-play :global(svg) {
          width: 18px;
          height: 18px;
          margin-left: 2px;
          fill: #fff;
        }
        .apx-watch {
          position: absolute;
          top: calc(42% + 40px);
          left: 50%;
          transform: translateX(-50%);
          z-index: 4;
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.9);
          pointer-events: none;
        }

        /* record strip */
        .apx-record {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 18px;
          padding: 20px;
          border: 1px solid rgba(18, 49, 77, 0.1);
          border-radius: 14px;
          background: #fff;
        }
        .apx-record .rk {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 10.5px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(18, 49, 77, 0.55);
        }
        .apx-record .rv {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: 20px;
          color: #12314d;
        }
        .apx-record .rv .teal {
          color: #0a8fb0;
        }

        /* video lightbox */
        .ath-lb {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(6, 10, 14, 0.88);
          -webkit-backdrop-filter: blur(10px);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.25s;
        }
        .ath-lb.open {
          opacity: 1;
          pointer-events: auto;
        }
        .ath-lb-inner {
          position: relative;
          height: min(86vh, 780px);
          aspect-ratio: 9/16;
          max-width: 90vw;
        }
        .ath-lb-video {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 18px;
          background: #0e1a23;
          box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.8);
        }
        .ath-lb-close {
          position: absolute;
          top: -48px;
          right: 0;
          width: 38px;
          height: 38px;
          border: none;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.16);
          color: #fff;
          font-size: 17px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ath-lb-close:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        @media (max-width: 760px) {
          .apx-cards {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 640px) {
          .apx-sec {
            padding: 56px 0;
          }
          .wrap {
            padding: 0 20px;
          }
          .apx-qt {
            font-size: 16px;
          }
          .apx-record {
            flex-direction: column;
            gap: 6px;
            text-align: center;
            padding: 18px;
          }
        }
      `}</style>

      <div className="wrap">
        {(eyebrow || heading || lede) && (
          <div className={['section-head reveal', revealed ? 'in' : ''].join(' ')}>
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            {heading && <RichText data={heading as any} enableGutter={false} enableProse={false} />}
            {lede && (
              <div className="apx-lede">
                <RichText data={lede as any} enableGutter={false} enableProse={false} />
              </div>
            )}
          </div>
        )}

        {list.length > 0 && (
          <div className={['apx-cards reveal', revealed ? 'in d1' : 'd1'].join(' ')}>
            {list.map((c, i) => {
              const ph = imgUrl(c.image)
              const isVid = !!c.isVideo
              return (
                <article
                  key={i}
                  className={['apx-card', isVid ? 'apx-card--video' : ''].join(' ')}
                  role={isVid ? 'button' : undefined}
                  tabIndex={isVid ? 0 : undefined}
                  aria-label={isVid && c.name ? `Play ${c.name}'s video` : undefined}
                  onClick={isVid ? () => openVideo(c) : undefined}
                  onKeyDown={
                    isVid
                      ? (e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            openVideo(c)
                          }
                        }
                      : undefined
                  }
                >
                  {ph && <img src={ph} alt={c.name || ''} />}
                  <div className="apx-grad" />
                  {isVid && (
                    <>
                      <span className="apx-play">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                      {c.watchLabel && <div className="apx-watch">{c.watchLabel}</div>}
                    </>
                  )}
                  {(c.quote || c.name) && (
                    <div className="apx-q">
                      <span className="apx-qm">&ldquo;</span>
                      {c.quote && <div className="apx-qt">{c.quote}</div>}
                      {c.name && (
                        <div className="apx-at">
                          {c.name}
                          {c.credit && (
                            <>
                              {' · '}
                              <b>{c.credit}</b>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        )}

        {(recordLeft || recordValue || recordRight) && (
          <div className={['apx-record reveal', revealed ? 'in d2' : 'd2'].join(' ')}>
            {recordLeft && <span className="rk">{recordLeft}</span>}
            {recordValue && (
              <span className="rv">
                <span className="teal">{recordValue}</span>
              </span>
            )}
            {recordRight && <span className="rk">{recordRight}</span>}
          </div>
        )}
      </div>

      <div
        className={['ath-lb', lbOpen ? 'open' : ''].join(' ')}
        aria-hidden={!lbOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) close()
        }}
      >
        <div className="ath-lb-inner">
          <button className="ath-lb-close" type="button" aria-label="Close video" onClick={close}>
            ✕
          </button>
          {activeVideoUrl && (
            <video
              ref={videoRef}
              className="ath-lb-video"
              controls
              playsInline
              preload="metadata"
              key={activeVideoUrl}
            >
              <source src={activeVideoUrl} type="video/mp4" />
              {active?.subtitlesUrl && (
                <track kind="subtitles" srcLang="en" label="English" src={active.subtitlesUrl} default />
              )}
            </video>
          )}
        </div>
      </div>
    </section>
  )
}
