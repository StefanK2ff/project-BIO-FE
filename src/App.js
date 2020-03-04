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

import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";

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
          <PrivateRoute exact path="/collections/:id" component={MyCollectionsDetail} />
          <PrivateRoute exact path="/library" component={Library} />
          <PrivateRoute exact path="/book/:id" component={BookDetail} />
        </Switch>
      </div>
    );
  }
}

export default App;
