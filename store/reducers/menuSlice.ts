import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../index'

interface IMenuState {}

const initialState: any = []

export const menuSlice = createSlice({
   name: 'menuReducer',
   initialState,
   reducers: {
      setMenu: (state, action: PayloadAction<any>) => {
         return action.payload
      },
      setActive: (state, action: PayloadAction<any>) => {
         const { id, menuLevel, parentId, isSidebarVisible } = action.payload

         if (menuLevel === 1) {
            return state.map((menu: any) => {
               return {
                  ...menu,
                  active: isSidebarVisible && menu.id === id ? !menu.active : false,
                  child: menu.child.map((childMenu: any) => {
                     return {
                        ...childMenu,
                        active: false,
                     }
                  }),
               }
            })

            // return state.map((menu: any) => {
            //    return {
            //       ...menu,
            //       // If the sidebar is not visible, we reset active to false for all menus
            //       active: isSidebarVisible
            //          ? menu.id === id
            //             ? !menu.active
            //             : false
            //          : false,
            //       child: menu.child.map((childMenu: any) => {
            //          return {
            //             ...childMenu,
            //             active: false,
            //          }
            //       }),
            //    }
            // })
         } else if (menuLevel === 2) {
            // return state.map((menu: any) => {
            //    return {
            //       ...menu,
            //       active: parentId === menu.id,
            //       child: menu.child.map((menu2: any) => {
            //          return {
            //             ...menu2,
            //             active: menu2.id === id ? !menu2.active : false,
            //          }
            //       }),
            //    }
            // })

            return state.map((menu: any) => {
               return {
                  ...menu,
                  active: parentId === menu.id && isSidebarVisible, // Parent menu active only when sidebar is visible
                  child: menu.child.map((menu2: any) => {
                     return {
                        ...menu2,
                        active: menu2.id === id ? !menu2.active : false,
                     }
                  }),
               }
            })
         }
      },
   },
})

export const { setMenu, setActive } = menuSlice.actions
export const selectCount = (state: RootState) => state.authReducer
export default menuSlice.reducer
