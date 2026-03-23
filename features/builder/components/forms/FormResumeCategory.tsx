import { useAppDispatch, useAppSelector } from '@/store/hook'
import { setSection } from '@/store/reducers/builder/builder.slice'
import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { sortableKeyboardCoordinates, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { FileText } from 'lucide-react'
import React, { useCallback, useEffect } from 'react'
import SectionContainer from '../shared/SectionContainer'
import { ISectionType } from '../../config/interfaces'
import ExperienceForm from '../features/ExperienceForm'
import EducationForm from '../features/EducationForm'
import SkillsForm from '../features/SkillsForm'
import ProjectForm from '../features/ProjectForm'
// import { SECTION_CONFIG } from '../../config/constant'
// import { ISectionType } from '../../config/interfaces'
// import SectionContainer from '../shared/SectionContainer'
// import ExperienceForm from '../features/ExperienceForm'
// import EducationForm from '../features/EducationForm'
// import SkillsForm from '../features/SkillsForm'
// import CustomSectionForm from '../features/CustomSectionForm'
// import ProjectForm from '../features/ProjectForm'

const FormResumeCategory = () => {
   const dispatch = useAppDispatch()
   const { personalInfo, sections } = useAppSelector((state) => state.builderReducer)

   const sensors = useSensors(
      useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
      useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
   )

   //    const getSectionIcon = (type: ISectionType) => SECTION_CONFIG[type]?.icon || <FileText className="w-4 h-4" />

   const getSectionForm = (section: any) => {
      switch (section.type) {
         case 'education':
            return <EducationForm section={section} />
         case 'skills':
            return <SkillsForm section={section} />
         case 'projects':
            return <ProjectForm section={section} />
         default:
            return <ExperienceForm section={section} />
      }
   }

   const reorderSections = (activeId: string, overId: string) => {
      const newSections = [...sections]
      const activeIndex = newSections.findIndex((s) => s.id === activeId)
      const overIndex = newSections.findIndex((s) => s.id === overId)

      if (activeIndex === -1 || overIndex === -1) return

      const [removed] = newSections.splice(activeIndex, 1)
      newSections.splice(overIndex, 0, removed)

      dispatch(setSection(newSections))
   }

   const handleDragEnd = useCallback(
      (event: DragEndEvent) => {
         const { active, over } = event
         if (over && active.id !== over.id) {
            reorderSections(active.id as string, over.id as string)
         }
      },
      [reorderSections]
   )

   useEffect(() => {
      console.log('section', sections)
   }, [sections])

   return (
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
         <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
            {sections.map((section) => (
               <SectionContainer key={section.id} section={section}>
                  {getSectionForm(section)}
               </SectionContainer>
            ))}
         </SortableContext>
      </DndContext>
   )
}

export default FormResumeCategory
