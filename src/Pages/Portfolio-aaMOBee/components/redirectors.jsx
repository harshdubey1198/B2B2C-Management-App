import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./redirectors.css";
import crmImage from "../../../assets/images/crm-leads.jpg";
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

    const lazyLoadBackgrounds = () => {
      const lazyBackgrounds = document.querySelectorAll(".lazy-bg");
      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const element = entry.target;
                const bgUrl = element.getAttribute("data-bg");
                element.style.backgroundImage = `url(${bgUrl})`;
                element.classList.remove("lazy-bg");
                observer.unobserve(element);
              }
            });
          },
          { threshold: 0.1 }
        );
        lazyBackgrounds.forEach((bg) => observer.observe(bg));
      } else {
        // Fallback for older browsers
        lazyBackgrounds.forEach((bg) => {
          const bgUrl = bg.getAttribute("data-bg");
          bg.style.backgroundImage = `url(${bgUrl})`;
          bg.classList.remove("lazy-bg");
        });
      }
    };

    lazyLoadBackgrounds();

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
              <Col className="col lazy-bg" data-bg={invocingImage}>
                <Button
                  color="primary"
                  className="custom-button"
                  onClick={handleLogin}
                >
                  Login <br /> (Inventory, Firm, Invoicing)
                </Button>
              </Col>
              <Col className="col lazy-bg" data-bg={crmImage}>
                <Button
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
