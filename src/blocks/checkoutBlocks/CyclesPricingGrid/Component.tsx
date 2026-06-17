import React from 'react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { getServerCurrency } from '@/utilities/currency'
import { getPlanCycles, type PlanFamily } from '@/lib/plans/api'
import { formatMonthLabel, formatRate } from '@/lib/plans/format'
import { getDictionary } from '@/i18n/getDictionary'
import { CyclesPricingGridClient } from './Component.client'

type AthleteImage = {
  image?: { url?: string | null } | string | null
  alt?: string | null
}

type Props = {
  sectionTitle?: string | null
  subtitle?: string | null
  // Plan 1
  planName?: string | null
  monthlyNote?: string | null
  planFamily?: 'core' | 'advanced' | null
  ctaText?: string | null
  ctaHref?: string | null
  // Plan 2 (optional — enables 2-column layout)
  showSecondPlan?: boolean | null
  planName2?: string | null
  monthlyNote2?: string | null
  planFamily2?: 'core' | 'advanced' | null
  ctaText2?: string | null
  ctaHref2?: string | null
  // Shared footer
  footerNote?: SerializedEditorState | null
  athleteSealText?: string | null
  athleteImages?: AthleteImage[] | null
  locale?: string
}

async function resolveRows(
  family: 'core' | 'advanced' | null | undefined,
  currency: Awaited<ReturnType<typeof getServerCurrency>>,
  locale: string,
  bestValueLabel: string,
) {
  if (!family) return []
  const apiFamily: PlanFamily = family === 'advanced' ? 'Advanced' : 'Core'
  let cycles: Awaited<ReturnType<typeof getPlanCycles>> = []
  try {
    cycles = await getPlanCycles(apiFamily, currency)
  } catch (err) {
    console.error(`[cyclesPricingGrid] failed to load "${apiFamily}" plans:`, err)
  }
  return cycles.map((plan) => ({
    months: formatMonthLabel(plan.month, locale),
    rate: formatRate(plan, currency, locale),
    isBestValue: plan.isPreferred,
    bestValueLabel: plan.isPreferred ? bestValueLabel : null,
  }))
}

/**
 * Server Component: resolves live 4/8/12-month pricing for one or two plan
 * families (depending on showSecondPlan), then hands fully-formatted rows
 * to the interactive client UI — same split as CycleSelector.
 */
export const CyclesPricingGridComponent: React.FC<Props> = async (props) => {
  const locale = props.locale || 'en'
  const currency = await getServerCurrency(locale)
  const dict = getDictionary(locale)
  const bestValueLabel = dict.plans.bestValue

  const showSecond = Boolean(props.showSecondPlan && props.planFamily2)

  const [rows, rows2] = await Promise.all([
    resolveRows(props.planFamily, currency, locale, bestValueLabel),
    showSecond
      ? resolveRows(props.planFamily2, currency, locale, bestValueLabel)
      : Promise.resolve([]),
  ])

  return (
    <CyclesPricingGridClient
      sectionTitle={props.sectionTitle}
      subtitle={props.subtitle}
      planName={props.planName}
      monthlyNote={props.monthlyNote}
      rows={rows}
      ctaText={props.ctaText}
      ctaHref={props.ctaHref}
      showSecondPlan={props.showSecondPlan}
      planName2={props.planName2}
      monthlyNote2={props.monthlyNote2}
      rows2={rows2}
      ctaText2={props.ctaText2}
      ctaHref2={props.ctaHref2}
      footerNote={props.footerNote}
      athleteSealText={props.athleteSealText}
      athleteImages={props.athleteImages}
    />
  )
}
