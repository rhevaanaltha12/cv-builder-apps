import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../index'

interface DataTableState {
   activeIndexStep: number
}

const initialState: DataTableState = {
   activeIndexStep: 0,
}

export const stepperSlice = createSlice({
   name: 'stepperReducer',
   initialState,
   reducers: {
      setActiveIndexStep: (state, action: PayloadAction<any>) => {
         return {
            ...state,
            activeIndexStep: action.payload,
         }
      },
   },
})

export const { setActiveIndexStep } = stepperSlice.actions
export const selectDataTable = (state: RootState) => state.stepperReducer
export default stepperSlice.reducer
