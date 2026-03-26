import { cn } from '@/lib/utils'
import { DUMMY_DATA } from '@/features/builder/config/constant'
import { ISection } from '@/features/builder/config/interfaces'
import { useAppSelector } from '@/store/hook'
import React from 'react'

const SkillsSection = ({ section }: { section: ISection }) => {
   const {
      globalFontSize,
      template: { isHarvard },
      theme,
   } = useAppSelector((state) => state.builderReducer)

   const item = section.items[0]
   const hasSkills = item?.skills?.length
   const isDummy = !hasSkills

   // Use dummy skills if none exist
   const displaySkills = hasSkills ? item.skills || [] : DUMMY_DATA.skills
   // Harvard template - simple comma-separated text (matches PDF)

   let nameClass = ''
   if (isDummy) {
      nameClass = 'text-gray-400 italic'
   } else if (isHarvard) {
      nameClass = 'text-gray-900 font-semibold'
   } else {
      nameClass = 'font-semibold'
   }

   let valueClass = ''
   if (isDummy) {
      valueClass = 'text-gray-400 italic'
   } else if (isHarvard) {
      valueClass = 'text-gray-600'
   } else {
      valueClass = 'text-gray-500'
   }

   const valueColorStyle =
      !isDummy && !isHarvard
         ? { fontSize: globalFontSize.itemSubtitle, color: theme.color }
         : { fontSize: globalFontSize.itemSubtitle }

   return (
      <div className={cn(isHarvard ? 'font-serif' : 'font-sans')}>
         {(item.skills && item.skills?.length > 0 ? item.skills : displaySkills).map((ds, idx) => {
            return (
               <div key={`${ds.name}-${idx}`} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-1">
                  <p className={cn(nameClass)} style={{ fontSize: globalFontSize.itemSubtitle }}>
                     {ds.name}:
                  </p>
                  <span className={cn(valueClass)} style={valueColorStyle}>
                     {ds.skillList.map((sl) => sl).join(', ')}
                  </span>
               </div>
            )
         })}
      </div>
      // <p
      //    className={cn('font-serif', isDummy ? 'text-gray-400 italic' : 'text-gray-700')}
      //    style={{ fontSize:globalFontSize.itemBody }}
      // >
      //    {item?.skillsWithLevels?.length ? item.skillsWithLevels.map((s) => s.name).join(', ') : displaySkills.join(', ')}
      // </p>
   )
}

export default SkillsSection
