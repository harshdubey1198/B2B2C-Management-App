import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import { getFirmWastage, getWastageById } from "../../apiServices/service";
import FirmSwitcher from "../Firms/FirmSwitcher";

function WasteManagement() {
  const [wasteData, setWasteData] = useState([]);
  const [selectedWaste, setSelectedWaste] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [selectedFirmId, setSelectedFirmId] = useState(null);

  const authuser = JSON.parse(localStorage.getItem("authUser"))?.response || {};
  const userRole = authuser?.role;
  const firmId = authuser?.adminId;

  const effectiveFirmId = userRole === "client_admin" ? selectedFirmId : firmId;

  const fetchFirmWaste = async () => {
    if (!effectiveFirmId) return;
    try {
      const response = await getFirmWastage(effectiveFirmId);
      setWasteData(response.data || []);
    } catch (error) {
      console.error("Error fetching Firm Waste:", error.message);
    }
  };

  const fetchWastageDetails = async (id) => {
    try {
      const response = await getWastageById(id);
      setSelectedWaste(response.data || {});
      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching wastage details:", error.message);
    }
  };

  useEffect(() => {
    fetchFirmWaste();
  }, [effectiveFirmId, trigger]);

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

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Production & Inventory" breadcrumbItem="Waste Management" />

        {userRole === "client_admin" && (
          <div className="col-12 mb-2" style={{padding:"0 12px"}}>
            <FirmSwitcher selectedFirmId={selectedFirmId} onSelectFirm={setSelectedFirmId} />
          </div>
        )}

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
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th style={{ minWidth: "80px" }}>PO No.</th>
                            <th style={{ minWidth: "150px" }}>Material</th>
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
                              <td>{item?.productionOrderId?.productionOrderNumber || "N/A"}</td>
                              <td>
                                <ul className="p-0" style={{ listStyleType: "none" }}>
                                  {item?.rawMaterials?.length > 0 ? (
                                    item.rawMaterials.map((rawMaterial, index) => (
                                      <li key={index}>
                                        <strong>{rawMaterial?.itemId?.name || "Unknown"}</strong>{" "}
                                        ({rawMaterial?.itemId?.qtyType || "N/A"})
                                      </li>
                                    ))
                                  ) : (
                                    <li>No materials listed</li>
                                  )}
                                </ul>
                              </td>
                              <td>
                                <ul className="p-0" style={{ listStyleType: "none" }}>
                                  {item?.rawMaterials?.length > 0 ? (
                                    item.rawMaterials.map((rawMaterial, index) => (
                                      <li key={index}>{rawMaterial?.wasteQuantity || 0} units</li>
                                    ))
                                  ) : (
                                    <li>0 units</li>
                                  )}
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
                <p>
                  <strong>PO Number:</strong>{" "}
                  {selectedWaste?.productionOrderId?.productionOrderNumber || "N/A"}
                </p>
                <p>
                  <strong>Status:</strong> {selectedWaste?.status || "N/A"}
                </p>
                <p>
                  <strong>Materials:</strong>
                </p>
                <ul>
                  {selectedWaste?.rawMaterials?.length > 0 ? (
                    selectedWaste.rawMaterials.map((material, index) => (
                      <li key={index}>
                        <strong>{material?.itemId?.name || "Unknown"}</strong>:{" "}
                        {material?.wasteQuantity || 0} {material?.itemId?.qtyType || "N/A"}
                      </li>
                    ))
                  ) : (
                    <li>No materials listed</li>
                  )}
                </ul>
                <p>
                  <strong>Created By:</strong>{" "}
                  {selectedWaste?.createdBy?.firstName || "Unknown"}{" "}
                  {selectedWaste?.createdBy?.lastName || ""}
                </p>
              </div>
            ) : (
              <p>Loading details...</p>
            )}
          </ModalBody>
          <Button color="secondary" onClick={() => setModalOpen(false)}>
            Close
          </Button>
        </Modal>
      </div>
    </React.Fragment>
  );
}

export default WasteManagement;
