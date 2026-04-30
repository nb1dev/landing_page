import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'
import { TextColorFeature } from 'payloadcms-lexical-ext'

const makeEditor = () =>
  lexicalEditor({
    features: ({ rootFeatures }) => [
      ...rootFeatures,
      FixedToolbarFeature(),
      InlineToolbarFeature(),
      TextColorFeature(),
      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
    ],
  })

export const PriceBreakBlock: Block = {
  slug: 'priceBreak',
  interfaceName: 'PriceBreakBlock',
  labels: {
    singular: 'Price Break',
    plural: 'Price Break Blocks',
  },
  fields: [
    {
      name: 'priceNumber',
      label: 'Price Number',
      type: 'text',
      required: true,
      defaultValue: '€99',
    },
    {
      name: 'priceUnit',
      label: 'Price Period',
      type: 'text',
      defaultValue: 'month',
      admin: {
        description: 'Shown after "/" automatically. E.g. "month" → displays as "€99/month".',
        placeholder: 'month',
      },
    },
    {
      name: 'headingLine1',
      label: 'Heading — Line 1',
      type: 'richText',
      localized: true,
      editor: makeEditor(),
    },
    {
      name: 'headingLine2',
      label: 'Heading — Line 2 (Teal Accent)',
      type: 'richText',
      localized: true,
      editor: makeEditor(),
    },
    // ── A/B Variants ────────────────────────────────────────────────────────
    {
      name: 'variants',
      label: 'A/B Variants',
      type: 'array',
      admin: {
        description:
          'Each variant overrides content when ?v=<key> is present in the URL. Leave override fields empty to fall back to the defaults above.',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'variantKey',
          label: 'Variant Key',
          type: 'text',
          required: true,
          admin: {
            description: 'URL param value matched against ?v=. E.g. "v1" or "dark".',
          },
        },
        {
          name: 'darkMode',
          label: 'Dark Mode',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'priceNumber',
          label: 'Price Number Override',
          type: 'text',
        },
        {
          name: 'priceUnit',
          label: 'Price Period Override',
          type: 'text',
          admin: {
            description: 'E.g. "month" → displays as "€99/month".',
            placeholder: 'month',
          },
        },
        {
          name: 'headingLine1',
          label: 'Heading — Line 1 Override',
          type: 'richText',
          localized: true,
          editor: makeEditor(),
        },
        {
          name: 'headingLine2',
          label: 'Heading — Line 2 Override (Teal Accent)',
          type: 'richText',
          localized: true,
          editor: makeEditor(),
        },
      ],
    },
  ],
}


