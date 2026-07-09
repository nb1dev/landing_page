'use client'

import React from 'react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import RichText from '@/components/RichText'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type MediaLike = { url?: string | null; alt?: string | null } | string | null | undefined

export type LabBandBlockType = {
  blockType?: 'labBand'
  image?: MediaLike
  heading?: DefaultTypedEditorState | null
}

function imgUrl(img?: MediaLike): string {
  if (!img || typeof img === 'string') return ''
  return img.url ? getMediaUrl(img.url) : ''
}
function imgAlt(img?: MediaLike): string {
  if (!img || typeof img === 'string') return ''
  return img.alt ?? ''
}

export const LabBandComponent: React.FC<LabBandBlockType> = ({ image, heading }) => {
  const src = imgUrl(image)

  return (
    <section className="sci-band" data-screen-label="In the lab">
      <style jsx>{`
        .sci-band {
          position: relative;
          min-height: 440px;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: #0a1a2b;
        }
        .sci-band-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center right;
        }
        .sci-band::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(8, 20, 33, 0.93) 0%,
            rgba(8, 20, 33, 0.62) 42%,
            rgba(8, 20, 33, 0) 76%
          );
        }
        .sci-band-in {
          position: relative;
          z-index: 2;
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 32px;
          width: 100%;
        }
        .sci-band-in :global(h2) {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: clamp(30px, 4vw, 46px);
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #fff;
          max-width: 560px;
          text-wrap: balance;
          margin: 0;
        }
        .sci-band-in :global(em) {
          font-style: normal;
          color: #13a6cc;
        }
        @media (max-width: 860px) {
          .sci-band {
            min-height: 330px;
          }
          .sci-band::after {
            background: linear-gradient(
              90deg,
              rgba(8, 20, 33, 0.95) 0%,
              rgba(8, 20, 33, 0.82) 55%,
              rgba(8, 20, 33, 0.45) 100%
            );
          }
        }
      `}</style>
      {src && <img className="sci-band-img" src={src} alt={imgAlt(image)} />}
      <div className="sci-band-in">
        {heading && <RichText data={heading as any} enableGutter={false} enableProse={false} />}
      </div>
    </section>
  )
}
