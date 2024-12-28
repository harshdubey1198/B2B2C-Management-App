import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';

function TaskEditModal({ isOpen, toggle, updateData, setUpdateData, users, handleUpdateTask }) {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit Task</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for='status'>Status</Label>
            <Input
              type='select'
            //   id='status'
              value={updateData.status}
              onChange={(e) =>
                setUpdateData({ ...updateData, status: e.target.value })
              }
            >
              <option value='pending'>Pending</option>
              <option value='inProgress'>In Progress</option>
              <option value='completed'>Completed</option>
              <option value='failed'>Failed</option>
              <option value='overdue'>Overdue</option>
              <option value='missed'>Missed</option>

            </Input>
          </FormGroup>
          <FormGroup>
            <Label for='assignedTo'>Reassign To</Label>
            <Input
              type='select'
              id='assignedTo'
              value={updateData.assignedTo}
              onChange={(e) =>
                setUpdateData({ ...updateData, assignedTo: e.target.value })
              }
            >
              <option value=''>Select User</option>
              {users.map(user => (
                <option key={user._id} value={user._id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={handleUpdateTask}>
          Update
        </Button>{' '}
        <Button color='secondary' onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default TaskEditModal;
