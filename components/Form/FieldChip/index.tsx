import { IField } from '@/lib/interfaces'
import { cn } from '@/lib/utils'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import FieldLabel from '../FieldLabel'
import { handleFormFieldErrMsg } from '@/lib/form'
import { Chips } from 'primereact/chips'
import FieldErrMsg from '../FieldErrMsg'
import { classNames } from 'primereact/utils'
import { KeyFilterType } from 'primereact/keyfilter'

interface IProps extends IField {
   keyFilter?: KeyFilterType
   min?: any
   max?: any
   onChange?: any
   separator?: string
}

const FieldChip = (props: IProps) => {
   const {
      label,
      name,
      className = '',
      minLength,
      showErrMsg = true,
      isRequired = false,
      maxLength,
      keyFilter = null,
      min = null,
      max = null,
      placeholder = '',
      isReadonly = false,
      isDisabled,
      onChange,
      separator = ',',
   } = props

   const {
      register,
      control,
      formState: { errors },
   } = useFormContext()

   return (
      <div className={cn(className, 'field')}>
         <Controller
            name={name}
            control={control}
            // defaultValue={props.defaultValue || ''}
            render={({ field, fieldState }) => {
               const errMsg: any = handleFormFieldErrMsg(errors, field.name)

               return (
                  <>
                     {label && (
                        <FieldLabel
                           className={cn(errors[name] && 'p-error')}
                           label={label}
                           isRequired={isRequired}
                           name={field.name}
                        />
                     )}

                     <Chips
                        id={field.name}
                        {...field}
                        {...(max && { max })}
                        {...(min && { min })}
                        {...(maxLength && { maxLength })}
                        {...(placeholder && { placeholder })}
                        keyfilter={keyFilter}
                        value={[undefined, null].includes(field.value) ? '' : field.value}
                        onChange={(e) => {
                           field.onChange(e.value)
                           onChange && onChange({ value: e.value })
                        }}
                        className={classNames({
                           'p-invalid': fieldState.error,
                        })}
                        placeholder={placeholder}
                        separator={separator}
                     />

                     {errMsg && showErrMsg && <FieldErrMsg msg={errMsg} />}
                  </>
               )
            }}
         />
      </div>
   )
}

export default FieldChip
