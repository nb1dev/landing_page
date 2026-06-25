import {
  BoldFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

const planFields = (suffix: '' | '2') => [
  {
    name: `planName${suffix}`,
    type: 'text' as const,
    label: suffix ? 'Plan name (2nd column)' : 'Plan name',
    localized: true,
    admin: { placeholder: suffix ? 'Advanced' : 'Core' },
  },
  {
    name: `monthlyNote${suffix}`,
    type: 'text' as const,
    label: suffix ? 'Monthly note (2nd column)' : 'Monthly billing note (optional)',
    localized: true,
    admin: { placeholder: 'or €109/mo monthly' },
  },
  {
    name: `planFamily${suffix}`,
    type: 'select' as const,
    label: suffix ? 'Plan family (2nd column, live pricing)' : 'Plan family (live pricing)',
    options: [
      { label: 'Core', value: 'core' },
      { label: 'Advanced', value: 'advanced' },
    ],
    admin: {
      description:
        'The 4/8/12-month price grid is fetched live from the subscriptions API for this plan family — it is not editable here.',
    },
  },
  {
    name: `ctaText${suffix}`,
    type: 'text' as const,
    label: suffix ? 'CTA button text (2nd column)' : 'CTA button text',
    localized: true,
    admin: { placeholder: suffix ? 'Continue with Advanced →' : 'Continue with Core →' },
  },
  {
    name: `ctaHref${suffix}`,
    type: 'text' as const,
    label: suffix ? 'CTA link (2nd column)' : 'CTA link',
    admin: { placeholder: '/order-cycle-core' },
  },
]

export const CyclesPricingGrid: Block = {
  slug: 'cyclesPricingGrid',
  interfaceName: 'CyclesPricingGridBlock',
  labels: { singular: 'Cycles Pricing Grid', plural: 'Cycles Pricing Grids' },
  fields: [
    {
      name: 'priceTokenHelp',
      type: 'ui',
      admin: {
        components: {
          Field: { path: '/blocks/yourPlanBlocks/PriceTokenHelp', exportName: 'PriceTokenHelp' },
        },
      },
    },
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Section title',
      localized: true,
      admin: { placeholder: 'Cycles of four.' },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      localized: true,
    },
    ...planFields(''),
    {
      name: 'showSecondPlan',
      type: 'checkbox',
      label: 'Show second plan column (side-by-side)',
      defaultValue: false,
    },
    ...planFields('2'),
    {
      name: 'footerNote',
      type: 'richText',
      label: 'Footer note (bold = highlighted)',
      localized: true,
      editor: lexicalEditor({
        features: () => [BoldFeature(), InlineToolbarFeature()],
      }),
    },
    {
      name: 'athleteSealText',
      type: 'text',
      label: 'Athlete seal text',
      localized: true,
      admin: { placeholder: 'Trained on by HYROX world champions' },
    },
    {
      name: 'athleteImages',
      type: 'array',
      label: 'Athlete images',
      maxRows: 4,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt text',
          localized: true,
        },
      ],
    },
  ],
}
