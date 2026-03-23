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

const ExperienceForm: React.FC<{ section: ISection }> = ({ section }) => {
   const [text, setText] = useState('')
   const dispatch = useAppDispatch()
   const { personalInfo, sections } = useAppSelector((state) => state.builderReducer)

   const RHF = useForm<IForm>({
      defaultValues: {
         p_section: [],
      },
   })

   const { watch, setValue } = RHF

   const renderSection = (id: string, key: string, idx: number, values: any) => {
      const newSections = sections.map((item) => {
         if (item?.id === id) {
            return {
               ...item,
               items: item?.items?.map((value: any, itemIdx: number) => {
                  if (itemIdx === idx) {
                     if (key === 'current' && value) {
                        return {
                           ...value,
                           current: values,
                           endDate: '',
                        }
                     }
                     return {
                        ...value,
                        [key]: values,
                     }
                  }
                  return value
               }),
            }
         }
         return item
      })

      return newSections
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

   useEffect(() => {
      console.log('section', section)
   }, [section])

   return (
      <FormProvider {...RHF}>
         <div className="space-y-4">
            {section.items.map((item, idx) => (
               <div key={item.id} className="flex gap-2">
                  <div className="border border-gray-300 w-full p-6 rounded-md">
                     <div className="grid grid-cols-2 gap-4">
                        <FieldText
                           name={`p_section.${idx}.position`}
                           label="Position"
                           placeholder="Input Position"
                           onChange={(e: any) => onSectionChange(e, section.id, 'position', idx)}
                        />
                        <FieldText
                           name={`p_section.${idx}.company`}
                           label="Company"
                           placeholder="Input Company"
                           onChange={(e: any) => onSectionChange(e, section.id, 'company', idx)}
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
                     <FieldCheckbox
                        name={`p_section.${idx}.current`}
                        onChange={(e) => {
                           setValue(`p_section.${idx}.endDate`, '')
                           onSectionChange(e, section.id, 'current', idx)
                        }}
                        label="Currently Working Here"
                     />
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
               label="Add Experience"
               icon={'pi-plus'}
               iconType="prime"
               className="w-full"
               size="sm"
               variant="stroke"
               onClick={() => dispatch(addNewSection(section.id))}
            />
         </div>
      </FormProvider>
   )
}

export default ExperienceForm
