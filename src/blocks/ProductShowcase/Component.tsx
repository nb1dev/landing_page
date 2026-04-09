'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import RichText from '@/components/RichText'
import type { ProductShowcaseBlock } from '@/payload-types'
import { UserIcon } from './UserIcon'

type MediaObject = { url?: string | null; alt?: string | null }

function isMedia(value: unknown): value is MediaObject {
  return typeof value === 'object' && value !== null
}

type Props = ProductShowcaseBlock & {
  className?: string
}

export const ProductShowcaseComponent: React.FC<Props> = ({
  title,
  badge,
  panel,
  plans,
  faqItems,
  className,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>(() => {
    const defaults: Record<number, number> = {}
    plans?.forEach((card, ci) => {
      const defaultIdx = card.prices?.findIndex((o) => o.isDefault) ?? -1
      defaults[ci] = defaultIdx >= 0 ? defaultIdx : 0
    })
    return defaults
  })

  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeThumb, setActiveThumb] = useState(0)

  const thumbnails = panel?.thumbnails ?? []

  // Auto-play carousel: advance every 3 s, pause on hover
  const isHoveredRef = useRef(false)
  useEffect(() => {
    if (thumbnails.length <= 1) return
    const id = setInterval(() => {
      if (!isHoveredRef.current) {
        setActiveThumb((prev) => (prev + 1) % thumbnails.length)
      }
    }, 5000)
    return () => clearInterval(id)
  }, [thumbnails.length])

  // Thumbnail strip: ref for programmatic scroll
  const thumbContainerRef = useRef<HTMLDivElement>(null)

  // Image height sync: set image wrapper height = tallest plan card height on md+
  const plansGridRef = useRef<HTMLDivElement>(null)
  const imageWrapperRef = useRef<HTMLDivElement>(null)

  // Arrow visibility
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateArrows = () => {
    const el = thumbContainerRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 1)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
  }

  useEffect(() => {
    const el = thumbContainerRef.current
    if (!el) return
    updateArrows()
    el.addEventListener('scroll', updateArrows, { passive: true })
    return () => el.removeEventListener('scroll', updateArrows)
  }, [thumbnails.length])

  // Scroll strip so active thumb is always the first visible
  useEffect(() => {
    const container = thumbContainerRef.current
    if (!container) return
    const btns = container.querySelectorAll<HTMLButtonElement>('button')
    const btn = btns[activeThumb]
    if (!btn) return
    container.scrollTo({ left: btn.offsetLeft, behavior: 'smooth' })
  }, [activeThumb])

  useEffect(() => {
    const syncHeight = () => {
      const grid = plansGridRef.current
      const imgWrap = imageWrapperRef.current
      if (!grid || !imgWrap) return
      if (window.innerWidth < 768) {
        imgWrap.style.height = ''
        return
      }
      const cards = Array.from(grid.querySelectorAll<HTMLElement>(':scope > div'))
      if (!cards.length) return
      const colCount = getComputedStyle(grid).gridTemplateColumns.split(' ').length
      const firstRowCards = cards.slice(0, colCount)
      const maxH = Math.max(...firstRowCards.map((c) => c.offsetHeight))
      imgWrap.style.height = `${maxH}px`
    }
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(syncHeight) : null
    if (ro && plansGridRef.current) ro.observe(plansGridRef.current)
    window.addEventListener('resize', syncHeight)
    syncHeight()
    return () => {
      ro?.disconnect()
      window.removeEventListener('resize', syncHeight)
    }
  }, [plans?.length])

  const scrollThumbs = (dir: 'left' | 'right') => {
    const container = thumbContainerRef.current
    if (!container) return
    const btns = container.querySelectorAll<HTMLButtonElement>('button')
    const step = btns[0] ? btns[0].offsetWidth + 8 : 72
    container.scrollBy({ left: dir === 'left' ? -(step * 2) : step * 2, behavior: 'smooth' })
  }

  // Active carousel image: selected thumbnail → fall back to first thumbnail
  const activeThumbEntry = thumbnails[activeThumb]
  const activeImg = isMedia(activeThumbEntry?.image) ? activeThumbEntry.image : null

  return (
    <section className={`${className ?? ''} my-6 md:my-10`}>
      <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
        {/* ── Header: title + subtitle centred ──────────────────────────── */}
        <div className="mb-6 md:mb-10 text-center">
          {title ? (
            <div className=" [&_*]:m-0 [&_*]:font-['Instrument_Sans'] [&_*]:font-medium [&_*]:leading-tight [&_*]:tracking-[-0.02em] [&_*]:text-[24px] sm:[&_*]:text-[30px] md:[&_*]:text-[36px] lg:[&_*]:text-[42px] xl:[&_*]:text-[48px] 2xl:[&_*]:text-[54px]">
              <RichText data={title} />
            </div>
          ) : null}

          {badge ? (
            <p
              className="mt-2 flex items-center justify-center gap-1.5 md:gap-2 font-['Inter'] text-[13px] md:text-[14px] lg:text-[15px] xl:text-[17px] 2xl:text-[18px] text-[#555]"
              style={{
                fontWeight: 400,
                lineHeight: '24px',
                letterSpacing: '-0.03em',
              }}
            >
              <UserIcon className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-11 xl:h-11 2xl:w-12 2xl:h-12 flex-shrink-0" />
              {badge}
            </p>
          ) : null}
        </div>

        {/*
          ── 2×2 grid ────────────────────────────────────────────────────
          Row 1:  [big image]      [plan cards]   ← same height
          Row 2:  [thumbnails]     [FAQ]
          ──────────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-[6fr_7fr]">
          {/* ── C1: Big image + thumbnails directly below (spans both rows on md+) ── */}
          <div
            className="flex flex-col gap-3 md:col-start-1 md:row-start-1 md:row-span-2"
            onMouseEnter={() => {
              isHoveredRef.current = true
            }}
            onMouseLeave={() => {
              isHoveredRef.current = false
            }}
          >
            {/* Big image — height set by JS to match tallest plan card on md+ */}
            <div
              ref={imageWrapperRef}
              className="relative overflow-hidden rounded-[14px] bg-white aspect-[4/3] sm:aspect-[3/2] md:aspect-auto"
            >
              {activeImg?.url ? (
                <Image
                  src={activeImg.url}
                  alt={activeImg.alt ?? ''}
                  fill
                  sizes="(max-width: 768px) 100vw, 46vw"
                  className="object-fit"
                />
              ) : null}
            </div>

            {/* Thumbnails — always directly below the image */}
            {thumbnails.length > 0 ? (
              <div className="relative">
                {/* Scrollable strip */}
                <div
                  ref={thumbContainerRef}
                  className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {thumbnails.map((thumb, ti) => {
                    const img = isMedia(thumb.image) ? thumb.image : null
                    return (
                      <button
                        key={thumb.id ?? ti}
                        type="button"
                        onClick={() => (img?.url ? setActiveThumb(ti) : undefined)}
                        className={`relative aspect-square w-[calc((100%-24px)/4)] sm:w-[calc((100%-32px)/5)] lg:w-[calc((100%-40px)/6)] flex-shrink-0 overflow-hidden rounded-[10px] border-2 bg-white transition-colors ${
                          activeThumb === ti
                            ? 'border-[#0A8EAF]'
                            : 'border-[#e0e0e0] hover:border-[#57bdd4]'
                        }`}
                      >
                        {img?.url ? (
                          <Image src={img.url} alt={img.alt ?? ''} fill className="object-cover" />
                        ) : null}
                      </button>
                    )
                  })}
                </div>

                {/* Left arrow — only when there is content to scroll left */}
                {canScrollLeft ? (
                  <button
                    type="button"
                    onClick={() => scrollThumbs('left')}
                    aria-label="Geri"
                    className="absolute left-0 inset-y-0 w-8 flex items-center justify-center rounded-l-[10px] bg-white/80 text-[22px] leading-none text-[#111] opacity-70 hover:opacity-100 transition-opacity select-none"
                  >
                    ‹
                  </button>
                ) : null}

                {/* Right arrow — only when there is content to scroll right */}
                {canScrollRight ? (
                  <button
                    type="button"
                    onClick={() => scrollThumbs('right')}
                    aria-label="İleri"
                    className="absolute right-0 inset-y-0 w-8 flex items-center justify-center rounded-r-[10px] bg-white/80 text-[22px] leading-none text-[#111] opacity-70 hover:opacity-100 transition-opacity select-none"
                  >
                    ›
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>

          {/* ── Row1 C2: Plan cards ───────────────────────────────────── */}
          <div className="md:col-start-2 md:row-start-1">
            {plans && plans.length > 0 ? (
              <div
                ref={plansGridRef}
                className="flex overflow-x-auto snap-x snap-mandatory gap-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-2 md:overflow-visible"
              >
                {plans.map((card, ci) => {
                  const selectedOpt = selectedOptions[ci] ?? 0
                  const total = plans.length

                  return (
                    <div
                      key={card.id ?? ci}
                      className={`shrink-0 flex flex-col rounded-[20px] border py-4 px-4 md:py-3 md:px-3 lg:py-4 lg:px-4 xl:py-5 xl:px-6 2xl:px-8 md:w-full md:h-full ${
                        total === 1
                          ? 'w-full snap-center'
                          : ci === 0
                            ? 'w-[80%] snap-start'
                            : ci === total - 1
                              ? 'w-[80%] snap-end'
                              : 'w-[80%] snap-center'
                      } ${card.badgeHighlighted ? 'border-[#0A8EAF]' : 'border-[#e0e0e0]'}`}
                    >
                      {/* Title */}
                      <h3 className="shrink-0 font-['Instrument_Sans'] text-[16px] md:text-[13px] lg:text-[15px] xl:text-[18px] 2xl:text-[22px] font-semibold leading-tight tracking-[-0.02em] text-[#111111]">
                        {card.cardTitle}
                      </h3>

                      {/* Badge */}
                      {card.badgeLabel ? (
                        <span
                          className={`shrink-0 mt-1.5 inline-block self-start rounded-[4px] px-2.5 py-0.5 font-['Inter'] text-[10px] font-bold uppercase tracking-[0.06em] text-white ${
                            card.badgeHighlighted ? 'bg-[#0A8EAF]' : 'bg-[#111111]'
                          }`}
                        >
                          {card.badgeLabel}
                        </span>
                      ) : null}

                      {/* Feature list — flex-1 so it fills middle space; compresses + clips if content is tall */}
                      {card.features && card.features.length > 0 ? (
                        <ul className="flex-1 mt-3 md:mt-2 lg:mt-3 xl:mt-5 2xl:mt-8 flex flex-col gap-1.5 md:gap-1 lg:gap-1.5 xl:gap-2 2xl:gap-3">
                          {card.features.map((feat, fi) => (
                            <li
                              key={feat.id ?? fi}
                              className="flex items-start gap-1.5 font-['Inter'] text-[12px] leading-[22px] md:text-[11px] md:leading-[20px] lg:text-[12px] lg:leading-[22px] xl:text-[14px] xl:leading-[24px] 2xl:text-[16px] 2xl:leading-[28px] text-[#303438]"
                            >
                              <span
                                className={`mt-0.5 flex h-[16px] w-[16px] flex-shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white ${
                                  feat.highlighted ? 'bg-[#0A8EAF]' : 'bg-[#111111]'
                                }`}
                              >
                                ✓
                              </span>
                              {feat.text}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="flex-1" />
                      )}

                      {/* Divider */}
                      <div className="shrink-0 my-2 md:my-2 lg:my-3 xl:my-4 h-px bg-[#e8e8e8]" />

                      {/* Pricing options */}
                      {card.prices && card.prices.length > 0 ? (
                        <div className="shrink-0 flex flex-col gap-2">
                          {card.prices.map((opt, oi) => (
                            <label
                              key={opt.id ?? oi}
                              className={`flex cursor-pointer items-center gap-1.5 md:gap-1 lg:gap-1.5 xl:gap-2.5 rounded-[10px] border px-2 py-2 md:px-1.5 md:py-1.5 lg:px-2 lg:py-2 xl:px-3 xl:py-2.5 transition-colors ${
                                selectedOpt === oi
                                  ? 'border-[#0A8EAF] bg-[#f0fbfd]'
                                  : 'border-[#e0e0e0] bg-white hover:border-[#57bdd4]'
                              }`}
                            >
                              <input
                                type="radio"
                                name={`plan-${ci}`}
                                checked={selectedOpt === oi}
                                onChange={() =>
                                  setSelectedOptions((prev) => ({ ...prev, [ci]: oi }))
                                }
                                className="accent-[#0A8EAF]"
                              />
                              <div className="grid flex-1 grid-cols-2 lg:grid-cols-3 gap-x-1 gap-y-0">
                                <span className="font-['Inter'] text-[11px] md:text-[10px] lg:text-[11px] xl:text-[12px] 2xl:text-[13px] text-[#303438]">
                                  {opt.durationLabel}
                                </span>
                                {/* sm/md: price + perDay stacked in col 2 */}
                                <div className="lg:hidden flex flex-col leading-none">
                                  <span className="font-['Instrument_Sans'] text-[11px] md:text-[10px] font-semibold text-[#111111]">
                                    {opt.priceLabel}
                                  </span>
                                  {opt.perDayLabel ? (
                                    <span className="font-['Inter'] text-[9px] text-[#888] mt-0.5">
                                      {opt.perDayLabel}
                                    </span>
                                  ) : null}
                                </div>
                                {/* lg+: 3-col layout */}
                                <span className="hidden lg:block font-['Instrument_Sans'] text-[11px] xl:text-[12px] 2xl:text-[13px] font-semibold text-[#111111]">
                                  {opt.priceLabel}
                                </span>
                                <span className="hidden lg:block justify-self-end font-['Inter'] text-[10px] xl:text-[11px] text-[#111111]">
                                  {opt.perDayLabel}
                                </span>
                              </div>
                            </label>
                          ))}
                        </div>
                      ) : null}

                      {/* CTA button */}
                      {card.buttonLabel ? (
                        <a
                          href={card.buttonLink ?? '#'}
                          className="shrink-0 mt-3 md:mt-2 lg:mt-3 xl:mt-4 2xl:mt-5 block rounded-full bg-[#111111] px-4 py-2 md:px-3 md:py-1.5 md:text-[12px] lg:px-4 lg:py-2 lg:text-[13px] xl:px-5 xl:py-2.5 xl:text-[14px] 2xl:px-6 2xl:py-3 2xl:text-[15px] text-center font-['Inter'] text-[13px] font-medium text-white transition-opacity hover:opacity-80"
                        >
                          {card.buttonLabel}
                        </a>
                      ) : null}
                    </div>
                  )
                })}
              </div>
            ) : null}
          </div>

          {/* ── Row2 C2: FAQ ─────────────────────────────────────────── */}
          <div className="md:col-start-2 md:row-start-2">
            {faqItems && faqItems.length > 0 ? (
              <>
                {faqItems.map((item, ii) => {
                  const isOpen = openFaq === ii
                  return (
                    <div key={item.id ?? ii} className="border-b border-[#e0e0e0]">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : ii)}
                        className="flex w-full items-center justify-between py-4 text-left"
                      >
                        <span className="font-['Inter'] text-[14px] font-medium text-[#111111]">
                          {item.question}
                        </span>
                        <span
                          className={`ml-4 flex-shrink-0 text-[22px] font-light text-[#111111] transition-transform duration-200 ${
                            isOpen ? 'rotate-45' : ''
                          }`}
                        >
                          +
                        </span>
                      </button>
                      {isOpen && item.answer ? (
                        <div className="pb-4 font-['Inter'] text-[13px] leading-[21px] text-[#303438]">
                          {item.answer}
                        </div>
                      ) : null}
                    </div>
                  )
                })}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
