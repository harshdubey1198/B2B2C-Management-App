import React, { useEffect, useState } from "react";
import { Alert, Button, Card, CardBody, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import FirmSwitcher from "./FirmSwitcher";
import {   checkEmptyFields,   validateEmail,   validatePhone, } from "../Utility/FormValidation";
import axios from "axios";
import UserTable from "../../components/FirmComponents/userTable";

function UserManage() {
  const [selectedFirmId, setSelectedFirmId] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [firms, SetFirms] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [defaultFirm, setDefaultFirm] = useState();
  const authuser = JSON.parse(localStorage.getItem("authUser"));

  const [formValues, setFormValues] = useState({
    firmUniqueId: "",
    firmName: "",
    firmId: "",
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

  const prePermissions = [
    "View Invoice",
    "Create Invoice",
    "Edit Invoice",
    "See Invoice",
  ];
  const preRestrictions = ["Only View", "Not allow update"];

  const clientAdminRoles = ["firm_admin", "accountant", "g_emp"];
  const firmAdminRoles = ["accountant", "g_emp"];

  useEffect(() => {
    if (authuser) {
      axios
        .get(`${process.env.REACT_APP_URL}/clientadmin/getFirms/${authuser?.response._id}`)
        .then((response) => {
          SetFirms(response); 
        })
        .catch((error) => {
          console.log(error, "error getting firms");
        });
      console.log("Auth User Role:", authuser?.response.role);
    }

    const storedUsers = JSON.parse(localStorage.getItem("Create User")) || [];
    setClientData(storedUsers);

    const defaultFirm = JSON.parse(localStorage.getItem("defaultFirm"));
    if (defaultFirm && defaultFirm.fuid) {
      setDefaultFirm(defaultFirm);
      setSelectedFirmId(defaultFirm.fuid);
      setFormValues((prevValues) => ({
        ...prevValues,
        firmId: defaultFirm.firmId,
        firmUniqueId: defaultFirm.fuid,
        firmName: defaultFirm.name,
      }));
    }
  }, []);

  useEffect(() => {
    if (selectedFirmId) {
      const selectedFirm = firms.find((firm) => firm.fuid === selectedFirmId) || "";
      localStorage.setItem(
        "defaultFirm",
        JSON.stringify({
          firmId: selectedFirm._id,
          fuid: selectedFirmId,
          name: selectedFirm.firmName,
        })
      );
      setFormValues((prevValues) => ({
        ...prevValues,
        firmId: defaultFirm.firmId,
        firmUniqueId: selectedFirm.fuid,
        firmName: selectedFirm.firmName,
      }));
    }
  }, [selectedFirmId, firms]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

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
        toggleModal();
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

  const filteredClients = clientData.filter(
    (client) => client?.firmId === selectedFirmId
  );

  const availableRoles =
    authuser.response.role === "client_admin"
      ? clientAdminRoles
      : firmAdminRoles;

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="aaMOBee" breadcrumbItem="Client Management" />
        <div className="d-flex justify-content-between mb-4">
          <p className="mm-active">
            This is the Client Management page. Here the client data table will
            be fetched and CRUD and permissions can be set by master admin.
          </p>
        </div>
        <div className="d-flex justify-content-between mb-4">
          <Button color="primary" onClick={toggleModal}>
            Add User
          </Button>
          {authuser.response.role === "client_admin" && (
            <FirmSwitcher
              selectedFirmId={selectedFirmId}
              onSelectFirm={setSelectedFirmId}
            />
          )}
        </div>
        <Col lg={12}>
          <Card>
            <CardBody>
              <UserTable selectedFirmId={selectedFirmId}/>
              {/* <div className="table-responsive mt-4">
                <table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                      <th>Firm Id</th>
                      <th>Firm Name</th>
                      <th>User Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                      <th>Permissions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientData &&
                      filteredClients.map((client) => (
                        <tr
                          key={client.id}
                          onMouseEnter={() => setHoveredClientId(client.id)}
                          onMouseLeave={() => setHoveredClientId(null)}
                        >
                          <td>{client.firmId}</td>
                          <td>{client.firmName}</td>
                          <td>{client.name}</td>
                          <td>{client.phone}</td>
                          <td>{client.email}</td>
                          <td>{client.role}</td>
                          <td>Edit/Pause</td>
                          <td>
                            {client.permissions.map((permission) => (
                              <span key={permission}>{permission}, </span>
                            ))}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {hoveredClientId && (
                <div className="hover-details">
                  <h5>Products:</h5>
                  <ul>
                    {clientData[selectedFirmId]
                      ?.find((client) => client.id === hoveredClientId)
                      ?.subscriptions.map((subscription) => (
                        <li key={subscription.product}>
                          {subscription.product}
                        </li>
                      ))}
                  </ul>
                </div>
              )} */}
            </CardBody>
          </Card>
        </Col>
      </div>

      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Add New User</ModalHeader>
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
              <Button color="secondary" onClick={toggleModal}>
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

export default UserManage;
