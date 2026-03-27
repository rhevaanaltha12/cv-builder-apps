import React from 'react'
import { ISection } from '../../config/interfaces'
import FieldDatePicker from '@/components/Form/FieldDatePicker'
import FieldText from '@/components/Form/FieldText'
import { useForm, FormProvider, useFieldArray } from 'react-hook-form'
import Button from '@/components/Button'
import FieldSelect from '@/components/Form/FieldSelect'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { addNewSection, setSection } from '@/store/reducers/builder/builder.slice'
import { generateId } from '@/lib/method'
import { createSectionItem, options } from '../../config/constant'
import FieldChip from '@/components/Form/FieldChip'

const SkillsForm: React.FC<{ section: ISection }> = ({ section }) => {
   const dispatch = useAppDispatch()
   const { personalInfo, sections } = useAppSelector((state) => state.builderReducer)

   const RHF = useForm<any>({
      defaultValues: {
         p_section: [],
      },
   })

   const { reset } = RHF

   const skillsItem = section.items[0] || { id: 'temp', skills: [] }
   const skills = skillsItem.skills || []

   const addNewSkill = () => {
      if (section.items.length === 0) {
         dispatch(addNewSection(section.id))
         return
      }

      const newSections = sections?.map((item) => {
         if (item?.id === section?.id) {
            return {
               ...item,
               items: item?.items?.map((values: any) => {
                  if (values?.id === skillsItem?.id) {
                     return {
                        ...values,
                        skills: [...(values?.skills || []), { id: generateId(), name: '', skillList: [] }],
                     }
                  }
                  return values
               }),
            }
         }
         return item
      })
      dispatch(setSection(newSections))
   }

   const removeSkill = (sectionId: string, itemId: string) => {
      console.log('sectionId', sectionId)
      console.log('itemId', itemId)
      //    const newSections = sections?.map((item) => {
      //        if (item?.id !== section?.id) {
      //           return item
      //        }

      //        return {
      //           ...item,
      //           items: item?.items?.map((values: any) => {
      //              if (values?.id !== skillsItem?.id) {
      //                 return values
      //              }
      //              return {
      //                 ...values,
      //                 skills: values?.skills?.map((skill: any) => {
      //                    if (skill?.id !== skillId) {
      //                       return skill
      //                    }
      //                    return {
      //                       ...skill,
      //                       [key]: itemValue,
      //                    }
      //                 }),
      //              }
      //           }),
      //        }
      //     })

      const newSections = sections.map((sec) => {
         if (sec.id !== sectionId) return sec
         return {
            ...sec,
            items: sec?.items?.map((itm) => {
               if (itm?.id !== skillsItem?.id) return itm

               return {
                  ...itm,
                  skills: itm.skills?.filter((skl) => skl.id !== itemId),
               }
            }),
         }
      })

      dispatch(setSection(newSections))
      reset({})
   }

   const onChange = (e: any, skillId: string, key: any) => {
      const itemValue = e?.value || ''

      const newSections = sections?.map((item) => {
         if (item?.id !== section?.id) {
            return item
         }

         return {
            ...item,
            items: item?.items?.map((values: any) => {
               if (values?.id !== skillsItem?.id) {
                  return values
               }
               return {
                  ...values,
                  skills: values?.skills?.map((skill: any) => {
                     if (skill?.id !== skillId) {
                        return skill
                     }
                     return {
                        ...skill,
                        [key]: itemValue,
                     }
                  }),
               }
            }),
         }
      })

      dispatch(setSection(newSections))
   }

   return (
      <FormProvider {...RHF}>
         <div className="space-y-4">
            {skills.map((item, idx) => (
               <div key={idx} className="flex gap-2 items-center">
                  <div className="grid grid-cols-2 gap-4 w-full">
                     <FieldText
                        name={`p_section.${idx}.name`}
                        label="Skill Category"
                        placeholder="Input Skill Category"
                        onChange={(e: any) => onChange(e, item?.id, 'name')}
                     />
                     <FieldChip
                        name={`p_section.${idx}.skillList`}
                        label="Skill List"
                        placeholder="Input Skill List"
                        onChange={(e: any) => onChange(e, item?.id, 'skillList')}
                     />
                  </div>
                  <Button
                     icon={'pi-trash'}
                     iconType="prime"
                     variant="stroke"
                     size="sm"
                     theme="danger"
                     onClick={() => removeSkill(section.id, item?.id)}
                  />
               </div>
               // <div key={item.id} className="border-l-2 border-blue-500/30 pl-4 space-y-3 py-2">
               //    hello
               // </div>
            ))}

            <Button label="Add Skill" icon={'pi-plus'} iconType="prime" size="sm" variant="stroke" onClick={addNewSkill} />

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

export default SkillsForm
