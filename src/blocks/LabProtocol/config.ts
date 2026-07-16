import type { Block } from 'payload'
import { makeHeadingEditor, inlineRichTextEditor } from '@/fields/headingLexical'

export const LabProtocolBlock: Block = {
  slug: 'labProtocol',
  interfaceName: 'LabProtocolBlock',
  labels: {
    singular: 'Lab: What You Take',
    plural: 'Lab: What You Take Blocks',
  },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true, admin: { description: 'e.g. "What you actually take"' } },
    {
      name: 'heading',
      type: 'richText',
      localized: true,
      editor: makeHeadingEditor(['h2']),
      admin: { description: 'Apply "Brand Teal" color to the emphasized clause, matching the mockup.' },
    },
    { name: 'lede', type: 'textarea', localized: true },

    { name: 'driverLabel', type: 'text', localized: true, admin: { description: 'e.g. "What drives your formula"' } },
    { name: 'driverGutLabel', type: 'text', localized: true, admin: { description: 'e.g. "Your gut"' } },
    { name: 'driverGutNote', type: 'text', localized: true, admin: { description: 'e.g. "about two-thirds"' } },
    { name: 'driverRestLabel', type: 'text', localized: true, admin: { description: 'e.g. "the rest"' } },
    { name: 'driverIntakeLabel', type: 'text', localized: true, admin: { description: 'e.g. "Your intake"' } },
    { name: 'driverGutPercent', type: 'number', required: true, min: 0, max: 100, defaultValue: 65, admin: { description: 'Width % of the gut segment; the rest fills the intake segment.' } },

    {
      name: 'layers',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      fields: [
        { name: 'iconSvg', type: 'textarea', admin: { description: 'SVG path data inside viewBox="0 0 24 24"' } },
        { name: 'sourceLabel', type: 'text', localized: true, admin: { description: 'e.g. "From your gut"' } },
        { name: 'name', type: 'text', localized: true, required: true },
        { name: 'body', type: 'textarea', localized: true },
        {
          name: 'chips',
          type: 'array',
          fields: [{ name: 'label', type: 'text', required: true, localized: true }],
        },
        { name: 'hasMoreChip', type: 'checkbox', defaultValue: false },
        { name: 'badgeLabel', type: 'text', localized: true, admin: { description: 'e.g. "Every plan" or "Advanced"' } },
        {
          name: 'badgeVariant',
          type: 'select',
          defaultValue: 'plan',
          options: [
            { label: 'Plan (neutral)', value: 'plan' },
            { label: 'Advanced (gold)', value: 'advanced' },
          ],
        },
        {
          name: 'highlighted',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'Gold-tinted card border (used for the Advanced-only layer)' },
        },
      ],
    },

    {
      name: 'closingText',
      type: 'richText',
      localized: true,
      editor: inlineRichTextEditor,
      admin: { description: 'Bold the closing clause, e.g. "...**That\'s the rule: nothing goes in without a reason.**"' },
    },
  ],
}
