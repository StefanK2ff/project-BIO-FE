import authService from "./../lib/auth-service"; // IMPORT functions for axios requests to API

const isLoggedReducer = (state = null, action) => {
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
            return state
      }
}

export default isLoggedReducer;