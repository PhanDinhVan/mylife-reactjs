import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from './auth-actions'

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
  }
  render() {
    let redirectPath = null;
    if(!this.props.token) {
      redirectPath = <Redirect to="/login"/>;
    }
    return (
      <div>{redirectPath}</div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.userState.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Logout);