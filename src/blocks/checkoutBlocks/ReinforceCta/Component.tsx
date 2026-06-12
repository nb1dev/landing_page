'use client'

import React from 'react'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type AthleteImage = {
  image?: { url?: string | null } | string | null
  alt?: string | null
}

type Seal = {
  boldText?: string | null
  regularText?: string | null
}

type Props = {
  athleteText?: string | null
  athleteImages?: AthleteImage[] | null
  ctaText?: string | null
  ctaHref?: string | null
  ctaText2?: string | null
  ctaHref2?: string | null
  seals?: Seal[] | null
}

export const ReinforceCtaComponent: React.FC<Props> = ({
  athleteText,
  athleteImages,
  ctaText,
  ctaHref,
  ctaText2,
  ctaHref2,
  seals,
}) => {
  const twoBtn = !!(ctaText && ctaText2)

  return (
    <section className="nb1-rc-sec">
      <style jsx>{`
        .nb1-rc-sec {
          padding: 32px 0 40px;
        }
        .nb1-rc-con {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
        /* Athlete reminder */
        .nb1-rc-ath {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: rgba(18, 49, 77, 0.65);
          text-align: center;
        }
        .nb1-rc-faces {
          display: inline-flex;
        }
        .nb1-rc-faces img {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          object-fit: cover;
          object-position: center top;
          border: 2px solid #fff;
          margin-left: -8px;
          box-shadow: 0 1px 3px rgba(18, 49, 77, 0.2);
        }
        .nb1-rc-faces img:first-child { margin-left: 0; }

        /* CTA grid */
        .nb1-rc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          width: 100%;
          max-width: 660px;
        }
        .nb1-rc-grid.single {
          grid-template-columns: 1fr;
          max-width: 660px;
        }
        .nb1-rc-btn {
          display: block;
          text-align: center;
          padding: 16px 24px;
          border-radius: 100px;
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          transition: background 0.18s, color 0.18s;
        }
        .nb1-rc-btn.primary {
          background: #c6ff5b;
          color: #0e2740;
        }
        .nb1-rc-btn.primary:hover { background: #aaea42; }
        .nb1-rc-btn.secondary {
          background: rgba(18, 49, 77, 0.06);
          color: #12314d;
        }
        .nb1-rc-btn.secondary:hover { background: rgba(18, 49, 77, 0.1); }

        /* Trust seals */
        .nb1-rc-seals {
          display: flex;
          gap: 20px;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
        }
        .nb1-rc-seal {
          font-size: 13px;
          color: rgba(18, 49, 77, 0.55);
        }
        .nb1-rc-seal strong {
          font-weight: 600;
          color: rgba(18, 49, 77, 0.75);
        }

        @media (max-width: 560px) {
          .nb1-rc-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="nb1-rc-con">
        {athleteText && (
          <div className="nb1-rc-ath">
            {athleteImages && athleteImages.length > 0 && (
              <span className="nb1-rc-faces">
                {athleteImages.map((a, i) => {
                  const url = typeof a.image === 'object' && a.image?.url ? getMediaUrl(a.image.url) : null
                  return url ? <img key={i} src={url} alt={a.alt || ''} /> : null
                })}
              </span>
            )}
            <span>{athleteText}</span>
          </div>
        )}

        {(ctaText || ctaText2) && (
          <div className={`nb1-rc-grid${twoBtn ? '' : ' single'}`}>
            {ctaText && ctaHref && (
              <a href={ctaHref} className={`nb1-rc-btn ${twoBtn ? 'secondary' : 'primary'}`}>{ctaText}</a>
            )}
            {ctaText2 && ctaHref2 && (
              <a href={ctaHref2} className="nb1-rc-btn primary">{ctaText2}</a>
            )}
          </div>
        )}

        {seals && seals.length > 0 && (
          <div className="nb1-rc-seals">
            {seals.map((s, i) => (
              <span key={i} className="nb1-rc-seal">
                {s.boldText && <strong>{s.boldText}</strong>}
                {s.regularText && <>{s.regularText}</>}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
