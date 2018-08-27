import React from 'react';
import { Col, Input, Label, FormGroup, Button, 
  Modal, ModalBody, ModalFooter, ModalHeader,
  Form } from 'reactstrap';

const ModalStatus = (props) => {
    return (
      <Modal isOpen={props.showModal} className={'modal-primary '}>
        <ModalHeader>Edit status</ModalHeader>
        <ModalBody>
          <Form action="" method="post" className="form-horizontal">
            <FormGroup row>
                <Col md="3">
                  <Label className="statusBooking" >Status: </Label>
                </Col>
                <Col md="9">
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
                        > Confirmed</Label>
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
                      > Cancelled</Label>
                  </FormGroup>
                </Col>
              </FormGroup>
            
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={props.onSubmit} color="primary" >Save</Button>{' '}
          <Button onClick={props.closeModal} color="secondary" >Cancel</Button>
        </ModalFooter>
        
      </Modal>
    )
}

export default ModalStatus;