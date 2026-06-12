'use client'

import React from 'react'
import { useReveal } from '../useReveal'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import RichText from '@/components/RichText'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type MediaLike = { url?: string | null; alt?: string | null }

type FormulaComponent = {
  name?: string | null
  icon?: 'sun' | 'moon' | 'shield' | null
  timing?: string | null
  description?: string | null
}

type Props = {
  sectionTitle?: SerializedEditorState | null
  kitImage?: MediaLike | string | null
  kitImageAlt?: string | null
  components?: FormulaComponent[] | null
}

const svgProps = { width: 15, height: 15, fill: 'none' as const, stroke: '#0a8fb0', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true as const, style: { flexShrink: 0 } }

const SunIcon = () => (
  <svg viewBox="0 0 24 24" {...svgProps}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
)

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" {...svgProps}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
)

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" {...svgProps}>
    <path d="M12 22c5-2 8-6 8-12V4l-8 2-8-2v6c0 6 3 10 8 12z" />
    <path d="M12 8v9" />
  </svg>
)

const ICONS: Record<string, React.ReactNode> = {
  sun: <SunIcon />,
  moon: <MoonIcon />,
  shield: <ShieldIcon />,
}

function getImgUrl(img?: MediaLike | string | null): string {
  if (!img || typeof img === 'string') return ''
  return img.url ? getMediaUrl(img.url) : ''
}

export const FormulaKitComponent: React.FC<Props> = ({
  sectionTitle,
  kitImage,
  kitImageAlt,
  components,
}) => {
  const { ref, revealed } = useReveal()

  const imgUrl = getImgUrl(kitImage)
  const imgAlt = kitImageAlt || (typeof kitImage === 'object' && kitImage?.alt) || ''

  return (
    <section ref={ref} className={`nb1-fk-sec${revealed ? ' nb1-in' : ''}`}>
      <style jsx>{`
        .nb1-fk-sec {
          padding: 56px 0;
          position: relative;
          border-top: 1px solid rgba(18, 49, 77, 0.07);
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .nb1-fk-sec.nb1-in {
          opacity: 1;
          transform: translateY(0);
        }
        .nb1-fk-sec::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100vw;
          background: #f1f4f7;
          z-index: 0;
        }
        .nb1-fk-inner {
          position: relative;
          z-index: 1;
          max-width: 900px;
          margin: 0 auto;
          padding: 0 28px;
        }
        .nb1-fk-head {
          margin-bottom: 24px;
        }
        .nb1-fk-title,
        .nb1-fk-title :global(p) {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: clamp(22px, 2.4vw, 30px);
          letter-spacing: -0.02em;
          color: #12314d;
          margin: 0;
        }
        .nb1-fk-title :global(strong) {
          font-weight: inherit;
          color: #0a8fb0;
        }

        .nb1-cp-unit {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          margin-top: 24px;
          background: radial-gradient(110% 90% at 100% 0%, rgba(10, 143, 176, 0.06) 0%, transparent 50%),
            linear-gradient(168deg, rgba(255, 255, 255, 0.82) 0%, rgba(244, 249, 251, 0.74) 100%);
          backdrop-filter: blur(16px) saturate(125%);
          border: 1px solid rgba(18, 49, 77, 0.1);
          border-radius: 30px;
          overflow: hidden;
          box-shadow: 0 30px 70px -44px rgba(18, 49, 77, 0.4);
        }
        .nb1-cp-visual {
          background: transparent;
          padding: 34px 34px 34px 38px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nb1-cp-visual img {
          width: 100%;
          height: auto;
          object-fit: contain;
          transform: perspective(1100px) rotateX(9deg) rotateZ(-3deg);
          transform-origin: center;
          filter: drop-shadow(0 34px 44px rgba(12, 30, 52, 0.3)) drop-shadow(0 10px 16px rgba(12, 30, 52, 0.18));
          display: block;
        }
        .nb1-cp-right {
          padding: 38px 38px 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .nb1-formula {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }
        .nb1-ofg-h {
          display: flex;
          align-items: center;
          gap: 9px;
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: 16px;
          color: #12314d;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(18, 49, 77, 0.1);
          margin-bottom: 4px;
        }
        .nb1-ofg-h svg {
          width: 15px;
          height: 15px;
          color: #0a8fb0;
          flex-shrink: 0;
        }
        .nb1-ofg-when {
          margin-left: auto;
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-size: 10.5px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(18, 49, 77, 0.4);
        }
        .nb1-ofg-desc {
          font-size: 14.5px;
          color: rgba(18, 49, 77, 0.7);
          line-height: 1.5;
          margin-top: 8px;
        }

        @media (max-width: 860px) {
          .nb1-cp-unit {
            grid-template-columns: 1fr;
          }
          .nb1-cp-right {
            padding: 28px 24px 26px;
          }
        }
      `}</style>

      <div className="nb1-fk-inner">
        {sectionTitle && (
          <div className="nb1-fk-head">
            <div className="nb1-fk-title">
              <RichText data={sectionTitle} enableGutter={false} enableProse={false} />
            </div>
          </div>
        )}

        <div className="nb1-cp-unit">
          <div className="nb1-cp-visual">
            {imgUrl && <img src={imgUrl} alt={imgAlt} loading="lazy" />}
          </div>

          <div className="nb1-cp-right">
            <div className="nb1-formula">
              {components?.map((comp, i) => (
                <div key={i}>
                  <div className="nb1-ofg-h">
                    {comp.icon && ICONS[comp.icon]}
                    {comp.name}
                    {comp.timing && <span className="nb1-ofg-when">{comp.timing}</span>}
                  </div>
                  {comp.description && <p className="nb1-ofg-desc">{comp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
