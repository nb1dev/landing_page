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
    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
  ],
})
const inlineEditor = lexicalEditor({
  features: ({ rootFeatures }) => [
    ...rootFeatures,
    FixedToolbarFeature(),
    InlineToolbarFeature(),
    TextColorFeature(),
  ],
})

export const HeroBannerBlock: Block = {
  slug: 'heroBanner',
  interfaceName: 'HeroBannerBlock',
  labels: {
    singular: 'Hero Banner',
    plural: 'Hero Banners',
  },
  fields: [
    // ── Appearance ────────────────────────────────────────────────────────────
    {
      name: 'backgroundColor',
      label: 'Background Color',
      type: 'select',
      defaultValue: 'light',
      admin: {
        description: 'Background color for the hero inner container.',
      },
      options: [
        { label: 'Light Gradient (default)', value: 'light' },
        { label: 'Dark (#0a1e35)', value: 'dark' },
        { label: 'Dark Navy (#0e2640)', value: 'darkNavy' },
        { label: 'Teal', value: 'teal' },
        { label: 'White', value: 'white' },
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
        description: 'Choose whether the hero uses a color/gradient or a background image.',
      },
      options: [
        { label: 'Color / Gradient', value: 'color' },
        { label: 'Image', value: 'image' },
      ],
    },
    {
      name: 'backgroundImage',
      label: 'Background Image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Image shown behind the hero. A dark gradient overlay is applied automatically.',
        condition: (_, siblingData) => siblingData?.backgroundType === 'image',
      },
    },
    // ── Hero section ──────────────────────────────────────────────────────────
    {
      name: 'pillText',
      label: 'Pill Text',
      type: 'richText',
      localized: true,
      editor: inlineEditor,
      admin: {
        description:
          'Badge above the heading — supports text color (e.g. "Phase 1 · Limited to 1,000 kits").',
      },
    },
    {
      name: 'heading',
      label: 'Heading',
      type: 'richText',
      localized: true,
      required: true,
      editor: headingEditor,
    },
    {
      name: 'pricePrefix',
      label: 'Price Prefix',
      type: 'text',
      localized: true,
      admin: { description: 'Text before the price amount (e.g. "From").' },
    },
    {
      name: 'price',
      label: 'Price',
      type: 'text',
      admin: { description: 'Price shown in accent style (e.g. "€99/month").' },
    },
    {
      name: 'priceSuffix',
      label: 'Price Suffix',
      type: 'text',
      localized: true,
      admin: { description: 'Text after the price amount (e.g. ". Diagnostic included.").' },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'richText',
      localized: true,
      editor: inlineEditor,
    },
    {
      name: 'form',
      label: 'Form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      admin: { description: 'Select the Form Builder form to render.' },
    },
    {
      name: 'ctaButtonText',
      label: 'CTA Button Text',
      type: 'text',
      localized: true,
      admin: {
        description: 'Submit button label override (e.g. "Reserve my kit →").',
      },
    },
    {
      name: 'launchDate',
      label: 'Launch Date Text',
      type: 'text',
      localized: true,
      admin: { description: 'Highlighted text in the form footer (e.g. "Launching May 15").' },
    },
    {
      name: 'formFootNote',
      label: 'Form Foot Note',
      type: 'text',
      localized: true,
      admin: { description: 'Additional text shown below the form row.' },
    },
    {
      name: 'successMessage',
      label: 'Success Message',
      type: 'text',
      localized: true,
      admin: { description: 'Message displayed after a successful form submission.' },
    },
    {
      name: 'trustItems',
      label: 'Trust Items',
      type: 'array',
      admin: { description: 'Checkmark trust signals shown below the form.' },
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },
    // ── Outcomes section ──────────────────────────────────────────────────────
    {
      name: 'outcomesHeading',
      label: 'Outcomes Heading',
      type: 'text',
      localized: true,
      admin: {
        description: 'Title for the outcomes section (e.g. "What you\'ll feel — within 16 weeks").',
      },
    },
    {
      name: 'outcomes',
      label: 'Outcomes',
      type: 'array',
      fields: [
        {
          name: 'icon',
          label: 'Icon',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'claim',
          label: 'Claim',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'anchor',
          label: 'Anchor Text',
          type: 'text',
          localized: true,
        },
      ],
    },
    {
      name: 'outcomesFooter',
      label: 'Outcomes Footer',
      type: 'text',
      localized: true,
      admin: { description: 'Text at the bottom of the outcomes section.' },
    },
    // ── A/B testing variants ──────────────────────────────────────────────────
    {
      name: 'variants',
      label: 'A/B Variants',
      type: 'array',
      admin: {
        description:
          'Each entry overrides content when ?v=<key> is present in the URL. Leave override fields empty to fall back to the defaults above.',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'variantKey',
          label: 'Variant Key',
          type: 'text',
          required: true,
          admin: { description: 'Value matched against ?v=. Example: "b".' },
        },
        {
          name: 'backgroundColor',
          label: 'Background Color Override',
          type: 'select',
          options: [
            { label: 'Light Gradient', value: 'light' },
            { label: 'Dark', value: 'dark' },
            { label: 'Dark Navy', value: 'darkNavy' },
            { label: 'Teal', value: 'teal' },
            { label: 'White', value: 'white' },
            { label: 'Custom', value: 'custom' },
          ],
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
          name: 'backgroundType',
          label: 'Background Type Override',
          type: 'select',
          options: [
            { label: 'Color / Gradient', value: 'color' },
            { label: 'Image', value: 'image' },
          ],
        },
        {
          name: 'backgroundImage',
          label: 'Background Image Override',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (_, siblingData) => siblingData?.backgroundType === 'image',
          },
        },
        {
          name: 'pillText',
          label: 'Pill Text Override',
          type: 'richText',
          localized: true,
          editor: inlineEditor,
        },
        {
          name: 'heading',
          label: 'Heading Override',
          type: 'richText',
          localized: true,
          editor: headingEditor,
        },
        {
          name: 'description',
          label: 'Description Override',
          type: 'richText',
          localized: true,
          editor: inlineEditor,
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
