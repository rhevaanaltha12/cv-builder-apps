'use client'
import { ISection, ISectionItem } from '../../config/interfaces'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { addNewSection, removeSectionItem, setSection } from '@/store/reducers/builder/builder.slice'
import { FormProvider, useForm } from 'react-hook-form'
import FieldText from '@/components/Form/FieldText'
import Button from '@/components/Button'
import FieldDatePicker from '@/components/Form/FieldDatePicker'
import { dateToFormat } from '@/lib/date'
import React from 'react'
import { Editor } from 'primereact/editor'

interface IForm {
   p_section: ISectionItem[]
}

const CertificationForm: React.FC<{ section: ISection }> = ({ section }) => {
   const dispatch = useAppDispatch()
   const { sections } = useAppSelector((state) => state.builderReducer)

   const RHF = useForm<IForm>({
      defaultValues: {
         p_section: [],
      },
   })

   const renderSection = (sectionId: string, key: keyof ISectionItem, idx: number, values: any) => {
      return sections.map((section) => {
         if (section.id !== sectionId) return section

         return {
            ...section,
            items: section.items.map((item: any, itemIdx: number) => {
               if (itemIdx !== idx) return item

               return { ...item, [key]: values }
            }),
         }
      })
   }

   const onSectionChange = (e: any, id: string, key: any, idx: number, isDate: boolean = false) => {
      const isEditor = key === 'description'

      let values: any

      if (isDate) {
         values = dateToFormat(e?.value, 'yM')
      } else if (isEditor) {
         values = e?.htmlValue
      } else {
         values = e?.value || ''
      }

      const itemValues = values
      const newSections = renderSection(id, key, idx, itemValues)
      dispatch(setSection(newSections))
   }

   return (
      <FormProvider {...RHF}>
         <div className="space-y-4">
            {section.items.map((item, idx) => (
               <div key={item.id} className="flex gap-2">
                  <div className="border border-gray-300 w-full p-6 rounded-md">
                     <div className="grid grid-cols-2 gap-4">
                        <FieldText
                           name={`p_section.${idx}.title`}
                           label="Certification Name"
                           placeholder="Input Certification Name"
                           onChange={(e: any) => onSectionChange(e, section.id, 'title', idx)}
                        />
                        <FieldText
                           name={`p_section.${idx}.subtitle`}
                           label="Issuing Organization"
                           placeholder="Input Issuing Organization"
                           onChange={(e: any) => onSectionChange(e, section.id, 'subtitle', idx)}
                        />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <FieldDatePicker
                           name={`p_section.${idx}.startDate`}
                           label="Date Issued"
                           placeholder="Input Date Issued"
                           format="MM yy"
                           viewMode="month"
                           onChange={(e: any) => onSectionChange(e, section.id, 'startDate', idx, true)}
                        />
                     </div>
                     <div className="card">
                        <Editor
                           value={item.description || ''}
                           onTextChange={(e: any) => onSectionChange(e, section.id, 'description', idx)}
                           style={{ height: '180px' }}
                           placeholder="Add description or key details (optional)"
                        />
                     </div>
                  </div>
                  <Button
                     icon={'pi-trash'}
                     iconType="prime"
                     variant="stroke"
                     size="sm"
                     theme="danger"
                     onClick={() => dispatch(removeSectionItem({ sectionId: section?.id, itemId: item?.id }))}
                  />
               </div>
            ))}

            <Button
               label="Add Certification"
               icon={'pi-plus'}
               iconType="prime"
               size="sm"
               variant="stroke"
               onClick={() => dispatch(addNewSection(section.id))}
            />
         </div>
      </FormProvider>
   )
}

export default CertificationForm
