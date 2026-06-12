import type { Block } from 'payload'
import { makeHeadingEditor } from '@/fields/headingLexical'

export const PlansBlock: Block = {
  slug: 'plansSection',
  interfaceName: 'PlansSectionBlock',
  fields: [
    { name: 'heading', type: 'richText', localized: true, editor: makeHeadingEditor() },
    { name: 'lede', type: 'text', localized: true },
    { name: 'coreLabel', type: 'text', localized: true },
    { name: 'coreDesc', type: 'text', localized: true },
    { name: 'corePrice', type: 'text' },
    { name: 'coreMonthly', type: 'text', localized: true },
    { name: 'coreCommit', type: 'text', localized: true },
    { name: 'coreFeaturesLabel', type: 'text', localized: true },
    { name: 'coreFeatures', type: 'array', fields: [{ name: 'item', type: 'text', localized: true }] },
    { name: 'coreCtaLabel', type: 'text', localized: true },
    { name: 'coreCtaHref', type: 'text' },
    { name: 'advBadge', type: 'text', localized: true },
    { name: 'advLabel', type: 'text', localized: true },
    { name: 'advDesc', type: 'text', localized: true },
    { name: 'advPrice', type: 'text' },
    { name: 'advCommit', type: 'text', localized: true },
    { name: 'advFeaturesLabel', type: 'text', localized: true },
    { name: 'advFeatures', type: 'array', fields: [{ name: 'item', type: 'text', localized: true }] },
    { name: 'advCtaLabel', type: 'text', localized: true },
    { name: 'advCtaHref', type: 'text' },
    { name: 'guarantees', type: 'array', fields: [
      { name: 'iconSvg', type: 'textarea' },
      { name: 'title', type: 'text', localized: true },
      { name: 'description', type: 'text', localized: true },
    ]},
    { name: 'compareRowsJson', type: 'textarea' },
  ],
}
