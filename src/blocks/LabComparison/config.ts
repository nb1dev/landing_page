import type { Block } from 'payload'
import { makeHeadingEditor } from '@/fields/headingLexical'

export const LabComparisonBlock: Block = {
  slug: 'labComparison',
  interfaceName: 'LabComparisonBlock',
  labels: {
    singular: 'Lab: Comparison',
    plural: 'Lab: Comparison Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'richText',
      localized: true,
      editor: makeHeadingEditor(['h2']),
      admin: { description: 'Apply "Brand Teal" color to the emphasized clause, matching the mockup.' },
    },
    { name: 'intro', type: 'textarea', localized: true },
    { name: 'hintText', type: 'text', localized: true, admin: { description: 'e.g. "⚡ Tap a glowing microbe to see its job"' } },

    { name: 'leftTag', type: 'text', localized: true, admin: { description: 'e.g. "Almost every gut test"' } },
    { name: 'leftName', type: 'text', localized: true, admin: { description: 'e.g. "Who’s there"' } },
    { name: 'leftMethod', type: 'text', admin: { description: 'e.g. "16S rRNA" (technical term, not localized)' } },

    { name: 'rightTag', type: 'text', localized: true, admin: { description: 'e.g. "Our method"' } },
    { name: 'rightName', type: 'text', localized: true, admin: { description: 'e.g. "What each one can do"' } },
    { name: 'rightMethod', type: 'text', admin: { description: 'e.g. "SHOTGUN SEQUENCING" (technical term, not localized)' } },

    {
      name: 'legend',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'color', type: 'text', admin: { description: 'Hex color, or leave empty + set dashed=true for "Missing"' } },
        { name: 'dashed', type: 'checkbox', defaultValue: false },
      ],
    },

    {
      name: 'nodes',
      type: 'array',
      minRows: 3,
      maxRows: 3,
      admin: { description: 'The 3 tappable microbes on the "our method" figure, in order.' },
      fields: [
        { name: 'name', type: 'text', required: true, admin: { description: 'Species name (Latin binomial, not localized)' } },
        { name: 'job', type: 'textarea', localized: true },
        {
          name: 'status',
          type: 'select',
          required: true,
          options: [
            { label: 'Active', value: 'Active' },
            { label: 'Low', value: 'Low' },
            { label: 'Missing', value: 'Missing' },
          ],
        },
      ],
    },

    { name: 'knowLeftLabel', type: 'text', localized: true, admin: { description: 'e.g. "16S tells you, per microbe"' } },
    { name: 'knowLeftValue', type: 'textarea', localized: true },
    { name: 'knowRightLabel', type: 'text', localized: true, admin: { description: 'e.g. "We tell you, per microbe"' } },
    { name: 'knowRightValue', type: 'textarea', localized: true },

    { name: 'closingLeadIn', type: 'text', localized: true },
    { name: 'closingEmphasis', type: 'text', localized: true },
    { name: 'closingTail', type: 'text', localized: true },
  ],
}
