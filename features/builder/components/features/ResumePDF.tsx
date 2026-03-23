import { formatDate } from '@/lib/method'
import { DEFAULT_TYPOGRAPHY, GLOBAL_FONT_SCALES, TEMPLATE_FONTS, TYPOGRAPHY_PX } from '../../config/constant'
import { IResumeData, ISection, ISkill, ITemplateType } from '../../config/interfaces'
import { Document, Page, Text, View, StyleSheet, Link, Svg, Path, pdf } from '@react-pdf/renderer'
import type { Style } from '@react-pdf/types'
import TurndownService from 'turndown'

const getTemplateFont = (template: ITemplateType): string => {
   return TEMPLATE_FONTS[template] || 'Helvetica'
}

const getFontSizes = (data: IResumeData) => {
   const typography = data.theme.typography || DEFAULT_TYPOGRAPHY
   const scale = GLOBAL_FONT_SCALES[data.theme.fontSize] || 1

   return {
      name: Math.round(24 * scale),
      tagline: Math.round(14 * scale),
      summary: Math.round(11 * scale),
      sectionHeading: Math.round(14 * scale),
      itemTitle: Math.round(12 * scale),
      itemSubtitle: Math.round(11 * scale),
      itemBody: Math.round(10 * scale),
      itemDate: Math.round(9 * scale),
   }
}

// Get base page styles with template-specific font
const getPageStyles = (template: ITemplateType) => {
   const fontFamily = getTemplateFont(template)
   return StyleSheet.create({
      page: {
         padding: 0,
         fontSize: 10,
         fontFamily: fontFamily,
         lineHeight: 1.4,
         color: '#1a1a1a',
      },
   })
}

// Base styles shared across templates (non-font-specific)
const baseStyles = StyleSheet.create({
   section: {
      marginBottom: 12,
   },
   itemContainer: {
      marginBottom: 8,
   },
   bulletItem: {
      flexDirection: 'row',
      marginBottom: 2,
   },
   bullet: {
      width: 15,
   },
   bulletText: {
      flex: 1,
   },
   link: {
      color: '#2563eb',
      textDecoration: 'none',
   },
})

interface PDFRichTextProps {
   text: string
   fontSize?: number
   color?: string
   themeColor?: string
   style?: Style
   textStyle?: Style
}

interface PDFRichTextProps {
   text: string
   fontSize?: number
   color?: string
   themeColor?: string
   style?: Style
   textStyle?: Style
}

// Render inline markdown segments for PDF (strong/em/link) using nested <Text>.
// NOTE: This is not HTML; it is React-PDF text nesting.
const renderInlineMarkdownChildrenPDF = (text: string): React.ReactNode[] => {
   if (!text) return []

   // Pattern for: **bold**, __bold__, *italic*, _italic_, ***boldItalic***, [text](url)
   const pattern = /(\*\*\*(.+?)\*\*\*|___(.+?)___|(\*\*|__)(.+?)\4|(\*|_)([^*_]+?)\6|\[([^\]]+)\]\(([^)]+)\))/g

   const children: React.ReactNode[] = []
   let lastIndex = 0
   let match: RegExpExecArray | null
   let key = 0

   while ((match = pattern.exec(text)) !== null) {
      if (match.index > lastIndex) {
         children.push(text.slice(lastIndex, match.index))
      }

      if (match[2] || match[3]) {
         children.push(
            <Text key={key++} style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
               {match[2] || match[3]}
            </Text>
         )
      } else if (match[5]) {
         children.push(
            <Text key={key++} style={{ fontWeight: 'bold' }}>
               {match[5]}
            </Text>
         )
      } else if (match[7]) {
         children.push(
            <Text key={key++} style={{ fontStyle: 'italic' }}>
               {match[7]}
            </Text>
         )
      } else if (match[8] && match[9]) {
         const href = match[9].startsWith('http') ? match[9] : `https://${match[9]}`
         children.push(
            <Link key={key++} src={href} style={{ color: '#2563eb', textDecoration: 'none' }}>
               {match[8]}
            </Link>
         )
      }

      lastIndex = match.index + match[0].length
   }

   if (lastIndex < text.length) {
      children.push(text.slice(lastIndex))
   }

   return children
}

const InlineMarkdownPDF: React.FC<{ text: string; style: Style }> = ({ text, style }) => {
   if (!text) return null
   const children = renderInlineMarkdownChildrenPDF(text)
   return <Text style={style}>{children.length > 0 ? children : text}</Text>
}

const turndown = new TurndownService({
   headingStyle: 'atx',
   bulletListMarker: '-' as any,
   codeBlockStyle: 'fenced',
   emDelimiter: '*',
})

turndown.addRule('quill-bullet-list', {
   filter: (node) =>
      node.nodeName === 'LI' &&
      node.parentNode?.nodeName === 'OL' &&
      (node as HTMLElement).getAttribute('data-list') === 'bullet',
   replacement: (content, node, options) => {
      return `${options.bulletListMarker} ${content}\n`
   },
})

turndown.addRule('quill-numbered-list', {
   filter: ['ol'],
   replacement: (content) => {
      // We'll handle numbering in the next pass if needed
      return content
   },
})

export function quillHtmlToMarkdown(html: string): string {
   if (!html?.trim()) return ''

   let clean = html.replace(/<span class="ql-ui" contenteditable="false"><\/span>/g, '').replace(/ data-list="[^"]*"/g, '') // remove Quill's data-list

   // Important: turn ALL <ol> into <ul> before conversion
   clean = clean.replace(/<ol[^>]*>/g, '<ul>').replace(/<\/ol>/g, '</ul>')

   const md = turndown.turndown(clean).trim()

   // Optional: normalize to your preferred bullet character
   return md.replace(/^([ \t]*)[*\-+]([ \t]+)/gm, '$1• ')
}

// Main PDF rich text renderer with bullets, numbered lists, headers, and markdown
const PDFRichText: React.FC<PDFRichTextProps> = ({
   text,
   fontSize = 10,
   color = '#4b5563',
   themeColor = '#2563eb',
   style = {},
   textStyle = {},
}) => {
   if (!text) return null

   const baseTextStyle: Style = { fontSize, color, ...textStyle }

   const quill = quillHtmlToMarkdown(text)
   const lines = quill.split('\n')
   const elements: React.ReactNode[] = []

   for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const trimmed = line.trim()

      // Check for headers (## or ###)
      const headerMatch = trimmed.match(/^(#{1,6})\s+(.+)$/)
      if (headerMatch) {
         const level = headerMatch[1].length
         const headerSizes: Record<number, number> = {
            1: fontSize * 1.4,
            2: fontSize * 1.25,
            3: fontSize * 1.1,
            4: fontSize * 1.05,
            5: fontSize,
            6: fontSize * 0.95,
         }
         const headerSize = headerSizes[level] || headerSizes[3]
         elements.push(
            <View key={i} style={{ marginBottom: 2 }}>
               <InlineMarkdownPDF
                  text={headerMatch[2]}
                  style={{ fontSize: headerSize, color: themeColor, fontWeight: level <= 2 ? 'bold' : 'bold' }}
               />
            </View>
         )
         continue
      }

      // Check for bullet points (-, *, •)
      const bulletMatch = trimmed.match(/^[-*•]\s+(.+)$/)
      if (bulletMatch) {
         elements.push(
            <View key={i} style={{ flexDirection: 'row', marginBottom: 1.5 }}>
               <View style={{ width: 12, alignItems: 'center', paddingTop: fontSize * 0.35 }}>
                  <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: themeColor }} />
               </View>
               <View style={{ flex: 1 }}>
                  <InlineMarkdownPDF text={bulletMatch[1]} style={baseTextStyle} />
               </View>
            </View>
         )
         continue
      }

      // Check for numbered lists (1., 2., etc.)
      const numberedMatch = trimmed.match(/^(\d+)[.)]\s+(.+)$/)
      if (numberedMatch) {
         elements.push(
            <View key={i} style={{ flexDirection: 'row', marginBottom: 1.5 }}>
               <Text style={{ width: 16, fontSize, color: themeColor, fontWeight: 'bold' }}>{numberedMatch[1]}.</Text>
               <View style={{ flex: 1 }}>
                  <InlineMarkdownPDF text={numberedMatch[2]} style={baseTextStyle} />
               </View>
            </View>
         )
         continue
      }

      // Regular text or empty line
      if (trimmed) {
         elements.push(
            <View key={i} style={{ marginBottom: 1 }}>
               <InlineMarkdownPDF text={trimmed} style={baseTextStyle} />
            </View>
         )
      } else if (line === '' && i > 0 && i < lines.length - 1) {
         // Empty line (paragraph break)
         elements.push(<View key={i} style={{ height: fontSize * 0.5 }} />)
      }
   }

   return <View style={style}>{elements}</View>
}

type FontSizes = ReturnType<typeof getFontSizes>

interface ResumePDFProps {
   data: IResumeData
   template: ITemplateType
}

const SPACING = 12

const renderHarvardHeader = (data: IResumeData, fontSize: FontSizes) => (
   <View style={{ marginBottom: 16, borderBottom: '2 solid #1f2937', paddingBottom: 10, textAlign: 'center' }}>
      <Text
         style={{
            fontSize: fontSize.name,
            color: '#1f2937',
            textAlign: 'center',
            marginBottom: 16,
            textTransform: 'uppercase',
            letterSpacing: 2,
         }}
      >
         {data.personalInfo?.fullName || ''}
      </Text>
      {data.personalInfo?.summary && (
         <PDFRichText
            text={data.personalInfo.summary}
            fontSize={fontSize.summary}
            color="#4b5563"
            themeColor={data.theme.color}
            style={{ marginBottom: 8 }}
         />
      )}
      <View style={{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 12, fontSize: fontSize.itemBody }}>
         {data.personalInfo?.email && <Text style={{ color: '#4b5563' }}>{data.personalInfo.email}</Text>}
         {data.personalInfo?.phone && <Text style={{ color: '#4b5563' }}>{data.personalInfo.phone}</Text>}
         {data.personalInfo?.location && <Text style={{ color: '#4b5563' }}>{data.personalInfo.location}</Text>}
      </View>
      <View
         style={{
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 12,
            fontSize: fontSize.itemBody,
            marginTop: 4,
         }}
      >
         {data.personalInfo?.linkedin && (
            <Link src={data.personalInfo.linkedin} style={{ color: '#4b5563' }}>
               LinkedIn
            </Link>
         )}
         {data.personalInfo?.github && (
            <Link src={data.personalInfo.github} style={{ color: '#4b5563' }}>
               GitHub
            </Link>
         )}
         {data.personalInfo?.website && (
            <Link src={data.personalInfo.website} style={{ color: '#4b5563' }}>
               Portfolio
            </Link>
         )}
      </View>
   </View>
)

const renderTechHeader = (data: IResumeData, fontSize: FontSizes) => {
   const color = data.theme.color
   return (
      <View style={{ marginBottom: 16 }}>
         <Text style={{ fontSize: fontSize.name, color: color, marginBottom: 16 }}>{data.personalInfo?.fullName || ''}</Text>
         <Text style={{ fontSize: fontSize.tagline, color: '#6b7280', marginBottom: 8 }}>
            {data.personalInfo?.tagline.map((tg) => tg)?.join(' | ') || ''}
         </Text>
         {data.personalInfo?.summary && (
            <PDFRichText
               text={data.personalInfo.summary}
               fontSize={fontSize.summary}
               color="#6b7280"
               themeColor={color}
               style={{ marginBottom: 8 }}
            />
         )}
         <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, fontSize: fontSize.itemBody }}>
            {data.personalInfo?.email && <Text style={{ color: '#4b5563' }}>{data.personalInfo.email}</Text>}
            {data.personalInfo?.phone && <Text style={{ color: '#4b5563' }}>{data.personalInfo.phone}</Text>}
            {data.personalInfo?.location && <Text style={{ color: '#4b5563' }}>{data.personalInfo.location}</Text>}
         </View>
         <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, fontSize: fontSize.itemBody, marginTop: 4 }}>
            {data.personalInfo?.linkedin && (
               <Link src={data.personalInfo.linkedin} style={{ color: color }}>
                  LinkedIn
               </Link>
            )}
            {data.personalInfo?.github && (
               <Link src={data.personalInfo.github} style={{ color: color }}>
                  GitHub
               </Link>
            )}
            {data.personalInfo?.website && (
               <Link src={data.personalInfo.website} style={{ color: color }}>
                  Portfolio
               </Link>
            )}
         </View>
      </View>
   )
}

const renderMinimalHeader = (data: IResumeData, fontSize: FontSizes) => (
   <View style={{ marginBottom: 20, textAlign: 'center' }}>
      <Text
         style={{
            fontSize: fontSize.name,
            fontWeight: 'light',
            color: '#1f2937',
            textAlign: 'center',
            marginBottom: 6,
            letterSpacing: 1,
         }}
      >
         {data.personalInfo?.fullName || ''}
      </Text>
      {data.personalInfo?.summary && (
         <PDFRichText
            text={data.personalInfo.summary}
            fontSize={fontSize.summary}
            color="#9ca3af"
            themeColor={data.theme.color}
            style={{ marginBottom: 8 }}
         />
      )}
      <View style={{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 12, fontSize: fontSize.itemBody }}>
         {data.personalInfo?.email && <Text style={{ color: '#6b7280' }}>{data.personalInfo.email}</Text>}
         {data.personalInfo?.phone && <Text style={{ color: '#6b7280' }}>{data.personalInfo.phone}</Text>}
         {data.personalInfo?.location && <Text style={{ color: '#6b7280' }}>{data.personalInfo.location}</Text>}
      </View>
      <View
         style={{
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 12,
            fontSize: fontSize.itemBody,
            marginTop: 4,
         }}
      >
         {data.personalInfo?.linkedin && (
            <Link src={data.personalInfo.linkedin} style={{ color: '#6b7280' }}>
               LinkedIn
            </Link>
         )}
         {data.personalInfo?.github && (
            <Link src={data.personalInfo.github} style={{ color: '#6b7280' }}>
               GitHub
            </Link>
         )}
         {data.personalInfo?.website && (
            <Link src={data.personalInfo.website} style={{ color: '#6b7280' }}>
               Portfolio
            </Link>
         )}
      </View>
   </View>
)

const isRealContent = (value: string | undefined | null): boolean => {
   if (!value || value.trim() === '') return false
   const placeholders = [
      'your name',
      'full name',
      'your title',
      'job title',
      'your email',
      'your phone',
      'your location',
      'city, country',
      'write a short',
      'professional summary',
      'add your',
      'xyz company',
      'company name',
      'position title',
      'university name',
      'degree name',
      'field of study',
      'skill name',
      'project name',
      'certification name',
      'describe your',
      'brief description',
      'example',
      'sample',
      'lorem ipsum',
      'your.email@example',
      '+1 234 567',
   ]
   const lower = value.toLowerCase().trim()
   return !placeholders.some((p) => lower.includes(p) || lower === p)
}

const getTemplateColors = (template: ITemplateType, color: string) => {
   switch (template) {
      case 'harvard':
         return { title: '#1f2937', subtitle: '#4b5563', date: '#6b7280' }
      case 'tech':
         return { title: '#0f172a', subtitle: color, date: '#64748b' }
      default:
         return { title: '#1f2937', subtitle: '#4b5563', date: '#9ca3af' }
   }
}

const renderSectionTitle = (title: string, template: ITemplateType, color: string, sectionHeadingSize: number = 12) => {
   switch (template) {
      case 'harvard':
         return (
            <Text
               style={{
                  fontSize: sectionHeadingSize,
                  color: '#1f2937',
                  borderBottom: '1 solid #1f2937',
                  paddingBottom: 6,
                  marginBottom: 8,
                  textTransform: 'uppercase',
                  letterSpacing: 1,
               }}
            >
               {title}
            </Text>
         )
      case 'tech':
         return (
            <Text
               style={{
                  fontSize: sectionHeadingSize,
                  color: color,
                  marginBottom: 8,
                  borderBottom: '1 solid #4b5563',
                  paddingBottom: 6,
               }}
            >
               {title}
            </Text>
         )
      default:
         return (
            <Text
               style={{
                  fontSize: Math.round(sectionHeadingSize * 0.85),
                  color: '#9ca3af',
                  marginBottom: 6,
                  textTransform: 'uppercase',
                  letterSpacing: 2,
               }}
            >
               {title}
            </Text>
         )
   }
}

// Default font sizes for standalone renderSection (no data context)
const DEFAULT_FONT_SIZES = {
   name: 24,
   tagline: 14,
   summary: 11,
   sectionHeading: 14,
   itemTitle: 12,
   itemSubtitle: 11,
   itemBody: 10,
   itemDate: 9,
}

const renderSkills = (data: IResumeData, skills: ISkill[], template: ITemplateType, color: string) => {
   if (!skills || skills.length === 0) return null
   const fontSize = getFontSizes(data)
   return (
      <View>
         {skills.map((skill, idx) => (
            <View key={idx} style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
               <Text style={{ fontSize: 10, color: '#1f2937' }}>{skill.name}:</Text>
               <Text style={{ fontSize: 10, color: '#4b5563' }}>{skill.skillList.map((sl) => sl).join(', ')}</Text>
            </View>
         ))}
      </View>
   )
}

const renderFullSkillsSection = (data: IResumeData, section: ISection, template: ITemplateType, color: string) => {
   const item = section.items?.[0]
   if (!item) return null

   const plainSkills = item.skills || []

   const hasPlainSkills = plainSkills.length > 0

   return <View>{hasPlainSkills && <View>{renderSkills(data, plainSkills, template, color)}</View>}</View>
}

const ResumePDF: React.FC<ResumePDFProps> = ({ data, template }) => {
   const color = data.theme.color

   // Compute font sizes based on theme (matches PreviewCanvas)
   const fontSize = getFontSizes(data)

   // Render header based on template
   const renderHeader = () => {
      switch (template) {
         case 'harvard':
            return renderHarvardHeader(data, fontSize)
         case 'minimal':
            return renderMinimalHeader(data, fontSize)
         default:
            return renderTechHeader(data, fontSize)
      }
   }

   // Local section renderer that uses fontSize
   const renderSectionLocal = (section: ISection) => {
      if (!section.isVisible) return null

      // Filter items to only include those with real content (not placeholders)
      const realItems = (section.items || []).filter((item) => {
         const hasTitle = isRealContent(item.title) || isRealContent(item.position) || isRealContent(item.degree)
         const hasSubtitle = isRealContent(item.subtitle) || isRealContent(item.company) || isRealContent(item.institution)
         const hasDescription = isRealContent(item.description)
         const hasSkills =
            item.skills &&
            item.skills.length > 0 &&
            item.skills.some((s) => isRealContent(s.skillList.map((sl) => sl).join(', ')))

         return hasTitle || hasSubtitle || hasDescription || hasSkills
      })

      // Core sections (experience, education, skills) always show header even if empty
      const isCoreSection = ['experience', 'education', 'skills'].includes(section.type)

      // For non-core sections (projects, certifications, custom), hide entirely if no real content
      if (!isCoreSection && realItems.length === 0) {
         return null
      }

      const colors = getTemplateColors(template, color)

      switch (section.type) {
         case 'experience':
            return (
               <View style={baseStyles.section} key={section.id}>
                  {renderSectionTitle(section.title, template, color, fontSize.sectionHeading)}
                  {realItems.length > 0 ? (
                     realItems.map((item) => (
                        <View key={item.id} style={{ marginBottom: 10 }}>
                           <View
                              style={{
                                 flexDirection: 'row',
                                 justifyContent: 'space-between',
                                 alignItems: 'flex-start',
                                 marginBottom: 2,
                              }}
                           >
                              <View style={{ flex: 1 }}>
                                 <Text
                                    style={{
                                       fontSize: fontSize.itemTitle,
                                       color: colors.title,
                                       marginBottom: 2,
                                    }}
                                 >
                                    {item.company || item.subtitle || ''}
                                 </Text>
                                 <Text style={{ fontSize: fontSize.itemSubtitle, color: colors.subtitle }}>
                                    {item.position || item.title || ''}
                                 </Text>
                              </View>
                              <Text style={{ fontSize: fontSize.itemDate, color: colors.date, fontStyle: 'italic' }}>
                                 {formatDate(item.startDate, item.endDate, item.current)}
                              </Text>
                           </View>
                           {item.description && (
                              <PDFRichText
                                 text={item.description}
                                 fontSize={fontSize.itemBody}
                                 color="#4b5563"
                                 themeColor={color}
                                 style={{ marginTop: 4 }}
                              />
                           )}
                        </View>
                     ))
                  ) : (
                     <View style={{ height: 20 }} />
                  )}
               </View>
            )
         case 'education':
            return (
               <View style={baseStyles.section} key={section.id}>
                  {renderSectionTitle(section.title, template, color, fontSize.sectionHeading)}
                  {realItems.length > 0 ? (
                     realItems.map((item) => (
                        <View key={item.id} style={{ marginBottom: 10 }}>
                           <View
                              style={{
                                 flexDirection: 'row',
                                 justifyContent: 'space-between',
                                 alignItems: 'flex-start',
                                 marginBottom: 2,
                              }}
                           >
                              <View style={{ flex: 1 }}>
                                 <Text style={{ fontSize: fontSize.itemTitle, marginBottom: 2, color: colors.title }}>
                                    {item.institution || item.subtitle || ''}
                                 </Text>
                                 <Text style={{ fontSize: fontSize.itemSubtitle, color: colors.subtitle }}>
                                    {item.degree || item.title || ''}
                                 </Text>
                              </View>
                              <Text style={{ fontSize: fontSize.itemDate, color: colors.date, fontStyle: 'italic' }}>
                                 {formatDate(item.startDate, item.endDate)}
                              </Text>
                           </View>
                           {item.description && (
                              <PDFRichText
                                 text={item.description}
                                 fontSize={fontSize.itemBody}
                                 color="#4b5563"
                                 themeColor={color}
                                 style={{ marginTop: 4 }}
                              />
                           )}
                        </View>
                     ))
                  ) : (
                     <View style={{ height: 20 }} />
                  )}
               </View>
            )
         case 'skills':
            return (
               <View style={baseStyles.section} key={section.id}>
                  {renderSectionTitle(section.title, template, color, fontSize.sectionHeading)}
                  {renderFullSkillsSection(data, section, template, color) || <View style={{ height: 20 }} />}
               </View>
            )
         default:
            return (
               <View style={baseStyles.section} key={section.id}>
                  {renderSectionTitle(section.title, template, color, fontSize.sectionHeading)}
                  {realItems.map((item) => (
                     <View key={item.id} style={{ marginBottom: 8 }}>
                        {item.title && (
                           <Text style={{ fontSize: fontSize.itemTitle, fontWeight: 'bold', color: colors.title }}>
                              {item.title}
                           </Text>
                        )}
                        {item.subtitle && (
                           <Text style={{ fontSize: fontSize.itemSubtitle, color: colors.subtitle }}>{item.subtitle}</Text>
                        )}
                        {item.description && (
                           <PDFRichText
                              text={item.description}
                              fontSize={fontSize.itemBody}
                              color="#4b5563"
                              themeColor={color}
                              style={{ marginTop: 2 }}
                           />
                        )}
                     </View>
                  ))}
               </View>
            )
      }
   }

   // =====================================================
   // STANDARD LAYOUT (Harvard, Tech, Minimal, Bold, Neo)
   // =====================================================
   const renderStandardLayout = () => (
      <View style={{ padding: 32 }}>
         {renderHeader()}
         {data.sections.map((section) => renderSectionLocal(section))}
      </View>
   )

   // Get template-specific page styles with proper font family
   const pageStyles = getPageStyles(template)
   const templateFont = getTemplateFont(template)
   const templateBackground = '#fff'

   // Base page style with font family
   const pageStyle: Style = {
      ...pageStyles.page,
   }

   return (
      <Document>
         <Page size="A4" style={pageStyle}>
            {/* Full-page background wrapper for template-specific colors */}
            <View
               style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: templateBackground,
               }}
            />
            <View style={{ fontFamily: templateFont, position: 'relative' }}>{renderStandardLayout()}</View>
         </Page>
      </Document>
   )
}

// Named export for compatibility with PDFViewer
export const ResumePDFDocument: React.FC<{ data: IResumeData }> = ({ data }) => {
   return <ResumePDF data={data} template={data.theme.template} />
}

// Export PDF to blob for download
export const exportToPDF = async (data: IResumeData): Promise<Blob> => {
   const doc = <ResumePDFDocument data={data} />
   const blob = await pdf(doc).toBlob()
   return blob
}

// Download PDF from blob
export const downloadPDF = (blob: Blob, filename = 'resume.pdf'): void => {
   const url = URL.createObjectURL(blob)
   const link = document.createElement('a')
   link.href = url
   link.download = filename
   document.body.appendChild(link)
   link.click()
   document.body.removeChild(link)
   URL.revokeObjectURL(url)
}

export default ResumePDF
