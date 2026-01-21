import type { Block } from 'payload'

export const TableOfContents: Block = {
  slug: 'tableOfContents',
  labels: { singular: 'Table of Contents', plural: 'Table of Contents' },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      defaultValue: 'Table of Contents',
    },
    {
      name: 'maxDepth',
      type: 'select',
      defaultValue: 'h3',
      options: [
        { label: 'H2 only', value: 'h2' },
        { label: 'H2 + H3', value: 'h3' },
      ],
    },
  ],
}
