'use client'

import React, { useRef } from 'react'
import { useReveal } from '@/hooks/useReveal'

type RoadmapItem = {
  title?: string | null
  description?: string | null
  href?: string | null
}

export type LabRoadmapBlockType = {
  blockType?: 'labRoadmap'
  eyebrow?: string | null
  items?: RoadmapItem[] | null
}

const ArrowIcon = () => (
  <svg
    className="toc-arr"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14"></path>
    <path d="M13 6l6 6-6 6"></path>
  </svg>
)

export const LabRoadmapComponent: React.FC<LabRoadmapBlockType> = ({ eyebrow, items }) => {
  const rows = items ?? []
  const sectionRef = useRef<HTMLElement | null>(null)
  useReveal(sectionRef, '.toc-eyebrow, .toc-item')
  if (rows.length === 0) return null

  return (
    <section
      id="toc"
      className="toc"
      data-screen-label="How this page goes"
      style={{ background: '#F7FAFC' }}
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      <style jsx>{`
        .toc {
          padding: 94px 0;
          scroll-margin-top: 80px;
        }
        .toc-wrap {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 32px;
        }
        .toc-eyebrow {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #0a8fb0;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .toc-eyebrow::before {
          content: '';
          width: 30px;
          height: 1.5px;
          background: #0a8fb0;
        }
        .toc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 36px;
          margin-top: 30px;
        }
        .toc-item {
          display: grid;
          grid-template-columns: auto 1fr auto;
          column-gap: 18px;
          row-gap: 6px;
          align-items: start;
          padding: 22px 24px;
          border-radius: 16px;
          border: 1px solid #e7edf3;
          background: transparent;
          text-decoration: none;
          transition:
            background 0.18s ease,
            box-shadow 0.18s ease,
            border-color 0.18s ease;
        }
        .toc-num {
          grid-row: 1;
          grid-column: 1;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 13px;
          font-weight: 600;
          color: #0a8fb0;
          padding-top: 4px;
        }
        .toc-tt {
          grid-row: 1;
          grid-column: 2;
          font-size: 19px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: #12314d;
          transition: color 0.18s ease;
        }
        .toc-item :global(.toc-arr) {
          grid-row: 1;
          grid-column: 3;
          color: #0a8fb0;
          opacity: 0;
          transform: translateX(-5px);
          transition:
            opacity 0.18s ease,
            transform 0.18s ease;
          align-self: center;
        }
        .toc-d {
          grid-row: 2;
          grid-column: 2;
          font-size: 14.5px;
          line-height: 1.5;
          color: rgba(18, 49, 77, 0.6);
        }
        .toc-item:hover {
          background: #fff;
          border-color: #dce6ee;
          box-shadow: 0 18px 44px -26px rgba(18, 49, 77, 0.45);
        }
        .toc-item:hover .toc-tt {
          color: #0a8fb0;
        }
        .toc-item:hover :global(.toc-arr) {
          opacity: 1;
          transform: none;
        }
        @media (max-width: 860px) {
          .toc {
            padding: 64px 0;
          }
          .toc-wrap {
            padding: 0 22px;
          }
        }
        @media (max-width: 760px) {
          .toc-grid {
            grid-template-columns: 1fr;
            gap: 8px;
          }
        }
      `}</style>
      <div className="toc-wrap">
        {eyebrow && <div className="toc-eyebrow">{eyebrow}</div>}
        <div className="toc-grid">
          {rows.map((item, i) => (
            <a key={i} className="toc-item" href={item.href || '#'}>
              <span className="toc-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="toc-tt">{item.title}</span>
              <ArrowIcon />
              {item.description && <span className="toc-d">{item.description}</span>}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
