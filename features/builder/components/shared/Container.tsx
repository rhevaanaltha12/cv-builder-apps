'use client'
import { cn } from '@/lib/utils'
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
      <div
         className={cn(
            'c-form-container bg-white/70 backdrop-blur-md rounded-2xl shadow-sm border border-white/40 mb-4 transition-all duration-300 hover:shadow-md',
            className
         )}
      >
         <div
            className={cn(
               'flex items-center justify-between p-5 cursor-pointer select-none',
               showCollapseBtn && 'hover:bg-sky-50/30'
            )}
            onClick={showCollapseBtn ? handleClick : undefined}
            onKeyDown={(e) => {
               if (showCollapseBtn && (e.key === 'Enter' || e.key === ' ')) {
                  handleClick()
               }
            }}
            role={showCollapseBtn ? 'button' : undefined}
            tabIndex={showCollapseBtn ? 0 : undefined}
            aria-expanded={showCollapseBtn ? !collapse : undefined}
         >
            <h5 className="font-semibold text-gray-800 tracking-tight">{label}</h5>

            {showCollapseBtn && (
               <div className="flex items-center gap-2">
                  <div
                     className={cn(
                        'w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200',
                        collapse ? 'bg-sky-100 text-sky-600' : 'bg-gray-100 text-gray-500'
                     )}
                  >
                     <i className={`pi pi-chevron-${collapse ? 'down' : 'up'} text-xs`}></i>
                  </div>
               </div>
            )}
         </div>
         {!collapse && (
            <>
               <div className="h-px bg-linear-to-r from-transparent via-gray-200 to-transparent mx-5"></div>
               <div className="p-6 pt-4 animate-in fade-in slide-in-from-top-2 duration-300">{children}</div>
            </>
         )}
      </div>
   )
}

export default Container
