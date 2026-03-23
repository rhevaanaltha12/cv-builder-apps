import { combineReducers } from 'redux'
import authReducer from './reducers/authSlice'
import appReducer from './reducers/appSlice'
import menuReducer from './reducers/menuSlice'
import sidebarReducer from './reducers/sidebarSlice'
import dataTableReducer from './reducers/dataTableSlice'
import stepperReducer from './reducers/stepperSlice'
import queryReducer from './reducers/querySlice'
import builderReducer from './reducers/builder/builder.slice'

const rootReducer = combineReducers({
   appReducer,
   authReducer,
   menuReducer,
   sidebarReducer,
   dataTableReducer,
   stepperReducer,
   queryReducer,
   builderReducer,
})

export default rootReducer
