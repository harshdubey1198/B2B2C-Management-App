import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from "reactstrap";

function WasteManagement() {
  const [wasteData, setWasteData] = useState([
    {
      id: 1,
      material: "Plastic",
      quantity: "500 kg",
      reason: "Defective production",
      status: "Disposed",
      note: "Recycled into secondary products",
    },
    {
      id: 2,
      material: "Metal Scrap",
      quantity: "200 kg",
      reason: "Overcut during manufacturing",
      status: "Pending Disposal",
      note: "Stored in warehouse for further processing",
    },
  ]);

  const [rawMaterials, setRawMaterials] = useState([]);
  const [modal, setModal] = useState(false);
  const [newWaste, setNewWaste] = useState({
    material: "",
    quantity: "",
    reason: "",
    status: "Pending Disposal",
    note: "",
  });

  useEffect(() => {
    // Load raw materials from local storage
    const materials = JSON.parse(localStorage.getItem("rawMaterials")) || [];
    setRawMaterials(materials);
  }, []);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWaste({ ...newWaste, [name]: value });
  };

  const handleAddWaste = () => {
    if (!newWaste.material || !newWaste.quantity || !newWaste.reason) {
      alert("Please fill all required fields!");
      return;
    }

    setWasteData([
      ...wasteData,
      {
        id: Date.now(),
        ...newWaste,
      },
    ]);
    setNewWaste({
      material: "",
      quantity: "",
      reason: "",
      status: "Pending Disposal",
      note: "",
    });
    toggleModal();
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case "Disposed":
        return <span className="badge bg-success">{status}</span>;
      case "Pending Disposal":
        return <span className="badge bg-warning">{status}</span>;
      case "Rejected":
        return <span className="badge bg-danger">{status}</span>;
      default:
        return <span className="badge bg-secondary">Unknown</span>;
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Production & Inventory" breadcrumbItem="Waste Management" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Waste Management</h4>
                  <p className="card-title-desc">
                    Track and manage waste generated during production processes.
                  </p>

                  <Button color="primary" onClick={toggleModal}>
                    Add Waste Entry
                  </Button>

                  {wasteData.length === 0 ? (
                    <div className="text-center mt-4">
                      <h5>No waste data available</h5>
                      <p>Please add waste entries to track management.</p>
                    </div>
                  ) : (
                    <div className="table-responsive mt-4">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Material</th>
                            <th>Quantity</th>
                            <th>Reason</th>
                            <th>Status</th>
                            <th>Note</th>
                          </tr>
                        </thead>
                        <tbody>
                          {wasteData.map((item, index) => (
                            <tr key={item.id}>
                              <td>{index + 1}</td>
                              <td>{item.material || "N/A"}</td>
                              <td>{item.quantity || "N/A"}</td>
                              <td>{item.reason || "Not provided"}</td>
                              <td>{renderStatusBadge(item.status)}</td>
                              <td>{item.note || "No additional notes"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Waste Modal */}
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Add Waste Entry</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="material">Material</Label>
                <Input
                  type="select"
                  name="material"
                  id="material"
                  value={newWaste.material}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Material</option>
                  {rawMaterials.map((material) => (
                    <option key={material.id} value={material.name}>
                      {material.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="quantity">Quantity</Label>
                <Input
                  type="text"
                  name="quantity"
                  id="quantity"
                  placeholder="e.g., 500 kg"
                  value={newWaste.quantity}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="reason">Reason</Label>
                <Input
                  type="text"
                  name="reason"
                  id="reason"
                  placeholder="e.g., Defective production"
                  value={newWaste.reason}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="note">Note</Label>
                <Input
                  type="textarea"
                  name="note"
                  id="note"
                  placeholder="Additional details (optional)"
                  value={newWaste.note}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleAddWaste}>
              Add Entry
            </Button>{" "}
            <Button color="secondary" onClick={toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </React.Fragment>
  );
}

export default WasteManagement;
