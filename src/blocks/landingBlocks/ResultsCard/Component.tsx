/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'

import type { ResultsCardBlock as ResultsCardBlockProps } from '@/payload-types'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { useIsMobile } from '@/hooks/useIsMobile'
import RichText from '@/components/RichText'
import '../landing-template.css'

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
          <div className="lc-result-card__overlay" />
        )}

        <div className="lc-toggle" style={{ background: isTextMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.18)', border: `1px solid ${isTextMode ? 'rgba(32, 32, 32, 1)' : 'rgba(255, 255, 255, 0.9)'}`, justifyContent: isTextMode ? 'flex-end' : 'flex-start' }}>
          <button
            type="button"
            aria-pressed={isTextMode}
            onClick={() => toggleCard(index)}
            style={{ width: '100%', height: '100%', background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: isTextMode ? 'flex-end' : 'flex-start' }}
          >
            <span
              className="lc-toggle__knob"
              style={{ background: isTextMode ? 'rgba(32, 32, 32, 1)' : 'rgba(255, 255, 255, 1)' }}
            />
          </button>
        </div>

        {isTextMode ? (
          <div className="lc-result-card__content lc-result-card__content--text">
            <div className={`lc-result-card__title lc-result-card__title--on-light`}>
              {card?.resultTitle}
            </div>
            <div className="lc-result-card__desc">
              {card?.resultDescription}
            </div>
          </div>
        ) : (
          <div className="lc-result-card__content">
            <div className="lc-result-card__title lc-result-card__title--on-photo">
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
          <div className="lc-result-card__overlay" />
        )}

        <div className="lc-toggle" style={{ background: isTextMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.18)', border: `1px solid ${isTextMode ? 'rgba(32, 32, 32, 1)' : 'rgba(255, 255, 255, 0.9)'}`, justifyContent: isTextMode ? 'flex-end' : 'flex-start' }}>
          <button
            type="button"
            aria-pressed={isTextMode}
            onClick={() => toggleCard(index)}
            style={{ width: '100%', height: '100%', background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: isTextMode ? 'flex-end' : 'flex-start' }}
          >
            <span
              className="lc-toggle__knob"
              style={{ background: isTextMode ? 'rgba(32, 32, 32, 1)' : 'rgba(255, 255, 255, 1)' }}
            />
          </button>
        </div>

        {isTextMode ? (
          <div className="lc-result-card__content lc-result-card__content--text">
            <div className="lc-result-card__title lc-result-card__title--on-light" style={{ fontSize: '34px' }}>
              {card?.resultTitle}
            </div>
            <div className="lc-result-card__desc">
              {card?.resultDescription}
            </div>
          </div>
        ) : (
          <div className="lc-result-card__content">
            <div className="lc-result-card__title lc-result-card__title--on-photo" style={{ fontSize: '34px' }}>
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
          <div className="lc-icon-list" style={{ minWidth: 0, width: '100%', maxWidth: '100%' }}>
            {props?.itemsList?.map((item, index) => (
              <div
                key={index}
                className="lc-icon-list__item"
                style={{ minWidth: 0, width: '100%', maxWidth: '100%' }}
              >
                {item?.icon && (
                  <img
                    src={getMediaUrl(typeof item?.icon === 'object' ? item.icon?.url : '')}
                    alt={`${index + 1} Icon`}
                    style={{ width: '48px', height: '48px', flexShrink: 0 }}
                  />
                )}
                <div
                  className="lc-icon-list__label mt-auto mb-auto"
                  style={{ minWidth: 0, overflowWrap: 'break-word' }}
                >
                  {item?.itemTitle}
                </div>
              </div>
            ))}
          </div>

          <div style={{ minWidth: 0, width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
            <div
              className="lc-title lc-title--center-mobile"
              style={{ minWidth: 0, width: '100%', maxWidth: '100%', overflowWrap: 'break-word', wordBreak: 'break-word' }}
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

            {props.resultsCards.length > 1 && (
              <div className="lc-dots">
                {props.resultsCards.map((_, index) => (
                  <div
                    key={index}
                    className={`lc-dot${index === activeCardIndex ? ' lc-dot--active' : ''}`}
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
      style={{ padding: '40px 0', backgroundColor: 'white' }}
    >
      <div className="flex flex-row" style={{ gap: '60px' }}>
        <div className="lc-icon-list" style={{ marginLeft: '40px' }}>
          {props?.itemsList?.map((item, index) => (
            <div key={index} className="lc-icon-list__item">
              {item?.icon && (
                <img
                  src={getMediaUrl(typeof item?.icon === 'object' ? item.icon?.url : '')}
                  alt={`${index + 1} Icon`}
                  style={{ width: '48px', height: '48px' }}
                />
              )}
              <div className="lc-icon-list__label mt-auto mb-auto">
                {item?.itemTitle}
              </div>
            </div>
          ))}
        </div>

        <div className="lc-title" style={{ maxWidth: '760px' }}>
          <RichText data={props?.title as any} enableGutter={false} enableProse={false} />
        </div>
      </div>

      {!!props?.resultsCards?.length && (
        <div
          className="grid lc-results-grid"
          style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}
        >
          {props.resultsCards.map((card, index) => renderDesktopCard(card, index))}
        </div>
      )}
    </div>
  )
}
