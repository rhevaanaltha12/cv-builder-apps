import { ensureProtocol, formatDate } from '@/lib/method'
import { cn } from '@/lib/utils'
import { ISection } from '@/features/builder/config/interfaces'
import { useAppSelector } from '@/store/hook'
import { ExternalLink } from 'lucide-react'
import React from 'react'

const ProjectSection = ({ section }: { section: ISection }) => {
   const {
      globalFontSize,
      template: { isHarvard },
      theme,
   } = useAppSelector((state) => state.builderReducer)
   if (!section.items.length) {
      return (
         <p className="text-gray-400 italic" style={{ fontSize: globalFontSize.itemBody }}>
            Add items to this section
         </p>
      )
   }

   return section.items.map((item) => {
      // const getFieldValue = (fieldId: string) => {
      //    const field = (item.customFields || []).find((cf) => cf.fieldId === fieldId)
      //    return field?.value
      // }

      // const titleField = fieldDefs.find((f) => f.type === 'text')
      // const dateField = fieldDefs.find((f) => f.type === 'date' || f.type === 'dateRange')
      // const linkField = fieldDefs.find((f) => f.type === 'link')
      // const tagsField = fieldDefs.find((f) => f.type === 'tags')
      // const textareaField = fieldDefs.find((f) => f.type === 'textarea')

      // const title = titleField ? (getFieldValue(titleField.id) as string) : ''
      // const linkValue = linkField ? (getFieldValue(linkField.id) as string) : ''
      // const tagsValue = tagsField ? (getFieldValue(tagsField.id) as string[]) : []
      // const description = textareaField ? (getFieldValue(textareaField.id) as string) : ''

      // let dateDisplay = ''
      // if (dateField) {
      //    const dateValue = getFieldValue(dateField.id) as string
      //    if (dateField.type === 'dateRange' && dateValue) {
      //       const [start, end] = dateValue.split('|')
      //       dateDisplay = formatDate(start, end)
      //    } else if (dateValue) {
      //       dateDisplay = formatDate(dateValue)
      //    }
      // }

      return (
         <div key={item.id} className="mb-2.5">
            <div className="flex justify-between items-baseline mb-0.5">
               <div className="flex items-center gap-2">
                  {item.projectUrl ? (
                     <a
                        href={ensureProtocol(item.projectUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold hover:underline flex items-center gap-1"
                        style={{ fontSize: globalFontSize.itemTitle, color: theme.color }}
                        onClick={(e) => e.stopPropagation()}
                     >
                        {item.projectName || 'Title'}
                        <ExternalLink className="w-3 h-3" />
                     </a>
                  ) : (
                     <h3 className="font-bold text-gray-900" style={{ fontSize: globalFontSize.itemTitle }}>
                        {item.projectName || <span className="text-gray-400 italic font-normal">Title</span>}
                     </h3>
                  )}
               </div>

               <span className="text-gray-500 italic" style={{ fontSize: globalFontSize.itemDate }}>
                  {formatDate(item.startDate, item.endDate) || 'Date'}
               </span>
            </div>

            {/* {fieldDefs
                  .filter((f) => f.type === 'text' && f !== titleField)
                  .map((f) => {
                     const val = getFieldValue(f.id) as string
                     return val ? (
                        <p key={f.id} className="text-gray-600" style={{ fontSize: globalFontSize.itemSubtitle }}>
                           <RenderWithLinks text={val} />
                        </p>
                     ) : null
                  })} */}

            {item.projectSkills && item.projectSkills.length > 0 && (
               <div className="flex flex-wrap gap-1 mt-1">
                  {item.projectSkills.map((tag, idx) => (
                     <span
                        key={idx}
                        className={cn('px-1.5 py-0.5 text-[9px]', 'rounded')}
                        style={{ backgroundColor: theme.color + '20', color: theme.color }}
                     >
                        {tag}
                     </span>
                  ))}
               </div>
            )}

            {item.description && (
               // <RichText
               //   text={description}
               //   className="text-gray-700 mt-1"
               //   style={{ fontSize: globalFontSize.itemBody }}
               //   themeColor={theme.color}
               // />
               <div
                  className={cn('text-gray-700', 'mt-1', 'ql-editor rendered-editor')}
                  style={{ fontSize: globalFontSize.itemBody }}
                  dangerouslySetInnerHTML={{ __html: item.description || '' }}
               ></div>
            )}
         </div>
      )
   })
}

export default ProjectSection
