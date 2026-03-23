import { cn } from '@/lib/utils'
import React from 'react'

interface IProps {
   label: string
   type?: 'green' | 'red' | 'yellow' | 'gray' | 'blue' | 'purple'
   className?: string
}

const RowBadge = (props: IProps) => {
   const { label, type = 'blue', className } = props
   return (
      <div
         className={cn(
            'p-row-badge text-sm w-max py-1 px-2 rounded-sm',
            className,
            type === 'blue' && 'bg-sky-500/10 text-sky-700',
            type === 'green' && 'bg-green-500/10 text-green-700',
            type === 'red' && 'bg-red-500/10 text-red-700',
            type === 'yellow' && 'bg-amber-500/10 text-amber-700',
            type === 'gray' && 'bg-gray-500/10 text-gray-700',
            type === 'purple' && 'bg-violet-500/10 text-violet-700'
         )}
      >
         {label}
      </div>
   )
}

export default RowBadge
