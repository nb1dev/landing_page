'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import RichText from '@/components/RichText'
import type { ProductShowcaseBlock } from '@/payload-types'

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
  productPanel,
  plans,
  faqItems,
  className,
}) => {
  // ─── State: selected pricing option per card ───────────────────────────────
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>(() => {
    const defaults: Record<number, number> = {}
    plans?.forEach((card, ci) => {
      const defaultIdx = card.prices?.findIndex((o) => o.isDefault) ?? -1
      defaults[ci] = defaultIdx >= 0 ? defaultIdx : 0
    })
    return defaults
  })

  // ─── State: open FAQ item index ────────────────────────────────────────────
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // ─── State: selected carousel thumbnail ───────────────────────────────────
  const [activeThumb, setActiveThumb] = useState(0)

  const mainImage = isMedia(productPanel?.mainImage) ? productPanel.mainImage : null
  const thumbnails = productPanel?.thumbnails ?? []

  return (
    <section className={className ?? 'my-10'}>
      <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="mb-8 text-center">
          {title ? (
            <div className="[&_h1]:m-0 [&_h1]:font-['Instrument_Sans'] [&_h1]:text-[32px] [&_h1]:font-semibold [&_h1]:leading-tight [&_h1]:tracking-[-0.03em] [&_h2]:m-0 [&_h2]:font-['Instrument_Sans'] [&_h2]:text-[32px] [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:tracking-[-0.03em] [&_p]:m-0 [&_p]:font-['Instrument_Sans'] [&_p]:text-[32px] [&_p]:font-semibold [&_p]:leading-tight [&_p]:tracking-[-0.03em] md:[&_h1]:text-[48px] md:[&_h2]:text-[48px] md:[&_p]:text-[48px]">
              <RichText data={title} />
            </div>
          ) : null}

          {badge ? (
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#f0f0f0] px-4 py-1.5 font-['Inter'] text-[14px] text-[#303438]">
              <span className="h-5 w-5 rounded-full bg-[#303438] text-[10px] text-white flex items-center justify-center">
                ✦
              </span>
              {badge}
            </div>
          ) : null}
        </div>

        {/* ── Main grid: product panel + pricing cards ───────────────────── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr_1fr]">
          {/* Product panel */}
          {productPanel ? (
            <div className="rounded-[20px] bg-[#edf7f5] p-6 lg:col-span-1">
              {productPanel.title ? (
                <h2 className="font-['Instrument_Sans'] text-[24px] font-semibold leading-tight tracking-[-0.03em] text-[#0A8EAF] md:text-[28px]">
                  {productPanel.title}
                </h2>
              ) : null}

              {productPanel.subtitle ? (
                <p className="mt-1 font-['Inter'] text-[13px] leading-[20px] text-[#303438]">
                  {productPanel.subtitle}
                </p>
              ) : null}

              {/* Features + main image row */}
              <div className="mt-4 flex items-start gap-4">
                {/* Feature list */}
                {productPanel.features && productPanel.features.length > 0 ? (
                  <ul className="flex flex-1 flex-col gap-3">
                    {productPanel.features.map((feature, fi) => {
                      const icon = isMedia(feature.icon) ? feature.icon : null
                      return (
                        <li
                          key={feature.id ?? fi}
                          className="flex items-center gap-2 font-['Inter'] text-[13px] font-medium text-[#303438]"
                        >
                          <span className="text-[#0A8EAF]">●</span>
                          {feature.label}
                          {icon?.url ? (
                            <div className="relative ml-auto h-[32px] w-[32px] flex-shrink-0 overflow-hidden rounded-full">
                              <Image
                                src={icon.url}
                                alt={icon.alt || feature.label}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : null}
                        </li>
                      )
                    })}
                  </ul>
                ) : null}

                {/* Main image */}
                {mainImage?.url ? (
                  <div className="relative h-[200px] w-[90px] flex-shrink-0 md:h-[240px] md:w-[110px]">
                    <Image
                      src={mainImage.url}
                      alt={mainImage.alt || ''}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : null}
              </div>

              {/* Carousel thumbnails */}
              {thumbnails.length > 0 ? (
                <div className="mt-4">
                  {/* Active thumbnail preview */}
                  {(() => {
                    const active = thumbnails[activeThumb]
                    const img = isMedia(active?.image) ? active.image : null
                    return img?.url ? (
                      <div className="relative mb-3 h-[140px] w-full overflow-hidden rounded-[12px] bg-white">
                        <Image
                          src={img.url}
                          alt={img.alt || ''}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                    ) : null
                  })()}
                  {/* Thumbnail strip */}
                  <div className="flex flex-wrap gap-2">
                    {thumbnails.map((thumb, ti) => {
                      const img = isMedia(thumb.image) ? thumb.image : null
                      if (!img?.url) return null
                      return (
                        <button
                          key={thumb.id ?? ti}
                          type="button"
                          onClick={() => setActiveThumb(ti)}
                          className={`relative h-[48px] w-[48px] overflow-hidden rounded-[8px] border-2 transition-colors ${activeThumb === ti ? 'border-[#0A8EAF]' : 'border-transparent'} bg-white`}
                        >
                          <Image src={img.url} alt={img.alt || ''} fill className="object-cover" />
                        </button>
                      )
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          {/* Pricing cards */}
          {plans && plans.length > 0
            ? plans.map((card, ci) => {
                const selectedOpt = selectedOptions[ci] ?? 0
                const activePricing = card.prices?.[selectedOpt]

                return (
                  <div
                    key={card.id ?? ci}
                    className="flex flex-col rounded-[20px] border border-[#e0e0e0] bg-white p-6 lg:col-span-1"
                  >
                    {/* Badge */}
                    {card.badgeLabel ? (
                      <span
                        className={`mb-3 inline-block self-start rounded-full px-3 py-0.5 font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.08em] ${
                          card.badgeHighlighted
                            ? 'bg-[#0A8EAF] text-white'
                            : 'bg-[#111111] text-white'
                        }`}
                      >
                        {card.badgeLabel}
                      </span>
                    ) : null}

                    {/* Card title */}
                    <h3 className="font-['Instrument_Sans'] text-[22px] font-semibold leading-tight tracking-[-0.03em] text-[#111111]">
                      {card.cardTitle}
                    </h3>

                    {/* Feature list */}
                    {card.features && card.features.length > 0 ? (
                      <ul className="mt-4 flex flex-col gap-2">
                        {card.features.map((feat, fi) => (
                          <li
                            key={feat.id ?? fi}
                            className="flex items-start gap-2 font-['Inter'] text-[13px] leading-[20px] text-[#303438]"
                          >
                            <span
                              className={`mt-0.5 flex-shrink-0 text-[14px] ${
                                feat.highlighted ? 'text-[#0A8EAF]' : 'text-[#111111]'
                              }`}
                            >
                              ✓
                            </span>
                            {feat.text}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {/* Pricing options */}
                    {card.prices && card.prices.length > 0 ? (
                      <div className="mt-auto pt-4">
                        <div className="flex flex-col gap-2">
                          {card.prices.map((opt, oi) => (
                            <label
                              key={opt.id ?? oi}
                              className={`flex cursor-pointer items-center gap-3 rounded-[10px] border px-3 py-2 transition-colors ${
                                selectedOpt === oi
                                  ? 'border-[#0A8EAF] bg-[#f0fbfd]'
                                  : 'border-[#e0e0e0] bg-white'
                              }`}
                            >
                              <input
                                type="radio"
                                name={`pricing-${ci}`}
                                checked={selectedOpt === oi}
                                onChange={() =>
                                  setSelectedOptions((prev) => ({ ...prev, [ci]: oi }))
                                }
                                className="accent-[#0A8EAF]"
                              />
                              <span className="font-['Inter'] text-[13px] text-[#303438]">
                                {opt.durationLabel}
                              </span>
                              <span className="ml-auto font-['Instrument_Sans'] text-[18px] font-semibold text-[#111111]">
                                {opt.price}
                              </span>
                              {opt.perDay ? (
                                <span className="font-['Inter'] text-[12px] text-[#888]">
                                  {opt.perDay}
                                </span>
                              ) : null}
                              {opt.saveBadge ? (
                                <span className="rounded bg-[#111111] px-1.5 py-0.5 font-['Inter'] text-[11px] font-semibold text-white">
                                  {opt.saveBadge}
                                </span>
                              ) : null}
                              {opt.discountAmount ? (
                                <span className="font-['Instrument_Sans'] text-[14px] font-medium text-[#111111]">
                                  {opt.discountAmount}
                                </span>
                              ) : null}
                            </label>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {/* CTA button */}
                    {card.buttonLabel ? (
                      <a
                        href={card.buttonLink ?? '#'}
                        className="mt-4 block rounded-full bg-[#111111] px-6 py-3 text-center font-['Inter'] text-[15px] font-medium text-white transition-opacity hover:opacity-80"
                      >
                        {card.buttonLabel}
                      </a>
                    ) : null}

                    {activePricing ? null : null}
                  </div>
                )
              })
            : null}
        </div>

        {/* ── FAQ section ────────────────────────────────────────────────── */}
        {faqItems && faqItems.length > 0 ? (
          <div className="mt-6 overflow-hidden rounded-[16px] border border-[#e0e0e0] bg-white">
            {faqItems.map((item, ii) => {
              const isOpen = openFaq === ii
              return (
                <div key={item.id ?? ii} className="border-b border-[#e0e0e0] last:border-b-0">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : ii)}
                    className="flex w-full items-center justify-between px-6 py-4 text-left"
                  >
                    <span className="font-['Inter'] text-[15px] font-medium text-[#111111]">
                      {item.question}
                    </span>
                    <span
                      className={`ml-4 flex-shrink-0 text-[20px] text-[#111111] transition-transform ${isOpen ? 'rotate-45' : ''}`}
                    >
                      +
                    </span>
                  </button>

                  {isOpen && item.answer ? (
                    <div className="px-6 pb-4 font-['Inter'] text-[14px] leading-[22px] text-[#303438]">
                      {item.answer}
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>
        ) : null}
      </div>
    </section>
  )
}
