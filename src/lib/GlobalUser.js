import { createStore } from "redux";
import authService from "./auth-service"; // IMPORT functions for axios requests to API

//STATE
const state = {
  isLoggedIn: false,
  user: null,
  isLoading: true,
};

//STORE
const store = createStore(globalUser);

//ACTIONS
const isLoggedIn = () => {
  return {
    type: "ISLOGGEDIN",
  };
};

const logIn = () => {
  return {
    type: "LOGIN",
  };
};

const logOut = () => {
  return {
    type: "LOGOUT",
  };
};

const signUp = () => {
  return {
    type: "SIGNUP",
  };
};

const updateDB = () => {
  return {
    type: "UPDATEDB",
  };
};

// REDUCER

const globalUser = (state, action) => {
  switch (action.type) {
    case "ISLOGGEDIN": {
      authService
        .me() //gives back a promise
        .then((user) => {
            state.isLoggedIn = true;
            state.user = user;
            state.isLoading = false;
            return state
        })
        .catch((err) =>{
            state.isLoggedIn = false;
            state.user = null;
            state.isLoading = false;
            return state
        })
        break;
    }
    default: 
  }
};

//DISPATCH

store.dispatch(isLoggedIn())