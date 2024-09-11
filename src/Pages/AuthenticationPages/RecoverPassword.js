import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card, CardBody, FormGroup, Label, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userForgetPassword } from "../../store/auth/forgetpwd/actions";
import { checkEmptyFields, validateEmail } from "../Utility/FormValidation";
import logolight from "../../assets/images/logo-light.png";
import logodark from "../../assets/images/logo-dark.png";
import { toast } from "react-toastify";

const RecoverPassword = () => {
  document.title = "Recover Password | aaMOBee";

  const dispatch = useDispatch();
  const { forgetSuccessMsg, forgetError } = useSelector(
    (state) => state.forgetPassword
  );

  const [formValues, setFormValues] = useState({
    email: ""
  });

  const [error, setError] = useState(""); 
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [canSubmit, setCanSubmit] = useState(true);
  const timeoutRef = useRef(null); 

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value
    }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return; 

    setError("");
    setIsSubmitting(true);
    setCanSubmit(false);

    if (checkEmptyFields(formValues)) {
      toast.error("Fields must not be empty!");
      setIsSubmitting(false);
      setCanSubmit(true);
      return;
    } else if (!validateEmail(formValues.email)) {
      toast.error("Email is invalid!");
      setIsSubmitting(false);
      setCanSubmit(true);
      return;
    }
    dispatch(userForgetPassword(formValues));
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCanSubmit(true);
      setIsSubmitting(false);
    }, 9000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (forgetSuccessMsg || forgetError) {
      setError(forgetError || "");
      setIsSubmitting(false);
      setCanSubmit(true);
    }
  }, [forgetSuccessMsg, forgetError]);

  return (
    <React.Fragment>
      <div className="bg-pattern" style={{ minHeight: "100vh", height: "100%"}}>
        <div className="bg-overlay"></div>
        <div className="account-pages d-flex flex-row align-items-center" style={{ minHeight: "100vh" }}>
          <Container>
            <Row className="d-flex justify-content-center  width-90">
              <Col lg={6} md={8} xl={4}>
                <Card className="mt-5 shadow-lg">
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
                      <p className="text-muted text-center mb-4">
                        Enter your email below and we'll send you instructions to reset your password.
                      </p>
                      <form className="form-horizontal" onSubmit={handleSubmit}>
                        <Row>
                          <Col md={12}>
                            <div>
                              <FormGroup>
                                <Label className="form-label" htmlFor="email">
                                  Email
                                </Label>
                                <Input
                                  type="email"
                                  className="form-control"
                                  id="email"
                                  placeholder="Enter your registered email"
                                  value={formValues.email}
                                  onChange={handleChange}
                                  disabled={isSubmitting}
                                />
                              </FormGroup>

                              <div className="d-grid mt-4">
                                <Button
                                  color="primary"
                                  type="submit"
                                  disabled={!canSubmit || isSubmitting}
                                >
                                  {isSubmitting ? "Sending..." : "Send Reset Link"}
                                </Button>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </form>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-2 text-center">
                  <p className="text-white-50">
                    Don't have an account?{" "}
                    <Link to="/register" className="fw-medium text-primary">
                      Register
                    </Link>
                  </p>
                  <p className="text-white-50">
                    © {new Date().getFullYear()} aaMOBee. All rights reserved.
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
