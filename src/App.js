import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Library from "./pages/Library";
import MyCollections from "./pages/MyCollections";
import MyCollectionsDetail from "./pages/MyCollectionsDetail";
import BookDetail from "./pages/BookDetail";
import "bootstrap/dist/css/bootstrap.min.css";

import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";

import dotenv from "dotenv"

class App extends Component {
  render() {
    return (
      <div className="container">
        <Navbar />

        <Switch>
          <Route exact path="/" component={Home} />

          <AnonRoute exact path="/signup" component={Signup} />
          <AnonRoute exact path="/login" component={Login} />

          <PrivateRoute exact path="/collections" component={MyCollections} />
          <PrivateRoute
            exact
            path="/collections/:id"
            component={MyCollectionsDetail}
          />
          <PrivateRoute exact path="/library" component={Library} />
          <PrivateRoute exact path="/book/:id" component={BookDetail} />
        </Switch>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous"
        />
      </div>
    );
  }
}

export default App;
