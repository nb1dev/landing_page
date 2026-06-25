'use client'

import React, { useEffect, useRef, useState } from 'react'

type Item = {
  iconSvg?: string | null
  title?: string | null
  description?: string | null
}

type Props = {
  items?: Item[] | null
}

export const StandardsComponent: React.FC<Props> = ({ items }) => {
  const secRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = secRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  if (!items || items.length === 0) return null

  return (
    <>
      <style jsx>{`
        .std-wrap {
          background: #FFFFFF;
          padding: 48px 30px;
        }
        @media (max-width: 760px) { .std-wrap { padding: 32px 20px; } }

        .std-in {
          max-width: 920px;
          margin: 0 auto;
        }

        .std-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        @media (max-width: 760px) { .std-row { grid-template-columns: 1fr; } }

        .std-item {
          background: #FFFFFF;
          border: 1px solid rgba(18,49,77,.10);
          border-radius: 16px;
          padding: 24px 22px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity .6s cubic-bezier(.4,0,.2,1), transform .6s cubic-bezier(.4,0,.2,1);
        }
        .std-item.in { opacity: 1; transform: none; }
        @media (prefers-reduced-motion: reduce) { .std-item { opacity: 1; transform: none; transition: none; } }

        .std-ic {
          width: 40px; height: 40px;
          border-radius: 11px;
          background: rgba(10,143,176,.10);
          color: #0A8FB0;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px;
        }
        .std-ic :global(svg) { width: 20px; height: 20px; }

        .std-title {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: 16px;
          letter-spacing: -0.01em;
          color: #12314D;
          display: block;
        }
        .std-desc {
          font-size: 13px;
          line-height: 1.5;
          color: rgba(18,49,77,.70);
          margin-top: 6px;
        }
      `}</style>

      <section ref={secRef} className="std-wrap" data-screen-label="Standards">
        <div className="std-in">
          <div className="std-row">
            {items.map((item, i) => (
              <div
                key={i}
                className={`std-item${visible ? ' in' : ''}`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                {item.iconSvg && (
                  <div
                    className="std-ic"
                    dangerouslySetInnerHTML={{ __html: item.iconSvg }}
                  />
                )}
                {item.title && <b className="std-title">{item.title}</b>}
                {item.description && <p className="std-desc">{item.description}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
