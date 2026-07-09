import type { Block } from 'payload'
import { makeHeadingEditor } from '@/fields/headingLexical'

export const LabReadsBlock: Block = {
  slug: 'labReads',
  interfaceName: 'LabReadsBlock',
  labels: {
    singular: 'Lab: How We Read You',
    plural: 'Lab: How We Read You Blocks',
  },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true, admin: { description: 'e.g. "How we read you"' } },
    {
      name: 'heading',
      type: 'richText',
      localized: true,
      editor: makeHeadingEditor(['h2']),
      admin: {
        description: 'Apply "Brand Teal" color to the emphasized clause, matching the mockup.',
      },
    },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      fields: [
        {
          name: 'iconSvg',
          type: 'textarea',
          admin: { description: 'SVG path data inside viewBox="0 0 24 24"' },
        },
        { name: 'name', type: 'text', localized: true, required: true },
        {
          name: 'tag',
          type: 'text',
          localized: true,
          admin: { description: 'Optional pill next to the name, e.g. "The deep read"' },
        },
        { name: 'body', type: 'textarea', localized: true },
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
          admin: { description: 'Teal-tinted card with a thicker converge line (used for "Your gut")' },
        },
      ],
    },
    { name: 'formulaNodeLabel', type: 'text', localized: true, admin: { description: 'e.g. "Your formula"' } },
    { name: 'closingLeadIn', type: 'text', localized: true, admin: { description: 'e.g. "Nothing goes into your formula"' } },
    { name: 'closingEmphasis', type: 'text', localized: true, admin: { description: 'e.g. "without a reason."' } },
  ],
}
