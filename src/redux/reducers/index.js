// reducers
import { combineReducers } from "redux";
import { sessionReducer } from "./sessionReducer";
import {userReducer} from "./userReducer"
import {attendanceReducer} from './attendanceReducer'
export const rootReducers = combineReducers({
    sessionReducer,
    userReducer,
    attendanceReducer
})
