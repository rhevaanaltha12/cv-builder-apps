import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../index'
import { Breadcrumb } from 'idcshared/commons/types'

interface AppState {
   fieldQuery: any
   fieldSelected: any
}

const initialState: AppState = {
   fieldQuery: [],
   fieldSelected: [],
}

export const querySlice = createSlice({
   name: 'queryReducer',
   initialState,
   reducers: {
      setApp: (state, action: PayloadAction<any>) => {
         return { ...state, ...action.payload }
      },
      addField: (state, action: PayloadAction<any>) => {
         return {
            ...state,
            fieldQuery: action.payload,
         }
      },
      addSelected: (state, action: PayloadAction<any>) => {
         return {
            ...state,
            fieldSelected: action.payload,
         }
      },
   },
})

export const { setApp, addField, addSelected } = querySlice.actions
export const selectApp = (state: RootState) => state.queryReducer
export default querySlice.reducer
