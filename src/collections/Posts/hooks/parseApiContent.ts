import type { CollectionBeforeChangeHook } from 'payload'
import { parseHtmlToContent } from '@/utilities/parseHtmlToBlocks'

export const parseApiContent: CollectionBeforeChangeHook = ({ data, operation, originalDoc }) => {
  const isApiSource =
    (operation === 'create' || operation === 'update') &&
    data?.source === 'api' &&
    typeof data?.htmlContent === 'string' &&
    data.htmlContent.trim().length > 0

  if (!isApiSource) return data

  // Only re-parse if htmlContent has changed since the last save.
  // This allows manual edits in the editor to persist after saving.
  const htmlChanged = data.htmlContent !== originalDoc?.htmlContent

  if (!htmlChanged) return data

  const content = parseHtmlToContent(data.htmlContent)

  return {
    ...data,
    content,
  }
}
