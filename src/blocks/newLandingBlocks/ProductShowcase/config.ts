import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
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
          TextColorFeature(),
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
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
      name: 'productPanel',
      label: 'Product Panel',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Panel title',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'subtitle',
          label: 'Panel subtitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'features',
          label: 'Feature list',
          type: 'array',
          minRows: 1,
          maxRows: 10,
          fields: [
            {
              name: 'label',
              label: 'Label',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'icon',
              label: 'Icon / image',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          name: 'mainImage',
          label: 'Main product image',
          type: 'upload',
          relationTo: 'media',
        },
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
              name: 'price',
              label: 'Price (e.g. €125)',
              type: 'text',
              required: true,
            },
            {
              name: 'perDay',
              label: 'Per-day label (e.g. €4,17/day)',
              type: 'text',
            },
            {
              name: 'saveBadge',
              label: 'Save badge text (e.g. Save 15%)',
              type: 'text',
              localized: true,
            },
            {
              name: 'discountAmount',
              label: 'Discount amount (e.g. €56)',
              type: 'text',
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
