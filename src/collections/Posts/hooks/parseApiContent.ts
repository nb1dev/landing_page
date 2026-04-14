import type { CollectionBeforeChangeHook } from 'payload'
import { parseHtmlToContent } from '@/utilities/parseHtmlToBlocks'

export const parseApiContent: CollectionBeforeChangeHook = ({ data, operation }) => {
  if (
    (operation === 'create' || operation === 'update') &&
    data?.source === 'api' &&
    typeof data?.htmlContent === 'string' &&
    data.htmlContent.trim().length > 0
  ) {
    return {
      ...data,
      content: parseHtmlToContent(data.htmlContent),
    }
  }

  return data
}
