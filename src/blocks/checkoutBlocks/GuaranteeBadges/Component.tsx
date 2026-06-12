'use client'

import React from 'react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import RichText from '@/components/RichText'

type Item = { text?: SerializedEditorState | null }

type Props = {
  items?: Item[] | null
}

const CheckIcon = () => (
  <svg
    viewBox="0 0 16 16"
    width="16" height="16"
    fill="none"
    stroke="#0a8fb0"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0 }}
    aria-hidden="true"
  >
    <path d="M3 8l3 3 7-7" />
  </svg>
)

export const GuaranteeBadgesComponent: React.FC<Props> = ({ items }) => {
  if (!items || items.length === 0) return null

  return (
    <div className="nb1-gb-sec">
      <style jsx>{`
        .nb1-gb-sec {
          padding: 56px 0;
          border-top: 1px solid rgba(18, 49, 77, 0.07);
        }
        .nb1-gb-con {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 28px;
        }
        .nb1-gb-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          padding: 16px 20px;
          background: rgba(10, 143, 176, 0.06);
          border-radius: 12px;
          flex-wrap: wrap;
        }
        .nb1-gb-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13.5px;
          color: rgba(18, 49, 77, 0.7);
        }
        .nb1-gb-text,
        .nb1-gb-text :global(p) {
          margin: 0;
          font-size: 13.5px;
          color: rgba(18, 49, 77, 0.7);
          line-height: 1.4;
        }
        .nb1-gb-text :global(strong) {
          color: #12314d;
          font-weight: 600;
        }
        .nb1-gb-div {
          width: 1px;
          height: 22px;
          background: rgba(18, 49, 77, 0.1);
          flex-shrink: 0;
        }
        @media (max-width: 560px) {
          .nb1-gb-sec { padding: 40px 0; }
          .nb1-gb-con { padding: 0 20px; }
          .nb1-gb-wrap { gap: 12px 16px; }
          .nb1-gb-div { display: none; }
        }
      `}</style>

      <div className="nb1-gb-con">
        <div className="nb1-gb-wrap">
          {items.map((item, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div className="nb1-gb-div" />}
              <div className="nb1-gb-item">
                <CheckIcon />
                {item.text && (
                  <div className="nb1-gb-text">
                    <RichText data={item.text} enableGutter={false} enableProse={false} />
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}
