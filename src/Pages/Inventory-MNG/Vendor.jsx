import React, { useState, useEffect } from 'react';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col, Table } from 'reactstrap';
import { toast } from 'react-toastify';

function Vendor() {
    const [modalOpen, setModalOpen] = useState(false);
    const [vendorData, setVendorData] = useState({
        name: '',
        contactPerson: '',
        phone: '',
        email: '',
        address: {
            h_no: '',
            city: '',
            state: '',
            zip_code: '',
            country: '',
            nearby: ''
        }
    });
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [selectedVendorId, setSelectedVendorId] = useState(null);

    const authuser = JSON.parse(localStorage.getItem("authUser"));
    const token = authuser.token;
    const userId = authuser.response._id;
    const firmId = authuser.response.adminId;

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    const toggleModal = () => setModalOpen(!modalOpen);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name in vendorData.address) {
            setVendorData({
                ...vendorData,
                address: {
                    ...vendorData.address,
                    [name]: value
                }
            });
        } else {
            setVendorData({
                ...vendorData,
                [name]: value
            });
        }
    };

    const handleVendorSubmit = async () => {
        try {
            const url = editMode
                ? `${process.env.REACT_APP_URL}/vendor/update-vendor/${selectedVendorId}`
                : `${process.env.REACT_APP_URL}/vendor/create-vendor/${userId}`;
            const method = editMode ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: config.headers,
                body: JSON.stringify(vendorData)
            });

            const result = await response.json();

            if (response.ok) {
                toast.success(result.message);
                setModalOpen(false);
                setVendorData({
                    name: '',
                    contactPerson: '',
                    phone: '',
                    email: '',
                    address: {
                        h_no: '',
                        city: '',
                        state: '',
                        zip_code: '',
                        country: '',
                        nearby: ''
                    }
                });
                setEditMode(false);
                setSelectedVendorId(null);
                fetchVendors();
            } else {
                throw new Error(result.error || "Failed to save vendor");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const fetchVendors = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_URL}/vendor/get-vendors/${firmId}`, {
                method: 'GET',
                headers: config.headers
            });

            const result = await response.json();

            if (response.ok) {
                setVendors(result.data);
            } else {
                throw new Error(result.error || "Failed to fetch vendors");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (vendor) => {
        setVendorData(vendor);
        setSelectedVendorId(vendor._id);
        setEditMode(true);
        setModalOpen(true);
    };

    const handleDeleteClick = async (vendorId) => {
        if (window.confirm("Are you sure you want to delete this vendor?")) {
            try {
                const response = await fetch(`${process.env.REACT_APP_URL}/vendor/delete-vendor/${vendorId}`, {
                    method: 'DELETE',
                    headers: config.headers
                });

                const result = await response.json();

                if (response.ok) {
                    toast.success(result.message);
                    fetchVendors();
                } else {
                    throw new Error(result.error || "Failed to delete vendor");
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    useEffect(() => {
        fetchVendors();
    }, []);

    return (
        <React.Fragment>
            <div className="page-content">
                <Breadcrumbs
                    title="Inventory Management"
                    breadcrumbItem="Vendors"
                />

                <Button color="primary" onClick={() => { toggleModal(); setEditMode(false); setVendorData({
                    name: '',
                    contactPerson: '',
                    phone: '',
                    email: '',
                    address: {
                        h_no: '',
                        city: '',
                        state: '',
                        zip_code: '',
                        country: '',
                        nearby: ''
                    }
                }); }} className="mb-4">
                    Add Vendor
                </Button>

                <Modal isOpen={modalOpen} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>{editMode ? "Edit Vendor" : "Create Vendor"}</ModalHeader>
                    <ModalBody>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="name">Vendor Name</Label>
                                        <Input type="text" name="name" id="name" value={vendorData.name} onChange={handleInputChange} />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="contactPerson">Contact Person</Label>
                                        <Input type="text" name="contactPerson" id="contactPerson" value={vendorData.contactPerson} onChange={handleInputChange} />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="phone">Phone</Label>
                                        <Input type="text" name="phone" id="phone" value={vendorData.phone} onChange={handleInputChange} />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input type="email" name="email" id="email" value={vendorData.email} onChange={handleInputChange} />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="h_no">House No.</Label>
                                        <Input type="text" name="h_no" id="h_no" value={vendorData.address.h_no} onChange={handleInputChange} />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="nearby">Nearby Landmark</Label>
                                        <Input type="text" name="nearby" id="nearby" value={vendorData.address.nearby} onChange={handleInputChange} />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="city">City</Label>
                                        <Input type="text" name="city" id="city" value={vendorData.address.city} onChange={handleInputChange} />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="state">State</Label>
                                        <Input type="text" name="state" id="state" value={vendorData.address.state} onChange={handleInputChange} />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="zip_code">Zip Code</Label>
                                        <Input type="text" name="zip_code" id="zip_code" value={vendorData.address.zip_code} onChange={handleInputChange} />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="country">Country</Label>
                                        <Input type="text" name="country" id="country" value={vendorData.address.country} onChange={handleInputChange} />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={handleVendorSubmit}>{editMode ? "Update Vendor" : "Create Vendor"}</Button>
                        <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Vendor Name</th>
                            <th>Contact Person</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="text-center">Loading...</td>
                            </tr>
                        ) : vendors.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center">No vendors found</td>
                            </tr>
                        ) : (
                            vendors.map((vendor, index) => (
                                <tr key={vendor._id}>
                                    <td>{index + 1}</td>
                                    <td>{vendor.name}</td>
                                    <td>{vendor.contactPerson}</td>
                                    <td>{vendor.phone}</td>
                                    <td>{vendor.email}</td>
                                    <td>
                                        {/* <Button color="info" size="sm" className="mr-2" onClick={() => handleEditClick(vendor)}>Edit</Button>
                                        <Button color="danger" size="sm" onClick={() => handleDeleteClick(vendor._id)}>Delete</Button> */}

                                        <i className="bx bx-edit" style={{ fontSize: "22px", fontWeight: "bold", cursor: "pointer" }} onClick={() => handleEditClick(vendor)}></i>
                                        <i className="bx bx-trash" style={{ fontSize: "22px", fontWeight: "bold", cursor: "pointer", marginLeft: "5px" }} onClick={() => handleDeleteClick(vendor._id)}></i>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>
        </React.Fragment>
    );
}

export default Vendor;
