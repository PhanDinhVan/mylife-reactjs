import React, { Component } from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button,Col, Container, Row, Card, CardBody, 
  CardFooter, CardHeader } from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from './auth-actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const listGender = [null, 'male', 'female', 'other'];

class Register extends Component {
  constructor(props) {
    super(props);

    this.registerHandler = this.registerHandler.bind(this);
    this.state = {
      email: false,
      cancelRegister: false,
      objRegister : {
        fullname: '',
        email: '',
        phone: '',
        birthday: '',
        gender: '',
        nationality: '',
        password: '',
        repeatPassword: ''
      }
    };
  }

  registerHandler = async (event, values) => {
    if ( values.password !== values.repeatPassword) {
      toast.error("Confirm password incorrect", {
        position: toast.POSITION.TOP_RIGHT
      });
    } else {
      try {
        await this.props.onRegister(this.state.objRegister);
        // show notification after register success
        toast("Register success !", {
          position: toast.POSITION.TOP_RIGHT
        });
        this.props.history.replace('/login');
      } catch (error) {
        let obj = JSON.parse(error.request.response);
        let email = obj.error.email[0];
        if ( email === "The email has already been taken." ) {
          toast.error("Email is exits!", {
            position: toast.POSITION.TOP_RIGHT
          });
        }
      }
    }
  }
  cancelRegisterOnClick = () => {
    this.setState({
      cancelRegister: true
    })
  }
  onChangeHandler = (event) => {
    const register = {...this.state.objRegister};
    register[event.target.name] = event.target.value;
    this.setState({ objRegister: register });
  }
  render() {
    let redirecPath = null;
    if(this.state.cancelRegister) {
      redirecPath = <Redirect to="/login" />;
    }
    return (
      <div className="app flex-row align-items-center">
        {redirecPath}
        <Container>
          <Row className="justify-content-center">
            <Col sm="8">
              <AvForm onValidSubmit={this.registerHandler}>
                <Card className="mx-4">
                  <CardHeader>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                  </CardHeader>
                  <CardBody className="p-4">
                    <Col sm="6" style={{float: 'left'}}>
                      <AvField name="fullname" label="Full Name" type="text" required 
                              onChange={this.onChangeHandler} />
                      <AvField name="email" label="Email" type="email" required
                              onChange={this.onChangeHandler} />
                      <AvField name="phone" label="Phone" type="text" required 
                              onChange={this.onChangeHandler} />
                    </Col>
                    <Col sm="6" style={{float: 'left'}}>
                      <AvField name="birthday" label="Birthday" type="date" required 
                              onChange={this.onChangeHandler} />
                      <AvField name="nationality" label="Nationality" type="text" required 
                            onChange={this.onChangeHandler} />
                      <AvField type="select" name="gender" label="Gender" required
                              helpMessage="Please select gender"
                              value={this.state.objRegister.gender}
                              onChange={this.onChangeHandler} >
                        {
                          listGender.map((gender, index) =>
                          <option key={index} value={gender}>{gender}</option>
                          )
                        }
                      </AvField>
                      {/* <AvField name="password" label="Password" type="password" required 
                            onChange={this.onChangeHandler} />
                      <AvField name="repeatPassword" label="Repeat Password" type="password" required 
                            onChange={this.onChangeHandler} /> */}
                    </Col>
                  </CardBody>
                  <CardFooter className="p-4">
                    <Row>
                      <Col xs="12" sm="6">
                        <Button onClick={this.cancelRegisterOnClick} color="secondary" block><span>Cancel</span></Button>
                      </Col>
                      <Col xs="12" sm="6">
                        <Button color="primary" block><span>Create Account</span></Button>
                      </Col>
                    </Row>
                  </CardFooter>
                </Card>
              </AvForm>
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
    registerData: state.authState.registerData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRegister: (objRegister) => dispatch(actions.register(objRegister))
  };
};

export default connect(mapStateToProps, mapDispatchToProps) (Register);

