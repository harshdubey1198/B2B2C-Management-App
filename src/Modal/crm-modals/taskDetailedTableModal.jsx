import React, { useState } from 'react';
import { Card, CardBody, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

function TaskDetailedTableModal({ isOpen, toggle, task, loading, onUpdate }) {
  const [selectedLead, setSelectedLead] = useState(null);

  const handleRowClick = (lead) => {
    setSelectedLead(lead);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="xl">
      <ModalHeader toggle={toggle}>
        <h2>Task Details</h2>
      </ModalHeader>
      <ModalBody>
        {task && (
          <Card className="shadow-sm border-0 mb-3">
            <CardBody>
              <Row>
                {[
                  { label: 'Assigned By', value: task.assignedBy.firstName + " " + task.assignedBy.lastName },
                  { label: 'Assigned To', value: task.assignedTo?.map(emp => `${emp.firstName} ${emp.lastName}`).join(', ') }
                ].map((item, index) => (
                  <div key={index} className="mb-2">
                    <strong>{item.label}:</strong> {item.value}
                  </div>
                ))}
              </Row>
            </CardBody>
          </Card>
        )}

        <div className="d-flex flex-wrap gap-3">
          {/* Leads Table */}
            <div className='table-responsive' style={{ overflowX: "auto" }}>
              <table className="table table-bordered" >
                <thead className="table-light">
                  <tr>
                    <th>Lead Name</th>
                    <th>Lead Email</th>
                    <th>Lead Phone</th>
                    <th>Status</th>
                    <th>Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {task?.leadIds.map((lead, index) => (
                    <tr
                      key={index}
                      onClick={() => handleRowClick(lead)}
                      style={{ cursor: "pointer", backgroundColor: selectedLead === lead ? "#f0f8ff" : "transparent" }}
                    >
                      <td>{lead.firstName} {lead.lastName}</td>
                      <td>{lead.email}</td>
                      <td>{lead.mobileNumber}</td>
                      <td>{lead.status}</td>
                      <td>{task.priority}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          {/* Lead Details Box */}
          <div style={{ flex: "1 1 300px" }}>
            <Card className="shadow-sm border-0">
              <CardBody>
                {selectedLead ? (
                  <div>
                    <h5>Lead Details</h5>
                    <p><strong>Name:</strong> {selectedLead.firstName} {selectedLead.lastName}</p>
                    <p><strong>Email:</strong> {selectedLead.email}</p>
                    <p><strong>Phone:</strong> {selectedLead.mobileNumber}</p>
                    <p><strong>Platform:</strong> {selectedLead.platform}</p>
                    <p><strong>Status:</strong> {selectedLead.status}</p>
                    <p><strong>Form:</strong> {selectedLead.formName}</p>
                  </div>
                ) : (
                  <p>Click on a lead to see details</p>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default TaskDetailedTableModal;
