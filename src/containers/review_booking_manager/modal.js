import React from 'react';
import { Col, Input, Label, FormGroup, Button, 
  Modal, ModalBody, ModalFooter, ModalHeader,
  Form, Row } from 'reactstrap';
  import  MultiSelectReact  from 'multi-select-react';


const ModalReviewManager = (props) => {
  let title = '';
  let btn_submit = '';
  let click_submit = '';
  if(props.reviewManager.id) {
    title = "Edit Review Permissions";
    btn_submit = "Save";
    click_submit = props.onSubmitEdit;
  } else {
    title = "Add Review Permissions";
    btn_submit = "Add";
    click_submit = props.onSubmitAdd;
  }
  if(props.reviewManager.passDelete === "12345") {
    props.reviewManager.disableOk = false;
  } else {
    props.reviewManager.disableOk = true;
  }
    return (
      <Modal isOpen={props.showModal} className={'modal-primary '}>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <Form action="" method="post" className="form-horizontal">
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="cvv">User name</Label>
                  <Input type="select" name="userId" id="userId" className="capitalize"
                    onChange={props.onChangeInput} value={props.reviewManager.userId} >
                      <option value="0">Select user</option>
                      <option value="0"></option>
                      {
                        props.userBookings.map((user, index) =>
                        <option key={index} value={user.id} className="capitalize" >{user.username}</option>
                        )
                      }
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="cvv">Restaurant</Label>
                  <Input type="select" name="shopId" id="shopId" className="capitalize"
                    onChange={props.onChangeInput} value={props.reviewManager.shopId} >
                      <option value="0">Select restaurant</option>
                      <option value="0"></option>
                      {
                        props.restaurants.map((restaurant, index) =>
                          <option key={index} value={restaurant.id} className="capitalize" >
                            {restaurant.name + " - " + restaurant.district + " - " + restaurant.city}
                          </option>
                        )
                      }
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <FormGroup row style={{display: props.showInputPass}}>
              <Col xs="12" md="9">
                  <Input type="password" id="hf-passDelete" name="passDelete"
                    onChange={props.onChangeInput} placeholder="Enter password..." />
              </Col>
              <Col md="3">
                <Button disabled={props.reviewManager.disableOk} color="success" onClick={props.deleteReviewPermission} >Ok</Button>
              </Col>
            </FormGroup>
              
          </Form>
        </ModalBody>
        <ModalFooter>
          <Col md="6">
            <Button color="danger" style={{display: props.reviewManager.id ? " " : "none"}} onClick={props.showTextDelete} >Delete</Button>{' '}
          </Col>
          <Col md="6" className="md6-right">
            <Button style={{marginRight: "5px"}} onClick={click_submit} color="primary" >{btn_submit}</Button>{' '}
            <Button onClick={props.closeModal} color="secondary" >Cancel</Button>
          </Col>
        </ModalFooter>
        
      </Modal>
    )
}

export default ModalReviewManager;