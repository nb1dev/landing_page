import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const OrderStepHero: Block = {
  slug: 'orderStepHero',
  interfaceName: 'OrderStepHeroBlock',
  labels: { singular: 'Order Step Hero', plural: 'Order Step Heroes' },
  fields: [
    {
      name: 'headline',
      type: 'richText',
      label: 'Headline (bold = teal)',
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
        ],
      }),
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      localized: true,
    },
    {
      name: 'showSeals',
      type: 'checkbox',
      label: 'Show trust seals',
      defaultValue: false,
    },
    {
      name: 'seals',
      type: 'array',
      label: 'Trust seals',
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.showSeals),
      },
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
        {
          name: 'shortLabel',
          type: 'text',
          label: 'Short label (mobile)',
          localized: true,
        },
      ],
    },
  ],
}
