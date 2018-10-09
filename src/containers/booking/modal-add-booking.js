import React from 'react';
import { Col, Input, Label, FormGroup, Button, 
  Modal, ModalBody, ModalFooter, ModalHeader,
  Form, Row } from 'reactstrap';

import { TimePicker } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const format = 'HH:mm';

const ModalStatus = (props) => {
    return (
      <Modal isOpen={props.showModalAdd} className={'modal-primary '}>
        <ModalHeader>Add booking</ModalHeader>
        <ModalBody>
          <Form action="" method="post" className="form-horizontal">
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label className="statusBooking" htmlFor="cvv">Restaurant</Label>
                  <Input type="select" name="shopId" id="select" onChange={props.onChangeInput}>
                    <option value="test">Please select restaurant</option>
                    {props.listRestaurant ? props.listRestaurant.map(restaurant => {
                      return (
                        <option key={restaurant.id} value={restaurant.shopId}>{restaurant.shop.name} - {restaurant.shop.district} - {restaurant.shop.city}</option>
                      )
                    }): ''}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="6">
                <FormGroup>
                  <Label className="statusBooking" htmlFor="cvv">Date</Label>
                  <DatePicker
                      selected={props.bookingAdd.date}
                      onChange={props.onChangeDate}
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      id="date"
                      name="date"
                      className="form-control center widthaddbooking" />
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label className="statusBooking" htmlFor="cvv">Time</Label>
                  <div className="time">
                    <TimePicker onChange={props.onChangeTime} className="center"
                      defaultValue={moment(props.bookingAdd.time, format)} format={format}
                      placeholder="Time" name="time" />
                  </div>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="6">
                <FormGroup>
                  <Label className="statusBooking" htmlFor="cvv">Seats</Label>
                  <Input onChange={props.onChangeInput} className="center color-booking widthaddbooking" 
                    type="text" name="seats" defaultValue={props.bookingAdd.seats} />
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label className="statusBooking" htmlFor="cvv">Baby seats</Label>
                  <Input onChange={props.onChangeInput} className="center color-booking widthaddbooking" 
                    type="text" name="baby_seats" defaultValue={props.bookingAdd.baby_seats} />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup row>
              <Col md="3">
                <Label className="statusBooking" >Status: </Label>
              </Col>
              <Col md="9" className="col-status">
                <FormGroup check inline>
                  <Input className="form-check-input"
                      type="radio" id="inline-radio1" name="status" 
                      value="waiting" onChange={props.onChangeStatus} />
                  <Label className="form-check-label btn-pill btn btn-secondary btn-block" 
                    check htmlFor="inline-radio1"
                    style={{backgroundColor: props.bookingAdd.status==="waiting" ? "#ffc107" : "",
                        borderColor: props.bookingAdd.status==="waiting" ? "#ffc107" : "",
                        color: props.bookingAdd.status==="waiting" ? "#fff" : "",}}
                      > Waiting
                  </Label>
                </FormGroup>
                <FormGroup check inline>
                  <Input className="form-check-input" 
                      type="radio" id="inline-radio2" name="status" 
                      value="confirmed" onChange={props.onChangeStatus} />
                  <Label className="form-check-label btn-pill btn btn-secondary btn-block" 
                      check htmlFor="inline-radio2"
                      style={{backgroundColor: props.bookingAdd.status==="confirmed" ? "#4dbd74" : "",
                        borderColor: props.bookingAdd.status==="confirmed" ? "#4dbd74" : "",
                        color: props.bookingAdd.status==="confirmed" ? "#fff" : "",}}
                      > Confirm</Label>
                </FormGroup>
                <FormGroup check inline>
                  <Input className="form-check-input"  
                      type="radio" id="inline-radio3" name="status" 
                      value="cancelled" onChange={props.onChangeStatus} />
                  <Label className="form-check-label btn-pill btn btn-secondary btn-block" 
                      check htmlFor="inline-radio3"
                      style={{backgroundColor: props.bookingAdd.status==="cancelled" ? "#f86c6b" : "",
                        borderColor: props.bookingAdd.status==="cancelled" ? "#f86c6b" : "",
                        color: props.bookingAdd.status==="cancelled" ? "#fff" : "",}}
                    > Cancel</Label>
                </FormGroup>
                <FormGroup check inline className="suggest">
                  <Input className="form-check-input"
                      type="radio" id="inline-radio4" name="status" 
                      value="suggest" onChange={props.onChangeStatus} />
                  <Label className="form-check-label btn-pill btn btn-secondary btn-block" 
                      check htmlFor="inline-radio4"
                      style={{backgroundColor: props.bookingAdd.status==="suggest" ? "#1985ac" : "",
                        borderColor: props.bookingAdd.status==="suggest" ? "#187da0" : "",
                        color: props.bookingAdd.status==="suggest" ? "#fff" : "",}}
                    > Suggestion another time</Label>
                </FormGroup>
              </Col>
            </FormGroup>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label className="statusBooking" htmlFor="cvv">Comment: </Label>
                  <Input type="textarea" name="comments" id="comments" rows="3"
                      placeholder="Content..." onChange={props.onChangeInput} />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={props.closeModalAdd} color="secondary" >Cancel</Button>
          <Button onClick={props.submitAdd} color="primary" >Add</Button>{' '}
        </ModalFooter>
        
      </Modal>
    )
}

export default ModalStatus;