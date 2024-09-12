import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import logolight from "../../assets/images/logo-light.png";
import logodark from "../../assets/images/logo-dark.png";
import {Row,Col,CardBody,Card,Container,Form,Input,Label} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";
import { loginUser } from "../../store/actions";
import { createSelector } from "reselect";
import { checkEmptyFields, validateEmail } from "../Utility/FormValidation";
import { toast } from "react-toastify";

const Login = (props) => {
  document.title = "Login | aaMOBee";
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false)
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const loginpage = createSelector(
    (state) => state.login,
    (state) => ({
      error: state.error,
    })
  );
  const { error: reduxError } = useSelector(loginpage);
  useEffect(() => {
    if (reduxError) {
      console.log(reduxError,"in useeffect")
      toast.error(reduxError ,  "An error occurred during login");
    }
  }, [reduxError]);
  useEffect(() => {
    const savedCredentials = JSON.parse(localStorage.getItem("userCredentials"));
    if (savedCredentials) {
      setFormValues({
        email: savedCredentials.email,
        password: savedCredentials.password,
      });
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkEmptyFields(formValues)) {
      toast.error('Please fill in all fields');
    } else if (!validateEmail(formValues.email)) {
      toast.error('Invalid email address');
    } else {
      try {
        if (rememberMe) {
          localStorage.setItem("userCredentials", JSON.stringify({
            email: formValues.email,
            password: formValues.password,
          }));
        } else {
          localStorage.removeItem("userCredentials");
        }
        await dispatch(loginUser(formValues, props.router.navigate));
      } catch (error) {
        console.error('Login failed:', error);
        toast.error(error.message || 'An error occurred during login');      }
    }
  };
  
  const emailHandler = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
    setError("");
  };

  const passwordHandler = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
    setError("");
  };

  const handleCheckboxChange = (e) => {
    setRememberMe(e.target.checked);
  };
  useEffect(() => {
    document.body.className = "bg-pattern";
    return () => {
      document.body.className = "";
    };
  }, []);

  return (
    <React.Fragment>
      <div className="bg-overlay"  style={{ minHeight: "100vh" ,height:"100%" }}></div>
      <div className="account-pages d-flex flex-row align-items-center" style={{minHeight:"100vh"}}>
        <Container >
          <Row className="d-flex justify-content-center mt-5  width-90">
            <Col lg={6} md={8} xl={6}>
              <Card>
                <CardBody className="p-3">
                  <div>
                    <div className="text-center">
                      <Link to="/">
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
                      Login 
                    </h4>
                    <Form className="form-horizontal" onSubmit={handleSubmit}>
                      {/* {error && <Alert color="danger">{error}</Alert>} */}
                      <Row>
                        <Col md={12}>
                          <div className="mb-4">
                            <Label className="form-label">Email</Label>
                            <Input
                              name="email"
                              className="form-control"
                              placeholder="Enter email"
                              type="email"
                              autoComplete="email"
                              onChange={emailHandler}
                              value={formValues.email}
                            />
                          </div>
                          <div className="mb-4 position-relative">
                            <Label className="form-label">Password</Label>
                            <Input
                              name="password"
                              type={show ? "text" : "password"}
                              autoComplete="current-password"
                              placeholder="Enter Password"
                              onChange={passwordHandler}
                              value={formValues.password}
                            />
                            <button
                              onClick={() => setShow(!show)}
                              className="btn btn-link position-absolute end-0"
                              style={{ top: "74%", transform: "translateY(-50%)" }}
                              type="button"
                            >
                              <i className={`mdi mdi-eye${show ? "-off" : ""}`}></i>
                            </button>
                          </div>
                          
                          <Row>
                            <Col>
                              <div className="form-check">
                                <Input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customControlInline"
                                  checked={rememberMe}
                                  onChange={handleCheckboxChange}
                                />
                                <Label
                                  className="form-label form-check-label"
                                  htmlFor="customControlInline"
                                >
                                  Remember me
                                </Label>
                              </div>
                            </Col>
                            <Col className="col-7 d-flex flex-row justify-content-flex-end">
                              <div className="text-md-end  mt-md-0">
                                <Link
                                  to="/recover-password"
                                  className="text-muted"
                                >
                                  <i className="mdi mdi-lock"></i> Forgot your
                                  password?
                                </Link>
                              </div>
                            </Col>
                          </Row>
                          <div className="d-grid mt-4">
                            <button
                              className="btn btn-primary waves-effect waves-light"
                              type="submit"
                            >
                              Log In
                            </button>
                          </div>
                       
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-2 text-center">
                <p className="text-white-50">
                  Don't have an account ?{" "}
                  <Link to="/register" className="fw-medium text-primary">
                    {" "}
                    Register{" "}
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
    </React.Fragment>
  );
};

Login.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Login);
