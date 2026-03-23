import { DUMMY_DATA } from '@/pages/builder/config/constant'
import { useAppSelector } from '@/store/hook'
import React from 'react'
import ContactInfo from '../../shared/ContactInfo'

const HarvardHeader = () => {
   const { personalInfo, globalFontSize } = useAppSelector((state) => state.builderReducer)
   return (
      //   <div className="text-center border-b-2 border-gray-900 pb-4 mb-5">
      <>
         <div className="text-center mb-2">
            <h1 className="font-bold uppercase mb-1" style={{ fontSize: globalFontSize.name }}>
               {personalInfo.fullName || (
                  <span className="text-gray-400 italic normal-case">{DUMMY_DATA.personalInfo.fullName}</span>
               )}
            </h1>
            <p className="text-gray-600 mb-2" style={{ fontSize: globalFontSize.summary }}>
               {personalInfo.summary || <span className="text-gray-400 italic">{DUMMY_DATA.personalInfo.summary}</span>}
            </p>
            <ContactInfo centered={true} showIcons={false} />
            {/* <p className="text-gray-600 mb-2 text-xs" style={{ fontSize: globalFontSize.tagline }}>
               {personalInfo.tagline.length > 0 ? (
                  personalInfo.tagline.map((tag) => tag).join(' | ')
               ) : (
                  <span className="text-gray-400 italic text-xs">{DUMMY_DATA.personalInfo.tagline}</span>
               )}
            </p> */}
         </div>

         {/* <div className="text-justify">
            <p className="text-gray-600 mb-2" style={{ fontSize: globalFontSize.summary }}>
               {personalInfo.summary || <span className="text-gray-400 italic">{DUMMY_DATA.personalInfo.summary}</span>}
            </p>
         </div>
         <ContactInfo centered={true} showIcons={false} /> */}
      </>
   )
}

export default HarvardHeader
