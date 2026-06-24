import type { Block } from 'payload'
import { makeHeadingEditor, inlineRichTextEditor } from '@/fields/headingLexical'
import { CURRENCIES } from '@/utilities/currency'


export const TheCaseBlock: Block = {
  slug: 'theCase',
  interfaceName: 'TheCaseBlock',
  fields: [
    {
      name: 'heading',
      type: 'richText',
      localized: true,
      editor: makeHeadingEditor(),
    },
    {
      name: 'lede',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'stats',
      type: 'array',
      fields: [
        {
          name: 'useCurrency',
          type: 'checkbox',
          label: 'Different value per currency',
          defaultValue: false,
          admin: {
            description:
              'On: enter the stat for each currency — visitors see it in their selected currency. Off: one value for everyone.',
          },
        },
        // Single value (when the per-currency toggle is OFF)
        {
          name: 'stat',
          type: 'text',
          label: 'Stat',
          admin: {
            condition: (_, sib) => !sib?.useCurrency,
            placeholder: '€180B',
          },
        },
        // One value per available currency (when the toggle is ON)
        ...CURRENCIES.map(([code, symbol, name]) => ({
          name: `stat${code}`,
          type: 'text' as const,
          label: `Stat (${code} — ${name})`,
          admin: {
            condition: (_: unknown, sib: { useCurrency?: boolean } | undefined) =>
              !!sib?.useCurrency,
            placeholder: `${symbol}180B`,
          },
        })),
        { name: 'unit', type: 'text', localized: true },
        { name: 'tag', type: 'text', localized: true },
        { name: 'frontBody', type: 'textarea', localized: true },
        { name: 'backBody', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'pivotHtml',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Closing paragraph. Supports <strong> and <em> tags.',
      },
    },
  ],
}
