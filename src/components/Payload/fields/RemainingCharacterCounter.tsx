'use client'

import React from 'react'
import { useField } from '@payloadcms/ui'

type Props = {
  path: string
  maxLength: number
}

export const RemainingCharacterCounter: React.FC<Props> = ({ path, maxLength }) => {
  const { value } = useField<string>({ path })

  const currentLength = typeof value === 'string' ? value.length : 0
  const remaining = maxLength - currentLength
  const exceeded = remaining < 0

  return (
    <div
      style={{
        marginTop: '6px',
        fontSize: '12px',
        lineHeight: '16px',
        textAlign: 'right',
        color: exceeded ? '#dc2626' : '#6b7280',
      }}
    >
      {exceeded
        ? `${Math.abs(remaining)} characters over limit`
        : `${remaining} characters remaining`}
    </div>
  )
}
