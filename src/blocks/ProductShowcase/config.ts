import type { Block } from 'payload'
import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  StrikethroughFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { TextColorFeature } from 'payloadcms-lexical-ext'

export const ProductShowcase: Block = {
  slug: 'productShowcase',
  interfaceName: 'ProductShowcaseBlock',
  labels: {
    singular: 'Product Showcase',
    plural: 'Product Showcases',
  },
  fields: [
    // ─── Header ───────────────────────────────────────────────────────────────
    {
      name: 'title',
      label: 'Title',
      type: 'richText',
      localized: true,
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          TextColorFeature({
            colors: [
              { type: 'button', color: '#000000', label: 'Black' },
              { type: 'button', color: '#1D1D1D', label: 'Dark' },
              { type: 'button', color: '#009FB7', label: 'Brand' },
            ],
          }),
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          AlignFeature(),
          StrikethroughFeature(),
        ],
      }),
    },
    {
      name: 'badge',
      label: 'Badge text (below title)',
      type: 'text',
      localized: true,
    },
    // ─── Product panel (left card) ────────────────────────────────────────────
    {
      name: 'panel',
      label: 'Product Panel',
      type: 'group',
      fields: [
        {
          name: 'thumbnails',
          label: 'Carousel thumbnails',
          type: 'array',
          maxRows: 10,
          fields: [
            {
              name: 'image',
              label: 'Thumbnail image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              localized: true,
            },
          ],
        },
      ],
    },
    // ─── Pricing cards ────────────────────────────────────────────────────────
    {
      name: 'plans',
      label: 'Pricing Cards',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      admin: {
        description: 'Each card represents a plan (e.g. Core, Complete).',
      },
      fields: [
        {
          name: 'badgeLabel',
          label: 'Badge label (e.g. STARTER)',
          type: 'text',
          localized: true,
        },
        {
          name: 'badgeHighlighted',
          label: 'Highlight badge (teal background)',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'cardTitle',
          label: 'Card title (e.g. Core)',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'features',
          label: 'Feature items',
          type: 'array',
          minRows: 1,
          fields: [
            {
              name: 'text',
              label: 'Feature text',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'highlighted',
              label: 'Teal checkmark (highlighted)',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
        {
          name: 'prices',
          label: 'Pricing options',
          type: 'array',
          minRows: 1,
          maxRows: 3,
          fields: [
            {
              name: 'durationLabel',
              label: 'Duration label (e.g. 1 month)',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'priceLabel',
              label: 'Price / Save badge text (e.g. €125 or Save 15%)',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'perDayLabel',
              label: 'Per-day / Discount amount (e.g. €4,17/day)',
              type: 'text',
              localized: true,
            },
            {
              name: 'isDefault',
              label: 'Pre-selected option',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
        {
          name: 'buttonLabel',
          label: 'Button label',
          type: 'text',
          localized: true,
          defaultValue: 'Add to cart',
        },
        {
          name: 'buttonLink',
          label: 'Button link / URL',
          type: 'text',
          localized: true,
        },
      ],
    },
    // ─── FAQ section ──────────────────────────────────────────────────────────
    {
      name: 'faqItems',
      label: 'FAQ Items (collapsible)',
      type: 'array',
      maxRows: 20,
      fields: [
        {
          name: 'question',
          label: 'Question',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'answer',
          label: 'Answer',
          type: 'textarea',
          localized: true,
        },
      ],
    },
  ],
}
