import React, { useState } from "react";
import {
  Alert,
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";

import axios from "axios";
import { checkEmptyFields, validateEmail, validatePhone } from "../../Pages/Utility/FormValidation";

const ClientUserCreateForm = ({
  isOpen,
  toggle,
  firms,
  selectedFirmId,
  setSelectedFirmId,
  defaultFirm,
  formValues,
  setFormValues,
  availableRoles,
}) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAddPermission = (permission) => {
    setFormValues((prevState) => ({
      ...prevState,
      permissions: [...new Set([...prevState.permissions, permission])], // Ensure no duplicates
    }));
  };

  const handleRemovePermission = (permission) => {
    setFormValues((prevState) => ({
      ...prevState,
      permissions: prevState.permissions.filter((p) => p !== permission),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (checkEmptyFields(formValues)) {
      setError("Fill All the Fields");
      return;
    }
    if (!validateEmail(formValues.email)) {
      setError("Invalid Email");
      return;
    }
    if (!validatePhone(formValues.phone)) {
      setError("Invalid Phone Number");
      return;
    }
    if (formValues.password !== formValues.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    axios
      .post(`${process.env.REACT_APP_URL}/auth/createUser`, formValues)
      .then((response) => {
        setSuccess("User added successfully.");
        setError("");

        setFormValues({
          firmUniqueId: "",
          firmName: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          emergencyContact: "",
          address: "",
          dob: "",
          role: "",
          permissions: [],
          restrictions: "",
        });
        toggle();
      })
      .catch((error) => {
        console.log("Error creating user", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError("");
  };

  const handlePermissionChange = (e) => {
    const selectedPermission = e.target.value;
    if (
      selectedPermission &&
      !formValues.permissions.includes(selectedPermission)
    ) {
      handleAddPermission(selectedPermission);
    }
    e.target.value = "";
    setError("");
  };

  const handleFirmNameChange = (e) => {
    const selectedFirmName = e.target.value;
    const selectedFirm = firms.find((firm) => firm.firmName === selectedFirmName);
    if (selectedFirm) {
      setSelectedFirmId(selectedFirm.fuid);
    }
  };

  const prePermissions = [
    "View Invoice",
    "Create Invoice",
    "Edit Invoice",
    "See Invoice",
  ];

  const preRestrictions = ["Only View", "Not allow update"];

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add New User</ModalHeader>
      <ModalBody>
        {error && <Alert color="danger">{error}</Alert>}
        {success && <Alert color="success">{success}</Alert>}
        <form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>Firm Name</Label>
                <Input
                  type="select"
                  name="firmName"
                  value={formValues.firmName}
                  onChange={handleFirmNameChange}
                >
                  <option value="">Select Firm</option>
                  {firms.map((firm) => (
                    <option key={firm.fuid} value={firm.firmName}>
                      {firm.firmName}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label>First Name</Label>
                <Input
                  name="firstName"
                  value={formValues.firstName}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  name="email"
                  type="email"
                  value={formValues.email}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input
                  name="password"
                  type="password"
                  value={formValues.password}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Emergency Contact</Label>
                <Input
                  name="emergencyContact"
                  value={formValues.emergencyContact}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Date of Birth</Label>
                <Input
                  name="dob"
                  type="date"
                  value={formValues.dob}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label>Permissions</Label>
                <Input type="select" onChange={handlePermissionChange}>
                  <option value="">Select Permission</option>
                  {prePermissions.map((permission) => (
                    <option key={permission} value={permission}>
                      {permission}
                    </option>
                  ))}
                </Input>
                <ul>
                  {formValues.permissions.map((permission) => (
                    <li key={permission}>
                      {permission}{" "}
                      <Button
                        color="danger"
                        size="sm"
                        onClick={() => handleRemovePermission(permission)}
                      >
                        Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label for="firmUniqueId">FirmId</Label>
                <Input
                  type="text"
                  id="firmUniqueId"
                  name="firmUniqueId"
                  value={formValues.firmUniqueId}
                  readOnly
                />
              </FormGroup>
              <FormGroup>
                <Label>Last Name</Label>
                <Input
                  name="lastName"
                  value={formValues.lastName}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Phone</Label>
                <Input
                  name="phone"
                  value={formValues.phone}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Confirm Password</Label>
                <Input
                  name="confirmPassword"
                  type="password"
                  value={formValues.confirmPassword}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Address</Label>
                <Input
                  name="address"
                  value={formValues.address}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label>Role</Label>
                <Input
                  type="select"
                  name="role"
                  value={formValues.role}
                  onChange={handleChange}
                >
                  <option value="">Select Role</option>
                  {availableRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label>Restrictions</Label>
                <Input
                  type="select"
                  name="restrictions"
                  value={formValues.restrictions}
                  onChange={handleChange}
                >
                  <option value="">Select Restriction</option>
                  {preRestrictions.map((restriction) => (
                    <option key={restriction} value={restriction}>
                      {restriction}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
          </Row>
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

export default ClientUserCreateForm;
