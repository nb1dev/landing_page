import type { Block } from 'payload'

export const AuthorBox: Block = {
  slug: 'authorBox',
  labels: { singular: 'Author Box', plural: 'Author Boxes' },
  fields: [
    {
      name: 'overrideTitle',
      label: 'Title (optional)',
      type: 'text',
      localized: true,
    },
    {
      name: 'showAllAuthors',
      label: 'Show all post authors',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
