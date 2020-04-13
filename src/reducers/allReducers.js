import isLoggedReducer from "./isLogged"
import testReducer from "./testReducer"
import {combineReducers} from "redux";

const allReducers = combineReducers({
    isLogged: isLoggedReducer,
    test: testReducer
});

export default allReducers;