import type { Block } from 'payload'

export const ContactFormBlock: Block = {
  slug: 'contact-form',
  interfaceName: 'ContactFormBlock',
  labels: {
    singular: 'Contact Form',
    plural: 'Contact Forms',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      localized: true,
    },
    {
      name: 'description',
      label: 'Introduction Description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'formTitle',
      label: 'Form Title',
      type: 'text',
      localized: true,
    },
    {
      name: 'formDescription',
      label: 'Form Description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'labels',
      label: 'Field Labels',
      type: 'group',
      fields: [
        {
          name: 'firstName',
          label: 'First Name Label',
          type: 'text',
          localized: true,
          defaultValue: 'First Name',
        },
        {
          name: 'lastName',
          label: 'Last Name Label',
          type: 'text',
          localized: true,
          defaultValue: 'Last Name',
        },
        {
          name: 'email',
          label: 'Email Label',
          type: 'text',
          localized: true,
          defaultValue: 'Email',
        },
        {
          name: 'message',
          label: 'Message Label',
          type: 'text',
          localized: true,
          defaultValue: 'Message',
        },
      ],
    },
    {
      name: 'placeholders',
      label: 'Placeholders',
      type: 'group',
      fields: [
        {
          name: 'firstName',
          label: 'First Name Placeholder',
          type: 'text',
          localized: true,
          defaultValue: 'Enter your first name',
        },
        {
          name: 'lastName',
          label: 'Last Name Placeholder',
          type: 'text',
          localized: true,
          defaultValue: 'Enter your last name',
        },
        {
          name: 'email',
          label: 'Email Placeholder',
          type: 'text',
          localized: true,
          defaultValue: 'Enter your email address',
        },
        {
          name: 'message',
          label: 'Message Placeholder',
          type: 'text',
          localized: true,
          defaultValue: 'Write your message here...',
        },
      ],
    },
    {
      name: 'submitLabel',
      label: 'Submit Button Label',
      type: 'text',
      localized: true,
      defaultValue: 'Send Message',
    },
    {
      name: 'successMessage',
      label: 'Success Message',
      type: 'textarea',
      localized: true,
      defaultValue: 'Thank you! Your message has been sent. We will get back to you shortly.',
    },
    {
      name: 'errorMessage',
      label: 'Error Message',
      type: 'text',
      localized: true,
      defaultValue: 'Something went wrong. Please try again.',
    },
    {
      name: 'recipientEmail',
      label: 'Recipient Email',
      type: 'text',
      admin: {
        description: 'Email address where form submissions will be sent.',
      },
    },
  ],
}
