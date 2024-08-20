import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import logolight from "../../assets/images/logo-light.png";
import logodark from "../../assets/images/logo-dark.png";
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  Label,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { loginUser, socialLogin } from "../../store/actions";
import { facebook, google } from "../../config";
import { createSelector } from "reselect";
import { checkEmptyFields, validateEmail } from "../Utility/FormValidation";

const Login = (props) => {
  document.title = "Login | aaMOBee";

  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    role: "",
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
      setError(reduxError);
    }
  }, [reduxError]);

  useEffect(() => {
    const savedCredentials = JSON.parse(localStorage.getItem("userCredentials"));
    if (savedCredentials) {
      setFormValues({
        email: savedCredentials.email,
        password: savedCredentials.password,
        role: "",
      });
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkEmptyFields(formValues)) {
      setError("Fields must not be empty!");
    } else if (!validateEmail(formValues.email)) {
      setError("Email is invalid!");
    } else {
      if (rememberMe) {
        localStorage.setItem("userCredentials", JSON.stringify({
          email: formValues.email,
          password: formValues.password,
        }));
      } else {
        localStorage.removeItem("userCredentials");
      }
      dispatch(loginUser(formValues, props.router.navigate));
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setError("");
  };

  const handleCheckboxChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const signIn = (res, type) => {
    if (type === "google" && res) {
      const postData = {
        name: res.profileObj.name,
        email: res.profileObj.email,
        token: res.tokenObj.access_token,
        idToken: res.tokenId,
      };
      dispatch(socialLogin(postData, props.router.navigate, type));
    } else if (type === "facebook" && res) {
      const postData = {
        name: res.name,
        email: res.email,
        token: res.accessToken,
        idToken: res.tokenId,
      };
      dispatch(socialLogin(postData, props.router.navigate, type));
    }
  };

  const googleResponse = (response) => {
    signIn(response, "google");
  };

  const facebookResponse = (response) => {
    signIn(response, "facebook");
  };

  useEffect(() => {
    document.body.className = "bg-pattern";
    return () => {
      document.body.className = "";
    };
  }, []);

  return (
    <React.Fragment>
      <div className="bg-overlay"></div>
      <div className="account-pages pt-4">
        <Container>
          <Row className="justify-content-center">
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
                      Welcome Back !
                    </h4>
                    <p className="mb-3 text-center">
                      Sign in to continue to aaMOBee.
                    </p>
                    <Form className="form-horizontal" onSubmit={handleSubmit}>
                      {error && <Alert color="danger">{error}</Alert>}
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
                          <div className="mb-4">
                            <Label className="form-label">User Type</Label>
                            <Input
                              name="role"
                              type="select"
                              onChange={handleChange}
                              value={formValues.role}
                            >
                              <option value="">Select User Type</option>
                              <option value="super_admin">Super Admin</option>
                              <option value="client_admin">Client Admin</option>
                              <option value="firm_admin">Firm Manager</option>
                              <option value="accountant">Accountant</option>
                              <option value="g_emp">Employee</option>
                              <option value="viewer">Demo User</option>
                              <option value="customer_sp">Support Executive</option>
                            </Input>
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
                            <Col className="col-7">
                              <div className="text-md-end mt-3 mt-md-0">
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
                          {/* <div className="mt-4 text-center">
                            <h5 className="font-size-14 mb-3">Sign in with</h5>
                            <ul className="list-inline">
                              <li className="list-inline-item">
                                <FacebookLogin
                                  appId={facebook.APP_ID}
                                  autoLoad={false}
                                  callback={facebookResponse}
                                  render={(renderProps) => (
                                    <Link
                                      to="#"
                                      className="social-list-item bg-primary text-white border-primary"
                                      onClick={renderProps.onClick}
                                    >
                                      <i className="mdi mdi-facebook" />
                                    </Link>
                                  )}
                                />
                              </li>
                              <li className="list-inline-item">
                                <GoogleLogin
                                  clientId={google.CLIENT_ID}
                                  render={(renderProps) => (
                                    <Link
                                      to="#"
                                      className="social-list-item bg-danger text-white border-danger"
                                      onClick={renderProps.onClick}
                                    >
                                      <i className="mdi mdi-google" />
                                    </Link>
                                  )}
                                  onSuccess={googleResponse}
                                  onFailure={() => {}}
                                />
                              </li>
                            </ul>
                          </div> */}
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
