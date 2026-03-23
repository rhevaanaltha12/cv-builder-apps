import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../index'
import { IFontSize, IPersonalInfo, ISection, ITemplate, ITheme } from '@/features/builder/config/interfaces'
import { createSectionItem, DEFAULT_SECTION_FONT_SIZE, DEFAULT_TYPOGRAPHY } from '@/features/builder/config/constant'
// import { IFontSize, IResumeData } from '@/features/builder/config/interfaces'
// import { createSectionItem, DEFAULT_SECTION_FONT_SIZE, DEFAULT_TYPOGRAPHY } from '@/features/builder/config/constant'

interface IState {
   loading: boolean
   error: any | { type: string; message: string } // null -> any
   notification: any
   theme: ITheme
   template: ITemplate
   globalFontSize: IFontSize
   sections: ISection[]
   personalInfo: IPersonalInfo
}

const initialState: IState = {
   notification: null,
   loading: false,
   error: null,
   theme: {
      template: 'tech',
      color: '#2563eb',
      fontSize: 'medium',
      pageSize: 'A4',
      typography: { ...DEFAULT_TYPOGRAPHY },
   },
   template: {
      isHarvard: false,
      isTech: false,
      isMinimal: false,
   },
   globalFontSize: {
      name: 0,
      summary: 0,
      tagline: 0,
      sectionHeading: 0,
      itemTitle: 0,
      itemSubtitle: 0,
      itemBody: 0,
      itemDate: 0,
   },
   sections: [
      {
         id: 'experience-default',
         type: 'experience',
         title: 'Experience',
         isVisible: true,
         items: [],
         fontSize: { ...DEFAULT_SECTION_FONT_SIZE },
      },
      {
         id: 'education-default',
         type: 'education',
         title: 'Education',
         isVisible: true,
         items: [],
         fontSize: { ...DEFAULT_SECTION_FONT_SIZE },
      },
      {
         id: 'skills-default',
         type: 'skills',
         title: 'Skills',
         isVisible: true,
         items: [{ id: 'skills-item-default', skills: [] }],
         fontSize: { ...DEFAULT_SECTION_FONT_SIZE },
      },
   ],
   personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
      tagline: [],
      website: '',
      linkedin: '',
      github: '',
      links: [],
   },
}

export const builderSlice = createSlice({
   name: 'builderReducer',
   initialState,
   reducers: {
      setBuilder: (state, action: PayloadAction<any>) => {
         return {
            ...state,
            ...action.payload,
         }
      },
      setTemplate: (state, action: PayloadAction<any>) => {
         state.template = action.payload
      },
      setTheme: (state, action: PayloadAction<any>) => {
         state.theme = action.payload
      },
      setGlobalFontSize: (state, action: PayloadAction<any>) => {
         state.globalFontSize = action.payload
      },
      setSection: (state, action: PayloadAction<any>) => {
         state.sections = action.payload
      },
      setPersonalInfo: (state, action: PayloadAction<any>) => {
         state.personalInfo = action.payload
      },
      addNewSection: (state, action: PayloadAction<any>) => {
         const section = state.sections.find((s) => s.id === action.payload)

         const newSections = state.sections.map((item) => {
            if (item?.id === action.payload) {
               return { ...item, items: [...item.items, createSectionItem(item.type)] }
            }
            return item
         })
         state.sections = newSections
      },
      removeSectionItem: (state, action: PayloadAction<any>) => {
         const { sectionId, itemId } = action.payload

         const newSections = state.sections.map((item) => {
            if (item?.id === sectionId) {
               return { ...item, items: item?.items?.filter((v: any) => v?.id !== itemId) }
            }
            return item
         })
         state.sections = newSections
      },
      resetBuilder: (state, action: PayloadAction<any>) => {
         state.theme = {
            template: 'tech',
            color: '#2563eb',
            fontSize: 'medium',
            pageSize: 'A4',
            typography: { ...DEFAULT_TYPOGRAPHY },
         }
         state.template = {
            isHarvard: false,
            isTech: false,
            isMinimal: false,
         }
         state.globalFontSize = {
            name: 0,
            summary: 0,
            tagline: 0,
            sectionHeading: 0,
            itemTitle: 0,
            itemSubtitle: 0,
            itemBody: 0,
            itemDate: 0,
         }
         state.sections = [
            {
               id: 'experience-default',
               type: 'experience',
               title: 'Experience',
               isVisible: true,
               items: [],
               fontSize: { ...DEFAULT_SECTION_FONT_SIZE },
            },
            {
               id: 'education-default',
               type: 'education',
               title: 'Education',
               isVisible: true,
               items: [],
               fontSize: { ...DEFAULT_SECTION_FONT_SIZE },
            },
            {
               id: 'skills-default',
               type: 'skills',
               title: 'Skills',
               isVisible: true,
               items: [{ id: 'skills-item-default', skills: [] }],
               fontSize: { ...DEFAULT_SECTION_FONT_SIZE },
            },
         ]
         state.personalInfo = {
            fullName: '',
            email: '',
            phone: '',
            location: '',
            summary: '',
            tagline: [],
            website: '',
            linkedin: '',
            github: '',
            links: [],
         }
      },
   },

   //    extraReducers: (builder) => {
   //       builder
   //          /* Get Main Data */
   //          .addCase(getAnalyzeResume.pending, (state) => {
   //             state.loading = true
   //          })
   //          .addCase(getAnalyzeResume.fulfilled, (state, action) => {
   //             state.loading = false
   //             state.resume = action.payload
   //          })
   //          .addCase(getAnalyzeResume.rejected, (state, action) => {
   //             state.loading = false
   //          })
   //    },
})

export const {
   setBuilder,
   setTemplate,
   setGlobalFontSize,
   setSection,
   setTheme,
   setPersonalInfo,
   addNewSection,
   removeSectionItem,
   resetBuilder,
   // setBuilderData,
   // setTemplateState,
   // setFontSize,
   // setTheme,
   // setPersonalInfo,
   // setSection,
   // addNewSection,
   // removeSection,
} = builderSlice.actions
export const selectResume = (state: RootState) => state.builderReducer
export default builderSlice.reducer
