import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom"; 
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form,} from "reactstrap";
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";

const SuccessPayment = () => {
  document.title = "Payment Success | aaMOBee";

  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (sessionId) {
      verifyPayment(sessionId);
    }
  }, [sessionId]);

  const verifyPayment = async (sessionId) => {
    try {

      const response = await axios.get(
        `${process.env.REACT_APP_URL}/payment/verify-payment?session_id=${sessionId}`
      );

      console.log("Payment verification response:", response.data);

      if (response.data?.status === "paid") {
        console.log("Payment is successful! Showing success page.");
      } else {
        navigate("/payment-failure"); 
      }
    } catch (error) {
      navigate("/payment-failure"); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div className="bg-overlay" style={{ minHeight: "100vh", height: "100%" }}></div>
      <div className="account-pages d-flex flex-row align-items-center" style={{ minHeight: "100vh" }}>
        <Container>
          <Row className="d-flex justify-content-center mt-5 width-90">
            <Col lg={6} md={8} xl={6}>
              <Card>
                <CardBody className="p-4 text-center">
                  <div>
                    <Link to="/">
                      <img src={logodark} alt="Logo" height="40" className="auth-logo logo-dark mx-auto" />
                      <img src={logolight} alt="Logo" height="40" className="auth-logo logo-light mx-auto" />
                    </Link>
                  </div>

                  {loading ? (
                    <h4 className="font-size-22 fw-bold text-warning my-4">
                      Verifying Payment...
                    </h4>
                  ) : (
                    <>
                      <h4 className="font-size-22 fw-bold text-success my-4">
                        Payment Successful! 🎉
                      </h4>
                      <p className="text-muted">
                        Thank you for your purchase. Your transaction was completed successfully.
                      </p>
                      <div className="d-grid mt-4">
                        <Link to="/login" className="btn btn-primary waves-effect waves-light">
                          Go to Login Page
                        </Link>
                      </div>
                    </>
                  )}

                  <div className="text-center mt-4">
                    <p className="text-black border-top pt-3">
                      © {new Date().getFullYear()} aaMOBee.
                    </p>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default SuccessPayment;
