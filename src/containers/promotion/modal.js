import React from 'react';
import { Col, Input, Label, FormGroup, Button, 
  Modal, ModalBody, ModalFooter, ModalHeader,
  Form } from 'reactstrap';
import { PulseLoader } from 'react-spinners';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const listStatus = [null, 'not_start', 'in_progress', 'completed', 'cancelled'];

const ModalUser = (props) => {
    // let title = '';
    // let text_submit = '';
    // if(props.obj_Pro.id) {
    //   title = 'Edit Promotion';
    //   text_submit = 'Save'
    // }
    return (
      <Modal isOpen={props.show_Modal} className={'modal-primary '}>
        <ModalHeader>Add promotion</ModalHeader>
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
                    <Label htmlFor="hf-name">Url</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input type="text" id="hf-url" name="url" onChange={props.on_Change} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="file-input">File input</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="file" id="file-input" name="image" onChange={props.change_Image} />
                </Col>
              </FormGroup>
              <div className='sweet-loading'>
                <PulseLoader
                  color={'#20a8d8'} 
                  loading={props.load} 
                />
              </div>
              <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-name">Start date</Label>
                </Col>
                <Col xs="12" md="9">
                  <DatePicker
                      selected={props.obj_Pro.startDate}
                      onChange={props.on_ChangeStartDate}
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      id="startDate"
                      name="startDate"
                      className="form-control" />
                </Col>
              </FormGroup>
              <FormGroup row>
              <Col md="3">
                  <Label htmlFor="hf-name">End date</Label>
              </Col>
              <Col xs="12" md="9">
                <DatePicker
                    selected={props.obj_Pro.endDate}
                    onChange={props.on_ChangeEndDate}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    id="endDate"
                    name="endDate"
                    className="form-control" />
              </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                    <Label htmlFor="type">Status</Label>
                </Col>
                <Col xs="12" md="6">
                  <Input type="select" name="status" id="status" onChange={props.on_Change}
                      value={props.obj_Pro.status}>
                      {
                          listStatus.map((status, index) =>
                          <option key={index} value={status}>{status}</option>
                          )
                      }
                  </Input>
                </Col>
              </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={props.on_Submit_Add} >Save</Button>{' '}
          <Button color="secondary" onClick={props.close_Modal} >Cancel</Button>
        </ModalFooter>
      </Modal>
    )
}

export default ModalUser;