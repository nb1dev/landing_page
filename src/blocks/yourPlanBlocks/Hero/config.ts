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
    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2'] }),
  ],
})

const inlineEditor = lexicalEditor({
  features: ({ rootFeatures }) => [
    ...rootFeatures,
    FixedToolbarFeature(),
    InlineToolbarFeature(),
  ],
})

export const YpHeroBlock: Block = {
  slug: 'ypHero',
  interfaceName: 'YpHeroBlock',
  labels: {
    singular: 'YP — Hero',
    plural: 'YP — Heroes',
  },
  fields: [
    // ── Appearance ────────────────────────────────────────────────────────────
    {
      name: 'backgroundColor',
      label: 'Background Color',
      type: 'select',
      defaultValue: 'paper',
      admin: {
        description: 'Background color for the hero section.',
      },
      options: [
        { label: 'Paper / White (#FFFFFF)', value: 'paper' },
        { label: 'Cool Light (#F1F4F7)', value: 'off' },
        { label: 'Cream (#FAF8F2)', value: 'cream' },
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
      admin: {
        description: 'Choose whether the hero uses a color or a background image.',
      },
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
        description: 'Image shown behind the hero (only used when Background Type is "Image").',
        condition: (_, siblingData) => siblingData?.backgroundType === 'image',
      },
    },
    {
      name: 'grain',
      label: 'Grain Texture',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Subtle film-grain noise overlay (matches the source design).',
      },
    },
    // ── Copy ──────────────────────────────────────────────────────────────────
    {
      name: 'heading',
      label: 'Heading',
      type: 'richText',
      localized: true,
      required: true,
      editor: headingEditor,
      admin: {
        description: 'Main H1. Apply teal text color to a word/phrase for the accent (e.g. "your biology").',
      },
    },
    {
      name: 'description',
      label: 'Description (lede)',
      type: 'richText',
      localized: true,
      editor: inlineEditor,
    },
    // ── Call to action ──────────────────────────────────────────────────────────
    {
      name: 'primaryButton',
      label: 'Primary Button',
      type: 'group',
      fields: [
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          localized: true,
          admin: { description: 'e.g. "Order your kit".' },
        },
        {
          name: 'url',
          label: 'URL',
          type: 'text',
          admin: { description: 'Destination link for the primary CTA.' },
        },
      ],
    },
    {
      name: 'secondaryLink',
      label: 'Secondary Link',
      type: 'group',
      fields: [
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          localized: true,
          admin: { description: 'e.g. "See what arrives" (a → arrow is appended automatically).' },
        },
        {
          name: 'url',
          label: 'URL',
          type: 'text',
          localized: true,
          admin: { description: 'Destination link/anchor for the secondary link (e.g. "#components").' },
        },
      ],
    },
    // ── Science board strip ─────────────────────────────────────────────────────
    {
      name: 'boardFaces',
      label: 'Board Faces',
      type: 'array',
      maxRows: 6,
      admin: {
        description: 'Overlapping circular portraits shown in the board strip.',
      },
      fields: [
        {
          name: 'image',
          label: 'Portrait',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'boardCopy',
      label: 'Board Copy',
      type: 'text',
      localized: true,
      admin: { description: 'Bold line, e.g. "Each formula reviewed by our science board".' },
    },
    {
      name: 'boardSubCopy',
      label: 'Board Sub-copy',
      type: 'text',
      localized: true,
      admin: {
        description: 'Lighter line below, e.g. "Six researchers · human sign-off before manufacture".',
      },
    },
    // ── Visual ────────────────────────────────────────────────────────────────
    {
      name: 'image',
      label: 'Hero Image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Large image on the right (still life / product render).' },
    },
  ],
}
