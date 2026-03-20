/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'

import type { ReviewCardBlock as ReviewCardBlockProps } from 'src/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { useIsMobile } from '@/hooks/useIsMobile'
import React, { useEffect, useRef, useState } from 'react'
import RichText from '@/components/RichText'

export const ReviewCardBlock: React.FC<ReviewCardBlockProps> = (props) => {
  const isMobile = useIsMobile()
  const reviews = props?.reviews || []
  const cardsPerView = isMobile ? 1 : 3
  const maxIndex = Math.max(0, reviews.length - cardsPerView)

  const [currentIndex, setCurrentIndex] = useState(0)

  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex)
    }
  }, [currentIndex, maxIndex])

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isMobile) return
    touchStartX.current = e.touches[0].clientX
    touchEndX.current = null
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isMobile) return
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!isMobile) return
    if (touchStartX.current === null || touchEndX.current === null) return

    const delta = touchStartX.current - touchEndX.current
    const threshold = 50

    if (delta > threshold) {
      handleNext()
    } else if (delta < -threshold) {
      handlePrev()
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <div
      className={`${!isMobile ? 'pr-10 pl-10 pt-5 pb-5' : ''}`}
      style={{
        padding: isMobile ? '0 20px 20px' : undefined,
        overflowX: 'hidden',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        backgroundColor: 'white',
      }}
    >
      <div
        className="flex flex-col"
        style={{
          gap: isMobile ? '12px' : '24px',
          width: '100%',
          maxWidth: '100%',
          minWidth: 0,
        }}
      >
        <div
          className={`flex ${isMobile ? 'flex-col' : 'justify-between'}`}
          style={{
            gap: isMobile ? '20px' : '24px',
            width: '100%',
            maxWidth: '100%',
            minWidth: 0,
          }}
        >
          <div
            className="flex flex-col"
            style={{
              gap: isMobile ? '16px' : '10px',
              maxWidth: isMobile ? '100%' : '820px',
              minWidth: 0,
            }}
          >
            <div
              style={{
                fontFamily: 'Instrument Sans',
                fontWeight: 500,
                fontSize: isMobile ? '30px' : '64px',
                lineHeight: isMobile ? '34px' : '70px',
                letterSpacing: '-0.03em',
                color: 'rgba(0, 0, 0, 1)',
                minWidth: 0,
              }}
            >
              <RichText data={props?.title as any} enableGutter={false} enableProse={false} />
            </div>

            <div
              style={{
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: isMobile ? '14px' : '16px',
                lineHeight: '24px',
                letterSpacing: '-0.03em',
                color: 'rgba(0, 0, 0, 1)',
                minWidth: 0,
                wordBreak: 'break-word',
                overflowWrap: 'anywhere',
              }}
            >
              {props?.description}
            </div>
            {isMobile && (
              <div className="flex flex-row" style={{ gap: '12px' }}>
                <img
                  src={getMediaUrl(
                    typeof props?.note?.noteIcon === 'object' ? props?.note?.noteIcon?.url : '',
                  )}
                  alt="right arrow"
                  style={{
                    width: '34px',
                    height: '34px',
                    display: 'block',
                  }}
                />
                <div
                  className="flex mt-auto mb-auto"
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontStyle: 'Regular',
                    fontSize: '20px',
                    lineHeight: '24px',
                    letterSpacing: '-3%',
                    color: 'rgba(0, 0, 0, 1)',
                  }}
                >
                  {props?.note?.noteText}
                </div>
              </div>
            )}
          </div>

          {!isMobile && reviews.length > cardsPerView && (
            <div
              className="flex flex-row"
              style={{
                gap: '16px',
                alignItems: 'center',
                flexShrink: 0,
              }}
            >
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                style={{
                  border: 'none',
                  background: 'transparent',
                  padding: 0,
                  cursor: currentIndex === 0 ? 'default' : 'pointer',
                  opacity: currentIndex === 0 ? 0.4 : 1,
                }}
                aria-label="Previous reviews"
              >
                <img
                  src={getMediaUrl(
                    typeof props?.navigation?.left === 'object' ? props?.navigation?.left?.url : '',
                  )}
                  alt="left arrow"
                  style={{
                    width: '32px',
                    height: '32px',
                    display: 'block',
                  }}
                />
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                style={{
                  border: 'none',
                  background: 'transparent',
                  padding: 0,
                  cursor: currentIndex >= maxIndex ? 'default' : 'pointer',
                  opacity: currentIndex >= maxIndex ? 0.4 : 1,
                }}
                aria-label="Next reviews"
              >
                <img
                  src={getMediaUrl(
                    typeof props?.navigation?.right === 'object'
                      ? props?.navigation?.right?.url
                      : '',
                  )}
                  alt="right arrow"
                  style={{
                    width: '32px',
                    height: '32px',
                    display: 'block',
                  }}
                />
              </button>
            </div>
          )}
        </div>

        <div
          style={{
            overflow: 'hidden',
            width: '100%',
            maxWidth: '100%',
            minWidth: 0,
            touchAction: isMobile ? 'pan-y' : 'auto',
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex"
            style={{
              transition: 'transform 0.35s ease',
              transform: isMobile
                ? `translateX(-${currentIndex * 100}%)`
                : `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
              width: '100%',
            }}
          >
            {reviews.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{
                    flex: isMobile ? '0 0 100%' : `0 0 ${100 / cardsPerView}%`,
                    width: isMobile ? '100%' : `${100 / cardsPerView}%`,
                    minWidth: isMobile ? '100%' : `${100 / cardsPerView}%`,
                    paddingRight: isMobile ? '0px' : '20px',
                    boxSizing: 'border-box',
                  }}
                >
                  <div
                    className="flex flex-col"
                    style={{
                      gap: isMobile ? '16px' : '20px',
                      height: '100%',
                      width: '100%',
                      maxWidth: '100%',
                      minWidth: 0,
                    }}
                  >
                    <div
                      className="flex flex-col"
                      style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '100%',
                        minWidth: 0,
                        minHeight: isMobile ? '220px' : '200px',
                        borderRadius: isMobile ? '16px' : '20px',
                        overflow: 'hidden',
                        backgroundColor: 'rgba(242, 242, 242, 1)',
                        padding: isMobile ? '24px 20px' : '24px 28px',
                        gap: '16px',
                        boxSizing: 'border-box',
                        justifyContent: 'space-between',
                      }}
                    >
                      <img
                        src={getMediaUrl(
                          typeof item?.reviewIcon === 'object' ? item?.reviewIcon?.url : '',
                        )}
                        alt="review-icon"
                        style={{
                          width: '18px',
                          height: '12px',
                          objectFit: 'cover',
                          display: 'block',
                          flexShrink: 0,
                        }}
                      />

                      <div
                        style={{
                          fontFamily: 'Inter',
                          fontWeight: 400,
                          fontSize: isMobile ? '15px' : '16px',
                          lineHeight: '24px',
                          letterSpacing: '0px',
                          color: 'rgba(38, 38, 38, 1)',
                          flex: 1,
                          minWidth: 0,
                          width: '100%',
                          maxWidth: '100%',
                          wordBreak: 'break-word',
                          overflowWrap: 'anywhere',
                        }}
                      >
                        {item?.reviewTitle}
                      </div>

                      <div
                        style={{
                          fontFamily: 'Inter',
                          fontWeight: 500,
                          fontSize: '16px',
                          lineHeight: '20px',
                          color: 'rgba(38, 38, 38, 1)',
                          minWidth: 0,
                          width: '100%',
                          maxWidth: '100%',
                          wordBreak: 'break-word',
                          overflowWrap: 'anywhere',
                        }}
                      >
                        {item?.reviewerName}
                        {item?.reviewerCountry ? `, ${item.reviewerCountry}` : ''}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {isMobile && reviews.length > 1 && (
          <div
            className="flex items-center justify-between"
            style={{
              width: '100%',
              marginTop: '0px',
              minWidth: 0,
              gap: '12px',
            }}
          >
            <div
              style={{
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '20px',
                color: 'rgba(0, 0, 0, 1)',
                minWidth: 0,
              }}
            >
              {currentIndex + 1} of {reviews.length}
            </div>

            <div className="flex flex-row" style={{ gap: '12px', flexShrink: 0 }}>
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '999px',
                  border: 'none',
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  padding: 0,
                  cursor: currentIndex === 0 ? 'default' : 'pointer',
                  opacity: currentIndex === 0 ? 0.4 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-label="Previous reviews"
              >
                <img
                  src={getMediaUrl(
                    typeof props?.navigation?.left === 'object' ? props?.navigation?.left?.url : '',
                  )}
                  alt="left arrow"
                  style={{
                    width: '20px',
                    height: '20px',
                    display: 'block',
                  }}
                />
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '999px',
                  border: 'none',
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  padding: 0,
                  cursor: currentIndex >= maxIndex ? 'default' : 'pointer',
                  opacity: currentIndex >= maxIndex ? 0.4 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-label="Next reviews"
              >
                <img
                  src={getMediaUrl(
                    typeof props?.navigation?.right === 'object'
                      ? props?.navigation?.right?.url
                      : '',
                  )}
                  alt="right arrow"
                  style={{
                    width: '20px',
                    height: '20px',
                    display: 'block',
                  }}
                />
              </button>
            </div>
          </div>
        )}

        {!isMobile && (
          <div className="flex flex-row" style={{ gap: '12px' }}>
            <img
              src={getMediaUrl(
                typeof props?.note?.noteIcon === 'object' ? props?.note?.noteIcon?.url : '',
              )}
              alt="right arrow"
              style={{
                width: '34px',
                height: '34px',
                display: 'block',
              }}
            />
            <div
              className="flex mt-auto mb-auto"
              style={{
                fontFamily: 'Inter',
                fontWeight: 400,
                fontStyle: 'Regular',
                fontSize: '20px',
                lineHeight: '24px',
                letterSpacing: '-3%',
                color: 'rgba(0, 0, 0, 1)',
              }}
            >
              {props?.note?.noteText}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
