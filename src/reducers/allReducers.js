import isLoggedReducer from "./isLogged"
import userReducer from "./userReducer"
import {combineReducers} from "redux";

const allReducers = combineReducers({
    isLogged: isLoggedReducer,
    user: userReducer
});

export default allReducers;