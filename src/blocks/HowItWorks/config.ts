import type { Block } from 'payload'
import { makeHeadingEditor, inlineRichTextEditor } from '@/fields/headingLexical'

export const HowItWorksBlock: Block = {
  slug: 'howItWorks',
  interfaceName: 'HowItWorksBlock',
  fields: [
    { name: 'heading', type: 'richText', localized: true, editor: makeHeadingEditor() },
    { name: 'lede', type: 'textarea', localized: true },
    {
      name: 'steps',
      type: 'array',
      fields: [
        { name: 'week', type: 'text', localized: true },
        { name: 'stepNum', type: 'text' },
        { name: 'stepLabel', type: 'text', localized: true },
        { name: 'title', type: 'text', localized: true },
        { name: 'iconSvg', type: 'textarea', admin: { description: 'SVG path data inside viewBox="0 0 24 24"' } },
        { name: 'isGate', type: 'checkbox', defaultValue: false },
        { name: 'calloutLabel', type: 'text', localized: true },
        { name: 'calloutNumber', type: 'text' },
        { name: 'calloutNumberSuffix', type: 'text', admin: { description: 'Suffix shown as superscript in teal (e.g. ★)' } },
        { name: 'calloutText', type: 'richText', localized: true, editor: inlineRichTextEditor },
      ],
    },
  ],
}
