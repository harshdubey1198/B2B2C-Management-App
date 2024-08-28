import React, { useState } from "react";
import axios from "axios";
import {  Container,  Row,  Col,  Card,  CardBody,  FormGroup,  Label,  Input,  Button,  Alert,} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {  checkEmptyFields ,  validateEmail ,  validatePhone } from "../Utility/FormValidation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// const predefinedPermissions = [
//   "Admin",
//   "User",
// ];

function CreateFirm() {
  document.title = "Firm Form";

  const [formValues, setFormValues] = useState({
    firmName: "",
    firmPhone: "",
    firmEmail: "",
    avatar: "",
    // permissions: [],
    startDate: "",
    // newPermission: "",
    // selectedPermission: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // setError("");
    //toast.error("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormValues((prevState) => ({
          ...prevState,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleAddPermission = () => {
  //   if (formValues.newPermission) {
  //     setFormValues((prevState) => ({
  //       ...prevState,
  //       permissions: [...prevState.permissions, prevState.newPermission],
  //       newPermission: "",
  //     }));
  //   }
  //   if (formValues.selectedPermission) {
  //     setFormValues((prevState) => ({
  //       ...prevState,
  //       permissions: [...prevState.permissions, prevState.selectedPermission],
  //       selectedPermission: "",
  //     }));
  //   }
  // };

  // const handleRemovePermission = (index) => {
  //   setFormValues((prevState) => ({
  //     ...prevState,
  //     permissions: prevState.permissions.filter((_, i) => i !== index),
  //   }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // setError("");
    // setSuccess("");
     //toast.success("");
    //toast.error("");

    console.log('Form Values:', formValues);

    if (!validateEmail(formValues.firmEmail)) {
        // setError("Invalid Email");
        toast.error("Invalid Email");
        setLoading(false);
        return;
    }
    if (!validatePhone(formValues.firmPhone)) {
        // setError("Invalid Phone Number");
        toast.error("Invalid Phone Number");
        setLoading(false);
        return;
    }

    const authUserData = JSON.parse(localStorage.getItem("authUser"));
    const authUser = authUserData?.response;
    const clientId = authUser?._id;
    console.log('Client ID:', clientId);

    if (!clientId) {
        // setError("User ID not found");
        setLoading(false);
        toast.error("User ID not found");
        return;
    }

    try {
        const response = await axios.post(
            `http://localhost:8000/api/clientadmin/createFirm/${clientId}`,
            formValues,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        // setSuccess("Firm added successfully.");
        toast.success("Firm added successfully.");
        setFormValues({
            firmName: "",
            firmPhone: "",
            firmEmail: "",
            avatar: "",
            // permissions: [],
            startDate: "",
            // newPermission: "",
            // selectedPermission: "",
        });
        navigate('/firms')
    } catch (error) {
        // setError("Error creating firm: " + error.message);
        toast.error("Error creating firm" + error.message);
    } finally {
        setLoading(false);
    }
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
                  {/* {error && <Alert color="danger">{error}</Alert>}
                  {success && <Alert color="success">{success}</Alert>} */}
                  <form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label htmlFor="firmName">Firm Name</Label>
                      <Input
                        type="text"
                        id="firmName"
                        name="firmName"
                        placeholder="Enter firm name"
                        value={formValues.firmName}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="firmPhone">Phone</Label>
                      <Input
                        type="text"
                        id="firmPhone"
                        name="firmPhone"
                        placeholder="Enter phone number"
                        value={formValues.firmPhone}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="firmEmail">Email</Label>
                      <Input
                        type="email"
                        id="firmEmail"
                        name="firmEmail"
                        placeholder="Enter email"
                        value={formValues.firmEmail}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="avatar">Firm Image</Label>
                      <Input
                        type="file"
                        id="avatar"
                        name="avatar"
                        onChange={handleFileChange}
                      />
                      {formValues.avatar && (
                        <img
                          src={formValues.avatar}
                          alt="Item Preview"
                          className="img-fluid mt-2"
                          style={{ maxWidth: "150px" }}
                        />
                      )}
                    </FormGroup>
                    {/* <FormGroup>
                      <Label htmlFor="permissions">Permissions</Label>
                      <div className="d-flex flex-column">
                        {formValues.permissions.length > 0 ? (
                          formValues.permissions.map((permission, index) => (
                            <div
                              key={index}
                              className="d-flex justify-content-between align-items-center mb-2 border rounded p-2"
                            >
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
                              <option key={index} value={perm}>
                                {perm}
                              </option>
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
                          <Button color="success" onClick={handleAddPermission}>
                            Add
                          </Button>
                        </div>
                      </div>
                    </FormGroup> */}
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
