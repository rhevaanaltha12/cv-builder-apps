'use client'
import React from 'react'
import FormPreviewCanvas from './components/forms/FormPreviewCanvas'
import FormEditor from './components/forms/FormEditor'
import dynamic from 'next/dynamic'
// import FormResumeCategory from './components/forms/FormResumeCategory'
const FormResumeCategory = dynamic(() => import('./components/forms/FormResumeCategory'), {
   ssr: false,
})
const PageMain = () => {
   return (
      <div className="page-builder-main py-4 px-16">
         <div className="page-builder-container grid grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
            <div className="relative hidden lg:block">
               <FormPreviewCanvas />
            </div>
            <div className="right-container overflow-y-auto space-y-4 pr-2">
               <FormEditor />
            </div>
            <div className="overflow-y-auto space-y-4 pr-2">
               <FormResumeCategory />
            </div>
         </div>
      </div>
   )
}

export default PageMain
