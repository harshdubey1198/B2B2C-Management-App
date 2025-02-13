import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, Row, Col, ModalFooter, Button, FormGroup, Label, Input } from "reactstrap";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import { validateEmail, validatePhone } from "../Pages/Utility/FormValidation";

const ManufacturerModal = ({ isOpen, toggle,manufacturerAdd, manufacturerToEdit, onManufacturerUpdated, setTriggerManufacurer }) => {
  const [manufacturer, setManufacturer] = useState({
    name: "",
    address: { h_no: "", city: "", state: "", zip_code: "", country: "" },
    contactPerson: "",
    phone: "",
    email: "",
    website: "",
  });
  const [loading, setLoading] = useState(false);
  const authUser = JSON.parse(localStorage.getItem("authUser")).response;
  const userId = authUser._id;

  useEffect(() => {
    if (manufacturerToEdit) {
      setManufacturer(manufacturerToEdit);
    } else {
      formReset();
    }
  }, [manufacturerToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parentKey, childKey] = name.split(".");
      setManufacturer((prevState) => ({
        ...prevState,
        [parentKey]: {
          ...prevState[parentKey],
          [childKey]: value,
        },
      }));
    } else {
      setManufacturer((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const formReset = () => {
    setManufacturer({
      name: "",
      address: { h_no: "", city: "", state: "", zip_code: "", country: "" },
      contactPerson: "",
      phone: "",
      email: "",
      website: "",
    });
  };

  const handleSubmit = async () => {
    if (!manufacturer.name) {
      toast.error("Please enter the manufacturer name.");
      return;
    }
    if (!validateEmail(manufacturer.email)) {
      toast.error("Invalid email address.");
      return;
    }
    if (!validatePhone(manufacturer.phone)) {
      toast.error("Invalid phone number.");
      return;
    }
    setLoading(true);
    try {
      const url = manufacturerToEdit
        ? `${process.env.REACT_APP_URL}/manufacturer/update-manufacturer/${manufacturer._id}`
        : `${process.env.REACT_APP_URL}/manufacturer/create-manufacturer/${userId}`;
      const method = manufacturerToEdit ? "put" : "post";
      const response = await axiosInstance[method](url, manufacturer);
      if (method === "put"){
        onManufacturerUpdated(response.data);
        }
        else{setTriggerManufacurer((prev) => prev + 1)}
      toast.success(response.message);
      toggle();
      formReset();
    } catch (error) {
      console.error("Error:", error);
      // toast.error("Failed to save manufacturer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{manufacturerToEdit ? "Edit Manufacturer" : "Add New Manufacturer"}</ModalHeader>
      <ModalBody>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Enter manufacturer name"
                value={manufacturer.name}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="contactPerson">Contact Person</Label>
              <Input
                type="text"
                name="contactPerson"
                id="contactPerson"
                placeholder="Contact person's name"
                value={manufacturer.contactPerson}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="phone">Phone</Label>
              <Input
                type="text"
                name="phone"
                id="phone"
                placeholder="Enter phone number"
                value={manufacturer.phone}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Enter email address"
                value={manufacturer.email}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="website">Website</Label>
              <Input
                type="text"
                name="website"
                id="website"
                placeholder="Enter website URL"
                value={manufacturer.website}
                onChange={handleChange}
              />
            </FormGroup>
          
            <FormGroup>
              <Label for="h_no">House No.</Label>
              <Input
                type="text"
                name="address.h_no"
                id="h_no"
                placeholder="House Number"
                value={manufacturer.address.h_no}
                onChange={handleChange}
                />
                </FormGroup>
          </Col>
          <Col md={6}>
              <FormGroup>
              <Label for="city">City</Label>
              <Input
                type="text"
                name="address.city"
                id="city"
                placeholder="City"
                value={manufacturer.address.city}
                onChange={handleChange}
                className="mt-2"
              />
              </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="state">State</Label>
              <Input
                type="text"
                name="address.state"
                id="state"
                placeholder="State"
                value={manufacturer.address.state}
                onChange={handleChange}
                className="mt-2"
              />
              </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="zip_code">Zip Code</Label>
              <Input
                type="text"
                name="address.zip_code"
                id="zip_code"
                placeholder="Zip Code"
                value={manufacturer.address.zip_code}
                onChange={handleChange}
                className="mt-2"
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="country">Country</Label>
              <Input
                type="text"
                name="address.country"
                id="country"
                placeholder="Country"
                value={manufacturer.address.country}
                onChange={handleChange}
                className="mt-2"
              />
            </FormGroup>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? (manufacturerToEdit ? "Updating..." : "Adding...") : (manufacturerToEdit ? "Update Manufacturer" : "Add Manufacturer")}
        </Button>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ManufacturerModal;
