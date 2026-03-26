import { DUMMY_DATA } from '@/features/builder/config/constant'
import { ensureProtocol } from '@/lib/method'
import { useAppSelector } from '@/store/hook'
import React from 'react'

const HarvardHeader = () => {
   const { personalInfo, globalFontSize, theme } = useAppSelector((state) => state.builderReducer)

   const fullName = personalInfo.fullName?.trim() ? personalInfo.fullName : DUMMY_DATA.personalInfo.fullName
   const isUsingDummyName = !personalInfo.fullName?.trim()

   const hasTagline = personalInfo.tagline?.length > 0
   const taglineText = hasTagline ? personalInfo.tagline.join(' | ') : String(DUMMY_DATA.personalInfo.tagline)
   const isUsingDummyTagline = !hasTagline

   return (
      <div
         className="text-center mb-4 border-b-2 border-gray-800"
         style={{
            paddingBottom: 10,
            fontFamily: 'Times-Roman, "Times New Roman", Times, serif',
         }}
      >
         <h1
            className="font-bold uppercase mb-4 leading-tight"
            style={{
               fontSize: globalFontSize.name,
               letterSpacing: '2px',
               color: theme.color,
            }}
         >
            {isUsingDummyName ? <span className="text-gray-400 italic">{fullName}</span> : fullName}
         </h1>

         {taglineText.trim().length > 0 && (
            <p className="mb-2" style={{ fontSize: globalFontSize.tagline, color: '#6b7280' }}>
               {isUsingDummyTagline ? <span className="text-gray-400 italic">{taglineText}</span> : taglineText}
            </p>
         )}

         <p className="mb-2" style={{ fontSize: globalFontSize.summary, color: '#4b5563' }}>
            {personalInfo.summary?.trim() ? (
               personalInfo.summary
            ) : (
               <span className="text-gray-400 italic">{DUMMY_DATA.personalInfo.summary}</span>
            )}
         </p>

         <div
            className="flex flex-wrap justify-center gap-3"
            style={{
               fontSize: globalFontSize.itemBody,
               color: '#4b5563',
            }}
         >
            {personalInfo.email?.trim() && (
               <a
                  href={`mailto:${personalInfo.email}`}
                  className="hover:underline"
                  style={{ color: '#4b5563', textDecoration: 'none' }}
               >
                  {personalInfo.email}
               </a>
            )}
            {personalInfo.phone?.trim() && (
               <a
                  href={`tel:${personalInfo.phone.replaceAll(/\s/g, '')}`}
                  className="hover:underline"
                  style={{ color: '#4b5563', textDecoration: 'none' }}
               >
                  {personalInfo.phone}
               </a>
            )}
            {personalInfo.location?.trim() && <span>{personalInfo.location}</span>}
         </div>

         <div
            className="flex flex-wrap justify-center gap-3 mt-1"
            style={{
               fontSize: globalFontSize.itemBody,
               color: '#4b5563',
            }}
         >
            {personalInfo.linkedin?.trim() && (
               <a
                  href={ensureProtocol(personalInfo.linkedin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  style={{ color: '#4b5563', textDecoration: 'none' }}
               >
                  LinkedIn
               </a>
            )}
            {personalInfo.github?.trim() && (
               <a
                  href={ensureProtocol(personalInfo.github)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  style={{ color: '#4b5563', textDecoration: 'none' }}
               >
                  GitHub
               </a>
            )}
            {personalInfo.website?.trim() && (
               <a
                  href={ensureProtocol(personalInfo.website)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  style={{ color: '#4b5563', textDecoration: 'none' }}
               >
                  Portfolio
               </a>
            )}
         </div>
      </div>
   )
}

export default HarvardHeader
