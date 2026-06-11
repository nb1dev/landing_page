'use client'

import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import React, { useEffect, useState } from 'react'

import RichText from '@/components/RichText'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type BgColorPreset = 'cream' | 'paper' | 'off' | 'navy' | 'navyDeep' | 'teal' | 'custom'
type BgType = 'color' | 'image'
type MediaLike = { url?: string | null; alt?: string | null } | null

function isDarkPreset(p?: BgColorPreset | null) {
  return p === 'navy' || p === 'navyDeep' || p === 'teal'
}
function resolveBg(p?: BgColorPreset | null, c?: string | null) {
  if (!p || p === 'cream') return '#FAF8F2'
  if (p === 'paper') return '#FFFFFF'
  if (p === 'off') return '#F1F4F7'
  if (p === 'navy') return '#12314D'
  if (p === 'navyDeep') return '#0E2740'
  if (p === 'teal') return '#0A8FB0'
  if (p === 'custom') return c || '#FAF8F2'
  return '#FAF8F2'
}

type Member = {
  photo?: MediaLike
  name?: string | null
  role?: string | null
  detail?: string | null
  pill?: string | null
  modalTitle?: string | null
  bio?: DefaultTypedEditorState | null
  quote?: string | null
}

export type YpScienceBoardBlockType = {
  blockType?: 'ypScienceBoard'
  backgroundColor?: BgColorPreset | null
  backgroundColorCustom?: string | null
  backgroundType?: BgType | null
  backgroundImage?: MediaLike
  grain?: boolean | null
  eyebrow?: string | null
  heading?: DefaultTypedEditorState | null
  lede?: DefaultTypedEditorState | null
  members?: Member[] | null
}

function imgUrl(img?: MediaLike) {
  if (!img || typeof img === 'string') return ''
  return img.url ? getMediaUrl(img.url) : ''
}

export const YpScienceBoardComponent: React.FC<YpScienceBoardBlockType> = ({
  backgroundColor,
  backgroundColorCustom,
  backgroundType,
  backgroundImage,
  grain,
  eyebrow,
  heading,
  lede,
  members,
}) => {
  const [revealed, setRevealed] = useState(false)
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const sectionRef = React.useRef<HTMLElement | null>(null)

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

  const people = members ?? []
  const active = activeIdx != null ? people[activeIdx] : null

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setRevealed(true), { threshold: 0.1 })
    o.observe(el)
    return () => o.disconnect()
  }, [])

  useEffect(() => {
    if (!modalOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [modalOpen])

  const open = (i: number) => {
    setActiveIdx(i)
    setModalOpen(true)
  }

  return (
    <section
      ref={sectionRef}
      style={sectionStyle}
      className={['sci-b nb1-sb', grain ? 'grain' : '', isDark ? 'is-dark' : ''].join(' ')}
    >
      <style jsx>{`
        .sci-b {
          padding: 84px 0;
          position: relative;
          color: #12314d;
        }
        .sci-b.is-dark {
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

        /* head (left-aligned) */
        .sci-b-head {
          max-width: 620px;
          margin-bottom: 32px;
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
        .sci-b-head :global(h2) {
          margin: 12px 0;
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          letter-spacing: -0.03em;
          line-height: 1.02;
          font-size: clamp(32px, 4vw, 52px);
        }
        .sci-b.is-dark .sci-b-head :global(h2) {
          color: #ffffff;
        }
        .sci-b-head :global(.teal) {
          color: #0a8fb0;
        }
        .sci-lede {
          font-size: clamp(16px, 1.4vw, 19px);
          font-weight: 400;
          color: rgba(18, 49, 77, 0.7);
          line-height: 1.6;
        }
        .sci-b.is-dark .sci-lede {
          color: rgba(255, 255, 255, 0.7);
        }
        .sci-lede :global(p) {
          margin: 0;
        }

        /* grid + cards */
        .sb-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
          max-width: 1040px;
          margin: 36px auto 0;
        }
        .sb-card {
          background: #fff;
          border: 1px solid rgba(18, 49, 77, 0.1);
          border-radius: 18px;
          overflow: hidden;
          cursor: pointer;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
          text-align: left;
          padding: 0;
        }
        .sb-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 28px 56px -30px rgba(18, 49, 77, 0.34);
        }
        .sb-card:focus-visible {
          outline: 2px solid #0a8fb0;
          outline-offset: 3px;
        }
        .sb-photo {
          position: relative;
          aspect-ratio: 4/5;
          overflow: hidden;
          background: #eaf1f4;
        }
        .sb-photo img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          display: block;
        }
        .sb-hover {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(8, 20, 34, 0.44);
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .sb-card:hover .sb-hover,
        .sb-card:focus-visible .sb-hover {
          opacity: 1;
        }
        .sb-hover span {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #fff;
        }
        .sb-body {
          padding: 20px 22px 22px;
        }
        .sb-name {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: 18px;
          letter-spacing: -0.01em;
          color: #12314d;
        }
        .sb-role {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #0a8fb0;
          margin-top: 5px;
          line-height: 1.35;
        }
        .sb-detail {
          font-size: 12.5px;
          line-height: 1.45;
          color: rgba(18, 49, 77, 0.55);
          margin-top: 9px;
        }
        .sb-more {
          text-align: center;
          margin-top: 38px;
        }
        .sb-more a {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #0a8fb0;
          text-decoration: none;
        }
        .sb-more a .ar {
          transition: transform 0.2s ease;
        }
        .sb-more a:hover .ar {
          transform: translateX(4px);
        }

        /* modal */
        .sb-modal {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(8, 20, 34, 0.62);
          -webkit-backdrop-filter: blur(6px);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 28px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.25s ease;
        }
        .sb-modal.open {
          opacity: 1;
          pointer-events: auto;
        }
        .sb-modal-card {
          position: relative;
          width: min(880px, 94vw);
          max-height: 88vh;
          background: #fff;
          border-radius: 22px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 310px 1fr;
          box-shadow: 0 50px 110px -30px rgba(0, 0, 0, 0.6);
        }
        .sb-modal-photo {
          position: relative;
          min-height: 440px;
          background: rgba(10, 143, 176, 0.08);
        }
        .sb-modal-photo img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
        }
        .sb-modal-body {
          padding: 40px;
          overflow: auto;
        }
        .sb-modal-x {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 34px;
          height: 34px;
          border: none;
          border-radius: 50%;
          background: #eef1f4;
          color: #12314d;
          font-size: 15px;
          cursor: pointer;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sb-modal-x:hover {
          background: #e2e7eb;
        }
        .sb-modal-pill {
          display: inline-block;
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #0a8fb0;
          border: 1px solid rgba(10, 143, 176, 0.3);
          border-radius: 100px;
          padding: 5px 12px;
          margin-bottom: 16px;
        }
        .sb-modal-name {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: 26px;
          letter-spacing: -0.02em;
          color: #12314d;
          margin: 0;
        }
        .sb-modal-title {
          font-size: 14px;
          font-weight: 600;
          color: #0a8fb0;
          margin-top: 8px;
          line-height: 1.4;
        }
        .sb-modal-bio {
          margin-top: 18px;
        }
        .sb-modal-bio :global(p) {
          font-size: 14.5px;
          line-height: 1.62;
          color: rgba(18, 49, 77, 0.7);
          margin: 0 0 14px;
        }
        .sb-modal-quote {
          margin: 20px 0 0;
          padding-left: 16px;
          border-left: 3px solid #0a8fb0;
          font-style: italic;
          font-size: 14px;
          color: rgba(18, 49, 77, 0.55);
        }

        @media (max-width: 860px) {
          /* Two across on tablets (source: .sci-grid repeat(2,1fr)). */
          .sb-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 680px) {
          .sb-modal-card {
            grid-template-columns: 1fr;
            max-height: 90vh;
            overflow: auto;
          }
          .sb-modal-photo {
            height: 300px;
            min-height: 0;
          }
          .sb-modal-body {
            padding: 28px 26px;
          }
        }
        @media (max-width: 640px) {
          .sci-b {
            padding: 56px 0;
          }
          .wrap {
            padding: 0 20px;
          }
        }
        @media (max-width: 560px) {
          .sb-grid {
            display: flex;
            gap: 14px;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            margin: 30px -20px 0;
            padding: 4px 20px 6px;
          }
          .sb-grid::-webkit-scrollbar {
            display: none;
          }
          .sb-card {
            flex: 0 0 76%;
            scroll-snap-align: center;
          }
        }
      `}</style>

      <div className="wrap">
        {(eyebrow || heading || lede) && (
          <div className={['sci-b-head reveal', revealed ? 'in' : ''].join(' ')}>
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            {heading && <RichText data={heading as any} enableGutter={false} enableProse={false} />}
            {lede && (
              <div className="sci-lede">
                <RichText data={lede as any} enableGutter={false} enableProse={false} />
              </div>
            )}
          </div>
        )}

        {people.length > 0 && (
          <div className={['sb-grid reveal', revealed ? 'in d1' : 'd1'].join(' ')}>
            {people.map((p, i) => {
              const ph = imgUrl(p.photo)
              return (
                <article
                  key={i}
                  className="sb-card"
                  role="button"
                  tabIndex={0}
                  aria-label={p.name ? `View bio: ${p.name}` : 'View bio'}
                  onClick={() => open(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      open(i)
                    }
                  }}
                >
                  <div className="sb-photo">
                    {ph && <img src={ph} alt={p.name || ''} />}
                    <div className="sb-hover">
                      <span>View bio</span>
                    </div>
                  </div>
                  <div className="sb-body">
                    {p.name && <div className="sb-name">{p.name}</div>}
                    {(p.role || p.detail) && <div className="sb-role">{p.role}</div>}
                    {p.detail && <div className="sb-detail">{p.detail}</div>}
                  </div>
                </article>
              )
            })}
          </div>
        )}

      </div>

      <div
        className={['sb-modal', modalOpen ? 'open' : ''].join(' ')}
        role="dialog"
        aria-modal="true"
        aria-hidden={!modalOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) setModalOpen(false)
        }}
      >
        <div className="sb-modal-card">
          <button
            className="sb-modal-x"
            type="button"
            aria-label="Close"
            onClick={() => setModalOpen(false)}
          >
            ✕
          </button>
          <div className="sb-modal-photo">
            {active && imgUrl(active.photo) && <img src={imgUrl(active.photo)} alt="" />}
          </div>
          <div className="sb-modal-body">
            {active?.pill && <span className="sb-modal-pill">{active.pill}</span>}
            {active?.name && <h3 className="sb-modal-name">{active.name}</h3>}
            {active?.modalTitle && <div className="sb-modal-title">{active.modalTitle}</div>}
            {active?.bio && (
              <div className="sb-modal-bio">
                <RichText data={active.bio as any} enableGutter={false} enableProse={false} />
              </div>
            )}
            {active?.quote && <blockquote className="sb-modal-quote">{active.quote}</blockquote>}
          </div>
        </div>
      </div>
    </section>
  )
}
