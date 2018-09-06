import React from 'react';
import { Col, Input, Label, FormGroup, Button, 
  Modal, ModalBody, ModalFooter, ModalHeader,
  Form, Row } from 'reactstrap';
import { PulseLoader } from 'react-spinners';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const listStatus = [null, 'active', 'inactive', 'ban'];
const listGender = [null, 'male', 'female', 'other'];

const ModalStaff = (props) => {
  console.log(props)
  let title = '';
  let read_only = '';
  let btn_submit = '';
  let click_submit = '';
  if(props.objStaff.id) {
    title = "Edit Staff";
    read_only = true;
    btn_submit = "Save";
    click_submit = props.onSubmitEdit;
  } else {
    title = "Add Staff";
    read_only = false;
    btn_submit = "Add";
    click_submit = props.onSubmitAdd;
  }
  if(props.objStaff.passDelete === "12345") {
    props.objStaff.disableOk = false;
  } else {
    props.objStaff.disableOk = true;
  }
  return (
    <Modal isOpen={props.showModals} className={'modal-primary'}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <Form action="" method="post" className="form-horizontal">
          <Row>
            <Col xs="12">
              <FormGroup>
                <Label htmlFor="cvv">Name</Label>
                <Input type="text" id="hf-name" name="name" 
                  onChange={props.onChangeInput} defaultValue={props.objStaff.name} />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <FormGroup>
                <Label htmlFor="cvv">Email</Label>
                <Input type="text" id="hf-email" name="email" readOnly={read_only} 
                  onChange={props.onChangeInput} defaultValue={props.objStaff.email} />
              </FormGroup>
            </Col>
          </Row>
            <div className='sweet-loading'>
              <PulseLoader
                color={'#20a8d8'} 
                loading={props.load}  nationality
              />
            </div>
            
            <Row>
              <Col xs="4">
                <FormGroup>
                  <Label htmlFor="cvv">Phone</Label>
                  <Input type="text" name="phone" id="phone" className="capitalize"
                    onChange={props.onChangeInput} defaultValue={props.objStaff.phone} />
                </FormGroup>
              </Col>
              <Col xs="4">
                <FormGroup>
                  <Label htmlFor="cvv">Nationality</Label>
                  <Input type="text" name="nationality" id="nationality" className="capitalize"
                    onChange={props.onChangeInput} defaultValue={props.objStaff.nationality} />
                </FormGroup>
              </Col>
              <Col xs="4">
                <FormGroup>
                  <Label htmlFor="cvv">Gender</Label>
                  <Input type="select" name="gender" id="gender" className="capitalize"
                    onChange={props.onChangeInput} value={props.objStaff.gender}>
                      <option value="0">Select gender</option>
                      {
                          listGender.map((gender, index) =>
                          <option key={index} value={gender} className="capitalize" >{gender}</option>
                          )
                      }
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="4">
                <FormGroup>
                  <Label htmlFor="cvv">Birthday</Label>
                  <DatePicker
                    selected={props.objStaff.birthday}
                    onChange={props.onChangeBirthday}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    id="startDate"
                    name="startDate"
                    className="form-control" />
                </FormGroup>
              </Col>
              <Col xs="4">
                <FormGroup>
                  <Label htmlFor="cvv">Status</Label>
                  <Input type="select" name="status" id="status" className="capitalize"
                    onChange={props.onChangeInput} value={props.objStaff.status}>
                    <option value="0">Select status</option>
                    {
                        listStatus.map((status, index) =>
                        <option key={index} value={status} className="capitalize" >{status}</option>
                        )
                    }
                  </Input>
                </FormGroup>
              </Col>
              <Col xs="4">
                <FormGroup>
                  <Label htmlFor="cvv">Role</Label>
                  <Input type="select" name="roleId" id="roleId" className="capitalize"
                    onChange={props.onChangeInput} value={props.objStaff.roleId}>
                      <option value="0">Select role</option>
                      {
                        props.roles.map(function (role, index) {
                          if(role.id != 1){
                            return <option key={index} value={role.id} className="capitalize" >{role.name}</option>;        
                          }
                        })
                      }
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="8">
                <FormGroup style={{display: props.showInputPass}}>
                  <Input type="password" id="hf-passDelete" name="passDelete"
                          onChange={props.onChangeInput} placeholder="Enter password..." />
                </FormGroup>
              </Col>
              <Col xs="4">
                <FormGroup style={{display: props.showInputPass}}>
                  <Button disabled={props.objStaff.disableOk} color="success" onClick={props.deleteStaff} >Ok</Button>
                </FormGroup>
              </Col>
            </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Col md="6">
          <Button color="danger" style={{display: props.objStaff.id ? " " : "none"}} onClick={props.showTextDelete}  >Delete</Button>{' '}
        </Col>
        <Col md="6" className="md6-right">
          <Button className="cancel" color="secondary" onClick={props.closeModal} >Cancel</Button>
          <Button color="primary" onClick={click_submit} >{btn_submit}</Button>{' '}
        </Col>
      </ModalFooter>
      
    </Modal>
  )
}

export default ModalStaff;