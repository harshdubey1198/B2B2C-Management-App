import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, } from "reactstrap";
import { assignLeadsToEmployee } from "../../apiServices/service";
import { userId } from "../../utils/axiosInstance";
const TaskAssigner = ({ isOpen, toggle, selectedLeads, fetchLeads }) => {
  const [assignedTo, setAssignedTo] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAssign = async () => {
    if (!assignedTo || !dueDate || selectedLeads.length === 0) {
      setMessage("All fields are required");
      return;
    }
    setLoading(true);
    try {
      const taskData = {
        leadIds: selectedLeads,
        assignedTo: [assignedTo],
        assignedBy: userId,
        status: "Pending",
        priority,
        dueDate,
        remarks: [
          {
            message: "Task assigned to employee.",
            createdBy: userId,
          },
        ],
      };
      const response = await assignLeadsToEmployee(taskData);
      setMessage(response.message);
      fetchLeads();
      toggle();
    } catch (error) {
      setMessage(error.message || "Error assigning task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>Assign Leads to Employee</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="assignedTo">Assign to Employee </Label>
            {/* <Input
              type="text"
              name="assignedTo"
              id="assignedTo"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            /> */}
            <Input
              type="select"
              name="assignedTo"
              id="assignedTo"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            >
                <option value="">Select Employee</option>
                <option value="60f6b5b9d1c3c40015a6a3a1">Employee 1</option>
                <option value="60f6b5b9d1c3c40015a6a3a2">Employee 2</option>
                <option value="60f6b5b9d1c3c40015a6a3a3">Employee 3</option>
                <option value="60f6b5b9d1c3c40015a6a3a4">Employee 4</option>
                </Input>
          </FormGroup>
          <FormGroup>
            <Label for="priority">Priority</Label>
            <Input
              type="select"
              name="priority"
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="dueDate">Due Date</Label>
            <Input
              type="date"
              name="dueDate"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </FormGroup>
          {message && <p className="text-danger">{message}</p>}
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleAssign} disabled={loading}>
          {loading ? "Assigning..." : "Assign"}
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default TaskAssigner;
