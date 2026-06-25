import React from 'react'
import { PlanSelectorClient } from './Component.client'

type ScienceImage = {
  image?: { url?: string | null } | string | null
  alt?: string | null
}

type Plan = {
  planKey?: 'core' | 'advanced' | null
  isRecommended?: boolean | null
  name?: string | null
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

export const PlanSelectorComponent: React.FC<Props> = (props) => {
  return <PlanSelectorClient {...props} />
}
