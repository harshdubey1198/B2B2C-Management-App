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
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userForgetPassword } from "../../store/auth/forgetpwd/actions";
import { checkEmptyFields, validateEmail } from "../Utility/FormValidation";
import logolight from "../../assets/images/logo-light.png";
import logodark from "../../assets/images/logo-dark.png";

const RecoverPassword = () => {
  document.title = "Recover Password | aaMOBee";

  const dispatch = useDispatch();
  const { forgetSuccessMsg, forgetError } = useSelector(
    (state) => state.forgetPassword
  );

  const [formValues, setFormValues] = useState({
    email: "",
    role: ""
  });

  const [error, setError] = useState(""); // Local error state

  const roles = [
    { value: "", label: "Select User Type" },
    { value: "super_admin", label: "Super Admin" },
    { value: "client_admin", label: "Client Admin" },
    { value: "firm_admin", label: "Firm Manager" },
    { value: "accountant", label: "Accountant" },
    { value: "g_emp", label: "Employee" },
    { value: "customer_sp", label: "Support Executive" },
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Reset local error state
    setError("");
    // Validate form fields
    if (checkEmptyFields(formValues)) {
      setError("Fields must not be empty!");
      return;
    } else if (!validateEmail(formValues.email)) {
      setError("Email is invalid!");
      return;
    }
    // Dispatch the action to trigger the API call
    dispatch(userForgetPassword(formValues));
  };

  return (
    <React.Fragment>
      <div className="bg-pattern" style={{ height: "100vh" }}>
        <div className="bg-overlay"></div>
        <div className="account-pages pt-5">
          <Container>
            <Row className="justify-content-center">
              <Col lg={6} md={8} xl={4}>
                <Card className="mt-5">
                  <CardBody className="p-4">
                    <div>
                      <div className="text-center">
                        <Link to="/" className="">
                          <img
                            src={logodark}
                            alt=""
                            height="24"
                            className="auth-logo logo-dark mx-auto"
                          />
                          <img
                            src={logolight}
                            alt=""
                            height="24"
                            className="auth-logo logo-light mx-auto"
                          />
                        </Link>
                      </div>
                      <h4 className="font-size-18 text-muted mt-2 text-center">
                        Reset Password
                      </h4>
                      <p className="mb-5 text-center">
                        Reset your Password with aaMOBee.
                      </p>
                      <form className="form-horizontal" onSubmit={handleSubmit}>
                        <Row>
                          <Col md={12}>
                            {error && (
                              <Alert color="danger" className="alert-dismissible">
                                <button type="button" className="btn-close" aria-label="Close"></button>
                                {error}
                              </Alert>
                            )}
                            {forgetError && (
                              <Alert color="danger" className="alert-dismissible">
                                <button type="button" className="btn-close" aria-label="Close"></button>
                                {forgetError}
                              </Alert>
                            )}
                            {forgetSuccessMsg && (
                              <Alert color="success" className="alert-dismissible">
                                <button type="button" className="btn-close" aria-label="Close"></button>
                                {forgetSuccessMsg}
                              </Alert>
                            )}
                            <div className="mt-4">
                              <FormGroup>
                                <Label className="form-label" htmlFor="email">Email</Label>
                                <Input
                                  type="email"
                                  name="email"
                                  className="form-control"
                                  id="email"
                                  placeholder="Enter email"
                                  value={formValues.email}
                                  onChange={handleChange}
                                />
                              </FormGroup>
                              <FormGroup className="mt-4">
                                <Label className="form-label" htmlFor="role">Role</Label>
                                <Input
                                  type="select"
                                  name="role"
                                  className="form-control"
                                  id="role"
                                  value={formValues.role}
                                  onChange={handleChange}
                                >
                                  {roles.map((r, index) => (
                                    <option key={index} value={r.value}>
                                      {r.label}
                                    </option>
                                  ))}
                                </Input>
                              </FormGroup>
                              <div className="d-grid mt-4">
                                <Button color="primary" type="submit">
                                  Send Email
                                </Button>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </form>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-5 text-center">
                  <p className="text-white-50">
                    Don't have an account?{" "}
                    <Link to="/auth-register" className="fw-medium text-primary">
                      Register
                    </Link>
                  </p>
                  <p className="text-white-50">
                    © {new Date().getFullYear()} aaMOBee.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RecoverPassword;
