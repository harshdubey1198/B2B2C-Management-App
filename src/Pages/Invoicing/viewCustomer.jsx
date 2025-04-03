import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table, Input } from 'reactstrap';
import { getCustomers, updateCustomer } from '../../apiServices/service';

const ViewCustomer = () => {
    const [customersData, setCustomersData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const customerData = selectedCustomer;
    const [isEditMode, setIsEditMode] = useState(false); 
    const token = JSON.parse(localStorage.getItem("authUser")).token;
    const firmId = JSON.parse(localStorage.getItem("authUser")).response.adminId;
    const [trigger, setTrigger] = useState(0);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState(null);
    const [filter, setFilter] = useState({ customerName: '', country: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    // useEffect(() => {
    //     axios.get(`${process.env.REACT_APP_URL}/customer/get-customers/${firmId}`, config)
    //         .then((response) => setCustomersData(response.data))
    //         .catch((error) => console.error(error));
    // }, [trigger]);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await getCustomers();
                setCustomersData(response.data || []);
            }
            catch (error) {
                console.error(error);
            }
        };
        fetchCustomers();
    }, [trigger]);


    const handleDeleteClick = (customer) => {
        setCustomerToDelete(customer);
        setDeleteModalOpen(true);
    };

    const handleCustomerDelete = () => {
        axios.delete(`${process.env.REACT_APP_URL}/customer/delete-customer/${customerToDelete._id}`, config)
            .then(() => {
                setTrigger(prev => prev + 1);
                setDeleteModalOpen(false);
                setCustomerToDelete(null);
            })
            .catch((error) => console.error(error));
    };

    const handleViewDetails = (customer) => {
        setModalOpen(true);
        setSelectedCustomer(customer);
        setIsEditMode(false); // Set to view mode by default
    };

    const handleEditDetails = (customer) => {
        setModalOpen(true);
        setSelectedCustomer(customer);
        setIsEditMode(true); 
    };

    const handleUpdateCustomer = async () => {
        try {
            const response = await updateCustomer(selectedCustomer._id, customerData);
            setTrigger(prev => prev + 1);
            setIsEditMode(false); 
            console.log(response);
        }
        catch (error) {
            console.error(error);
        }

    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter(prev => ({ ...prev, [name]: value }));
        setCurrentPage(1);
    };

    const filteredData = customersData.length > 0 && (filter.customerName || filter.country)
    ? customersData.filter((customer) =>
        (!filter.customerName || (customer.firstName + ' ' + customer.lastName).toLowerCase().includes(filter.customerName.toLowerCase())) &&
        (!filter.country || customer.address.country.toLowerCase().includes(filter.country.toLowerCase()))
      )
    : customersData; 
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <React.Fragment>
            <div className='page-content'>
                <h1>View Customers</h1>
                <div className="d-flex mb-3">
                    <Input
                        type="text"
                        placeholder="Filter by Customer Name"
                        name="customerName"
                        value={filter?.customerName}
                        onChange={handleFilterChange}
                        className="mr-2"
                    />
                    <Input
                        type="text"
                        placeholder="Filter by Country"
                        name="country"
                        value={filter?.country}
                        onChange={handleFilterChange}
                    />
                </div>

                {filteredData?.length === 0 ? (
                    <Alert color="info">No Customers found for Your Firm.</Alert>
                ) : (
                    <div className="table-responsive" style={{ overflowX: "auto" }}>
                        <Table bordered>
                            <thead className="table-light text-center">
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
                                {currentItems?.map((customer, i) => (
                                    <tr key={customer.id} onClick={() => handleViewDetails(customer)}>
                                        <td className="text-center">{indexOfFirstItem + i + 1}</td>
                                        <td>{customer?.firstName + " " + customer?.lastName}</td>
                                        <td>{customer?.email}</td>
                                        <td>{customer?.firmId?.companyTitle}</td>
                                        <td>{customer?.address?.country}</td>
                                        <td className="text-center">
                                            <i
                                                className="bx bx-edit"
                                                style={{ fontSize: "22px", fontWeight: "bold", cursor: "pointer" }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEditDetails(customer);
                                                }}
                                            ></i>
                                            <i
                                                className="bx bx-trash"
                                                style={{ fontSize: "22px", fontWeight: "bold", cursor: "pointer", marginLeft: "10px" }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteClick(customer);
                                                }}
                                            ></i>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div className="pagination p-3 d-flex gap-1">
                            {[...Array(Math.ceil(filteredData?.length / itemsPerPage)).keys()].map(number => (
                                <Button 
                                    key={number} 
                                    onClick={() => paginate(number + 1)}
                                    className={`mr-2 ${currentPage === number + 1 ? 'btn-primary' : ''}`}
                                >
                                  {number + 1}
                                </Button>
                            ))}
                         </div>
                        </div>
                )}

                {/* Customer Details Modal */}
                <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
                    <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
                        {selectedCustomer?.firstName + " " + selectedCustomer?.lastName} Details
                    </ModalHeader>
                    <ModalBody>
                        {selectedCustomer && (
                            <Row>
                                <Col md={6}>    
                                    <label><strong>First Name:</strong></label>
                                    <input
                                        type="text"
                                        value={selectedCustomer?.firstName}
                                        className="form-control"
                                        readOnly={!isEditMode}
                                        onChange={(e) => {
                                            if (isEditMode) {
                                                setSelectedCustomer(prev => ({ ...prev, firstName: e.target.value }));
                                            }
                                        }}
                                    />
                                </Col>

                                <Col md={6}>
                                    <label><strong>Last Name:</strong></label>
                                    <input  
                                        type="text"
                                        value={selectedCustomer?.lastName}
                                        className="form-control"
                                        readOnly={!isEditMode}
                                        onChange={(e) => {
                                            if (isEditMode) {
                                                setSelectedCustomer(prev => ({ ...prev, lastName: e.target.value }));
                                            }
                                        }}
                                    />
                                </Col>

                                <Col md={6}>
                                    <label><strong>Email:</strong></label>
                                    <input
                                        type="email"
                                        value={selectedCustomer?.email}
                                        className="form-control"
                                        readOnly={!isEditMode}
                                        onChange={(e) => {
                                            if (isEditMode) {
                                                setSelectedCustomer(prev => ({ ...prev, email: e.target.value }));
                                            }
                                        }}
                                    />
                                </Col>

                                <Col md={6}>
                                    <label><strong>Mobile:</strong></label>
                                    <input
                                        type="text"
                                        value={selectedCustomer?.mobile}
                                        className="form-control"
                                        readOnly={!isEditMode}
                                        onChange={(e) => {
                                            if (isEditMode) {
                                                setSelectedCustomer(prev => ({ ...prev, mobile: e.target.value }));
                                            }
                                        }}
                                    />
                                </Col>

                                <Col md={12}>
                                    <h5 className="text-center mt-3">Customer Address</h5>
                                    <div className="d-flex align-items-center justify-content-center gap-4 mt-3">
                                        <div>
                                            <label><strong>House Number:</strong></label>
                                            <input
                                                type="text"
                                                value={selectedCustomer?.address?.h_no}
                                                className="form-control"
                                                readOnly={!isEditMode}
                                                onChange={(e) => {
                                                    if (isEditMode) {
                                                        setSelectedCustomer(prev => ({ ...prev, address: { ...prev.address, h_no: e.target.value } }));
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label><strong>State:</strong></label>
                                            <input
                                                type="text"
                                                value={selectedCustomer?.address?.state}
                                                className="form-control"
                                                readOnly={!isEditMode}
                                                onChange={(e) => {
                                                    if (isEditMode) {
                                                        setSelectedCustomer(prev => ({ ...prev, address: { ...prev.address, state: e.target.value } }));
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label><strong>City:</strong></label>
                                            <input
                                                type="text"
                                                value={selectedCustomer?.address?.city}
                                                className="form-control"
                                                readOnly={!isEditMode}
                                                onChange={(e) => {
                                                    if (isEditMode) {
                                                        setSelectedCustomer(prev => ({ ...prev, address: { ...prev.address, city: e.target.value } }));
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label><strong>Country:</strong></label>
                                            <input
                                                type="text"
                                                value={selectedCustomer?.address?.country}
                                                className="form-control"
                                                readOnly={!isEditMode}
                                                onChange={(e) => {
                                                    if (isEditMode) {
                                                        setSelectedCustomer(prev => ({ ...prev, address: { ...prev.address, country: e.target.value } }));
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label><strong>Zip Code:</strong></label>
                                            <input
                                                type="number"
                                                value={selectedCustomer?.address?.zip_code}
                                                className="form-control"
                                                readOnly={!isEditMode}
                                                onChange={(e) => {
                                                    if (isEditMode) {
                                                        setSelectedCustomer(prev => ({ ...prev, address: { ...prev.address, zip_code: e.target.value } }));
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        {isEditMode ? (
                            <Button color="primary" onClick={handleUpdateCustomer}>Update</Button>
                        ) : (
                            <Button color="secondary" onClick={() => setIsEditMode(true)}>Edit</Button>
                        )}
                        <Button color="danger" onClick={() => setModalOpen(false)}>Close</Button>
                    </ModalFooter>
                </Modal>

                {/* Delete Confirmation Modal */}
                <Modal isOpen={deleteModalOpen} toggle={() => setDeleteModalOpen(false)}>
                    <ModalHeader toggle={() => setDeleteModalOpen(false)}>Confirm Delete</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete this customer?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={handleCustomerDelete}>Delete</Button>
                        <Button color="secondary" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </React.Fragment>
    );
};

export default ViewCustomer;
