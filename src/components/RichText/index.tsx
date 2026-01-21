import React from 'react'
import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { cn } from '@/utilities/ui'
import { createJSXConverter, type HeadingItem, type PopulatedAuthor } from './converters'

type Props = {
  data: SerializedEditorState
  enableGutter?: boolean
  enableProse?: boolean

  // module support (same as before)
  locale?: string
  headings?: HeadingItem[]
  populatedAuthors?: PopulatedAuthor[]
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const {
    className,
    enableProse = true,
    enableGutter = true,
    locale,
    headings,
    populatedAuthors,
    ...rest
  } = props

  const converters = React.useMemo(
    () => createJSXConverter({ locale, headings, populatedAuthors }),
    [locale, headings, populatedAuthors],
  )

  return (
    <RichTextConverter
      {...rest}
      converters={converters}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
    />
  )
}
