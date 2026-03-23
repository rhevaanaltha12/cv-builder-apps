import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../index'

export interface IAuth {
   app: any
   sso: any
   isLogin: boolean
   sessionId: string
   sessionAccess: string
   username: string
   userEmail: string
   allMenu: any[]
   menuLevel: any[]
   urlPath: any[]
   license: any[]
   user: any
}

// const initialState: any = null

const initialState: IAuth = {
   app: {
      baseUrl: '',
      mainUrl: '',
   },
   sso: {
      ssoName: '',
      ssoActivity: '',
   },
   isLogin: false,
   sessionId: '',
   sessionAccess: '',
   username: '',
   userEmail: '',
   allMenu: [],
   menuLevel: [],
   urlPath: [],
   license: [],
   user: null,
}

export const authSlice = createSlice({
   name: 'authReducer',
   initialState,
   reducers: {
      setApp: (state, action: PayloadAction<any>) => {
         return {
            ...state,
            app: {
               ...state.app,
               baseUrl: action.payload.baseUrl,
               mainUrl: action.payload.url,
            },
         }
      },
      setSSO: (state, action: PayloadAction<any>) => {
         return {
            ...state,
            sso: {
               ...state.sso,
               ssoName: action.payload.ssoName,
               ssoActivity: action.payload.ssoActivity,
            },
         }
      },
      setSession: (state, action: PayloadAction<any>) => {
         return {
            ...state,
            sessionId: action.payload.session_id,
            sessionAccess: action.payload.user_token,
            username: action.payload.session_id,
            userEmail: action.payload.user?.data?.[0]?.usremail,
            user: action.payload.user.data[0],
            allMenu: JSON.parse(action.payload.session_all_menu),
            menuLevel: JSON.parse(action.payload.session_menu),
            // urlPath: JSON.parse(action.payload.conf_url_path),
            // license: JSON.parse(action.payload.session_lsc)
         }
      },
      setSessionLocalStorage: (state, action: PayloadAction<any>) => {
         return {
            ...state,
            sessionId: action.payload.session_id,
            // sessionAccess: action.payload.user_token,
            username: action.payload.userloginid,
            userEmail: action.payload.usremail,
            allMenu: action.payload.menu,
            menuLevel: action.payload.sessionMenu,
            // urlPath: JSON.parse(action.payload.conf_url_path),
            // license: JSON.parse(action.payload.session_lsc)
         }
      },
      removeSession: () => {
         return {
            ...initialState,
         }
      },
   },
})

export const { setApp, setSSO, setSession, setSessionLocalStorage, removeSession } = authSlice.actions
export const selectAuth = (state: RootState) => state.authReducer
export default authSlice.reducer
