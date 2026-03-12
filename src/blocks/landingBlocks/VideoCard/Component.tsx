/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'

import type { VideoCardBlock as VideoCardBlockProps } from 'src/payload-types'
import React, { useEffect, useRef, useState } from 'react'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { useIsMobile } from '@/hooks/useIsMobile'
import RichText from '@/components/RichText'

export const VideoCardBlock: React.FC<VideoCardBlockProps> = (props) => {
  const isMobile = useIsMobile()

  const reviews = props?.reviews || []
  const cardsPerView = isMobile ? 1 : 3
  const maxIndex = Math.max(0, reviews.length - cardsPerView)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)

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
        backgroundColor: 'white',
      }}
    >
      <div className="flex flex-col" style={{ gap: isMobile ? '24px' : '24px' }}>
        <div
          className={`flex ${isMobile ? 'flex-col' : 'justify-between'}`}
          style={{ gap: isMobile ? '20px' : '24px' }}
        >
          <div
            className="flex flex-col"
            style={{ gap: '10px', maxWidth: isMobile ? '100%' : '820px' }}
          >
            <div
              style={{
                fontFamily: 'Instrument Sans',
                fontWeight: 500,
                fontSize: isMobile ? '30px' : '64px',
                lineHeight: isMobile ? '34px' : '70px',
                letterSpacing: '-0.03em',
                color: 'rgba(0, 0, 0, 1)',
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
              }}
            >
              {props?.description}
            </div>
          </div>

          {!isMobile && reviews.length > cardsPerView && (
            <div
              className="flex flex-row"
              style={{
                gap: '16px',
                alignItems: 'center',
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
              const videoUrl = getMediaUrl(typeof item?.video === 'object' ? item?.video?.url : '')
              const thumbnailUrl = getMediaUrl(
                typeof item?.thumbnail === 'object' ? item?.thumbnail?.url : '',
              )
              const isPlaying = playingIndex === index

              return (
                <div
                  key={index}
                  style={{
                    width: isMobile ? '100%' : `${100 / cardsPerView}%`,
                    paddingRight: isMobile ? '0px' : '20px',
                    boxSizing: 'border-box',
                    flexShrink: 0,
                  }}
                >
                  <div
                    className="flex flex-col"
                    style={{
                      gap: isMobile ? '16px' : '20px',
                      height: '100%',
                    }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '280px',
                        borderRadius: isMobile ? '16px' : '20px',
                        overflow: 'hidden',
                        backgroundColor: 'rgba(242, 242, 242, 1)',
                      }}
                    >
                      {isPlaying && videoUrl ? (
                        <video
                          src={videoUrl}
                          controls
                          autoPlay
                          playsInline
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            if (videoUrl) setPlayingIndex(index)
                          }}
                          style={{
                            width: '100%',
                            height: '100%',
                            padding: 0,
                            border: 'none',
                            background: 'transparent',
                            cursor: videoUrl ? 'pointer' : 'default',
                            position: 'relative',
                            display: 'block',
                          }}
                          aria-label={`Play video review from ${item?.name || 'reviewer'}`}
                        >
                          {thumbnailUrl ? (
                            <img
                              src={thumbnailUrl}
                              alt={item?.name || 'video thumbnail'}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(230, 230, 230, 1)',
                              }}
                            />
                          )}

                          {videoUrl && (
                            <div
                              style={{
                                position: 'absolute',
                                right: isMobile ? '16px' : '20px',
                                bottom: isMobile ? '16px' : '20px',
                                width: isMobile ? '52px' : '68px',
                                height: isMobile ? '52px' : '68px',
                                borderRadius: '999px',
                                border: '3px solid rgba(255, 255, 255, 1)',
                                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                backdropFilter: 'blur(4px)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <div
                                style={{
                                  width: 0,
                                  height: 0,
                                  borderTop: '9px solid transparent',
                                  borderBottom: '9px solid transparent',
                                  borderLeft: '14px solid rgba(255,255,255,1)',
                                  marginLeft: '4px',
                                }}
                              />
                            </div>
                          )}
                        </button>
                      )}
                    </div>

                    <div
                      className="flex flex-col"
                      style={{
                        gap: isMobile ? '14px' : '8px',
                      }}
                    >
                      {item?.name && (
                        <div
                          style={{
                            fontFamily: 'Instrument Sans',
                            fontWeight: 600,
                            fontSize: '24px',
                            lineHeight: isMobile ? '26px' : '30px',
                            letterSpacing: '-0.03em',
                            color: 'rgba(0, 0, 0, 1)',
                          }}
                        >
                          {item.name}
                        </div>
                      )}

                      {item?.description && (
                        <div
                          style={{
                            fontFamily: 'Inter',
                            fontWeight: 500,
                            fontSize: isMobile ? '16px' : '18px',
                            lineHeight: '26px',
                            color: 'rgba(0, 0, 0, 1)',
                            textTransform: isMobile ? 'uppercase' : 'none',
                          }}
                        >
                          {item.description}
                        </div>
                      )}

                      {item?.review && (
                        <div
                          style={{
                            fontFamily: 'Inter',
                            fontWeight: 400,
                            fontSize: '14px',
                            lineHeight: '24px',
                            letterSpacing: '-0.03em',
                            color: 'rgba(0, 0, 0, 1)',
                          }}
                        >
                          {isMobile ? `“${item.review}”` : item.review}
                        </div>
                      )}
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
              marginTop: '4px',
            }}
          >
            <div
              style={{
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '20px',
                color: 'rgba(0, 0, 0, 1)',
              }}
            >
              {currentIndex + 1} of {reviews.length}
            </div>

            <div className="flex flex-row" style={{ gap: '12px' }}>
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
      </div>
    </div>
  )
}
