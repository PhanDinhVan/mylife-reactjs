import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardHeader, CardBody, CardGroup, Col, Container, Input, 
    InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Redirect } from 'react-router-dom';

import * as actions from './auth-actions';
import background from '../../assets/img/brand/bg-home-1.jpg';
// import BackgroundSlideshow from 'react-background-slideshow';

// import image1 from '../../assets/img/brand/bg-home-1.jpg';
// import image2 from '../../assets/img/brand/bg-home-3.jpg';

class Login extends Component {
  state = {
    // serve
    email: 'philippe.nguyen@amagumolabs.com',
    password: 'gCJ40TQx',
    
    // localhost
    // email: 'vanpd.it@gmail.com',
    // password: 'Ae5FBzFQ',
    register: false
  }
  loginHandler = async () => {
    try {
      await this.props.onLogin(this.state.email, this.state.password);
      this.props.history.replace('/users');
    } catch (err) {
      console.log(err)
    }
  }
  inputChangeHandler = (event) => {
    const updateState = {...this.sate};
    updateState[event.target.name] = event.target.value;
    this.setState(updateState);
  }
  registerOnClick = () => {
    this.setState({
      register: true
    })
  }

  render() {
    let redirectPath = null;
    if(this.state.register) {
      redirectPath = <Redirect to="/register" />;
    }
    return (
      <div className="app flex-row align-items-center" style={{backgroundImage:"url(" + background + ")"}}>
        {redirectPath}
        <Container>
          {/* <BackgroundSlideshow images={[ image1, image2, image3 ]} /> */}
          <Row className="justify-content-center">
            <Col className="form-login" lg="4">
              <CardGroup>
                <Card className="p-4">
                  <CardHeader className="hearder-login">
                    <h1>Login</h1>
                  </CardHeader>
                  <CardBody>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input 
                        type="email" 
                        placeholder="Email" 
                        value={this.state.email} 
                        name="email"
                        onChange={this.inputChangeHandler}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input 
                        type="password" 
                        placeholder="Password" 
                        value={this.state.password} 
                        name="password"
                        onChange={this.inputChangeHandler}
                      />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4" onClick={this.loginHandler}>Login</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">Forgot password?</Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                {/* <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Button onClick={this.registerOnClick} color="primary" className="mt-3" active>Register Now!</Button>
                    </div>
                  </CardBody>
                </Card> */}
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.authState.token,
    userData: state.authState.userData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, password) => dispatch(actions.login(email, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
