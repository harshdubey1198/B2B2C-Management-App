import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Input,
  Label,
  Form,
  FormFeedback,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createSelector } from "reselect";
import {
  registerUser,
  registerUserSuccessful,
  registerUserFailed,
  apiError,
} from "../../store/actions";
import logolight from "../../assets/images/logo-light.png";
import logodark from "../../assets/images/logo-dark.png";
import { checkEmptyFields, validateEmail, validatePassword } from "../Utility/FormValidation";
import { PostRequest } from "../Utility/Request";
import { toast } from "react-toastify";

const Register = (props) => {
  document.title = "Register | aaMOBee";

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registrationError = useSelector(
    (state) => state.account.registrationError
  );

  // Default formInput for role and status
  const defaultRole = "client_admin";
  const defaultStatus = "Requested";

  // State to manage form formInput and validation
  const [formInput, setFormInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    companyMobile: "",
    companyName: "",
    mobile: "",
    // dob: "",
    address: "",
    role: defaultRole,
    status: "Requested",
  });

  const [show, setShow] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate the form
    dispatch(registerUserFailed(""));
    if (checkEmptyFields(formInput)) {
      // dispatch(registerUserFailed("Fields must not be empty!"));
      toast.error("Fields must not be empty!");
    } else if (!validateEmail(formInput.email)) {
      // dispatch(registerUserFailed("Email is invalid!"));
      toast.error("Email is invalid!");
    } else if (!validatePassword(formInput.password)) {
        // dispatch(registerUserFailed("Password should contain atleast 8 characters and must contain one uppercase, one lowercase, one digit and one special character!"));
        toast.error("Password should contain at least 8 characters and must contain one uppercase, one lowercase, one digit, and one special character!");
    } else if (formInput.password !== formInput.confirmPassword) {
        // dispatch(registerUserFailed("Confirm Password should be same as Password!"));
        toast.error("Confirm Password should be the same as Password!");
      }else {
      PostRequest(
        `${process.env.REACT_APP_URL}/clientadmin/register`,
        formInput
      )
        .then((response) => {
          if (response) {
            dispatch(registerUserSuccessful(formInput));
            dispatch(registerUserFailed(""));
            navigate("/login");
          } else {
            // dispatch(registerUserFailed("Registration failed"));
            toast.error("Registration failed");
          }
        })
        .catch((err) => {
          console.log("API Error", err);
          // dispatch(registerUserFailed(err || "An error occurred"));
          toast.error(err || "An error occurred");
        });
    }
  };

  // NAME HANDLER
  const nameHandler = (e) => {
    const { name, value } = e.target;
    const cleanedValue = value.replace(/[^A-Za-z]/g, "");
    setFormInput((prevState) => ({
      ...prevState,
      [name]: cleanedValue,
    }));
    dispatch(registerUserFailed(""));
  };

  // USERNAME HANDLER
  const userNameHandler = (e) => {
    const { name, value } = e.target;
    const cleanedValue = value.replace(" ", "");
    setFormInput((prevState) => ({
      ...prevState,
      [name]: cleanedValue,
    }));
    dispatch(registerUserFailed(""));
  };

  // EMAIL HANDLER
  const emailHandler = (e) => {
    const { name, value } = e.target;
    const cleanedValue = value.replace(/\s/g, "");
    setFormInput((prevState) => ({
      ...prevState,
      [name]: cleanedValue,
    }));
    dispatch(registerUserFailed(""));
  };

  // PHONE HANDLER
  const phoneHandler = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D/g, "");
    if (numericValue.length <= 10) {
      setFormInput((prevState) => ({
        ...prevState,
        [name]: numericValue,
      }));
      dispatch(registerUserFailed(""));
    }
  };

  // PASSWORD HANDLER
  const passwordHandler = (e) => {
    const { name, value } = e.target;
    const cleanedValue = value.replace(/\s/g, "");
    setFormInput((prevState) => ({
      ...prevState,
      [name]: cleanedValue,
    }));
    dispatch(registerUserFailed(""));
  };

  useEffect(() => {
    if (registrationError) {
      console.log("Registration Error:", registrationError);
    }
  }, [registrationError]);

  const registerpage = createSelector(
    (state) => state.account,
    (state) => ({
      user: state.user,
      registrationError: state.registrationError,
    })
  );

  const { user } = useSelector(registerpage);

  return (
    <div className="bg-pattern" style={{ height: "100%" }}>
      <div className="bg-overlay"></div>
      <div className="account-pages pt-0">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} md={10} xl={8}>
              <Card className="mt-3">
                <CardBody className="p-4">
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

                  <h4 className="font-size-18 text-muted text-center mt-2">
                    Free Register
                  </h4>
                  <p className="text-muted text-center mb-4">
                    Get your free aaMOBee account now.
                  </p>
                  <Form className="form-horizontal" onSubmit={handleSubmit}>
                    {user && (
                      <Alert color="success">Register User Successfully</Alert>
                    )}

                    {registrationError && (
                      <Alert color="danger">{registrationError}</Alert>
                    )}

                    <Row>
                      <Col md={6}>
                        <div className="mb-4">
                          <Label className="form-label">First Name</Label>
                          <Input
                            name="firstName"
                            type="text"
                            placeholder="Enter First Name"
                            onChange={nameHandler}
                            value={formInput.firstName}
                          />
                        </div>
                        <div className="mb-4">
                          <Label className="form-label">Email</Label>
                          <Input
                            name="email"
                            type="email"
                            placeholder="Enter email"
                            onChange={emailHandler}
                            value={formInput.email}
                          />
                        </div>
                        <div className="mb-4 position-relative">
                          <Label className="form-label">Password</Label>
                          <Input
                            name="password"
                            type={show.password ? "text" : "password"}
                            placeholder="Enter Password"
                            onChange={passwordHandler}
                            value={formInput.password}
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
                        </div>
                        <div className="mb-4">
                          <Label className="form-label">Company Name</Label>
                          <Input
                            name="companyName"
                            type="text"
                            placeholder="Enter Company Name"
                            onChange={(e) => {
                              setFormInput((prevState) => ({
                                ...prevState,
                                companyName: e.target.value,
                              }));
                              dispatch(registerUserFailed(""));
                            }}
                            value={formInput.companyName}
                          />
                        </div>
                        <div className="mb-4">
                          <Label className="form-label">Company Mobile</Label>
                          <Input
                            name="companyMobile"
                            type="text"
                            placeholder="Enter Company Mobile"
                            onChange={phoneHandler}
                            value={formInput.companyMobile}
                          />
                        </div>
                        {/* <div className="mb-4">
                          <Label className="form-label">Date of Birth</Label>
                          <Input
                            name="dob"
                            type="date"
                            placeholder="Enter Date of Birth"
                            onChange={(e) => {
                              setFormInput((prevState) => ({
                                ...prevState,
                                dob: e.target.value,
                              }));
                              dispatch(registerUserFailed(""));
                            }}
                            value={formInput.dob}
                          />
                        </div> */}
                      </Col>
                      <Col md={6}>
                        <div className="mb-4">
                          <Label className="form-label">Last Name</Label>
                          <Input
                            name="lastName"
                            type="text"
                            placeholder="Enter Last Name"
                            onChange={nameHandler}
                            value={formInput.lastName}
                          />
                        </div>
                        <div className="mb-4">
                          <Label className="form-label">Username</Label>
                          <Input
                            name="username"
                            type="text"
                            placeholder="Enter username"
                            onChange={userNameHandler}
                            value={formInput.username}
                          />
                        </div>
                        <div className="mb-4 position-relative">
                          <Label className="form-label">Confirm Password</Label>
                          <Input
                            name="confirmPassword"
                            type={show.confirmPassword ? "text" : "password"}
                            placeholder="Enter Confirm Password"
                            onChange={passwordHandler}
                            value={formInput.confirmPassword}
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
                        </div>
                        <div className="mb-4">
                          <Label className="form-label">Mobile</Label>
                          <Input
                            name="mobile"
                            type="text"
                            placeholder="Enter Mobile"
                            onChange={phoneHandler}
                            value={formInput.mobile}
                          />
                        </div>
                        <div className="mb-4">
                          <Label className="form-label">Address</Label>
                          <Input
                            name="address"
                            type="text"
                            placeholder="Enter Address"
                            onChange={(e) => {
                              setFormInput((prevState) => ({
                                ...prevState,
                                address: e.target.value,
                              }));
                              dispatch(registerUserFailed(""));
                            }}
                            value={formInput.address}
                          />
                        </div>
                      </Col>
                    </Row>
                    <div className="form-check">
                      <Input
                        type="checkbox"
                        className="form-check-input"
                        id="term-conditionCheck"
                      />
                      <Label
                        className="form-check-label fw-normal"
                        htmlFor="term-conditionCheck"
                      >
                        I accept{" "}
                        <Link to="#" className="text-primary">
                          Terms and Conditions
                        </Link>
                      </Label>
                    </div>
                    <div className="d-grid mt-3">
                      <button
                        className="btn btn-primary waves-effect waves-light"
                        type="submit"
                      >
                        Register
                      </button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p className="text-white-50">
                  Already have an account ?
                  <Link to="/login" className="fw-medium text-primary">
                    {" "}
                    Login{" "}
                  </Link>{" "}
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
  );
};

export default Register;
