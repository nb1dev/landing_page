import type { Block } from 'payload'
import { makeHeadingEditor, inlineRichTextEditor } from '@/fields/headingLexical'

export const ProtocolLibraryBlock: Block = {
  slug: 'protocolLibrary',
  interfaceName: 'ProtocolLibraryBlock',
  // Short dbName: the default (pages_blocks_protocol_library_...) pushes the
  // nested "items"/"categories" arrays' locale index names past Postgres's
  // 63-char limit.
  dbName: 'plb',
  labels: {
    singular: 'Protocol: Ingredient Library',
    plural: 'Protocol: Ingredient Library Blocks',
  },
  fields: [
    {
      name: 'categories',
      label: 'Categories',
      type: 'array',
      minRows: 4,
      maxRows: 4,
      admin: {
        description:
          'Exactly 4, matching the item categories below. "familyLabel" is shown under the big stat number (e.g. "Live-culture strains"); "pillLabel" is the shorter filter-pill text (e.g. "Strains"). Counts are computed automatically from the items below — never entered manually.',
      },
      fields: [
        {
          name: 'key',
          type: 'select',
          defaultValue: 'strains',
          options: [
            { label: 'Strains', value: 'strains' },
            { label: 'Fibres', value: 'fibres' },
            { label: 'Vitamins', value: 'vitamins' },
            { label: 'Actives', value: 'actives' },
          ],
        },
        { name: 'familyLabel', type: 'text', localized: true, required: true, admin: { description: 'e.g. "Live-culture strains"' } },
        { name: 'pillLabel', type: 'text', localized: true, required: true, admin: { description: 'e.g. "Strains"' } },
      ],
    },
    {
      name: 'vettedText',
      label: 'Vetted Text',
      type: 'richText',
      localized: true,
      editor: inlineRichTextEditor,
      admin: { description: 'Bold "Science-board vetted" line, matching the mockup.' },
    },
    {
      name: 'vettedFaces',
      label: 'Vetted Faces',
      type: 'array',
      maxRows: 3,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'name', type: 'text', required: true },
      ],
    },
    {
      name: 'footLine',
      label: 'Foot Line',
      type: 'richText',
      localized: true,
      editor: inlineRichTextEditor,
      admin: { description: 'Bold "A single reading typically draws on 15 to 25 of these.", matching the mockup.' },
    },
    { name: 'toggleLabelClosed', label: 'Toggle Label (closed)', type: 'text', localized: true, defaultValue: 'Explore the full library' },
    { name: 'toggleLabelOpen', label: 'Toggle Label (open)', type: 'text', localized: true, defaultValue: 'Hide the full library' },
    { name: 'allPillLabel', label: 'All Pill Label', type: 'text', localized: true, defaultValue: 'All' },
    { name: 'searchPlaceholder', type: 'text', localized: true, defaultValue: 'Search the library' },
    { name: 'searchAriaLabel', label: 'Search Aria Label', type: 'text', localized: true, defaultValue: 'Search components' },
    { name: 'emptyText', label: 'Empty State Text', type: 'text', localized: true, defaultValue: 'Nothing matches that. Try another term.' },
    {
      name: 'items',
      label: 'Library Items',
      type: 'array',
      minRows: 1,
      admin: { description: 'The full ingredient library grid (search + filter operate over this list client-side).' },
      fields: [
        { name: 'name', type: 'text', localized: true, required: true },
        {
          name: 'category',
          type: 'select',
          required: true,
          defaultValue: 'strains',
          options: [
            { label: 'Strains', value: 'strains' },
            { label: 'Fibres', value: 'fibres' },
            { label: 'Vitamins', value: 'vitamins' },
            { label: 'Actives', value: 'actives' },
          ],
        },
        { name: 'type', type: 'text', localized: true, required: true, admin: { description: 'e.g. "Live culture", "Botanical", "Mineral"' } },
      ],
    },
  ],
}
