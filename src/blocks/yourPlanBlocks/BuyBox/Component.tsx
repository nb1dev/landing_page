import React from 'react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { getServerCurrency } from '@/utilities/currency'
import { getPlan, type PlanFamily } from '@/lib/plans/api'
import { formatRate } from '@/lib/plans/format'
import { YpBuyBoxClient } from './Component.client'

type BgColorPreset = 'inkDeep' | 'navyDeep' | 'navy' | 'teal' | 'off' | 'paper' | 'cream' | 'custom'
type BgType = 'color' | 'image'
type MediaLike = { url?: string | null; alt?: string | null } | null

type Option = {
  name?: string | null
  planFamily?: 'core' | 'advanced' | null
  priceSuffix?: string | null
  altLabel?: string | null
  description?: string | null
  ctaLabel?: string | null
  ctaHref?: string | null
  recommended?: boolean | null
  recFlagLabel?: string | null
}

export type YpBuyBoxBlockType = {
  blockType?: 'ypBuyBox'
  backgroundColor?: BgColorPreset | null
  backgroundColorCustom?: string | null
  backgroundType?: BgType | null
  backgroundImage?: MediaLike
  grain?: boolean | null
  heading?: DefaultTypedEditorState | null
  sub?: string | null
  options?: Option[] | null
  buyNote?: string | null
  trust?: { text?: string | null }[] | null
  locale?: string
}

/**
 * Server Component: resolves each option's live 4-month headline price
 * (same anchor rate used across the funnel — see src/lib/plans/api.ts),
 * then hands the merged options to the client UI. altLabel/description/
 * CTAs etc. stay manually edited in Payload.
 */
export const YpBuyBoxComponent: React.FC<YpBuyBoxBlockType> = async (props) => {
  const locale = props.locale || 'en'
  const currency = await getServerCurrency(locale)
  const options = props.options ?? []

  const resolvedOptions = await Promise.all(
    options.map(async (opt) => {
      if (!opt.planFamily) return { ...opt, price: null }
      const family: PlanFamily = opt.planFamily === 'advanced' ? 'Advanced' : 'Core'
      let price: string | null = null
      try {
        const resolved = await getPlan(family, 4, currency)
        if (resolved) price = formatRate(resolved, currency, locale)
      } catch (err) {
        console.error(`[ypBuyBox] failed to load "${family}" plan:`, err)
      }
      return { ...opt, price }
    }),
  )

  return (
    <YpBuyBoxClient
      backgroundColor={props.backgroundColor}
      backgroundColorCustom={props.backgroundColorCustom}
      backgroundType={props.backgroundType}
      backgroundImage={props.backgroundImage}
      grain={props.grain}
      heading={props.heading}
      sub={props.sub}
      options={resolvedOptions}
      buyNote={props.buyNote}
      trust={props.trust}
    />
  )
}
