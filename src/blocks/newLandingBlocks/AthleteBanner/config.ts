import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'
import { TextColorFeature } from 'payloadcms-lexical-ext'

const headingEditor = lexicalEditor({
  features: ({ rootFeatures }) => [
    ...rootFeatures,
    FixedToolbarFeature(),
    InlineToolbarFeature(),
    TextColorFeature(),
    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3'] }),
  ],
})

const bgOptions = [
  { label: 'Cream (#FAF8F2 — light version)', value: 'cream' },
  { label: 'Cream Gradient (dark version)', value: 'creamGradient' },
  { label: 'White', value: 'white' },
  { label: 'Custom', value: 'custom' },
]

const iconOptions = [
  { label: 'Check Circle', value: 'checkCircle' },
  { label: 'Pulse / Waveform', value: 'pulse' },
  { label: 'Check Square', value: 'checkSquare' },
  { label: 'Plus / Cross', value: 'plus' },
  { label: 'Speech Bubble', value: 'speechBubble' },
]

export const AthleteBannerBlock: Block = {
  slug: 'athleteBanner',
  interfaceName: 'AthleteBannerBlock',
  labels: {
    singular: 'Athlete Banner',
    plural: 'Athlete Banners',
  },
  fields: [
    // ── Appearance ─────────────────────────────────────────────────────────────
    {
      name: 'backgroundColor',
      label: 'Background Color',
      type: 'select',
      defaultValue: 'cream',
      options: bgOptions,
      admin: {
        description:
          '"Cream" matches the light HTML; "Cream Gradient" matches the dark HTML. USP strip background is derived automatically.',
      },
    },
    {
      name: 'backgroundColorCustom',
      label: 'Custom Background Color (hex)',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.backgroundColor === 'custom',
      },
    },

    // ── Athlete section ─────────────────────────────────────────────────────────
    {
      name: 'eyebrow',
      label: 'Eyebrow',
      type: 'text',
      localized: true,
      admin: { description: 'Small uppercase label above the heading.' },
    },
    {
      name: 'heading',
      label: 'Heading',
      type: 'richText',
      localized: true,
      editor: headingEditor,
      admin: {
        description: 'Main heading. Use the "ac" text-color class for italic teal highlights.',
      },
    },
    {
      name: 'athleteCards',
      label: 'Athlete Cards',
      type: 'array',
      maxRows: 6,
      admin: { description: 'Hover/tap a card to reveal the quote. Max 6 cards.' },
      fields: [
        {
          name: 'image',
          label: 'Photo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'tag',
          label: 'Tag (pill label)',
          type: 'text',
          localized: true,
          admin: { description: 'e.g. "2025 World Champion"' },
        },
        {
          name: 'name',
          label: 'Name',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'title',
          label: 'Title / Subtitle',
          type: 'text',
          localized: true,
          admin: { description: 'e.g. "HYROX Men\'s Pro · NB¹ athlete"' },
        },
        {
          name: 'quoteBody',
          label: 'Quote Body',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'quoteAttr',
          label: 'Quote Attribution',
          type: 'text',
          localized: true,
          admin: { description: 'e.g. "Tim Wenisch · 2025 HYROX World Champion"' },
        },
      ],
    },

    // ── USP strip ───────────────────────────────────────────────────────────────
    {
      name: 'uspItems',
      label: 'USP Items',
      type: 'array',
      maxRows: 5,
      admin: { description: 'Feature cells shown in the strip below the athlete cards. Max 5.' },
      fields: [
        {
          name: 'iconType',
          label: 'Icon',
          type: 'select',
          options: iconOptions,
          dbName: 'athlete_banner_icon_type',
        },
        {
          name: 'heading',
          label: 'Heading',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'subtext',
          label: 'Subtext',
          type: 'text',
          localized: true,
        },
      ],
    },

    // ── A/B testing variants ────────────────────────────────────────────────────
    {
      name: 'variants',
      label: 'A/B Variants',
      type: 'array',
      admin: {
        description:
          'Each entry overrides content when ?v=<key> is in the URL. Leave fields empty to fall back to defaults.',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'variantKey',
          label: 'Variant Key',
          type: 'text',
          required: true,
          admin: { description: 'Matched against ?v=. Example: "b".' },
        },
        {
          name: 'backgroundColor',
          label: 'Background Color Override',
          type: 'select',
          options: bgOptions,
        },
        {
          name: 'backgroundColorCustom',
          label: 'Custom Background Color Override (hex)',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.backgroundColor === 'custom',
          },
        },
        {
          name: 'eyebrow',
          label: 'Eyebrow Override',
          type: 'text',
          localized: true,
        },
        {
          name: 'heading',
          label: 'Heading Override',
          type: 'richText',
          localized: true,
          editor: headingEditor,
        },
        {
          name: 'athleteCards',
          label: 'Athlete Cards Override',
          type: 'array',
          maxRows: 6,
          fields: [
            { name: 'image', label: 'Photo', type: 'upload', relationTo: 'media' },
            { name: 'tag', label: 'Tag', type: 'text', localized: true },
            { name: 'name', label: 'Name', type: 'text', localized: true, required: true },
            { name: 'title', label: 'Title', type: 'text', localized: true },
            { name: 'quoteBody', label: 'Quote Body', type: 'textarea', localized: true },
            { name: 'quoteAttr', label: 'Quote Attribution', type: 'text', localized: true },
          ],
        },
        {
          name: 'uspItems',
          label: 'USP Items Override',
          type: 'array',
          maxRows: 5,
          fields: [
            {
              name: 'iconType',
              label: 'Icon',
              type: 'select',
              options: iconOptions,
              dbName: 'athlete_banner_variant_icon_type',
            },
            { name: 'heading', label: 'Heading', type: 'text', localized: true, required: true },
            { name: 'subtext', label: 'Subtext', type: 'text', localized: true },
          ],
        },
      ],
    },
  ],
}
