import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'
import '../../styles/banner-template.css'
import '../../blocks/landingBlocks/landing-template.css'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title, subtitle } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div className="banner-wrapper">
      <div
        className="banner-container"
        style={{
          backgroundColor: 'var(--banner-bg-dark)',
          minHeight: '420px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        {/* Background image */}
        {heroImage && typeof heroImage !== 'string' && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <Media
              fill
              priority
              imgClassName="object-cover"
              resource={heroImage}
            />
          </div>
        )}

        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            padding: '40px',
            maxWidth: '860px',
          }}
        >
          {/* Category tags */}
          {categories && categories.length > 0 && (
            <div className="lc-tags" style={{ marginBottom: '16px' }}>
              {categories.map((category, index) => {
                if (typeof category === 'object' && category !== null) {
                  return (
                    <span
                      key={index}
                      className="lc-tag"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        color: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      {category.title || 'Untitled category'}
                    </span>
                  )
                }
                return null
              })}
            </div>
          )}

          {/* Title */}
          <h1
            className="banner-heading banner-heading--on-dark"
            style={{ fontSize: 'clamp(32px, 4.5vw, 64px)', lineHeight: '1.1', marginBottom: subtitle ? '16px' : '24px' }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p
              className="banner-description banner-description--on-dark"
              style={{ marginBottom: '24px', maxWidth: '640px' }}
            >
              {subtitle}
            </p>
          )}

          {/* Author + Date */}
          {(hasAuthors || publishedAt) && (
            <div
              style={{ display: 'flex', flexDirection: 'row', gap: '24px', flexWrap: 'wrap' }}
            >
              {hasAuthors && (
                <span
                  className="banner-meta"
                  style={{ color: 'rgba(255,255,255,0.75)' }}
                >
                  {formatAuthors(populatedAuthors)}
                </span>
              )}
              {publishedAt && (
                <time
                  className="banner-meta"
                  dateTime={publishedAt}
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  {formatDateTime(publishedAt)}
                </time>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
