import React from 'react'
import { PlansClient } from './Component.client'

type FeatureItem = { item?: string | null }
type Guarantee = { iconSvg?: string | null; title?: string | null; description?: string | null }

type Props = {
  heading?: any
  lede?: string | null
  coreLabel?: string | null
  coreDesc?: string | null
  coreMonthly?: string | null
  coreCommit?: string | null
  coreFeaturesLabel?: string | null
  coreFeatures?: FeatureItem[] | null
  coreCtaLabel?: string | null
  coreCtaHref?: string | null
  advBadge?: string | null
  advLabel?: string | null
  advDesc?: string | null
  advCommit?: string | null
  advFeaturesLabel?: string | null
  advFeatures?: FeatureItem[] | null
  advCtaLabel?: string | null
  advCtaHref?: string | null
  guarantees?: Guarantee[] | null
  compareRowsJson?: string | null
  locale?: string
}

export const PlansComponent: React.FC<Props> = (props) => {
  return <PlansClient {...props} />
}
