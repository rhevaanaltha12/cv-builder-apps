import { DUMMY_DATA } from '@/pages/builder/config/constant'
import { useAppSelector } from '@/store/hook'
import React from 'react'
import ContactInfo from '../../shared/ContactInfo'

const TechHeader = () => {
   const { personalInfo, globalFontSize, theme } = useAppSelector((state) => state.builderReducer)

   return (
      //   <div className="text-center border-b-2 border-gray-900 pb-4 mb-5">
      <div className="mb-6">
         <h1 className="font-extrabold tracking-tight" style={{ fontSize: globalFontSize.name, color: theme.color }}>
            {personalInfo.fullName || (
               <span className="text-gray-400 italic font-normal">{DUMMY_DATA.personalInfo.fullName}</span>
            )}
         </h1>
         <p className="text-gray-500 mb-1" style={{ fontSize: globalFontSize.tagline }}>
            {personalInfo.tagline.length > 0 ? (
               personalInfo.tagline.map((tag) => tag).join(' | ')
            ) : (
               <span className="text-gray-400 italic">{DUMMY_DATA.personalInfo.tagline}</span>
            )}
         </p>
         <p className="text-gray-500" style={{ fontSize: globalFontSize.summary }}>
            {personalInfo.summary || <span className="text-gray-400 italic">{DUMMY_DATA.personalInfo.summary}</span>}
         </p>
         <ContactInfo centered={false} showIcons={true} />
      </div>
   )
}

export default TechHeader
