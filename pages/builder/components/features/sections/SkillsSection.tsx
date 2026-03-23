import { cn } from '@/lib/utils'
import { DUMMY_DATA } from '@/pages/builder/config/constant'
import { ISection } from '@/pages/builder/config/interfaces'
import { useAppSelector } from '@/store/hook'
import React from 'react'

const SkillsSection = ({ section }: { section: ISection }) => {
   const {
      globalFontSize,
      template: { isHarvard },
   } = useAppSelector((state) => state.builderReducer)

   const item = section.items[0]
   const hasSkills = item?.skills?.length
   const isDummy = !hasSkills

   // Use dummy skills if none exist
   const displaySkills = hasSkills ? item.skills || [] : DUMMY_DATA.skills
   // Harvard template - simple comma-separated text (matches PDF)
   return (
      <>
         {(item.skills && item.skills?.length > 0 ? item.skills : displaySkills).map((ds, dsIdx) => {
            return (
               <div key={dsIdx} className={cn('flex items-center gap-2', isHarvard ? 'font-serif' : 'font-sans')}>
                  <p
                     className={cn(isDummy ? 'text-gray-400 italic' : 'text-gray-700')}
                     style={{ fontSize: globalFontSize.itemSubtitle }}
                  >
                     {ds.name}:
                  </p>
                  <span
                     className={cn(isDummy ? 'text-gray-400 italic' : 'text-gray-500')}
                     style={{ fontSize: globalFontSize.itemSubtitle }}
                  >
                     {ds.skillList.map((sl) => sl).join(', ')}
                  </span>
               </div>
            )
         })}
      </>
      // <p
      //    className={cn('font-serif', isDummy ? 'text-gray-400 italic' : 'text-gray-700')}
      //    style={{ fontSize:globalFontSize.itemBody }}
      // >
      //    {item?.skillsWithLevels?.length ? item.skillsWithLevels.map((s) => s.name).join(', ') : displaySkills.join(', ')}
      // </p>
   )
}

export default SkillsSection
