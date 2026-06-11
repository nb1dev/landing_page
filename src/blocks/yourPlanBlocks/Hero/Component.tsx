'use client'

import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import React, { useEffect, useRef, useState } from 'react'

import RichText from '@/components/RichText'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type BgColorPreset = 'paper' | 'off' | 'cream' | 'navy' | 'navyDeep' | 'teal' | 'custom'
type BgType = 'color' | 'image'

type MediaLike = { url?: string | null; alt?: string | null } | null

function isDarkPreset(preset?: BgColorPreset | null): boolean {
  return preset === 'navy' || preset === 'navyDeep' || preset === 'teal'
}

function resolveBg(preset?: BgColorPreset | null, custom?: string | null): string {
  if (!preset || preset === 'paper') return '#FFFFFF'
  if (preset === 'off') return '#F1F4F7'
  if (preset === 'cream') return '#FAF8F2'
  if (preset === 'navy') return '#12314D'
  if (preset === 'navyDeep') return '#0E2740'
  if (preset === 'teal') return '#0A8FB0'
  if (preset === 'custom') return custom || '#FFFFFF'
  return '#FFFFFF'
}

type BoardFace = { image?: MediaLike | string | null }

export type YpHeroBlockType = {
  blockType?: 'ypHero'
  backgroundColor?: BgColorPreset | null
  backgroundColorCustom?: string | null
  backgroundType?: BgType | null
  backgroundImage?: MediaLike
  grain?: boolean | null
  heading?: DefaultTypedEditorState | null
  description?: DefaultTypedEditorState | null
  primaryButton?: { label?: string | null; url?: string | null } | null
  secondaryLink?: { label?: string | null; url?: string | null } | null
  boardFaces?: BoardFace[] | null
  boardCopy?: string | null
  boardSubCopy?: string | null
  image?: MediaLike
}

function imgUrl(img?: MediaLike | string | null): string {
  if (!img || typeof img === 'string') return ''
  return img.url ? getMediaUrl(img.url) : ''
}

function imgAlt(img?: MediaLike | string | null): string {
  if (!img || typeof img === 'string') return ''
  return img.alt ?? ''
}

export const YpHeroComponent: React.FC<YpHeroBlockType> = ({
  backgroundColor,
  backgroundColorCustom,
  backgroundType,
  backgroundImage,
  grain,
  heading,
  description,
  primaryButton,
  secondaryLink,
  boardFaces,
  boardCopy,
  boardSubCopy,
  image,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [revealed, setRevealed] = useState(false)

  const isImageMode = backgroundType === 'image'
  const isDark = isImageMode || isDarkPreset(backgroundColor)
  const resolvedBg = resolveBg(backgroundColor, backgroundColorCustom)

  const bgImageUrl = imgUrl(backgroundImage)
  const sectionStyle: React.CSSProperties =
    isImageMode && bgImageUrl
      ? {
          background: `linear-gradient(180deg, rgba(10,27,46,.55) 0%, rgba(10,27,46,.35) 100%), url('${bgImageUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }
      : { background: resolvedBg }

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setRevealed(true)
      },
      { threshold: 0.12 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const heroPhoto = imgUrl(image)
  const faces = boardFaces?.filter((f) => imgUrl(f?.image)) ?? []
  const hasBoard = faces.length > 0 || boardCopy || boardSubCopy

  return (
    <section
      ref={sectionRef}
      style={sectionStyle}
      className={['yp-hero', grain !== false ? 'grain' : '', isDark ? 'is-dark' : ''].join(' ')}
    >
      <style jsx>{`
        .yp-hero {
          padding: 30px 0 56px;
          min-height: auto;
          display: block;
          position: relative;
          color: #12314d;
        }
        .yp-hero.is-dark {
          color: #ffffff;
        }

        /* grain */
        .grain {
          position: relative;
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

        /* layout */
        .wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
          width: 100%;
        }

        /* reveal-on-scroll */
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

        /* hero grid */
        .hero2 {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 48px;
          align-items: stretch;
        }

        /* heading */
        .hero-head :global(h1),
        .hero-head :global(h2),
        .hero-head :global(p) {
          margin: 18px 0 0;
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          letter-spacing: -0.03em;
          line-height: 1.02;
          font-size: clamp(40px, 5.4vw, 72px);
        }
        .hero-head :global(.teal),
        .hero-head :global(span[style*='color']) {
          color: #0a8fb0;
        }
        .yp-hero.is-dark .hero-head :global(.teal),
        .yp-hero.is-dark .hero-head :global(span[style*='color']) {
          color: #13a6cc;
        }

        /* lede */
        .hero-lede {
          margin-top: 22px;
          max-width: 480px;
          font-size: clamp(16px, 1.4vw, 19px);
          font-weight: 400;
          color: rgba(18, 49, 77, 0.7);
          line-height: 1.6;
        }
        .yp-hero.is-dark .hero-lede {
          color: rgba(255, 255, 255, 0.7);
        }
        .hero-lede :global(p) {
          margin: 0;
        }

        /* cta */
        .hero-cta {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-top: 34px;
          flex-wrap: wrap;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 15px;
          font-weight: 600;
          padding: 15px 28px;
          border-radius: 100px;
          border: 1.5px solid transparent;
          cursor: pointer;
          transition:
            transform 0.18s ease,
            background 0.18s ease,
            box-shadow 0.18s ease,
            border-color 0.18s;
          white-space: nowrap;
        }
        .btn:hover {
          transform: translateY(-1px);
        }
        .btn-cta {
          background: #c6ff5b;
          color: #0e2740 !important;
          font-weight: 700;
        }
        .btn-cta:hover {
          background: #aaea42;
        }
        .btn-link {
          color: #0a8fb0;
          font-weight: 600;
          font-size: 15px;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
        }
        .btn-link .arr {
          transition: transform 0.2s;
        }
        .btn-link:hover .arr {
          transform: translateX(3px);
        }

        /* board strip */
        .hero-board {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-top: 38px;
          padding-top: 26px;
          border-top: 1px solid rgba(18, 49, 77, 0.1);
        }
        .yp-hero.is-dark .hero-board {
          border-top-color: rgba(255, 255, 255, 0.14);
        }
        .hero-board .faces {
          display: flex;
          flex-shrink: 0;
        }
        .hero-board .faces img {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          object-fit: cover;
          object-position: center top;
          border: 2px solid #ffffff;
          margin-left: -12px;
          box-shadow: 0 2px 8px rgba(18, 49, 77, 0.18);
        }
        .hero-board .faces img:first-child {
          margin-left: 0;
        }
        .hero-board .hb-copy {
          font-size: 14px;
          font-weight: 600;
          color: #12314d;
          line-height: 1.3;
        }
        .yp-hero.is-dark .hero-board .hb-copy {
          color: #ffffff;
        }
        .hero-board .hb-copy span {
          display: block;
          font-weight: 400;
          font-size: 12.5px;
          color: rgba(18, 49, 77, 0.55);
          margin-top: 3px;
        }
        .yp-hero.is-dark .hero-board .hb-copy span {
          color: rgba(255, 255, 255, 0.55);
        }

        /* visual */
        .hero-visual {
          position: relative;
          display: flex;
          border-radius: 30px;
          overflow: hidden;
        }
        .hero-visual::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            115deg,
            rgba(10, 27, 46, 0.55) 0%,
            rgba(10, 27, 46, 0.12) 42%,
            transparent 70%
          );
          pointer-events: none;
        }
        .hero-photo {
          width: 100%;
          height: 100%;
          min-height: 600px;
          object-fit: cover;
          object-position: center;
          border-radius: 30px;
          display: block;
          filter: brightness(0.98) saturate(1.05) contrast(1.02);
        }

        @media (max-width: 920px) {
          .hero2 {
            grid-template-columns: 1fr;
            gap: 36px;
          }
        }

        @media (max-width: 640px) {
          .wrap {
            padding: 0 20px;
          }
          .hero-head :global(h1),
          .hero-head :global(h2),
          .hero-head :global(p) {
            font-size: clamp(33px, 9vw, 44px);
          }
          .hero-lede {
            font-size: 15.5px;
          }
          .hero-cta {
            gap: 12px;
          }
          .hero-cta .btn {
            width: 100%;
            text-align: center;
            justify-content: center;
          }
          .hero-photo {
            min-height: 420px;
          }
          .hero-board {
            margin-top: 26px;
          }
        }
      `}</style>

      <div className="wrap">
        <div className={['hero2 reveal', revealed ? 'in' : ''].join(' ')}>
          <div>
            {heading && (
              <div className="hero-head">
                <RichText data={heading as any} enableGutter={false} enableProse={false} />
              </div>
            )}

            {description && (
              <div className="hero-lede">
                <RichText data={description as any} enableGutter={false} enableProse={false} />
              </div>
            )}

            {(primaryButton?.label || secondaryLink?.label) && (
              <div className="hero-cta">
                {primaryButton?.label && (
                  <a
                    href={primaryButton.url || '#'}
                    className="btn btn-cta"
                    style={{ backgroundColor: 'rgb(198, 255, 91)' }}
                  >
                    {primaryButton.label}
                  </a>
                )}
                {secondaryLink?.label && (
                  <a href={secondaryLink.url || '#'} className="btn-link">
                    {secondaryLink.label} <span className="arr">→</span>
                  </a>
                )}
              </div>
            )}

            {hasBoard && (
              <div className="hero-board">
                {faces.length > 0 && (
                  <div className="faces">
                    {faces.map((face, i) => (
                      <img key={i} src={imgUrl(face.image)} alt={imgAlt(face.image)} />
                    ))}
                  </div>
                )}
                {(boardCopy || boardSubCopy) && (
                  <div className="hb-copy">
                    {boardCopy}
                    {boardSubCopy && <span>{boardSubCopy}</span>}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="hero-visual">
            {heroPhoto && <img className="hero-photo" src={heroPhoto} alt={imgAlt(image)} />}
          </div>
        </div>
      </div>
    </section>
  )
}
