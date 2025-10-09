import type { CheckboxField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { useFormContext } from 'react-hook-form'

import { Checkbox as CheckboxUi } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'
import { useIsMobile } from '@/hooks/useIsMobile'

export const Checkbox: React.FC<
  CheckboxField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
  const props = register(name, { required: required })
  const { setValue } = useFormContext()
  const isMobile = useIsMobile()

  return (
    <Width width={width}>
      <div
        className={`flex items-center ${isMobile ? 'gap-1' : 'gap-2'}`}
        style={{ paddingLeft: isMobile ? '0' : '24px' }}
      >
        <CheckboxUi
          defaultChecked={defaultValue}
          id={name}
          {...props}
          onCheckedChange={(checked) => {
            setValue(props.name, checked)
          }}
          style={{ borderColor: 'black' }}
        />
        <Label
          htmlFor={name}
          style={{
            fontFamily: 'Inter',
            fontWeight: '400',
            lineHeight: '24px',
            fontSize: isMobile ? '13px' : '16px',
          }}
        >
          {required && (
            <span className="required">
              <span className="sr-only">(required)</span>
            </span>
          )}
          {label}
        </Label>
      </div>
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
