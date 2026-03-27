import { ISection } from '@/features/builder/config/interfaces'

export interface ATSScoreResult {
   score: number
   details: {
      label: string
      status: 'success' | 'warning' | 'error'
      weight: number
   }[]
}

const calculatePersonalInfoScore = (personalInfo: any) => {
   let score = 0
   if (personalInfo.fullName) score += 5
   if (personalInfo.email) score += 5
   if (personalInfo.phone) score += 5
   if (personalInfo.location) score += 5
   return score
}

const calculateSummaryScore = (summary: string) => {
   const length = summary?.length || 0
   if (length > 100) return 15
   if (length > 50) return 10
   if (length > 0) return 5
   return 0
}

const calculateItemsScore = (sections: ISection[], id: string, minItems: number, maxWeight: number, partialWeight: number) => {
   const count = sections.find((s) => s.id === id)?.items?.length || 0
   if (count >= minItems) return maxWeight
   if (count >= 1) return partialWeight
   return 0
}

const calculateDigitalPresenceScore = (personalInfo: any) => {
   let score = 0
   if (personalInfo.linkedin) score += 10
   if (personalInfo.github || personalInfo.website) score += 10
   return score
}

export const calculateATSScore = (personalInfo: any, sections: ISection[]): ATSScoreResult => {
   const details: ATSScoreResult['details'] = []

   const piScore = calculatePersonalInfoScore(personalInfo)
   let piStatus: 'success' | 'warning' | 'error' = 'error'
   if (piScore === 20) piStatus = 'success'
   else if (piScore > 0) piStatus = 'warning'

   details.push({
      label: 'Contact Information',
      status: piStatus,
      weight: 20,
   })

   const summaryScore = calculateSummaryScore(personalInfo.summary)
   let summaryStatus: 'success' | 'warning' | 'error' = 'error'
   if (summaryScore >= 15) summaryStatus = 'success'
   else if (summaryScore > 0) summaryStatus = 'warning'

   details.push({
      label: 'Professional Summary',
      status: summaryStatus,
      weight: 15,
   })

   const expScore = calculateItemsScore(sections, 'experience', 3, 30, 15)
   let expStatus: 'success' | 'warning' | 'error' = 'error'
   if (expScore >= 30) expStatus = 'success'
   else if (expScore > 0) expStatus = 'warning'

   details.push({
      label: 'Work Experience',
      status: expStatus,
      weight: 30,
   })

   const skillScore = calculateItemsScore(sections, 'skills', 5, 15, 8)
   let skillStatus: 'success' | 'warning' | 'error' = 'error'
   if (skillScore >= 15) skillStatus = 'success'
   else if (skillScore > 0) skillStatus = 'warning'

   details.push({
      label: 'Skills Section',
      status: skillStatus,
      weight: 15,
   })

   const linkScore = calculateDigitalPresenceScore(personalInfo)
   let linkStatus: 'success' | 'warning' | 'error' = 'error'
   if (linkScore === 20) linkStatus = 'success'
   else if (linkScore > 0) linkStatus = 'warning'

   details.push({
      label: 'Professional Links',
      status: linkStatus,
      weight: 20,
   })

   const score = piScore + summaryScore + expScore + skillScore + linkScore
   return { score, details }
}
