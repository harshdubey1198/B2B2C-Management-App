import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const PricingData = [
  {
    title: "Basic",
    caption: "Essential features for starters to get off the ground",
    icon: "fas fa-cube",
    price: "19",
    features: [
      "Dashboard",
      "Profile Settings",
      "Inventory Management",
      "Firm Management"
    ],
  },
  {
    title: "Professional",
    caption: "Advanced features for growing businesses",
    icon: "fas fa-trophy",
    price: "29",
    features: [
      "Tier 1 Features",
      "Taxation",
      "User Management",
      "Item Configuration"
    ],
  },
  {
    title: "Enterprise",
    caption: "Comprehensive features for large enterprises",
    icon: "fas fa-shield-alt",
    price: "39",
    features: [
      "Tier 2 Features",
      "Invoice Templates",
      "Multilingual Support",
      "Reports & Log Generation"
    ],
  },
];

const Pricing = () => {
  document.title = "Pricing | aaMOBee";
  const [plans, setPlans] = useState([])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/plan/all`).then((response) => {
      setPlans(response)
    }).catch((error) => {
      console.log(error)
    })
  },[])

  console.log(plans,"plans")
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Utility" breadcrumbItem="Pricing" />
          <Row className="justify-content-center">
            <Col lg={5}>
              <div className="text-center mb-5">
                <h4>Choose your Pricing plan</h4>
                <p className="text-muted">
                  To achieve this, it would be necessary to have uniform grammar, pronunciation and more common words. If several languages coalesce.
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            {plans && plans.map((plan, key) => (
              <Col xl={4} md={6} key={key}>
                <Card>
                  <CardBody className="p-4">
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
                        <p className="text-muted">{plan.caption}</p>
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
                          <small>₹</small>
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
