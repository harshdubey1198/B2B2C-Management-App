import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Col } from "reactstrap";

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
  console.log("formData", formData.assignmentHistory);

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
                  .filter(([key]) => key !== "notes")
                  // isOrganic false hide
                  .filter(([key, value]) => key !== "isOrganic" || value === true)
                  .filter(([key]) => key !== "mode" && key !== "_id" && key !== "assignmentHistory" && key !== "createdAt" && key !== "status" && key !== "updatedAt" && key !== "createdBy" && key !== "updatedBy" && key !== "firmId" && key !== "deletedAt" && key !== "deletedBy" && key !== "__v"  && key !== "remarks" && key !== "leadIds" && key !== "assignedTo" && key !== "assignedBy" && key !== "notes" && key !=="dueDate")
                  .filter(([_, value]) => value !== null)  
                  .map(([key, value]) => (
                    <Col xs="12" md="4" key={key}>
                      <FormGroup>
                        <Label for={key}>
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </Label>
                        <Input
                          type={key.toLowerCase().includes("email") ? "email" : "text"}
                          name={key}
                          value={value || ""}
                          onChange={handleChange}
                          readOnly={mode === "view"}
                        />
                      </FormGroup>
                    </Col>
                    
                  ))}
              </Row>
              <Row>
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label for="status">Status</Label>
                    <Input
                      type="select"
                      name="status"
                      value={formData.status || ""}
                      onChange={handleChange}
                      disabled={mode !== "edit"}  // Enable selection only in edit mode
                    >
                      <option value="">Select Status</option>
                      <option value="invalidRequest">Invalid Request</option>
                      <option value="noResponse">No Response</option>
                      <option value="budgetIssue">Budget Issue</option>
                      <option value="not-interested">Not Interested</option>
                      <option value="recall">Recall</option>
                      <option value="contacted">Contacted</option>
                      <option value="falseData">False Data</option>
                      <option value="lost">Lost</option>
                      <option value="converted">Converted</option>
                    </Input>
                  </FormGroup>
                </Col>

                <Col xs="12" md="4">
                  <FormGroup>
                    <Label for="dueDate">Due Date</Label>
                    <Input
                      type="date"
                      name="dueDate"
                      value={formData.dueDate ? formData.dueDate.split('T')[0] : ""}
                      onChange={handleChange}
                      readOnly={mode !== "edit"}  // Read-only if not in edit mode
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12">
                  <FormGroup>
                    <Label>Assignment History</Label>
                    <div
                      style={{
                        maxHeight: "200px",
                        overflowY: "auto",
                        border: "1px solid #ddd",
                        padding: "10px",
                        borderRadius: "5px",
                      }}
                    >
                      {formData.assignmentHistory && formData.assignmentHistory.length > 0 ? (
                        formData.assignmentHistory.map((assignment) => (
                          <div key={assignment._id} style={{ marginBottom: "10px" }}>
                            <div className="d-flex justify-content-between">
                              <strong  style={{width:"40%", paddingLeft:"30px"}}>
                                {assignment.assignedBy?.roleId?.roleName} -{" "}
                                {assignment.assignedBy.firstName}{" "}
                                {assignment.assignedBy.lastName}
                              </strong>
                              <span style={{width:""}}> 
                                  <i className="fa fa-arrow-right" aria-hidden="true"></i>
                                 </span>
                              <strong style={{width:"40%", paddingLeft:"30px"}}>
                                {assignment.assignedTo?.roleId?.roleName} -{" "}
                                {assignment.assignedTo.firstName}{" "}
                                {assignment.assignedTo.lastName}
                              </strong>
                            </div>
                            <p style={{ fontSize: "12px", color: "#666" , paddingLeft:"30px"}}>
                              {new Date(assignment.assignedAt).toLocaleString("en-IN", {
                                timeZone: "Asia/Kolkata",
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              })}
                            </p>
                            <hr />
                          </div>
                        ))
                      ) : (
                        <p>No Assignment History Available</p>
                      )}
                    </div>
                  </FormGroup>
                </Col>
              </Row>


              <Row>
                <Col xs="12">
                  <FormGroup>
                    <Label for="notes">Notes</Label>
                    <div style={{ maxHeight: "200px", overflowY: "auto", border: "1px solid #ddd", padding: "10px", borderRadius: "5px" }}>
                      {formData.notes && formData.notes.length > 0 ? (
                        formData.notes.map((note) => (
                          <div key={note._id} style={{ marginBottom: "10px" }}>
                            <div className="d-flex justify-content-between">
                            <strong>{note.message}</strong>
                            <strong style={{color: '1c7f9b'}}>
                             - {note.createdBy.firstName} {note.createdBy.lastName}
                            </strong>
                            </div>  
                            <p style={{ fontSize: '12px', color: '#666' }}>
                              {new Date(note.createdAt).toLocaleString("en-IN", {
                                                timeZone: "Asia/Kolkata",
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: true,
                                            })}
                            </p>
                            <hr />
                          </div>
                        ))
                      ) : (
                        <p>No Notes Available</p>
                      )}
                    </div>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12">
                      
                </Col>
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
