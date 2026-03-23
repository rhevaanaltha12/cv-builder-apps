import React from 'react'
import {
   Linkedin,
   Github,
   Twitter,
   Facebook,
   Instagram,
   Youtube,
   Dribbble,
   Layers,
   MessageSquare,
   Globe,
   Link2,
   Mail,
   MapPin,
   Phone,
} from 'lucide-react'
import { useAppSelector } from '@/store/hook'
import { cn } from '@/lib/utils'
import ContactItem from './ContactItem'
import { ILinkIconType } from '../../config/interfaces'

const PreviewIcons: Record<ILinkIconType | string, React.FC<{ className?: string; style?: React.CSSProperties }>> = {
   linkedin: Linkedin,
   github: Github,
   twitter: Twitter,
   facebook: Facebook,
   instagram: Instagram,
   youtube: Youtube,
   dribbble: Dribbble,
   behance: Layers,
   medium: MessageSquare,
   stackoverflow: Layers,
   portfolio: Globe,
   website: Link2,
}

const ContactInfo = ({ centered, showIcons }: { centered: boolean; showIcons: boolean }) => {
   const { sections, personalInfo, theme, globalFontSize } = useAppSelector((state) => state.builderReducer)

   const items = [
      { icon: Mail, value: personalInfo.email, href: `mailto:${personalInfo.email}` },
      { icon: Phone, value: personalInfo.phone, href: `tel:${personalInfo.phone?.replace(/\s/g, '')}` },
      { icon: MapPin, value: personalInfo.location, href: undefined },
      { icon: Linkedin, value: personalInfo.linkedin, href: personalInfo.linkedin },
      { icon: Github, value: personalInfo.github, href: personalInfo.github },
      { icon: Globe, value: personalInfo.website, href: personalInfo.website },
   ].filter((item) => item.value)

   return (
      <div
         className={cn('flex flex-wrap gap-1 text-gray-600 mt-2', centered && 'justify-center')}
         style={{ fontSize: globalFontSize.itemBody }}
      >
         {items.map((item, idx) => (
            <ContactItem
               key={idx}
               icon={item.icon}
               value={item.value!}
               href={item.href}
               color={showIcons ? theme.color : undefined}
               fontSize={globalFontSize.itemBody}
               showIcon={showIcons}
            />
         ))}
         {personalInfo.links.map((link) => {
            const IconComponent = PreviewIcons[link.icon as ILinkIconType] || Link2
            return (
               <ContactItem
                  key={link.id}
                  icon={IconComponent}
                  value={link.label || link.url}
                  href={link.url}
                  color={showIcons ? theme.color : undefined}
                  fontSize={globalFontSize.itemBody}
                  showIcon={showIcons}
               />
            )
         })}
      </div>
   )
}

export default ContactInfo
