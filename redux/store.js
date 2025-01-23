import {combineReducers, configureStore} from '@reduxjs/toolkit'
import headerReducer from "./features/headerSlice";

const rootReducer = combineReducers({
    header: headerReducer,
})

const store = configureStore({
    reducer: rootReducer
})

export default store
