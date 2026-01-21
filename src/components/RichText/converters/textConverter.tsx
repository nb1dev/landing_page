import React from 'react'
import type { JSXConverters } from '@payloadcms/richtext-lexical/react'
import type { SerializedTextNode } from '@payloadcms/richtext-lexical'

import { defaultColors } from '@payloadcms/richtext-lexical/client'

/**
 * We avoid importing TextStateFeatureProps because it's not exported
 * in some @payloadcms/richtext-lexical versions.
 *
 * Payload stores textState under node.$ (e.g. { color: "red", underline: "dashed", ... }).
 */
export const colorState = {
  color: {
    ...defaultColors.text,
    ...defaultColors.background,
  },
  underline: {
    dashed: {
      label: 'Dashed',
      css: {
        textDecoration: 'underline dashed',
      },
    },
  },
} as const

type ColorState = typeof colorState
type StateKey = keyof ColorState

type ExtractKeys<T> = {
  [K in keyof T]: T[K] extends Record<string, any> ? keyof T[K] : never
}[keyof T]

type AnyStateValueKey = ExtractKeys<ColorState>

const IS_BOLD = 1
const IS_ITALIC = 2
const IS_STRIKETHROUGH = 4
const IS_UNDERLINE = 8
const IS_CODE = 16
const IS_SUBSCRIPT = 32
const IS_SUPERSCRIPT = 64

export const textConverter: JSXConverters<SerializedTextNode> = {
  text: ({ node }: { node: SerializedTextNode }) => {
    const styles: React.CSSProperties = {}

    // Payload textState is stored under node.$ (not part of public types)
    const textState = (node as any).$ as Partial<Record<StateKey, AnyStateValueKey>> | undefined

    if (textState) {
      ;(Object.keys(colorState) as StateKey[]).forEach((stateKey) => {
        const stateValue = textState[stateKey]
        if (!stateValue) return

        const stateValues = (colorState as any)[stateKey] as Record<
          string,
          { css?: React.CSSProperties }
        >
        const cfg = stateValues?.[String(stateValue)]
        if (cfg?.css) Object.assign(styles, cfg.css)
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

    // Legacy inline style string support (kept from your snippet)
    if (node.style) {
      const style: React.CSSProperties = { ...styles }

      let match = node.style.match(/(?:^|;)\s?background-color: ([^;]+)/)
      if (match) style.backgroundColor = match[1]

      match = node.style.match(/(?:^|;)\s?color: ([^;]+)/)
      if (match) style.color = match[1]

      return <span style={style}>{text}</span>
    }

    // If we collected styles from textState, wrap once
    if (Object.keys(styles).length > 0) {
      return <span style={styles}>{text}</span>
    }

    return text
  },
}
