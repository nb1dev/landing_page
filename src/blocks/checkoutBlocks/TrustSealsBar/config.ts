import type { Block } from 'payload'

export const TrustSealsBar: Block = {
  slug: 'trustSealsBar',
  interfaceName: 'TrustSealsBarBlock',
  labels: { singular: 'Trust Seals Bar', plural: 'Trust Seals Bars' },
  fields: [
    {
      name: 'seals',
      type: 'array',
      label: 'Seals',
      minRows: 1,
      fields: [
        {
          name: 'type',
          type: 'select',
          label: 'Type',
          defaultValue: 'dot',
          options: [
            { label: 'Stars + rating', value: 'stars' },
            { label: 'Dot', value: 'dot' },
          ],
        },
        {
          name: 'rating',
          type: 'text',
          label: 'Rating value (stars only)',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'stars',
          },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          localized: true,
        },
      ],
    },
  ],
}
