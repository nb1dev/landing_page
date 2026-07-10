import type { Block } from 'payload'
import { makeHeadingEditor, inlineRichTextEditor } from '@/fields/headingLexical'

export const ProtocolKitBlock: Block = {
  slug: 'protocolKit',
  interfaceName: 'ProtocolKitBlock',
  labels: {
    singular: 'Protocol: Kit',
    plural: 'Protocol: Kit Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'richText',
      localized: true,
      editor: makeHeadingEditor(['h2']),
      admin: {
        description: 'Apply the "Brand Teal" text color to "A few minutes, at home.", matching the mockup emphasis. Rendered twice (once above the image on mobile, once beside it on desktop) — same content, CSS-toggled.',
      },
    },
    { name: 'kitImage', label: 'Kit Image', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'reassure1',
      label: 'Reassurance 1',
      type: 'richText',
      localized: true,
      editor: inlineRichTextEditor,
      admin: { description: 'Bold the "small stool sample" phrase, matching the mockup.' },
    },
    { name: 'reassure2', label: 'Reassurance 2', type: 'textarea', localized: true },
    {
      name: 'watchPill',
      label: 'Watch Pill',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true, defaultValue: 'Collecting your sample' },
        { name: 'meta', type: 'text', localized: true, defaultValue: 'Prefer to watch · 1 min' },
        { name: 'ariaLabel', label: 'Aria Label', type: 'text', localized: true, defaultValue: 'Watch: collecting your sample, 1 minute' },
      ],
    },
    {
      name: 'video',
      label: 'Video',
      type: 'group',
      admin: {
        description: 'Video is uploaded manually after this block is built — leave empty until then. The watch-pill and modal render regardless, but the modal video element only appears once a video file is set here.',
      },
      fields: [
        { name: 'file', label: 'Video File', type: 'upload', relationTo: 'media' },
        { name: 'poster', label: 'Poster Image', type: 'upload', relationTo: 'media' },
        { name: 'modalAriaLabel', label: 'Modal Aria Label', type: 'text', localized: true, defaultValue: 'Collecting your sample' },
      ],
    },
  ],
}
