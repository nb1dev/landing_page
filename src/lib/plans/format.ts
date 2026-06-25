import { formatPrice, type CurrencyCode } from '@/utilities/currency'
import { getDictionary } from '@/i18n/getDictionary'
import type { PlanMonth, ResolvedPlan } from './api'

/** "4 months" / "4 Monate" — duration label for a tier card. */
export function formatMonthLabel(month: PlanMonth, locale: string): string {
  const dict = getDictionary(locale)
  return dict.plans.months[month] ?? `${month} months`
}

/** "€89" / "89 €" — the monthly rate, locale + currency aware. */
export function formatRate(plan: ResolvedPlan, currency: CurrencyCode, locale: string): string {
  return formatPrice(plan.price, currency, locale)
}

/**
 * "Save €120 / cycle" / "120 € pro Zyklus sparen" — built from the
 * dictionary's prefix/suffix so word order can differ per language.
 * Returns null when there's nothing to save (e.g. the 4-month baseline).
 */
export function formatSavingsLabel(
  plan: ResolvedPlan,
  currency: CurrencyCode,
  locale: string,
): string | null {
  if (!plan.savings || plan.savings <= 0) return null
  const dict = getDictionary(locale)
  const amount = formatPrice(plan.savings, currency, locale)
  return [dict.plans.savingsPrefix, amount, dict.plans.savingsSuffix].filter(Boolean).join(' ')
}
