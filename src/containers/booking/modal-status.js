import React from 'react';
import { Col, Input, Label, FormGroup, Button, 
  Modal, ModalBody, ModalFooter, ModalHeader,
  Form, Row } from 'reactstrap';

import { TimePicker } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';

const format = 'HH:mm';

const ModalStatus = (props) => {
    if(props.booking.passDelete === "12345") {
      props.booking.disableOk = false;
    } else {
      props.booking.disableOk = true;
    }
    return (
      <Modal isOpen={props.showModal} className={'modal-primary '}>
        <ModalHeader>Edit status</ModalHeader>
        <ModalBody>
          <Form action="" method="post" className="form-horizontal">
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label className="statusBooking" htmlFor="cvv">Restaurant</Label>
                  <Input className="color-booking" type="text" defaultValue={props.booking.restaurants} readOnly />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="6">
                <FormGroup>
                  <Label className="statusBooking" htmlFor="cvv">Date</Label>
                  <Input className="center color-booking" type="text" defaultValue={props.booking.date} readOnly />
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label className="statusBooking" htmlFor="cvv">Time</Label>
                  <Input className="center color-booking" type="text" defaultValue={props.booking.time} readOnly />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="6">
                <FormGroup>
                  <Label className="statusBooking" htmlFor="cvv">Seats</Label>
                  <Input className="center color-booking" type="text" defaultValue={props.booking.seats} readOnly />
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label className="statusBooking" htmlFor="cvv">Baby seats</Label>
                  <Input className="center color-booking" type="text" defaultValue={props.booking.baby_seats} readOnly />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup row>
                <Col md="3">
                  <Label className="statusBooking" >Status: </Label>
                </Col>
                <Col md="9" className="col-status">
                  <FormGroup check inline>
                    <Input className="form-check-input" defaultChecked={props.booking.status==="waiting"} 
                        type="radio" id="inline-radio1" name="status" 
                        value="waiting" onChange={props.onChangeStatus} />
                    <Label className="form-check-label btn-pill btn btn-secondary btn-block" 
                      check htmlFor="inline-radio1"
                      style={{backgroundColor: props.booking.status==="waiting" ? "#ffc107" : "",
                          borderColor: props.booking.status==="waiting" ? "#ffc107" : "",
                          color: props.booking.status==="waiting" ? "#fff" : "",}}
                       > Waiting
                    </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input className="form-check-input" defaultChecked={props.booking.status==="confirmed"} 
                        type="radio" id="inline-radio2" name="status" 
                        value="confirmed" onChange={props.onChangeStatus} />
                    <Label className="form-check-label btn-pill btn btn-secondary btn-block" 
                        check htmlFor="inline-radio2"
                        style={{backgroundColor: props.booking.status==="confirmed" ? "#4dbd74" : "",
                          borderColor: props.booking.status==="confirmed" ? "#4dbd74" : "",
                          color: props.booking.status==="confirmed" ? "#fff" : "",}}
                        > Confirm</Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input className="form-check-input" defaultChecked={props.booking.status==="cancelled"} 
                        type="radio" id="inline-radio3" name="status" 
                        value="cancelled" onChange={props.onChangeStatus} />
                    <Label className="form-check-label btn-pill btn btn-secondary btn-block" 
                        check htmlFor="inline-radio3"
                        style={{backgroundColor: props.booking.status==="cancelled" ? "#f86c6b" : "",
                          borderColor: props.booking.status==="cancelled" ? "#f86c6b" : "",
                          color: props.booking.status==="cancelled" ? "#fff" : "",}}
                      > Cancel</Label>
                  </FormGroup>
                  <FormGroup check inline className="suggest">
                    <Input className="form-check-input" defaultChecked={props.booking.status==="suggest"} 
                        type="radio" id="inline-radio4" name="status" 
                        value="suggest" onChange={props.onChangeStatus} />
                    <Label className="form-check-label btn-pill btn btn-secondary btn-block" 
                        check htmlFor="inline-radio4"
                        style={{backgroundColor: props.booking.status==="suggest" ? "#1985ac" : "",
                          borderColor: props.booking.status==="suggest" ? "#187da0" : "",
                          color: props.booking.status==="suggest" ? "#fff" : "",}}
                      > Suggestion another time</Label>
                  </FormGroup>
                </Col>
              </FormGroup>
              <FormGroup row style={{display: props.booking.status==="suggest" ? '' : 'none'}}>
                <Col md="3">
                  <Label className="statusBooking" >Time: </Label>
                </Col>
                <Col md="9" className="col-status">
                  <div className="time">
                    <TimePicker onChange={props.onChangeTime} className="time_status"
                      defaultValue={moment(props.booking.time, format)} format={format}
                      placeholder="Time" name="time" />
                  </div>
                </Col>
              </FormGroup>
              <FormGroup row style={{display: props.showInputPass}}>
                <Col xs="12" md="9">
                    <Input type="password" id="hf-passDelete" name="passDelete"
                      onChange={props.onChangeStatus} placeholder="Enter password..." />
                </Col>
                <Col md="3">
                  <Button disabled={props.booking.disableOk} color="success" onClick={props.deleteSubmit} >Ok</Button>
                </Col>
              </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Col md="6">
            <Button color="danger" style={{display: props.booking.id ? " " : "none"}} onClick={props.showTextDelete} >Delete</Button>{' '}
          </Col>
          <Col md="6" className="md6-right">
            <Button className="cancel" onClick={props.closeModal} color="secondary" >Cancel</Button>
            <Button onClick={props.onSubmit} color="primary" >Save</Button>{' '}
          </Col>
        </ModalFooter>
        
      </Modal>
    )
}

export default ModalStatus;