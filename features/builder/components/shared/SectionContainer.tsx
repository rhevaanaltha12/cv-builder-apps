import React from 'react'
import { ISection } from '../../config/interfaces'
import { useSortable } from '@dnd-kit/sortable'
import { GripVertical } from 'lucide-react'
import { CSS } from '@dnd-kit/utilities'
import Container from './Container'
import { cn } from '@/lib/utils'

interface IProps {
   section: ISection
   children: React.ReactNode
}

const SectionContainer = (props: IProps) => {
   const { section, children } = props

   const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.id })

   const style = {
      transform: CSS.Transform.toString(transform),
      transition,
   }

   return (
      <div className={cn('flex gap-4', isDragging && 'opacity-50')} ref={setNodeRef} style={style}>
         <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors p-1 rounded-none hover:bg-muted w-[30px] h-[30px]"
            aria-label="Drag to reorder section"
         >
            <GripVertical className="w-5 h-5" />
         </button>
         <Container label={section.title} className="w-full" showCollapseBtn={true}>
            {children}
         </Container>
      </div>
   )
}

export default SectionContainer
