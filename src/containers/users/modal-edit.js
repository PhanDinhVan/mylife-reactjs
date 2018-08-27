import React from 'react';
import { Col, Input, Label, FormGroup, Button, 
  Modal, ModalBody, ModalFooter, ModalHeader,
  Form } from 'reactstrap';
import { PulseLoader } from 'react-spinners';

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
    return (
      <Modal isOpen={props.showModals} className={'modal-primary '}>
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
                <Input type="select" name="gender" id="gender" 
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
                    <Label>Role</Label>
                  </Col>
                  <Col md="9">
                    <FormGroup check inline>
                      <Input className="form-check-input" defaultChecked={props.obj_Modal.roleId===2} 
                          type="radio" id="inline-radio1" name="roleId" 
                          value={2} onChange={props.on_Change} />
                      <Label className="form-check-label" check htmlFor="inline-radio1">Admin</Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input className="form-check-input" defaultChecked={props.obj_Modal.roleId===1} 
                          type="radio" id="inline-radio2" name="roleId" 
                          value={1} onChange={props.on_Change} />
                      <Label className="form-check-label" check htmlFor="inline-radio2">User</Label>
                    </FormGroup>
                  </Col>
                </FormGroup>
              <FormGroup row>
              <Col md="3">
                  <Label htmlFor="hf-birthday">Birthday</Label>
              </Col>
              <Col xs="12" md="9">
                  <Input type="text" id="hf-birthday" name="birthday" 
                      defaultValue={props.obj_Modal.birthday} onChange={props.on_Change} />
              </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                    <Label htmlFor="type">Status</Label>
                </Col>
                <Col xs="12" md="6">
                  <Input type="select" name="status" id="status" 
                      value={props.obj_Modal.status} onChange={props.on_Change}>
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
          <Button color="primary" onClick={click_submit} >{btn_submit}</Button>{' '}
          <Button color="secondary" onClick={props.close_Modal} >Cancel</Button>
        </ModalFooter>
        
      </Modal>
    )
}

export default ModalUser;