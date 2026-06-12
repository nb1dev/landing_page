'use client'

import React from 'react'

type Seal = {
  type?: 'stars' | 'dot' | null
  rating?: string | null
  label?: string | null
}

type Props = {
  seals?: Seal[] | null
}

export const TrustSealsBarComponent: React.FC<Props> = ({ seals }) => {
  if (!seals?.length) return null

  return (
    <div className="nb1-tsb-sec">
      <style jsx>{`
        .nb1-tsb-sec {
        }
        .nb1-tsb-con {
          max-width: 900px;
          margin: 0 auto;
          padding: 18px 28px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 10px;
          flex-wrap: wrap;
        }
        .nb1-cs-seal {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          color: rgba(18, 49, 77, 0.7);
          border: 1px solid rgba(18, 49, 77, 0.15);
          border-radius: 100px;
          padding: 7px 14px;
        }
        .nb1-cs-seal strong { color: #12314d; font-weight: 600; }
        .nb1-cs-stars { color: #0a8fb0; letter-spacing: 1px; }
        .nb1-cs-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #0a8fb0; flex-shrink: 0;
        }
        @media (max-width: 560px) {
          .nb1-tsb-con { gap: 8px; padding: 14px 20px; }
          .nb1-cs-seal { font-size: 11px; padding: 6px 11px; }
        }
      `}</style>

      <div className="nb1-tsb-con">
        {seals.map((seal, i) => (
          <span key={i} className="nb1-cs-seal">
            {seal.type === 'stars' ? (
              <>
                <span className="nb1-cs-stars">★★★★★</span>
                {seal.rating && <strong>{seal.rating}</strong>}
                {seal.label && <span> · {seal.label}</span>}
              </>
            ) : (
              <>
                <span className="nb1-cs-dot" />
                {seal.label && <span>{seal.label}</span>}
              </>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}
