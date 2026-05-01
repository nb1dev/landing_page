'use client'

import React, { useEffect, useState } from 'react'

type BgColorPreset = 'dark' | 'darkNavy' | 'teal' | 'white' | 'cream' | 'custom'

type Variant = {
  variantKey: string
  backgroundColor?: BgColorPreset | null
  backgroundColorCustom?: string | null
  statNumber?: string | null
  statSuffix?: string | null
  headingLine1?: string | null
  headingLine2?: string | null
  highlightedWord?: string | null
  headingAfter?: string | null
}

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

export type StatBreakBlockType = {
  blockType?: 'statBreak'
  backgroundColor?: BgColorPreset | null
  backgroundColorCustom?: string | null
  statNumber?: string | null
  statSuffix?: string | null
  headingLine1?: string | null
  headingLine2?: string | null
  highlightedWord?: string | null
  headingAfter?: string | null
  variants?: Variant[] | null
}

export const StatBreakComponent: React.FC<StatBreakBlockType> = ({
  backgroundColor,
  backgroundColorCustom,
  statNumber,
  statSuffix,
  headingLine1,
  headingLine2,
  highlightedWord,
  headingAfter,
  variants,
}) => {
  const [variantKey, setVariantKey] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setVariantKey(params.get('v') ?? '')
  }, [])

  const activeVariant = variants?.find((variant) => variant.variantKey === variantKey) ?? null

  const effectiveBgPreset = activeVariant?.backgroundColor ?? backgroundColor
  const effectiveBgCustom = activeVariant?.backgroundColorCustom ?? backgroundColorCustom
  const effectiveStatNumber = activeVariant?.statNumber ?? statNumber
  const effectiveStatSuffix = activeVariant?.statSuffix ?? statSuffix
  const effectiveHeadingLine1 = activeVariant?.headingLine1 ?? headingLine1
  const effectiveHeadingLine2 = activeVariant?.headingLine2 ?? headingLine2
  const effectiveHighlightedWord = activeVariant?.highlightedWord ?? highlightedWord
  const effectiveHeadingAfter = activeVariant?.headingAfter ?? headingAfter

  const bg = resolveBg(effectiveBgPreset, effectiveBgCustom)
  const dark = isDarkBg(effectiveBgPreset)

  if (!effectiveStatNumber) return null

  return (
    <section
      style={{ background: bg }}
      className={[
        'px-5 py-16 md:px-6 md:py-24',
        dark ? 'text-white' : 'text-[#12314D]',
        effectiveBgPreset === 'cream' ? 'border-y border-[rgba(18,49,77,0.08)]' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="mx-auto max-w-[1080px] text-center">
        {/* Stat number */}
        <div className="mb-5 font-['Instrument_Sans'] text-[clamp(3.5rem,7vw,5.5rem)] font-semibold leading-none tracking-[-0.04em] text-[#0A8FB0] [font-variant-numeric:tabular-nums]">
          {effectiveStatNumber}
          {effectiveStatSuffix && (
            <span className="ml-[0.05em] align-baseline text-[0.62em] font-semibold tracking-[-0.02em]">
              {effectiveStatSuffix}
            </span>
          )}
        </div>

        {/* Heading */}
        <h2
          className={[
            "mx-auto max-w-[880px] font-['Instrument_Sans'] text-[clamp(1.75rem,3.5vw,2.8rem)] font-medium leading-[1.25] tracking-[-0.025em]",
            dark ? 'text-white' : 'text-[#12314D]',
          ].join(' ')}
        >
          {effectiveHeadingLine1}
          {effectiveHeadingLine1 && (effectiveHeadingLine2 || effectiveHighlightedWord) && <br />}
          {effectiveHeadingLine2 && `${effectiveHeadingLine2} `}
          {effectiveHighlightedWord && (
            <span className="inline-block align-baseline font-['Instrument_Sans'] text-[1.5em] font-bold leading-[0.95] tracking-[-0.04em] text-[#0A8FB0] md:text-[1.65em]">
              {effectiveHighlightedWord}
            </span>
          )}
          {effectiveHeadingAfter}
        </h2>
      </div>
    </section>
  )
}
