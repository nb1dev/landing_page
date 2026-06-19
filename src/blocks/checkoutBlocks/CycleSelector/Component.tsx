import React from 'react'
import { CycleSelectorClient } from './Component.client'

type FaqItem = {
  question?: string | null
  answer?: string | null
}

type Props = {
  planName?: string | null
  switchLinkLabel?: string | null
  switchLinkHref?: string | null
  planFamily?: 'core' | 'advanced' | null
  showMonthlyOption?: boolean | null
  monthlyRate?: string | null
  monthlyCheckoutHref?: string | null
  yourPlanLabel?: string | null
  bestValueLabel?: string | null
  preferFlexibleLabel?: string | null
  chooseFlexiblePrefix?: string | null
  continuePrefix?: string | null
  cancelAnytimeLabel?: string | null
  billedMonthlyShortLabel?: string | null
  guaranteeItems?: { text?: string | null }[] | null
  faqTitle?: string | null
  faqItems?: FaqItem[] | null
  locale?: string
}

export const CycleSelectorComponent: React.FC<Props> = (props) => {
  return <CycleSelectorClient {...props} />
}
