'use client'

import React from 'react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import RichText from '@/components/RichText'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type MediaLike = { url?: string | null; alt?: string | null } | string | null | undefined

type TrustFace = {
  image?: MediaLike
  name?: string | null
  affiliation?: string | null
}

export type LabHeroBlockType = {
  blockType?: 'labHero'
  heading?: DefaultTypedEditorState | null
  subheading?: string | null
  ctaLabel?: string | null
  ctaUrl?: string | null
  trustLeadIn?: string | null
  trustFaces?: TrustFace[] | null
  trustLinkLabel?: string | null
  trustLinkUrl?: string | null
}

function imgUrl(img?: MediaLike): string {
  if (!img || typeof img === 'string') return ''
  return img.url ? getMediaUrl(img.url) : ''
}
function imgAlt(img?: MediaLike): string {
  if (!img || typeof img === 'string') return ''
  return img.alt ?? ''
}

function joinNames(faces: TrustFace[]): React.ReactNode {
  return faces.map((f, i) => {
    const isLast = i === faces.length - 1
    const isBeforeLast = i === faces.length - 2
    let separator: string | null = null
    if (!isLast) separator = isBeforeLast ? ' & ' : ', '
    return (
      <React.Fragment key={i}>
        <b>{f.name}</b>
        {f.affiliation ? ` (${f.affiliation})` : ''}
        {separator}
      </React.Fragment>
    )
  })
}

export const LabHeroComponent: React.FC<LabHeroBlockType> = ({
  heading,
  subheading,
  ctaLabel,
  ctaUrl,
  trustLeadIn,
  trustFaces,
  trustLinkLabel,
  trustLinkUrl,
}) => {
  const faces = (trustFaces ?? []).filter((f) => imgUrl(f?.image))
  const hasTrust = faces.length > 0 || trustLeadIn || trustLinkLabel

  return (
    <section className="sci-hero" data-screen-label="Hero">
      <style jsx>{`
        .sci-hero {
          position: relative;
          background: #f7fafc;
          padding: 74px 0 58px;
          overflow: hidden;
        }
        .sci-hero-in {
          position: relative;
          z-index: 1;
          max-width: 840px;
          margin: 0 auto;
          padding: 0 32px;
        }
        .sci-hero-in :global(h1) {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: clamp(32px, 4.2vw, 50px);
          line-height: 1.03;
          letter-spacing: -0.035em;
          color: #12314d;
          text-wrap: balance;
          max-width: 900px;
          margin: 20px 0 0;
        }
        .sci-hero-sub {
          font-size: clamp(17px, 1.9vw, 20px);
          line-height: 1.55;
          color: rgba(18, 49, 77, 0.7);
          margin: 22px 0 0;
          max-width: 560px;
        }
        .sci-hero-cta {
          display: flex;
          gap: 13px;
          margin-top: 34px;
          flex-wrap: wrap;
          align-items: center;
        }
        .btn-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          font-weight: 700;
          padding: 16px 30px;
          border-radius: 100px;
          background: #c6ff5b;
          color: #0e2740;
          text-decoration: none;
          transition:
            background 0.18s ease,
            transform 0.18s ease;
          white-space: nowrap;
        }
        .btn-pill:hover {
          background: #aaea42;
          transform: translateY(-1px);
        }
        .sci-trust {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-top: 46px;
          padding-top: 30px;
          border-top: 1px solid rgba(18, 49, 77, 0.1);
          flex-wrap: wrap;
        }
        .sci-trust-faces {
          display: flex;
          flex: none;
        }
        .sci-trust-faces img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
          object-position: center top;
          border: 2.5px solid #f7fafc;
          margin-left: -13px;
          box-shadow: 0 5px 14px -8px rgba(18, 49, 77, 0.5);
        }
        .sci-trust-faces img:first-child {
          margin-left: 0;
        }
        .sci-trust-txt {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          line-height: 1.55;
          color: rgba(18, 49, 77, 0.55);
          max-width: 438px;
          text-wrap: pretty;
        }
        .sci-trust-txt b {
          color: #12314d;
          font-weight: 600;
        }
        .sci-trust-link {
          color: #0a8fb0;
          font-weight: 600;
          text-decoration: none;
          white-space: nowrap;
        }
        .sci-trust-link:hover {
          text-decoration: underline;
        }
        @media (max-width: 860px) {
          .sci-hero {
            padding: 50px 0 40px;
          }
          .sci-hero-in {
            padding: 0 22px;
          }
        }
        @media (max-width: 680px) {
          .sci-trust {
            gap: 14px;
          }
          .sci-trust-txt {
            font-size: 13.5px;
          }
          .sci-hero-cta {
            width: 100%;
          }
          .sci-hero-cta .btn-pill {
            flex: 1 1 auto;
            justify-content: center;
          }
        }
      `}</style>

      <div className="sci-hero-in">
        {heading && <RichText data={heading as any} enableGutter={false} enableProse={false} />}
        {subheading && <p className="sci-hero-sub">{subheading}</p>}

        {ctaLabel && (
          <div className="sci-hero-cta">
            <a className="btn-pill" href={ctaUrl || '#'}>
              {ctaLabel}
            </a>
          </div>
        )}

        {hasTrust && (
          <div className="sci-trust">
            {faces.length > 0 && (
              <div className="sci-trust-faces">
                {faces.map((f, i) => (
                  <img key={i} src={imgUrl(f.image)} alt={imgAlt(f.image) || f.name || ''} />
                ))}
              </div>
            )}
            <div className="sci-trust-txt">
              {trustLeadIn ? `${trustLeadIn} ` : null}
              {joinNames(faces)}
              {trustLinkLabel && (
                <>
                  {'. '}
                  <a className="sci-trust-link" href={trustLinkUrl || '#board'}>
                    {trustLinkLabel}
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
