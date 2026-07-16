import type { Block } from 'payload'
import { makeHeadingEditor, inlineRichTextEditor } from '@/fields/headingLexical'

const tagsField = { name: 'tags' as const, type: 'array' as const, fields: [{ name: 'label', type: 'text' as const, required: true, localized: true }] }

export const LabScienceBoardBlock: Block = {
  slug: 'labScienceBoard',
  interfaceName: 'LabScienceBoardBlock',
  labels: {
    singular: 'Lab: Science Board',
    plural: 'Lab: Science Board Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'richText',
      localized: true,
      editor: makeHeadingEditor(['h2']),
      admin: { description: 'Apply "Brand Teal" color to the emphasized clause, matching the mockup.' },
    },
    { name: 'lede', type: 'textarea', localized: true },
    {
      name: 'stats',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        { name: 'number', type: 'text', required: true, admin: { description: 'e.g. "6" or "17,000+"' } },
        { name: 'label', type: 'text', localized: true, required: true },
      ],
    },

    { name: 'teamGroupLabel', type: 'text', localized: true, admin: { description: 'e.g. "The team that builds it"' } },
    { name: 'teamGroupSub', type: 'textarea', localized: true },

    {
      name: 'cso',
      type: 'group',
      label: 'Featured member (CSO)',
      fields: [
        { name: 'photo', type: 'upload', relationTo: 'media' },
        { name: 'initials', type: 'text', admin: { description: 'Shown if the photo fails to load' } },
        { name: 'role', type: 'text', localized: true, admin: { description: 'e.g. "Chief Scientific Officer"' } },
        { name: 'name', type: 'text', required: true },
        { name: 'bio', type: 'textarea', localized: true },
        { name: 'quote', type: 'textarea', localized: true },
        tagsField,
      ],
    },

    {
      name: 'teamMembers',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'photo', type: 'upload', relationTo: 'media' },
        { name: 'initials', type: 'text' },
        { name: 'discipline', type: 'text', localized: true },
        { name: 'name', type: 'text', required: true },
        { name: 'affiliation', type: 'textarea', localized: true },
        { name: 'quote', type: 'textarea', localized: true },
      ],
    },

    { name: 'checkGroupLabel', type: 'text', localized: true, admin: { description: 'e.g. "Independently checked"' } },
    {
      name: 'checkStatement',
      type: 'richText',
      localized: true,
      editor: inlineRichTextEditor,
      admin: { description: 'Bold the emphasized clause, matching the mockup (rendered in teal).' },
    },
    { name: 'checkStatementSub', type: 'textarea', localized: true },

    {
      name: 'validators',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'photo', type: 'upload', relationTo: 'media' },
        { name: 'initials', type: 'text' },
        { name: 'name', type: 'text', required: true },
        { name: 'affiliation', type: 'textarea', localized: true },
        { name: 'quote', type: 'textarea', localized: true },
        tagsField,
      ],
    },
  ],
}
