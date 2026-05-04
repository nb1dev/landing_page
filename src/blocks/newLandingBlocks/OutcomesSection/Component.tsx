'use client'

import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import React, { useEffect, useRef, useState } from 'react'

import RichText from '@/components/RichText'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type BgColorPreset = 'light' | 'dark' | 'darkNavy' | 'teal' | 'white' | 'cream' | 'custom'

function isDarkPreset(preset?: BgColorPreset | null) {
  return preset === 'dark' || preset === 'darkNavy' || preset === 'teal'
}

function resolveBg(preset?: BgColorPreset | null, custom?: string | null) {
  if (!preset || preset === 'light') return '#FFFFFF'
  if (preset === 'dark') return 'linear-gradient(180deg,#1a3d5c 0%,#0e2640 100%)'
  if (preset === 'darkNavy') return '#0e2640'
  if (preset === 'teal') return '#008498'
  if (preset === 'white') return '#FFFFFF'
  if (preset === 'cream') return 'linear-gradient(180deg,#FAF8F2 0%,#F2EFE7 100%)'
  if (preset === 'custom') return custom || '#FFFFFF'
  return '#FFFFFF'
}

type MediaLike = {
  url?: string | null
  alt?: string | null
}

type OutcomeCard = {
  image?: MediaLike | string | null
  frontName?: string | null
  backEyebrow?: string | null
  backTitle?: string | null
  backBody?: string | null
  backFoot?: string | null
}

export type OutcomesSectionBlockType = {
  blockType?: 'outcomesSection'
  backgroundColor?: BgColorPreset | null
  backgroundColorCustom?: string | null
  eyebrow?: string | null
  heading?: DefaultTypedEditorState | null
  subText?: string | null
  outcomeCards?: OutcomeCard[] | null
}

function getImgUrl(img?: MediaLike | string | null) {
  if (!img || typeof img === 'string') return ''
  return img.url ? getMediaUrl(img.url) : ''
}

export const OutcomesSectionComponent: React.FC<OutcomesSectionBlockType> = ({
  backgroundColor,
  backgroundColorCustom,
  eyebrow,
  heading,
  subText,
  outcomeCards,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set())

  const isDark = isDarkPreset(backgroundColor)
  const bg = resolveBg(backgroundColor, backgroundColorCustom)

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

  const toggleCard = (i: number) => {
    setFlippedCards((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  const safeCards = outcomeCards?.slice(0, 4) ?? []

  return (
    <section
      ref={sectionRef}
      style={{ background: bg }}
      className={[
        'oc-section relative overflow-hidden',
        isDark ? 'text-white' : 'text-[#12314D]',
      ].join(' ')}
    >
      <style jsx>{`
        .oc-section {
          padding: 4rem 1.5rem 2.5rem;
        }

        .os-rev {
          opacity: 0;
          transform: translateY(28px);
          transition:
            opacity 0.75s ease,
            transform 0.75s ease;
        }
        .os-rev.in {
          opacity: 1;
          transform: translateY(0);
        }
        .os-rev.d1 {
          transition-delay: 0.15s;
        }

        .oc-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }

        .oc-card {
          position: relative;
          cursor: pointer;
          aspect-ratio: 9/14;
          perspective: 1400px;
          -webkit-tap-highlight-color: transparent;
        }

        .oc-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
        }

        .oc-card.flipped .oc-inner {
          transform: rotateY(180deg);
        }

        .oc-front,
        .oc-back {
          position: absolute;
          inset: 0;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border-radius: 18px;
          overflow: hidden;
        }

        .oc-front {
          background: #ffffff;
          box-shadow:
            0 1px 2px rgba(18, 49, 77, 0.04),
            0 8px 24px rgba(18, 49, 77, 0.06),
            0 24px 56px -12px rgba(18, 49, 77, 0.1),
            0 0 0 1px rgba(18, 49, 77, 0.07);
        }

        .oc-front img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.8s ease;
          filter: brightness(1.02) saturate(0.95);
        }

        .oc-card:hover .oc-front img {
          transform: scale(1.03);
        }

        .oc-flip-hint {
          position: absolute;
          top: 1.1rem;
          right: 1.1rem;
          z-index: 3;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(18, 49, 77, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0a8fb0;
          font-size: 1.05rem;
          font-weight: 500;
          line-height: 1;
          transition:
            transform 0.25s ease,
            background 0.2s,
            border-color 0.2s,
            color 0.2s;
          pointer-events: none;
          user-select: none;
        }

        .oc-card:hover .oc-flip-hint {
          background: #0a8fb0;
          border-color: #0a8fb0;
          color: #ffffff;
          transform: rotate(45deg);
        }

        .oc-front-name {
          position: absolute;
          left: 1.5rem;
          right: 1.5rem;
          bottom: 1.5rem;
          font-family: 'Instrument Sans', sans-serif;
          font-size: clamp(1.45rem, 1.95vw, 1.7rem);
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.025em;
          line-height: 1.05;
          z-index: 2;
          text-shadow:
            0 2px 12px rgba(0, 0, 0, 0.5),
            0 1px 3px rgba(0, 0, 0, 0.4);
          margin: 0;
        }

        .oc-back {
          background: linear-gradient(180deg, #ffffff 0%, rgba(10, 143, 176, 0.04) 100%);
          transform: rotateY(180deg);
          padding: 2rem 1.85rem;
          display: flex;
          flex-direction: column;
          box-shadow:
            0 1px 2px rgba(18, 49, 77, 0.04),
            0 8px 24px rgba(18, 49, 77, 0.06),
            0 24px 56px -12px rgba(18, 49, 77, 0.1),
            0 0 0 1px rgba(18, 49, 77, 0.07);
          position: absolute;
          inset: 0;
          border-radius: 18px;
        }

        .oc-back::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(10, 143, 176, 0.45) 50%,
            transparent 100%
          );
          border-radius: 18px 18px 0 0;
        }

        .oc-back-ey {
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #0a8fb0;
          margin: 0;
        }

        .oc-back-title {
          font-family: 'Instrument Sans', sans-serif;
          font-size: 1.55rem;
          font-weight: 600;
          color: #12314d;
          letter-spacing: -0.025em;
          line-height: 1.15;
          margin-top: auto;
          margin-bottom: 0;
        }

        .oc-back-body {
          font-size: 0.92rem;
          font-weight: 400;
          color: #12314d;
          line-height: 1.6;
          margin-top: 0.85rem;
          margin-bottom: auto;
        }

        .oc-back-foot {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #0a8fb0;
          padding-top: 1rem;
          border-top: 1px solid rgba(18, 49, 77, 0.08);
          margin-top: 1.25rem;
          margin-bottom: 0;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .oc-back-foot::before {
          content: '←';
          color: #0a8fb0;
          font-size: 0.85rem;
        }

        @media (max-width: 880px) {
          .oc-section {
            padding: 5rem 1.25rem;
          }
          .oc-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.85rem;
          }
        }

        @media (max-width: 700px) {
          .oc-flip-hint {
            width: 28px;
            height: 28px;
            font-size: 0.85rem;
            top: 0.85rem;
            right: 0.85rem;
          }
          .oc-front-name {
            font-size: 1.1rem;
            left: 1rem;
            right: 1rem;
            bottom: 1rem;
          }
          .oc-back {
            padding: 1.35rem 1.15rem;
          }
          .oc-back-ey {
            font-size: 0.55rem;
            letter-spacing: 0.14em;
          }
          .oc-back-title {
            font-size: 1.1rem;
            line-height: 1.15;
          }
          .oc-back-body {
            font-size: 0.78rem;
            line-height: 1.5;
            margin-top: 0.6rem;
          }
          .oc-back-foot {
            font-size: 0.55rem;
            padding-top: 0.65rem;
            margin-top: 0.85rem;
          }
        }

        @media (max-width: 480px) {
          .oc-grid {
            grid-template-columns: 1fr 1fr;
            gap: 0.75rem;
          }
          .oc-card {
            aspect-ratio: 3/4;
          }
          .oc-back {
            padding: 1.1rem 0.95rem;
          }
          .oc-back-title {
            font-size: 1rem;
          }
          .oc-back-body {
            font-size: 0.74rem;
            line-height: 1.45;
            margin-top: 0.45rem;
          }
        }
      `}</style>

      <div className="relative z-[1] mx-auto max-w-[1180px]">
        <div
          className={['os-rev mx-auto mb-10 max-w-[820px] text-center', revealed ? 'in' : ''].join(
            ' ',
          )}
        >
          {eyebrow && (
            <div className="mb-3 inline-flex items-center gap-[0.7rem] font-['Inter'] text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#0A8FB0] before:h-px before:w-8 before:bg-[#0A8FB0] after:h-px after:w-8 after:bg-[#0A8FB0]">
              {eyebrow}
            </div>
          )}

          {heading && (
            <div
              className={[
                '[&_h2]:m-0 [&_h2]:font-["Instrument_Sans"] [&_h2]:text-[clamp(1.85rem,3.3vw,2.7rem)] [&_h2]:font-semibold [&_h2]:leading-[1.02] [&_h2]:tracking-[-0.03em]',
                '[&_p]:m-0 [&_p]:font-["Instrument_Sans"] [&_p]:text-[clamp(1.85rem,3.3vw,2.7rem)] [&_p]:font-semibold [&_p]:leading-[1.02] [&_p]:tracking-[-0.03em]',
                '[&_.ac]:italic [&_.ac]:text-[#0A8FB0]',
                isDark ? 'text-white' : 'text-[#12314D]',
              ].join(' ')}
            >
              <RichText data={heading as any} enableGutter={false} enableProse={false} />
            </div>
          )}

          {subText && (
            <p
              className={[
                'mx-auto mt-[0.85rem] max-w-[560px] font-["Inter"] text-[1.05rem] font-light leading-[1.65]',
                isDark ? 'text-[rgba(255,255,255,0.55)]' : 'text-[rgba(18,49,77,0.6)]',
              ].join(' ')}
            >
              {subText}
            </p>
          )}
        </div>

        {safeCards.length > 0 && (
          <div className={['oc-grid os-rev', revealed ? 'in d1' : 'd1'].join(' ')}>
            {safeCards.map((card, i) => {
              const imgUrl = getImgUrl(card.image)
              const isFlipped = flippedCards.has(i)

              return (
                <article
                  key={i}
                  className={['oc-card', isFlipped ? 'flipped' : ''].join(' ')}
                  tabIndex={0}
                  role="button"
                  aria-label={
                    card.frontName ? `Flip card to read about ${card.frontName}` : 'Flip card'
                  }
                  onClick={() => toggleCard(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      toggleCard(i)
                    }
                  }}
                >
                  <div className="oc-inner">
                    <div className="oc-front">
                      {imgUrl ? (
                        <img
                          src={imgUrl}
                          alt={typeof card.image === 'object' ? (card.image?.alt ?? '') : ''}
                        />
                      ) : (
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(10,143,176,0.08)',
                          }}
                        />
                      )}
                      <div className="oc-flip-hint" aria-hidden="true">
                        +
                      </div>
                      {card.frontName && <p className="oc-front-name">{card.frontName}</p>}
                    </div>

                    <div className="oc-back">
                      {card.backEyebrow && <p className="oc-back-ey">{card.backEyebrow}</p>}
                      {card.backTitle && <h3 className="oc-back-title">{card.backTitle}</h3>}
                      {card.backBody && <p className="oc-back-body">{card.backBody}</p>}
                      {card.backFoot && <p className="oc-back-foot">{card.backFoot}</p>}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
