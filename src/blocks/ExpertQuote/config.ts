import type { Block } from 'payload'

export const ExpertQuote: Block = {
  slug: 'expertQuote',
  labels: { singular: 'Expert Quote', plural: 'Expert Quotes' },
  fields: [
    { name: 'quote', type: 'textarea', required: true, localized: true },

    {
      name: 'expert',
      type: 'relationship',
      relationTo: 'authors',
      required: false,
      admin: { description: 'Select an Author to auto-fill name/avatar/credentials.' },
    },

    // Optional override (if no expert selected)
    { name: 'expertName', type: 'text' },
    { name: 'credentials', type: 'text' },
    { name: 'avatar', type: 'upload', relationTo: 'media' },
  ],
}
