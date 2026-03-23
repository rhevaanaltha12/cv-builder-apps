import { useAppSelector } from '@/store/hook'
import React from 'react'

const SectionTitle = ({ title }: { title: string }) => {
   const {
      theme,
      globalFontSize,
      template: { isHarvard, isMinimal },
   } = useAppSelector((state) => state.builderReducer)

   if (isHarvard) {
      return (
         <h2
            className="font-bold mb-2 uppercase tracking-wider border-b border-gray-900 pb-1"
            style={{ fontSize: globalFontSize.sectionHeading }}
         >
            {title}
         </h2>
      )
   } else if (isMinimal) {
      return (
         <h2
            className="font-bold uppercase text-gray-400"
            style={{ fontSize: Math.round(globalFontSize.sectionHeading * 0.85), letterSpacing: '0.15em' }}
         >
            {title}
         </h2>
      )
   } else {
      return (
         <h2
            className="font-bold"
            style={{
               color: theme.color,
               fontSize: globalFontSize.sectionHeading,
            }}
         >
            {title}
         </h2>
      )
   }
}

export default SectionTitle
