import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, CardBody, FormGroup, Label, Input, Button } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { validateEmail, validatePhone ,validatePassword} from "../Utility/FormValidation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";




function CreateFirm() {
  const [show, setShow] = useState({
    password: false,
    confirmPassword: false,
  });
  document.title = "Firm Form";

  const [formValues, setFormValues] = useState({
    role:"firm",
    companyTitle: "",
    companyMobile: "",
    email: "",
    avatar: "",
    password: "",
    startDate: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateEmail(formValues.email)) {
      toast.error("Invalid email");
      setLoading(false);
      return;
    }
    if (!validatePhone(formValues.companyMobile)) {
      toast.error("Invalid Phone Number");
      setLoading(false);
      return;
    }
    if (!validatePassword(formValues.password)) {
      toast.error("Invalid Password");
      setLoading(false);
      return;
    }
    if (formValues.password !== formValues.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }
    const authUserData = JSON.parse(localStorage.getItem("authUser"));
    const authUser = authUserData?.response;
    const clientId = authUser?._id;

    if (!clientId) {
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

      toast.success("Firm added successfully.");
      setFormValues({
        companyTitle: "",
        companyMobile: "",
        email: "",
        password: "",
        avatar: "",
        startDate: "",
      });
      navigate('/firms');
    } catch (error) {
      toast.error("Error creating firm: " + error.message);
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
              <Card className="mt-1">
                <CardBody>
                  <h4 className="font-size-18 text-muted mt-2 text-center">
                    Create Firm
                  </h4>
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
                        id="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formValues.email}
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
                        onClick={() =>
                          setShow((prevState) => ({
                            ...prevState,
                            confirmPassword: !prevState.confirmPassword,
                          }))
                        }
                        className="btn btn-link position-absolute end-0"
                        style={{ top: "74%", transform: "translateY(-50%)" }}
                        type="button"
                      >
                        <i className={`mdi mdi-eye${show.confirmPassword ? "-off" : ""}`}></i>
                      </button>
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="avatar">Avatar</Label>
                      <Input
                        type="file"
                        id="avatar"
                        name="avatar"
                        placeholder="Select avatar"
                        onChange={handleFileChange}
                      />
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
