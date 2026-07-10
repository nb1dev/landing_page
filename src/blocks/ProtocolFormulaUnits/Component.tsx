'use client'

import React, { useRef, useState } from 'react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import RichText from '@/components/RichText'
import { useProtocolReveal } from '@/hooks/useProtocolReveal'

type PartKey = 'activate' | 'restore' | 'nourish'
type UnitIcon = 'capsule' | 'softgel' | 'prebiotic'
type TagVariant = 'strains' | 'fibres' | 'vitamins' | 'actives' | 'cond'

type Chip = { text?: string | null }
type Unit = {
  icon?: UnitIcon | null
  name?: string | null
  tagVariant?: TagVariant | null
  tagLabel?: string | null
  role?: string | null
  count?: string | null
  defaultOpen?: boolean | null
  description?: string | null
  chips?: Chip[] | null
  moreNote?: string | null
  decideText?: string | null
}
type Part = { key?: PartKey | null; label?: string | null; meta?: string | null; units?: Unit[] | null }

export type ProtocolFormulaUnitsBlockType = {
  blockType?: 'protocolFormulaUnits'
  heading?: DefaultTypedEditorState | null
  lede?: string | null
  parts?: Part[] | null
}

const PART_ICONS: Record<PartKey, React.ReactNode> = {
  activate: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
      <circle cx="12" cy="12" r="4.2"></circle>
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l1.8 1.8M17.2 17.2L19 19M19 5l-1.8 1.8M6.8 17.2L5 19"></path>
    </svg>
  ),
  restore: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"></path>
    </svg>
  ),
  nourish: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M11 20A7 7 0 014 13c0-6 5-10 15-10 0 8-4 13-8 13z"></path>
      <path d="M8 17c2-4 5-6 8-7"></path>
    </svg>
  ),
}

const UNIT_ICONS: Record<UnitIcon, React.ReactNode> = {
  capsule: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3" y="8" width="18" height="8" rx="4"></rect>
      <path d="M12 8v8"></path>
    </svg>
  ),
  softgel: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 3s6 6.5 6 11a6 6 0 01-12 0c0-4.5 6-11 6-11z"></path>
    </svg>
  ),
  prebiotic: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M4 13a8 8 0 0116 0z"></path>
      <path d="M4 13h16M12 5v4"></path>
    </svg>
  ),
}

export const ProtocolFormulaUnitsComponent: React.FC<ProtocolFormulaUnitsBlockType> = ({ heading, lede, parts }) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  useProtocolReveal(sectionRef, '[data-rv]')

  const list = parts ?? []
  const [activePart, setActivePart] = useState(0)
  const [openUnit, setOpenUnit] = useState<Record<number, number | null>>(() => {
    const init: Record<number, number | null> = {}
    list.forEach((part, pi) => {
      const idx = (part.units ?? []).findIndex((u) => u.defaultOpen)
      init[pi] = idx >= 0 ? idx : null
    })
    return init
  })

  const toggleUnit = (partIndex: number, unitIndex: number) => {
    setOpenUnit((prev) => ({
      ...prev,
      [partIndex]: prev[partIndex] === unitIndex ? null : unitIndex,
    }))
  }

  return (
    <section className="pfu-sec" id="units" ref={sectionRef}>
      <style jsx>{`
        .pfu-sec {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          position: relative;
          padding: 88px 0 36px;
          background: #f6f9fc;
        }
        .pr-wrap {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 32px;
        }
        .pfu-sec :global(h2) {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: clamp(28px, 3.8vw, 46px);
          line-height: 1.06;
          letter-spacing: -0.025em;
          color: #12314d;
          margin: 0;
          max-width: 20ch;
        }
        .pfu-sec :global(h2 span) {
          color: #0a8fb0;
        }
        .pr-lede {
          font-size: clamp(16px, 1.7vw, 19px);
          line-height: 1.6;
          color: rgba(18, 49, 77, 0.7);
          margin: 18px 0 0;
          max-width: 60ch;
        }

        :global(html.pr-rv-on) .pfu-sec [data-rv] {
          opacity: 0;
          transform: translateY(15px);
        }
        :global(html.pr-rv-on) .pfu-sec [data-rv].in {
          opacity: 1;
          transform: none;
          transition:
            opacity 0.6s cubic-bezier(0.22, 0.61, 0.36, 1),
            transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
        }

        .uf {
          margin-top: 36px;
        }
        .uf-tabs {
          display: inline-flex;
          gap: 4px;
          padding: 5px;
          background: #eef3f8;
          border: 1px solid #e1e9f0;
          border-radius: 100px;
        }
        .uf-tab {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: 15px;
          color: rgba(18, 49, 77, 0.55);
          background: transparent;
          border: none;
          border-radius: 999px;
          padding: 10px 20px;
          cursor: pointer;
          transition:
            background 0.18s,
            color 0.18s,
            box-shadow 0.18s;
        }
        .uf-tab :global(svg) {
          width: 16px;
          height: 16px;
        }
        .uf-tab.on {
          background: #fff;
          color: #12314d;
          box-shadow: 0 2px 8px -2px rgba(18, 49, 77, 0.22);
        }
        .uf-meta {
          font-size: 14px;
          color: rgba(18, 49, 77, 0.55);
          margin: 22px 0 2px;
        }
        .uf-part {
          display: none;
        }
        .uf-part.on {
          display: block;
          animation: ufin 0.34s cubic-bezier(0.22, 1, 0.36, 1);
        }
        @keyframes ufin {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        .uf-parthead {
          display: none;
        }
        .uf-units {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 14px;
        }
        .uf-unit {
          border: 1px solid #e4ebf1;
          border-radius: 16px;
          background: #fff;
          overflow: hidden;
          transition:
            border-color 0.16s,
            box-shadow 0.16s;
        }
        .uf-unit.open {
          border-color: rgba(10, 143, 176, 0.32);
          box-shadow: 0 18px 44px -32px rgba(14, 39, 56, 0.55);
        }
        .uf-uhead {
          width: 100%;
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 16px;
          align-items: center;
          padding: 19px 22px;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          font: inherit;
        }
        .uf-uicon {
          width: 40px;
          height: 40px;
          border-radius: 11px;
          background: rgba(10, 143, 176, 0.08);
          color: #0a8fb0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: none;
        }
        .uf-uicon :global(svg) {
          width: 21px;
          height: 21px;
        }
        .uf-uname {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: 17.5px;
          letter-spacing: -0.01em;
          color: #12314d;
        }
        .uf-tag {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.01em;
          line-height: 1.35;
          border-radius: 999px;
          padding: 3px 10px;
          white-space: nowrap;
        }
        .uf-tag.strains {
          background: rgba(10, 143, 176, 0.12);
          color: #0a7e9c;
        }
        .uf-tag.fibres {
          background: rgba(47, 125, 99, 0.14);
          color: #2c7359;
        }
        .uf-tag.vitamins {
          background: rgba(176, 132, 47, 0.15);
          color: #8a6420;
        }
        .uf-tag.actives {
          background: rgba(106, 93, 179, 0.13);
          color: #584aa0;
        }
        .uf-tag.cond {
          background: transparent;
          border: 1px solid rgba(10, 143, 176, 0.35);
          color: #0a8fb0;
          font-family: ui-monospace, Menlo, monospace;
          font-size: 10px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 2px 9px;
        }
        .uf-urole {
          display: block;
          font-size: 13.5px;
          color: rgba(18, 49, 77, 0.55);
          margin-top: 3px;
          line-height: 1.4;
        }
        .uf-uright {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .uf-ucount {
          font-family: ui-monospace, Menlo, monospace;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: rgba(18, 49, 77, 0.45);
          white-space: nowrap;
        }
        .uf-uchev {
          color: rgba(18, 49, 77, 0.45);
          transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
          flex: none;
        }
        .uf-unit.open .uf-uchev {
          transform: rotate(180deg);
        }
        .uf-ubody {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .uf-unit.open .uf-ubody {
          grid-template-rows: 1fr;
        }
        .uf-ubody-in {
          overflow: hidden;
        }
        .uf-ubody-pad {
          padding: 2px 22px 22px 78px;
        }
        .uf-udesc {
          font-size: 14px;
          line-height: 1.6;
          color: rgba(18, 49, 77, 0.7);
          margin: 0 0 14px;
          max-width: 64ch;
        }
        .uf-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
        }
        .uf-chip {
          font-size: 12.5px;
          font-weight: 500;
          color: rgba(18, 49, 77, 0.7);
          background: #f6f9fc;
          border: 1px solid #e9eff4;
          border-radius: 8px;
          padding: 6px 11px;
        }
        .uf-more {
          font-size: 12.5px;
          color: rgba(18, 49, 77, 0.45);
          padding: 2px 4px;
        }
        .uf-decide {
          margin-top: 15px;
          font-size: 13px;
          color: #0a8fb0;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .uf-decide::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #0a8fb0;
          flex: none;
        }

        @media (max-width: 760px) {
          .uf-tabs {
            display: none !important;
          }
          .uf-part {
            display: block !important;
            margin-top: 38px;
            animation: none !important;
          }
          .uf-part:first-of-type {
            margin-top: 20px;
          }
          .uf-parthead {
            display: flex;
            align-items: center;
            gap: 11px;
            font-family: 'Instrument Sans', 'Inter', sans-serif;
            font-weight: 600;
            font-size: 20px;
            letter-spacing: -0.01em;
            color: #12314d;
            margin-bottom: 4px;
          }
          .uf-ph-ic {
            width: 30px;
            height: 30px;
            border-radius: 9px;
            background: rgba(10, 143, 176, 0.08);
            color: #0a8fb0;
            display: flex;
            align-items: center;
            justify-content: center;
            flex: none;
          }
          .uf-ph-ic :global(svg) {
            width: 16px;
            height: 16px;
          }
          .uf-meta {
            margin-top: 0;
          }
          .uf-uhead {
            padding: 16px;
            gap: 13px;
          }
          .uf-uname {
            font-size: 16px;
          }
          .uf-ubody-pad {
            padding: 2px 16px 18px 16px;
          }
          .uf-ucount {
            display: none;
          }
        }
      `}</style>

      <div className="pr-wrap">
        {heading && (
          <div data-rv="">
            <RichText data={heading as any} enableGutter={false} enableProse={false} />
          </div>
        )}
        {lede && (
          <p className="pr-lede" data-rv="">
            {lede}
          </p>
        )}

        <div className="uf" data-rv="">
          <div className="uf-tabs" role="tablist" aria-label="Protocol parts">
            {list.map((part, pi) => (
              <button
                key={pi}
                className={['uf-tab', pi === activePart ? 'on' : ''].join(' ')}
                onClick={() => setActivePart(pi)}
              >
                {PART_ICONS[part.key || 'activate']}
                {part.label}
              </button>
            ))}
          </div>

          {list.map((part, pi) => (
            <div className={['uf-part', pi === activePart ? 'on' : ''].join(' ')} key={pi}>
              <div className="uf-parthead">
                <span className="uf-ph-ic">{PART_ICONS[part.key || 'activate']}</span>
                {part.label}
              </div>
              <p className="uf-meta">{part.meta}</p>
              <div className="uf-units">
                {(part.units ?? []).map((unit, ui) => {
                  const isOpen = openUnit[pi] === ui
                  return (
                    <div className={['uf-unit', isOpen ? 'open' : ''].join(' ')} key={ui}>
                      <button className="uf-uhead" aria-expanded={isOpen} onClick={() => toggleUnit(pi, ui)}>
                        <span className="uf-uicon">{UNIT_ICONS[unit.icon || 'capsule']}</span>
                        <span className="uf-utext">
                          <span className="uf-uname">
                            {unit.name} <span className={`uf-tag ${unit.tagVariant || 'strains'}`}>{unit.tagLabel}</span>
                          </span>
                          <span className="uf-urole">{unit.role}</span>
                        </span>
                        <span className="uf-uright">
                          <span className="uf-ucount">{unit.count}</span>
                          <svg
                            className="uf-uchev"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6"></path>
                          </svg>
                        </span>
                      </button>
                      <div className="uf-ubody">
                        <div className="uf-ubody-in">
                          <div className="uf-ubody-pad">
                            <p className="uf-udesc">{unit.description}</p>
                            <div className="uf-chips">
                              {(unit.chips ?? []).map((chip, ci) => (
                                <span className="uf-chip" key={ci}>
                                  {chip.text}
                                </span>
                              ))}
                              {unit.moreNote && <span className="uf-more">{unit.moreNote}</span>}
                            </div>
                            <span className="uf-decide">{unit.decideText}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
