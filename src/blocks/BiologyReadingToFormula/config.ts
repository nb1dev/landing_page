import type { Block } from 'payload'
import { makeHeadingEditor } from '@/fields/headingLexical'

export const BiologyReadingToFormulaBlock: Block = {
  slug: 'biologyReadingToFormula',
  interfaceName: 'BiologyReadingToFormulaBlock',
  // Short dbName: the default (pages_blocks_biology_reading_to_formula_...)
  // pushed several nested array/locale table + index names past Postgres's
  // 63-char identifier limit, where truncation silently collided different
  // identifiers with each other. This prefix cascades to every nested table.
  dbName: 'brf',
  labels: {
    singular: 'Biology: Reading to Formula',
    plural: 'Biology: Reading to Formula Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'richText',
      localized: true,
      editor: makeHeadingEditor(['h2']),
      admin: {
        description: 'Apply "Brand Teal" color to "The formula is built around it.", matching the mockup emphasis.',
      },
    },
    { name: 'lede', type: 'textarea', localized: true },

    { name: 'readingTitle', type: 'text', localized: true, defaultValue: "Who's living in your gut" },
    { name: 'readingSubtitle', type: 'text', localized: true, defaultValue: 'Read from your sample, not a textbook.' },

    { name: 'bloodTitle', type: 'text', localized: true, defaultValue: 'Add your bloodwork' },
    { name: 'bloodBadge', type: 'text', localized: true, defaultValue: 'Advanced' },
    { name: 'bloodSubtitle', type: 'text', localized: true, defaultValue: "Things your gut sample can't show on its own." },
    { name: 'bloodNotePrefix', type: 'text', localized: true, defaultValue: 'Bloodwork adds to your reading on' },
    { name: 'bloodNoteBadge', type: 'text', localized: true, defaultValue: 'Advanced' },
    { name: 'bloodNoteSuffix', type: 'text', localized: true, defaultValue: 'wellness insights, not a medical diagnosis' },
    { name: 'bloodMeasuredLabel', type: 'text', localized: true, defaultValue: 'measured' },

    {
      name: 'signals',
      label: 'Signals',
      type: 'array',
      minRows: 1,
      admin: {
        description:
          'Each signal reveals in sequence, then emits its formula component(s) into the "Building your formula" card. Gut signals go in the top card; blood signals (Advanced) go in the bloodwork card and only show a name — no bar/pill.',
      },
      fields: [
        {
          name: 'kind',
          type: 'select',
          required: true,
          defaultValue: 'gut',
          enumName: 'enum_brf_signal_kind',
          options: [
            { label: 'Gut reading', value: 'gut' },
            { label: 'Bloodwork (Advanced)', value: 'blood' },
          ],
        },
        {
          name: 'gutName',
          label: 'Gut Signal Name',
          type: 'text',
          localized: true,
          admin: { condition: (_, siblingData) => siblingData?.kind === 'gut', description: 'e.g. "The fibre feeders"' },
        },
        {
          name: 'gutSub',
          label: 'Gut Signal Sub-line',
          type: 'text',
          localized: true,
          admin: { condition: (_, siblingData) => siblingData?.kind === 'gut' },
        },
        {
          name: 'pillLabel',
          type: 'text',
          localized: true,
          admin: { condition: (_, siblingData) => siblingData?.kind === 'gut', description: 'e.g. "running low"' },
        },
        {
          name: 'pillVariant',
          type: 'select',
          defaultValue: 'low',
          enumName: 'enum_brf_pill_variant',
          options: [
            { label: 'Low (gold)', value: 'low' },
            { label: 'In range (teal)', value: 'ok' },
          ],
          admin: { condition: (_, siblingData) => siblingData?.kind === 'gut' },
        },
        {
          name: 'fillPercent',
          type: 'number',
          min: 0,
          max: 100,
          admin: { condition: (_, siblingData) => siblingData?.kind === 'gut' },
        },
        {
          name: 'bloodName',
          label: 'Bloodwork Signal Name',
          type: 'text',
          localized: true,
          admin: { condition: (_, siblingData) => siblingData?.kind === 'blood', description: 'e.g. "Your omega-3 levels"' },
        },
        {
          name: 'outputs',
          label: 'Formula Outputs',
          type: 'array',
          admin: { description: 'Component(s) this signal adds to the formula card. Leave empty if this signal only produces the "hold" note below.' },
          fields: [
            { name: 'name', type: 'text', required: true, localized: true },
            { name: 'dose', type: 'text', required: true, localized: true },
          ],
        },
        {
          name: 'holdLabel',
          label: 'Hold Row Label',
          type: 'text',
          localized: true,
          admin: { description: 'e.g. "Protein fermentation" — shown instead of a normal output when this signal is balanced, not added to.' },
        },
        {
          name: 'holdText',
          label: 'Hold Row Text',
          type: 'text',
          localized: true,
          admin: { description: 'e.g. "balanced by your fibre. Nothing added."' },
        },
      ],
    },

    { name: 'supportDividerLabel', type: 'text', localized: true, defaultValue: 'Rounding out your protocol' },
    {
      name: 'supportItems',
      label: 'Support Components',
      type: 'array',
      admin: { description: 'Always-included components added after the signal-driven ones (e.g. "Morning Wellness Capsule").' },
      fields: [
        { name: 'name', type: 'text', required: true, localized: true },
        { name: 'dose', type: 'text', required: true, localized: true },
      ],
    },
    { name: 'moreLabel', type: 'text', localized: true, defaultValue: '+ tuned across your full formula' },
    { name: 'moreDetail', type: 'text', localized: true, defaultValue: 'from 125+ library' },

    { name: 'formulaTitle', type: 'text', localized: true, defaultValue: 'Building your formula' },
    { name: 'formulaEmptyText', type: 'text', localized: true, defaultValue: 'Waiting on your reading…' },
    { name: 'formulaLinkLabel', type: 'text', localized: true, defaultValue: 'See how we build your formula →' },
    { name: 'formulaLinkUrl', type: 'text', localized: true, defaultValue: '/the-protocol' },

    { name: 'captionText', type: 'text', localized: true },
  ],
}
