import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";

const Pricing = () => {
  document.title = "Pricing | aaMOBee";
  const [plans, setPlans] = useState([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false); 
  const authuser = JSON.parse(localStorage.getItem("authUser"));
  const token = authuser?.token; 
  console.log(authuser, "authuser")
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios.get(`${process.env.REACT_APP_URL}/plan/all`, config)
      .then((response) => {
        setPlans(response.response); 
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  const handlePaymentPlan = (plan) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = {
      userId: authuser.response._id,
      planId: plan._id,
      amount: plan.price
    };
    
    axios.post(`${process.env.REACT_APP_URL}/payment/create-payment`, data, config)
      .then((response) => {
        toast.success("Payment has been done successfully");
        setPaymentSuccess(true); 
      })
      .catch((error) => {
        toast.error("Error creating payment");
        console.log(error);
      });
  };

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

          {/* Check if payment is successful */}
          {paymentSuccess ? (
            <Row className="justify-content-center">
              <Col lg={8}>
                <Card className="text-center">
                  <CardBody>
                    <h4 className="text-success">Congratulations!</h4>
                    <p className="text-muted">
                      You have successfully completed the payment for the selected plan. Enjoy the benefits of your plan and start exploring our services.
                    </p>
                    <Button color="primary" onClick={() => window.location.reload()}>
                      Back to Dashboard
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          ) : (
            <Row>
              {plans.map((plan, key) => (
                <Col xl={4} md={6} key={key}>
                  <Card className="d-flex flex-column h-100">
                    <CardBody className="p-4 d-flex flex-column flex-grow-1">
                      <div className="text-left">
                        <div className="d-flex mb-1 pt-3" style={{minHeight:"120px"}}>
                          <div className="flex-shrink-0 me-3 ">
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
                        <div className="py-2">
                          <span className="h2">${plan.price}</span>
                          <span className="font-size-16">/month</span>
                        </div>
                        <div className="plan-features mt-4">
                          <h5 className="text-left font-size-15 mb-4">
                            Plan Features :
                          </h5>
                          {plan.features.map((feature, index) => (
                            <p key={index}>
                              <i className="mdi mdi-checkbox-marked-circle-outline font-size-16 align-middle text-primary me-2"></i>{" "}
                              {feature}
                            </p>
                          ))}
                        </div>
                        <Button
                          color="primary"
                          className="mt-4"
                          onClick={() => handlePaymentPlan(plan)}  // Pass the plan object to the function
                        >
                          Choose Plan
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Pricing;
