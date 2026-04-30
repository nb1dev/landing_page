import type { Block } from 'payload'

export const StatBreakBlock: Block = {
  slug: 'statBreak',
  interfaceName: 'StatBreakBlock',
  labels: {
    singular: 'Stat Break',
    plural: 'Stat Breaks',
  },
  fields: [
    // ── Appearance ─────────────────────────────────────────────────────────────
    {
      name: 'backgroundColor',
      label: 'Background Color',
      type: 'select',
      defaultValue: 'dark',
      admin: { description: 'Background colour for the section.' },
      options: [
        { label: 'Dark Navy (#12314D)', value: 'dark' },
        { label: 'Deeper Navy (#0e2640)', value: 'darkNavy' },
        { label: 'Teal', value: 'teal' },
        { label: 'White', value: 'white' },
        { label: 'Cream (warm off-white)', value: 'cream' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    {
      name: 'backgroundColorCustom',
      label: 'Custom Background Color (hex)',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.backgroundColor === 'custom',
      },
    },
    // ── Stat number ────────────────────────────────────────────────────────────
    {
      name: 'statNumber',
      label: 'Stat Number',
      
      type: 'text',
      required: true,
      localized: true,
      admin: { description: 'The large teal number, e.g. "150".' },
    },
    {
      name: 'statSuffix',
      label: 'Stat Suffix',
      type: 'text',
      localized: true,
      admin: { description: 'Symbol shown smaller after the number, e.g. "×" or "%".' },
    },
    // ── Heading ────────────────────────────────────────────────────────────────
    {
      name: 'headingLine1',
      label: 'Heading — Line 1',
      type: 'text',
      localized: true,
      admin: {
        description: 'First line of the heading, e.g. "more genetic material than your DNA."',
      },
    },
    {
      name: 'headingLine2',
      label: 'Heading — Line 2 (before highlighted word)',
      type: 'text',
      localized: true,
      admin: {
        description: 'Second line before the highlighted word, e.g. "All of it in your".',
      },
    },
    {
      name: 'highlightedWord',
      label: 'Highlighted Word',
      type: 'text',
      localized: true,
      admin: {
        description: 'Large teal word, e.g. "gut". Rendered larger and in accent colour.',
      },
    },
    {
      name: 'headingAfter',
      label: 'Text After Highlighted Word',
      type: 'text',
      localized: true,
      admin: { description: 'Optional punctuation or text after the word, e.g. ".".' },
    },
  ],
}
