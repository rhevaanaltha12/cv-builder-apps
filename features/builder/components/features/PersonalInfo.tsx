import FieldText from '@/components/Form/FieldText'
import { useAppSelector, useAppDispatch } from '@/store/hook'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { debounce } from 'lodash'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { setPersonalInfo } from '@/store/reducers/builder/builder.slice'
import FieldTextArea from '@/components/Form/FieldTextArea'
import FieldChip from '@/components/Form/FieldChip'

interface IForm {
   p_fullname: string
   p_job_title: string
   p_email: string
   p_phone_number: string
   p_location: string
   p_website: string
   p_linkedin: string
   p_github: string
}

const validateSchema = yup.object().shape({
   p_fullname: yup.string().required('Full Name is required.'),
   p_job_title: yup.string().required('Job Title is required.'),
   p_email: yup.string().required('Email is required.'),
   p_phone_number: yup.string().required('Phone Number is required.'),
   p_location: yup.string().required('Location is required.'),
   p_website: yup.string().required('Website is required.'),
   p_linkedin: yup.string().required('Linkedin is required.'),
   p_github: yup.string().required('Github is required.'),
})

const defaultValue: IForm = {
   p_fullname: '',
   p_job_title: '',
   p_email: '',
   p_phone_number: '',
   p_location: '',
   p_website: '',
   p_linkedin: '',
   p_github: '',
}

const PersonalInfo = () => {
   const {
      personalInfo,
      sections,
      theme,
      template: { isHarvard },
   } = useAppSelector((state) => state.builderReducer)
   const dispatch = useAppDispatch()

   const RHF = useForm<IForm>({
      defaultValues: {
         ...defaultValue,
      },
      resolver: yupResolver(validateSchema),
   })

   const debouncedUpdate = React.useMemo(
      () =>
         debounce((key, value) => {
            dispatch(
               setPersonalInfo({
                  ...personalInfo,
                  [key]: value,
               })
            )
         }, 300),
      [personalInfo, sections]
   )

   const onChange = (e: any, key: any) => {
      const values = e?.value || ''
      debouncedUpdate(key, values)
   }

   return (
      <FormProvider {...RHF}>
         <div className="py-4">
            <div>Personal Information</div>
         </div>
         <div className="grid grid-cols-2 gap-x-4">
            <FieldText
               label="Full Name"
               name="p_fullname"
               placeholder="Input Full Name"
               onChange={(e: any) => onChange(e, 'fullName')}
            />
            <FieldChip
               name={`p_tagline`}
               label="Tagline"
               placeholder="Input Tagline"
               onChange={(e: any) => onChange(e, 'tagline')}
            />
         </div>
         <FieldTextArea
            label="Job Description"
            name="p_job_title"
            placeholder="Input Job Description"
            onChange={(e: any) => onChange(e, 'summary')}
         />
         <div className="grid grid-cols-2 gap-x-4">
            <FieldText label="Email" name="p_email" placeholder="Input Email" onChange={(e: any) => onChange(e, 'email')} />
            <FieldText
               label="Phone Number"
               name="p_phone_number"
               placeholder="Input Phone Number"
               onChange={(e: any) => onChange(e, 'phone')}
            />
            <FieldText
               label="Location"
               name="p_location"
               placeholder="Input Location"
               onChange={(e: any) => onChange(e, 'location')}
            />
            <FieldText
               label="Website"
               name="p_website"
               placeholder="Input Website"
               onChange={(e: any) => onChange(e, 'website')}
            />
            <FieldText
               label="Linkedin"
               name="p_linkedin"
               placeholder="Input Linkedin"
               onChange={(e: any) => onChange(e, 'linkedin')}
            />
            <FieldText label="Github" name="p_github" placeholder="Input Github" onChange={(e: any) => onChange(e, 'github')} />
         </div>
      </FormProvider>
   )
}

export default PersonalInfo
