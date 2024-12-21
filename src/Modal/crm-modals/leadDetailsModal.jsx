import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

function LeadDetailsModal({ isOpen, toggle, lead, loading, onUpdate }) {
    const [formData, setFormData] = useState(lead || {});
    const [mode, setMode] = useState("view");
  
    React.useEffect(() => {
      setFormData(lead || {});
      setMode(lead?.mode || "view"); // Set mode from lead prop
    }, [lead]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = () => {
      if (mode === "edit") {
        onUpdate(formData);
      }
    };
  
    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {mode === "edit" ? "Edit Lead Details" : "View Lead Details"}
        </ModalHeader>
        <ModalBody>
          {loading ? (
            <div className="text-center">
                    <span className="visually-hidden">Loading...</span>
                </div>
          ) : (
            <Form>
              <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={formData.firstName || ""}
                  onChange={handleChange}
                  readOnly={mode === "view"}
                />
              </FormGroup>
              <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={formData.lastName || ""}
                  onChange={handleChange}
                  readOnly={mode === "view"}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  readOnly={mode === "view"}
                />
              </FormGroup>
              <FormGroup>
                <Label for="phoneNumber">Phone</Label>
                <Input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={formData.phoneNumber || ""}
                  onChange={handleChange}
                  readOnly={mode === "view"}
                />
              </FormGroup>
              <FormGroup>
                <Label for="platform">Platform</Label>
                <Input
                  type="text"
                  name="platform"
                  id="platform"
                  value={formData.platform || ""}
                  onChange={handleChange}
                  readOnly={mode === "view"}
                />
              </FormGroup>
              <FormGroup>
                <Label for="status">Status</Label>
                <Input
                  type="select"
                  name="status"
                  id="status"
                  value={formData.status || ""}
                  onChange={handleChange}
                  disabled={mode === "view"}
                >
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="closed">Closed</option>
                </Input>
              </FormGroup>  
            </Form>
          )}
        </ModalBody>
        <ModalFooter>
          {mode === "edit" && (
            <Button color="primary" onClick={handleSubmit} disabled={loading}>
              Save
            </Button>
          )}
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
  
  export default LeadDetailsModal;
  