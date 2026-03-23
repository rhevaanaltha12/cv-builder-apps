import { useFormContext, Controller } from 'react-hook-form'
import { classNames } from 'primereact/utils'
import { Checkbox } from 'primereact/checkbox'
import { useEffect } from 'react'
import FieldErrMsg from '../FieldErrMsg'
import { IField } from '@/lib/interfaces'
import FieldLabel from '../FieldLabel'
import { cn } from '@/lib/utils'

interface IProps extends IField {
   search?: boolean
   defaultValue?: boolean
   checked?: boolean
   value?: any
   description?: any
   onChange?: (data: any) => void
}

function FieldCheckbox(props: IProps) {
   const {
      label,
      name,
      className = '',
      minLength,
      showErrMsg = true,
      defaultValue = null,
      isRequired = false,
      checked,
      maxLength,
      onChange = null,
      value = null,
      placeholder = '',
      isReadonly = false,
      description,
      search = true,
      isDisabled = false,
   } = props

   const { control, setValue } = useFormContext()

   // useEffect(() => {
   //    setValue(name, checked)
   // }, [checked])

   return (
      <div className={cn(className, 'field field-checkbox')}>
         <Controller
            name={name}
            control={control}
            render={({ field, fieldState, formState }) => {
               const { errors } = formState
               const errMsg: any = errors?.[field.name]?.message

               return (
                  <>
                     <Checkbox
                        inputId={field.name}
                        onChange={({ value, checked }: { value: any; checked: boolean }) => {
                           field.onChange(checked)
                           onChange && onChange({ value, checked })
                        }}
                        checked={field.value}
                        {...(value && { value })}
                        className={classNames({
                           'p-invalid': fieldState.error,
                        })}
                        disabled={isDisabled ?? isReadonly}
                     />

                     <div>
                        <FieldLabel
                           className={cn(errors[name] && 'p-error')}
                           label={label || ''}
                           isRequired={isRequired}
                           name={field.name}
                        />

                        {description && <p className="description">{description}</p>}
                        {errMsg && showErrMsg && <FieldErrMsg msg={errMsg} />}
                     </div>
                  </>
               )
            }}
         />
      </div>
   )
}

export default FieldCheckbox
