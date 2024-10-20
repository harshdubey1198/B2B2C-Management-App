import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table, Input } from 'reactstrap';

const ViewCustomer = () => {
    const [customersData, setCustomersData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const token = JSON.parse(localStorage.getItem("authUser")).token;
    const firmId = JSON.parse(localStorage.getItem("authUser")).response.adminId;
    const [trigger, setTrigger] = useState(0);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState(null);
    const [filter, setFilter] = useState({ companyTitle: '', country: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL}/customer/get-customers/${firmId}`, config)
            .then((response) => setCustomersData(response.data))
            .catch((error) => console.error(error));
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
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter(prev => ({ ...prev, [name]: value }));
        setCurrentPage(1); // Reset to first page on filter change
    };

    const filteredData = customersData.filter((customer) =>
        (filter.companyTitle === '' || customer.firmId.companyTitle.includes(filter.companyTitle)) &&
        (filter.country === '' || customer.address.country.includes(filter.country))
    );

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
                        placeholder="Filter by Firm Name"
                        name="companyTitle"
                        value={filter.companyTitle}
                        onChange={handleFilterChange}
                        className="mr-2"
                    />
                    <Input
                        type="text"
                        placeholder="Filter by Country"
                        name="country"
                        value={filter.country}
                        onChange={handleFilterChange}
                    />
                </div>

                {filteredData.length === 0 ? (
                    <Alert color="info">No Customers found for Your Firm.</Alert>
                ) : (
                    <div style={{ overflowX: "auto" }}>
                        <Table bordered>
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
                                {currentItems.map((customer, i) => (
                                    <tr key={customer.id}>
                                        <td>{indexOfFirstItem + i + 1}</td>
                                        <td>{customer.firstName + " " + customer.lastName}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.firmId.companyTitle}</td>
                                        <td>{customer.address.country}</td>
                                        <td>
                                            <i className="bx bx-trash" style={{ fontSize: "22px", fontWeight: "bold", cursor: "pointer" }} onClick={() => handleDeleteClick(customer)}></i>
                                            <i className="bx bx-show" style={{ fontSize: "22px", fontWeight: "bold", cursor: "pointer", marginLeft: "5px" }} onClick={() => handleViewDetails(customer)}></i>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div className="pagination">
                            {[...Array(Math.ceil(filteredData.length / itemsPerPage)).keys()].map(number => (
                                <Button key={number} onClick={() => paginate(number + 1)} className={currentPage === number + 1 ? 'active' : ''}>
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
                                {/* Display customer details */}
                            </Row>
                        )}
                    </ModalBody>
                </Modal>

                {/* Delete Confirmation Modal */}
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
                        </Button>
                        <Button color="secondary" onClick={() => setDeleteModalOpen(false)}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        </React.Fragment>
    );
};

export default ViewCustomer;
