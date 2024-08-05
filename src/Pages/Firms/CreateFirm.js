import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { checkEmptyFields, validateEmail, validatePhone } from "../Utility/FormValidation";

const predefinedPermissions = ["Admin", "User", "Add Account", "Delete Account"]; // Example permissions

function CreateFirm() {
  document.title = "Firm Form";

  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    email: "",
    firmAdmin: "",
    action: "",
    permissions: [],
    startDate: "",
    newPermission: "",
    selectedPermission: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError("");
  };

  const handleAddPermission = () => {
    if (formValues.newPermission) {
      setFormValues((prevState) => ({
        ...prevState,
        permissions: [...prevState.permissions, prevState.newPermission],
        newPermission: "",
      }));
    }
    if (formValues.selectedPermission) {
      setFormValues((prevState) => ({
        ...prevState,
        permissions: [...prevState.permissions, prevState.selectedPermission],
        selectedPermission: "",
      }));
    }
  };

  const handleRemovePermission = (index) => {
    setFormValues((prevState) => ({
      ...prevState,
      permissions: prevState.permissions.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (checkEmptyFields(formValues)) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }
    if (!validateEmail(formValues.email)) {
      setError("Invalid Email");
      setLoading(false);
      return;
    }
    if (!validatePhone(formValues.phone)) {
      setError("Invalid Phone Number");
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // Store form data in localStorage
      const storedData = JSON.parse(localStorage.getItem("Firms")) || [];
      const newItems = {
        ...formValues,
      };
      storedData.push(newItems);
      localStorage.setItem("Firms", JSON.stringify(storedData));
      setSuccess("Firm added successfully.");
      setLoading(false);
      setError("");

      setFormValues({
        name: "",
        phone: "",
        email: "",
        firmAdmin: "",
        action: "",
        permissions: [], // Reset to an empty array
        startDate: "",
        newPermission: "",
        selectedPermission: ""
      });
    }, 1000);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Inventory Management" breadcrumbItem="Firm Form" />
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} md={10}>
              <Card className="mt-5">
                <CardBody>
                  <h4 className="font-size-18 text-muted mt-2 text-center">
                    Create Firm
                  </h4>
                  {error && <Alert color="danger">{error}</Alert>}
                  {success && <Alert color="success">{success}</Alert>}
                  <form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label htmlFor="name">Firm Name</Label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter firm name"
                        value={formValues.name}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="Enter phone number"
                        value={formValues.phone}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        value={formValues.email}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="firmAdmin">Firm Admin</Label>
                      <Input
                        type="text"
                        id="firmAdmin"
                        name="firmAdmin"
                        placeholder="Enter firm admin"
                        value={formValues.firmAdmin}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="action">Action</Label>
                      <Input
                        type="text"
                        id="action"
                        name="action"
                        placeholder="Enter action"
                        value={formValues.action}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="permissions">Permissions</Label>
                      <div className="d-flex flex-column">
                        {formValues.permissions.length > 0 ? (
                          formValues.permissions.map((permission, index) => (
                            <div key={index} className="d-flex justify-content-between align-items-center mb-2 border rounded p-2">
                              <span>{permission}</span>
                              <Button
                                color="danger"
                                size="sm"
                                onClick={() => handleRemovePermission(index)}
                              >
                                &times;
                              </Button>
                            </div>
                          ))
                        ) : (
                          <p>No permissions added</p>
                        )}
                        <div className="d-flex align-items-center mt-2">
                          <Input
                            type="select"
                            id="selectedPermission"
                            name="selectedPermission"
                            value={formValues.selectedPermission}
                            onChange={handleChange}
                            className="me-2"
                          >
                            <option value="">Select Permission</option>
                            {predefinedPermissions.map((perm, index) => (
                              <option key={index} value={perm}>{perm}</option>
                            ))}
                          </Input>
                          <Input
                            type="text"
                            id="newPermission"
                            name="newPermission"
                            placeholder="Add custom permission"
                            value={formValues.newPermission}
                            onChange={handleChange}
                            className="me-2"
                          />
                          <Button
                            color="success"
                            onClick={handleAddPermission}
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        type="date"
                        id="startDate"
                        name="startDate"
                        placeholder="Select start date"
                        value={formValues.startDate}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <Button color="primary" type="submit" disabled={loading}>
                      {loading ? "Adding..." : "Add Firm"}
                    </Button>
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default CreateFirm;
