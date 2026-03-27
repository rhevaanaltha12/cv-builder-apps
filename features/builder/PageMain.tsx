'use client'
import React, { useState } from 'react'
import FormPreviewCanvas from './components/forms/FormPreviewCanvas'
import FormEditor from './components/forms/FormEditor'
import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'
import { PenLine, Layout } from 'lucide-react'

// import FormResumeCategory from './components/forms/FormResumeCategory'
const FormResumeCategory = dynamic(() => import('./components/forms/FormResumeCategory'), {
   ssr: false,
})

const PageMain = () => {
   const [viewMode, setViewMode] = useState<'editor' | 'preview'>('editor')

   return (
      <div className="page-builder-main py-4 px-4 md:px-8 lg:px-16 min-h-[calc(100vh-8rem)]">
         {/* Mobile View Switcher */}
         <div className="flex lg:hidden mb-6 bg-gray-100/80 backdrop-blur-sm p-1.5 rounded-2xl border border-gray-200 shadow-inner">
            <button
               onClick={() => setViewMode('editor')}
               className={cn(
                  'flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-xl transition-all duration-300',
                  viewMode === 'editor' ? 'bg-white shadow-md text-sky-600' : 'text-gray-500 hover:text-gray-700'
               )}
            >
               <PenLine size={16} />
               Editor
            </button>
            <button
               onClick={() => setViewMode('preview')}
               className={cn(
                  'flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-xl transition-all duration-300',
                  viewMode === 'preview' ? 'bg-white shadow-md text-sky-600' : 'text-gray-500 hover:text-gray-700'
               )}
            >
               <Layout size={16} />
               Preview
            </button>
         </div>

         <div className="page-builder-container grid grid-cols-1 lg:grid-cols-3 gap-6 lg:h-[calc(100vh-8rem)]">
            {/* Live Preview - Hidden on mobile unless preview mode is active */}
            <div className={cn('relative lg:block order-2 lg:order-1 h-full', viewMode === 'preview' ? 'block' : 'hidden')}>
               <FormPreviewCanvas />
            </div>

            {/* Form Editor - Hidden on mobile if preview mode is active */}
            <div
               className={cn(
                  'right-container space-y-4 lg:block order-1 lg:order-2 lg:overflow-y-auto lg:pr-2 h-full',
                  viewMode === 'editor' ? 'block' : 'hidden'
               )}
            >
               <FormEditor />
            </div>

            {/* Resume Category/Structure - Hidden on mobile if preview mode is active */}
            <div
               className={cn(
                  'space-y-4 lg:block order-3 lg:order-3 lg:overflow-y-auto lg:pr-2 h-full',
                  viewMode === 'editor' ? 'block' : 'hidden'
               )}
            >
               <FormResumeCategory />
            </div>
         </div>
      </div>
   )
}

export default PageMain
