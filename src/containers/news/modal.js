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
      // srcImg = 'http://localhost/project/laravel/mylife-api/'+props.objNewsEdit.photo;
      srcImg = 'http://mylifecompanyapp.amagumolabs.io/api/'+props.objNewsEdit.photo;
      url = props.objNewsEdit.url;
      // str.replace(/\s+/g, '-');
    } else {
      title = 'Add News';
      btn_submit = 'Add';
      click_submit = props.onSubmitAdd;
      url = props.objNewsEdit.name;
    }
    
    return (
      <Modal isOpen={props.showModal} className={'modal-lg'}>
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
                    defaultValue={url} onChange={props.onChangeInput} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="file-input">Image</Label>
              </Col>
              <Col xs="12" md="9">
                {props.objNewsEdit.displayImg ? 
                <img className="imageEditNews" src={srcImg} />
                : null }
                <Input type="file" id="file-input" name="photo" 
                  onChange={props.changeImage} />
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
                  <Label htmlFor="type">Status</Label>
              </Col>
              <Col xs="12" md="6">
                {/* <Input type="select" name="status" id="status" 
                  value={props.objNewsEdit.status}  onChange={props.onChangeInput}>
                    {
                        listStatus.map((status, index) =>
                        <option key={index} value={status}>{status}</option>
                        )
                    }
                </Input> */}
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
            <FormGroup row>
              <Col md="3">
                  <Label htmlFor="hf-name">Content</Label>
              </Col>
              <Col xs="12" md="9">
                  <ReactQuill theme="snow"
                    modules={props.modules}
                    formats={props.formats}
                    id="hf-content" name="content"
                    placeholder="Content....."
                    defaultValue={props.objNewsEdit.content} 
                    onChange={props.onChangeContent} />
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={click_submit} color="primary" >{btn_submit}</Button>{' '}
          <Button onClick={props.closeModal} color="secondary" >Cancel</Button>
        </ModalFooter>
        
      </Modal>
    )
}

export default ModalNews;