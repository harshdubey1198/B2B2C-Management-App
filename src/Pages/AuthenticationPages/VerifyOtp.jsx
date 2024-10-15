import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [canResend, setCanResend] = useState(true);
  const [resendTimeout, setResendTimeout] = useState(null);
  const navigate = useNavigate();

  const email = localStorage.getItem("email");

  useEffect(() => {
    if (!canResend) {
      const timeoutId = setTimeout(() => {
        setCanResend(true);
      }, 30000);

      setResendTimeout(timeoutId);

      return () => clearTimeout(timeoutId);
    }
  }, [canResend]);

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setOtp(value);
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Please enter OTP");
      setError("OTP is required.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    const otpNumber = Number(otp);
    axios
      .post(`${process.env.REACT_APP_URL}/auth/verify-otp`, {
        email,
        otp: otpNumber,
      })
      .then((response) => {
        const { data } = response;
        if (data && data.error) {
          const errorMessage = data.message || "Failed to verify OTP.";
          setError(errorMessage);
          toast.error(errorMessage);
        } else if (data && data.message) {
          toast.success(data.message);
          localStorage.removeItem("email");
          navigate("/login");
        } else {
          setError("Unexpected response format.");
          toast.error("Unexpected response format.");
        }
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data?.message || "An error occurred while verifying the OTP.";
        setError(errorMessage);
        toast.error(errorMessage);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleResendOtp = () => {
    if (!email) {
      toast.error("Email not found. Please try again.");
      return;
    }

    if (!canResend) {
      toast.info("Please wait before requesting a new OTP.");
      return;
    }

    setIsResending(true);
    setCanResend(false);

    axios
      .post(`${process.env.REACT_APP_URL}/auth/resend-otp`, {
        email,
      })
      .then((response) => {
        const { data } = response;
        if (data && data.error) {
          const errorMessage = data.message || "Failed to resend OTP.";
          setError(errorMessage);
          toast.error(errorMessage);
        } else if (data && data.message) {
          toast.success(data.message);
        } else {
          setError("Unexpected response format.");
          toast.error("Unexpected response format.");
        }
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data?.message || "An error occurred while resending the OTP.";
        setError(errorMessage);
        toast.error(errorMessage);
      })
      .finally(() => {
        setIsResending(false);
      });
  };

  return (
    <React.Fragment>
      <div className="bg-pattern" style={{ minHeight: "100vh", height: "100%" }}>
        <div className="bg-overlay"></div>
        <div className="account-pages pt-5">
          <Container>
            <Row className="d-flex justify-content-center mt-5 width-90">
              <Col lg={6} md={8} xl={4}>
                <Card className="mt-5">
                  <CardBody className="p-4">
                    <div className="text-center">
                      <h3 className="font-size-20 text-primary">OTP Verification</h3>
                      <p className="text-muted mt-2 mb-4">
                        A verification code has been sent to <strong>{email}</strong>. Please enter the OTP below to verify your account.
                      </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <FormGroup>
                        <Label for="otp">Enter OTP</Label>
                        <Input
                          type="text"
                          id="otp"
                          placeholder="Enter the 6-digit OTP"
                          value={otp}
                          onChange={handleChange}
                          maxLength={6}
                        />
                      </FormGroup>

                      <Button color="primary" type="submit" block disabled={isSubmitting}>
                        {isSubmitting ? "Verifying..." : "Verify OTP"}
                      </Button>
                    </form>
                    {error && <p className="text-danger text-center mt-2">{error}</p>}
                    <div className="mt-2 text-center">
                      <p className="text-muted">
                        <Button
                          color="link"
                          onClick={handleResendOtp}
                          className="p-0 text-primary"
                          disabled={isResending || !canResend}
                        >
                          {isResending ? "Resending..." : "Resend OTP"}
                        </Button>
                      </p>
                      <p className="text-muted">
                        Email already verified!{" "}
                        <Button
                          color="link"
                          onClick={() => navigate('/login')}
                          className="p-0 text-primary"
                        >
                          Go to Login
                        </Button>
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </React.Fragment>
  );
};

export default VerifyOtp;
