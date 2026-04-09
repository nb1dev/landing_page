/* eslint-disable @next/next/no-img-element */
'use client'

import type { FormulaCardBlock as FormulaCardBlockProps } from '@/payload-types'
import React from 'react'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { useIsMobile } from '@/hooks/useIsMobile'
import RichText from '@/components/RichText'
import type {
  SerializedEditorState,
  SerializedLexicalNode,
} from '@payloadcms/richtext-lexical/lexical'
import '../landing-template.css'

type RichTextValue = SerializedEditorState<SerializedLexicalNode> | null | undefined

export const FormulaCardBlock: React.FC<FormulaCardBlockProps> = (props) => {
  const isMobile = useIsMobile()

  const title = props?.title as RichTextValue
  const description = props?.description as RichTextValue
  const items = props?.itemsList || []
  const buttonText = props?.button?.buttonText
  const buttonLink = props?.button?.buttonLink
  const note = props?.note

  const imageUrl =
    typeof props?.kitImage === 'object' && props?.kitImage?.url
      ? getMediaUrl(props.kitImage.url)
      : ''

  return (
    <div
      className="lc-wrapper"
      style={{ margin: isMobile ? '0' : '0 80px 0 80px' }}
    >
      <div
        className="flex"
        style={{
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '32px' : '56px',
          alignItems: isMobile ? 'stretch' : 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <div
          className="flex flex-col"
          style={{
            flex: 1,
            minWidth: 0,
            gap: isMobile ? '24px' : '36px',
            maxWidth: isMobile ? '100%' : '720px',
          }}
        >
          <div className="flex flex-col" style={{ gap: '12px' }}>
            {title && (
              <div className="lc-title lc-title--center-mobile">
                <RichText data={title} enableGutter={false} enableProse={false} />
              </div>
            )}

            {description && (
              <div
                className="lc-description"
                style={{ maxWidth: isMobile ? '100%' : '660px', lineHeight: '28px' }}
              >
                <RichText data={description} enableGutter={false} enableProse={false} />
              </div>
            )}
          </div>

          {isMobile && (
            <div className="lc-col--panel">
              <div
                className="lc-panel lc-panel--bg"
                style={{ borderRadius: '24px' }}
              >
                {!!imageUrl && (
                  <img
                    src={imageUrl}
                    alt={
                      typeof props?.kitImage === 'object' &&
                      props?.kitImage &&
                      'alt' in props.kitImage
                        ? (props.kitImage.alt as string) || 'Kit image'
                        : 'Kit image'
                    }
                    style={{ width: '50%', height: 'auto', objectFit: 'contain', display: 'block' }}
                  />
                )}
              </div>
            </div>
          )}

          {items.length > 0 && (
            <div className="lc-table">
              {items.map((item, index) => {
                const label1 = item?.textLabel1 as RichTextValue
                const label2 = item?.textLabel2 as RichTextValue
                const label3 = item?.textLabel3 as RichTextValue

                return (
                  <div key={index} className="lc-table__row">
                    <div className="lc-table__cell" style={{ gap: label2 ? '6px' : '0px' }}>
                      {label1 && (
                        <div className="lc-table__label">
                          <RichText data={label1} enableGutter={false} enableProse={false} />
                        </div>
                      )}
                      {label2 && (
                        <div className="lc-table__sublabel">
                          <RichText data={label2} enableGutter={false} enableProse={false} />
                        </div>
                      )}
                    </div>

                    {label3 && (
                      <div className="lc-table__value">
                        <RichText data={label3} enableGutter={false} enableProse={false} />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {(buttonText || note) && (
            <div
              className={`lc-cta ${isMobile ? 'mr-auto ml-auto' : ''}`}
              style={{
                paddingTop: isMobile ? '6px' : '10px',
                width: isMobile ? 'fit-content' : '100%',
              }}
            >
              {buttonText && (
                <a href={buttonLink || '#'} className="lc-btn lc-btn--full">
                  {buttonText}
                </a>
              )}
              {note && (
                <div className="lc-note" style={{ width: '100%' }}>
                  {note}
                </div>
              )}
            </div>
          )}
        </div>

        {!isMobile && (
          <div className="lc-col--panel">
            <div
              className="lc-panel lc-panel--bg"
              style={{ borderRadius: '24px' }}
            >
              {!!imageUrl && (
                <img
                  src={imageUrl}
                  alt={
                    typeof props?.kitImage === 'object' &&
                    props?.kitImage &&
                    'alt' in props.kitImage
                      ? (props.kitImage.alt as string) || 'Kit image'
                      : 'Kit image'
                  }
                  className="lc-panel__img lc-panel__img--contain"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
