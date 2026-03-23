import { LINK_ICONS } from './constant'

export type TFontSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl'

export interface ISectionTypeFontSize {
   heading: TFontSize
   subheading: TFontSize
   body: TFontSize
}

export type TTypography = 'sm' | 'md' | 'lg' | 'xl'

export interface ITypographySettings {
   name: TTypography
   headers: TTypography
   body: TTypography
}

export interface ITheme {
   template: 'harvard' | 'tech' | 'minimal'
   color: string
   fontSize: 'small' | 'medium' | 'large'
   pageSize: 'A4' | 'LETTER' | 'LEGAL' | 'EXECUTIVE' | 'B5' | 'A5'
   typography?: ITypographySettings
   autoAdjust?: boolean
   recentColors?: string[]
}

export interface ITemplate {
   isHarvard: boolean
   isTech: boolean
   isMinimal: boolean
}

export interface IFontSize {
   name: number
   summary: number
   tagline: number
   sectionHeading: number
   itemTitle: number
   itemSubtitle: number
   itemBody: number
   itemDate: number
}

export type ITemplateType = ITheme['template']

export interface ISkill {
   id: string
   name: string
   skillList: string[]
}

export interface ISectionItem {
   id: string
   position?: string
   company?: string
   institution?: string
   degree?: string
   startDate?: string
   endDate?: string
   current?: boolean
   location?: string
   description?: string
   title?: string
   subtitle?: string
   skills?: ISkill[]
   projectName?: string
   projectUrl?: string
   projectSkills?: string[]
}

export interface ISection {
   id: string
   type: 'experience' | 'education' | 'skills' | 'custom' | 'projects' | 'certifications'
   title: string
   isVisible: boolean
   items: ISectionItem[]
   fontSize?: ISectionTypeFontSize
   //    fieldDefinitions?: ICustomFieldDefinition[]
}

export interface ILink {
   id: string
   label: string
   url: string
   icon?: string
}

export interface IPersonalInfo {
   fullName: string
   email: string
   phone: string
   location: string
   summary: string
   tagline: string[]
   website: string
   linkedin: string
   github: string
   links: ILink[]
}

export type ILinkIconType = keyof typeof LINK_ICONS
export type ISectionType = ISection['type']

export interface IResumeData {
   theme: ITheme
   personalInfo: IPersonalInfo
   sections: ISection[]
}
