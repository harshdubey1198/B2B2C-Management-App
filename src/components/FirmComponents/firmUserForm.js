import React, { useState, useEffect } from "react";
import { Alert, Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import axios from "axios";
import { validateEmail, validatePhone } from "../../Pages/Utility/FormValidation";
import { toast } from "react-toastify";
import AddressForm from "./adressForm";

const FirmUserCreateForm = ({ isOpen, toggle, setTrigger, formValues, setFormValues }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const [firmData, setFirmData] = useState(null);
  const [address, setAddress] = useState({});
  
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/auth/getCompany/${authUser?.response.adminId}`)
      .then((response) => {
        const firmData = response; // Directly use response without accessing data property
        setFirmData(firmData);
        setFormValues((prevState) => ({
          ...prevState,
          firmId: firmData._id, 
        }));
      })
      .catch((error) => {
        console.log("Error fetching firm data", error);
        setError("Failed to fetch firm data");
      });
  }, [authUser?.response.adminId, setFormValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateEmail(formValues.email)) {
      toast.error("Invalid Email");
      return;
    }
    if (!validatePhone(formValues.mobile)) {
      toast.error("Invalid Phone Number");
      return;
    }
    if (formValues.password !== formValues.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (Object.keys(address).length === 0) {
      toast.error("Address is required");
      return;
    }

    fetch(`${process.env.REACT_APP_URL}/auth/createUser/${authUser?.response.adminId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formValues, address }),
    })
      .then(async (response) => {
        if (!response.ok) {
          const error = await response.json();
          toast.error(error.error);
          return;
        }
        toast.success("User added successfully.");
        setTrigger((prev) => prev + 1);
        setFormValues({
          firstName: "",
          lastName: "",
          email: "",
          mobile: "",
          password: "",
          confirmPassword: "",
          emergencyContact: "",
          birthday: "",
          gender: "",
          role: "",
        });
        setAddress({});
        toggle();
      })
      .catch((error) => {
        console.log("Error creating user", error);
        toast.error("Error creating user");
      });
    };    
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add New User</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <Label>Fill in the details below</Label>
          {firmData && <h5>{firmData.companyTitle}</h5>}
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>First Name</Label>
                <Input
                  name="firstName"
                  value={formValues.firstName}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Last Name</Label>
                <Input
                  name="lastName"
                  value={formValues.lastName}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  name="email"
                  type="email"
                  value={formValues.email}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Mobile</Label>
                <Input
                  name="mobile"
                  value={formValues.mobile}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>Password</Label>
                <Input
                  name="password"
                  type="password"
                  value={formValues.password}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Confirm Password</Label>
                <Input
                  name="confirmPassword"
                  type="password"
                  value={formValues.confirmPassword}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>Date of Birth</Label>
                <Input
                  name="dob"
                  type="date"
                  value={formValues.dob}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Role</Label>
                <Input
                  type="select"
                  name="role"
                  value={formValues.role}
                  onChange={handleChange}
                >
                  {/* <option value="">Select Role</option> */}
                  <option value="accountant">Accountant</option>
                  <option value="employee">Employee</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
  
                <AddressForm
                  address={address}
                  handleAddressChange={handleAddressChange}
                />
            
          
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </ModalFooter>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default FirmUserCreateForm;
