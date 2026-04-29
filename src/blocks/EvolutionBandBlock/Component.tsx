'use client'

import React, { useState, useEffect } from 'react'

export type BiologyRow = {
  label?: string | null
  delta?: string | null
  direction?: 'up' | 'down' | 'new' | null
}

export type BiologyGroup = {
  eyebrow?: string | null
  rows?: BiologyRow[] | null
}

export type Cycle1Item = {
  name?: string | null
  detail?: string | null
  benefit?: string | null
  dose?: string | null
}

export type Cycle2Item = {
  name?: string | null
  detail?: string | null
  dose?: string | null
  status?: 'unchanged' | 'up' | 'down' | 'removed' | 'added' | null
}

export type EvolutionBandVariant = {
  variantKey: string
  darkMode?: boolean | null
  eyebrow?: string | null
  heading?: any | null
  subtext?: string | null
  cycle1Tag?: string | null
  cycle1Version?: string | null
  cycle1Name?: string | null
  cycle1Footer?: string | null
  cycle1Items?: Cycle1Item[] | null
  cycle2Tag?: string | null
  cycle2Version?: string | null
  cycle2Name?: string | null
  cycle2Footer?: string | null
  biologyGroups?: BiologyGroup[] | null
  cycle2Items?: Cycle2Item[] | null
}

export type EvolutionBandBlockType = {
  blockName?: string
  blockType?: 'evolutionBand'
  eyebrow?: string | null
  heading?: any | null
  subtext?: string | null
  cycle1Tag?: string | null
  cycle1Version?: string | null
  cycle1Name?: string | null
  cycle1Items?: Cycle1Item[] | null
  cycle1Footer?: string | null
  cycle2Tag?: string | null
  cycle2Version?: string | null
  cycle2Name?: string | null
  biologyGroups?: BiologyGroup[] | null
  cycle2Items?: Cycle2Item[] | null
  cycle2Footer?: string | null
  variants?: EvolutionBandVariant[] | null
}

// ─────────────────────────────────────────────────────────────────────────────
// Inline Lexical richtext renderer
// ─────────────────────────────────────────────────────────────────────────────
const IS_BOLD = 1
const IS_ITALIC = 2
const IS_UNDERLINE = 8

function renderLexicalNode(node: any, key: string): React.ReactNode {
  if (node.type === 'text') {
    // TextColorFeature stores color as inline CSS in node.style, e.g. "color: #00a8c2;"
    const colorMatch =
      typeof node.style === 'string'
        ? node.style.match(/(?:^|;)\s*color:\s*([^;]+)/)
        : null
    const color = colorMatch ? colorMatch[1].trim() : undefined
    let text: React.ReactNode = node.text
    if (node.format & IS_ITALIC) text = <em key={`em-${key}`}>{text}</em>
    if (node.format & IS_BOLD) text = <strong key={`b-${key}`}>{text}</strong>
    if (node.format & IS_UNDERLINE) text = <u key={`u-${key}`}>{text}</u>
    if (color) return <span key={key} style={{ color }}>{text}</span>
    return <React.Fragment key={key}>{text}</React.Fragment>
  }
  if (Array.isArray(node.children)) {
    return (
      <React.Fragment key={key}>
        {node.children.map((child: any, i: number) => renderLexicalNode(child, `${key}-${i}`))}
      </React.Fragment>
    )
  }
  return null
}

function RichTextInline({ content }: { content: any }): React.ReactNode {
  if (!content || typeof content !== 'object') return null
  const root = content?.root
  if (!root || !Array.isArray(root.children)) return null
  return root.children.flatMap((para: any, pi: number) => {
    if (!Array.isArray(para.children)) return []
    return para.children.map((child: any, ci: number) => renderLexicalNode(child, `${pi}-${ci}`))
  })
}

// ─────────────────────────────────────────────────────────────────────────────
const STATUS_MARK: Record<string, string> = {
  up: '↑',
  down: '↓',
  removed: '✕',
  added: '+',
}

export const EvolutionBandBlockComponent: React.FC<EvolutionBandBlockType> = (props) => {
  const {
    eyebrow,
    heading,
    subtext,
    cycle1Tag,
    cycle1Version,
    cycle1Name,
    cycle1Items,
    cycle1Footer,
    cycle2Tag,
    cycle2Version,
    cycle2Name,
    biologyGroups,
    cycle2Items,
    cycle2Footer,
    variants,
  } = props

  const [variantKey, setVariantKey] = useState<string>('')
  const [activeCycle, setActiveCycle] = useState<1 | 2>(1)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const key = params.get('v') ?? ''
    setVariantKey(key)
  }, [])

  const activeVariant = variants?.find((v) => v.variantKey === variantKey) ?? null

  const isDark = activeVariant?.darkMode === true

  // Resolved content — variant overrides default when set
  const resolvedEyebrow = activeVariant?.eyebrow ?? eyebrow
  const resolvedHeading = activeVariant?.heading ?? heading
  const resolvedSubtext = activeVariant?.subtext ?? subtext
  const resolvedCycle1Tag = activeVariant?.cycle1Tag ?? cycle1Tag
  const resolvedCycle1Version = activeVariant?.cycle1Version ?? cycle1Version
  const resolvedCycle1Name = activeVariant?.cycle1Name ?? cycle1Name
  const resolvedCycle1Footer = activeVariant?.cycle1Footer ?? cycle1Footer
  const resolvedCycle2Tag = activeVariant?.cycle2Tag ?? cycle2Tag
  const resolvedCycle2Version = activeVariant?.cycle2Version ?? cycle2Version
  const resolvedCycle2Name = activeVariant?.cycle2Name ?? cycle2Name
  const resolvedCycle2Footer = activeVariant?.cycle2Footer ?? cycle2Footer
  const resolvedCycle1Items = (activeVariant?.cycle1Items?.length ? activeVariant.cycle1Items : cycle1Items) ?? []
  const resolvedBiologyGroups = activeVariant?.biologyGroups?.length ? activeVariant.biologyGroups : biologyGroups
  const resolvedCycle2Items = (activeVariant?.cycle2Items?.length ? activeVariant.cycle2Items : cycle2Items) ?? []

  // ── Design tokens ──────────────────────────────────────────────────────────
  const teal = '#0a8fb0'
  const evoTextColor = isDark ? '#FFFFFF' : '#12314D'
  const evoDkMuted = isDark ? 'rgba(255,255,255,0.55)' : 'rgba(18,49,77,0.65)'
  const evoBorderW = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(18,49,77,0.08)'
  const evoBorderW2 = isDark ? 'rgba(255,255,255,0.14)' : 'rgba(18,49,77,0.10)'
  const cardBg = isDark ? 'linear-gradient(155deg,#1a3d5c 0%,#0a1e35 100%)' : '#FFFFFF'
  const cardBorder = isDark ? `1px solid ${evoBorderW2}` : 'none'
  const cardShadow = isDark
    ? '0 1px 2px rgba(0,0,0,0.2),0 8px 24px rgba(0,0,0,0.25),0 24px 56px -12px rgba(0,0,0,0.4)'
    : '0 1px 2px rgba(18,49,77,0.04),0 8px 24px rgba(18,49,77,0.06),0 24px 56px -12px rgba(18,49,77,0.10),0 0 0 1px rgba(18,49,77,0.07)'
  const toggleBg = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(18,49,77,0.04)'
  const toggleBorder = isDark ? `1px solid ${evoBorderW}` : 'none'
  const pillBg = isDark ? 'rgba(255,255,255,0.12)' : '#FFFFFF'
  const pillShadow = isDark
    ? `0 2px 8px rgba(0,0,0,0.2),0 0 0 1px ${evoBorderW2}`
    : '0 2px 8px rgba(18,49,77,0.08),0 0 0 1px rgba(18,49,77,0.05)'
  const listTopBorder = isDark ? evoBorderW2 : 'rgba(18,49,77,0.08)'
  const rowBottomBorder = isDark ? evoBorderW : 'rgba(18,49,77,0.08)'

  const getMarkColor = (status?: string | null) => {
    if (status === 'up' || status === 'added') return teal
    if (status === 'down') return '#a89070'
    if (status === 'removed') return '#9b8a6e'
    return evoDkMuted
  }

  // ── Shared card elements ────────────────────────────────────────────────────
  const topGradientLine = (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        background:
          'linear-gradient(90deg,transparent 0%,rgba(10,143,176,0.45) 50%,transparent 100%)',
        borderRadius: '18px 18px 0 0',
        pointerEvents: 'none',
      }}
    />
  )

  const cardStyle: React.CSSProperties = {
    position: 'relative',
    background: cardBg,
    color: evoTextColor,
    borderRadius: 18,
    padding: '1.5rem 1.5rem 1.25rem',
    border: cardBorder,
    boxShadow: cardShadow,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  }

  const renderCardHeader = (tag: string, version: string) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginBottom: '.5rem',
      }}
    >
      <div
        style={{
          fontSize: '.62rem',
          fontWeight: 600,
          letterSpacing: '.18em',
          textTransform: 'uppercase',
          color: teal,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '.5rem',
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: teal,
            boxShadow: '0 0 0 3px rgba(10,143,176,0.15)',
            display: 'inline-block',
            flexShrink: 0,
          }}
        />
        {tag}
      </div>
      <div style={{ fontSize: '.62rem', fontWeight: 400, color: evoDkMuted, letterSpacing: '.04em' }}>
        {version}
      </div>
    </div>
  )

  const renderCardTitle = (name: string) => (
    <div
      style={{
        fontFamily: "'Instrument Sans', -apple-system, sans-serif",
        fontSize: '1.15rem',
        fontWeight: 600,
        color: evoTextColor,
        marginBottom: '1.4rem',
        letterSpacing: '-.025em',
        lineHeight: 1.1,
      }}
    >
      {name}
    </div>
  )

  const renderCardFooter = (text: string) => (
    <div
      style={{
        marginTop: 'auto',
        paddingTop: '1rem',
        borderTop: `1px solid ${rowBottomBorder}`,
        fontSize: '.72rem',
        fontWeight: 400,
        color: evoDkMuted,
        lineHeight: 1.5,
        fontStyle: 'italic',
      }}
    >
      {text}
    </div>
  )

  return (
    <section
      style={{
        backgroundColor: isDark ? '#0a1e35' : '#FFFFFF',
        paddingTop: '3rem',
        paddingBottom: '3rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
      }}
    >
      <style>{`
        @keyframes evo-cycle-fade {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .evo-cycle-card { animation: evo-cycle-fade 0.35s ease; }
      `}</style>

      {/* Section head */}
      <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 3rem' }}>
        {/* Eyebrow */}
        {resolvedEyebrow && (
          <div
            style={{
              fontSize: '.7rem',
              fontWeight: 600,
              letterSpacing: '.18em',
              textTransform: 'uppercase',
              color: teal,
              marginBottom: '.75rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '.7rem',
              fontFamily: "'Instrument Sans', -apple-system, sans-serif",
            }}
          >
            <span style={{ width: 24, height: 1, background: teal, display: 'inline-block', flexShrink: 0 }} />
            {resolvedEyebrow}
            <span style={{ width: 24, height: 1, background: teal, display: 'inline-block', flexShrink: 0 }} />
          </div>
        )}

        {/* Heading (richtext inline) */}
        {resolvedHeading && (
          <h3
            style={{
              fontFamily: "'Instrument Sans', -apple-system, sans-serif",
              fontSize: 'clamp(1.85rem,3.3vw,2.7rem)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-.03em',
              color: evoTextColor,
              marginBottom: '.85rem',
              margin: '0 0 .85rem',
            }}
          >
            <RichTextInline content={resolvedHeading} />
          </h3>
        )}

        {/* Subtext */}
        {resolvedSubtext && (
          <p
            style={{
              fontSize: '.95rem',
              fontWeight: 300,
              color: evoDkMuted,
              lineHeight: 1.7,
              maxWidth: 580,
              margin: '0 auto',
            }}
          >
            {resolvedSubtext}
          </p>
        )}
      </div>

      {/* Cycle toggle */}
      <div
        role="tablist"
        aria-label="Prescription cycle"
        style={{
          position: 'relative',
          display: 'flex',
          background: toggleBg,
          border: toggleBorder,
          borderRadius: 12,
          padding: 5,
          margin: '0 auto 1.5rem',
          maxWidth: 380,
        }}
      >
        {/* Sliding pill */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            zIndex: 1,
            top: 5,
            bottom: 5,
            left: 5,
            width: 'calc(50% - 5px)',
            background: pillBg,
            borderRadius: 8,
            boxShadow: pillShadow,
            transition: 'transform 0.35s cubic-bezier(0.45,0,0.15,1)',
            transform: activeCycle === 2 ? 'translateX(100%)' : 'translateX(0)',
            pointerEvents: 'none',
          }}
        />
        {([1, 2] as const).map((cycleNum) => {
          const tag =
            cycleNum === 1
              ? resolvedCycle1Tag || 'Cycle 01'
              : resolvedCycle2Tag || 'Cycle 02'
          const version =
            cycleNum === 1
              ? resolvedCycle1Version || 'Baseline'
              : resolvedCycle2Version || 'Re-formulated'
          const isActive = activeCycle === cycleNum
          return (
            <button
              key={cycleNum}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCycle(cycleNum)}
              style={{
                position: 'relative',
                zIndex: 2,
                flex: 1,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '.6rem .9rem',
                borderRadius: 8,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '.1rem',
                color: isActive ? evoTextColor : evoDkMuted,
                transition: 'color 0.25s',
              }}
            >
              <span style={{ fontSize: '.78rem', fontWeight: 600, letterSpacing: '-.005em' }}>
                {tag}
              </span>
              <span
                style={{
                  fontSize: '.6rem',
                  fontWeight: 500,
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  opacity: 0.7,
                }}
              >
                {version}
              </span>
            </button>
          )
        })}
      </div>

      {/* Cycle stage */}
      <div style={{ maxWidth: 680, margin: '0 auto' }}>

        {/* ── Cycle 1 ── */}
        {activeCycle === 1 && (
          <article className="evo-cycle-card" style={cardStyle}>
            {topGradientLine}
            {renderCardHeader(resolvedCycle1Tag || 'Cycle 01', resolvedCycle1Version || 'Baseline')}
            {renderCardTitle(resolvedCycle1Name || 'Your starting formula')}

            {/* Supplement list */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderTop: `1px solid ${listTopBorder}`,
                marginBottom: '1.25rem',
              }}
            >
              {(resolvedCycle1Items).map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto 18px',
                    gap: '.65rem',
                    alignItems: 'center',
                    padding: '.55rem 0',
                    borderBottom: `1px solid ${rowBottomBorder}`,
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      fontSize: '.78rem',
                      fontWeight: 500,
                      color: evoTextColor,
                      letterSpacing: '-.005em',
                      lineHeight: 1.3,
                    }}
                  >
                    {item.name}
                    {item.detail && (
                      <small
                        style={{
                          display: 'block',
                          marginTop: '.15rem',
                          fontSize: '.62rem',
                          fontWeight: 400,
                          color: evoDkMuted,
                          letterSpacing: '.005em',
                          fontStyle: 'italic',
                        }}
                      >
                        {item.detail}
                      </small>
                    )}
                    {item.benefit && (
                      <small
                        style={{
                          display: 'block',
                          marginTop: '.2rem',
                          fontSize: '.56rem',
                          fontWeight: 600,
                          color: teal,
                          fontStyle: 'normal',
                          letterSpacing: '.08em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {item.benefit}
                      </small>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: '.72rem',
                      fontWeight: 600,
                      color: evoTextColor,
                      fontVariantNumeric: 'tabular-nums',
                      letterSpacing: '.005em',
                      textAlign: 'right',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.dose}
                  </div>
                  <div style={{ width: 18 }} />
                </div>
              ))}
            </div>

            {resolvedCycle1Footer && renderCardFooter(resolvedCycle1Footer)}
          </article>
        )}

        {/* ── Cycle 2 ── */}
        {activeCycle === 2 && (
          <article className="evo-cycle-card" style={cardStyle}>
            {topGradientLine}
            {renderCardHeader(
              resolvedCycle2Tag || 'Cycle 02',
              resolvedCycle2Version || 'Re-formulated',
            )}
            {renderCardTitle(resolvedCycle2Name || 'Your formula, updated')}

            {/* Biology groups */}
            {resolvedBiologyGroups && resolvedBiologyGroups.length > 0 && (
              <div style={{
                marginBottom: '1rem',
                background: 'linear-gradient(135deg,rgba(10,143,176,0.07) 0%,rgba(10,143,176,0.03) 100%)',
                border: '1px solid rgba(10,143,176,0.18)',
                borderRadius: 10,
                padding: '.8rem .9rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '.6rem',
              }}>
                {resolvedBiologyGroups.map((group, gi) => (
                  <div key={gi} style={{ display: 'flex', flexDirection: 'column', gap: '.55rem' }}>
                    {/* Eyebrow — sits outside the card */}
                    {group.eyebrow && (
                      <div
                        style={{
                          fontSize: '.62rem',
                          fontWeight: 600,
                          letterSpacing: '.18em',
                          textTransform: 'uppercase',
                          color: teal,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '.5rem',
                        }}
                      >
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: teal,
                            boxShadow: '0 0 0 3px rgba(10,143,176,0.18),0 0 12px rgba(10,143,176,0.5)',
                            display: 'inline-block',
                            flexShrink: 0,
                          }}
                        />
                        {group.eyebrow}
                      </div>
                    )}
                    {/* Delta rows — separate card div */}
                    {group.rows && group.rows.length > 0 && (
                      <div
                        style={{
                          background: 'rgba(255,255,255,0.7)',
                          border: '1px solid rgba(18,49,77,0.08)',
                          borderRadius: 12,
                          padding: '1.1rem 1rem',
                          display: 'grid',
                          gridTemplateColumns: 'repeat(2,1fr)',
                          gap: '.4rem .8rem',
                        }}
                      >
                        {group.rows.map((delta, di) => (
                          <div
                            key={di}
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <span
                              style={{
                                fontSize: '.72rem',
                                fontWeight: 500,
                                color: isDark ? '#FFFFFF' : '#12314D',
                              }}
                            >
                              {delta.label}
                            </span>
                            {delta.direction === 'new' ? (
                              <span
                                style={{
                                  fontSize: '.55rem',
                                  fontWeight: 600,
                                  letterSpacing: '.08em',
                                  textTransform: 'uppercase',
                                  background: 'rgba(10,143,176,0.15)',
                                  color: teal,
                                  padding: '.15rem .4rem',
                                  borderRadius: 3,
                                }}
                              >
                                {delta.delta || 'New'}
                              </span>
                            ) : (
                              <span
                                style={{
                                  fontSize: '1.05rem',
                                  fontWeight: 600,
                                  fontVariantNumeric: 'tabular-nums',
                                  color:
                                    delta.direction === 'up'
                                      ? teal
                                      : delta.direction === 'down'
                                        ? '#c08040'
                                        : '#12314D',
                                }}
                              >
                                {delta.delta}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Supplement list */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderTop: `1px solid ${listTopBorder}`,
                marginBottom: '1.25rem',
              }}
            >
              {(resolvedCycle2Items).map((item, i) => {
                const isRemoved = item.status === 'removed'
                const isAdded = item.status === 'added'
                const mark = STATUS_MARK[item.status ?? ''] ?? ''
                const markColor = getMarkColor(item.status)
                return (
                  <div
                    key={i}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr auto 18px',
                      gap: '.65rem',
                      alignItems: 'center',
                      padding: isAdded ? '.7rem .6rem' : '.55rem 0',
                      borderBottom: isAdded ? 'none' : `1px solid ${rowBottomBorder}`,
                      borderTop: isAdded ? '1px solid rgba(10,143,176,0.15)' : undefined,
                      background: isAdded ? 'rgba(10,143,176,0.05)' : undefined,
                      margin: isAdded ? '0 -.6rem' : undefined,
                      borderRadius: isAdded ? 6 : undefined,
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '.78rem',
                        fontWeight: 500,
                        color: isRemoved ? evoDkMuted : evoTextColor,
                        letterSpacing: '-.005em',
                        lineHeight: 1.3,
                        textDecoration: isRemoved ? 'line-through' : undefined,
                      }}
                    >
                      {item.name}
                      {item.detail && (
                        <small
                          style={{
                            display: 'block',
                            marginTop: '.15rem',
                            fontSize: '.62rem',
                            fontWeight: 400,
                            color: evoDkMuted,
                            letterSpacing: '.005em',
                            fontStyle: 'italic',
                            textDecoration: 'none',
                          }}
                        >
                          {item.detail}
                        </small>
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: '.72rem',
                        fontWeight: 600,
                        color: isRemoved ? evoDkMuted : evoTextColor,
                        fontVariantNumeric: 'tabular-nums',
                        letterSpacing: '.005em',
                        textAlign: 'right',
                        whiteSpace: 'nowrap',
                        textDecoration: isRemoved ? 'line-through' : undefined,
                      }}
                    >
                      {item.dose}
                    </div>
                    <div
                      style={{
                        width: 18,
                        fontSize: '.78rem',
                        fontWeight: 600,
                        lineHeight: 1,
                        textAlign: 'right',
                        color: markColor,
                      }}
                    >
                      {mark}
                    </div>
                  </div>
                )
              })}
            </div>

            {resolvedCycle2Footer && renderCardFooter(resolvedCycle2Footer)}
          </article>
        )}
      </div>

    </section>
  )
}
