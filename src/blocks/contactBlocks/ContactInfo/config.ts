import type { Block } from 'payload'

export const ContactInfoBlock: Block = {
  slug: 'contact-info',
  interfaceName: 'ContactInfoBlock',
  labels: {
    singular: 'Contact Info',
    plural: 'Contact Info Blocks',
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
      label: 'Description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'text',
    },
    {
      name: 'phoneLabel',
      label: 'Phone Label',
      type: 'text',
      localized: true,
      defaultValue: 'Phone',
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'text',
    },
    {
      name: 'emailLabel',
      label: 'Email Label',
      type: 'text',
      localized: true,
      defaultValue: 'Email',
    },
    {
      name: 'address',
      label: 'Address',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'addressLabel',
      label: 'Address Label',
      type: 'text',
      localized: true,
      defaultValue: 'Address',
    },
    {
      name: 'hours',
      label: 'Business Hours',
      type: 'text',
      localized: true,
    },
    {
      name: 'hoursLabel',
      label: 'Hours Label',
      type: 'text',
      localized: true,
      defaultValue: 'Business Hours',
    },
    {
      name: 'socialLinks',
      label: 'Social Links',
      type: 'array',
      fields: [
        {
          name: 'platform',
          label: 'Platform Name',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          label: 'URL',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'socialsLabel',
      label: 'Social Links Section Label',
      type: 'text',
      localized: true,
      defaultValue: 'Follow Us',
    },
    {
      name: 'backgroundImage',
      label: 'Background Image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
