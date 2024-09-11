import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const VerifyOtp = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setOtp(e.target.value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/auth/verifyOtp`, {
        email,
        otp,
      });

      if (response.data.success) {
        toast.success("OTP Verified Successfully");
        navigate("/login");
      } else {
        setError(response.data.message || "Failed to verify OTP");
        toast.error("Failed to verify OTP");
      }
    } catch (err) {
      setError("Error verifying OTP");
      toast.error("Error verifying OTP");
    } finally {
      setIsSubmitting(false);
    }
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
                        />
                      </FormGroup>

                      <Button color="primary" type="submit" block disabled={isSubmitting}>
                        {isSubmitting ? "Verifying..." : "Verify OTP"}
                      </Button>
                    </form>
                    {error && <p className="text-danger text-center mt-2">{error}</p>}
                    <div className="mt-4 text-center">
                      <p className="text-muted">
                        Email already verified! {" "}
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
