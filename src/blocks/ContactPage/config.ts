import type { Block } from 'payload'

export const ContactPageBlock: Block = {
  slug: 'contactPage',
  interfaceName: 'ContactPageBlock',
  labels: { singular: 'Contact Page', plural: 'Contact Pages' },
  fields: [
    // ── Hero ────────────────────────────────────────────────────
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      localized: true,
      required: true,
    },
    { name: 'subheading', label: 'Subheading', type: 'textarea', localized: true },
    // ── Ways to reach us ────────────────────────────────────────
    {
      name: 'methodsLabel',
      label: 'Methods Label',
      type: 'text',
      localized: true,
    },
    {
      name: 'methods',
      labels: { singular: 'Method', plural: 'Methods' },
      type: 'array',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'icon',
          label: 'Icon',
          type: 'select',
          defaultValue: 'email',
          options: [
            { label: 'Email', value: 'email' },
            { label: 'Chat', value: 'chat' },
            { label: 'Location / Post', value: 'location' },
            { label: 'Clock / Response time', value: 'clock' },
          ],
        },
        { name: 'title', label: 'Title', type: 'text', localized: true, required: true },
        { name: 'body', label: 'Body', type: 'textarea', localized: true },
        {
          name: 'linkLabel',
          label: 'Link Label (optional)',
          type: 'text',
          localized: true,
          admin: { description: 'e.g. an email address shown as a link.' },
        },
        { name: 'linkHref', label: 'Link URL (optional)', type: 'text' },
      ],
    },
    {
      name: 'legalLinks',
      labels: { singular: 'Legal Link', plural: 'Legal Links' },
      type: 'array',
      fields: [
        { name: 'label', label: 'Label', type: 'text', localized: true, required: true },
        { name: 'url', label: 'URL', type: 'text', required: true },
      ],
    },
    // ── Message form ────────────────────────────────────────────
    {
      name: 'formHeading',
      label: 'Form Heading',
      type: 'text',
      localized: true,
    },
    { name: 'formNote', label: 'Form Note', type: 'textarea', localized: true },
    {
      name: 'recipientEmail',
      label: 'Recipient Email',
      type: 'text',
      required: true,
      admin: { description: 'Submitting opens the visitor’s mail app addressed here (mailto).' },
    },
    {
      name: 'topics',
      labels: { singular: 'Topic', plural: 'Topics' },
      type: 'array',
      admin: { description: 'Options for the "What’s it about?" dropdown.' },
      fields: [{ name: 'label', label: 'Label', type: 'text', localized: true, required: true }],
    },
    {
      name: 'submitLabel',
      label: 'Submit Button Label',
      type: 'text',
      localized: true,
    },
    { name: 'formHint', label: 'Form Hint', type: 'textarea', localized: true },
    // ── Form fields: show/hide + labels & placeholders ──────────
    {
      type: 'collapsible',
      label: 'Form Fields',
      admin: {
        initCollapsed: true,
        description:
          'Turn each field on/off and customise its label & placeholder (per language). Uncheck "Show" to remove a field from the form. The Message field is always shown.',
      },
      fields: [
        // Name
        {
          name: 'showName',
          label: 'Show Name field',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          type: 'row',
          admin: { condition: (_, s) => s?.showName !== false },
          fields: [
            { name: 'nameLabel', label: 'Name — Label', type: 'text', localized: true },
            { name: 'namePlaceholder', label: 'Name — Placeholder', type: 'text', localized: true },
          ],
        },
        // Email
        {
          name: 'showEmail',
          label: 'Show Email field',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          type: 'row',
          admin: { condition: (_, s) => s?.showEmail !== false },
          fields: [
            { name: 'emailLabel', label: 'Email — Label', type: 'text', localized: true },
            {
              name: 'emailPlaceholder',
              label: 'Email — Placeholder',
              type: 'text',
              localized: true,
            },
          ],
        },
        // Topic
        {
          name: 'showTopic',
          label: 'Show Topic dropdown',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'topicLabel',
          label: 'Topic — Label',
          type: 'text',
          localized: true,
          admin: { condition: (_, s) => s?.showTopic !== false },
        },
        // Order number
        {
          name: 'showOrder',
          label: 'Show Order Number field',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          type: 'row',
          admin: { condition: (_, s) => s?.showOrder !== false },
          fields: [
            { name: 'orderLabel', label: 'Order Number — Label', type: 'text', localized: true },
            {
              name: 'orderPlaceholder',
              label: 'Order Number — Placeholder',
              type: 'text',
              localized: true,
            },
          ],
        },
        // Message (always shown)
        {
          type: 'row',
          fields: [
            { name: 'messageLabel', label: 'Message — Label', type: 'text', localized: true },
            {
              name: 'messagePlaceholder',
              label: 'Message — Placeholder',
              type: 'text',
              localized: true,
            },
          ],
        },
      ],
    },
    // ── Closing callout ─────────────────────────────────────────
    { name: 'calloutHeading', label: 'Callout Heading', type: 'text', localized: true },
    { name: 'calloutBody', label: 'Callout Body', type: 'textarea', localized: true },
    { name: 'calloutCtaLabel', label: 'Callout Button Label', type: 'text', localized: true },
    { name: 'calloutCtaHref', label: 'Callout Button URL', type: 'text' },
  ],
}
