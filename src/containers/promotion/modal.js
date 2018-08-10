import React from 'react';
import { Col, Input, Label, FormGroup, Button, 
  Modal, ModalBody, ModalFooter, ModalHeader,
  Form } from 'reactstrap';


const ModalUser = (props) => {
  
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
                  <Input type="text" id="hf-name" name="hf-name" />
              </Col>
              </FormGroup>
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