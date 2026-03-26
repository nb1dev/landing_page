/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'

import type { ReviewCardBlock as ReviewCardBlockProps } from 'src/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { useIsMobile } from '@/hooks/useIsMobile'
import React, { useEffect, useRef, useState } from 'react'
import RichText from '@/components/RichText'
import '../landing-template.css'

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
      className="lc-wrapper"
      style={{ overflowX: 'hidden', width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}
    >
      <div
        className="flex flex-col"
        style={{ gap: isMobile ? '12px' : '24px', width: '100%', maxWidth: '100%', minWidth: 0 }}
      >
        <div className={`lc-header ${isMobile ? 'flex-col' : ''}`}>
          <div
            className="lc-header__text"
            style={{ gap: isMobile ? '16px' : '10px', maxWidth: isMobile ? '100%' : '820px' }}
          >
            <div className="lc-title lc-title--compact">
              <RichText data={props?.title as any} enableGutter={false} enableProse={false} />
            </div>

            <div
              className="lc-description"
              style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
            >
              {props?.description}
            </div>

            {isMobile && (
              <div className="lc-note-row">
                <img
                  src={getMediaUrl(
                    typeof props?.note?.noteIcon === 'object' ? props?.note?.noteIcon?.url : '',
                  )}
                  alt="note icon"
                  style={{ width: '34px', height: '34px', display: 'block' }}
                />
                <div className="lc-note-row__text flex mt-auto mb-auto">
                  {props?.note?.noteText}
                </div>
              </div>
            )}
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
          style={{ maxWidth: '100%', minWidth: 0, touchAction: isMobile ? 'pan-y' : 'auto' }}
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
            {reviews.map((item, index) => (
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
                  style={{ gap: isMobile ? '16px' : '20px', height: '100%', width: '100%', maxWidth: '100%', minWidth: 0 }}
                >
                  <div className="lc-review">
                    <img
                      src={getMediaUrl(
                        typeof item?.reviewIcon === 'object' ? item?.reviewIcon?.url : '',
                      )}
                      alt="review-icon"
                      style={{ width: '18px', height: '12px', objectFit: 'cover', display: 'block', flexShrink: 0 }}
                    />

                    <div className="lc-review__quote">
                      {item?.reviewTitle}
                    </div>

                    <div className="lc-review__author">
                      {item?.reviewerName}
                      {item?.reviewerCountry ? `, ${item.reviewerCountry}` : ''}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {isMobile && reviews.length > 1 && (
          <div className="lc-carousel-footer" style={{ marginTop: '0px' }}>
            <div className="lc-carousel-footer__counter">
              {currentIndex + 1} of {reviews.length}
            </div>

            <div className="flex flex-row" style={{ gap: '12px', flexShrink: 0 }}>
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

        {!isMobile && (
          <div className="lc-note-row">
            <img
              src={getMediaUrl(
                typeof props?.note?.noteIcon === 'object' ? props?.note?.noteIcon?.url : '',
              )}
              alt="note icon"
              style={{ width: '34px', height: '34px', display: 'block' }}
            />
            <div className="lc-note-row__text flex mt-auto mb-auto">
              {props?.note?.noteText}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
