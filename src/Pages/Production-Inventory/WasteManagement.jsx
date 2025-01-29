import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import { getFirmWastage, getWastageById } from "../../apiServices/service";

function WasteManagement() {
  const [wasteData, setWasteData] = useState([]);
  const [selectedWaste, setSelectedWaste] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchFirmWaste = async () => {
    try {
      const response = await getFirmWastage();
      setWasteData(response.data || []);
    } catch (error) {
      console.error("Error fetching Firm Waste:", error.message);
    }
  };

  const fetchWastageDetails = async (id) => {
    try {
      const response = await getWastageById(id);
      setSelectedWaste(response.data || []);
      console.log("Selected Waste:", response.data);
      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching wastage details:", error.message);
    }
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case "created":
        return <span className="badge bg-success">{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
      case "Pending Disposal":
        return <span className="badge bg-warning">{status}</span>;
      case "cancelled":
        return <span className="badge bg-danger">{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
      default:
        return <span className="badge bg-secondary">Unknown</span>;
    }
  };

  useEffect(() => {
    fetchFirmWaste();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Production & Inventory" breadcrumbItem="Waste Management" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
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
                            <th>PO No.</th>
                            <th>Material</th>
                            <th>Quantity</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {wasteData.map((item) => (
                            <tr
                              key={item._id}
                              onClick={() => fetchWastageDetails(item._id)}
                              style={{ cursor: "pointer" }}
                            >
                              <td>{item?.productionOrderId?.productionOrderNumber}</td>
                              <td>
                                <ul className="p-0" style={{ listStyleType: "none" }}>
                                  {item?.rawMaterials.map((rawMaterial, index) => (
                                    <li key={index}>
                                      <strong>{rawMaterial.itemId.name}</strong> ({rawMaterial.itemId.qtyType})
                                    </li>
                                  ))}
                                </ul>
                              </td>
                              <td>
                                <ul className="p-0" style={{ listStyleType: "none" }}>
                                  {item?.rawMaterials.map((rawMaterial, index) => (
                                    <li key={index}>{rawMaterial.wasteQuantity} units</li>
                                  ))}
                                </ul>
                              </td>
                              <td>{renderStatusBadge(item?.status)}</td>
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

        <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)} centered>
          <ModalHeader toggle={() => setModalOpen(!modalOpen)}>Waste Details</ModalHeader>
          <ModalBody>
            {selectedWaste ? (
              <div>
                <p><strong>PO Number:</strong> {selectedWaste?.productionOrderId?.productionOrderNumber}</p>
                <p><strong>Status:</strong> {selectedWaste?.status}</p>
                <p><strong>Materials:</strong></p>
                <ul>
                  {selectedWaste?.rawMaterials.map((material, index) => (
                    <li key={index}>
                      <strong>{material.itemId.name}</strong>: {material.wasteQuantity} {material.itemId.qtyType}
                    </li>
                  ))}
                </ul>
                <p><strong>Created By : </strong>
                  {selectedWaste?.createdBy?.firstName} {selectedWaste?.createdBy?.lastName}
                </p>
              </div>
            ) : (
              <p>Loading details...</p>
            )}
          </ModalBody>
          <Button color="secondary" onClick={() => setModalOpen(false)}>Close</Button>
        </Modal>
      </div>
    </React.Fragment>
  );
}

export default WasteManagement;
