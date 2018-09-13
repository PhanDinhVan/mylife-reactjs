import React from 'react';
import { Col, Input, Label, FormGroup, Button, 
  Modal, ModalBody, ModalFooter, ModalHeader,
  Form } from 'reactstrap';
// import { PulseLoader } from 'react-spinners';
import { TimePicker } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';


// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

const listType = [null, 'coffee', 'sushi', 'premium'];
const format = 'HH:mm';

const ModalUser = (props) => {
    
    return (
      <Modal isOpen={props.show_Modal} className={'modal-primary '}>
        <ModalHeader>Add Restaurant</ModalHeader>
        <ModalBody>
          <Form action="" method="post" className="form-horizontal">
            <FormGroup row>
              <Col md="3">
                  <Label htmlFor="hf-name">Name</Label>
              </Col>
              <Col xs="12" md="9">
                  <Input type="text" id="hf-name" name="name" onChange={props.on_Change} />
              </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-name">Address</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input type="text" id="hf-address" name="address" onChange={props.on_Change} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-name">Phone</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input type="text" id="hf-phone" name="phone" onChange={props.on_Change} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-type">Type</Label>
                </Col>
                <Col xs="12" md="6">
                  <Input type="select" name="type" id="type" className="capitalize"
                       onChange={props.on_Change}>
                      {
                          listType.map((type, index) =>
                          <option key={index} value={type}>{type}</option>
                          )
                      }
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-type">Mon-Friday</Label>
                </Col>
                <Col xs="12" md="9">
                  <div className="time">
                    <TimePicker onChange={props.on_ChangeTime} 
                      defaultOpenValue={moment('00:00', format)} format={format}
                      placeholder="Start time 1" /> <span> - </span>
                    <TimePicker onChange={props.on_ChangeTime} 
                      defaultOpenValue={moment('00:00', format)} format={format}
                      placeholder="End time 1" />
                  </div>
                  <div>
                    <TimePicker onChange={props.on_ChangeTime} 
                      defaultOpenValue={moment('00:00', format)} format={format}
                      placeholder="Start time 2" /> <span> - </span>
                    <TimePicker onChange={props.on_ChangeTime} 
                      defaultOpenValue={moment('00:00', format)} format={format}
                      placeholder="End time 2" />
                  </div>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-type">Weekend</Label>
                </Col>
                <Col xs="12" md="9">
                  <div className="time">
                    <TimePicker onChange={props.on_ChangeTime} 
                      defaultOpenValue={moment('00:00', format)} format={format}
                      placeholder="Start time 1" /> <span> - </span>
                    <TimePicker onChange={props.on_ChangeTime} 
                      defaultOpenValue={moment('00:00', format)} format={format}
                      placeholder="End time 1" />
                  </div>
                  <div>
                    <TimePicker onChange={props.on_ChangeTime} 
                      defaultOpenValue={moment('00:00', format)} format={format}
                      placeholder="Start time 2" /> <span> - </span>
                    <TimePicker onChange={props.on_ChangeTime} 
                      defaultOpenValue={moment('00:00', format)} format={format}
                      placeholder="End time 2" />
                  </div>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="description">Description</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="textarea" name="description" id="description" rows="5"
                          placeholder="Content..." onChange={props.on_Change} />
                </Col>
              </FormGroup>
              
              {/* <div className='sweet-loading'>
                <PulseLoader
                  color={'#20a8d8'} 
                  loading={props.load} 
                />
              </div> */}
              
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" >Save</Button>{' '}
          <Button color="secondary" onClick={props.close_Modal} >Cancel</Button>
        </ModalFooter>
      </Modal>
    )
}

export default ModalUser;