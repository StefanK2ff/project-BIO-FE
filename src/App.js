import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Library from "./pages/Library";
import MyCollections from "./pages/MyCollections";
import BookDetail from "./pages/BookDetail";

import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";

import "typeface-roboto";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";


class App extends Component {
  render() {
    return (
      <div className="container">
      
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="md">
            {/* <Navbar /> */}

            <Switch>
              <Route exact path="/" component={Home} />

              <AnonRoute exact path="/signup" component={Signup} />
              <AnonRoute exact path="/login" component={Login} />

              {/* <PrivateRoute
                exact
                path="/collections"
                component={MyCollections}
              />
              
              <PrivateRoute exact path="/library" component={Library} />
              <PrivateRoute exact path="/book/:id" component={BookDetail} /> */}
            </Switch>
          </Container>
        </React.Fragment>
      
      </div>
    );
  }
}

export default App;
