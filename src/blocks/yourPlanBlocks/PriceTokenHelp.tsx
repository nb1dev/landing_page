'use client'

import React from 'react'

/**
 * Read-only admin cheat-sheet (rendered via a `ui` field) listing the
 * available live-price tokens. Mirrors the reference in
 * src/lib/plans/priceTokens.ts so editors can see them without leaving Payload.
 */
const TOKENS: Array<[string, string]> = [
  ['{{price:core:1}}', 'Core — monthly / flexible (1-month)'],
  ['{{price:core:4}}', 'Core — 4-month cycle'],
  ['{{price:core:8}}', 'Core — 8-month cycle'],
  ['{{price:core:12}}', 'Core — 12-month cycle'],
  ['{{price:advanced:1}}', 'Advanced — monthly / flexible (1-month)'],
  ['{{price:advanced:4}}', 'Advanced — 4-month cycle'],
  ['{{price:advanced:8}}', 'Advanced — 8-month cycle'],
  ['{{price:advanced:12}}', 'Advanced — 12-month cycle'],
]

export const PriceTokenHelp: React.FC = () => {
  return (
    <div
      className="field-type"
      style={{
        marginBottom: 0,
        border: '1px solid var(--theme-elevation-150)',
        borderRadius: 6,
        padding: '14px 16px',
        background: 'var(--theme-elevation-50)',
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
        Live-price tokens
      </div>
      <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 10, lineHeight: 1.5 }}>
        Type a token anywhere in a text/answer field; it’s replaced at render
        time with the live rate in the visitor’s currency. Example:{' '}
        <code style={{ fontSize: 12 }}>or {'{{price:core:1}}'}/mo · cancel anytime</code>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'max-content 1fr', gap: '5px 14px' }}>
        {TOKENS.map(([token, label]) => (
          <React.Fragment key={token}>
            <code
              style={{
                fontSize: 12,
                fontFamily: 'var(--font-mono, monospace)',
                color: 'var(--theme-success-600, #0a8fb0)',
                whiteSpace: 'nowrap',
              }}
            >
              {token}
            </code>
            <span style={{ fontSize: 12, opacity: 0.8 }}>{label}</span>
          </React.Fragment>
        ))}
      </div>
      <div style={{ fontSize: 11, opacity: 0.55, marginTop: 10, lineHeight: 1.5 }}>
        family = core | advanced (case-insensitive). Any month the plans API
        returns also works. An unknown token renders as empty text.
      </div>
    </div>
  )
}
