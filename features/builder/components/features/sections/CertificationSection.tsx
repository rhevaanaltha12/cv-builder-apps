import { formatDate } from '@/lib/method'
import { cn } from '@/lib/utils'
import { DUMMY_DATA } from '@/features/builder/config/constant'
import { ISection } from '@/features/builder/config/interfaces'
import { useAppSelector } from '@/store/hook'
import React from 'react'

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

const CertificationSection = ({ section }: { section: ISection }) => {
   const {
      globalFontSize,
      theme,
      template: { isHarvard },
   } = useAppSelector((state) => state.builderReducer)

   const isDummy = !section.items.length
   const itemsToRender = isDummy ? DUMMY_DATA.certifications : section.items

   if (!itemsToRender?.length) {
      return (
         <p className="text-gray-400 italic" style={{ fontSize: globalFontSize.itemBody }}>
            Add certifications to this section
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

   const dateClass = getTemplateClass({
      isDummy,
      isHarvard,
      dummyClass: 'text-gray-400',
      harvardClass: 'text-gray-500',
      techClass: 'text-slate-500',
   })

   const applyThemeSubtitleColor = !isDummy && !isHarvard

   return itemsToRender.map((item) => (
      <div key={item.id} className={cn('mb-2', isDummy && 'opacity-60')}>
         <div className="flex justify-between items-baseline">
            <h3 className={cn('font-bold leading-snug', titleColorClass)} style={{ fontSize: globalFontSize.itemTitle }}>
               {item.title || <span className="text-gray-400 italic font-normal">Certification Name</span>}
            </h3>

            <span className={cn('italic ml-4 whitespace-nowrap', dateClass)} style={{ fontSize: globalFontSize.itemDate }}>
               {item.startDate ? formatDate(item.startDate) : 'Date'}
            </span>
         </div>
         <div className="flex justify-between items-center" style={{ fontSize: globalFontSize.itemSubtitle }}>
            <span
               className={cn('leading-snug', subtitleBaseClass)}
               style={applyThemeSubtitleColor ? { color: theme.color } : undefined}
            >
               {item.subtitle || <span className="text-gray-400 italic font-normal">Issuing Organization</span>}
            </span>
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

export default CertificationSection
