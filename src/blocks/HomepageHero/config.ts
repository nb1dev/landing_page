import type { Block } from 'payload'
import { makeHeadingEditor, inlineRichTextEditor } from '@/fields/headingLexical'


export const HomepageHeroBlock: Block = {
  slug: 'homepageHero',
  interfaceName: 'HomepageHeroBlock',
  fields: [
    {
      name: 'heading',
      type: 'richText',
      localized: true,
      editor: makeHeadingEditor(),
    },
    {
      name: 'subheading',
      type: 'text',
      localized: true,
    },
    {
      name: 'ctaLabel',
      type: 'text',
      localized: true,
    },
    {
      name: 'ctaHref',
      type: 'text',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'backgroundImageMobile',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'trustItems',
      type: 'array',
      fields: [
        {
          name: 'text',
          type: 'text',
          localized: true,
        },
        {
          name: 'showStars',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ],
}
