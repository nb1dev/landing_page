import { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'
import { textConverter } from './textConverter'

export type ClientBlockProps = {
  content?: {
    root: {
      type: string
      children: {
        type: string
        version: number
        [k: string]: unknown
      }[]
      direction: ('ltr' | 'rtl') | null
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
      indent: number
      version: number
    }
    [k: string]: unknown
  } | null
  id?: string | null
  blockName?: string | null
  blockType: 'clientBlock'
}

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<ClientBlockProps>

export const jsxConverter: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...textConverter,
})
