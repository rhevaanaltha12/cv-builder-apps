import { ensureProtocol, formatUrlDisplay, isUrl } from '@/lib/method'
import React from 'react'

interface IProps {
   icon?: React.FC<{ className?: string; style?: React.CSSProperties }>
   value: string
   href?: string
   color?: string
   fontSize: number
   showIcon?: boolean
}

const ContactItem = (props: IProps) => {
   const { icon: Icon, value, href, color, fontSize, showIcon } = props

   if (!value) return null
   const displayValue = isUrl(value) ? formatUrlDisplay(value) : value
   const content = (
      <span className="flex items-center gap-1" style={{ fontSize }}>
         {showIcon && Icon && <Icon className="w-3 h-3 flex-shrink-0" style={{ color }} />}
         <span>{displayValue}</span>
      </span>
   )

   if (href) {
      return (
         <a
            href={ensureProtocol(href)}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            style={{ color: color || 'inherit' }}
            onClick={(e) => e.stopPropagation()}
         >
            {content}
         </a>
      )
   }
   return content
}

export default ContactItem
