import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody,Row,Col, ModalFooter, Button, FormGroup, Label, Input } from "reactstrap";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import { validateEmail ,validatePhone} from "../Pages/Utility/FormValidation";
const ManufacturerModal = ({ isOpen, toggle}) => {
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
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_URL}/manufacturer/create-manufacturer/${userId}`,
        manufacturer
      );
    //   setManufacturer((prevManufacturer) => [...prevManufacturer, response.data]);
      toast.success(response.message);
      toggle();
      formReset();
    } catch (error) {
        console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add New Manufacturer</ModalHeader>
      <ModalBody>
                <Row>
                    <Col md={6}>
                    <FormGroup>
                        <Label for="name">Manufacturer Name</Label>
                        <Input type="text" id="name" name="name" value={manufacturer.name} onChange={handleChange} />
                    </FormGroup>
                    </Col>
                    <Col md={6}>
                    <FormGroup>
                        <Label for="contactPerson">Contact Person</Label>
                        <Input type="text" id="contactPerson" name="contactPerson" value={manufacturer.contactPerson} onChange={handleChange} />
                    </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                    <FormGroup>
                        <Label for="phone">Phone</Label>
                        <Input type="text" id="phone" name="phone" value={manufacturer.phone} onChange={handleChange} />
                    </FormGroup>
                    </Col>
                    <Col md={6}>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" id="email" name="email" value={manufacturer.email} onChange={handleChange} />
                    </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                    <FormGroup>
                        <Label for="website">Website</Label>
                        <Input type="text" id="website" name="website" value={manufacturer.website} onChange={handleChange} />
                    </FormGroup>
                    </Col>
                    <Col md={6}>
                    <FormGroup>
                        <Label for="address.h_no">House No.</Label>
                        <Input type="text" id="address.h_no" name="address.h_no" value={manufacturer.address.h_no} onChange={handleChange} />
                    </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                    <FormGroup>
                        <Label for="address.city">City</Label>
                        <Input type="text" id="address.city" name="address.city" value={manufacturer.address.city} onChange={handleChange} />
                    </FormGroup>
                    </Col>
                    <Col md={6}>
                    <FormGroup>
                        <Label for="address.state">State</Label>
                        <Input type="text" id="address.state" name="address.state" value={manufacturer.address.state} onChange={handleChange} />
                    </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                    <FormGroup>
                        <Label for="address.zip_code">Zip Code</Label>
                        <Input type="text" id="address.zip_code" name="address.zip_code" value={manufacturer.address.zip_code} onChange={handleChange} />
                    </FormGroup>
                    </Col>
                    <Col md={6}>
                    <FormGroup>
                        <Label for="address.country">Country</Label>
                        <Input type="text" id="address.country" name="address.country" value={manufacturer.address.country} onChange={handleChange} />
                    </FormGroup>
                    </Col>
                </Row>
        </ModalBody>

      <ModalFooter>
        <Button color="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Adding..." : "Add Manufacturer"}
        </Button>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ManufacturerModal;
