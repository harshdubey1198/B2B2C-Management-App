import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import axios from "axios";
import { approveClient, inactiveClient } from "../../apiServices/service";

function ClientManagement() {
  const [requestedData, setRequestedData] = useState([]);
  const [trigger, setTrigger] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [modal, setModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [firms, setFirms] = useState([]); // Holds firms data
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const authuser = JSON.parse(localStorage.getItem("authUser"));

  const toggleDropdown = (id) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const _id = authuser?.response?._id;
  const toggleModal = () => {
    setModal(!modal);
  };

  // Fetch client firms when viewing details
  const handleViewDetails = (clientId) => {
    axios
      .get(`${process.env.REACT_APP_URL}/auth/getCompany/${clientId}`)
      .then((response) => {
        setSelectedClient(clientId);
        setFirms(response); 
        toggleModal();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };


const handleApprove = async (clientId) => {
  const data = { status: true };
    try {
        const response = await approveClient(clientId,data);
        console.log(response);
        if (response) {
            setTrigger((prev) => prev + 1);
        }
    } catch (error) {
        console.error('Error approving client:', error);
    }
};
const handleInActive = async (clientId) => {
  const data = { status: false };
    try {
        const response = await inactiveClient(clientId,data);
        console.log(response);
        if (response) {
            setTrigger((prev) => prev + 1);
        }
    } catch (error) {
        console.error('Error approving client:', error);
    }
};
            
  
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/auth/getCompany/${_id}`)
      .then((response) => {
        const allClients = response; 
        const filteredClients = allClients.filter((client) => client.role === "client_admin");
        setRequestedData(filteredClients);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [trigger]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="aaMOBee" breadcrumbItem="Client Management" />
        <p className="mm-active">All Clients</p>
        <Col lg={12}>
          <Card>
            <CardBody>
              <div className="table-responsive">
                <table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th className="d-flex justify-content-center">Details</th>
                      <th>Approval</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requestedData &&
                      requestedData.map((client) => (
                        <tr key={client._id}>
                          <td>{client.firstName + " " + client.lastName}</td>
                          <td>{client.email}</td>
                          <td>{client.mobile}</td>
                          <td className="d-flex justify-content-center">
                            <i className="bx bx-show" style={{fontSize: "22px", fontWeight:"bold",cursor: "pointer" , marginLeft:"5px"}} onClick={() => handleViewDetails(client._id)}></i>
                          </td>
                          {/* <td>
                            <Dropdown
                              isOpen={dropdownOpen[client._id]}
                              toggle={() => toggleDropdown(client._id)}
                            >
                              <DropdownToggle caret color="secondary">
                                Actions
                              </DropdownToggle>
                              <DropdownMenu>
                                <DropdownItem onClick={() => handleViewDetails(client._id)}>View Details</DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                          </td> */}
                          <th>
                            {/* <Button color="primary" onClick={() => handleApprove(client._id)}>
                              Approve
                            </Button>
                            <Button color="danger" onClick={() => handleInActive(client._id)}>
                              Inactive
                            </Button> */}
                            <i className="bx bx-check" style={{fontSize: "28px", fontWeight:"bold",cursor: "pointer" , marginLeft:"5px"}} onClick={() => handleApprove(client._id)}></i>
                            <i className="bx bx-x" style={{fontSize: "28px", fontWeight:"bold",cursor: "pointer" , marginLeft:"5px"}} onClick={() => handleInActive(client._id)}></i>
                          </th>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </Col>
      </div>

      {/* Modal to show firms under client */}
      <Modal isOpen={modal} toggle={toggleModal} modalClassName="custom-modal-width">
        <ModalHeader toggle={toggleModal}>Details</ModalHeader>
        <ModalBody>
          {/* plan details */}
          

          {firms && firms.length > 0 ? (
            <table className="table table-bordered mb-0">
              <thead style={{textAlign:"center" , verticalAlign:"middle"}}>
                <tr>
                  <th>LOGO</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody style={{textAlign:"center" , verticalAlign:"middle"}}>
                {firms.map((firm) => (
                  <tr key={firm._id}>
                    <td>
                      <img src={firm.avatar} alt="company logo" style={{height:"auto" , maxWidth : "70px" , objectFit:"cover"}} />
                    </td>
                    <td>{firm.companyTitle}</td>
                    <td>{firm.companyMobile}</td>
                    <td>{firm.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No firms found for this client.</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}

export default ClientManagement;
 