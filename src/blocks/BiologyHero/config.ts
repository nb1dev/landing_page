import type { Block } from 'payload'
import { makeHeadingEditor, inlineRichTextEditor } from '@/fields/headingLexical'

export const BiologyHeroBlock: Block = {
  slug: 'biologyHero',
  interfaceName: 'BiologyHeroBlock',
  labels: {
    singular: 'Biology: Hero + Scale',
    plural: 'Biology: Hero + Scale Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'richText',
      localized: true,
      editor: makeHeadingEditor(['h1']),
      admin: {
        description: 'Apply the "Brand Teal" text color to "more microbe", matching the mockup emphasis.',
      },
    },
    { name: 'subheading', type: 'textarea', localized: true },
    { name: 'ctaLabel', type: 'text', localized: true },
    { name: 'ctaUrl', type: 'text', localized: true, defaultValue: '/order-cold' },
    {
      name: 'proofText',
      type: 'richText',
      localized: true,
      editor: inlineRichTextEditor,
      admin: {
        description: 'Bold the "6-person science board" phrase, matching the mockup.',
      },
    },
    {
      name: 'proofAvatars',
      label: 'Proof Avatars',
      type: 'array',
      maxRows: 6,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'name', type: 'text', required: true },
      ],
    },
    {
      name: 'cardLabel',
      label: 'Card Label',
      type: 'text',
      localized: true,
      admin: { description: 'e.g. "Your genome, to scale"' },
    },
    { name: 'genomeValue', label: 'Genome Value', type: 'text', localized: true, admin: { description: 'e.g. "20,000 GENES"' } },
    { name: 'genomeLabel', label: 'Genome Label', type: 'text', localized: true, admin: { description: 'e.g. "YOUR GENOME"' } },
    { name: 'microbiomeValue', label: 'Microbiome Value', type: 'text', localized: true, admin: { description: 'e.g. "3.3 MILLION GENES"' } },
    { name: 'microbiomeLabel', label: 'Microbiome Label', type: 'text', localized: true, admin: { description: 'e.g. "YOUR GUT MICROBIOME"' } },
    {
      name: 'ratioTarget',
      label: 'Ratio Target',
      type: 'number',
      defaultValue: 165,
      admin: { description: 'The number the big stat counts up to, e.g. 165 (renders as "165 : 1").' },
    },
    { name: 'ratioCaption', label: 'Ratio Caption', type: 'textarea', localized: true },
  ],
}
