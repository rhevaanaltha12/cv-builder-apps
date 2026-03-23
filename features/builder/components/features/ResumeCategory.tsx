import { cn } from '@/lib/utils'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { setSection } from '@/store/reducers/builder/builder.slice'
import { Plus, Minus } from 'lucide-react'
import React, { useMemo } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { ISectionType } from '../../config/interfaces'
import { createSection, SECTION_CONFIG } from '../../config/constant'

const ResumeCategory = () => {
   const dispatch = useAppDispatch()
   const { sections, personalInfo } = useAppSelector((state) => state.builderReducer)

   const RHF = useForm({ defaultValues: {} })

   const existingSectionTypes = useMemo(() => {
      return new Set(sections.map((s) => s.type))
   }, [sections])

   const availableSections = useMemo(() => {
      const types: ISectionType[] = ['experience', 'education', 'skills', 'projects', 'certifications']
      return types.map((type) => ({
         type,
         ...SECTION_CONFIG[type],
         exists: existingSectionTypes.has(type),
         allowMultiple: false,
      }))
   }, [existingSectionTypes])

   const handleToggleSection = (type: ISectionType, exists: boolean, allowMultiple: boolean) => {
      if (exists && !allowMultiple) {
         const sectionToRemove = sections.find((s) => s.type === type)
         if (sectionToRemove) {
            const filtered = sections?.filter((item) => item?.id !== sectionToRemove?.id)
            dispatch(setSection(filtered))
         }
      } else {
         dispatch(setSection([...sections, createSection(type)]))
      }
   }

   return (
      <FormProvider {...RHF}>
         <div className="py-4">
            <div>Resume Section</div>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {availableSections.map(({ type, label, icon, exists, allowMultiple }) => {
               return (
                  <button
                     key={type}
                     onClick={() => handleToggleSection(type, exists, allowMultiple)}
                     className={cn(
                        'px-4 py-3 rounded-lg text-sm font-medium',
                        'flex items-center justify-between gap-2 transition-all duration-200 cursor-pointer',
                        exists
                           ? 'bg-sky-50 text-sky-700 border border-sky-700 shadow-sm'
                           : 'bg-gray-50 text-gray-500 border border-transparent hover:border-gray-500 hover:bg-muted'
                     )}
                  >
                     <div className="flex items-center gap-2.5">
                        <div
                           className={cn(
                              'w-6 h-6 rounded-md flex items-center justify-center',
                              exists ? 'bg-sky-200' : 'bg-gray-200'
                           )}
                        >
                           {icon}
                        </div>
                        <span>{label}</span>
                     </div>
                     {exists ? (
                        allowMultiple ? (
                           <Plus className="w-4 h-4" />
                        ) : (
                           <Minus className="w-4 h-4 opacity-60" />
                        )
                     ) : (
                        <Plus className="w-4 h-4 opacity-40" />
                     )}
                  </button>
               )
            })}
         </div>
      </FormProvider>
   )
}

export default ResumeCategory
