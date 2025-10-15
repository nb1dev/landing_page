/* eslint-disable @typescript-eslint/no-explicit-any */
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { CollectionAfterChangeHook, Field, Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { BeforeEmail, FormattedEmail } from '@payloadcms/plugin-form-builder/types'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | NB1 - One gut, one plan` : 'NB1 - One gut, one plan'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

const beforeEmail: BeforeEmail = (emails: FormattedEmail[], { data }) => {
  const userEmail = data?.submissionData?.find?.(
    (f: { field: string; value: string }) => f.field === 'email',
  )?.value as string | undefined

  if (!userEmail) return emails

  const updatedEmails = emails.map((email) => {
    const formMessage = (email as any).message ?? email.html ?? ''
    const formSubject = (email as any).subject ?? email.subject ?? 'Form submission'

    const submissionMap = Object.fromEntries(
      (data.submissionData || []).map((f: any) => [f.field, f.value]),
    )

    const resolvePlaceholders = (template: string) =>
      template.replace(/\{\{(.*?)\}\}/g, (_, k) => submissionMap[k.trim()] || '')

    const resolvedMessage = resolvePlaceholders(formMessage)
    const resolvedSubject = resolvePlaceholders(formSubject)

    return {
      ...email,
      to: userEmail,
      subject: resolvedSubject,
      html: `<div style="font-family:sans-serif;">${resolvedMessage}</div>`,
      text: resolvedMessage.replace(/<[^>]*>/g, ''),
    }
  })

  return updatedEmails
}

const sendConfirmationEmail: CollectionAfterChangeHook = async ({ req, operation, doc }) => {
  if (operation !== 'create') return
  try {
    const get = (k: string) => doc?.submissionData?.find?.((f: any) => f.field === k)?.value
    const userEmail = get('email')

    if (!userEmail) return
    await req.payload.sendEmail({
      to: userEmail,
      subject: 'Thanks!',
      html: `<p>Confirmation sent to ${userEmail}</p>`,
    })
  } catch (e) {
    console.error('[afterChange] sendEmail failed:', e)
  }
}

export const formSubmissionOverrides: {
  fields: (args: { defaultFields: Field[] }) => Field[]
  hooks: { afterChange: CollectionAfterChangeHook[] }
} = {
  fields: ({ defaultFields }) => defaultFields,
  hooks: { afterChange: [sendConfirmationEmail] },
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
    // formSubmissionOverrides,
    beforeEmail,
  }),
  searchPlugin({
    collections: ['posts'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
  payloadCloudPlugin(),
]
