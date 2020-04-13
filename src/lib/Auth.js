//	lib/Auth.js

import React, { Component } from "react";
import authService from "./auth-service"; // IMPORT functions for axios requests to API
import CircularProgress from '@material-ui/core/CircularProgress';
const { Consumer, Provider } = React.createContext();

//HOC to create a Consumer
const withAuth = WrappedComponent => {
  return class extends Component {
    render() {
      return (
        <Consumer>
          {({ login, signup, logout, user, refresh, isLoggedIn }) => {
            return (
              <WrappedComponent
                user={user}
                isLoggedIn={isLoggedIn}
                refresh={refresh}
                login={login}
                signup={signup}
                logout={logout}
                {...this.props}
              />
            );
          }}
        </Consumer>
      );
    }
  };
};


// // HOC - function component example of the same functionality
// function withAuthFunc(WrappedComponent) {
//   return function(props) {
//     // props will belong to the WrappedComponent
//     return (
//       <Consumer>
//         {value => <WrappedComponent {...value} {...props} />}
//       </Consumer>
//     );
//   };
// }


// Provider
class AuthProvider extends React.Component {
  state = {
    isLoggedIn: false,
    user: null,
    isLoading: true
  };

  componentDidMount() {
    
  }

  refresh = (userId) => {
    authService
    .refresh(userId)
    .then(user => {
      this.setState({user})
      return user //
    } )
    .catch(err => console.log(err))
  };

  signup = (email, password) => {
    authService
      .signup({ email, password })
      .then(user => this.setState({ isLoggedIn: true, user }))
      .catch(err => console.log(err));
  };

  login = (email, password) => {
    authService
      .login({ email, password })
      .then(user => this.setState({ isLoggedIn: true, user }))
      .catch(err => console.log(err));
  };

  logout = () => {
    authService
      .logout()
      .then(() => this.setState({ isLoggedIn: false, user: null }))
      .catch(err => console.log(err));
  };

  render() {
    const { isLoading, isLoggedIn, user } = this.state;
    const { login, logout, signup, refresh } = this;

    return (
      <Provider value={{ isLoading, isLoggedIn, user, login, logout, signup, refresh }}>

        {isLoading ? <> <CircularProgress /></> : this.props.children}
      </Provider>
    );

  }
}

export { withAuth, AuthProvider };
//      Consumer ,  Provider
