import { generateId } from '@/lib/method'
import { ISection, ISectionItem, ISectionType, ISectionTypeFontSize, ITemplateType, ITypographySettings } from './interfaces'
import { BookOpen, Code, Type, FolderKanban, Award, BadgeCheck, Briefcase, GraduationCap } from 'lucide-react'

export const DEFAULT_SECTION_FONT_SIZE: ISectionTypeFontSize = {
   heading: 'lg',
   subheading: 'base',
   body: 'sm',
}

export const DEFAULT_TYPOGRAPHY: ITypographySettings = {
   name: 'lg',
   headers: 'md',
   body: 'sm',
}

export const PAGE_SIZES = {
   A4: { width: 595.28, height: 841.89, label: 'A4 (210 x 297 mm)' },
   LETTER: { width: 612, height: 792, label: 'US Letter (8.5 x 11 in)' },
   LEGAL: { width: 612, height: 1008, label: 'US Legal (8.5 x 14 in)' },
   EXECUTIVE: { width: 522, height: 756, label: 'Executive (7.25 x 10.5 in)' },
   B5: { width: 498.9, height: 708.66, label: 'B5 (176 x 250 mm)' },
   A5: { width: 419.53, height: 595.28, label: 'A5 (148 x 210 mm)' },
} as const

export const GLOBAL_FONT_SCALES = {
   small: 0.85,
   medium: 1,
   large: 1.15,
} as const

export const TYPOGRAPHY_PX = {
   sm: { name: 18, headers: 11, body: 9 },
   md: { name: 22, headers: 13, body: 10 },
   lg: { name: 26, headers: 15, body: 11 },
   xl: { name: 30, headers: 17, body: 12 },
} as const

export const options = {
   template: ['harvard', 'tech', 'minimal', 'bold', 'neo', 'portfolio', 'corporate', 'creative', 'elegant', 'modern'],
   fontSize: ['small', 'medium', 'large'],
   pageSize: ['A4', 'LETTER', 'LEGAL', 'EXECUTIVE', 'B5', 'A5'],
   typography: ['sm', 'md', 'lg', 'xl'],
   style: [
      {
         value: 'harvard',
         label: 'Academic',
         icon: BookOpen,
         background: 'bg-amber-50/50',
         hover: 'hover:border-amber-500',
         textColor: 'group-hover:text-amber-500',
         selectedBorder: 'border-amber-500',
         selectedText: 'text-amber-500',
      },
      {
         value: 'tech',
         label: 'Tech',
         icon: Code,
         background: 'bg-blue-50/50',
         hover: 'hover:border-blue-500',
         textColor: 'group-hover:text-blue-500',
         selectedBorder: 'border-blue-500',
         selectedText: 'text-blue-500',
      },
      {
         value: 'minimal',
         label: 'Minimal',
         icon: Type,
         background: 'bg-gray-50/50',
         hover: 'hover:border-gray-500',
         textColor: 'group-hover:text-gray-500',
         selectedBorder: 'border-gray-500',
         selectedText: 'text-gray-500',
      },
   ],
   pageFormat: [
      { width: 595.28, height: 841.89, label: 'A4 (210 x 297 mm)', value: 'A4' },
      { width: 612, height: 792, label: 'US Letter (8.5 x 11 in)', value: 'LETTER' },
      { width: 612, height: 1008, label: 'US Legal (8.5 x 14 in)', value: 'LEGAL' },
      { width: 522, height: 756, label: 'Executive (7.25 x 10.5 in)', value: 'EXECUTIVE' },
      { width: 498.9, height: 708.66, label: 'B5 (176 x 250 mm)', value: 'B5' },
      { width: 419.53, height: 595.28, label: 'A5 (148 x 210 mm)', value: 'A5' },
   ],
   skillLevel: [
      {
         label: 'Beginner',
         value: 'Beginner',
      },
      {
         label: 'Intermediate',
         value: 'Intermediate',
      },
      {
         label: 'Advanced',
         value: 'Advanced',
      },
      {
         label: 'Expert',
         value: 'Expert',
      },
   ],
}

export const DUMMY_DATA = {
   personalInfo: {
      fullName: 'Your Full Name',
      email: 'email@example.com',
      phone: '(555) 123-4567',
      location: 'City, State',
      tagline: 'Software Engineer | 3 Years Experience | React Js',
      summary:
         'A brief professional summary highlighting your key skills, experience, and career objectives. This helps recruiters quickly understand your value proposition.',
   },
   experience: [
      {
         id: 'dummy-exp-1',
         title: 'Senior Software Engineer',
         position: 'Senior Software Engineer',
         company: 'Technology Company',
         institution: '',
         degree: '',
         subtitle: 'Technology Company',
         location: 'San Francisco, CA',
         startDate: '2021-01',
         endDate: '',
         current: true,
         description:
            '• Led development of key features resulting in 40% performance improvement <br>• Mentored junior developers and conducted code reviews <br>• Collaborated with cross-functional teams on product roadmap',
      },
      {
         id: 'dummy-exp-2',
         title: 'Software Developer',
         position: 'Software Developer',
         company: 'Digital Agency',
         institution: '',
         degree: '',
         subtitle: 'Digital Agency',
         location: 'New York, NY',
         startDate: '2018-06',
         endDate: '2020-12',
         current: false,
         description:
            '• Built responsive web applications using modern frameworks <br>• Implemented CI/CD pipelines reducing deployment time by 60%',
      },
   ],
   education: [
      {
         id: 'dummy-edu-1',
         title: 'Bachelor of Science in Computer Science',
         position: '',
         company: '',
         degree: 'Bachelor of Science in Computer Science',
         institution: 'State University',
         subtitle: 'State University',
         location: 'Boston, MA',
         startDate: '2014-09',
         endDate: '2018-05',
         current: false,
         description: 'Relevant coursework: Data Structures, Algorithms, Software Engineering',
      },
   ],
   skills: [
      {
         name: 'Technology',
         skillList: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'AWS', 'Docker', 'Agile'],
      },
   ],
   certifications: [
      {
         id: 'dummy-cert-1',
         title: 'AWS Certified Solutions Architect',
         subtitle: 'Amazon Web Services',
         startDate: '2023-01',
         description: '• Verified expertise in designing and deploying scalable systems on AWS <br>• Comprehensive knowledge of AWS Cloud infrastructure and services',
      },
      {
         id: 'dummy-cert-2',
         title: 'Professional Scrum Master I',
         subtitle: 'Scrum.org',
         startDate: '2022-06',
         description: '• Demonstrated fundamental level of Scrum mastery <br>• Understanding of the Scrum framework and how to apply it',
      },
   ],
}

export const LINK_ICONS = {
   linkedin: { label: 'LinkedIn', pattern: /linkedin\.com/i },
   github: { label: 'GitHub', pattern: /github\.com/i },
   twitter: { label: 'X (Twitter)', pattern: /twitter\.com|x\.com/i },
   facebook: { label: 'Facebook', pattern: /facebook\.com/i },
   instagram: { label: 'Instagram', pattern: /instagram\.com/i },
   youtube: { label: 'YouTube', pattern: /youtube\.com/i },
   dribbble: { label: 'Dribbble', pattern: /dribbble\.com/i },
   behance: { label: 'Behance', pattern: /behance\.net/i },
   medium: { label: 'Medium', pattern: /medium\.com/i },
   stackoverflow: { label: 'Stack Overflow', pattern: /stackoverflow\.com/i },
   portfolio: { label: 'Portfolio', pattern: /portfolio|\.dev|\.design/i },
   website: { label: 'Website', pattern: /.*/ },
} as const

export const ACCENT_COLORS = [
   // Neutrals
   { color: '#1a1a2e', name: 'Charcoal' },
   { color: '#374151', name: 'Slate' },
   // Blues
   { color: '#2563eb', name: 'Azure' },
   { color: '#0ea5e9', name: 'Sky' },
   { color: '#0d9488', name: 'Teal' },
   // Warm
   { color: '#dc2626', name: 'Crimson' },
   { color: '#ea580c', name: 'Amber' },
   { color: '#ca8a04', name: 'Gold' },
   // Cool
   { color: '#7c3aed', name: 'Violet' },
   { color: '#db2777', name: 'Rose' },
   { color: '#059669', name: 'Emerald' },
] as const

export const createSectionItem = (type: ISectionType, fieldDefinitions?: any[]): ISectionItem => {
   const baseItem: ISectionItem = { id: generateId() }

   switch (type) {
      case 'experience':
         return {
            ...baseItem,
            position: '',
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            current: false,
            description: '',
         }
      case 'education':
         return { ...baseItem, institution: '', degree: '', location: '', startDate: '', endDate: '', description: '' }
      case 'skills':
         return { ...baseItem, skills: [] }
      case 'projects':
         return { ...baseItem, title: '', subtitle: '', startDate: '', endDate: '', description: '' }
      case 'certifications':
         return { ...baseItem, title: '', subtitle: '', startDate: '', description: '' }
      // case 'custom':
      //    // Initialize custom fields based on field definitions
      //    const customFields: ICustomFieldValue[] =
      //       fieldDefinitions?.map((fd) => ({
      //          fieldId: fd.id,
      //          value: fd.type === 'tags' ? [] : '',
      //       })) || []
      //    return { ...baseItem, title: '', customFields }
      default:
         return baseItem
   }
}

export const createSection = (type: ISectionType, template?: any): ISection => {
   const titles: Record<ISectionType, string> = {
      experience: 'Experience',
      education: 'Education',
      skills: 'Skills',
      projects: 'Projects',
      certifications: 'Certifications',
      custom: 'Custom Section',
   }

   const baseSection: ISection = {
      id: generateId(),
      type,
      title: titles[type],
      isVisible: true,
      items: type === 'skills' ? [createSectionItem(type)] : [],
      fontSize: { ...DEFAULT_SECTION_FONT_SIZE },
   }

   return baseSection
}

export const SECTION_CONFIG: Record<ISectionType, { label: string; icon: React.ReactNode; color: string }> = {
   experience: {
      label: 'Experience',
      icon: <Briefcase className="w-4 h-4" />,
      color: 'bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300',
   },
   education: {
      label: 'Education',
      icon: <GraduationCap className="w-4 h-4" />,
      color: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300',
   },
   skills: {
      label: 'Skills',
      icon: <Code className="w-4 h-4" />,
      color: 'bg-violet-50 text-violet-700 hover:bg-violet-100 dark:bg-violet-950 dark:text-violet-300',
   },
   projects: {
      label: 'Projects',
      icon: <FolderKanban className="w-4 h-4" />,
      color: 'bg-orange-50 text-orange-700 hover:bg-orange-100 dark:bg-orange-950 dark:text-orange-300',
   },
   certifications: {
      label: 'Certifications',
      icon: <BadgeCheck className="w-4 h-4" />,
      color: 'bg-pink-50 text-pink-700 hover:bg-pink-100 dark:bg-pink-950 dark:text-pink-300',
   },
   custom: {
      label: 'Custom',
      icon: <Award className="w-4 h-4" />,
      color: 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300',
   },
}

export const TEMPLATE_FONTS: Record<ITemplateType, string> = {
   harvard: 'Times-Roman',
   tech: 'Helvetica',
   minimal: 'Helvetica',
}
