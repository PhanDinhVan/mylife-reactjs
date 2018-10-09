import React from 'react';
import { Col, Input, Label, FormGroup, Button, 
  Modal, ModalBody, ModalFooter, ModalHeader,
  Form } from 'reactstrap';
import { PulseLoader } from 'react-spinners';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const listStatus = [null, 'active', 'inactive', 'ban'];
const listGender = [null, 'male', 'female', 'other'];

const ModalUser = (props) => {
    let title = '';
    let read_only = '';
    let btn_submit = '';
    let click_submit = '';
    if(props.obj_Modal.id) {
      title = "Edit User";
      read_only = true;
      btn_submit = "Save";
      click_submit = props.on_Submit;
    } else {
      title = "Add User";
      read_only = false;
      btn_submit = "Add";
      click_submit = props.on_Submit_Add;
    }
    if(props.obj_Modal.passDelete === "12345") {
      props.obj_Modal.disableOk = false;
    } else {
      props.obj_Modal.disableOk = true;
    }
    return (
      <Modal isOpen={props.showModals} className={'modal-primary'}>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <Form action="" method="post" className="form-horizontal">
            <FormGroup row>
              <Col md="3">
                  <Label htmlFor="hf-name">Name</Label>
              </Col>
              <Col xs="12" md="9">
                  <Input type="text" id="hf-name" name="name" 
                    defaultValue={props.obj_Modal.name} onChange={props.on_Change} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                  <Label htmlFor="hf-email">Email</Label>
              </Col>
              <Col xs="12" md="9">
                  <Input type="text" id="hf-email" name="email" readOnly={read_only} 
                    defaultValue={props.obj_Modal.email} onChange={props.on_Change} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                  <Label htmlFor="hf-phone">Phone</Label>
              </Col>
              <Col xs="12" md="6">
                  <Input type="text" id="hf-phone" name="phone"
                    defaultValue={props.obj_Modal.phone} onChange={props.on_Change} />
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
                  <Label htmlFor="hf-gender">Gender</Label>
              </Col>
              <Col xs="12" md="6">
                <Input type="select" name="gender" id="gender" className="capitalize"
                  value={props.obj_Modal.gender} onChange={props.on_Change}>
                    {
                        listGender.map((gender, index) =>
                        <option key={index} value={gender}>{gender}</option>
                        )
                    }
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                  <Label htmlFor="hf-birthday">Birthday</Label>
              </Col>
              <Col xs="12" md="9">
                  <DatePicker
                    selected={props.obj_Modal.birthday}
                    onChange={props.changeBirthday}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    id="birthday"
                    name="birthday"
                    className="form-control" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                  <Label htmlFor="type">Status</Label>
              </Col>
              <Col xs="12" md="6">
                <Input type="select" name="status" id="status" className="capitalize"
                    value={props.obj_Modal.status} onChange={props.on_Change}>
                    {
                        listStatus.map((status, index) =>
                        <option key={index} value={status}>{status}</option>
                        )
                    }
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row style={{display: props.showInputPass}}>
              <Col md="3">
                  <Label htmlFor="hf-passDelete"></Label>
              </Col>
              <Col xs="12" md="6">
                  <Input type="password" id="hf-passDelete" name="passDelete"
                    onChange={props.on_Change} placeholder="Enter password..." />
              </Col>
              <Col md="3">
                <Button disabled={props.obj_Modal.disableOk} color="success" onClick={props.deleteUser} >Ok</Button>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Col md="6">
            <Button color="danger" style={{display: props.obj_Modal.id ? " " : "none"}} onClick={props.showTextDelete}  >Delete</Button>{' '}
          </Col>
          <Col md="6" className="md6-right">
            <Button className="cancel" color="secondary" onClick={props.closeModal} >Cancel</Button>
            <Button color="primary" onClick={click_submit} >{btn_submit}</Button>{' '}
          </Col>
        </ModalFooter>
        
      </Modal>
    )
}

export default ModalUser;