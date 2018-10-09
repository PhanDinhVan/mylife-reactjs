import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter, Route, Switch, withRouter, Redirect } from 'react-router-dom';

import * as actions from './containers/auth/auth-actions';
import Layout from './components/Layout';
import { Login, Logout, Register } from './containers/auth';

import './App.css';
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './scss/style.css'


class App extends Component {
  async componentDidMount() {
    try {
      await this.props.onCheckAuth(this.props.token, this.props.expiresIn);
    } catch (err) {
      this.props.history.replace("/login");
    }
  }
  render() {
    // console.log(this.props.token)
    // localStorage.setItem('tokenVan', this.props.token);
    let redirectRouter = null;
    if (this.props.token === false) {
      redirectRouter = <Redirect to='/login' />
    }
    let routers = (
      <Switch>
        <Route exact path="/login" name="Login Page" component={Login} />
        <Route exact path="/register" name="Register Page" component={Register} />
        {/* <Route exact path="/404" name="Page 404" component={Page404} />
        <Route exact path="/500" name="Page 500" component={Page500} /> */}
        {/* <Route path="/" name="Home" component={Layout} /> */}
        {redirectRouter}
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routers = (
        <Switch>
          <Route exact path="/logout" name="Login Out" component={Logout} />
          <Route path="/" name="Home" component={Layout} />
        </Switch>
      );
    }
    return (
      <HashRouter>
        {routers}
      </HashRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authState.token,
    token: state.authState.token,
    user: state.authState.userData,
    expiresIn: state.authState.expiresIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuth: (token, expiresIn) => dispatch(actions.checkAuth(token, expiresIn))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
