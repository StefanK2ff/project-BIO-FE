import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
// import { AuthProvider } from "./lib/Auth";

import { Provider } from "react-redux";
import { createStore }  from "redux";
import allReducers from "./reducers/allReducers"

import App from "./App";

const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Router>
    <Provider store={store}>
    {/* <AuthProvider> */}
      <App />
    {/* </AuthProvider> */}
    </Provider>
  </Router>,
  document.getElementById("root")
);
