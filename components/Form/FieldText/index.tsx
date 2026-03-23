import { handleFormFieldErrMsg } from '@/lib/form'
import { IField } from '@/lib/interfaces'
import { cn } from '@/lib/utils'
import { KeyFilterType } from 'primereact/keyfilter'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import FieldLabel from '../FieldLabel'
import { InputText } from 'primereact/inputtext'
import FieldErrMsg from '../FieldErrMsg'

interface IProps extends IField {
   keyFilter?: KeyFilterType
   min?: any
   max?: any
   onChange?: any
}

const FieldText = (props: IProps) => {
   const {
      label,
      name,
      className = '',
      minLength,
      keyFilter = null,
      showErrMsg = true,
      isRequired = false,
      maxLength,
      min = null,
      max = null,
      placeholder = '',
      isReadonly = false,
      isDisabled,
      onChange,
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

                     <InputText
                        id={field.name}
                        {...field}
                        {...(max && { max })}
                        {...(min && { min })}
                        {...(maxLength && { maxLength })}
                        {...(placeholder && { placeholder })}
                        keyfilter={keyFilter}
                        disabled={isReadonly || isDisabled}
                        value={[undefined, null].includes(field.value) ? '' : field.value}
                        onChange={(e) => {
                           field.onChange(e.target.value)
                           onChange && onChange({ value: e.target.value })
                        }}
                        //    className={classNames({
                        //       'p-invalid': fieldState.error,
                        //       sm: size == 'sm',
                        //       lg: size == 'lg',
                        //       plain: inputType == 'plain',
                        //    })}
                        className={cn(fieldState.error && 'p-invalid')}
                        placeholder={placeholder}
                     />

                     {errMsg && showErrMsg && <FieldErrMsg msg={errMsg} />}
                  </>
               )
            }}
         />
      </div>
   )
}

export default FieldText
