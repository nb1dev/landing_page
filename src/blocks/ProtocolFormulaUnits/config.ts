import type { Block } from 'payload'
import { makeHeadingEditor } from '@/fields/headingLexical'

export const ProtocolFormulaUnitsBlock: Block = {
  slug: 'protocolFormulaUnits',
  interfaceName: 'ProtocolFormulaUnitsBlock',
  // Short dbName: two levels of nested arrays (parts -> units -> chips) push
  // the default prefix (pages_blocks_protocol_formula_units_...) well past
  // Postgres's 63-char identifier limit on the deepest locale index names.
  dbName: 'pfu',
  labels: {
    singular: 'Protocol: Formula Units (Tabs + Accordion)',
    plural: 'Protocol: Formula Units Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'richText',
      localized: true,
      editor: makeHeadingEditor(['h2']),
      admin: {
        description: 'Apply the "Brand Teal" text color to "unit by unit.", matching the mockup emphasis.',
      },
    },
    { name: 'lede', type: 'textarea', localized: true },
    {
      name: 'parts',
      label: 'Parts (tabs)',
      type: 'array',
      minRows: 3,
      maxRows: 3,
      admin: { description: 'Exactly 3: Activate, Restore, Nourish — order drives tab order.' },
      fields: [
        {
          name: 'key',
          label: 'Part Key (icon)',
          type: 'select',
          defaultValue: 'activate',
          options: [
            { label: 'Activate (sun)', value: 'activate' },
            { label: 'Restore (moon)', value: 'restore' },
            { label: 'Nourish (leaf)', value: 'nourish' },
          ],
        },
        { name: 'label', type: 'text', localized: true, required: true, admin: { description: 'e.g. "Activate"' } },
        { name: 'meta', type: 'text', localized: true, required: true, admin: { description: 'e.g. "Morning protocol · taken with your first meal."' } },
        {
          name: 'units',
          label: 'Units (accordion items)',
          type: 'array',
          minRows: 1,
          fields: [
            {
              name: 'icon',
              type: 'select',
              defaultValue: 'capsule',
              options: [
                { label: 'Capsule', value: 'capsule' },
                { label: 'Softgel', value: 'softgel' },
                { label: 'Prebiotic (bowl)', value: 'prebiotic' },
              ],
            },
            { name: 'name', type: 'text', localized: true, required: true, admin: { description: 'e.g. "Probiotic Capsule"' } },
            {
              name: 'tagVariant',
              label: 'Tag Variant',
              type: 'select',
              defaultValue: 'strains',
              options: [
                { label: 'Strains (teal)', value: 'strains' },
                { label: 'Fibres (green)', value: 'fibres' },
                { label: 'Vitamins (amber)', value: 'vitamins' },
                { label: 'Actives (purple)', value: 'actives' },
                { label: 'Conditional (outlined)', value: 'cond' },
              ],
            },
            { name: 'tagLabel', type: 'text', localized: true, required: true, admin: { description: 'e.g. "Live strains" or "Only if your reading calls for it"' } },
            { name: 'role', type: 'text', localized: true, required: true, admin: { description: 'e.g. "Live-culture strains, matched to your reading."' } },
            { name: 'count', type: 'text', localized: true, required: true, admin: { description: 'e.g. "from 19 strains" or "capsule · AM"' } },
            { name: 'defaultOpen', label: 'Default Open', type: 'checkbox', defaultValue: false },
            { name: 'description', type: 'textarea', localized: true, required: true },
            {
              name: 'chips',
              label: 'Ingredient Chips',
              type: 'array',
              minRows: 1,
              fields: [{ name: 'text', type: 'text', localized: true, required: true }],
            },
            { name: 'moreNote', label: 'More Note', type: 'text', localized: true, admin: { description: 'Optional, e.g. "+ 14 more in the library". Leave empty to omit.' } },
            { name: 'decideText', label: 'Decide Text', type: 'text', localized: true, required: true, admin: { description: 'e.g. "Which strains, and how many, is decided by your reading"' } },
          ],
        },
      ],
    },
  ],
}
