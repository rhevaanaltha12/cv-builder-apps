import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../index'

const initialState: any = {
   toast: null,
   simpleBarContent: null,
   counter: 1,
   modal: {
      addTemplate: false,
      loadTemplate: false,
      predefinedInt: {
         modalEmailMaster: false,
         detail: false,
      },
      masterData: {
         modalMaster: false,
         modalDetail: false,
      },
      workflow: {
         modalDetail: false,
         main: false,
      },
   },
   visibleSidebar: true,
   visibleDialog: true,
   breadcrumb: [],
   pageTitle: '',
   flagPassword: false,
}

export const appSlice = createSlice({
   name: 'appReducer',
   initialState,
   reducers: {
      setApp: (state, action: PayloadAction<any>) => {
         return { ...state, ...action.payload }
      },
      hideModal: (state, action: PayloadAction<any>) => {
         const { payload } = action

         if (typeof payload === `object`) {
            return {
               ...state,
               modal: {
                  ...state.modal,
                  [payload.module]: {
                     ...state.modal[payload.module],
                     [payload.modal]: false,
                  },
               },
            }
         }

         return {
            ...state,
            modal: {
               ...state.modal,
               [payload]: false,
            },
         }
      },
      showModal: (state, action: PayloadAction<any>) => {
         const { payload } = action
         if (typeof payload === `object`) {
            return {
               ...state,
               modal: {
                  ...state.modal,
                  [payload.module]: {
                     ...state.modal[payload.module],
                     [payload.modal]: true,
                  },
               },
            }
         }

         return {
            ...state,
            modal: {
               ...state.modal,
               [payload]: true,
            },
         }
      },
      count: (state, action: PayloadAction<any>) => {
         state.counter = action.payload
      },
      setVisibleDialog: (state, action: PayloadAction<any>) => {
         state.visibleDialog = action.payload
      },
      setFlagPassword: (state, action: PayloadAction<any>) => {
         return {
            ...state,
            flagPassword: action.payload,
         }
      },
   },
})

export const { setApp, hideModal, count, showModal, setVisibleDialog, setFlagPassword } = appSlice.actions
export const selectApp = (state: RootState) => state.appReducer
export default appSlice.reducer
