import React from 'react';
import { Col, Input, Label, FormGroup, Button, 
  Modal, ModalBody, ModalFooter, ModalHeader,
  Form } from 'reactstrap';
import { PulseLoader } from 'react-spinners'; 

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// const listStatus = [null, 'publish', 'completed', 'cancelled'];


const ModalNews = (props) => {
    let title = '';
    let btn_submit = '';
    let click_submit = '';
    let srcImg = '';
    let url = '';
    if(props.objNewsEdit.id) {
      title = 'Edit News';
      btn_submit = 'Save';
      click_submit = props.onSubmitEdit;
      url = props.objNewsEdit.url;
    } else {
      title = 'Add News';
      btn_submit = 'Add';
      click_submit = props.onSubmitAdd;
      url = props.objNewsEdit.name;
    }
    if(props.objNewsEdit.passDelete === "12345") {
      props.objNewsEdit.disableOk = false;
    } else {
      props.objNewsEdit.disableOk = true;
    }
    
    return (
      <Modal isOpen={props.showModal} className={'modal-primary'}>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <Form action="" method="post" className="form-horizontal">
            <FormGroup row>
              <Col md="3">
                  <Label htmlFor="hf-name">Title</Label>
              </Col>
              <Col xs="12" md="9">
                  <Input type="text" id="hf-name" name="name" 
                    defaultValue={props.objNewsEdit.name} onChange={props.onChangeInput} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                  <Label htmlFor="hf-name">Url</Label>
              </Col>
              <Col xs="12" md="9">
                  <Input type="text" id="hf-url" name="url" 
                    defaultValue={props.objNewsEdit.url} onChange={props.onChangeInput} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                  <Label htmlFor="hf-name">Image</Label>
              </Col>
              <Col xs="12" md="9">
                  <Input type="text" id="hf-image" name="photo" 
                    defaultValue={props.objNewsEdit.photo} onChange={props.onChangeInput} />
              </Col>
              {/* <Col md="3">
                <Label htmlFor="file-input">Image</Label>
              </Col>
              <Col xs="12" md="9">
                {props.objNewsEdit.displayImg ? 
                <img className="imageEditNews" src={srcImg} />
                : null }
                <Input type="file" id="file-input" name="photo" 
                  onChange={props.changeImage} />
              </Col> */}
            </FormGroup>
            <div className='sweet-loading'>
              <PulseLoader
                color={'#20a8d8'} 
                loading={props.load} 
              />
            </div>
            <FormGroup row>
              <Col md="3">
                  <Label htmlFor="type">Status</Label>
              </Col>
              <Col md="9" xs="12">
                <FormGroup check inline>
                    <Input className="form-check-input" defaultChecked={props.objNewsEdit.status==="publish"} 
                        type="radio" id="inline-radio1" name="status" 
                        value="publish" onChange={props.onChangeInput} />
                    <Label className="form-check-label btn-pill btn btn-secondary btn-sm" 
                      check htmlFor="inline-radio1"
                      style={{backgroundColor: props.objNewsEdit.status==="publish" ? "#4dbd74" : "",
                          borderColor: props.objNewsEdit.status==="publish" ? "#4dbd74" : "",
                          color: props.objNewsEdit.status==="publish" ? "#fff" : "",}}
                       > Publish
                    </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input className="form-check-input" defaultChecked={props.objNewsEdit.status==="completed"} 
                        type="radio" id="inline-radio2" name="status" 
                        value="completed" onChange={props.onChangeInput} />
                    <Label className="form-check-label btn-pill btn btn-secondary btn-sm" 
                        check htmlFor="inline-radio2"
                        style={{backgroundColor: props.objNewsEdit.status==="completed" ? "#43b6d7" : "",
                          borderColor: props.objNewsEdit.status==="completed" ? "#39b2d5" : "",
                          color: props.objNewsEdit.status==="completed" ? "#fff" : "",}}
                        > Completed</Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input className="form-check-input" defaultChecked={props.objNewsEdit.status==="cancelled"} 
                        type="radio" id="inline-radio3" name="status" 
                        value="cancelled" onChange={props.onChangeInput} />
                    <Label className="form-check-label btn-pill btn btn-secondary btn-sm" 
                        check htmlFor="inline-radio3"
                        style={{backgroundColor: props.objNewsEdit.status==="cancelled" ? "#f86c6b" : "",
                          borderColor: props.objNewsEdit.status==="cancelled" ? "#f86c6b" : "",
                          color: props.objNewsEdit.status==="cancelled" ? "#fff" : "",}}
                      > Cancelled</Label>
                  </FormGroup>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                  <Label htmlFor="hf-name">Published date</Label>
              </Col>
              <Col xs="12" md="9">
                <DatePicker
                    selected={props.objNewsEdit.publishedDate}
                    onChange={props.onChangePublishedDate}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    id="publishedDate"
                    name="publishedDate"
                    className="form-control" />
                </Col>
              </FormGroup>
                <FormGroup row style={{display: props.showInputPass}}>
                <Col md="3">
                    <Label htmlFor="hf-passDelete"></Label>
                </Col>
                <Col xs="12" md="6">
                    <Input type="password" id="hf-passDelete" name="passDelete"
                      onChange={props.onChangeInput} placeholder="Enter password..." />
                </Col>
                <Col md="3">
                  <Button disabled={props.objNewsEdit.disableOk} color="success" onClick={props.deleteSubmit} >Ok</Button>
                </Col>
              </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Col md="6">
            <Button color="danger" style={{display: props.objNewsEdit.id ? " " : "none"}} onClick={props.showTextDelete}  >Delete</Button>{' '}
          </Col>
          <Col md="6" className="md6-right">
            <Button className="cancel" onClick={props.closeModal} color="secondary" >Cancel</Button>
            <Button onClick={click_submit} color="primary" >{btn_submit}</Button>{' '}
          </Col>
        </ModalFooter>
        
      </Modal>
    )
}

export default ModalNews;