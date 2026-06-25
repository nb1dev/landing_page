import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

const headingEditor = lexicalEditor({
  features: ({ rootFeatures }) => [
    ...rootFeatures,
    FixedToolbarFeature(),
    InlineToolbarFeature(),
    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
  ],
})
const inlineEditor = lexicalEditor({
  features: ({ rootFeatures }) => [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()],
})

export const YpScienceBoardBlock: Block = {
  slug: 'ypScienceBoard',
  interfaceName: 'YpScienceBoardBlock',
  labels: { singular: 'YP — Science Board', plural: 'YP — Science Boards' },
  fields: [
    // ── Appearance ──────────────────────────────────────────────
    {
      name: 'backgroundColor',
      label: 'Background Color',
      type: 'select',
      defaultValue: 'cream',
      options: [
        { label: 'Cream (#FAF8F2)', value: 'cream' },
        { label: 'Paper / White (#FFFFFF)', value: 'paper' },
        { label: 'Cool Light (#F1F4F7)', value: 'off' },
        { label: 'Navy (#12314D)', value: 'navy' },
        { label: 'Deep Navy (#0E2740)', value: 'navyDeep' },
        { label: 'Teal (#0A8FB0)', value: 'teal' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    {
      name: 'backgroundColorCustom',
      label: 'Custom Background Color (hex)',
      type: 'text',
      admin: { condition: (_, s) => s?.backgroundColor === 'custom' },
    },
    {
      name: 'backgroundType',
      label: 'Background Type',
      type: 'select',
      defaultValue: 'color',
      options: [
        { label: 'Color', value: 'color' },
        { label: 'Image', value: 'image' },
      ],
    },
    {
      name: 'backgroundImage',
      label: 'Background Image',
      type: 'upload',
      relationTo: 'media',
      admin: { condition: (_, s) => s?.backgroundType === 'image' },
    },
    { name: 'grain', label: 'Grain Texture', type: 'checkbox', defaultValue: false },
    // ── Section head ────────────────────────────────────────────
    { name: 'eyebrow', label: 'Eyebrow', type: 'text', localized: true },
    {
      name: 'heading',
      label: 'Heading',
      type: 'richText',
      localized: true,
      editor: headingEditor,
      admin: { description: 'Apply teal text color to a phrase for the accent.' },
    },
    { name: 'lede', label: 'Lede', type: 'richText', localized: true, editor: inlineEditor },
    // ── Members ─────────────────────────────────────────────────
    {
      name: 'members',
      labels: { singular: 'Member', plural: 'Members' },
      type: 'array',
      admin: { description: 'Each card opens a bio modal on click.' },
      fields: [
        { name: 'photo', label: 'Photo', type: 'upload', relationTo: 'media', required: true },
        { name: 'name', label: 'Name', type: 'text', localized: true, required: true },
        { name: 'role', label: 'Role (card)', type: 'text', localized: true, admin: { description: 'Teal line on the card (e.g. "Chief Scientific Officer").' } },
        { name: 'detail', label: 'Detail (card)', type: 'text', localized: true, admin: { description: 'Credentials line on the card.' } },
        { name: 'pill', label: 'Modal Pill', type: 'text', localized: true, admin: { description: 'Small uppercase pill in the modal (e.g. "Science board").' } },
        { name: 'modalTitle', label: 'Modal Title', type: 'text', localized: true, admin: { description: 'Title line under the name in the modal.' } },
        {
          name: 'bio',
          label: 'Bio',
          type: 'richText',
          localized: true,
          editor: inlineEditor,
          admin: { description: 'One or more paragraphs shown in the modal.' },
        },
        { name: 'quote', label: 'Quote', type: 'textarea', localized: true, admin: { description: 'Italic pull-quote at the bottom of the modal.' } },
      ],
    },
  ],
}
