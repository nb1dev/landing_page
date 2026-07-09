import type { Block } from 'payload'
import { makeHeadingEditor } from '@/fields/headingLexical'

export const LabHeroBlock: Block = {
  slug: 'labHero',
  interfaceName: 'LabHeroBlock',
  labels: {
    singular: 'Lab Hero',
    plural: 'Lab Hero Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'richText',
      localized: true,
      editor: makeHeadingEditor(['h1']),
      admin: {
        description: 'Apply the "Brand Teal" text color to the second sentence to match the mockup emphasis.',
      },
    },
    { name: 'subheading', type: 'textarea', localized: true },
    { name: 'ctaLabel', type: 'text', localized: true },
    { name: 'ctaUrl', type: 'text', localized: true },
    {
      name: 'trustLeadIn',
      label: 'Trust line lead-in',
      type: 'text',
      localized: true,
      admin: { description: 'e.g. "Built by our own science board:"' },
    },
    {
      name: 'trustFaces',
      label: 'Trust board members',
      type: 'array',
      maxRows: 6,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'name', type: 'text', required: true },
        {
          name: 'affiliation',
          type: 'text',
          localized: true,
          admin: { description: 'Optional, e.g. "TU Munich"' },
        },
      ],
    },
    { name: 'trustLinkLabel', type: 'text', localized: true },
    { name: 'trustLinkUrl', type: 'text', localized: true },
  ],
}
