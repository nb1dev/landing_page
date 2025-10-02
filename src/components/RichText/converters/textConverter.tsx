/* eslint-disable @typescript-eslint/no-unused-expressions */
import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { SerializedTextNode } from '@payloadcms/richtext-lexical'
import React from 'react'

import { defaultColors } from '@payloadcms/richtext-lexical/client'
import type {
  StateValues,
  TextStateFeatureProps,
} from 'node_modules/@payloadcms/richtext-lexical/dist/features/textState/feature.server'

export const colorState: TextStateFeatureProps['state'] = {
  color: {
    ...defaultColors.text,
    ...defaultColors.background,
  },
  underline: {
    dashed: {
      label: 'Dashed',
      css: {
        'text-decoration': 'underline dashed',
      },
    },
  },
}

type ExtractAllColorKeys<T> = {
  [P in keyof T]: T[P] extends StateValues ? keyof T[P] : never
}[keyof T]

export type ColorStateKeys = ExtractAllColorKeys<typeof colorState>

const IS_BOLD = 1
const IS_ITALIC = 2
const IS_STRIKETHROUGH = 4
const IS_UNDERLINE = 8
const IS_CODE = 16
const IS_SUBSCRIPT = 32
const IS_SUPERSCRIPT = 64
// const IS_HIGHLIGHT = 1 << 7

export const textConverter: JSXConverters<SerializedTextNode> = {
  text: ({ node }: { node: SerializedTextNode }) => {
    const styles: React.CSSProperties = {}

    if (node.$) {
      Object.entries(colorState).forEach(([stateKey, stateValues]) => {
        const stateValue = node.$ && (node.$[stateKey] as ColorStateKeys)

        if (stateValue && stateValues[stateValue]) {
          Object.assign(styles, stateValues[stateValue].css)
        }
      })
    }

    let text: React.ReactNode = node.text
    if (node.format & IS_BOLD) text = <strong>{text}</strong>
    if (node.format & IS_ITALIC) text = <em>{text}</em>
    if (node.format & IS_STRIKETHROUGH)
      text = <span style={{ textDecoration: 'line-through' }}>{text}</span>
    if (node.format & IS_UNDERLINE)
      text = <span style={{ textDecoration: 'underline' }}>{text}</span>
    if (node.format & IS_CODE) text = <code>{text}</code>
    if (node.format & IS_SUBSCRIPT) text = <sub>{text}</sub>
    if (node.format & IS_SUPERSCRIPT) text = <sup>{text}</sup>
    if (node.style) {
      const style: React.CSSProperties = {}

      let match = node.style.match(/(?:^|;)\s?background-color: ([^;]+)/)
      match && (style.backgroundColor = match[1])

      match = node.style.match(/(?:^|;)\s?color: ([^;]+)/)
      match && (style.color = match[1])

      text = <span style={style}>{text}</span>
    }
    return text
  },
}
