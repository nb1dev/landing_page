import React from 'react'
import { getServerCurrency } from '@/utilities/currency'
import { getPlan } from '@/lib/plans/api'
import { formatRate } from '@/lib/plans/format'
import { resolvePriceTokens, resolvePriceTokensDeep } from '@/lib/plans/priceTokens'
import { PlansClient } from './Component.client'

type FeatureItem = { item?: string | null }
type Guarantee = { iconSvg?: string | null; title?: string | null; description?: string | null }

type Props = {
  heading?: any
  lede?: string | null
  coreLabel?: string | null
  coreDesc?: string | null
  coreMonthly?: string | null
  coreCommit?: string | null
  coreFeaturesLabel?: string | null
  coreFeatures?: FeatureItem[] | null
  coreCtaLabel?: string | null
  coreCtaHref?: string | null
  advBadge?: string | null
  advLabel?: string | null
  advDesc?: string | null
  advCommit?: string | null
  advFeaturesLabel?: string | null
  advFeatures?: FeatureItem[] | null
  advCtaLabel?: string | null
  advCtaHref?: string | null
  guarantees?: Guarantee[] | null
  compareRowsJson?: string | null
  locale?: string
}

/**
 * Server Component: resolves Core & Advanced's live 4-month headline prices
 * (the same anchor rate used across the rest of the funnel — see
 * src/lib/plans/api.ts), then hands them to the client UI alongside the
 * untouched editorial copy (descriptions, features, guarantees, CTAs).
 * Core/Advanced are implicit here (separate field groups), so there's no
 * planFamily selector to add — both are always fetched.
 */
export const PlansComponent: React.FC<Props> = async (props) => {
  const locale = props.locale || 'en'
  const currency = await getServerCurrency(locale)

  let corePrice: string | null = null
  let advPrice: string | null = null
  try {
    const [core, advanced] = await Promise.all([
      getPlan('Core', 4, currency),
      getPlan('Advanced', 4, currency),
    ])
    if (core) corePrice = formatRate(core, currency, locale)
    if (advanced) advPrice = formatRate(advanced, currency, locale)
  } catch (err) {
    console.error('[plansSection] failed to load plans:', err)
  }

  const [coreMonthly, coreCommit, advCommit, compareRowsJson] = await Promise.all([
    resolvePriceTokens(props.coreMonthly, currency, locale),
    resolvePriceTokens(props.coreCommit, currency, locale),
    resolvePriceTokens(props.advCommit, currency, locale),
    resolvePriceTokensDeep(props.compareRowsJson, currency, locale),
  ])

  return (
    <PlansClient
      heading={props.heading}
      lede={props.lede}
      coreLabel={props.coreLabel}
      coreDesc={props.coreDesc}
      corePrice={corePrice}
      coreMonthly={coreMonthly}
      coreCommit={coreCommit}
      coreFeaturesLabel={props.coreFeaturesLabel}
      coreFeatures={props.coreFeatures}
      coreCtaLabel={props.coreCtaLabel}
      coreCtaHref={props.coreCtaHref}
      advBadge={props.advBadge}
      advLabel={props.advLabel}
      advDesc={props.advDesc}
      advPrice={advPrice}
      advCommit={advCommit}
      advFeaturesLabel={props.advFeaturesLabel}
      advFeatures={props.advFeatures}
      advCtaLabel={props.advCtaLabel}
      advCtaHref={props.advCtaHref}
      guarantees={props.guarantees}
      compareRowsJson={compareRowsJson}
    />
  )
}
