import type { CollectionAfterChangeHook, Field } from 'payload'

// util: replace {{placeholders}} from submission values
const replaceTpl = (tpl: string, map: Record<string, any>) =>
  String(tpl ?? '').replace(/\{\{(.*?)\}\}/g, (_, k) => map[String(k).trim()] ?? '')

const stripHtml = (html: string) => String(html || '').replace(/<[^>]*>/g, '')

export const sendEmailsAfterSubmit: CollectionAfterChangeHook = async ({ req, operation, doc }) => {
  if (operation !== 'create') return

  // Build submission map: { email, name, message, ... }
  const submissionMap: Record<string, any> = Object.fromEntries(
    (doc?.submissionData ?? []).map((f: any) => [f.field, f.value]),
  )
  const userEmail = submissionMap.email as string | undefined

  // Load the related Form to read its Email action blocks
  const formID = doc?.form
  if (!formID) return

  const form = await req.payload.findByID({
    collection: 'forms',
    id: formID,
  })

  // Support both shapes across plugin versions
  const emailActions: any[] = (form as any)?.emails ?? (form as any)?.afterSubmitActions ?? []

  // Only email blocks
  const actions = emailActions.filter((a) => a?.blockType === 'email')
  if (!actions.length) return

  for (const action of actions) {
    // values from the form’s Email action block (what your beforeEmail was reading)
    const formMessage = action?.message ?? ''
    const formSubject = action?.subject ?? 'Form submission'
    const formTo = action?.to // may be empty; can also include {{placeholders}}

    // Resolve placeholders using submission data (same resolver as before)
    const resolvedSubject = replaceTpl(formSubject, submissionMap)
    const resolvedHtml = replaceTpl(formMessage, submissionMap)

    // Resolve "to": prefer action.to (it may have {{email}}), else fallback to submitted email
    let resolvedTo: string | string[] | undefined
    if (Array.isArray(formTo)) {
      resolvedTo = formTo.map((t: string) => replaceTpl(t, submissionMap)).filter(Boolean)
    } else if (typeof formTo === 'string' && formTo.trim()) {
      resolvedTo = replaceTpl(formTo, submissionMap)
    } else {
      resolvedTo = userEmail // fallback to submitted email
    }

    if (!resolvedTo || (Array.isArray(resolvedTo) && !resolvedTo.length)) {
      // no recipient → skip this action
      continue
    }

    try {
      await req.payload.sendEmail({
        to: resolvedTo,
        subject: resolvedSubject,
        html: `<div style="font-family:sans-serif;">${resolvedHtml}</div>`,
        text: stripHtml(resolvedHtml),
      })
    } catch (e) {
      console.error('[form-submissions] sendEmail failed:', e)
    }
  }
}

// IMPORTANT: Form Builder expects an overrides *object*, not a full CollectionConfig
export const formSubmissionOverrides: {
  fields: (args: { defaultFields: Field[] }) => Field[]
  hooks: { afterChange: CollectionAfterChangeHook[] }
} = {
  fields: ({ defaultFields }) => defaultFields, // keep defaults
  hooks: { afterChange: [sendEmailsAfterSubmit] }, // mutable array
}
