import React from 'react'
import { getServerCurrency } from '@/utilities/currency'
import { getPlanCycles } from '@/lib/plans/api'
import { formatRate } from '@/lib/plans/format'
import { CheckoutFormClient } from './Component.client'

type Props = { backHref?: string | null; locale?: string }

/**
 * Server Component: resolves live 4/8/12-month rates for both Core and
 * Advanced in the visitor's selected currency (cookie set by the header
 * switcher — see src/utilities/currency.ts), then hands them to the client
 * form as a lookup table. The client already reads `plan`/`cycle` from
 * useSearchParams (it's the checkout step right after CycleSelector), so it
 * just needs the rate for whichever combination the URL specifies instead
 * of the previous hardcoded EUR-only table.
 */
export const CheckoutFormComponent: React.FC<Props> = async (props) => {
  const locale = props.locale || 'en'
  const currency = await getServerCurrency(locale)

  const planRates: Record<string, Record<string, string>> = { core: {}, advanced: {} }
  try {
    const [core, advanced] = await Promise.all([
      getPlanCycles('Core', currency),
      getPlanCycles('Advanced', currency),
    ])
    for (const plan of core) planRates.core[String(plan.month)] = formatRate(plan, currency, locale)
    for (const plan of advanced)
      planRates.advanced[String(plan.month)] = formatRate(plan, currency, locale)
  } catch (err) {
    console.error('[checkoutForm] failed to load plans:', err)
  }

  return <CheckoutFormClient backHref={props.backHref} planRates={planRates} locale={locale} />
}
