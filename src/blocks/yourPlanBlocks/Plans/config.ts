import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

const headingEditor = lexicalEditor({
  features: ({ rootFeatures }) => [
    ...rootFeatures,
    FixedToolbarFeature(),
    InlineToolbarFeature(),
    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
  ],
})

const inlineEditor = lexicalEditor({
  features: ({ rootFeatures }) => [
    ...rootFeatures,
    FixedToolbarFeature(),
    InlineToolbarFeature(),
  ],
})

export const YpPlansBlock: Block = {
  slug: 'ypPlans',
  interfaceName: 'YpPlansBlock',
  labels: {
    singular: 'YP — Plans',
    plural: 'YP — Plans Sections',
  },
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
    // ── Appearance ────────────────────────────────────────────────────────────
    {
      name: 'backgroundColor',
      label: 'Background Color',
      type: 'select',
      defaultValue: 'cream',
      admin: { description: 'Background color for the plans section.' },
      options: [
        { label: 'Cream (#FAF8F2)', value: 'cream' },
        { label: 'Paper / White (#FFFFFF)', value: 'paper' },
        { label: 'Cool Light (#F1F4F7)', value: 'off' },
        { label: 'Navy (#12314D)', value: 'navy' },
        { label: 'Deep Navy (#0E2740)', value: 'navyDeep' },
        { label: 'Teal (#0A8FB0)', value: 'teal' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    {
      name: 'backgroundColorCustom',
      label: 'Custom Background Color (hex)',
      type: 'text',
      admin: {
        description: 'Hex value used when "Custom" is selected (e.g. #1a2b3c).',
        condition: (_, siblingData) => siblingData?.backgroundColor === 'custom',
      },
    },
    {
      name: 'backgroundType',
      label: 'Background Type',
      type: 'select',
      defaultValue: 'color',
      admin: { description: 'Choose whether the section uses a color or a background image.' },
      options: [
        { label: 'Color', value: 'color' },
        { label: 'Image', value: 'image' },
      ],
    },
    {
      name: 'backgroundImage',
      label: 'Background Image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Image shown behind the section (only used when Background Type is "Image").',
        condition: (_, siblingData) => siblingData?.backgroundType === 'image',
      },
    },
    {
      name: 'grain',
      label: 'Grain Texture',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Subtle film-grain noise overlay (matches the source design).' },
    },
    // ── Section head ────────────────────────────────────────────────────────────
    {
      name: 'eyebrow',
      label: 'Eyebrow',
      type: 'text',
      localized: true,
      admin: { description: 'Small uppercase label above the heading (e.g. "Choose your starting point").' },
    },
    {
      name: 'heading',
      label: 'Heading',
      type: 'richText',
      localized: true,
      editor: headingEditor,
      admin: { description: 'Section H2. Apply teal text color to a phrase for the accent (e.g. "One difference.").' },
    },
    {
      name: 'lede',
      label: 'Lede',
      type: 'richText',
      localized: true,
      editor: inlineEditor,
    },
    // ── Plan cards ────────────────────────────────────────────────────────────
    {
      name: 'planCards',
      label: 'Plan Cards',
      type: 'array',
      admin: { description: 'The pricing cards (e.g. Core and Advanced).' },
      fields: [
        {
          name: 'featured',
          label: 'Featured (dark) card',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'badge',
          label: 'Badge',
          type: 'text',
          localized: true,
          admin: { description: 'Optional lime flag at the top (e.g. "Most informed").' },
        },
        {
          name: 'name',
          label: 'Name',
          type: 'text',
          localized: true,
          required: true,
          admin: { description: 'e.g. "Core" / "Advanced".' },
        },
        {
          name: 'tag',
          label: 'Tagline',
          type: 'textarea',
          localized: true,
          admin: { description: 'Short description under the name.' },
        },
        {
          name: 'planFamily',
          label: 'Plan Family (live pricing)',
          type: 'select',
          options: [
            { label: 'Core', value: 'core' },
            { label: 'Advanced', value: 'advanced' },
          ],
          admin: {
            description:
              'Drives the live headline price (the 4-month rate, fetched from the subscriptions API). Leave empty to hide the price.',
          },
        },
        {
          name: 'monthly',
          label: 'Monthly Note',
          type: 'text',
          localized: true,
          admin: {
            description:
              'Pill under the price. Use a live-price token for any amount, e.g. "or {{price:core:1}}/mo month-to-month · cancel anytime". {{price:core:1}} = Core monthly (month=1); {{price:advanced:4}} = Advanced 4-month rate. Resolves to the visitor’s currency. Leave empty to keep an invisible spacer.',
          },
        },
        {
          name: 'commit',
          label: 'Commitment Note',
          type: 'textarea',
          localized: true,
          admin: {
            description:
              'e.g. "4 months is the minimum cycle…". Supports live-price tokens like {{price:core:1}}.',
          },
        },
        {
          name: 'listLabel',
          label: 'List Label',
          type: 'text',
          localized: true,
          admin: { description: 'e.g. "What\'s inside" / "Everything in Core, plus".' },
        },
        {
          name: 'listItems',
          label: 'List Items',
          type: 'array',
          fields: [
            {
              name: 'text',
              label: 'Text',
              type: 'text',
              localized: true,
              required: true,
            },
          ],
        },
        {
          name: 'ctaLabel',
          label: 'CTA Label',
          type: 'text',
          localized: true,
          admin: { description: 'e.g. "Start with Core".' },
        },
        {
          name: 'ctaUrl',
          label: 'CTA URL',
          type: 'text',
        },
        {
          name: 'ctaStyle',
          label: 'CTA Style',
          type: 'select',
          defaultValue: 'out',
          options: [
            { label: 'Outline', value: 'out' },
            { label: 'Lime CTA', value: 'cta' },
          ],
        },
      ],
    },
    // ── Comparison table ──────────────────────────────────────────────────────
    {
      name: 'showComparison',
      label: 'Show Comparison Table',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'comparison',
      label: 'Comparison Table',
      type: 'group',
      admin: {
        condition: (_, siblingData) => siblingData?.showComparison !== false,
      },
      fields: [
        {
          name: 'toggleLabelClosed',
          label: 'Toggle Label (collapsed)',
          type: 'text',
          localized: true,
          admin: { description: 'e.g. "Compare side by side".' },
        },
        {
          name: 'toggleLabelOpen',
          label: 'Toggle Label (expanded)',
          type: 'text',
          localized: true,
          admin: { description: 'e.g. "Hide full comparison".' },
        },
        // ── Rows are defined once here, grouped into sections ──────────────────
        {
          name: 'sections',
          labels: { singular: 'Comparison section', plural: 'Comparison sections' },
          type: 'array',
          admin: {
            description: 'Each section is a group header with its own rows underneath.',
          },
          fields: [
            {
              name: 'title',
              label: 'Comparison section Title',
              type: 'text',
              localized: true,
              admin: { description: 'e.g. "Diagnostics".' },
            },
            {
              name: 'rows',
              labels: { singular: 'Comparison Row', plural: 'Comparison Rows' },
              type: 'array',
              fields: [
                {
                  name: 'text',
                  label: 'Comparison Row',
                  type: 'text',
                  localized: true,
                  required: true,
                  admin: {
                    description: 'e.g. "Gut microbiome sequencing, shotgun, species-level".',
                  },
                },
                {
                  name: 'cell',
                  label: 'Cell type',
                  type: 'select',
                  defaultValue: 'checkbox',
                  options: [
                    { label: 'Checkbox cell', value: 'checkbox' },
                    { label: '1 line cell', value: 'oneLine' },
                    { label: '2 line cell', value: 'twoLine' },
                  ],
                  admin: {
                    description:
                      'Checkbox → ✓ / — per card. 1 line → one text value per card. 2 line → main value + smaller sub-line per card (e.g. "4-month min" + "or {{price:core:1}}/mo monthly"). Sub-line supports live-price tokens.',
                  },
                },
              ],
            },
          ],
        },
        // ── Each card is a column; tick which rows it includes ─────────────────
        {
          name: 'cards',
          labels: { singular: 'Comparison Card', plural: 'Comparison Cards' },
          type: 'array',
          admin: {
            description:
              'Each card is a column (e.g. Core, Advanced). Tick the rows this column includes.',
          },
          fields: [
            {
              name: 'label',
              label: 'Column Label',
              type: 'text',
              localized: true,
              admin: { description: 'e.g. "Core".' },
            },
            {
              name: 'planFamily',
              label: 'Column Plan Family (live pricing)',
              type: 'select',
              options: [
                { label: 'Core', value: 'core' },
                { label: 'Advanced', value: 'advanced' },
              ],
              admin: {
                description:
                  'Drives the live headline price for this column (the 4-month rate, fetched from the subscriptions API).',
              },
            },
            {
              name: 'highlight',
              label: 'Highlight column (tinted, like Advanced)',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'features',
              label: 'Included rows',
              type: 'json',
              localized: true,
              admin: {
                components: {
                  Field: {
                    path: '/blocks/yourPlanBlocks/Plans/CardFeatures',
                    exportName: 'CardFeatures',
                  },
                },
              },
            },
            {
              name: 'ctaLabel',
              label: 'Column CTA Label',
              type: 'text',
              localized: true,
              admin: { description: 'e.g. "Start with Core".' },
            },
            {
              name: 'ctaUrl',
              label: 'Column CTA URL',
              type: 'text',
            },
            {
              name: 'ctaStyle',
              label: 'CTA Style',
              type: 'select',
              defaultValue: 'out',
              options: [
                { label: 'Outline', value: 'out' },
                { label: 'Lime', value: 'lime' },
              ],
            },
          ],
        },
      ],
    },
    // ── Guarantee strip ─────────────────────────────────────────────────────────
    {
      name: 'guaranteeItems',
      label: 'Guarantee Items',
      type: 'array',
      maxRows: 3,
      admin: { description: 'Up to 3 reassurance items shown below the plans.' },
      fields: [
        {
          name: 'icon',
          label: 'Icon',
          type: 'select',
          defaultValue: 'clock',
          options: [
            { label: 'Clock (pay on production)', value: 'clock' },
            { label: 'Cycle arrow (four-month cycle)', value: 'cycle' },
            { label: 'Capsule (diagnostic included)', value: 'capsule' },
            { label: 'None', value: 'none' },
          ],
        },
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'body',
          label: 'Body',
          type: 'textarea',
          localized: true,
        },
      ],
    },
  ],
}
