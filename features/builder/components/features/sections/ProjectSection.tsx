import { ensureProtocol, formatDate } from '@/lib/method'
import { cn } from '@/lib/utils'
import { ISection } from '@/features/builder/config/interfaces'
import { useAppSelector } from '@/store/hook'
import { ExternalLink } from 'lucide-react'
import React from 'react'

const ProjectSection = ({ section }: { section: ISection }) => {
   const {
      globalFontSize,
      template: { isHarvard, isMinimal },
      theme,
   } = useAppSelector((state) => state.builderReducer)

   if (!section.items.length) {
      return (
         <p className="text-gray-400 italic" style={{ fontSize: globalFontSize.itemBody }}>
            Add items to this section
         </p>
      )
   }

   // ── Per-template colour tokens (mirrors ExperienceEducationSection pattern) ───
   // Extracted from ternaries to satisfy linter (no nested ternary in JSX)
   const titleColorClass = isHarvard ? 'text-gray-900' : isMinimal ? 'text-gray-800' : 'text-slate-900'
   const dateClass = isHarvard ? 'text-gray-500' : isMinimal ? 'text-gray-400' : 'text-slate-500'
   const descriptionClass = isHarvard ? 'text-gray-600' : 'text-gray-700'

   // Link colour: Harvard keeps links neutral, others use accent
   const linkTextStyle = isHarvard
      ? { fontSize: globalFontSize.itemTitle, color: undefined as string | undefined }
      : { fontSize: globalFontSize.itemTitle, color: theme.color }
   const linkClassName = cn(
      'font-bold leading-snug flex items-center gap-1 hover:underline transition-all',
      isHarvard ? 'text-gray-900' : ''
   )

   // Tags render mode: 'minimal-text' | 'harvard-pills' | 'tech-chips'
   const tagMode = isMinimal ? 'minimal-text' : isHarvard ? 'harvard-pills' : 'tech-chips'

   return section.items.map((item) => {
      const hasUrl = Boolean(item.projectUrl?.trim())
      const displayName = item.projectName || item.title

      // ── Project name node ────────────────────────────────────────────────────
      const nameNode = hasUrl ? (
         <a
            href={ensureProtocol(item.projectUrl!)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={linkClassName}
            style={linkTextStyle}
         >
            {displayName || <span className="text-gray-400 italic font-normal">Title</span>}
            <ExternalLink className="w-3 h-3 shrink-0 opacity-70" />
         </a>
      ) : (
         <h3 className={cn('font-bold leading-snug', titleColorClass)} style={{ fontSize: globalFontSize.itemTitle }}>
            {displayName || <span className="text-gray-400 italic font-normal">Title</span>}
         </h3>
      )

      // ── Tags node — rendered per template mode ───────────────────────────────
      const hasTags = item.projectSkills && item.projectSkills.length > 0
      let tagsNode: React.ReactNode = null

      if (hasTags) {
         if (tagMode === 'minimal-text') {
            tagsNode = (
               <p className="text-gray-500 mt-0.5" style={{ fontSize: globalFontSize.itemBody - 1 }}>
                  {item.projectSkills!.join(' · ')}
               </p>
            )
         } else if (tagMode === 'harvard-pills') {
            tagsNode = (
               <div className="flex flex-wrap gap-1 mt-1">
                  {item.projectSkills!.map((tag, idx) => (
                     <span
                        // eslint-disable-next-line react/no-array-index-key
                        key={idx}
                        className="px-1.5 py-0.5 text-[9px] rounded border border-gray-300 text-gray-600 bg-gray-50"
                     >
                        {tag}
                     </span>
                  ))}
               </div>
            )
         } else {
            // tech-chips
            tagsNode = (
               <div className="flex flex-wrap gap-1 mt-1">
                  {item.projectSkills!.map((tag, idx) => (
                     <span
                        // eslint-disable-next-line react/no-array-index-key
                        key={idx}
                        className="px-1.5 py-0.5 text-[9px] rounded font-medium"
                        style={{ backgroundColor: theme.color + '18', color: theme.color }}
                     >
                        {tag}
                     </span>
                  ))}
               </div>
            )
         }
      }

      return (
         <div key={item.id} className="mb-3">
            {/* Row 1: project name / link + date */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-1 sm:gap-3 mb-0.5">
               <div className="flex items-center min-w-0">{nameNode}</div>
               <span
                  className={cn('italic sm:whitespace-nowrap shrink-0', dateClass)}
                  style={{ fontSize: globalFontSize.itemDate }}
               >
                  {formatDate(item.startDate, item.endDate) || ''}
               </span>
            </div>

            {/* Tags */}
            {tagsNode}

            {/* Description (Quill HTML) */}
            {item.description && (
               <div
                  className={cn(descriptionClass, 'mt-1', 'ql-editor rendered-editor')}
                  style={{ fontSize: globalFontSize.itemBody }}
                  dangerouslySetInnerHTML={{ __html: item.description }}
               />
            )}
         </div>
      )
   })
}

export default ProjectSection
