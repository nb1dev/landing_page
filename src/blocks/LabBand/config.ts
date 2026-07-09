import type { Block } from 'payload'
import { makeHeadingEditor } from '@/fields/headingLexical'

export const LabBandBlock: Block = {
  slug: 'labBand',
  interfaceName: 'LabBandBlock',
  labels: {
    singular: 'Lab: Cinematic Band',
    plural: 'Lab: Cinematic Band Blocks',
  },
  fields: [
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'heading',
      type: 'richText',
      localized: true,
      editor: makeHeadingEditor(['h2']),
      admin: { description: 'Apply "Brand Teal" color to the emphasized clause, matching the mockup.' },
    },
  ],
}
