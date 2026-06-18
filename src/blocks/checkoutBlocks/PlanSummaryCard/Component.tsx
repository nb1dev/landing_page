import React from 'react'
import { getServerCurrency } from '@/utilities/currency'
import { getPlan, type PlanFamily, type PlanMonth } from '@/lib/plans/api'
import { formatRate } from '@/lib/plans/format'
import { resolvePriceTokens } from '@/lib/plans/priceTokens'
import { PlanSummaryCardClient } from './Component.client'

type Bullet = { text?: string | null }

type Props = {
  sectionTitle?: string | null
  planVariant?: 'core' | 'advanced' | null
  /** Which cycle's price to show — see file header note in config.ts: this
   * block isn't wired into any live page yet, so there's no real "already
   * selected cycle" to read from query params. Kept as a simple editorial
   * choice for now rather than speculative searchParams plumbing. */
  cycleMonth?: '4' | '8' | '12' | null
  planName?: string | null
  priceNote?: string | null
  switchLinkText?: string | null
  switchLinkHref?: string | null
  bullets?: Bullet[] | null
  primaryCtaText?: string | null
  primaryCtaHref?: string | null
  secondaryCtaText?: string | null
  secondaryCtaHref?: string | null
  ctaSubText?: string | null
  locale?: string
}

/**
 * Server Component: resolves the live price for the chosen plan variant +
 * cycle (see src/lib/plans/api.ts), then hands it to the client UI both as
 * the headline price and as the CTA price chip (kept identical so they
 * can't drift apart).
 */
export const PlanSummaryCardComponent: React.FC<Props> = async (props) => {
  const locale = props.locale || 'en'
  const currency = await getServerCurrency(locale)
  const family: PlanFamily = props.planVariant === 'advanced' ? 'Advanced' : 'Core'
  const month = (Number(props.cycleMonth) || 4) as PlanMonth

  let price: string | null = null
  try {
    const resolved = await getPlan(family, month, currency)
    if (resolved) price = formatRate(resolved, currency, locale)
  } catch (err) {
    console.error(`[planSummaryCard] failed to load "${family}" plan (month=${month}):`, err)
  }
  const ctaPrice = price ? `${price}/mo` : null
  const secondaryCtaText = await resolvePriceTokens(props.secondaryCtaText, currency, locale)

  return (
    <PlanSummaryCardClient
      sectionTitle={props.sectionTitle}
      planVariant={props.planVariant}
      planName={props.planName}
      price={price}
      priceNote={props.priceNote}
      switchLinkText={props.switchLinkText}
      switchLinkHref={props.switchLinkHref}
      bullets={props.bullets}
      primaryCtaText={props.primaryCtaText}
      primaryCtaPrice={ctaPrice}
      primaryCtaHref={props.primaryCtaHref}
      secondaryCtaText={secondaryCtaText}
      secondaryCtaHref={props.secondaryCtaHref}
      ctaSubText={props.ctaSubText}
    />
  )
}
