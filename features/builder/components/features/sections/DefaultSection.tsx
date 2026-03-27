import { ISection } from '@/features/builder/config/interfaces'
import { useAppSelector } from '@/store/hook'
import React from 'react'
import ExperienceEducationSection from './ExperienceEducationSection'
import SkillsSection from './SkillsSection'
import ProjectSection from './ProjectSection'
import CertificationSection from './CertificationSection'

const DefaultSection = ({ section }: { section: ISection }) => {
   const {
      template: { isHarvard },
   } = useAppSelector((state) => state.builderReducer)

   switch (section.type) {
      case 'skills':
         return <SkillsSection section={section} />
      case 'projects':
         return <ProjectSection section={section} />
      case 'certifications':
         return <CertificationSection section={section} />
      default:
         return <ExperienceEducationSection section={section} />
   }
}

export default DefaultSection
