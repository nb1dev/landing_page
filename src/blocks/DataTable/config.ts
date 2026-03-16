import type { Block } from 'payload'

export const DataTableBlock: Block = {
  slug: 'dataTable',
  interfaceName: 'DataTableBlock',
  labels: {
    singular: 'Data Table',
    plural: 'Data Tables',
  },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      localized: true,
      required: false,
      label: 'Section Title',
    },
    {
      name: 'variant',
      type: 'select',
      required: true,
      defaultValue: 'glossary',
      options: [
        {
          label: 'Glossary',
          value: 'glossary',
        },
        {
          label: 'Comparison',
          value: 'comparison',
        },
      ],
    },
    {
      name: 'columnHeaders',
      type: 'array',
      required: false,
      minRows: 0,
      maxRows: 6,
      labels: {
        singular: 'Column Header',
        plural: 'Column Headers',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
      validate: (value: any, { siblingData }: { siblingData?: any }) => {
        const variant = siblingData?.variant

        if (variant === 'comparison') {
          if (!Array.isArray(value) || value.length < 2) {
            return 'Comparison tables must have at least 2 column headers.'
          }
        }

        if (Array.isArray(value) && value.length > 6) {
          return 'You can add at most 6 column headers.'
        }

        return true
      },
    },
    {
      name: 'rows',
      type: 'array',
      required: true,
      minRows: 1,
      labels: {
        singular: 'Row',
        plural: 'Rows',
      },
      fields: [
        {
          name: 'cells',
          type: 'array',
          required: true,
          minRows: 1,
          maxRows: 6,
          labels: {
            singular: 'Cell',
            plural: 'Cells',
          },
          fields: [
            {
              name: 'value',
              type: 'textarea',
              localized: true,
              required: true,
            },
          ],
          validate: (value: any, { data }: { data?: any }) => {
            const rowCells = Array.isArray(value) ? value : []
            const headers = Array.isArray(data?.columnHeaders) ? data.columnHeaders : []
            const variant = data?.variant

            if (variant === 'glossary' && headers.length === 0) {
              if (rowCells.length !== 2) {
                return 'Glossary rows must contain exactly 2 cells when using fallback headers.'
              }
              return true
            }

            if (headers.length > 0 && rowCells.length !== headers.length) {
              return `Each row must contain exactly ${headers.length} cells to match the column headers.`
            }

            return true
          },
        },
      ],
    },
    {
      name: 'highlightColumn',
      type: 'number',
      required: false,
      label: 'Highlight Column',
      admin: {
        description:
          'Zero-based column index to visually emphasize. Used only for comparison tables.',
        condition: (_, siblingData) => (siblingData as any)?.variant === 'comparison',
      },
      validate: (value: any, { siblingData, data }: { siblingData?: any; data?: any }) => {
        if (
          value === null ||
          value === undefined ||
          value === '' ||
          siblingData?.variant !== 'comparison'
        ) {
          return true
        }

        const headers = Array.isArray(data?.columnHeaders) ? data.columnHeaders : []
        const numericValue = Number(value)

        if (!Number.isInteger(numericValue) || numericValue < 0) {
          return 'Highlight column must be a zero-based positive integer.'
        }

        if (headers.length > 0 && numericValue >= headers.length) {
          return `Highlight column must be less than ${headers.length}.`
        }

        return true
      },
    },
    {
      name: 'caption',
      type: 'text',
      localized: true,
      required: false,
      label: 'Caption',
    },
  ],
}
