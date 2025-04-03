import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import logolight from "../../assets/images/logo-light.png";
import logodark from "../../assets/images/logo-dark.png";

const FailurePayment = () => {
  document.title = "Payment Failed | aaMOBee";

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
                      <img
                        src={logodark}
                        alt="Logo"
                        height="40"
                        className="auth-logo logo-dark mx-auto"
                      />
                      <img
                        src={logolight}
                        alt="Logo"
                        height="40"
                        className="auth-logo logo-light mx-auto"
                      />
                    </Link>
                  </div>
                  <h4 className="font-size-22 fw-bold text-danger my-4">
                    Payment Failed ❌
                  </h4>
                  <p className="text-muted">
                    Oops! Something went wrong with your payment. Please try again or contact support.
                  </p>
                  <div className="d-grid mt-4">
                    <Link to="/" className="btn btn-primary waves-effect waves-light">
                      Try Again
                    </Link>
                    <Link to="/" className="btn btn-outline-danger mt-2">
                      Contact Support
                    </Link>
                  </div>
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

export default FailurePayment;
