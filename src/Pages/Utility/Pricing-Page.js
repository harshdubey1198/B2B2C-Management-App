import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import axios from "axios";

const Pricing = () => {
  document.title = "Pricing | aaMOBee";
  const [plans, setPlans] = useState([]);
  const [requestedPlan, setRequestedPlan] = useState(null);
  const authuser = JSON.parse(localStorage.getItem("authUser"));

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/plan/all`)
      .then((response) => {
        setPlans(response); 
      })
      .catch((error) => {
        console.log(error);
      });

    if (authuser) {
      axios.get(`${process.env.REACT_APP_URL}/clientadmin/getClient/${authuser?.response._id}`)
        .then((response) => {
          const clientAdminData = response; 
          if (clientAdminData && clientAdminData.plan) {
            localStorage.setItem("clientAdminData", JSON.stringify(clientAdminData));
            setRequestedPlan(clientAdminData.plan);
          } else {
            console.log("No plan data found in clientAdminData");
          }
        })
        .catch((error) => {
          console.log("Error fetching client admin data:", error);
        });
    }
  });

  const handleRequest = (planId) => {
    axios.post(`${process.env.REACT_APP_URL}/clientadmin/requestPlan`, {
      clientId: authuser?.response._id,
      planId: planId
    }).then((response) => {
      if (response && response.plan) {
        localStorage.setItem("clientAdminData", JSON.stringify(response));
        setRequestedPlan(response.plan);
      } else {
        console.log("No plan data returned in response");
      }
    }).catch((error) => {
      console.log("Error requesting plan:", error);
    });
  }

  const shouldShowRequestedPlan = requestedPlan &&
    requestedPlan.status &&
    requestedPlan.planId 
    console.log("Current plan status:", requestedPlan?.status);
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Utility" breadcrumbItem="Pricing" />
          <Row className="justify-content-center">
            <Col lg={5}>
              <div className="text-center mb-2">
                <h4>Choose your Pricing plan</h4>
              </div>
            </Col>
          </Row>
          <Row>
            {shouldShowRequestedPlan ?(
              <>
                {requestedPlan.status === "requested" ? (
                  <Col lg={12}>
                    <Card className="d-flex flex-column h-100">
                      <CardBody className="p-4 d-flex flex-column flex-grow-1 text-center">
                        <h5>You have requested the {requestedPlan.planId?.title} plan.</h5>
                        <p>Please wait until it gets accepted.</p>
                        <p>Status: <strong>{requestedPlan.status}</strong></p>
                      </CardBody>
                    </Card>
                  </Col>
                ) : requestedPlan.status === "active" ? (
                  <Col lg={12}>
                    <Card className="d-flex flex-column h-100 relative">
                      <CardBody className="p-4 d-flex flex-column flex-grow-1">
                        <div className="d-flex mb-1 relative">
                          <div className="flex-shrink-0 me-3">
                            <div className="avatar-sm">
                              <span className="avatar-title rounded-circle bg-primary">
                                <i className={requestedPlan.planId?.icon + " font-size-20"}></i>
                              </span>
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="font-size-16">{requestedPlan.planId?.title}</h5>
                            <p className="text-muted" style={{ wordWrap: 'break-word' }}>
                              {requestedPlan.planId?.caption}
                            </p>
                          </div>
                          <div>
                            status: <strong className="text-success">{requestedPlan.status}</strong>
                          </div>
                        </div>
                        <div className="py-4 border-bottom">
                          <h4>
                            <sup>
                              <big>₹</big>
                            </sup>{" "}
                            {requestedPlan.planId?.price}/ <span className="font-size-16">m</span>
                          </h4>
                        </div>
                        <div className="plan-features mt-4">
                          <h5 className="text-center font-size-15 mb-4">
                            Plan Features :
                          </h5>
                          {requestedPlan.planId?.features?.map((feature, index) => (
                            <p key={index}>
                              <i className="mdi mdi-checkbox-marked-circle-outline font-size-16 align-middle text-primary me-2"></i>{" "}
                              {feature}
                            </p>
                          ))}
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                ) : (
                  (requestedPlan.status === "inactive" || requestedPlan.status === "expired") && 
                  plans.map((plan, key) => (
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
                              <Button
                                color="primary"
                                className="btn btn-primary btn-sm waves-effect waves-light"
                                onClick={() => handleRequest(plan._id)}
                              >
                                Buy Now
                              </Button>
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
                  ))
                )}
              </>
            ) : (
              plans.map((plan, key) => (
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
                          <Button
                            color="primary"
                            className="btn btn-primary btn-sm waves-effect waves-light"
                            onClick={() => handleRequest(plan._id)}
                          >
                            Buy Now
                          </Button>
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
              ))
            )}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Pricing;
