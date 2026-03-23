import { cn } from '@/lib/utils'
import { useAppSelector } from '@/store/hook'
import React, { forwardRef } from 'react'
import DefaultHeader from '../header/DefaultHeader'
import SectionTitle from '../sections/SectionTitle'
import DefaultSection from '../sections/DefaultSection'

const DefaultLayout = forwardRef((_, ref: any) => {
   const {
      sections,
      template: { isHarvard },
   } = useAppSelector((state) => state.builderReducer)

   return (
      <div ref={ref} className={cn('w-full h-full p-8', isHarvard ? 'font-serif' : 'font-sans')}>
         <DefaultHeader />
         {sections.map((section) => (
            <div key={section.id} className="mb-4">
               <SectionTitle title={section.title} />
               <DefaultSection section={section} />
            </div>
         ))}
      </div>
   )
})

export default DefaultLayout
