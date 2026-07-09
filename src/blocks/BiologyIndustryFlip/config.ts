import type { Block } from 'payload'
import { makeHeadingEditor, inlineRichTextEditor } from '@/fields/headingLexical'

export const BiologyIndustryFlipBlock: Block = {
  slug: 'biologyIndustryFlip',
  interfaceName: 'BiologyIndustryFlipBlock',
  // Short dbName — see BiologyReadingToFormula for why: the default prefix
  // pushes nested array/locale index names past Postgres's 63-char limit.
  dbName: 'bif',
  labels: {
    singular: 'Biology: Industry Flip Cards',
    plural: 'Biology: Industry Flip Card Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'richText',
      localized: true,
      editor: makeHeadingEditor(['h2']),
      admin: {
        description: 'Italicize "identical?" (or the equivalent emphasized word) — the mockup renders italic text in teal here, matching the mockup emphasis.',
      },
    },
    { name: 'lede', type: 'textarea', localized: true },
    {
      name: 'stats',
      label: 'Flip Cards',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      admin: { description: 'Click/tap (or Enter/Space when focused) flips the card to reveal the back text.' },
      fields: [
        { name: 'number', type: 'text', required: true, localized: true, admin: { description: 'e.g. "€180B"' } },
        { name: 'unit', type: 'text', required: true, localized: true, admin: { description: 'e.g. "A year"' } },
        { name: 'tag', type: 'text', required: true, localized: true, admin: { description: 'e.g. "Why they don\'t change"' } },
        { name: 'frontText', type: 'textarea', required: true, localized: true },
        { name: 'backText', type: 'textarea', required: true, localized: true },
        { name: 'readMoreLabel', type: 'text', localized: true, defaultValue: 'Read more' },
        { name: 'backLabel', type: 'text', localized: true, defaultValue: 'Back' },
      ],
    },
    {
      name: 'closingText',
      type: 'richText',
      localized: true,
      editor: inlineRichTextEditor,
      admin: {
        description: 'Bold the opening clause; italicize the closing clause (renders teal), matching the mockup.',
      },
    },
  ],
}
