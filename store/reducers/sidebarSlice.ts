import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../index'

interface SidebarState {
   visibleSidebar: boolean
   isFullscreen: boolean
   dataSidebar: any
}

const initialState: SidebarState = {
   visibleSidebar: true,
   isFullscreen: false,
   dataSidebar: {},
}

export const sidebarSlice = createSlice({
   name: 'sidebarReducer',
   initialState,
   reducers: {
      setVisibleSidebar: (state, action: PayloadAction<any>) => {
         return {
            ...state,
            visibleSidebar: action.payload,
         }
      },
      setDataSidebar: (state, action: PayloadAction<any>) => {
         return {
            ...state,
            dataSidebar: action.payload,
         }
      },
      setFullscreen: (state) => {
         return {
            ...state,
            isFullscreen: !state.isFullscreen,
         }
      },
      setIsFullscreen: (state, action: PayloadAction<any>) => {
         return {
            ...state,
            isFullscreen: action.payload,
         }
      },
   },
})

export const { setVisibleSidebar, setDataSidebar, setFullscreen, setIsFullscreen } = sidebarSlice.actions
export const selectSidebar = (state: RootState) => state.sidebarReducer
export default sidebarSlice.reducer
