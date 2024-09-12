import React, { useEffect, useState } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form,} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createSelector } from "reselect";
import {
  registerUserSuccessful,
  registerUserFailed,
} from "../../store/actions";
import logolight from "../../assets/images/logo-light.png";
import logodark from "../../assets/images/logo-dark.png";
import {
  checkEmptyFields,
  validateEmail,
  validatePassword,
} from "../Utility/FormValidation";
import { PostRequest } from "../Utility/Request";
import { toast } from "react-toastify";

const Register = (props) => {
  document.title = "Register | aaMOBee";

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registrationError = useSelector((state) => state.account.registrationError);

  const defaultRole = "client_admin";

  const [formInput, setFormInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    // username: "",
    password: "",
    confirmPassword: "",
    // companyMobile: "",
    // companyName: "",
    mobile: "",
    // address: "",
    role: defaultRole,
    status: "Requested",
  });

  const [show, setShow] = useState({
    password: false,
    confirmPassword: false,
  });

  const [countdown, setCountdown] = useState(2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerUserFailed(""));

    if (checkEmptyFields(formInput)) {
      toast.error("Fields must not be empty!");
    } else if (!validateEmail(formInput.email)) {
      toast.error("Email is invalid!");
    } else if (!validatePassword(formInput.password)) {
      toast.error(
        "Password should contain at least 8 characters and must contain one uppercase, one lowercase, one digit, and one special character!"
      );
    } else if (formInput.password !== formInput.confirmPassword) {
      toast.error("Confirm Password should be the same as Password!");
    } else {
      PostRequest(`${process.env.REACT_APP_URL}/auth/register`, formInput)
        .then((response) => {
          if (response) {
            dispatch(registerUserSuccessful(formInput));
            localStorage.setItem("email", formInput.email);
            dispatch(registerUserFailed(""));
            startRedirectCountdown(); 
          } else {
            toast.error("Registration failed");
          }
        })
        .catch((err) => {
          console.log("API Error", err);
          toast.error("Account already exists with this email or username");
        });
    }
  };

  // Start the countdown for redirection
  const startRedirectCountdown = () => {
    toast.success(`Registration successful! Redirecting to login page in ${countdown} seconds...`);
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(intervalId);
          navigate("/verify-email");
        }
        return prevCountdown - 1;
      });
    }, 1000);
  };

  const nameHandler = (e) => {
    const { name, value } = e.target;
    const cleanedValue = value.replace(/[^A-Za-z]/g, "");
    setFormInput((prevState) => ({
      ...prevState,
      [name]: cleanedValue,
    }));
    dispatch(registerUserFailed(""));
  };


  const emailHandler = (e) => {
    const { name, value } = e.target;
    const cleanedValue = value.replace(/\s/g, "");
    setFormInput((prevState) => ({
      ...prevState,
      [name]: cleanedValue,
    }));
    dispatch(registerUserFailed(""));
  };

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
    <div className="bg-pattern" style={{ minHeight: "100vh", height: "100%" }}>
      <div className="bg-overlay"></div>
      <div className="account-pages d-flex flex-row align-items-center" style={{minHeight:"100vh"}}>
        <Container>
          <Row className="justify-content-center m-0">
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

                  <p className="text-muted text-center mb-4">
                    Register Your Account
                  </p>
                  <Form className="form-horizontal" onSubmit={handleSubmit}>
                    {user && (
                      <Alert color="success">
                        Register User Successfully
                      </Alert>
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
                          <Label className="form-label">Mobile</Label>
                          <Input
                            name="mobile"
                            type="text"
                            placeholder="Enter Mobile"
                            onChange={phoneHandler}
                            value={formInput.mobile}
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
                      
                       
                      </Col>
                    </Row>
                 
                   
                    <div className="d-grid">
                      <button
                        className="btn btn-primary waves-effect waves-light"
                        type="submit"
                      >
                        Register
                      </button>
                    </div>
                    <div className="d-flex flex-row justify-content-center m-0 mt-2">
                    <p className="text-black m-0">
                          Already have an account ?
                          <Link to="/login" className="fw-medium text-primary">
                            {" "}
                            Login{" "}
                          </Link>{" "}
                        </p>
                   </div>
                  </Form>
                </CardBody>
              </Card>
              <div className="mt-2 text-center">
              
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
