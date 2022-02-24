// reducers
import { combineReducers } from "redux";
import { sessionReducer } from "./sessionReducer";
import {userReducer} from "./userReducer"

export const rootReducers = combineReducers({
    sessionReducer,
    userReducer
})
