import React from 'react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { getServerCurrency, type CurrencyCode } from '@/utilities/currency'
import { getPlan, type PlanFamily } from '@/lib/plans/api'
import { formatRate } from '@/lib/plans/format'
import { getDictionary } from '@/i18n/getDictionary'
import { YpPlansClient } from './Component.client'

type BgColorPreset = 'cream' | 'paper' | 'off' | 'navy' | 'navyDeep' | 'teal' | 'custom'
type BgType = 'color' | 'image'
type MediaLike = { url?: string | null; alt?: string | null } | null

type PlanCard = {
  featured?: boolean | null
  badge?: string | null
  name?: string | null
  tag?: string | null
  planFamily?: 'core' | 'advanced' | null
  monthly?: string | null
  commit?: string | null
  listLabel?: string | null
  listItems?: { text?: string | null }[] | null
  ctaLabel?: string | null
  ctaUrl?: string | null
  ctaStyle?: 'out' | 'cta' | null
}

type CellValue = boolean | string | { v?: string | null; sub?: string | null }

type CompareRow = {
  id?: string | null
  text?: string | null
  cell?: 'checkbox' | 'oneLine' | 'twoLine' | null
}

type CompareSection = {
  id?: string | null
  title?: string | null
  rows?: CompareRow[] | null
}

type CompareCard = {
  id?: string | null
  label?: string | null
  planFamily?: 'core' | 'advanced' | null
  highlight?: boolean | null
  features?: Record<string, CellValue> | null
  ctaLabel?: string | null
  ctaUrl?: string | null
  ctaStyle?: 'out' | 'lime' | null
}

type Comparison = {
  toggleLabelClosed?: string | null
  toggleLabelOpen?: string | null
  sections?: CompareSection[] | null
  cards?: CompareCard[] | null
}

type GuaranteeItem = {
  icon?: 'clock' | 'cycle' | 'capsule' | 'none' | null
  title?: string | null
  body?: string | null
}

export type YpPlansBlockType = {
  blockType?: 'ypPlans'
  backgroundColor?: BgColorPreset | null
  backgroundColorCustom?: string | null
  backgroundType?: BgType | null
  backgroundImage?: MediaLike
  grain?: boolean | null
  eyebrow?: string | null
  heading?: DefaultTypedEditorState | null
  lede?: DefaultTypedEditorState | null
  planCards?: PlanCard[] | null
  showComparison?: boolean | null
  comparison?: Comparison | null
  guaranteeItems?: GuaranteeItem[] | null
  locale?: string
}

async function resolvePrice(
  family: 'core' | 'advanced' | null | undefined,
  currency: CurrencyCode,
  locale: string,
): Promise<{ price: string | null; pricePeriod: string | null }> {
  if (!family) return { price: null, pricePeriod: null }
  const apiFamily: PlanFamily = family === 'advanced' ? 'Advanced' : 'Core'
  try {
    const resolved = await getPlan(apiFamily, 4, currency)
    if (!resolved) return { price: null, pricePeriod: null }
    return {
      price: formatRate(resolved, currency, locale),
      pricePeriod: getDictionary(locale).plans.perMonth,
    }
  } catch (err) {
    console.error(`[ypPlans] failed to load "${apiFamily}" plan:`, err)
    return { price: null, pricePeriod: null }
  }
}

/**
 * Server Component: resolves the live 4-month headline price for every
 * plan card AND every comparison-table column, then hands the merged data
 * to the client UI. `features` (the curated checkmark grid) stays fully
 * manual in Payload — it's editorial content, not pricing.
 */
export const YpPlansComponent: React.FC<YpPlansBlockType> = async (props) => {
  const locale = props.locale || 'en'
  const currency = await getServerCurrency(locale)
  const planCards = props.planCards ?? []
  const compareCards = props.comparison?.cards ?? []

  const [resolvedCards, resolvedCompareCards] = await Promise.all([
    Promise.all(
      planCards.map(async (card) => ({
        ...card,
        ...(await resolvePrice(card.planFamily, currency, locale)),
      })),
    ),
    Promise.all(
      compareCards.map(async (card) => ({
        ...card,
        ...(await resolvePrice(card.planFamily, currency, locale)),
      })),
    ),
  ])

  return (
    <YpPlansClient
      backgroundColor={props.backgroundColor}
      backgroundColorCustom={props.backgroundColorCustom}
      backgroundType={props.backgroundType}
      backgroundImage={props.backgroundImage}
      grain={props.grain}
      eyebrow={props.eyebrow}
      heading={props.heading}
      lede={props.lede}
      planCards={resolvedCards}
      showComparison={props.showComparison}
      comparison={
        props.comparison ? { ...props.comparison, cards: resolvedCompareCards } : props.comparison
      }
      guaranteeItems={props.guaranteeItems}
    />
  )
}
