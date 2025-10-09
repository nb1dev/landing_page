// src/collections/formSubmissionOverrides.ts
import type { CollectionAfterChangeHook, Field } from 'payload'

const sendConfirmationEmail: CollectionAfterChangeHook = async ({ req, operation, doc }) => {
  if (operation !== 'create') return

  const getField = (key: string): string | undefined =>
    doc?.submissionData?.find?.((f: { field: string; value: string }) => f.field === key)?.value

  const userEmail = getField('email')
  if (!userEmail) return

  //   const name = getField('name') || 'there'
  //   const message = getField('message') || ''

  await req.payload.sendEmail({
    to: Array.isArray(userEmail) ? userEmail : [userEmail],
    subject: `Thanks for your submission, ${name}!`,
    html: `<p>Hi ${name},</p>
           <p>We received your message:</p>
           <p>This is a confirmation email sent to <b>${userEmail}</b>.</p>`,
  })
}

// Type the shape explicitly and keep arrays mutable
export const formSubmissionOverrides: {
  fields: (args: { defaultFields: Field[] }) => Field[]
  hooks: { afterChange: CollectionAfterChangeHook[] }
} = {
  fields: ({ defaultFields }) => defaultFields,
  hooks: {
    afterChange: [sendConfirmationEmail], // <-- mutable array
  },
}
