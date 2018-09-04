import React from 'react';
import { Col, Input, Label, FormGroup, Button, 
  Modal, ModalBody, ModalFooter, ModalHeader,
  Form } from 'reactstrap';
import { PulseLoader } from 'react-spinners';

const ModalRole = (props) => {
    let title = '';
    let btn_submit = '';
    let click_submit = '';
    
    if(props.stateParent.state.role.id) {
      title = "Edit Role";
      btn_submit = "Save";
      click_submit = props.stateParent.handleUpdateRole;
    } else {
      title = "Add role";
      btn_submit = "Add";
      click_submit = props.stateParent.handleAddRole;
    }
    if(props.stateParent.state.role.passDelete === "12345") {
      props.stateParent.state.role.disableOk = false;
    } else {
      props.stateParent.state.role.disableOk = true;
    }
    return (
      <Modal isOpen={props.stateParent.state.showModal} className={'modal-primary '}>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <Form action="" method="post" className="form-horizontal">
            <FormGroup row>
              <Col md="3">
                  <Label htmlFor="hf-name">Name</Label>
              </Col>
              <Col xs="12" md="9">
                  <Input type="text" id="hf-name" name="name" 
                    defaultValue={props.stateParent.state.role.name} onChange={props.stateParent.handleChange} />
              </Col>
            </FormGroup>
            <div className='sweet-loading'>
              <PulseLoader
                color={'#20a8d8'} 
                loading={props.stateParent.state.loading} 
              />
            </div>
            <FormGroup row>
              <Col md="3">
                  <Label htmlFor="hf-description">Description</Label>
              </Col>
              <Col xs="12" md="9">
                  <Input type="textarea" id="hf-description" name="description" rows="3"
                    defaultValue={props.stateParent.state.role.description}  onChange={props.stateParent.handleChange} />
              </Col>
            </FormGroup>
            <FormGroup row style={{display: props.stateParent.state.showInputPass}}>
              <Col md="3">
                  <Label htmlFor="hf-passDelete"></Label>
              </Col>
              <Col xs="12" md="6">
                  <Input type="password" id="hf-passDelete" name="passDelete"
                    onChange={props.stateParent.handleChange} placeholder="Enter password..." />
              </Col>
              <Col md="3">
                <Button disabled={props.stateParent.state.role.disableOk} color="success" onClick={props.stateParent.handleDeleteRole} >Ok</Button>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Col md="6">
            <Button color="danger" style={{display: props.stateParent.state.role.id ? " " : "none"}} onClick={props.stateParent.showTextPasswordDelete }  >Delete</Button>{' '}
          </Col>
          <Col md="6" className="md6-right">
            <Button className="cancel" color="secondary" onClick={props.stateParent.closeModal} >Cancel</Button>
            <Button color="primary" onClick={click_submit}  >{btn_submit}</Button>{' '}
          </Col>
        </ModalFooter>
        
      </Modal>
    )
}

export default ModalRole;