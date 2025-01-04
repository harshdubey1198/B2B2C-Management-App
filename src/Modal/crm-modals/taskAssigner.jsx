import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { assignLeadsToEmployee, getCrmUsers } from "../../apiServices/service";
import { userId } from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { getRole} from "../../utils/roleUtils";

const TaskAssigner = ({ isOpen, toggle, selectedLeads, fetchLeads , filteredUsers }) => {
  const [assignedTo, setAssignedTo] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const role = JSON.parse(localStorage.getItem('authUser'))?.response?.role;
  // console.log("Role : ",role);
  const handleAssign = async () => {
    // Validate inputs before proceeding with task assignment
    if (selectedLeads.length === 0) {
      setMessage("No leads selected");
      toast.error("No leads selected");
      return;
    }

    // validate due date must be in future
    const today = new Date();
    const selectedDate = new Date(dueDate);
    if (selectedDate < today) {
      setMessage("Due date must be in future");
      toast.error("Due date must be in future");
      return;
    }


    if (!assignedTo || !dueDate || selectedLeads.length === 0) {
      setMessage("All fields are required");
      toast.error("All fields are required");
      return;
    }


    setLoading(true);
    try {
      const taskData = {
        leadIds: selectedLeads,
        assignedTo: [assignedTo],
        assignedBy: userId,
        status: "pending",
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
      fetchLeads(); // Fetch updated leads
      toast.success(response.message);
      toggle(); // Close modal
      selectedLeads.length = 0; 
    } catch (error) {
      setMessage(error.message || "Error assigning task.");
      toast.error(error.message || "Error assigning task.");
    } finally {
      setLoading(false);
    }
  };

  console.log("filteredUsers : ",filteredUsers);

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>Assign Leads to Employee</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="assignedTo">Assign to Employee</Label>
            <Input
              type="select"
              name="assignedTo"
              id="assignedTo"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            >
              <option value="">Select Employee</option>
              {filteredUsers.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.firstName} {user.lastName} - {user.roleId.roleName}
                </option>
              ))}
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
        </Form>
        {/* {message && toast.error(message)} */}
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
