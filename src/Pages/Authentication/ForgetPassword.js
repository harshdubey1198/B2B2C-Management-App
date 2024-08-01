import React, { useState } from "react";
import PropTypes from "prop-types";
import { Row, Col, Alert, Card, CardBody, Container, FormFeedback, Input, Label, Form } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";
import { userForgetPassword } from "../../store/actions";
import profile from "../../assets/images/bg.png";
import logo from "../../assets/images/logo-sm.png";

const ForgetPasswordPage = (props) => {
  const dispatch = useDispatch();
  document.title = "Forget Password | aaMOBee";

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [forgetSuccessMsg, setForgetSuccessMsg] = useState('');
  const [forgetError, setForgetError] = useState('');

  const { forgetSuccessMsg: successMsg, forgetError: error } = useSelector(state => ({
    forgetSuccessMsg: state.forgetPassword.forgetSuccessMsg,
    forgetError: state.forgetPassword.forgetError,
  }));

  // Update success or error messages from Redux store
  React.useEffect(() => {
    setForgetSuccessMsg(successMsg);
    setForgetError(error);
  }, [successMsg, error]);

  const validateEmail = (email) => {
    // Simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setEmailError('');
    dispatch(userForgetPassword({ email }, props.router.navigate));
  };

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-primary-subtle">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Sign in to continue to aaMOBee.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    {forgetError && (
                      <Alert color="danger" style={{ marginTop: "13px" }}>
                        {forgetError}
                      </Alert>
                    )}
                    {forgetSuccessMsg && (
                      <Alert color="success" style={{ marginTop: "13px" }}>
                        {forgetSuccessMsg}
                      </Alert>
                    )}

                    <Form
                      className="form-horizontal"
                      onSubmit={handleSubmit}
                    >
                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          invalid={!!emailError}
                        />
                        {emailError && (
                          <FormFeedback type="invalid">
                            <div>{emailError}</div>
                          </FormFeedback>
                        )}
                      </div>
                      <Row className="mb-3">
                        <Col className="text-end">
                          <button
                            className="btn btn-primary w-md"
                            type="submit"
                          >
                            Reset
                          </button>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Go back to{" "}
                  <Link to="/login" className="font-weight-medium text-primary">
                    Login
                  </Link>{" "}
                </p>
                <p>
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

ForgetPasswordPage.propTypes = {
  router: PropTypes.object,
};

export default withRouter(ForgetPasswordPage);
