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
  { label: 'White (#FFFFFF — light version)', value: 'white' },
  { label: 'Cream Gradient (dark version)', value: 'creamGradient' },
  { label: 'Custom', value: 'custom' },
]

export const ReserveCtaBlock: Block = {
  slug: 'reserveCta',
  interfaceName: 'ReserveCtaBlock',
  labels: {
    singular: 'Reserve CTA',
    plural: 'Reserve CTAs',
  },
  fields: [
    // ── Appearance ─────────────────────────────────────────────────────────────
    {
      name: 'backgroundColor',
      label: 'Background Color',
      type: 'select',
      defaultValue: 'white',
      options: bgOptions,
      admin: {
        description:
          '"White" → light version (form appears in a teal card). "Cream Gradient" → dark version (no form card, white form row).',
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

    // ── Content ─────────────────────────────────────────────────────────────────
    {
      name: 'pillText',
      label: 'Pill Text',
      type: 'text',
      localized: true,
      admin: { description: 'Animated badge above the heading. e.g. "Phase 1 · 1,000 kits".' },
    },
    {
      name: 'heading',
      label: 'Heading',
      type: 'richText',
      localized: true,
      editor: headingEditor,
      admin: {
        description: 'Main heading. Use teal text color for italic highlighted spans.',
      },
    },
    {
      name: 'subText',
      label: 'Sub Text',
      type: 'text',
      localized: true,
      admin: {
        description: 'Body text under the heading. e.g. "Phase 1 closes when 1,000 are claimed."',
      },
    },

    // ── Form ────────────────────────────────────────────────────────────────────
    {
      name: 'form',
      label: 'Form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      admin: { description: 'Select the Form Builder form to render (typically email-only).' },
    },
    {
      name: 'ctaButtonText',
      label: 'CTA Button Text',
      type: 'text',
      localized: true,
      admin: { description: 'Submit button label. e.g. "Reserve my kit →".' },
    },
    {
      name: 'footNoteText',
      label: 'Form Footer — Plain Text',
      type: 'text',
      localized: true,
      admin: { description: 'Plain portion of the form footer. e.g. "From €99/month".' },
    },
    {
      name: 'footNoteHighlight',
      label: 'Form Footer — Highlighted Text',
      type: 'text',
      localized: true,
      admin: { description: 'Teal-highlighted portion (shown after "·"). e.g. "Diagnostic included."' },
    },
    {
      name: 'successMessage',
      label: 'Success Message',
      type: 'text',
      localized: true,
      admin: {
        description:
          'Body of the success message after submission. Default: "Your kit ships two weeks before public launch."',
      },
    },

    // ── Recap strip ─────────────────────────────────────────────────────────────
    {
      name: 'recapItems',
      label: 'Recap Items',
      type: 'array',
      admin: { description: 'Checkmark items shown below the form. e.g. "Diagnostic included".' },
      fields: [
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          localized: true,
          required: true,
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
          name: 'pillText',
          label: 'Pill Text Override',
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
          name: 'subText',
          label: 'Sub Text Override',
          type: 'text',
          localized: true,
        },
        {
          name: 'ctaButtonText',
          label: 'CTA Button Text Override',
          type: 'text',
          localized: true,
        },
      ],
    },
  ],
}
