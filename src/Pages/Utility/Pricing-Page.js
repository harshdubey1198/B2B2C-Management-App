import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const Pricing = () => {
  document.title = "Pricing | aaMOBee";
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/plan/all`).then((response) => {
      setPlans(response); // Ensure correct data property is accessed
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Utility" breadcrumbItem="Pricing" />
          <Row className="justify-content-center">
            <Col lg={5}>
              <div className="text-center mb-5">
                <h4>Choose your Pricing plan</h4>
              
              </div>
            </Col>
          </Row>
          <Row>
            {plans && plans.map((plan, key) => (
              <Col xl={4} md={6} key={key}>
                <Card className="d-flex flex-column h-100">
                  <CardBody className="p-4 d-flex flex-column flex-grow-1">
                    <div className="d-flex mb-1">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-sm">
                          <span className="avatar-title rounded-circle bg-primary">
                            <i className={plan.icon + " font-size-20"}></i>
                          </span>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="font-size-16">{plan.title}</h5>
                        <p className="text-muted" style={{ wordWrap: 'break-word' }}>
                          {plan.caption}
                        </p>
                      </div>
                    </div>
                    <div className="py-4 border-bottom">
                      <div className="float-end plan-btn">
                        <Link
                          to="#"
                          className="btn btn-primary btn-sm waves-effect waves-light"
                        >
                          Sign up Now
                        </Link>
                      </div>
                      <h4>
                        <sup>
                          <big>₹</big>
                        </sup>{" "}
                        {plan.price}/ <span className="font-size-16">m</span>
                      </h4>
                    </div>
                    <div className="plan-features mt-4">
                      <h5 className="text-center font-size-15 mb-4">
                        Plan Features :
                      </h5>
                      {plan.features.map((feature, index) => (
                        <p key={index}>
                          <i className="mdi mdi-checkbox-marked-circle-outline font-size-16 align-middle text-primary me-2"></i>{" "}
                          {feature}
                        </p>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Pricing;
