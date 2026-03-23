export interface IField {
   label?: string
   name: string
   className?: string
   placeholder?: string
   isDisabled?: boolean
   isReadonly?: boolean
   showErrMsg?: boolean
   isRequired?: boolean
   minLength?: number
   maxLength?: number
}

export interface ISelectOpts {
   label: string
   value?: any
   items?: {
      label: string
      value: string
   }[]
}
