import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'
import { TextColorFeature } from 'payloadcms-lexical-ext'

const makeEditor = () =>
  lexicalEditor({
    features: ({ rootFeatures }) => [
      ...rootFeatures,
      FixedToolbarFeature(),
      InlineToolbarFeature(),
      TextColorFeature(),
      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
    ],
  })

export const ScienceBoardBlock: Block = {
  slug: 'scienceBoard',
  interfaceName: 'ScienceBoardBlock',
  labels: {
    singular: 'Science Board',
    plural: 'Science Board Blocks',
  },
  fields: [
    {
      name: 'eyebrow',
      label: 'Eyebrow',
      type: 'text',
      localized: true,
    },
    {
      name: 'heading',
      label: 'Heading',
      type: 'richText',
      localized: true,
      editor: makeEditor(),
    },
    {
      name: 'subLead',
      label: 'Sub Lead',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'subCredits',
      label: 'Sub Credits',
      type: 'richText',
      localized: true,
      editor: makeEditor(),
    },
    // ── Scientist Cards ──────────────────────────────────────────────────────
    {
      name: 'members',
      label: 'Scientists',
      type: 'array',
      fields: [
        {
          name: 'photo',
          label: 'Photo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'photoUrl',
          label: 'Photo URL (external)',
          type: 'text',
          admin: {
            description: 'Used if no uploaded photo. E.g. https://i.ibb.co/...',
          },
        },
        {
          name: 'name',
          label: 'Name',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          label: 'Role (card)',
          type: 'text',
          localized: true,
        },
        {
          name: 'meta',
          label: 'Meta (card)',
          type: 'text',
          localized: true,
        },
        {
          name: 'tag',
          label: 'Tag (modal)',
          type: 'text',
          admin: {
            description: 'E.g. "Chief Scientific Officer" or "Science Board"',
          },
        },
        {
          name: 'institution',
          label: 'Institution (modal)',
          type: 'text',
        },
        {
          name: 'bio',
          label: 'Bio (modal)',
          type: 'richText',
          localized: true,
          editor: makeEditor(),
        },
      ],
    },
    // ── Stats Band ───────────────────────────────────────────────────────────
    {
      name: 'stats',
      label: 'Stats',
      type: 'array',
      fields: [
        {
          name: 'target',
          label: 'Number',
          type: 'number',
          required: true,
        },
        {
          name: 'suffix',
          label: 'Suffix',
          type: 'text',
          admin: { placeholder: '+', description: 'E.g. "+" or leave empty' },
        },
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
    // ── Theme ────────────────────────────────────────────────────────────────
    {
      name: 'darkMode',
      label: 'Dark Mode',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Enable navy background. Default is white (light).',
      },
    },
    // ── A/B Variants ────────────────────────────────────────────────────────
    {
      name: 'variants',
      label: 'A/B Variants',
      type: 'array',
      admin: {
        description:
          'Each variant overrides darkMode when ?v=<key> is present in the URL.',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'variantKey',
          label: 'Variant Key',
          type: 'text',
          required: true,
          admin: {
            description: 'URL param value matched against ?v=. E.g. "dark".',
          },
        },
        {
          name: 'darkMode',
          label: 'Dark Mode',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Enable navy background for this variant.',
          },
        },
      ],
    },
  ],
}
