import type { Block } from 'payload'
import { makeHeadingEditor, inlineRichTextEditor } from '@/fields/headingLexical'

export const OutcomesBlock: Block = {
  slug: 'outcomes',
  interfaceName: 'OutcomesBlock',
  fields: [
    { name: 'heading', type: 'richText', localized: true, editor: makeHeadingEditor() },
    { name: 'subheading', type: 'textarea', localized: true },
    { name: 'gaugeScore', type: 'text' },
    { name: 'gaugeMax', type: 'text' },
    { name: 'gaugeLabel', type: 'text', localized: true },
    { name: 'deltaLabel', type: 'text', localized: true },
    { name: 'deltaFrom', type: 'text', localized: true },
    { name: 'builtInText', type: 'richText', localized: true, editor: inlineRichTextEditor },
    { name: 'feltText', type: 'richText', localized: true, editor: inlineRichTextEditor },
    {
      name: 'cards',
      type: 'array',
      fields: [
        { name: 'category', type: 'text', localized: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'frontTitle', type: 'text', localized: true },
        { name: 'deltaChip', type: 'text' },
        { name: 'valueBefore', type: 'text' },
        { name: 'valueAfter', type: 'text' },
        { name: 'valueUnit', type: 'text' },
        { name: 'trackSegLeft', type: 'text', admin: { description: 'CSS left% for track segment start (e.g. 60%)' } },
        { name: 'trackSegRight', type: 'text', admin: { description: 'CSS right% for track segment end (e.g. 20%)' } },
        { name: 'trackDotBefore', type: 'text', admin: { description: 'CSS left% for "before" dot' } },
        { name: 'trackDotAfter', type: 'text', admin: { description: 'CSS left% for "after" dot' } },
        { name: 'trackFootnote', type: 'text', localized: true },
        { name: 'backEyebrow', type: 'text', localized: true },
        { name: 'backBody', type: 'textarea', localized: true },
        { name: 'flipAriaLabel', type: 'text', localized: true },
      ],
    },
    { name: 'footnote', type: 'textarea', localized: true },
  ],
}
