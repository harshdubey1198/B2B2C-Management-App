import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const DeleteModal = ({ isOpen, toggle, handleDelete }) => {
return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Delete Lead</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this lead?</p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
)
}

export default DeleteModal