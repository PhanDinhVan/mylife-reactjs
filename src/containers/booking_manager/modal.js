import React from 'react';
import { Col, Input, Label, FormGroup, Button, 
  Modal, ModalBody, ModalFooter, ModalHeader,
  Form, Row } from 'reactstrap';
import  MultiSelectReact  from 'multi-select-react';
import { PulseLoader } from 'react-spinners';


const ModalBookingManager = (props) => {
  let title = '';
  let btn_submit = '';
  let click_submit = '';
  if(props.objUserBooking.id) {
    title = "Edit Booking Manager";
    btn_submit = "Save";
    click_submit = props.onSubmitEdit;
  } else {
    title = "Add Booking Manager";
    btn_submit = "Add";
    click_submit = props.onSubmitAdd;
  }
  if(props.objUserBooking.passDelete === "12345") {
    props.objUserBooking.disableOk = false;
  } else {
    props.objUserBooking.disableOk = true;
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
                    onChange={props.onChangeInput} value={props.objUserBooking.userId} >
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
            <div className='sweet-loading'>
              <PulseLoader
                color={'#20a8d8'} 
                loading={props.load} 
              />
            </div>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="cvv">Restaurants</Label>
                  <MultiSelectReact 
                    options={props.multiSelect}
                    optionClicked={props.optionClick}
                    selectedBadgeClicked={props.selectedBadgeClick}
                    selectedOptionsStyles={props.selectedOptionsStyle}
                    optionsListStyles={props.optionsListStyle}
                    isTextWrap={false} />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup row style={{display: props.showInputPass}}>
              <Col xs="12" md="9">
                  <Input type="password" id="hf-passDelete" name="passDelete"
                    onChange={props.onChangeInput} placeholder="Enter password..." />
              </Col>
              <Col md="3">
                <Button disabled={props.objUserBooking.disableOk} color="success" onClick={props.deleteSubmit} >Ok</Button>
              </Col>
            </FormGroup>
              
          </Form>
        </ModalBody>
        <ModalFooter>
          
          <Col md="6">
            <Button color="danger" style={{display: props.objUserBooking.id ? " " : "none"}} onClick={props.showTextDelete} >Delete</Button>{' '}
          </Col>
          <Col md="6" className="md6-right">
            <Button className="cancel" onClick={props.closeModal} color="secondary" >Cancel</Button>
            <Button onClick={click_submit} color="primary" >{btn_submit}</Button>{' '}
          </Col>
        </ModalFooter>
        
      </Modal>
    )
}

export default ModalBookingManager;