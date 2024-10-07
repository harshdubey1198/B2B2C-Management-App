import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap';

const ViewCustomer = () => {
    const [customersData, setCustomersData] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedCustomer, setSelectedCustomer] = useState(null)
    const token = JSON.parse(localStorage.getItem("authUser")).token;
    const firmId = JSON.parse(localStorage.getItem("authUser")).response.adminId;
    const [trigger, setTrigger] = useState(0);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false); 
    const [customerToDelete, setCustomerToDelete] = useState(null);

    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
    };
    const handleDeleteClick = (customer) => {
        setCustomerToDelete(customer); 
        setDeleteModalOpen(true); 
    };
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL}/customer/get-customers/${firmId}`, config).then((response) => {
            setCustomersData(response.data)
        }).catch((error) => {
            console.error(error)
        })
    },[trigger])

    const handleCustomerDelete = (customer) => {
        axios.delete(`${process.env.REACT_APP_URL}/customer/delete-customer/${customer._id}`, config).then((response) => {
            setTrigger(prev => prev + 1)
            setDeleteModalOpen(false); 
            setCustomerToDelete(null); 
        }).catch((error) => {
            console.error(error)
        })
    }

    const handleViewDetails = (customer) => {
        setModalOpen(true)
        setSelectedCustomer(customer)
    }

  return (
    <React.Fragment>
            <div className='page-content'>
                <h1>View Customers</h1>
                {customersData.length === 0 ? (
                    <Alert color="info">No Customers found for Your Firm.</Alert>
                ) : (<div style={{ overflowX: "auto" }}>
                    <Table bordered >
                        <thead>
                            <tr>
                                <th>Sr no</th>
                                <th>Customer Name</th>
                                <th>Customer Email</th>
                                <th>Firm Name</th>
                                <th>Country</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customersData.map((customer, i) => (
                                <tr key={customer.id}>
                                    <td>{i + 1}</td>
                                    <td>{customer.firstName + " " + customer.lastName}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.firmId.companyTitle}</td>
                                    <td>{customer.address.country}</td>
                                    <td>
                                        <i className="bx bx-trash"  style={{fontSize: "22px", fontWeight:"bold", cursor: "pointer"}} onClick={() => handleDeleteClick(customer)}></i>
                                        <i className="bx bx-show" style={{fontSize: "22px", fontWeight:"bold", cursor: "pointer" , marginLeft:"5px"}} onClick={() => {handleViewDetails(customer)}}></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
               </div> )}

<Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
    <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
        {selectedCustomer?.firstName + " " + selectedCustomer?.lastName} Details
    </ModalHeader>
    <ModalBody>
        {selectedCustomer && (
            <div>
                <Row>
                    <Col md={6}>
                        <label><strong>Name:</strong></label>
                        <input
                            type="text"
                            value={selectedCustomer?.firstName + " " + selectedCustomer?.lastName}
                            className="form-control"
                            readOnly
                        />
                    </Col>
                    <Col md={6}>
                        <label><strong>Email:</strong></label>
                        <input
                            type="email"
                            value={selectedCustomer?.email}
                            className="form-control"
                            readOnly
                        />
                    </Col>
                    <Col md={6}>
                        <label><strong>Mobile:</strong></label>
                        <input
                            type="number"
                            value={selectedCustomer?.mobile}
                            className="form-control"
                            readOnly
                        />
                    </Col>

                    <Col md={12}>
                        <h5 className="text-center mt-3">Firm Details</h5>
                        <div className="d-flex align-items-center justify-content-center gap-4 mt-3">
                            <div>
                                <img 
                                    src={selectedCustomer?.firmId.avatar} 
                                    alt="Firm Logo" 
                                    style={{ width: '50px', height: '50px' }}
                                />
                            </div>
                            <div>
                                <div><strong>Firm:</strong> {selectedCustomer?.firmId.companyTitle}</div>
                            </div>
                            <div>
                                <div><strong>Email:</strong> {selectedCustomer?.firmId.email}</div>
                            </div>
                        </div>
                    </Col>

                    <Col md={12}>
                        <h5 className="text-center mt-3"> Customer Address</h5>
                        <div className="d-flex align-items-center justify-content-center gap-4 mt-3">
                            <div>
                                <label><strong>House Number:</strong></label>
                                <input
                                    type="text"
                                    value={selectedCustomer?.address?.h_no}
                                    className="form-control"
                                    readOnly
                                />
                            </div>
                            <div>
                                <label><strong>Zip Code:</strong></label>
                                <input
                                    type="number"
                                    value={selectedCustomer?.address?.zip_code}
                                    className="form-control"
                                    readOnly
                                />
                            </div>
                            <div>
                                <label><strong>State:</strong></label>
                                <input
                                    type="text"
                                    value={selectedCustomer?.address?.state}
                                    className="form-control"
                                    readOnly
                                />
                            </div>
                            <div>
                                <label><strong>City:</strong></label>
                                <input
                                    type="text"
                                    value={selectedCustomer?.address?.city}
                                    className="form-control"
                                    readOnly
                                />
                            </div>
                            <div>
                                <label><strong>Country:</strong></label>
                                <input
                                    type="text"
                                    value={selectedCustomer?.address?.country}
                                    className="form-control"
                                    readOnly
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        )}
    </ModalBody>
</Modal>
<Modal isOpen={deleteModalOpen} toggle={() => setDeleteModalOpen(!deleteModalOpen)}>
    <ModalHeader toggle={() => setDeleteModalOpen(!deleteModalOpen)}>
        Confirm Delete
    </ModalHeader>
    <ModalBody>
        Are you sure you want to delete this customer: {customerToDelete?.firstName + " " + customerToDelete?.lastName}?
    </ModalBody>
    <ModalFooter>
        <Button color="danger" onClick={handleCustomerDelete}>
            Yes, Delete
        </Button>{' '}
        <Button color="secondary" onClick={() => setDeleteModalOpen(false)}>
            Cancel
        </Button>
    </ModalFooter>
</Modal>


            </div>
        </React.Fragment>
  )
}

export default ViewCustomer