import { IPersonalInfo, ISection } from '@/features/builder/config/interfaces'

export const transformToJSONResume = (personalInfo: IPersonalInfo, sections: ISection[]) => {
   const experience = sections.find((s) => s.type === 'experience')?.items || []
   const education = sections.find((s) => s.type === 'education')?.items || []
   const skills = sections.find((s) => s.type === 'skills')?.items || []
   const projects = sections.find((s) => s.type === 'projects')?.items || []

   return {
      basics: {
         name: personalInfo.fullName,
         label: personalInfo.tagline?.join(', ') || '',
         email: personalInfo.email,
         phone: personalInfo.phone,
         url: personalInfo.website,
         summary: personalInfo.summary,
         location: {
            address: personalInfo.location,
         },
         profiles: [
            {
               network: 'LinkedIn',
               url: personalInfo.linkedin,
            },
            {
               network: 'GitHub',
               url: personalInfo.github,
            },
         ].filter((p) => p.url),
      },
      work: experience.map((exp: any) => ({
         name: exp.company,
         position: exp.position,
         location: exp.location,
         startDate: exp.startDate,
         endDate: exp.current ? '' : exp.endDate,
         summary: exp.description,
      })),
      education: education.map((edu: any) => ({
         institution: edu.school,
         area: edu.degree,
         studyType: edu.fieldOfStudy,
         startDate: edu.startDate,
         endDate: edu.endDate,
      })),
      skills: skills.map((s: any) => ({
         name: 'Skills',
         keywords: s.skills || [],
      })),
      projects: projects.map((p: any) => ({
         name: p.title,
         description: p.description,
         url: p.link,
      })),
   }
}

export const downloadJSON = (data: any, filename: string) => {
   const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
   const url = URL.createObjectURL(blob)
   const a = document.createElement('a')
   a.href = url
   a.download = filename
   document.body.appendChild(a)
   a.click()
   document.body.removeChild(a)
   URL.revokeObjectURL(url)
}
