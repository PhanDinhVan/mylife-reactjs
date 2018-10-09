import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


const ModalDeleteUser = (props) => {
    return (
      <Modal isOpen={props.show_ModalDelete} className={'modal-sm'}>
        <ModalHeader >Delete User</ModalHeader>
        <ModalBody>
          <h5 >Are you sure to delete user ?</h5>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={props.deleteUser}  >Yes</Button>{' '}
          <Button color="primary" onClick={props.close_ModalDelete} >No</Button>
        </ModalFooter>
      </Modal>
    )
}

export default ModalDeleteUser;