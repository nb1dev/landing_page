import React from 'react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { CyclesPricingGridClient } from './Component.client'

type AthleteImage = {
  image?: { url?: string | null } | string | null
  alt?: string | null
}

type Props = {
  sectionTitle?: string | null
  subtitle?: string | null
  planName?: string | null
  monthlyNote?: string | null
  planFamily?: 'core' | 'advanced' | null
  ctaText?: string | null
  ctaHref?: string | null
  showSecondPlan?: boolean | null
  planName2?: string | null
  monthlyNote2?: string | null
  planFamily2?: 'core' | 'advanced' | null
  ctaText2?: string | null
  ctaHref2?: string | null
  footerNote?: SerializedEditorState | null
  athleteSealText?: string | null
  athleteImages?: AthleteImage[] | null
  locale?: string
}

/**
 * Live-price tokens (incl. arithmetic like {{(price:core:4-price:core:12)*12}})
 * in this block's copy are resolved page-wide on the server — see the page
 * component's resolvePriceTokensDeep call — so this block just forwards props.
 */
export const CyclesPricingGridComponent: React.FC<Props> = (props) => {
  return <CyclesPricingGridClient {...props} />
}
