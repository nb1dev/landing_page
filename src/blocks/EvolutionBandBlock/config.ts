import type { Block, Field } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
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

const overrideFields: Field[] = [
  {
    name: 'eyebrow',
    label: 'Eyebrow Override',
    type: 'text',
    localized: true,
  },
  {
    name: 'heading',
    label: 'Heading Override',
    type: 'richText',
    localized: true,
    editor: makeEditor(),
  },
  {
    name: 'subtext',
    label: 'Subtext Override',
    type: 'textarea',
    localized: true,
  },
  {
    name: 'cycle1Tag',
    label: 'Cycle 1 Tag Override',
    type: 'text',
  },
  {
    name: 'cycle1Version',
    label: 'Cycle 1 Version Override',
    type: 'text',
  },
  {
    name: 'cycle1Name',
    label: 'Cycle 1 Name Override',
    type: 'text',
    localized: true,
  },
  {
    name: 'cycle1Footer',
    label: 'Cycle 1 Footer Override',
    type: 'text',
    localized: true,
  },
  {
    name: 'cycle2Tag',
    label: 'Cycle 2 Tag Override',
    type: 'text',
  },
  {
    name: 'cycle2Version',
    label: 'Cycle 2 Version Override',
    type: 'text',
  },
  {
    name: 'cycle2Name',
    label: 'Cycle 2 Name Override',
    type: 'text',
    localized: true,
  },
  {
    name: 'cycle2Footer',
    label: 'Cycle 2 Footer Override',
    type: 'text',
    localized: true,
  },
  {
    name: 'darkMode',
    label: 'Dark Mode',
    type: 'checkbox',
    defaultValue: false,
    admin: { description: 'Enable dark (navy) background for this variant.' },
  },
  // ── Array overrides ─────────────────────────────────────────────────────
  {
    name: 'cycle1Items',
    label: 'Cycle 1 — Supplement Rows',
    type: 'array',
    fields: [
      { name: 'name', label: 'Name', type: 'text', localized: true },
      { name: 'detail', label: 'Detail', type: 'text', localized: true },
      { name: 'benefit', label: 'Benefit', type: 'text', localized: true },
      { name: 'dose', label: 'Dose', type: 'text' },
    ],
  },
  {
    name: 'biologyGroups',
    label: 'Biology Delta — Groups',
    type: 'array',
    dbName: 'var_bio_groups',
    fields: [
      { name: 'eyebrow', label: 'Group Eyebrow', type: 'text', localized: true },
      {
        name: 'rows',
        label: 'Delta Rows',
        type: 'array',
        fields: [
          { name: 'label', label: 'Label', type: 'text', localized: true },
          { name: 'delta', label: 'Delta Value', type: 'text' },
          {
            name: 'direction',
            label: 'Direction',
            type: 'select',
            options: [
              { label: 'Up (teal)', value: 'up' },
              { label: 'Down (amber)', value: 'down' },
              { label: 'New (badge)', value: 'new' },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'cycle2Items',
    label: 'Cycle 2 — Supplement Rows',
    type: 'array',
    dbName: 'var_cycle2_items',
    fields: [
      { name: 'name', label: 'Name', type: 'text', localized: true },
      { name: 'detail', label: 'Detail', type: 'text', localized: true },
      { name: 'dose', label: 'Dose', type: 'text' },
      {
        name: 'status',
        label: 'Status',
        type: 'select',
        defaultValue: 'unchanged',
        options: [
          { label: 'Unchanged', value: 'unchanged' },
          { label: 'Up ↑', value: 'up' },
          { label: 'Down ↓', value: 'down' },
          { label: 'Removed ✕', value: 'removed' },
          { label: 'Added +', value: 'added' },
        ],
      },
    ],
  },
]

export const EvolutionBandBlock: Block = {
  slug: 'evolutionBand',
  interfaceName: 'EvolutionBandBlock',
  labels: {
    singular: 'Evolution Band',
    plural: 'Evolution Band Blocks',
  },
  fields: [
    // ── Heading ─────────────────────────────────────────────────────────────
    {
      name: 'eyebrow',
      label: 'Eyebrow',
      type: 'text',
      localized: true,
      admin: { description: 'Small label above the heading. E.g. "Your formula evolves".' },
    },
    {
      name: 'heading',
      label: 'Heading',
      type: 'richText',
      localized: true,
      editor: makeEditor(),
      admin: { description: 'Main heading. Use teal color for italic highlight spans.' },
    },
    {
      name: 'subtext',
      label: 'Subtext',
      type: 'textarea',
      localized: true,
      admin: { description: 'Supporting paragraph below the heading.' },
    },
    // ── Cycle 1 ─────────────────────────────────────────────────────────────
    {
      name: 'cycle1Tag',
      label: 'Cycle 1 — Tab Label',
      type: 'text',
      admin: { description: 'Tab label. E.g. "Cycle 01".' },
    },
    {
      name: 'cycle1Version',
      label: 'Cycle 1 — Tab Sub-label',
      type: 'text',
      admin: { description: 'Sub-label under the tab. E.g. "Baseline".' },
    },
    {
      name: 'cycle1Name',
      label: 'Cycle 1 — Card Title',
      type: 'text',
      localized: true,
      admin: { description: 'Card title. E.g. "Your starting formula".' },
    },
    {
      name: 'cycle1Items',
      label: 'Cycle 1 — Supplement Rows',
      type: 'array',
      fields: [
        { name: 'name', label: 'Name', type: 'text', localized: true },
        {
          name: 'detail',
          label: 'Detail',
          type: 'text',
          localized: true,
          admin: { description: 'Small text next to name. E.g. "5 strains" or "EPA + DHA".' },
        },
        {
          name: 'benefit',
          label: 'Benefit',
          type: 'text',
          localized: true,
          admin: { description: 'Teal benefit label. E.g. "Calmer digestion".' },
        },
        {
          name: 'dose',
          label: 'Dose',
          type: 'text',
          admin: { description: 'E.g. "50B CFU".' },
        },
      ],
    },
    {
      name: 'cycle1Footer',
      label: 'Cycle 1 — Footer Note',
      type: 'text',
      localized: true,
      admin: { description: 'E.g. "3 of 6 teams flagged. Protocol targets the gaps.".' },
    },
    // ── Cycle 2 ─────────────────────────────────────────────────────────────
    {
      name: 'cycle2Tag',
      label: 'Cycle 2 — Tab Label',
      type: 'text',
      admin: { description: 'Tab label. E.g. "Cycle 02".' },
    },
    {
      name: 'cycle2Version',
      label: 'Cycle 2 — Tab Sub-label',
      type: 'text',
      admin: { description: 'Sub-label under the tab. E.g. "Re-formulated".' },
    },
    {
      name: 'cycle2Name',
      label: 'Cycle 2 — Card Title',
      type: 'text',
      localized: true,
      admin: { description: 'Card title. E.g. "Your formula, updated".' },
    },
    {
      name: 'biologyGroups',
      label: 'Biology Delta — Groups',
      type: 'array',
      dbName: 'bio_groups',
      admin: { description: 'Each group has its own eyebrow label and a set of delta rows shown inside the Cycle 2 card.' },
      fields: [
        {
          name: 'eyebrow',
          label: 'Group Eyebrow',
          type: 'text',
          localized: true,
          admin: { description: 'E.g. "Your biology shifted".' },
        },
        {
          name: 'rows',
          label: 'Delta Rows',
          type: 'array',
          fields: [
            { name: 'label', label: 'Label', type: 'text', localized: true },
            {
              name: 'delta',
              label: 'Delta Value',
              type: 'text',
              admin: { description: 'E.g. "+22%", "−9%", "New".' },
            },
            {
              name: 'direction',
              label: 'Direction',
              type: 'select',
              options: [
                { label: 'Up (teal)', value: 'up' },
                { label: 'Down (amber)', value: 'down' },
                { label: 'New (badge)', value: 'new' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'cycle2Items',
      label: 'Cycle 2 — Supplement Rows',
      type: 'array',
      fields: [
        { name: 'name', label: 'Name', type: 'text', localized: true },
        {
          name: 'detail',
          label: 'Detail',
          type: 'text',
          localized: true,
          admin: { description: 'Reason note. E.g. "sleep markers shifted".' },
        },
        { name: 'dose', label: 'Dose', type: 'text' },
        {
          name: 'status',
          label: 'Status',
          type: 'select',
          defaultValue: 'unchanged',
          options: [
            { label: 'Unchanged', value: 'unchanged' },
            { label: 'Up ↑', value: 'up' },
            { label: 'Down ↓', value: 'down' },
            { label: 'Removed ✕', value: 'removed' },
            { label: 'Added +', value: 'added' },
          ],
        },
      ],
    },
    {
      name: 'cycle2Footer',
      label: 'Cycle 2 — Footer Note',
      type: 'text',
      localized: true,
      admin: { description: 'E.g. "Same protocol size. Different composition. Your biology moved.".' },
    },
    // ── A/B Variants ────────────────────────────────────────────────────────
    {
      name: 'variants',
      label: 'A/B Variants',
      type: 'array',
      admin: {
        description:
          'Each entry overrides content when ?v=<key> is present in the URL. Variant 1 can be light mode, Variant 2 dark mode, etc. Leave override fields empty to fall back to the defaults above.',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'variantKey',
          label: 'Variant Key',
          type: 'text',
          required: true,
          admin: { description: 'URL param value matched against ?v=. Example: "dark"' },
        },
        ...overrideFields,
      ],
    },
  ],
}
