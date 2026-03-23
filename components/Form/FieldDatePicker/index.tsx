import { useFormContext, Controller } from 'react-hook-form'
import FieldErrMsg from '../FieldErrMsg'
import FieldLabel from '../FieldLabel'
import { classNames } from 'primereact/utils'
import { Calendar } from 'primereact/calendar'
import { IField } from '@/lib/interfaces'
import { cn } from '@/lib/utils'

interface IProps extends IField {
   format?: string
   selectionMode?: 'single' | 'multiple' | 'range'
   range?: boolean
   showTime?: boolean
   timeOnly?: boolean
   hourFormat?: any
   showSeconds?: boolean
   minDate?: any
   maxDate?: any
   viewMode?: 'date' | 'month' | 'year'
   onChange?: any
}

function FieldDatePicker(props: IProps) {
   const {
      label,
      name,
      className = '',
      minLength,
      showErrMsg = true,
      isRequired = false,
      maxLength,
      selectionMode = 'single',
      placeholder = '',
      format = '',
      isReadonly = false,
      isDisabled,
      showTime = false,
      showSeconds = false,
      minDate = undefined,
      maxDate = undefined,
      timeOnly = false,
      hourFormat = undefined,
      viewMode = 'date',
      onChange,
   } = props

   const { control } = useFormContext()

   return (
      <div className={cn(className, 'field')}>
         <Controller
            name={name}
            control={control}
            render={({ field, formState: { errors }, fieldState }) => {
               const errMsg = errors?.[field.name]?.message
               const hasError = fieldState?.error || errMsg

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

                     <Calendar
                        {...field}
                        minDate={minDate}
                        maxDate={maxDate}
                        id={field.name}
                        value={field.value}
                        showIcon
                        showTime={showTime}
                        showSeconds={showSeconds}
                        dateFormat={format}
                        selectionMode={selectionMode}
                        readOnlyInput
                        className={classNames({ 'p-invalid': hasError })}
                        hourFormat={hourFormat}
                        timeOnly={timeOnly}
                        disabled={isReadonly || isDisabled}
                        placeholder={placeholder}
                        view={viewMode}
                        onChange={(e) => {
                           field.onChange(e.value)
                           onChange && onChange({ value: e.value })
                        }}
                     />

                     {errMsg && showErrMsg && <FieldErrMsg msg={`${errMsg}`} />}
                  </>
               )
            }}
         />
      </div>
   )
}

export default FieldDatePicker
