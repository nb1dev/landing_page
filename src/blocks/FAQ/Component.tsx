'use client'

import React, { useState } from 'react'
import type { FAQBlock as FAQBlockProps } from '@/payload-types'
import type {
  SerializedEditorState,
  SerializedLexicalNode,
} from '@payloadcms/richtext-lexical/lexical'

import RichText from '@/components/RichText'
import { getDictionary } from '@/i18n/getDictionary'

type Props = FAQBlockProps & {
  locale?: string
}

type RichTextValue = SerializedEditorState<SerializedLexicalNode> | null | undefined

export const FAQBlockComponent: React.FC<Props> = ({ items, locale }) => {
  const dict = getDictionary(locale)
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  if (!items?.length) return null

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="my-12">
      <div className="container">
        <div className="max-w-4xl">
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0px 4px 20px rgba(16,24,40,0.06)',
            }}
          >
            {/* Heading */}
            <h2
              style={{
                fontSize: '28px',
                fontWeight: 600,
                lineHeight: '36px',
                letterSpacing: '-0.02em',
                marginBottom: '28px',
                color: 'rgba(0,126,158,1)',
              }}
            >
              {dict.faq.heading}
            </h2>

            <div className="flex flex-col">
              {items.map((item, index) => {
                const isOpen = openIndex === index

                return (
                  <div
                    key={index}
                    style={{
                      borderBottom:
                        index !== items.length - 1 ? '1px solid rgba(33,43,54,0.12)' : 'none',
                      padding: '20px 0',
                    }}
                  >
                    {/* Question */}
                    <button
                      onClick={() => toggle(index)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        textAlign: 'left',
                        fontSize: '18px',
                        fontWeight: 600,
                        color: 'rgba(33,43,54,1)',
                      }}
                    >
                      {item.question}

                      <span
                        style={{
                          fontSize: '22px',
                          color: 'rgba(0,126,158,1)',
                          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease',
                        }}
                      >
                        +
                      </span>
                    </button>

                    {/* Answer */}
                    {isOpen && (
                      <div
                        style={{
                          marginTop: '14px',
                          fontSize: '16px',
                          lineHeight: '28px',
                          color: 'rgba(33,43,54,1)',
                        }}
                      >
                        <RichText data={item.answer} enableGutter={true} enableProse={false} />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
