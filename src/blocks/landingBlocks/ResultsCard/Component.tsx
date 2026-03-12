/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'

import type { ResultsCardBlock as ResultsCardBlockProps } from 'src/payload-types'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { useIsMobile } from '@/hooks/useIsMobile'
import RichText from '@/components/RichText'

export const ResultsCardBlock: React.FC<ResultsCardBlockProps> = (props) => {
  const isMobile = useIsMobile()

  const initialToggleState = useMemo(
    () => (props?.resultsCards || []).map(() => false),
    [props?.resultsCards],
  )

  const [textModeCards, setTextModeCards] = useState<boolean[]>(initialToggleState)
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement | null>(null)

  const toggleCard = (index: number) => {
    setTextModeCards((prev) => prev.map((item, i) => (i === index ? !item : item)))
  }

  useEffect(() => {
    if (!isMobile) return

    const el = carouselRef.current
    if (!el) return

    const handleScroll = () => {
      const children = Array.from(el.children) as HTMLElement[]
      if (!children.length) return

      const containerCenter = el.scrollLeft + el.clientWidth / 2

      let closestIndex = 0
      let closestDistance = Infinity

      children.forEach((child, index) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2
        const distance = Math.abs(containerCenter - childCenter)

        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = index
        }
      })

      setActiveCardIndex(closestIndex)
    }

    handleScroll()
    el.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      el.removeEventListener('scroll', handleScroll)
    }
  }, [isMobile, props?.resultsCards?.length])

  const renderDesktopCard = (card: any, index: number) => {
    const isTextMode = textModeCards[index]
    const imageUrl =
      card?.resultImage && typeof card.resultImage === 'object'
        ? getMediaUrl(card.resultImage?.url || '')
        : ''

    return (
      <div
        key={index}
        style={{
          position: 'relative',
          minHeight: '520px',
          borderRadius: '20px',
          overflow: 'hidden',
          background: isTextMode
            ? 'rgba(220, 228, 232, 1)'
            : imageUrl
              ? `url(${imageUrl}) center / cover no-repeat`
              : 'rgba(220, 228, 232, 1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: isTextMode ? 'space-between' : 'flex-end',
          padding: '24px',
          boxSizing: 'border-box',
          minWidth: 0,
          width: '100%',
        }}
      >
        {!isTextMode && imageUrl && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.18) 100%)',
              pointerEvents: 'none',
            }}
          />
        )}

        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 2,
          }}
        >
          <button
            type="button"
            aria-pressed={isTextMode}
            onClick={() => toggleCard(index)}
            style={{
              width: '38px',
              height: '22px',
              borderRadius: '999px',
              border: `1px solid ${
                isTextMode ? 'rgba(32, 32, 32, 1)' : 'rgba(255, 255, 255, 0.9)'
              }`,
              background: isTextMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.18)',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: isTextMode ? 'flex-end' : 'flex-start',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              cursor: 'pointer',
              boxSizing: 'border-box',
            }}
          >
            <span
              style={{
                display: 'block',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: isTextMode ? 'rgba(32, 32, 32, 1)' : 'rgba(255, 255, 255, 1)',
                transition: 'all 0.2s ease',
              }}
            />
          </button>
        </div>

        {isTextMode ? (
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              marginTop: '72px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              height: '100%',
              minWidth: 0,
            }}
          >
            <div
              style={{
                fontFamily: 'Instrument Sans',
                fontWeight: 400,
                fontSize: '32px',
                lineHeight: '38px',
                letterSpacing: '-0.03em',
                color: 'rgba(36, 39, 43, 1)',
                maxWidth: '220px',
                overflowWrap: 'break-word',
              }}
            >
              {card?.resultTitle}
            </div>

            <div
              style={{
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '1.55',
                color: 'rgba(36, 39, 43, 1)',
                maxWidth: '260px',
                overflowWrap: 'break-word',
              }}
            >
              {card?.resultDescription}
            </div>
          </div>
        ) : (
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              minWidth: 0,
            }}
          >
            <div
              style={{
                fontFamily: 'Instrument Sans',
                fontWeight: 400,
                fontSize: '32px',
                lineHeight: '38px',
                letterSpacing: '-0.03em',
                color: 'rgba(255, 255, 255, 1)',
                maxWidth: '220px',
                overflowWrap: 'break-word',
              }}
            >
              {card?.resultTitle}
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderMobileCard = (card: any, index: number) => {
    const isTextMode = textModeCards[index]
    const imageUrl =
      card?.resultImage && typeof card.resultImage === 'object'
        ? getMediaUrl(card.resultImage?.url || '')
        : ''

    return (
      <div
        key={index}
        style={{
          position: 'relative',
          minHeight: '420px',
          borderRadius: '20px',
          overflow: 'hidden',
          background: isTextMode
            ? 'rgba(220, 228, 232, 1)'
            : imageUrl
              ? `url(${imageUrl}) center / cover no-repeat`
              : 'rgba(220, 228, 232, 1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: isTextMode ? 'space-between' : 'flex-end',
          padding: '24px',
          boxSizing: 'border-box',
          flex: '0 0 calc(100vw - 72px)',
          width: 'calc(100vw - 72px)',
          maxWidth: 'calc(100vw - 72px)',
          minWidth: 'calc(100vw - 72px)',
          scrollSnapAlign: 'center',
        }}
      >
        {!isTextMode && imageUrl && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.18) 100%)',
              pointerEvents: 'none',
            }}
          />
        )}

        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 2,
          }}
        >
          <button
            type="button"
            aria-pressed={isTextMode}
            onClick={() => toggleCard(index)}
            style={{
              width: '38px',
              height: '22px',
              borderRadius: '999px',
              border: `1px solid ${
                isTextMode ? 'rgba(32, 32, 32, 1)' : 'rgba(255, 255, 255, 0.9)'
              }`,
              background: isTextMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.18)',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: isTextMode ? 'flex-end' : 'flex-start',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              cursor: 'pointer',
              boxSizing: 'border-box',
            }}
          >
            <span
              style={{
                display: 'block',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: isTextMode ? 'rgba(32, 32, 32, 1)' : 'rgba(255, 255, 255, 1)',
                transition: 'all 0.2s ease',
              }}
            />
          </button>
        </div>

        {isTextMode ? (
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              marginTop: '72px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              height: '100%',
              minWidth: 0,
            }}
          >
            <div
              style={{
                fontFamily: 'Instrument Sans',
                fontWeight: 400,
                fontSize: '34px',
                lineHeight: '38px',
                letterSpacing: '-0.03em',
                color: 'rgba(36, 39, 43, 1)',
                maxWidth: '220px',
                overflowWrap: 'break-word',
              }}
            >
              {card?.resultTitle}
            </div>

            <div
              style={{
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '1.55',
                color: 'rgba(36, 39, 43, 1)',
                maxWidth: '260px',
                overflowWrap: 'break-word',
              }}
            >
              {card?.resultDescription}
            </div>
          </div>
        ) : (
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              minWidth: 0,
            }}
          >
            <div
              style={{
                fontFamily: 'Instrument Sans',
                fontWeight: 400,
                fontSize: '34px',
                lineHeight: '38px',
                letterSpacing: '-0.03em',
                color: 'rgba(255, 255, 255, 1)',
                maxWidth: '220px',
                overflowWrap: 'break-word',
              }}
            >
              {card?.resultTitle}
            </div>
          </div>
        )}
      </div>
    )
  }

  if (isMobile) {
    return (
      <div
        style={{
          width: '100%',
          maxWidth: '100%',
          overflowX: 'hidden',
          boxSizing: 'border-box',
          padding: '24px 0',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '100%',
            minWidth: 0,
            padding: '0 20px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            overflowX: 'hidden',
          }}
        >
          <div
            className="flex flex-col"
            style={{
              gap: '8px',
              minWidth: 0,
              width: '100%',
              maxWidth: '100%',
            }}
          >
            {props?.itemsList?.map((item, index) => (
              <div
                key={index}
                className="flex flex-row"
                style={{
                  gap: '20px',
                  minWidth: 0,
                  width: '100%',
                  maxWidth: '100%',
                }}
              >
                {item?.icon && (
                  <img
                    src={getMediaUrl(typeof item?.icon === 'object' ? item.icon?.url : '')}
                    alt={`${index + 1} Icon`}
                    style={{ width: '48px', height: '48px', flexShrink: 0 }}
                  />
                )}

                <div
                  className="mt-auto mb-auto"
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '24px',
                    color: 'rgba(0, 0, 0, 1)',
                    minWidth: 0,
                    overflowWrap: 'break-word',
                  }}
                >
                  {item?.itemTitle}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              minWidth: 0,
              width: '100%',
              maxWidth: '100%',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                fontFamily: 'Instrument Sans',
                fontWeight: 500,
                fontSize: '40px',
                lineHeight: '44px',
                letterSpacing: '-0.03em',
                minWidth: 0,
                width: '100%',
                maxWidth: '100%',
                overflowWrap: 'break-word',
                wordBreak: 'break-word',
                textAlign: isMobile ? 'center' : 'left',
              }}
            >
              <RichText data={props?.title as any} enableGutter={false} enableProse={false} />
            </div>
          </div>
        </div>

        {!!props?.resultsCards?.length && (
          <div
            style={{
              width: '100%',
              maxWidth: '100vw',
              marginTop: '32px',
              overflowX: 'hidden',
              boxSizing: 'border-box',
            }}
          >
            <div
              ref={carouselRef}
              style={{
                display: 'flex',
                gap: '16px',
                overflowX: 'auto',
                overflowY: 'hidden',
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                paddingLeft: '28px',
                paddingRight: '28px',
                paddingBottom: '8px',
                boxSizing: 'border-box',
                width: '100%',
                maxWidth: '100vw',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {props.resultsCards.map((card, index) => renderMobileCard(card, index))}
            </div>

            {!!props?.resultsCards?.length && props.resultsCards.length > 1 && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
                  marginTop: '12px',
                }}
              >
                {props.resultsCards.map((_, index) => (
                  <div
                    key={index}
                    style={{
                      width: index === activeCardIndex ? '10px' : '8px',
                      height: index === activeCardIndex ? '10px' : '8px',
                      borderRadius: '999px',
                      backgroundColor:
                        index === activeCardIndex
                          ? 'rgba(36, 39, 43, 1)'
                          : 'rgba(217, 217, 217, 1)',
                      transition: 'all 0.2s ease',
                    }}
                  />
                ))}
              </div>
            )}

            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className="mr-10 ml-10 mt-5 mb-5"
      style={{
        padding: '40px 0',
        backgroundColor: 'white',
      }}
    >
      <div className="flex flex-row" style={{ gap: '60px' }}>
        <div className="flex flex-col" style={{ gap: '8px', marginLeft: '40px' }}>
          {props?.itemsList?.map((item, index) => (
            <div key={index} className="flex flex-row" style={{ gap: '20px' }}>
              {item?.icon && (
                <img
                  src={getMediaUrl(typeof item?.icon === 'object' ? item.icon?.url : '')}
                  alt={`${index + 1} Icon`}
                  style={{ width: '48px', height: '48px' }}
                />
              )}

              <div
                className="mt-auto mb-auto"
                style={{
                  fontFamily: 'Inter',
                  fontWeight: 400,
                  fontSize: '20px',
                  lineHeight: '24px',
                  color: 'rgba(0, 0, 0, 1)',
                }}
              >
                {item?.itemTitle}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            fontFamily: 'Instrument Sans',
            fontWeight: 500,
            fontSize: '64px',
            lineHeight: '70px',
            letterSpacing: '-0.03em',
            maxWidth: '760px',
            textAlign: isMobile ? 'center' : 'left',
          }}
        >
          <RichText data={props?.title as any} enableGutter={false} enableProse={false} />
        </div>
      </div>

      {!!props?.resultsCards?.length && (
        <div
          className="grid"
          style={{
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: '32px',
            marginTop: '48px',
          }}
        >
          {props.resultsCards.map((card, index) => renderDesktopCard(card, index))}
        </div>
      )}
    </div>
  )
}
