import type { EmailField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Email: React.FC<
  EmailField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
  return (
    <Width width={width}>
      <Input
        defaultValue={defaultValue}
        id={name}
        placeholder={label}
        type="text"
        style={{
          background: 'transparent',
          border: 'none',
          outline: 'none',
          boxShadow: 'none',
          borderRadius: 0,
          height: 'auto',
          fontSize: '0.95rem',
          fontWeight: '400',
          padding: '11px 14px',
          width: '100%',
        }}
        {...register(name, { pattern: /^\S[^\s@]*@\S+$/, required })}
      />

      {errors[name] && <Error name={name} />}
    </Width>
  )
}
