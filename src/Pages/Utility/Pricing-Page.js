import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  document.title = "Pricing | aaMOBee";

  const [plans, setPlans] = useState([]); 
  const [selectedPlanDetails, setSelectedPlanDetails] = useState(null); 
  const [showAllPlans, setShowAllPlans] = useState(false); 
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [clientAdmin, setClientAdmin] = useState(null);
  const [adminId , setAdminId] = useState(null);
  const [adminPlan , setAdminPlan] = useState(null);
  const navigate = useNavigate();
  const authuser = JSON.parse(localStorage.getItem("authUser"));
  const role = authuser?.response?.role;
  const token = authuser?.token;
  

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

     if (role === "firm_admin") {
      
      axios
      .get(`${process.env.REACT_APP_URL}/plan/firmplan/${authuser.response.adminId}`, config)
      .then((response) => {
        setSelectedPlanDetails(response?.data?.adminId?.planId);  
        // console.log("Client admin's plan details:", response?.data?.adminId?.planId);
      })
      .catch((error) => {
        console.log("Error fetching selected plan details:", error);
      });
  } else {
    setShowAllPlans(true);
    }


if ( role !== "firm_admin") {
    axios
      .get(`${process.env.REACT_APP_URL}/plan/all`, config)
      .then((response) => {
        setPlans(response.response); 
      })
      .catch((error) => {
        console.log("Error fetching plans:", error);
      });

    if (authuser?.response?.planId) {
      axios
        .get(`${process.env.REACT_APP_URL}/plan/${authuser.response.planId}`, config)
        .then((response) => {
          setSelectedPlanDetails(response.response); 
        })
        .catch((error) => {
          console.log("Error fetching selected plan details:", error);
        });
    } else {
      setShowAllPlans(true);
    }
  }
   
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
      amount: plan.price,
    };

    axios
      .post(`${process.env.REACT_APP_URL}/payment/create-payment`, data, config)
      .then(() => {
        toast.success("Payment has been done successfully");
        setPaymentSuccess(true);

        const updatedAuthUser = {
          ...authuser,
          response: { ...authuser.response, planId: plan._id },
        };
        localStorage.setItem("authUser", JSON.stringify(updatedAuthUser));

        setSelectedPlanDetails(plan); 
      })
      .catch((error) => {
        toast.error("Error creating payment");
        console.log("Error creating payment:", error);
      });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Utility" breadcrumbItem="Pricing" />

          {selectedPlanDetails && (
            <Row className="justify-content-center">
              <Col lg={8}>
                <Card className="text-center">
                  <CardBody>
                    <h4 className="text-success">Your Current Plan</h4>
                    <h5 className="font-size-16">{selectedPlanDetails.title}</h5>
                    <p className="text-muted">{selectedPlanDetails.caption}</p>
                    <p className="text-muted">Price: ${selectedPlanDetails.price}/month</p>
                    <div className="plan-features mt-4 d-flex flex-column">
                      <h5 className="text-left font-size-15 mb-4">Plan Features :</h5>
                      {selectedPlanDetails.features.map((feature, index) => (
                        <p key={index} className="text-start" style={{ position: "relative", left: "50%", transform: "translateX(-8%)", }} >
                          <i className="mdi mdi-checkbox-marked-circle-outline font-size-16 align-middle text-primary me-2"></i>
                          {feature}
                        </p>
                      ))}
                    </div>
                    <Button color="primary" onClick={() => navigate('/dashboard')}>
                      Back to Dashboard
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
        { plans.length > 0 && (
          

          <Row className="justify-content-center my-2">
            <Col lg={5} className="text-center">
            { role !== "super_admin" && role!=="firm_admin" && (
              <Button
                color="secondary"
                onClick={() => setShowAllPlans(!showAllPlans)}
              >
                {showAllPlans ? "Hide All Plans" : "Show All Plans"}
              </Button>
              )}
            </Col>
          </Row>
        )
} 

          {/* {role === "firm_admin" && (
            <Row className="justify-content-center">
              <Col lg={8} className="text-center">
                <Card>
                  <CardBody>
                    <h4 className="text-success">Your Client Admin's Plan</h4>
                    <h5 className="font-size-16">{clientAdmin?.title}</h5>
                    <p className="text-muted">{clientAdmin?.caption}</p>
                    <p className="text-muted">Price: ${clientAdmin?.price}/month</p>
                    <div className="plan-features mt-4">
                      <h5 className="text-left font-size-15 mb-4">Plan Features :</h5>
                      {clientAdmin?.features.map((feature, index) => (
                        <p key={index}>
                          <i className="mdi mdi-checkbox-marked-circle-outline font-size-16 align-middle text-primary me-2"></i>
                          {feature}
                        </p>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )} */}

          {role!=="firm_admin" && showAllPlans && (
            <Row className="justify-content-center">
              <div className="text-center mb-2">
                <h4>Choose your Pricing plan</h4>
              </div>
              {plans.map((plan, key) => (
                <Col xl={4} md={6} key={key} className="mb-2">
                  <Card className="d-flex flex-column h-100">
                    <CardBody className="p-4 d-flex flex-column flex-grow-1">
                      <div className="text-left">
                        <div className="d-flex mb-1 pt-3" style={{ minHeight: "120px" }}>
                          <div className="flex-shrink-0 me-3 ">
                            <div className="avatar-sm">
                              <span className="avatar-title rounded-circle bg-primary">
                                <i className={plan.icon + " font-size-20"}></i>
                              </span>
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="font-size-16">{plan.title}</h5>
                            <p className="text-muted" style={{ wordWrap: "break-word" }}>
                              {plan.caption}
                            </p>
                          </div>
                        </div>
                        <div className="py-2">
                          <span className="h2">${plan.price}</span>
                          <span className="font-size-16">/month</span>
                        </div>
                        <div className="plan-features mt-4">
                          <h5 className="text-left font-size-15 mb-4">Plan Features :</h5>
                          {plan.features.map((feature, index) => (
                            <p key={index}>
                              <i className="mdi mdi-checkbox-marked-circle-outline font-size-16 align-middle text-primary me-2"></i>{" "}
                              {feature}
                            </p>
                          ))}
                        </div>
                        { role !== "super_admin" && role!=="firm_admin" && (
                            <Button
                              color="primary"
                              className="mt-4"
                              onClick={() => handlePaymentPlan(plan)}
                            >
                              Choose Plan
                            </Button>
                          )}

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
