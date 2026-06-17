import React from 'react'
import { getServerCurrency } from '@/utilities/currency'
import { getPlanCycles, type PlanFamily } from '@/lib/plans/api'
import { formatMonthLabel, formatRate, formatSavingsLabel } from '@/lib/plans/format'
import { CycleSelectorClient } from './Component.client'

type FaqItem = {
  question?: string | null
  answer?: string | null
}

type Props = {
  planName?: string | null
  switchLinkLabel?: string | null
  switchLinkHref?: string | null
  /** Which live plan family this selector shows the 4/8/12-month grid for. */
  planFamily?: 'core' | 'advanced' | null
  // "Flexible monthly" stays a manually-edited concept, separate from the
  // live API — see src/lib/plans/api.ts file header for why.
  showMonthlyOption?: boolean | null
  monthlyRate?: string | null
  monthlyCheckoutHref?: string | null
  faqTitle?: string | null
  faqItems?: FaqItem[] | null
  locale?: string
}

/**
 * Server Component: resolves the live 4/8/12-month price grid for the
 * selected plan family, then hands fully-formatted props to the
 * interactive client UI. Keeping the fetch here (rather than in the
 * 'use client' component) means pricing is in the initial HTML — no
 * loading flash, and editors can't override it from Payload.
 */
export const CycleSelectorComponent: React.FC<Props> = async (props) => {
  const locale = props.locale || 'en'
  const family: PlanFamily = props.planFamily === 'advanced' ? 'Advanced' : 'Core'
  const planKey = family.toLowerCase()
  const currency = await getServerCurrency(locale)

  let cycles: Awaited<ReturnType<typeof getPlanCycles>> = []
  try {
    cycles = await getPlanCycles(family, currency)
  } catch (err) {
    // Don't take the whole page down if the pricing API is unreachable —
    // render with an empty tier grid instead.
    console.error(`[cycleSelector] failed to load "${family}" plans:`, err)
  }

  const tiers = cycles.map((plan) => ({
    months: formatMonthLabel(plan.month, locale),
    monthlyRate: formatRate(plan, currency, locale),
    saveLabel: formatSavingsLabel(plan, currency, locale),
    isBestValue: plan.isPreferred,
    checkoutHref: `/order-details?plan=${planKey}&cycle=${plan.month}`,
  }))

  return (
    <CycleSelectorClient
      planName={props.planName}
      switchLinkLabel={props.switchLinkLabel}
      switchLinkHref={props.switchLinkHref}
      tiers={tiers}
      showMonthlyOption={props.showMonthlyOption}
      monthlyRate={props.monthlyRate}
      monthlyCheckoutHref={props.monthlyCheckoutHref}
      faqTitle={props.faqTitle}
      faqItems={props.faqItems}
    />
  )
}
