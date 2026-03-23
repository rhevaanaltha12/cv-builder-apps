import { handleFormFieldErrMsg } from '@/lib/form'
import { IField, ISelectOpts } from '@/lib/interfaces'
import React, { useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import FieldLabel from '../FieldLabel'
import { cn } from '@/lib/utils'
import { Dropdown } from 'primereact/dropdown'
import FieldErrMsg from '../FieldErrMsg'

interface IProps extends IField {
   search?: boolean
   options: ISelectOpts[]
   onChange?: (data: Record<string, unknown>) => void
   showClear?: any
   tooltip?: boolean
   message?: string
}

const FieldSelect = (props: IProps) => {
   const {
      label,
      name,
      className = '',
      minLength,
      showErrMsg = true,
      isRequired = false,
      maxLength,
      placeholder = '',
      showClear = undefined,
      isReadonly = false,
      onChange,
      search = true,
      isDisabled = false,
      options,
      tooltip = false,
      message = '',
   } = props

   const { control, getValues, setValue } = useFormContext()

   const isGrouped = options?.[0]?.items ? true : false

   useEffect(() => {
      const elVal = getValues(name)

      // if (!elVal && !search) {
      //    setValue(name, options?.[0]?.value ?? '')
      // }
   }, [])

   useEffect(() => {
      const currVal = getValues(name)
      if (!options.length) return

      // case nya default value dari db
      // ternyata ga ada di list option nya
      // waktu di submit ini lolos vlaidasi
      // jadi harus di reset manual disini
      const found = options.find((row: any) => row.value === currVal)
      if (!found) {
         // TODO : di case form generator ini menyebabkan infinite loop
         // setValue(name, '')
      }
   }, [options])

   return (
      <div className={`${className} field`}>
         <Controller
            name={name}
            control={control}
            render={({ field, formState: { errors }, fieldState }) => {
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

                     <Dropdown
                        id={field.name}
                        disabled={isDisabled || isReadonly}
                        placeholder={placeholder}
                        value={field.value}
                        onChange={(e) => {
                           field.onChange(e.value ?? '')
                           onChange && onChange({ value: e.value ?? '' })
                        }}
                        options={options}
                        filter={search}
                        showClear={showClear ?? field.value}
                        optionLabel="label"
                        {...(isGrouped && {
                           optionGroupLabel: 'label',
                           optionGroupChildren: 'items',
                        })}
                        filterBy="label"
                        className={cn(fieldState.error && 'p-invalid')}
                        resetFilterOnHide={true}
                     />

                     {errMsg && showErrMsg && <FieldErrMsg msg={errMsg} />}
                  </>
               )
            }}
         />
      </div>
   )
}

export default FieldSelect
