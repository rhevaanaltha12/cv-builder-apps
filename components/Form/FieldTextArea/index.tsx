import { IField } from '@/lib/interfaces'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import FieldErrMsg from '../FieldErrMsg'
import { cn } from '@/lib/utils'
import FieldLabel from '../FieldLabel'
import { InputTextarea } from 'primereact/inputtextarea'
import { classNames } from 'primereact/utils'
import { handleFormFieldErrMsg } from '@/lib/form'

interface IProps extends IField {
   rows?: number
   textHelper?: string
   cols?: number
   onChange?: any
}

const FieldTextArea = (props: IProps) => {
   const {
      label,
      name,
      className = '',
      minLength,
      showErrMsg = true,
      isRequired = false,
      maxLength,
      textHelper = '',
      placeholder = '',
      rows,
      cols,
      isReadonly = false,
      isDisabled,
      onChange,
   } = props

   const {
      control,
      setValue,
      watch,
      setError,
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

                     <InputTextarea
                        id={field.name}
                        {...field}
                        rows={20}
                        placeholder={placeholder}
                        disabled={isReadonly}
                        value={[undefined, null].includes(field.value) ? '' : field.value}
                        className={classNames({
                           'p-invalid': fieldState.error,
                        })}
                        onChange={(e: any) => {
                           field.onChange(e.target.value)
                           onChange &&
                              onChange({
                                 value: e.target.value,
                              })
                        }}
                     />

                     {textHelper && !(errMsg && showErrMsg) && (
                        <small id={`${name}-help`} className="block">
                           {textHelper}
                        </small>
                     )}

                     {errMsg && showErrMsg && <FieldErrMsg msg={errMsg} />}
                  </>
               )
            }}
         />
      </div>
   )
}

export default FieldTextArea
