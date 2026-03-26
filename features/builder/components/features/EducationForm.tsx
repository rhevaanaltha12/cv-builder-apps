'use client'
import { Trash2, Plus } from 'lucide-react'
import { ISection, ISectionItem } from '../../config/interfaces'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { addNewSection, removeSectionItem, setSection } from '@/store/reducers/builder/builder.slice'
import { FormProvider, useForm } from 'react-hook-form'
import FieldText from '@/components/Form/FieldText'
import Button from '@/components/Button'
import FieldDatePicker from '@/components/Form/FieldDatePicker'
import FieldCheckbox from '@/components/Form/FieldCheckbox'
import { dateToFormat } from '@/lib/date'
import { useEffect, useState } from 'react'
import { Editor } from 'primereact/editor'

interface IForm {
   p_section: ISectionItem[]
}

const EducationForm: React.FC<{ section: ISection }> = ({ section }) => {
   const [text, setText] = useState('')
   const dispatch = useAppDispatch()
   const { personalInfo, sections } = useAppSelector((state) => state.builderReducer)

   const [check, setCheck] = useState(false)

   const RHF = useForm<IForm>({
      defaultValues: {
         p_section: [],
      },
   })

   const { watch, setValue } = RHF

   const renderSection = (sectionId: string, key: keyof ISectionItem, idx: number, values: any) => {
      return sections.map((section) => {
         if (section.id !== sectionId) return section

         return {
            ...section,
            items: section.items.map((item: any, itemIdx: number) => {
               if (itemIdx !== idx) return item

               if (key === 'current') {
                  const isCurrent = Boolean(values)
                  return {
                     ...item,
                     current: values,
                     ...(isCurrent ? { endDate: '' } : {}),
                  }
               }

               return { ...item, [key]: values }
            }),
         }
      })
   }

   const onSectionChange = (e: any, id: string, key: any, idx: number, isDate: boolean = false) => {
      const isEditor = key === 'description'
      const isCheckbox = key === 'current'

      // let values = isDate ? dateToFormat(e?.value, 'yM') : e?.value
      let values: any

      if (isDate) {
         values = dateToFormat(e?.value, 'yM')
      } else if (isEditor) {
         values = e?.htmlValue
      } else if (isCheckbox) {
         values = e?.checked
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
                           name={`p_section.${idx}.degree`}
                           label="Degree"
                           placeholder="Input Degree"
                           onChange={(e: any) => onSectionChange(e, section.id, 'degree', idx)}
                        />
                        <FieldText
                           name={`p_section.${idx}.institution`}
                           label="Institution"
                           placeholder="Input Institution"
                           onChange={(e: any) => onSectionChange(e, section.id, 'institution', idx)}
                        />
                     </div>
                     <FieldText
                        name={`p_section.${idx}.location`}
                        label="Location"
                        placeholder="Input Location"
                        onChange={(e: any) => onSectionChange(e, section.id, 'location', idx)}
                     />
                     <div className="grid grid-cols-2 gap-4">
                        <FieldDatePicker
                           name={`p_section.${idx}.startDate`}
                           label="Start Date"
                           placeholder="Input Start Date"
                           format="MM yy"
                           viewMode="month"
                           onChange={(e: any) => onSectionChange(e, section.id, 'startDate', idx, true)}
                        />
                        <FieldDatePicker
                           name={`p_section.${idx}.endDate`}
                           label="End Date"
                           placeholder="Input End Date"
                           format="MM yy"
                           viewMode="month"
                           isDisabled={Boolean(watch(`p_section.${idx}.current`))}
                           onChange={(e: any) => onSectionChange(e, section.id, 'endDate', idx, true)}
                        />
                     </div>
                     <div className="card">
                        <Editor
                           value={text}
                           onTextChange={(e: any) => onSectionChange(e, section.id, 'description', idx)}
                           style={{ height: '180px' }}
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
               // <div key={item.id} className="border-l-2 border-blue-500/30 pl-4 space-y-3 py-2">
               //    hello
               // </div>
            ))}

            <Button
               label="Add Education"
               icon={'pi-plus'}
               iconType="prime"
               // className="w-full"
               size="sm"
               variant="stroke"
               onClick={() => dispatch(addNewSection(section.id))}
            />

            {/* <button
            // onClick={() => addSectionItem(section.id)}
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-2 transition-colors cursor-pointer border border-sky-500"
         >
            <Plus className="w-4 h-4" />
            Add Experience
         </button> */}
         </div>
      </FormProvider>
   )
}

export default EducationForm
