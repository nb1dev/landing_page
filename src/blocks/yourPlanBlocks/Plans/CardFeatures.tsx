'use client'

import React from 'react'
import { useField, useAllFormFields, useLocale } from '@payloadcms/ui'

type Props = { path: string }

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/**
 * Renders one checkbox per Comparison Row (defined under comparison.sections).
 * Checking a box marks that this card (column) includes that row.
 * Stored as a { [rowId]: true } map in the card's `features` json field.
 */
export const CardFeatures: React.FC<Props> = ({ path }) => {
  type TwoLine = { v?: string; sub?: string }
  type CellValue = boolean | string | TwoLine
  const { value, setValue } = useField<Record<string, CellValue>>({ path })
  const [fields] = useAllFormFields()
  const { code: locale } = useLocale()

  // path = ...comparison.cards.<n>.features  →  sectionsBase = ...comparison.sections
  const idx = path.indexOf('.cards.')
  const sectionsBase = idx === -1 ? 'sections' : `${path.slice(0, idx)}.sections`

  const rowRe = new RegExp('^' + esc(sectionsBase) + '\\.(\\d+)\\.rows\\.(\\d+)\\.')
  const pairMap = new Map<string, { s: number; r: number }>()
  Object.keys(fields || {}).forEach((k) => {
    const m = k.match(rowRe)
    if (m) {
      const s = Number(m[1])
      const r = Number(m[2])
      pairMap.set(`${s}:${r}`, { s, r })
    }
  })
  const pairs = Array.from(pairMap.values()).sort((a, b) => a.s - b.s || a.r - b.r)

  const getVal = (p: string): any => (fields as any)?.[p]?.value

  const map = value || {}

  // For checkbox rows the value is shared across locales (true/false).
  // For text rows (oneLine / twoLine) we write to a locale-suffixed key so
  // each language gets its own value without needing a localized JSON field.
  const localeKey = (key: string, cell: string) =>
    cell === 'checkbox' ? key : `${key}__${locale}`

  const getLocaleVal = (key: string, cell: string): CellValue | undefined => {
    const lk = localeKey(key, cell)
    return map[lk] !== undefined ? map[lk] : map[key]
  }

  const setVal = (key: string, cell: string, v: CellValue) => {
    const k = localeKey(key, cell)
    const next = { ...map }
    if (v === false || v === '' || v == null) delete next[k]
    else next[k] = v
    setValue(next)
  }
  const setTwoLine = (key: string, part: 'v' | 'sub', text: string) => {
    const k = localeKey(key, 'twoLine')
    const cur = (typeof map[k] === 'object' && map[k]) || {}
    const merged: TwoLine = { ...(cur as TwoLine), [part]: text }
    const next = { ...map }
    if (!merged.v && !merged.sub) delete next[k]
    else next[k] = merged
    setValue(next)
  }

  const inputStyle: React.CSSProperties = {
    fontSize: 13,
    padding: '6px 10px',
    borderRadius: 4,
    border: '1px solid var(--theme-elevation-150)',
    background: 'var(--theme-input-bg)',
    color: 'var(--theme-elevation-800)',
    width: '100%',
    maxWidth: 320,
  }

  if (pairs.length === 0) {
    return (
      <div className="field-type" style={{ marginBottom: 0 }}>
        <div style={{ fontSize: 13, opacity: 0.6, padding: '4px 0' }}>
          Add Comparison sections and rows first — they will appear here as checkboxes.
        </div>
      </div>
    )
  }

  let lastSection = -1
  return (
    <div className="field-type" style={{ marginBottom: 0 }}>
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          marginBottom: 8,
        }}
      >
        Included rows
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {pairs.map(({ s, r }) => {
          const id = getVal(`${sectionsBase}.${s}.rows.${r}.id`)
          const text = getVal(`${sectionsBase}.${s}.rows.${r}.text`) || `Row ${r + 1}`
          const cell = getVal(`${sectionsBase}.${s}.rows.${r}.cell`) || 'checkbox'
          const sectionTitle = getVal(`${sectionsBase}.${s}.title`) || `Section ${s + 1}`
          const key: string = (id as string) || `${s}:${r}`
          const raw = getLocaleVal(key, cell)
          const two: TwoLine = raw && typeof raw === 'object' ? (raw as TwoLine) : {}
          const showHeader = s !== lastSection
          lastSection = s
          return (
            <React.Fragment key={`${s}:${r}`}>
              {showHeader && (
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    opacity: 0.55,
                    marginTop: s === 0 ? 0 : 6,
                  }}
                >
                  {sectionTitle}
                </div>
              )}
              {cell === 'checkbox' ? (
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    cursor: 'pointer',
                    fontSize: 13,
                    lineHeight: 1.3,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={raw === true}
                    onChange={(e) => setVal(key, cell, e.target.checked)}
                    style={{ width: 15, height: 15, flexShrink: 0, cursor: 'pointer' }}
                  />
                  <span>{text}</span>
                </label>
              ) : cell === 'oneLine' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 13, lineHeight: 1.3 }}>
                    {text}
                    <span style={{ fontSize: 11, opacity: 0.5, marginLeft: 6 }}>({locale})</span>
                  </span>
                  <input
                    type="text"
                    value={typeof raw === 'string' ? raw : ''}
                    onChange={(e) => setVal(key, cell, e.target.value)}
                    placeholder="Value (e.g. On demand)"
                    style={inputStyle}
                  />
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 13, lineHeight: 1.3 }}>
                    {text}
                    <span style={{ fontSize: 11, opacity: 0.5, marginLeft: 6 }}>({locale})</span>
                  </span>
                  <input
                    type="text"
                    value={two.v || ''}
                    onChange={(e) => setTwoLine(key, 'v', e.target.value)}
                    placeholder="Line 1 (e.g. 4-month min)"
                    style={inputStyle}
                  />
                  <input
                    type="text"
                    value={two.sub || ''}
                    onChange={(e) => setTwoLine(key, 'sub', e.target.value)}
                    placeholder="Line 2 (e.g. or €109/mo monthly)"
                    style={inputStyle}
                  />
                </div>
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
