import React, { useState, useEffect } from "react";
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
import { Link, useNavigate, useParams } from "react-router-dom";

import logolight from "../../assets/images/logo-light.png";
import logodark from "../../assets/images/logo-dark.png";
import {
  checkEmptyFields,
  validateEmail,
  validatePassword,
} from "../Utility/FormValidation";
import { useDispatch } from "react-redux";
import { PostRequest } from "../Utility/Request";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    email: "",
    role: "",
    newPassword: "",
    confirmPassword: "",
    temporaryPassword: token
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(token, "token");
    // Additional logic can be added here if needed
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validation
    if (checkEmptyFields(formValues)) {
      setError("Fields must not be empty!");
      setLoading(false);
      return;
    }else if (!validateEmail(formValues.email)) {
      setError("Email is invalid!");
      setLoading(false);
      return;
    }else if (!validatePassword(formValues.newPassword)) {
      setError("Password should contain at least 8 characters and must contain one uppercase, one lowercase, one digit, and one special character!");
      setLoading(false);
      return;
    }else if (formValues.newPassword !== formValues.confirmPassword) {
      setError("Confirm Password should be the same as Password!");
      setLoading(false);
      return;
    }else{
        // API call to reset password
        PostRequest(`${process.env.REACT_APP_URL}/auth/reset-password`, formValues).then((response) => {
            if(response){
                // setSuccess("Password reset successfully");
                toast.success("Password reset successfully");
                navigate('/login')
            }
        }).catch((error) => {
            setError("Error resetting password");
            setLoading(false);
            toast.error("Error resetting password");
        })
    }

  
    // setTimeout(() => {
    //   // setSuccess("Password has been reset successfully");
    //   toast.success("Password has been reset successfully");
    //   setLoading(false);
    // }, 1000);
  };

  // Handler to clean input values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value.trim(), // Use trim to remove any leading/trailing whitespace
    }));
    setError("");
  };

  return (
    <React.Fragment>
      <div className="bg-pattern" style={{ height: "100vh" }}>
        <div className="bg-overlay"></div>
        <div className="account-pages pt-1">
          <Container>
            <Row className="justify-content-center">
              <Col lg={6} md={8} xl={4}>
                <Card className="mt-5">
                  <CardBody className="p-4">
                    <div className="">
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
                      {error && (
                        <Alert color="danger" className="alert-dismissible">
                          <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={() => setError("")}
                          ></button>
                          {error}
                        </Alert>
                      )}
                      {success && <Alert color="success">{success}</Alert>}
                      <form className="form-horizontal" onSubmit={handleSubmit}>
                        <FormGroup>
                          <Label className="form-label" htmlFor="email">
                            Email
                          </Label>
                          <Input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter email"
                            value={formValues.email}
                            onChange={handleChange}
                            required
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="form-label" htmlFor="role">
                            Role
                          </Label>
                          <Input
                            type="select"
                            id="role"
                            name="role"
                            value={formValues.role}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select User Role</option>
                            <option value="super_admin">Super Admin</option>
                            <option value="client_admin">Client Admin</option>
                            <option value="firm_admin">Firm Manager</option>
                            <option value="accountant">Accountant</option>
                            <option value="g_emp">Employee</option>
                            <option value="customer_sp">
                              Support Executive
                            </option>
                          </Input>
                        </FormGroup>
                        <FormGroup>
                          <Label className="form-label" htmlFor="newPassword">
                            New Password
                          </Label>
                          <Input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            placeholder="Enter new password"
                            value={formValues.newPassword}
                            onChange={handleChange}
                            required
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label
                            className="form-label"
                            htmlFor="confirmPassword"
                          >
                            Confirm Password
                          </Label>
                          <Input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm new password"
                            value={formValues.confirmPassword}
                            onChange={handleChange}
                            required
                          />
                        </FormGroup>
                        <div className="d-grid mt-4">
                          <Button
                            color="primary"
                            type="submit"
                            disabled={loading}
                          >
                            {loading ? "Resetting..." : "Reset Password"}
                          </Button>
                        </div>
                      </form>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-5 text-center">
                  <p className="text-white-50">
                    Remembered your password?{" "}
                    <Link to="/login" className="fw-medium text-primary">
                      Login
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

export default ResetPassword;
