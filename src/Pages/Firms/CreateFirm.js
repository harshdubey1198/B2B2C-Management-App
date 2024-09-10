import React, { useState } from "react";
import axios from "axios";
import {  Container,  Row,  Col,  Card,  CardBody,  FormGroup,  Label,  Input,  Button,  Alert,} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {  checkEmptyFields ,  validateEmail ,  validatePhone } from "../Utility/FormValidation";
import { toast } from "react-toastify";
import { Form, useNavigate } from "react-router-dom";

// const predefinedPermissions = [
//   "Admin",
//   "User",
// ];

function CreateFirm() {
  const [show, setShow] = useState({
    password: false,
    confirmPassword: false,
  });
  document.title = "Firm Form";

  const [formValues, setFormValues] = useState({
    companyTitle: "",
    companyMobile: "",
    companyEmail: "",
    avatar: "",
    password:"",
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

    if (!validateEmail(formValues.companyEmail)) {
        // setError("Invalid companyEmail");
        toast.error("Invalid companyEmail");
        setLoading(false);
        return;
    }
    if (!validatePhone(formValues.companyMobile)) {
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
            `${process.env.REACT_APP_URL}/auth/createUser/${clientId}`,
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
            companyTitle: "",
            companyMobile: "",
            companyEmail: "",
            password:"",
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
                      <Label htmlFor="companyTitle">Firm Name</Label>
                      <Input
                        type="text"
                        id="companyTitle"
                        name="companyTitle"
                        placeholder="Enter firm name"
                        value={formValues.companyTitle}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="companyMobile">Phone</Label>
                      <Input
                        type="text"
                        id="companyMobile"
                        name="companyMobile"
                        placeholder="Enter phone number"
                        value={formValues.companyMobile}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="companyEmail">Firm Email</Label>
                      <Input
                        type="email"
                        id="companyEmail"
                        name="companyEmail"
                        placeholder="Enter companyEmail"
                        value={formValues.companyEmail}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup className="position-relative">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        type={show.password ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        value={formValues.password}
                        onChange={handleChange}
                      />
                       <button
                            className="cursor btn btn-link position-absolute end-0"
                            style={{ top: "74%", transform: "translateY(-50%)" }}
                            onClick={() =>
                              setShow((prevState) => ({
                                ...prevState,
                                password: !prevState.password,
                              }))
                            }
                            type="button"
                          >
                            <i className={`mdi mdi-eye${show.password ? "-off" : ""}`}></i>
                          </button>
                    </FormGroup>
                    <FormGroup className="position-relative">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        type={show.confirmPassword ? "text" : "password"}   
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={formValues.confirmPassword}
                        onChange={handleChange}
                      />
                      <button
                            onClick={() => setShow((prevState) => ({
                                ...prevState, confirmPassword: !prevState.confirmPassword
                            }))}
                            className="btn btn-link position-absolute end-0"
                            style={{ top: "74%", transform: "translateY(-50%)" }}
                            type="button"
                          >
                            <i className={`mdi mdi-eye${show.confirmPassword ? "-off" : ""}`}></i>
                          </button>
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
