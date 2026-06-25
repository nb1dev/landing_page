import type { Block } from 'payload'
import { inlineRichTextEditor } from '@/fields/headingLexical'

export const AthletesBlock: Block = {
  slug: 'athletesSection',
  interfaceName: 'AthletesSectionBlock',
  fields: [
    { name: 'quoteText', type: 'richText', localized: true, editor: inlineRichTextEditor },
    { name: 'quoteAttribution', type: 'richText', localized: true, editor: inlineRichTextEditor },
    { name: 'recordText', type: 'richText', localized: true, editor: inlineRichTextEditor },
    {
      name: 'athletes',
      type: 'array',
      fields: [
        { name: 'name', type: 'text' },
        { name: 'credential', type: 'text', localized: true },
        { name: 'photo', type: 'upload', relationTo: 'media' },
        { name: 'hasVideo', type: 'checkbox', defaultValue: false },
        {
          name: 'video',
          type: 'upload',
          relationTo: 'media',
          admin: { condition: (_, siblingData) => !!siblingData?.hasVideo },
        },
        { name: 'videoAriaLabel', type: 'text', localized: true },
        {
          name: 'subtitles',
          label: 'Subtitles (.vtt file)',
          type: 'upload',
          relationTo: 'media',
          admin: { condition: (_, siblingData) => !!siblingData?.hasVideo, description: 'Upload a .vtt subtitles file.' },
        },
      ],
    },
  ],
}
