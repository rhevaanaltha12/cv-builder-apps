import FieldSelect from '@/components/Form/FieldSelect'
import { useAppSelector, useAppDispatch } from '@/store/hook'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
// import { ACCENT_COLORS, options } from '../../config/constant'
// import { setTheme } from '@/store/reducers/builder/builder.slice'
// import Container from '../shared/Container'
import { cn } from '@/lib/utils'
import FieldLabel from '@/components/Form/FieldLabel'
import { capitalizeFirstLetter } from '@/lib/method'
import { ACCENT_COLORS, options } from '../../config/constant'
import { setTheme } from '@/store/reducers/builder/builder.slice'
import Container from '../shared/Container'
import PersonalInfo from '../features/PersonalInfo'
import ResumeCategory from '../features/ResumeCategory'
import ATSScoreIndicator from '../shared/ATSScoreIndicator'
// import PersonalInfo from '../features/PersonalInfo'
// import ResumeCategory from '../features/ResumeCategory'

const FormEditor = () => {
   const { theme } = useAppSelector((state) => state.builderReducer)
   const dispatch = useAppDispatch()

   const [tempColor, setTempColor] = useState(theme.color)
   const [previewColor, setPreviewColor] = useState<string | null>(null)
   const colorInputRef = React.useRef<HTMLInputElement>(null)

   const RHF = useForm({
      defaultValues: {
         p_format: 'A4',
         p_text_scale: 'medium',
         p_typ_name: 'lg',
         p_typ_headers: 'md',
         p_typ_body: 'sm',
      },
   })

   const validateTypographyLabel = (label: string) => {
      if (label === 'sm') {
         return 'Small'
      } else if (label === 'md') {
         return 'Medium'
      } else if (label === 'lg') {
         return 'Large'
      } else if (label === 'xl') {
         return 'X-Large'
      }
   }

   return (
      <Container label="Design & Personal Info">
         <div className="mb-6">
            <ATSScoreIndicator />
         </div>
         <FormProvider {...RHF}>
            <div className="py-4">
               <div>Resume Style</div>
            </div>
            <div className="mb-6">
               <div className="text-xs text-gray-500 mb-2">Choose Style</div>
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {options.style.map((t) => {
                     const isSelected = t.value === theme?.template
                     return (
                        <button
                           key={t.value}
                           onClick={() => dispatch(setTheme({ ...theme, template: t.value }))}
                           className={cn(
                              'group',
                              'rounded-xl h-18 flex flex-col items-center justify-center',
                              'transition-all duration-200 cursor-pointer overflow-hidden border',
                              `${t.background}`,
                              isSelected ? `${t.selectedBorder}` : `border-gray-500/10 ${t.hover} hover:shadow-sm`
                           )}
                        >
                           <div className={cn('p-2 bg-white mb-2 rounded-md')}>
                              <t.icon
                                 size={16}
                                 className={cn('text-gray-500', isSelected ? `${t.selectedText}` : `${t.textColor}`)}
                              />
                           </div>
                           <div
                              className={cn(
                                 'text-xs font-semibold text-gray-500',
                                 isSelected ? `${t.selectedText}` : `${t.textColor}`
                              )}
                           >
                              {t.label}
                           </div>
                        </button>
                     )
                  })}
               </div>
            </div>
            <FieldSelect
               name="p_format"
               label="Page Format"
               options={options.pageFormat}
               onChange={(e: any) => {
                  dispatch(setTheme({ ...theme, pageSize: e?.value }))
               }}
               showClear={false}
               search={false}
               placeholder="Select Format"
            />
            <div className="field">
               {/* <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5 block">
                  Accent Color
               </label> */}
               <FieldLabel label="Color" name="p_color" />
               <div className="flex gap-2 flex-wrap items-center">
                  {/* Preset Colors */}
                  {ACCENT_COLORS.map((c) => (
                     <button
                        key={c.color}
                        onClick={() => dispatch(setTheme({ ...theme, color: c.color }))}
                        title={c.name}
                        className={cn(
                           'w-8 h-8 rounded-lg border-2 transition-all duration-200 btn-press',
                           theme.color === c.color
                              ? 'border-foreground scale-110 shadow-md'
                              : 'border-transparent hover:scale-105 hover:shadow-sm'
                        )}
                        style={{ backgroundColor: c.color }}
                     />
                  ))}

                  {/* Recent custom colors */}
                  {theme.recentColors
                     ?.filter((c) => !ACCENT_COLORS.some((ac) => ac.color === c))
                     .slice(0, 5)
                     .map((color) => (
                        <button
                           key={color}
                           onClick={() => dispatch(setTheme({ ...theme, color }))}
                           title="Recent custom color"
                           className={cn(
                              'w-8 h-8 rounded-lg border-2 transition-all duration-200 btn-press',
                              theme.color === color
                                 ? 'border-foreground scale-110 shadow-md'
                                 : 'border-border/50 hover:scale-105 hover:shadow-sm'
                           )}
                           style={{ backgroundColor: color }}
                        />
                     ))}

                  {/* Custom color picker with confirmation */}
                  <div className="relative">
                     {/* Hidden color input */}
                     <input
                        ref={colorInputRef}
                        type="color"
                        value={tempColor}
                        onChange={(e) => {
                           setTempColor(e.target.value)
                           setPreviewColor(e.target.value) // Update live preview
                        }}
                        className="sr-only"
                     />
                  </div>
               </div>
            </div>
            <FieldSelect
               name="p_text_scale"
               label="Text Scale"
               options={options.fontSize.map((item) => {
                  return {
                     label: capitalizeFirstLetter(item),
                     value: item,
                  }
               })}
               search={false}
               onChange={(e: any) => {
                  dispatch(setTheme({ ...theme, fontSize: e?.value }))
               }}
               showClear={false}
               placeholder="Select Text Scale"
            />
         </FormProvider>
         <PersonalInfo />
         <ResumeCategory />
      </Container>
   )
}

export default FormEditor
