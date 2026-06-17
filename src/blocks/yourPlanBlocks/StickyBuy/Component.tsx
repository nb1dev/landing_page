import React from 'react'
import { getServerCurrency } from '@/utilities/currency'
import { resolvePriceTokens } from '@/lib/plans/priceTokens'
import { YpStickyBuyClient, type YpStickyBuyBlockType } from './Component.client'

/**
 * Server Component: resolves live-price tokens (see src/lib/plans/priceTokens.ts)
 * in the bar's text — e.g. Secondary Text "from {{price:core:4}}/mo" — then
 * hands the token-free copy to the client UI.
 */
export const YpStickyBuyComponent: React.FC<YpStickyBuyBlockType & { locale?: string }> = async (
  props,
) => {
  const locale = props.locale || 'en'
  const currency = await getServerCurrency(locale)

  const [leftKey, leftValue] = await Promise.all([
    resolvePriceTokens(props.leftKey, currency, locale),
    resolvePriceTokens(props.leftValue, currency, locale),
  ])

  return <YpStickyBuyClient {...props} leftKey={leftKey} leftValue={leftValue} />
}
