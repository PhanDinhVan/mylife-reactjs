import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


const ModalDeleteBooking = (props) => {
    return (
      <Modal isOpen={props.showModalDelete} className={'modal-sm'}>
        <ModalHeader >Delete Booking</ModalHeader>
        <ModalBody>
          <h5 >Are you sure to delete booking ?</h5>
        </ModalBody>
        <ModalFooter>
          <Button onClick={props.deleteSubmit} color="danger"  >Yes</Button>{' '}
          <Button onClick={props.closeModalDelete} color="primary" >No</Button>
        </ModalFooter>
      </Modal>
    )
}

export default ModalDeleteBooking;