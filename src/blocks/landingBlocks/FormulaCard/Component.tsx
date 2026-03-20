/* eslint-disable @next/next/no-img-element */
'use client'

import type { FormulaCardBlock as FormulaCardBlockProps } from 'src/payload-types'
import React from 'react'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { useIsMobile } from '@/hooks/useIsMobile'
import RichText from '@/components/RichText'
import type {
  SerializedEditorState,
  SerializedLexicalNode,
} from '@payloadcms/richtext-lexical/lexical'

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
      className={`${!isMobile ? 'pr-10 pl-10 pt-5 pb-5' : ''}`}
      style={{
        padding: isMobile ? '0 20px 20px' : undefined,
        margin: isMobile ? '0' : '0 80px 0 80px',
        backgroundColor: 'white',
      }}
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
          <div
            className="flex flex-col"
            style={{
              gap: '12px',
            }}
          >
            {title && (
              <div
                style={{
                  fontFamily: 'Instrument Sans, sans-serif',
                  fontWeight: 500,
                  fontStyle: 'Medium',
                  fontSize: isMobile ? '40px' : '64px',
                  lineHeight: isMobile ? '44px' : '70px',
                  letterSpacing: '-3%',
                  textAlign: isMobile ? 'center' : 'left',
                }}
              >
                <RichText data={title} enableGutter={false} enableProse={false} />
              </div>
            )}

            {description && (
              <div
                style={{
                  color: 'rgba(0, 0, 0, 1)',
                  maxWidth: isMobile ? '100%' : '660px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontStyle: 'Regular',
                  fontSize: '16px',
                  lineHeight: '28px',
                }}
              >
                <RichText data={description} enableGutter={false} enableProse={false} />
              </div>
            )}
          </div>

          {isMobile && (
            <div
              style={{
                width: isMobile ? '100%' : 'min(39vw, 500px)',
                maxWidth: isMobile ? '100%' : '500px',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: '100%',
                  borderRadius: isMobile ? '24px' : '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
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
                    style={{
                      width: '50%',
                      height: 'auto',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />
                )}
              </div>
            </div>
          )}

          {items.length > 0 && (
            <div
              className="flex flex-col"
              style={{
                width: '100%',
              }}
            >
              {items.map((item, index) => {
                const label1 = item?.textLabel1 as RichTextValue
                const label2 = item?.textLabel2 as RichTextValue
                const label3 = item?.textLabel3 as RichTextValue

                return (
                  <div
                    key={index}
                    style={{
                      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                      padding: isMobile ? '18px 0' : '18px 0',
                    }}
                  >
                    <div
                      className="flex"
                      style={{
                        flexDirection: isMobile ? 'column' : 'row',
                        justifyContent: 'space-between',
                        alignItems: isMobile ? 'flex-start' : 'flex-start',
                        gap: isMobile ? '10px' : '20px',
                        width: '100%',
                      }}
                    >
                      <div
                        className="flex flex-col"
                        style={{
                          flex: 1,
                          minWidth: 0,
                          gap: label2 ? '6px' : '0px',
                        }}
                      >
                        {label1 && (
                          <div
                            style={{
                              color: 'rgba(0, 0, 0, 1)',
                              fontFamily: 'Inter',
                              fontSize: '16px',
                              lineHeight: '24px',
                              fontWeight: 700,
                            }}
                          >
                            <RichText data={label1} enableGutter={false} enableProse={false} />
                          </div>
                        )}

                        {label2 && (
                          <div
                            style={{
                              color: 'rgba(0, 0, 0, 0.9)',
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '16px',
                              lineHeight: '24px',
                              fontWeight: 400,
                            }}
                          >
                            <RichText data={label2} enableGutter={false} enableProse={false} />
                          </div>
                        )}
                      </div>

                      {label3 && (
                        <div
                          style={{
                            flexShrink: 0,
                            minWidth: isMobile ? 'auto' : '120px',
                            color: 'rgba(0, 0, 0, 1)',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '16px',
                            lineHeight: '24px',
                            fontWeight: 700,
                            textAlign: isMobile ? 'left' : 'right',
                            alignSelf: isMobile ? 'flex-start' : 'center',
                          }}
                        >
                          <RichText data={label3} enableGutter={false} enableProse={false} />
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {(buttonText || note) && (
            <div
              className={`flex flex-col ${isMobile ? 'mr-auto ml-auto' : ''}`}
              style={{
                gap: '14px',
                paddingTop: isMobile ? '6px' : '10px',
                width: isMobile ? 'fit-content' : '100%',
              }}
            >
              {buttonText && (
                <a
                  href={buttonLink || '#'}
                  style={{
                    width: '100%',
                    minHeight: isMobile ? '56px' : '58px',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(0, 0, 0, 1)',
                    color: 'rgba(255, 255, 255, 1)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: isMobile ? '16px 20px' : '16px 32px',
                    fontSize: isMobile ? '18px' : '20px',
                    lineHeight: isMobile ? '24px' : '28px',
                    fontWeight: 500,
                    fontFamily: 'Instrument Sans',
                  }}
                >
                  {buttonText}
                </a>
              )}

              {note && (
                <div
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    color: 'rgba(0, 0, 0, 0.8)',
                    fontFamily: 'Inter',
                    fontSize: '13px',
                    lineHeight: '20px',
                    fontWeight: 400,
                  }}
                >
                  {note}
                </div>
              )}
            </div>
          )}
        </div>

        {!isMobile && (
          <div
            style={{
              width: isMobile ? '100%' : 'min(39vw, 500px)',
              maxWidth: isMobile ? '100%' : '500px',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: '100%',
                backgroundColor: 'rgba(239, 239, 239, 1)',
                borderRadius: isMobile ? '24px' : '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
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
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
