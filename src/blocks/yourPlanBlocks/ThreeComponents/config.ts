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

export const YpThreeComponentsBlock: Block = {
  slug: 'ypComponents',
  interfaceName: 'YpThreeComponentsBlock',
  labels: {
    singular: 'YP — Three Components',
    plural: 'YP — Three Components Sections',
  },
  fields: [
    // ── Appearance ────────────────────────────────────────────────────────────
    {
      name: 'backgroundColor',
      label: 'Background Color',
      type: 'select',
      defaultValue: 'paper',
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
      admin: { condition: (_, s) => s?.backgroundColor === 'custom' },
    },
    {
      name: 'backgroundType',
      label: 'Background Type',
      type: 'select',
      defaultValue: 'color',
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
      admin: { condition: (_, s) => s?.backgroundType === 'image' },
    },
    {
      name: 'grain',
      label: 'Grain Texture',
      type: 'checkbox',
      defaultValue: true,
    },
    // ── Section head ────────────────────────────────────────────────────────────
    {
      name: 'eyebrow',
      label: 'Eyebrow',
      type: 'text',
      localized: true,
      admin: { description: 'e.g. "What arrives at your door".' },
    },
    {
      name: 'heading',
      label: 'Heading',
      type: 'richText',
      localized: true,
      editor: headingEditor,
      admin: { description: 'Apply teal text color to a phrase for the accent.' },
    },
    {
      name: 'lede',
      label: 'Lede',
      type: 'richText',
      localized: true,
      editor: inlineEditor,
      admin: { description: 'Supporting paragraph. Bold a phrase to emphasise (e.g. "140+ ingredients").' },
    },
    {
      name: 'replacesPrefix',
      label: 'Replaces — Prefix',
      type: 'text',
      localized: true,
      admin: { description: 'e.g. "One subscription, in place of".' },
    },
    {
      name: 'replacesItems',
      label: 'Replaces — Items',
      type: 'array',
      admin: { description: 'Struck-through pills (e.g. greens powder, probiotic…).' },
      fields: [{ name: 'text', type: 'text', localized: true, required: true }],
    },
    // ── Product image (floating render) ──────────────────────────────────────────
    {
      name: 'image',
      label: 'Product Image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Kit render shown on the left (floats with a 3D tilt).' },
    },
    // ── Tabs / components ─────────────────────────────────────────────────────────
    {
      name: 'components',
      labels: { singular: 'Component (tab)', plural: 'Components (tabs)' },
      type: 'array',
      admin: {
        description: 'Each entry is a tab (e.g. Activate, Restore, Nourish). Tabs auto-advance until clicked.',
      },
      fields: [
        {
          name: 'tabLabel',
          label: 'Tab Label',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'icon',
          label: 'Tab Icon',
          type: 'select',
          defaultValue: 'sun',
          options: [
            { label: 'Sun (Activate)', value: 'sun' },
            { label: 'Moon (Restore)', value: 'moon' },
            { label: 'Shield (Nourish)', value: 'shield' },
            { label: 'None', value: 'none' },
          ],
        },
        {
          name: 'intro',
          label: 'Intro',
          type: 'text',
          localized: true,
          admin: { description: 'e.g. "Morning protocol · taken with your first meal".' },
        },
        // Lead item (highlighted, with "why this dose" + chips)
        {
          name: 'lead',
          label: 'Lead Item',
          type: 'group',
          admin: { description: 'Optional featured item with a "why" note and ingredient chips.' },
          fields: [
            { name: 'name', label: 'Name', type: 'text', localized: true, admin: { description: 'e.g. "Probiotic Capsule".' } },
            { name: 'dose', label: 'Dose', type: 'text', localized: true, admin: { description: 'e.g. "5 strains · AM".' } },
            { name: 'readLabel', label: 'Why — Label', type: 'text', localized: true, admin: { description: 'e.g. "Why it\'s in Leonardo\'s formula".' } },
            {
              name: 'readBody',
              label: 'Why — Body',
              type: 'richText',
              localized: true,
              editor: inlineEditor,
              admin: { description: 'Bold a phrase to highlight it in teal.' },
            },
            {
              name: 'chips',
              label: 'Chips',
              type: 'array',
              fields: [
                { name: 'bold', label: 'Text', type: 'text', localized: true, required: true },
              ],
            },
          ],
        },
        // Plain rows
        {
          name: 'rows',
          label: 'Rows',
          type: 'array',
          admin: { description: 'Simple name + dose rows. Mark "Excluded" for left-out items.' },
          fields: [
            { name: 'name', label: 'Name', type: 'text', localized: true, required: true },
            { name: 'dose', label: 'Dose', type: 'text', localized: true },
            { name: 'excluded', label: 'Excluded (struck-through)', type: 'checkbox', defaultValue: false },
          ],
        },
        {
          name: 'exNote',
          label: 'Exclusion Note',
          type: 'textarea',
          localized: true,
          admin: { description: 'Optional note shown with a ✕ icon (e.g. why something was left out).' },
        },
      ],
    },
  ],
}
