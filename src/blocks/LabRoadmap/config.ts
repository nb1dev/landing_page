import type { Block } from 'payload'

export const LabRoadmapBlock: Block = {
  slug: 'labRoadmap',
  interfaceName: 'LabRoadmapBlock',
  labels: {
    singular: 'Lab Roadmap',
    plural: 'Lab Roadmap Blocks',
  },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true, admin: { description: 'e.g. "How this page goes"' } },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'description', type: 'textarea', localized: true },
        {
          name: 'href',
          type: 'text',
          localized: true,
          required: true,
          admin: { description: 'In-page anchor (e.g. "#reads") or a URL' },
        },
      ],
    },
  ],
}
