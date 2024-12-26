import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Col,
} from "reactstrap";

function LeadDetailsModal({ isOpen, toggle, lead, loading, onUpdate }) {
  const [formData, setFormData] = useState(lead || {});
  const [mode, setMode] = useState("view");

  React.useEffect(() => {
    setFormData(lead || {});
    setMode(lead?.mode || "view");
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
            <Row>
                {Object.entries(formData)
                  .filter(([_, value]) => value !== null)  
                  .map(([key, value]) => (
                    <Col xs="12" md="6" key={key}>
                      <FormGroup>
                        <Label for={key}>
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </Label>
                        <Input
                          type={key.toLowerCase().includes("email") ? "email" : "text"}
                          name={key}
                          id={key}
                          value={value || ""}
                          onChange={handleChange}
                          readOnly={mode === "view"}
                        />
                      </FormGroup>
                    </Col>
                  ))}
              </Row>

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
