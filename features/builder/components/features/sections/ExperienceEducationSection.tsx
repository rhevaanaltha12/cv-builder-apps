import { formatDate } from '@/lib/method'
import { cn } from '@/lib/utils'
import { DUMMY_DATA } from '@/features/builder/config/constant'
import { ISection } from '@/features/builder/config/interfaces'
import { useAppSelector } from '@/store/hook'
import React from 'react'

const renderTitleNode = (sectionType: ISection['type'], item: any): React.ReactNode => {
   if (sectionType === 'experience') {
      return item.company || <span className="text-gray-400 italic font-normal">Company</span>
   }

   if (sectionType === 'education') {
      return item.institution || <span className="text-gray-400">Institution</span>
   }

   return item.subtitle || ''
}

const renderSubtitleNode = (sectionType: ISection['type'], item: any): React.ReactNode => {
   if (sectionType === 'experience') {
      return item.position || <span className="text-gray-400 italic font-normal">Position</span>
   }

   if (sectionType === 'education') {
      return item.degree || <span className="text-gray-400 italic font-normal">Degree</span>
   }

   return item.title || <span className="text-gray-400 italic font-normal">Title</span>
}

const getTemplateClass = (params: {
   isDummy: boolean
   isHarvard: boolean
   dummyClass: string
   harvardClass: string
   techClass: string
}) => {
   if (params.isDummy) return params.dummyClass
   if (params.isHarvard) return params.harvardClass
   return params.techClass
}

const ExperienceEducationSection = ({ section }: { section: ISection }) => {
   const {
      globalFontSize,
      theme,
      template: { isHarvard },
   } = useAppSelector((state) => state.builderReducer)

   const isDummy = !section.items.length

   let dummyItems: typeof DUMMY_DATA.experience | typeof DUMMY_DATA.education | any[] = []
   if (section.type === 'experience') {
      dummyItems = DUMMY_DATA.experience
   } else if (section.type === 'education') {
      dummyItems = DUMMY_DATA.education
   }
   const itemsToRender = isDummy ? dummyItems : section.items

   if (!itemsToRender.length) {
      return (
         <p className="text-gray-400 italic" style={{ fontSize: globalFontSize.itemBody }}>
            Add items to this section
         </p>
      )
   }

   const titleColorClass = getTemplateClass({
      isDummy,
      isHarvard,
      dummyClass: 'text-gray-400 italic font-normal',
      harvardClass: 'text-gray-900',
      techClass: 'text-slate-900',
   })

   const subtitleBaseClass = getTemplateClass({
      isDummy,
      isHarvard,
      dummyClass: 'text-gray-400',
      harvardClass: 'text-gray-600',
      techClass: 'text-slate-900',
   })

   const locationTextClass = getTemplateClass({
      isDummy,
      isHarvard,
      dummyClass: 'text-gray-400 italic',
      harvardClass: 'text-gray-500',
      techClass: 'text-slate-500',
   })

   const dateClass = getTemplateClass({
      isDummy,
      isHarvard,
      dummyClass: 'text-gray-400',
      harvardClass: 'text-gray-500',
      techClass: 'text-slate-500',
   })
   const applyThemeSubtitleColor = !isDummy && !isHarvard

   return itemsToRender.map((item) => (
      <div key={item.id} className={cn('mb-2.5', isDummy && 'opacity-60')}>
         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-0.5 gap-y-1">
            <h3 className={cn('font-bold leading-snug', titleColorClass)} style={{ fontSize: globalFontSize.itemTitle }}>
               {renderTitleNode(section.type, item)}
            </h3>

            <span className={cn('italic sm:ml-4 whitespace-nowrap', dateClass)} style={{ fontSize: globalFontSize.itemDate }}>
               {formatDate(item.startDate, item.endDate, item.current) || 'Date'}
            </span>
         </div>
         <div
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-y-1"
            style={{ fontSize: globalFontSize.itemSubtitle }}
         >
            <span
               className={cn('leading-snug', subtitleBaseClass)}
               style={applyThemeSubtitleColor ? { color: theme.color } : undefined}
            >
               {renderSubtitleNode(section.type, item)}
            </span>

            {item.location && <span className={cn('text-right w-full sm:w-auto', locationTextClass)}>{item.location}</span>}
         </div>
         {item.description && (
            <div
               className={cn(isDummy ? 'text-gray-400 italic' : 'text-gray-600', 'mt-1', 'ql-editor rendered-editor')}
               style={{ fontSize: globalFontSize.itemBody }}
               dangerouslySetInnerHTML={{ __html: item.description }}
            ></div>
         )}
      </div>
   ))
}

export default ExperienceEducationSection
