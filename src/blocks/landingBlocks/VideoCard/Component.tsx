/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'

import type { VideoCardBlock as VideoCardBlockProps } from 'src/payload-types'
import React, { useEffect, useRef, useState } from 'react'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { useIsMobile } from '@/hooks/useIsMobile'
import RichText from '@/components/RichText'
import '../landing-template.css'

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
    <div className="lc-wrapper">
      <div className="flex flex-col" style={{ gap: '24px' }}>
        <div className={`lc-header ${isMobile ? 'flex-col' : ''}`}>
          <div className="lc-header__text" style={{ maxWidth: isMobile ? '100%' : '820px' }}>
            <div className="lc-title lc-title--compact">
              <RichText data={props?.title as any} enableGutter={false} enableProse={false} />
            </div>
            <div className="lc-description">{props?.description}</div>
          </div>

          {!isMobile && reviews.length > cardsPerView && (
            <div className="lc-carousel-nav">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="lc-carousel-nav__btn"
                style={{ opacity: currentIndex === 0 ? 0.4 : 1, cursor: currentIndex === 0 ? 'default' : 'pointer' }}
                aria-label="Previous reviews"
              >
                <img
                  src={getMediaUrl(
                    typeof props?.navigation?.left === 'object' ? props?.navigation?.left?.url : '',
                  )}
                  alt="left arrow"
                  style={{ width: '32px', height: '32px', display: 'block' }}
                />
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                className="lc-carousel-nav__btn"
                style={{ opacity: currentIndex >= maxIndex ? 0.4 : 1, cursor: currentIndex >= maxIndex ? 'default' : 'pointer' }}
                aria-label="Next reviews"
              >
                <img
                  src={getMediaUrl(
                    typeof props?.navigation?.right === 'object'
                      ? props?.navigation?.right?.url
                      : '',
                  )}
                  alt="right arrow"
                  style={{ width: '32px', height: '32px', display: 'block' }}
                />
              </button>
            </div>
          )}
        </div>

        <div
          className="lc-carousel"
          style={{ touchAction: isMobile ? 'pan-y' : 'auto' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="lc-carousel__track"
            style={{
              transform: isMobile
                ? `translateX(-${currentIndex * 100}%)`
                : `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
            }}
          >
            {reviews.map((item, index) => {
              const videoUrl = getMediaUrl(typeof item?.video === 'object' ? item?.video?.url : '')
              const thumbnailUrl = getMediaUrl(
                typeof item?.thumbnail === 'object' ? item?.thumbnail?.url : '',
              )
              const isPlaying = playingIndex === index

              return (
                <div key={index} className="lc-carousel__item">
                  <div className="flex flex-col" style={{ gap: isMobile ? '16px' : '20px', height: '100%' }}>
                    <div className="lc-media">
                      {isPlaying && videoUrl ? (
                        <video
                          src={videoUrl}
                          controls
                          autoPlay
                          playsInline
                          className="lc-media__video"
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
                              className="lc-media__img"
                            />
                          ) : (
                            <div style={{ width: '100%', height: '100%', backgroundColor: 'rgba(230, 230, 230, 1)' }} />
                          )}

                          {videoUrl && (
                            <div className="lc-media__play">
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

                    <div className="flex flex-col" style={{ gap: isMobile ? '14px' : '8px' }}>
                      {item?.name && <div className="lc-reviewer__name">{item.name}</div>}
                      {item?.description && <div className="lc-reviewer__tag">{item.description}</div>}
                      {item?.review && (
                        <div className="lc-reviewer__quote">
                          {isMobile ? `"${item.review}"` : item.review}
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
          <div className="lc-carousel-footer">
            <div className="lc-carousel-footer__counter">
              {currentIndex + 1} of {reviews.length}
            </div>

            <div className="flex flex-row" style={{ gap: '12px' }}>
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="lc-carousel-nav__btn lc-carousel-nav__btn--round"
                style={{ opacity: currentIndex === 0 ? 0.4 : 1, cursor: currentIndex === 0 ? 'default' : 'pointer' }}
                aria-label="Previous reviews"
              >
                <img
                  src={getMediaUrl(
                    typeof props?.navigation?.left === 'object' ? props?.navigation?.left?.url : '',
                  )}
                  alt="left arrow"
                  style={{ width: '20px', height: '20px', display: 'block' }}
                />
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                className="lc-carousel-nav__btn lc-carousel-nav__btn--round"
                style={{ opacity: currentIndex >= maxIndex ? 0.4 : 1, cursor: currentIndex >= maxIndex ? 'default' : 'pointer' }}
                aria-label="Next reviews"
              >
                <img
                  src={getMediaUrl(
                    typeof props?.navigation?.right === 'object'
                      ? props?.navigation?.right?.url
                      : '',
                  )}
                  alt="right arrow"
                  style={{ width: '20px', height: '20px', display: 'block' }}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
