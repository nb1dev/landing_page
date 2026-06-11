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

export const YpAthletesBlock: Block = {
  slug: 'ypAthletes',
  interfaceName: 'YpAthletesBlock',
  labels: { singular: 'YP — Athletes', plural: 'YP — Athletes Sections' },
  fields: [
    // ── Appearance ──────────────────────────────────────────────
    {
      name: 'backgroundColor',
      label: 'Background Color',
      type: 'select',
      defaultValue: 'off',
      options: [
        { label: 'Cool Light (#F1F4F7)', value: 'off' },
        { label: 'Paper / White (#FFFFFF)', value: 'paper' },
        { label: 'Cream (#FAF8F2)', value: 'cream' },
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
      admin: { description: 'Apply teal color to a phrase. Shift+Enter for a line break.' },
    },
    { name: 'lede', label: 'Lede', type: 'richText', localized: true, editor: inlineEditor },
    // ── Cards ───────────────────────────────────────────────────
    {
      name: 'cards',
      labels: { singular: 'Athlete Card', plural: 'Athlete Cards' },
      type: 'array',
      admin: { description: 'Portrait + quote. Optionally a video card with a play/Watch lightbox.' },
      fields: [
        { name: 'image', label: 'Image', type: 'upload', relationTo: 'media', required: true },
        { name: 'quote', label: 'Quote', type: 'textarea', localized: true },
        { name: 'name', label: 'Name', type: 'text', localized: true, admin: { description: 'e.g. "Tim Wenisch".' } },
        { name: 'credit', label: 'Credit (bold)', type: 'text', localized: true, admin: { description: 'Bold part after the name (e.g. "2025 HYROX … Champion").' } },
        { name: 'isVideo', label: 'Video card (play + lightbox)', type: 'checkbox', defaultValue: false },
        { name: 'watchLabel', label: 'Watch Label', type: 'text', localized: true, defaultValue: 'Watch', admin: { condition: (_, s) => !!s?.isVideo } },
        { name: 'video', label: 'Video file', type: 'upload', relationTo: 'media', admin: { condition: (_, s) => !!s?.isVideo, description: 'MP4 played in the lightbox.' } },
        { name: 'subtitlesUrl', label: 'Subtitles URL (.vtt)', type: 'text', admin: { condition: (_, s) => !!s?.isVideo, description: 'Optional English subtitles track.' } },
      ],
    },
    // ── Record strip ────────────────────────────────────────────
    { name: 'recordLeft', label: 'Record — Left Label', type: 'text', localized: true, admin: { description: 'e.g. "Together they hold the Men\'s Doubles World Record".' } },
    { name: 'recordValue', label: 'Record — Value', type: 'text', localized: true, admin: { description: 'Teal value (e.g. "47:40").' } },
    { name: 'recordRight', label: 'Record — Right Label', type: 'text', localized: true, admin: { description: 'e.g. "London 2026".' } },
  ],
}
