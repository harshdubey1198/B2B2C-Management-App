import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';

function TaskDetailModal({ isOpen, toggle, task, loading, onUpdate }) {
  const [newRemark, setNewRemark] = useState('');
  const [updatedStatus, setUpdatedStatus] = useState(task.status || '');

  const handleAddRemark = () => {
    if (!newRemark.trim()) {
      alert('Remark cannot be empty.');
      return;
    }
  
    const authUser = JSON.parse(localStorage.getItem('authUser'));
    const createdBy = authUser?.response?._id;
  
    const remark = {
      message: newRemark,
      createdBy,
    };
  
    const updatedTask = {
      status: updatedStatus,
      dueDate: task.dueDate, 
      remarks: [...task.remarks, remark], 
    };
  
    onUpdate(updatedTask); 
    setNewRemark('');
  };
  

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Task Details</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="taskStatus">Status</Label>
            <select className="form-select" value={updatedStatus} onChange={(e) => setUpdatedStatus(e.target.value)}>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Overdue">Overdue</option>
            </select>
          </FormGroup>

          <FormGroup>
            <Label>Remarks</Label>
            <ul className="list-group">
              {task.remarks.map((remark, index) => (
                <li key={index} className="list-group-item">
                  <p><strong>{remark.message}</strong></p>
                </li>
              ))}
            </ul>
          </FormGroup>

          <FormGroup>
            <Label for="newRemark">Add Remark</Label>
            <Input
              type="textarea"
              id="newRemark"
              value={newRemark}
              onChange={(e) => setNewRemark(e.target.value)}
              placeholder="Add a new remark"
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleAddRemark} disabled={loading}>
          {loading ? 'Updating...' : 'Save'}
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default TaskDetailModal;
