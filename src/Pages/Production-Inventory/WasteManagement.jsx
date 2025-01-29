import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { getFirmWastage } from "../../apiServices/service";

function WasteManagement() {
  const [wasteData, setWasteData] = useState([]);

  const fetchFirmWaste = async () => {
    try {
      const response = await getFirmWastage();
      setWasteData(response.data || []);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching Firm Waste:", error.message);
    }
  };

  useEffect(() => {
    fetchFirmWaste();
  }, []);  

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
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">

                  {/* <Button color="primary" onClick={toggleModal}>
                    Add Waste Entry
                  </Button> */}

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
                          {wasteData.map((item, index) => (
                            <tr key={item.id}>
                              <td>{item?.productionOrderId?.productionOrderNumber}</td>
                              <td>
                                <ul className="p-0" style={{appearance:"none", listStyleType:"none"}}>
                                  {item?.rawMaterials.map((rawMaterial, index) => (
                                    <li style={{appearance:"none"}} key={index}>
                                      <strong>{rawMaterial.itemId.name}</strong> ({rawMaterial.itemId.qtyType}) 
                                    </li>
                                  ))}
                                </ul>
                              </td>
                              <td> 
                                <ul className="p-0" style={{appearance:"none", listStyleType:"none"}}>
                                  {item?.rawMaterials.map((rawMaterial, index) => (
                                    <li style={{appearance:"none"}} key={index}>
                                      {rawMaterial.wasteQuantity} units
                                    </li>
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

      
      </div>
    </React.Fragment>
  );
}

export default WasteManagement;
