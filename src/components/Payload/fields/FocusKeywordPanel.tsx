'use client'

import React from 'react'
import { useField } from '@payloadcms/ui'

export const FocusKeywordPanel: React.FC = () => {
  const { value } = useField<string>({ path: 'focusKeyword' })

  const keyword = typeof value === 'string' ? value.trim() : ''
  const hasKeyword = keyword.length > 0

  return (
    <div
      style={{
        position: 'sticky',
        top: '60px',
        zIndex: 100,
        marginTop: '8px',
        marginBottom: '16px',
      }}
    >
      <div
        style={{
          border: '1px solid rgb(60, 60, 60)',
          borderRadius: '12px',
          background: '#1D1D1D',
          padding: '16px',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
        }}
      >
        <div
          style={{
            fontSize: '12px',
            lineHeight: '16px',
            fontWeight: 600,
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            color: '#e5e7eb',
            marginBottom: '8px',
          }}
        >
          Focus keyword
        </div>

        <div
          style={{
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 500,
            color: '#ffffff',
            wordBreak: 'break-word',
          }}
        >
          {hasKeyword ? keyword : 'No focus keyword set yet'}
        </div>
      </div>
    </div>
  )
}
