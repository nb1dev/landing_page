import type { Block } from 'payload'

export const StickyCtaBar: Block = {
  slug: 'stickyCtaBar',
  interfaceName: 'StickyCtaBarBlock',
  labels: { singular: 'Sticky CTA Bar', plural: 'Sticky CTA Bars' },
  fields: [
    {
      name: 'primaryCtaText',
      type: 'text',
      label: 'Primary CTA text',
      localized: true,
      required: true,
      admin: { placeholder: 'Continue with Core · €99/mo →' },
    },
    {
      name: 'primaryCtaHref',
      type: 'text',
      label: 'Primary CTA href',
      required: true,
    },
    {
      name: 'secondaryCtaText',
      type: 'text',
      label: 'Secondary CTA text (optional)',
      localized: true,
      admin: { placeholder: 'Pay monthly · €109/mo →' },
    },
    {
      name: 'secondaryCtaHref',
      type: 'text',
      label: 'Secondary CTA href',
    },
  ],
}
