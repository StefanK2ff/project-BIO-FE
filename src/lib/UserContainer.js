import React from 'react';
import { connect } from 'react-redux';

function UserContainer(WrappedComponent) {
  return function(props) {
      // props will belong to the WrappedComponent
      return (
        <WrappedComponent user={props.user} {...props} />
      )   
  }
}

const mapStateToProps = function(state) {
  return {
    user: state.user,
    isLoggedIn: state.isLoggedIn
  }
}

export default UserContainer;