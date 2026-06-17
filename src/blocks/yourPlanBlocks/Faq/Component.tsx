import React from 'react'
import { getServerCurrency } from '@/utilities/currency'
import { resolvePriceTokens, resolvePriceTokensDeep } from '@/lib/plans/priceTokens'
import { YpFaqClient, type YpFaqBlockType } from './Component.client'

/**
 * Server Component: resolves live-price tokens (see src/lib/plans/priceTokens.ts)
 * inside each FAQ item — the question (plain text) and answer (Lexical rich
 * text) — then hands the token-free content to the client UI. e.g. an answer
 * "…month-to-month at {{price:core:1}}/mo … at {{price:core:4}}/mo…" renders
 * with the visitor's live currency rates.
 */
export const YpFaqComponent: React.FC<YpFaqBlockType & { locale?: string }> = async (props) => {
  const locale = props.locale || 'en'
  const currency = await getServerCurrency(locale)

  const items = await Promise.all(
    (props.items ?? []).map(async (it) => ({
      ...it,
      question: await resolvePriceTokens(it.question, currency, locale),
      answer: await resolvePriceTokensDeep(it.answer, currency, locale),
    })),
  )

  return <YpFaqClient {...props} items={items} />
}
