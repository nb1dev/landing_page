import React from 'react'
import { getServerCurrency } from '@/utilities/currency'
import { getPlan, type PlanFamily } from '@/lib/plans/api'
import { formatRate } from '@/lib/plans/format'
import { PlanSelectorClient } from './Component.client'

type ScienceImage = {
  image?: { url?: string | null } | string | null
  alt?: string | null
}

type Plan = {
  planKey?: 'core' | 'advanced' | null
  isRecommended?: boolean | null
  name?: string | null
  // price is resolved live below — not a Payload field anymore
  strikePrice?: string | null
  minNote?: string | null
  monthlyLinkText?: string | null
  monthlyLinkHref?: string | null
  bullets?: { text?: string | null }[] | null
  ctaText?: string | null
  ctaHref?: string | null
}

type ComparisonRow = {
  label?: string | null
  coreValue?: string | null
  advancedValue?: string | null
  corePositive?: boolean | null
  advancedPositive?: boolean | null
}

type Props = {
  sectionTitle?: string | null
  guaranteeItems?: { text?: string | null }[] | null
  plans?: Plan[] | null
  scienceBoardLabel?: string | null
  scienceBoardSub?: string | null
  scienceBoardImages?: ScienceImage[] | null
  showComparison?: boolean | null
  comparisonRows?: ComparisonRow[] | null
  locale?: string
}

/**
 * Server Component: resolves each plan card's live 4-month headline price
 * (the anchor rate used throughout the rest of the funnel — see
 * src/lib/plans/api.ts), then hands the merged plan objects to the
 * interactive client UI. strikePrice/minNote/monthlyLinkText etc. stay
 * manually edited in Payload — only the literal `price` field is live now.
 */
export const PlanSelectorComponent: React.FC<Props> = async (props) => {
  const locale = props.locale || 'en'
  const currency = await getServerCurrency(locale)
  const plans = props.plans ?? []

  const resolvedPlans = await Promise.all(
    plans.map(async (plan) => {
      const family: PlanFamily = plan.planKey === 'advanced' ? 'Advanced' : 'Core'
      let price = ''
      try {
        const resolved = await getPlan(family, 4, currency)
        if (resolved) price = formatRate(resolved, currency, locale)
      } catch (err) {
        console.error(`[planSelector] failed to load "${family}" plan:`, err)
      }
      return { ...plan, price }
    }),
  )

  return (
    <PlanSelectorClient
      sectionTitle={props.sectionTitle}
      guaranteeItems={props.guaranteeItems}
      plans={resolvedPlans}
      scienceBoardLabel={props.scienceBoardLabel}
      scienceBoardSub={props.scienceBoardSub}
      scienceBoardImages={props.scienceBoardImages}
      showComparison={props.showComparison}
      comparisonRows={props.comparisonRows}
    />
  )
}
