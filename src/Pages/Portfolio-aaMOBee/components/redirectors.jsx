import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./redirectors.css";
import invocingImage from "../../../assets/images/invoicing.jpg";

function Redirectors() {
  const [isMobileView, setIsMobileView] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = "bg-pattern";

    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.className = ""; 
    };
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleCRMLogin = () => {
    navigate("/crm/login");
  };

  return (
    <div className="redirectors-wrapper">
      <div className="overlay"></div>
      <div className="content-wrapper">
        <Container>
          {isMobileView ? (
            <div className="mobile-view text-center">
              <h2 className="mb-4 text-white">Welcome to the Portal</h2>
              <Button
                color="primary"
                className="custom-button mb-3"
                onClick={handleLogin}
              >
                Login <br />
                (Inventory, Firm, Invoicing)
              </Button>
              <Button
                color="secondary"
                className="custom-button"
                onClick={handleCRMLogin}
              >
                CRM Login <br />
                (Leads, Users)
              </Button>
            </div>
          ) : (
            <Row className="desktop-view text-center">
              <Col className="col">
                <Button
                  color="primary"
                  className="custom-button-2"
                  onClick={handleLogin}
                >
                  Login <br /> (Inventory, Firm, Invoicing)
                </Button>
              </Col>
              <Col className="col">
                <Button
                  color="primary"
                  className="custom-button-2"
                  onClick={handleCRMLogin}
                >
                  CRM Login <br /> (Leads, Users)
                </Button>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </div>
  );
}

export default Redirectors;
