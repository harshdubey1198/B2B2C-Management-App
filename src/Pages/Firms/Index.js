import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import FirmSwitcher from "./FirmSwitcher"; // Adjust the path as needed
import {
  checkEmptyFields,
  validateEmail,
  validatePassword,
  validatePhone,
} from "../Utility/FormValidation";

// const clientData = {
//   1: [
//     {
//       id: 1,
//       name: "John Doe",
//       phone: "123-456-7890",
//       email: "john.doe@example.com",
//       address: "123 Main St, Anytown, USA",
//       actions: "Edit/Pause",
//       firmAdmin: "John",
//       permissions: "Admin/User",
//       subscriptions: [
//         {
//           product: "Product A",
//           status: "Active",
//           startDate: "01/01/23",
//           endDate: "31/12/23",
//         },
//       ],
//     },
//   ],
//   2: [
//     {
//       id: 1,
//       name: "Jane Smith",
//       phone: "098-765-4321",
//       email: "jane.smith@example.com",
//       address: "456 Elm St, Othertown, USA",
//       actions: "Edit/Pause",
//       firmAdmin: "Jane",
//       permissions: "Admin/User",
//       subscriptions: [
//         {
//           product: "Product B",
//           status: "Active",
//           startDate: "15/02/23",
//           endDate: "14/02/24",
//         },
//       ],
//     },
//   ],
//   3: [
//     {
//       id: 1,
//       name: "Alice Johnson",
//       phone: "555-123-4567",
//       email: "alice.johnson@example.com",
//       address: "789 Oak St, Sometown, USA",
//       actions: "Edit/Pause",
//       firmAdmin: "Alice",
//       permissions: "Admin/User",
//       subscriptions: [
//         {
//           product: "Product C",
//           status: "Active",
//           startDate: "10/10/23",
//           endDate: "10/10/24",
//         },
//       ],
//     },
//   ],
//   4: [
//     {
//       id: 1,
//       name: "Alice Johnson",
//       phone: "555-123-4567",
//       email: "alice.johnson@example.com",
//       address: "789 Oak St, Sometown, USA",
//       actions: "Edit/Pause",
//       firmAdmin: "Alice",
//       permissions: "Admin/User",
//       subscriptions: [
//         {
//           product: "Product C",
//           status: "Active",
//           startDate: "10/10/23",
//           endDate: "10/10/24",
//         },
//       ],
//     },
//   ],
// };


function Index() {
  const [selectedFirmId, setSelectedFirmId] = useState(1);
  const [hoveredClientId, setHoveredClientId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [firms, SetFirms] = useState([])
  const [clientData, setClientData] = useState([])

  const [formValues, setFormValues] = useState({
    firmId: "",
    firmName: "",
    name: "",
    email: "",
    phone: "",
    emergencyContact: "",
    address: "",
    dob: "",
    role: "",
    password: "",
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
  const userRoles = ["Firm Admin", "Accountant", "Employee"];

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("Firms")) || []
    SetFirms(storedData)

    const storedUsers = JSON.parse(localStorage.getItem("Create User")) || []
    setClientData(storedUsers)
  },[])

  console.log(clientData, "firms")
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
      setError("Fill All the Feilds");
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
    if (!validatePassword(formValues.password)) {
      setError(
        "Password should contain atleast 8 characters and must contain one uppercase, one lowercase, one digit and one special character!"
      );
      return false;
    }

    setTimeout(() => {
      // Store form data in localStorage
      const storedData = JSON.parse(localStorage.getItem("Create User")) || [];
      const newItems = {
        ...formValues,
      };
      storedData.push(newItems);
      localStorage.setItem("Create User", JSON.stringify(storedData));
      setSuccess("User added successfully.");
      setError("");

      setFormValues({
        firmId: "",
        firmName: "",
        name: "",
        email: "",
        phone: "",
        emergencyContact: "",
        address: "",
        dob: "",
        role: "",
        password: "",
        permissions: [],
        restrictions: "",
      });
      toggleModal()
    }, 1000);
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

  const filteredClients = clientData.filter(client => client?.firmId === String(selectedFirmId));

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
          <FirmSwitcher
            selectedFirmId={selectedFirmId}
            onSelectFirm={setSelectedFirmId}
          />
        </div>
        <Col lg={12}>
          <Card>
            <CardBody>
              <div className="table-responsive mt-4">
                <table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                      <th>Firm Id</th>
                      <th>Firm Name</th>
                      <th>User Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      {/* <th>Firm Admin</th> */}
                      <th>Actions</th>
                      <th>Permissions</th>
                      {/* <th>Start Date</th>
                      <th>End Date</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {clientData && filteredClients.map((client) => (
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
                        {/* <td>{client.firmAdmin}</td> */}
                        <td>Edit/Pause</td>
                        <td>{client.permissions.map((permission) => (
                          <span key={permission}>{permission}, </span>
                        ))}</td>
                        {/* <td>
                          {client.subscriptions.map((subscription) => (
                            <div key={subscription.product}>
                              <div>{subscription.startDate}</div>
                            </div>
                          ))}
                        </td>
                        <td>
                          {client.subscriptions.map((subscription) => (
                            <div key={subscription.product}>
                              <div>{subscription.endDate}</div>
                            </div>
                          ))}
                        </td> */}
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
              )}
            </CardBody>
          </Card>
        </Col>
      </div>

      {/* MODAL FOR CREATE USER FOR FIRM */}
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Create User</ModalHeader>
        {error && <Alert color="danger">{error}</Alert>}
        {success && <Alert color="success">{success}</Alert>}
        <ModalBody>
          <div>
            <div className="row">
              <div className="col-md-6">
                <FormGroup>
                  <Label for="firmId">FirmId</Label>
                  <Input
                    type="text"
                    id="firmId"
                    name="firmId"
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label for="firmName">Firm Name</Label>
                  <Input
                    type="select"
                    id="firmName"
                    name="firmName"
                    onChange={handleChange}
                  >
                    <option value="">Select Firm</option>
                    {firms && firms.map((firm, index) => (
                      <option key={index} value={firm?.name}>
                        {firm?.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <FormGroup>
                  <Label for="phone">Phone</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label for="emergencyContact">Emergency Contact</Label>
                  <Input
                    type="tel"
                    id="emergencyContact"
                    name="emergencyContact"
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <FormGroup>
                  <Label for="address">Address</Label>
                  <Input
                    type="text"
                    id="address"
                    name="address"
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label for="dob">DOB</Label>
                  <Input
                    type="date"
                    id="dob"
                    name="dob"
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <FormGroup>
                  <Label for="role">User Role</Label>
                  <Input
                    type="select"
                    id="role"
                    name="role"
                    onChange={handleChange}
                  >
                    <option value="">Select User Role</option>
                    {userRoles?.map((role, index) => (
                      <option key={index} value={role}>
                        {role}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup className="position-relative">
                  <Label for="password">Password</Label>
                  <Input
                    type={show ? "text" : "password"}
                    id="password"
                    name="password"
                    onChange={handleChange}
                  />
                  <button
                    onClick={() => setShow(!show)}
                    className="btn btn-link position-absolute end-0"
                    style={{ top: "74%", transform: "translateY(-50%)" }}
                    type="button"
                  >
                    <i className={`mdi mdi-eye${show ? "-off" : ""}`}></i>
                  </button>
                </FormGroup>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <FormGroup>
                  <Label for="permissions">Permission</Label>
                  <Input
                    type="select"
                    id="permissions"
                    name="permissions"
                    onChange={handlePermissionChange}
                  >
                    <option value="">Select Permission</option>
                    {prePermissions.map((perm, index) => (
                      <option key={index} value={perm}>
                        {perm}
                      </option>
                    ))}
                  </Input>
                  {formValues.permissions.length > 0 && (
                    <div className="mt-2">
                      {formValues.permissions.map((permission, index) => (
                        <div
                          key={index}
                          className="d-flex justify-content-between align-items-center mb-2 border rounded p-2"
                        >
                          <span>{permission}</span>
                          <Button
                            color="danger"
                            size="sm"
                            onClick={() => handleRemovePermission(permission)}
                          >
                            &times;
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label for="restrictions">Restrictions</Label>
                  <Input
                    type="select"
                    id="restrictions"
                    name="restrictions"
                    onChange={handleChange}
                  >
                    <option value="">Select Restriction</option>
                    {preRestrictions.map((restriction, index) => (
                      <option key={index} value={restriction}>
                        {restriction}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Add
          </Button>{" "}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <style>{`
        .hover-details {
          position: absolute;
          background: white;
          border: 1px solid #ccc;
          padding: 10px;
          bottom: 4px;
          right: 0px;
          box-shadow: 0px 4px 8px rgba(0,0,0,0.1);
        }
      `}</style>
    </React.Fragment>
  );
}

export default Index;
