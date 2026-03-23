'use client'
import { cn } from '@/lib/utils'
import { Eye } from 'lucide-react'
import React, { useState } from 'react'

interface IProps {
   label: string
   children: any
   className?: string
   showCollapseBtn?: boolean
}

const Container = (props: IProps) => {
   const { label, children, className, showCollapseBtn = false } = props

   const [collapse, setCollapse] = useState(false)
   const handleClick = () => {
      setCollapse(!collapse)
   }

   return (
      <div className={cn('c-form-container bg-white rounded-md shadow-md border border-t-4 border-t-sky-600 mb-2 ', className)}>
         <div className={cn(showCollapseBtn ? 'flex items-center justify-between' : '')}>
            <h5 className="font-medium p-4">{label}</h5>

            {showCollapseBtn && (
               <button
                  type="button"
                  onClick={handleClick}
                  className="w-8 h-8 hover:bg-gray-200 rounded-[50%] mr-4 cursor-pointer"
               >
                  <i className={`pi-angle-${collapse ? 'down' : 'up'} pi`}></i>
               </button>
            )}
         </div>
         <div className={cn('border border-t-2 border-t-gray-500/10 mx-3', collapse ? 'hidden' : '')}></div>
         <div className={cn('p-4', collapse ? 'hidden' : '')}>{children}</div>
      </div>
   )
}

export default Container
