import React from 'react';
import { Col, Input, Label, FormGroup, Button, 
  Modal, ModalBody, ModalFooter, ModalHeader,
  Form, Row } from 'reactstrap';
import 'antd/dist/antd.css';


const ModalReview = (props) => {
  if(props.review.passDelete === "12345") {
    props.review.disableOk = false;
  } else {
    props.review.disableOk = true;
  }
    return (
      <Modal isOpen={props.showModal} className={'modal-primary '}>
        <ModalHeader>Review</ModalHeader>
        <ModalBody>
          <Form action="" method="post" className="form-horizontal">
            <Row>
              <Col xs="6">
                <FormGroup>
                  <Label className="statusBooking" htmlFor="cvv">Name</Label>
                  <Input defaultValue={props.review.name} 
                      type="text" name="name" readOnly />
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label className="statusBooking" htmlFor="cvv">Email</Label>
                  <Input defaultValue={props.review.email}
                      type="text" name="email" readOnly />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="4">
                <FormGroup>
                  <Label className="statusBooking" htmlFor="cvv">Phone</Label>
                  <Input defaultValue={props.review.phone} className="center"
                      type="text" name="phone" readOnly />
                </FormGroup>
              </Col>
              <Col xs="4">
                <FormGroup>
                  <Label className="statusBooking" htmlFor="cvv">Score</Label>
                  <Input defaultValue={props.review.score} className="center"
                      type="text" name="score" readOnly />
                </FormGroup>
              </Col>
              <Col xs="4">
                <FormGroup>
                  <Label className="statusBooking" htmlFor="cvv">Review date</Label>
                  <Input defaultValue={props.review.review_date} className="center"
                      type="text" name="review_date" readOnly />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label className="statusBooking" htmlFor="cvv">Restaurant</Label>
                  <Input defaultValue={props.review.restaurant}
                      type="text" name="restaurant" readOnly />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label className="statusBooking" htmlFor="cvv">Comment</Label>
                  <Input defaultValue={props.review.comment} rows="3"
                      type="textarea" name="comment" readOnly />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup row style={{display: props.showInputPass}}>
              <Col xs="12" md="9">
                  <Input type="password" id="hf-passDelete" name="passDelete"
                    onChange={props.onChangeInput} placeholder="Enter password..." />
              </Col>
              <Col md="3">
                <Button disabled={props.review.disableOk} color="success" onClick={props.deleteReview} >Ok</Button>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          
          <Col md="6">
            <Button color="danger" style={{display: props.review.id ? " " : "none"}} onClick={props.showTextDelete} >Delete</Button>{' '}
          </Col>
          <Col md="6" className="md6-right">
            <Button color="secondary" onClick={props.closeModal} >Cancel</Button>
          </Col>
        </ModalFooter>
      </Modal>
    )
}

export default ModalReview;