'use client'

import React, { useEffect, useRef, useState } from 'react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import RichText from '@/components/RichText'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type BgPreset = 'cream' | 'creamGradient' | 'white' | 'custom'

function resolveAthBg(preset?: BgPreset | null, custom?: string | null): string {
  if (preset === 'creamGradient') return 'linear-gradient(180deg,#F0EDE2 0%,#EBE7DA 100%)'
  if (preset === 'white') return '#FFFFFF'
  if (preset === 'custom') return custom || '#FAF8F2'
  return '#FAF8F2'
}

function resolveUspBg(preset?: BgPreset | null): string {
  if (preset === 'creamGradient') return '#FAF8F2'
  return '#FFFFFF'
}

type MediaLike = { url?: string | null; alt?: string | null }

function getImgUrl(img?: MediaLike | string | null): string {
  if (!img || typeof img === 'string') return ''
  return img.url ? getMediaUrl(img.url) : ''
}

const ICONS: Record<string, React.ReactNode> = {
  checkCircle: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 12l2 2 4-4" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  ),
  pulse: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 12h4l3-9 4 18 3-9h4" />
    </svg>
  ),
  checkSquare: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  plus: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5v14" />
    </svg>
  ),
  speechBubble: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M9 9h6m-6 6h6m-3-9v12" />
    </svg>
  ),
}

export type AthleteCard = {
  image?: MediaLike | string | null
  tag?: string | null
  name?: string | null
  title?: string | null
  quoteBody?: string | null
  quoteAttr?: string | null
}

export type UspItem = {
  iconType?: string | null
  heading?: string | null
  subtext?: string | null
}

export type AthleteBannerVariant = {
  variantKey?: string | null
  backgroundColor?: BgPreset | null
  backgroundColorCustom?: string | null
  eyebrow?: string | null
  heading?: DefaultTypedEditorState | null
  athleteCards?: AthleteCard[] | null
  uspItems?: UspItem[] | null
}

export type AthleteBannerBlockType = {
  blockType?: 'athleteBanner'
  backgroundColor?: BgPreset | null
  backgroundColorCustom?: string | null
  eyebrow?: string | null
  heading?: DefaultTypedEditorState | null
  athleteCards?: AthleteCard[] | null
  uspItems?: UspItem[] | null
  variants?: AthleteBannerVariant[] | null
}

export const AthleteBannerComponent: React.FC<AthleteBannerBlockType> = (props) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [activeCards, setActiveCards] = useState<Set<number>>(new Set())
  const [variantKey, setVariantKey] = useState<string | null>(null)

  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get('v')
    if (v) setVariantKey(v)
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setRevealed(true)
      },
      { threshold: 0.08 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (sectionRef.current && !sectionRef.current.contains(e.target as Node)) {
        setActiveCards(new Set())
      }
    }
    document.addEventListener('click', handleOutside)
    return () => document.removeEventListener('click', handleOutside)
  }, [])

  const variant = variantKey
    ? (props.variants?.find((v) => v.variantKey === variantKey) ?? null)
    : null

  const backgroundColor = variant?.backgroundColor ?? props.backgroundColor
  const backgroundColorCustom = variant?.backgroundColorCustom ?? props.backgroundColorCustom
  const eyebrow = variant?.eyebrow ?? props.eyebrow
  const heading = variant?.heading ?? props.heading
  const athleteCards = variant?.athleteCards ?? props.athleteCards
  const uspItems = variant?.uspItems ?? props.uspItems

  const athBg = resolveAthBg(backgroundColor, backgroundColorCustom)
  const uspBg = resolveUspBg(backgroundColor)

  const cards = athleteCards?.slice(0, 6) ?? []

  const toggleCard = (i: number) => {
    setActiveCards((prev) => {
      const next = new Set<number>()
      if (!prev.has(i)) next.add(i)
      return next
    })
  }

  return (
    <>
      <section ref={sectionRef} style={{ background: athBg }} className="ab-section">
        <style jsx>{`
          .ab-section {
            padding: 5rem 1.5rem 3.5rem;
            position: relative;
            overflow: hidden;
          }

          .ab-rev {
            opacity: 0;
            transform: translateY(34px);
            transition:
              opacity 0.9s ease,
              transform 0.9s ease;
          }
          .ab-rev.in {
            opacity: 1;
            transform: translateY(0);
          }
          .ab-rev.d1 {
            transition-delay: 0.1s;
          }
          .ab-rev.d2 {
            transition-delay: 0.2s;
          }

          .ab-inner {
            position: relative;
            z-index: 1;
            max-width: 800px;
            margin: 0 auto;
          }

          .ab-head {
            text-align: center;
            max-width: 680px;
            margin: 0 auto 2.5rem;
          }

          .ab-eyebrow {
            font-size: 0.7rem;
            font-weight: 600;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: #008498;
            margin-bottom: 1.5rem;
            display: inline-flex;
            align-items: center;
            gap: 0.7rem;
          }
          .ab-eyebrow::before {
            content: '';
            width: 32px;
            height: 1px;
            background: #008498;
          }
          .ab-eyebrow::after {
            content: '';
            width: 32px;
            height: 1px;
            background: #008498;
          }

          .ab-h-wrap :global(h1),
          .ab-h-wrap :global(h2),
          .ab-h-wrap :global(h3),
          .ab-h-wrap :global(p) {
            font-family: 'Instrument Sans', sans-serif;
            font-size: clamp(2rem, 3.2vw, 2.6rem);
            font-weight: 500;
            line-height: 1.1;
            letter-spacing: -0.03em;
            color: #12314d;
            margin: 0;
          }
          .ab-h-wrap :global(.ac) {
            font-style: italic;
            color: #008498;
          }

          .ab-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.25rem;
          }

          .ab-card {
            position: relative;
            border-radius: 18px;
            overflow: hidden;
            aspect-ratio: 4/5;
            background: linear-gradient(135deg, #1a3d5c 0%, #0a1e35 100%);
            box-shadow:
              0 1px 2px rgba(18, 49, 77, 0.04),
              0 8px 24px -8px rgba(18, 49, 77, 0.12),
              0 24px 48px -16px rgba(18, 49, 77, 0.18);
            transition:
              transform 0.25s,
              box-shadow 0.25s;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
          }

          .ab-card::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(180deg, transparent 40%, rgba(10, 30, 53, 0.95) 100%);
            pointer-events: none;
          }

          .ab-card img {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center 28%;
            display: block;
          }

          .ab-info {
            position: absolute;
            bottom: 1.85rem;
            left: 1.85rem;
            right: 1.85rem;
            z-index: 2;
            transition: opacity 0.25s ease;
          }

          .ab-tag {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            font-size: 0.6rem;
            font-weight: 600;
            letter-spacing: 0.13em;
            text-transform: uppercase;
            color: #ffffff;
            background: rgba(10, 143, 176, 0.85);
            backdrop-filter: blur(10px);
            padding: 0.32rem 0.7rem;
            border-radius: 100px;
            margin-bottom: 1rem;
          }
          .ab-tag::before {
            content: '';
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #ffffff;
          }

          .ab-name {
            font-family: 'Instrument Sans', sans-serif;
            font-size: 1.5rem;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: -0.025em;
            line-height: 1.05;
            margin-bottom: 0.4rem;
          }

          .ab-title {
            font-size: 0.78rem;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.75);
            letter-spacing: 0.005em;
            line-height: 1.4;
          }

          .ab-quote {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            z-index: 3;
            padding: 1.85rem;
            background: linear-gradient(
              180deg,
              rgba(10, 30, 53, 0.4) 0%,
              rgba(10, 30, 53, 0.95) 30%,
              rgba(10, 30, 53, 0.98) 100%
            );
            transform: translateY(100%);
            transition: transform 0.45s cubic-bezier(0.45, 0, 0.15, 1);
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            color: #ffffff;
          }

          .ab-card:hover .ab-quote {
            transform: translateY(0);
          }
          .ab-card:hover .ab-info {
            opacity: 0;
          }

          .ab-quote-mark {
            font-family: 'Instrument Sans', sans-serif;
            font-size: 3rem;
            font-weight: 700;
            line-height: 1;
            color: #008498;
            margin-bottom: 0.5rem;
          }

          .ab-quote-body {
            font-size: 0.95rem;
            font-weight: 400;
            color: #ffffff;
            line-height: 1.55;
            margin-bottom: 1rem;
          }

          .ab-quote-attr {
            font-size: 0.7rem;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.7);
            letter-spacing: 0.005em;
          }

          @media (max-width: 880px) {
            .ab-section {
              padding: 5rem 1.25rem;
            }
            .ab-grid {
              grid-template-columns: 1fr !important;
              gap: 1rem !important;
            }
            .ab-card {
              aspect-ratio: 4/5 !important;
              max-width: 480px;
              margin: 0 auto;
              width: 100%;
            }
            .ab-quote {
              display: flex !important;
            }
            .ab-card .ab-quote {
              transform: translateY(100%);
            }
            .ab-card:hover .ab-quote {
              transform: translateY(100%);
            }
            .ab-card:hover .ab-info {
              opacity: 1;
            }
            .ab-card.show-quote .ab-quote {
              transform: translateY(0) !important;
            }
            .ab-card.show-quote .ab-info {
              opacity: 0;
            }
          }
        `}</style>

        <div className="ab-inner">
          <div className="ab-head">
            {eyebrow && (
              <div className={['ab-eyebrow ab-rev', revealed ? 'in' : ''].join(' ')}>{eyebrow}</div>
            )}
            {heading && (
              <div className={['ab-h-wrap ab-rev d1', revealed ? 'in' : ''].join(' ')}>
                <RichText data={heading as any} enableGutter={false} enableProse={false} />
              </div>
            )}
          </div>

          {cards.length > 0 && (
            <div className="ab-grid">
              {cards.map((card, i) => {
                const imgUrl = getImgUrl(card.image)
                const isActive = activeCards.has(i)
                const delay = i === 0 ? 'd1' : 'd2'

                return (
                  <article
                    key={i}
                    tabIndex={0}
                    className={[
                      'ab-card ab-rev',
                      delay,
                      revealed ? 'in' : '',
                      isActive ? 'show-quote' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => toggleCard(i)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        toggleCard(i)
                      }
                    }}
                  >
                    {imgUrl && (
                      <img
                        src={imgUrl}
                        alt={typeof card.image === 'object' ? (card.image?.alt ?? '') : ''}
                        loading="lazy"
                      />
                    )}
                    <div className="ab-info">
                      {card.tag && <div className="ab-tag">{card.tag}</div>}
                      {card.name && <div className="ab-name">{card.name}</div>}
                      {card.title && <div className="ab-title">{card.title}</div>}
                    </div>
                    <div className="ab-quote">
                      <div className="ab-quote-mark">&quot</div>
                      {card.quoteBody && <div className="ab-quote-body">{card.quoteBody}</div>}
                      {card.quoteAttr && <div className="ab-quote-attr">{card.quoteAttr}</div>}
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {uspItems && uspItems.length > 0 && (
        <section style={{ background: uspBg }} className="usp-wrap">
          <style jsx>{`
            .usp-wrap {
              padding: 1.5rem 1.5rem 2.5rem;
            }
            .usp-inner {
              max-width: 1180px;
              margin: 0 auto;
              display: grid;
              grid-template-columns: repeat(5, 1fr);
              gap: 1px;
              background: rgba(18, 49, 77, 0.08);
              border-radius: 18px;
              border: 1px solid rgba(18, 49, 77, 0.06);
              overflow: hidden;
            }
            .usp-cell {
              background: #ffffff;
              display: flex;
              align-items: center;
              gap: 0.85rem;
              padding: 1.4rem 1.25rem;
            }
            .usp-icon {
              flex-shrink: 0;
              width: 36px;
              height: 36px;
              border-radius: 10px;
              background: rgba(10, 143, 176, 0.08);
              color: #008498;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .usp-text {
              display: flex;
              flex-direction: column;
              gap: 0.1rem;
              min-width: 0;
            }
            .usp-h {
              font-family: 'Instrument Sans', sans-serif;
              font-size: 0.86rem;
              font-weight: 600;
              color: #12314d;
              letter-spacing: -0.005em;
              line-height: 1.25;
            }
            .usp-sub {
              font-size: 0.7rem;
              font-weight: 400;
              color: rgba(18, 49, 77, 0.65);
              line-height: 1.3;
            }
            @media (max-width: 1100px) {
              .usp-inner {
                grid-template-columns: repeat(3, 1fr);
              }
            }
            @media (max-width: 760px) {
              .usp-inner {
                grid-template-columns: repeat(2, 1fr);
              }
            }
            @media (max-width: 480px) {
              .usp-inner {
                grid-template-columns: 1fr;
              }
            }
            @media (max-width: 880px) {
              .usp-wrap {
                padding: 1rem 1rem 1.5rem !important;
              }
            }
          `}</style>

          <div className="usp-inner">
            {uspItems.map((item, i) => (
              <div key={i} className="usp-cell">
                {item.iconType && ICONS[item.iconType] && (
                  <div className="usp-icon">{ICONS[item.iconType]}</div>
                )}
                <div className="usp-text">
                  {item.heading && <div className="usp-h">{item.heading}</div>}
                  {item.subtext && <div className="usp-sub">{item.subtext}</div>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
