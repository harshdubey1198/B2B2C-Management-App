import React, { useState, useEffect } from "react";
import {  Container,  Row,  Col,  Card,  CardBody,  FormGroup,  Label,  Input,  Button,  Alert} from "reactstrap";
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
  document.title = "Reset Password | aaMOBee";
  const { token } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    email: "",
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

  const [show, setShow] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validation
    if (checkEmptyFields(formValues)) {
      toast.error("Fields must not be empty!");
      // setError("Fields must not be empty!");
      setLoading(false);
      return;
    }else if (!validateEmail(formValues.email)) {
      // setError("Email is invalid!");
      toast.error("Email is invalid!");
      setLoading(false);
      return;
    }else if (!validatePassword(formValues.newPassword)) {
      // setError("Password should contain at least 8 characters and must contain one uppercase, one lowercase, one digit, and one special character!");
      toast.error("Password should contain at least 8 characters and must contain one uppercase, one lowercase, one digit, and one special character!");
      setLoading(false);
      return;
    }else if (formValues.newPassword !== formValues.confirmPassword) {
      // setError("Confirm Password should be the same as Password!");
      toast.error("Confirm Password should be the same as Password!");
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
            // setError("Error resetting password");
            setLoading(false);
            toast.error("Check your email");
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
      [name]: value.trim(), 
    }));
    setError("");
  };

  return (
    <React.Fragment>
      <div className="bg-pattern"  style={{ minHeight: "100vh" ,height:"100%" }}>
        <div className="bg-overlay"></div>
        <div className="account-pages pt-1">
          <Container>
            <Row className="d-flex justify-content-center mt-5  width-90">
              <Col lg={6} md={8} xl={4}>
                <Card className="mt-5">
                  <CardBody className="p-4">
                    <div className="">
                      <div className="text-center">
                        <Link to="/" className="">
                          <img
                            src={logodark}
                            alt=""
                            height="40"
                            className="auth-logo logo-dark mx-auto"
                          />
                          <img
                            src={logolight}
                            alt=""
                            height="40"
                            className="auth-logo logo-light mx-auto"
                          />
                        </Link>
                      </div>
                      <h4 className="font-size-22 fw-bold text-dark text-center my-4 text-center">
                        Reset Password
                      </h4>
                      {/* <p className="mb-5 text-center">
                        Reset your Password with aaMOBee.
                      </p> */}
                      {/* {error && (
                        // <Alert color="danger" className="alert-dismissible">
                        //   <button
                        //     type="button"
                        //     className="btn-close"
                        //     aria-label="Close"
                        //     onClick={() => setError("")}
                        //   ></button>
                        //   {error}
                        // </Alert>
                        toast.error(error);
                      )} */}
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
                            
                          />
                        </FormGroup>
                       
                        <div className="mb-4 position-relative">
                        <FormGroup>
                          <Label className="form-label" htmlFor="newPassword">
                            New Password
                          </Label>
                          <Input
                            type={show.password ? "text": "password"}
                            id="newPassword"
                            name="newPassword"
                            placeholder="Enter new password"
                            value={formValues.newPassword}
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
                        </div>
                        <div className="mb-4 position-relative">
                        <FormGroup>
                          <Label
                            className="form-label"
                            htmlFor="confirmPassword"
                          >
                            Confirm Password
                          </Label>
                          <Input
                            type={show.confirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm new password"
                            value={formValues.confirmPassword}
                            onChange={handleChange}
                          />
                          <button
                            className="cursor btn btn-link position-absolute end-0"
                            style={{ top: "74%", transform: "translateY(-50%)" }}
                            onClick={() =>
                              setShow((prevState) => ({
                                ...prevState,
                                confirmPassword: !prevState.confirmPassword,
                              }))
                            }
                            type="button"
                          >
                            <i className={`mdi mdi-eye${show.confirmPassword ? "-off" : ""}`}></i>
                          </button>
                        </FormGroup>
                        </div>
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
                  <div className="text-center">
                  <p className="text-black py-3 m-0">
                    Remembered your password?{" "}
                    <Link to="/login" className="fw-medium text-primary">
                      Login
                    </Link>
                  </p>
                  <p className="text-black border-top py-3">
                    © {new Date().getFullYear()} aaMOBee.
                  </p>
                </div>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ResetPassword;
