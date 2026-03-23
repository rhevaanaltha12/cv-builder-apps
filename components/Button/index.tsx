import { ButtonType, ButtonVariant, Size, Themes } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Button as PrimeBtn } from 'primereact/button'
import React from 'react'

interface IProps {
   className?: string
   id?: any
   label?: string
   icon?: any
   iconType?: 'lucide' | 'prime'
   theme?: Themes
   size?: Size
   isBlock?: boolean
   isDisabled?: boolean
   isLoading?: boolean
   title?: string
   type?: ButtonType
   variant?: ButtonVariant
   onClick?: any
   style?: React.CSSProperties
}

const Button = (props: IProps) => {
   const {
      className = '',
      id = null,
      label,
      icon,
      theme = 'primary',
      size = 'md',
      isBlock = false,
      isDisabled = false,
      isLoading = false,
      title = '',
      type = 'button',
      variant = 'solid',
      style,
      onClick = () => {},
      iconType = 'prime',
   } = props

   return (
      <PrimeBtn
         id={id}
         type={type}
         label={label}
         className={cn(
            'p-btn-prime',
            theme,
            size,
            className,
            variant
            // 'p-btn-prime text-white cursor-pointer rounded-md font-medium justify-center border-none focus:shadow-none',
            // 'font-(family-name:--font-jakarta-sans)',
            // theme === 'primary' && 'bg-sky-500 hover:bg-sky-500/90 active:bg-sky-600/90',
            // theme === 'danger' && 'bg-red-500 hover:bg-red-500/90 active:bg-red-600/90',
            // theme === 'success' && 'bg-green-500 hover:bg-green-500/90 active:bg-green-600/90',
            // theme === 'warning' && 'bg-amber-500 hover:bg-amber-500/90 active:bg-amber-600/90',
            // theme === 'normal' && 'bg-white text-gray-700 border border-gray-400 hover:bg-gray-100/90 active:bg-gray-200/90',
            // size === 'sm' && 'text-sm py-2 px-4',
            // size === 'md' && 'text-md py-2 px-4',
            // size === 'lg' && 'text-lg py-2 px-4'
         )}
         disabled={isDisabled}
         loading={isLoading}
         onClick={onClick}
         icon={icon && iconType === 'lucide' ? icon : icon && iconType === 'prime' ? `pi ${icon}` : undefined}
         style={style}
      />
   )
}

export default Button
