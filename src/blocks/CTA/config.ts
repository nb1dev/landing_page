import type { Block } from 'payload'

export const CtaBlock: Block = {
  slug: 'ctaBlock',
  interfaceName: 'CtaBlock',
  labels: {
    singular: 'Article CTA',
    plural: 'Article CTAs',
  },
  fields: [
    {
      name: 'body',
      label: 'Body Text',
      type: 'textarea',
      required: true,
      localized: true,
      admin: {
        description:
          '1–3 sentences connecting the article topic to the NB1 kit. This is the only editable content.',
      },
    },
    {
      name: 'buttonUrl',
      label: 'Button URL',
      type: 'text',
      required: true,
      defaultValue: '/order',
    },
  ],
}
