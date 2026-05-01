'use client'

import React, { useState, useEffect } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// Inline Lexical richtext renderer
// ─────────────────────────────────────────────────────────────────────────────
const IS_BOLD = 1
const IS_ITALIC = 2
const IS_UNDERLINE = 8

function renderLexicalNode(node: any, key: string): React.ReactNode {
  if (node.type === 'text') {
    const colorMatch = typeof node.style === 'string' ? node.style.match(/color:\s*([^;]+)/) : null
    const color = colorMatch ? colorMatch[1].trim() : undefined

    let el: React.ReactNode = node.text as string

    if (node.format & IS_BOLD) el = <strong key={key}>{el}</strong>
    if (node.format & IS_ITALIC) el = <em key={key}>{el}</em>
    if (node.format & IS_UNDERLINE) el = <u key={key}>{el}</u>

    if (color) {
      el = (
        <span key={key} style={{ color }}>
          {el}
        </span>
      )
    }

    return <React.Fragment key={key}>{el}</React.Fragment>
  }

  if (!node.children?.length) return null

  const children = node.children.map((child: any, i: number) =>
    renderLexicalNode(child, `${key}-${i}`),
  )

  if (node.type === 'paragraph') {
    return <React.Fragment key={key}>{children}</React.Fragment>
  }

  if (node.type === 'root') {
    return <React.Fragment key={key}>{children}</React.Fragment>
  }

  return <React.Fragment key={key}>{children}</React.Fragment>
}

function RichTextInline({ content }: { content: any }): React.ReactElement {
  if (!content?.root) return <></>
  return <>{renderLexicalNode(content.root, 'root')}</>
}

// ─────────────────────────────────────────────────────────────────────────────

type BgColorPreset = 'dark' | 'darkNavy' | 'teal' | 'white' | 'cream' | 'custom'

function resolveBg(preset?: BgColorPreset | null, custom?: string | null): string {
  if (preset === 'darkNavy') return '#0e2640'
  if (preset === 'teal') return '#008498'
  if (preset === 'white') return '#FFFFFF'
  if (preset === 'cream') return 'linear-gradient(180deg,#FAF8F2 0%,#F2EFE7 100%)'
  if (preset === 'custom') return custom || '#12314D'
  return '#12314D'
}

function isDarkBg(preset?: BgColorPreset | null): boolean {
  return !preset || preset === 'dark' || preset === 'darkNavy' || preset === 'teal'
}

export type PriceBreakVariant = {
  variantKey: string
  backgroundColor?: BgColorPreset | null
  backgroundColorCustom?: string | null
  priceNumber?: string | null
  priceUnit?: string | null
  headingLine1?: any | null
  headingLine2?: any | null
}

export type PriceBreakBlockType = {
  blockName?: string
  blockType?: 'priceBreak'
  backgroundColor?: BgColorPreset | null
  backgroundColorCustom?: string | null
  priceNumber: string
  priceUnit?: string | null
  headingLine1?: any | null
  headingLine2?: any | null
  variants?: PriceBreakVariant[] | null
}

// ─── Design tokens ───────────────────────────────────────────────────────────
const TEAL = '#0A8FB0'
const WHITE = '#ffffff'

export const PriceBreakBlockComponent: React.FC<PriceBreakBlockType> = (props) => {
  const {
    backgroundColor,
    backgroundColorCustom,
    priceNumber,
    priceUnit,
    headingLine1,
    headingLine2,
    variants,
  } = props

  const [variantKey, setVariantKey] = useState<string>('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setVariantKey(params.get('v') ?? '')
  }, [])

  const activeVariant = variants?.find((v) => v.variantKey === variantKey) ?? null

  const resolvedBgPreset = activeVariant?.backgroundColor ?? backgroundColor
  const resolvedBgCustom = activeVariant?.backgroundColorCustom ?? backgroundColorCustom
  const resolvedPrice = activeVariant?.priceNumber ?? priceNumber
  const resolvedUnit = activeVariant?.priceUnit ?? priceUnit
  const resolvedLine1 = activeVariant?.headingLine1 ?? headingLine1
  const resolvedLine2 = activeVariant?.headingLine2 ?? headingLine2

  const bg = resolveBg(resolvedBgPreset, resolvedBgCustom)
  const dark = isDarkBg(resolvedBgPreset)

  return (
    <section
      style={{ background: bg, padding: 'clamp(4rem, 6vw, 6rem) 1.5rem' }}
      className={dark ? 'text-white' : 'text-[#12314D]'}
    >
      <div style={{ maxWidth: '1080px', margin: '0 auto', textAlign: 'center' }}>
        {/* Price number */}
        <div
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: 'clamp(3.5rem, 7vw, 5.5rem)',
            fontWeight: 600,
            letterSpacing: '-.04em',
            lineHeight: 1,
            color: TEAL,
            marginBottom: '1.25rem',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {resolvedPrice}
          {resolvedUnit && (
            <span
              style={{
                fontSize: '.42em',
                fontWeight: 500,
                letterSpacing: 0,
                color: TEAL,
                marginLeft: '.05em',
                verticalAlign: 'baseline',
              }}
            >
              /{resolvedUnit}
            </span>
          )}
        </div>

        {/* Heading */}
        {(resolvedLine1 || resolvedLine2) && (
          <h2
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: 'clamp(1.75rem, 3.5vw, 2.8rem)',
              fontWeight: 500,
              letterSpacing: '-.025em',
              lineHeight: 1.25,
              color: dark ? WHITE : '#12314D',
              maxWidth: '880px',
              margin: '0 auto',
            }}
          >
            {resolvedLine1 && <RichTextInline content={resolvedLine1} />}
            {resolvedLine1 && resolvedLine2 && <br />}
            {resolvedLine2 && (
              <span style={{ color: TEAL }}>
                <RichTextInline content={resolvedLine2} />
              </span>
            )}
          </h2>
        )}
      </div>
    </section>
  )
}
