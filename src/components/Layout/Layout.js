import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navSuperAdmin from '../../_nav';
import navUserMylife from '../../_nav1';
// routes config
import routes from '../../routes';
import Header from './Header';
import * as actions from '../../containers/auth/auth-actions';
import { connect } from 'react-redux';

class Layout extends Component {
  render() {
    let navigation = '';
    let role = this.props.roleName;
    if (role.roleName === "super admin") {
      navigation = navSuperAdmin;
    } else {
      navigation = navUserMylife;
    }
    return (
      <div className="app">
        <AppHeader fixed>
          <Header />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={navigation} {...this.props} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <Container fluid>
              <Switch>
                {
                  routes.map((route, idx) => {
                    return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                        <route.component {...props} />
                      )} />)
                      : (null);
                  })
                }
                <Redirect from="/" to="/users" />
              </Switch>
            </Container>
          </main>
        </div>
      </div>
    );
  }
}

// export default Layout;
const mapStateToProps = state => {
  return {
    roleName: state.authState.roleName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, password) => dispatch(actions.login(email, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
