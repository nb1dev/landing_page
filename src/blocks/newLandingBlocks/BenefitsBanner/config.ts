import type { Block } from 'payload'

export const BenefitsBanner: Block = {
  slug: 'benefitsBanner',
  interfaceName: 'BenefitsBannerBlock',
  labels: {
    singular: 'Benefits Banner',
    plural: 'Benefits Banners',
  },
  fields: [
    {
      name: 'items',
      label: 'Benefit items',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'icon',
          label: 'Icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
