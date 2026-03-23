import { formatDate } from '@/lib/method'
import { cn } from '@/lib/utils'
import { DUMMY_DATA } from '@/pages/builder/config/constant'
import { ISection } from '@/pages/builder/config/interfaces'
import { useAppSelector } from '@/store/hook'
import React from 'react'

const ExperienceEducationSection = ({ section }: { section: ISection }) => {
   const { globalFontSize } = useAppSelector((state) => state.builderReducer)

   const isDummy = !section.items.length
   const dummyItems =
      section.type === 'experience' ? DUMMY_DATA.experience : section.type === 'education' ? DUMMY_DATA.education : []
   const itemsToRender = isDummy ? dummyItems : section.items

   if (!itemsToRender.length) {
      return (
         <p className="text-gray-400 italic" style={{ fontSize: globalFontSize.itemBody }}>
            Add items to this section
         </p>
      )
   }

   return itemsToRender.map((item) => (
      <div key={item.id} className={cn('mb-2.5', isDummy && 'opacity-60')}>
         <div className="flex justify-between items-baseline mb-0.5">
            <h3
               className={cn('font-bold', isDummy ? 'text-gray-400 italic font-normal' : 'text-gray-900')}
               style={{ fontSize: globalFontSize.itemTitle }}
            >
               {section.type === 'experience'
                  ? item.company || <span className="text-gray-400">Company</span>
                  : section.type === 'education'
                    ? item.institution || <span className="text-gray-400">Institution</span>
                    : item.subtitle || ''}
            </h3>

            <span className="text-gray-500 italic ml-4 whitespace-nowrap" style={{ fontSize: globalFontSize.itemDate }}>
               {formatDate(item.startDate, item.endDate, item.current) || 'Date'}
            </span>
         </div>
         <div className="flex justify-between items-center" style={{ fontSize: globalFontSize.itemSubtitle }}>
            <span className={isDummy ? 'text-gray-400' : 'text-gray-600'}>
               {section.type === 'experience'
                  ? item.position || <span className="text-gray-400 italic font-normal">Position</span>
                  : section.type === 'education'
                    ? item.degree || <span className="text-gray-400 italic font-normal">Degree</span>
                    : item.title || <span className="text-gray-400 italic font-normal">Title</span>}
            </span>

            {item.location && <span className="text-gray-500">{item.location}</span>}
         </div>
         {item.description && (
            <div
               className={cn(isDummy ? 'text-gray-400' : 'text-gray-700', 'mt-1', 'ql-editor rendered-editor')}
               style={{ fontSize: globalFontSize.itemBody }}
               dangerouslySetInnerHTML={{ __html: item.description }}
            ></div>
         )}
      </div>
   ))
}

export default ExperienceEducationSection
