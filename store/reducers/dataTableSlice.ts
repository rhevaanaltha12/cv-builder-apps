import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../index'

interface DataTableState {
   visibleColumnTable: any
   columnTable: any
   selectedTable: any
   orderedTable: any
   filterFields: any
   /* Manage Column */
   showModalColumn: boolean
   showModalFilter: boolean
   /* Filter Column */
   isLoadingFilter: boolean
   isDisableApplyFilter: boolean
}

const initialState: DataTableState = {
   visibleColumnTable: [],
   columnTable: [],
   selectedTable: [],
   orderedTable: [],
   filterFields: [],
   isLoadingFilter: false,
   isDisableApplyFilter: false,
   showModalColumn: false,
   showModalFilter: false,
}

export const dataTableSlice = createSlice({
   name: 'dataTableReducer',
   initialState,
   reducers: {
      setVisibleColumnTable: (state, action: PayloadAction<any>) => {
         return {
            ...state,
            visibleColumnTable: action.payload,
         }
      },
      setColumnTable: (state, action: PayloadAction<any>) => {
         return {
            ...state,
            columnTable: action.payload,
         }
      },
      setSelectedTable: (state, action: PayloadAction<any>) => {
         return {
            ...state,
            selectedTable: action.payload,
         }
      },
      setOrderedTable: (state, action: PayloadAction<any>) => {
         return {
            ...state,
            orderedTable: action.payload,
         }
      },
      setFilterFields: (state, action: PayloadAction<any>) => {
         return {
            ...state,
            filterFields: action.payload,
         }
      },
      setIsLoadingFilter: (state, action: PayloadAction<any>) => {
         return {
            ...state,
            isLoadingFilter: action.payload,
         }
      },
      setIsDisableApplyFilter: (state, action: PayloadAction<any>) => {
         return {
            ...state,
            isDisableApplyFilter: action.payload,
         }
      },
      setShowModalColumn: (state, action: PayloadAction<any>) => {
         return {
            ...state,
            showModalColumn: action.payload,
         }
      },
      setShowModalFilter: (state, action: PayloadAction<any>) => {
         return {
            ...state,
            showModalFilter: action.payload,
         }
      },
      toggleShowModalColumn: (state) => {
         return {
            ...state,
            showModalColumn: false,
            showModalFilter: false,
         }
      },
   },
})

export const {
   setVisibleColumnTable,
   setSelectedTable,
   setOrderedTable,
   setColumnTable,
   setFilterFields,
   setIsLoadingFilter,
   setIsDisableApplyFilter,
   setShowModalColumn,
   setShowModalFilter,
   toggleShowModalColumn,
} = dataTableSlice.actions
export const selectDataTable = (state: RootState) => state.dataTableReducer
export default dataTableSlice.reducer
