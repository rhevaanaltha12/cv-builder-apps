import { ISection } from '@/pages/builder/config/interfaces'
import { useAppSelector } from '@/store/hook'
import React from 'react'
import ExperienceEducationSection from './ExperienceEducationSection'
import SkillsSection from './SkillsSection'
import ProjectSection from './ProjectSection'

const DefaultSection = ({ section }: { section: ISection }) => {
   const {
      template: { isHarvard },
   } = useAppSelector((state) => state.builderReducer)

   switch (section.type) {
      case 'skills':
         return <SkillsSection section={section} />
      case 'projects':
         return <ProjectSection section={section} />

      default:
         return <ExperienceEducationSection section={section} />
   }
}

export default DefaultSection
