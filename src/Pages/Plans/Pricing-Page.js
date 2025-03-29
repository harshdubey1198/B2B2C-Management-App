import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { ScaleLoader } from "react-spinners";
import { getPaymentDetails } from "../../apiServices/service";
import PaymentHistoryModal from "../../Modal/paymentHistoryModal";

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
  const [loading , setLoading] = useState(false);
  const [paymentHistory , setPaymentHistory] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!modalOpen);
  
  const handlePaymentHistory = async () => {
    if (role === "client_admin") {
      try {
        const result = await getPaymentDetails();
        const sortedPayments = result.data.sort(
          (a, b) => new Date(b.paymentDate) - new Date(a.paymentDate)
        );
        setPaymentHistory(sortedPayments);
        console.log(sortedPayments);
      } catch (error) {
        console.log(error);
      }
    }
  };
  

  useEffect(() => {
    handlePaymentHistory()
  }, []);

  useEffect(() => {
    setLoading(true);
    
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      let startTime = Date.now();
  
      try {
        if (role === "firm_admin") {
          const response = await axiosInstance.get(
            `${process.env.REACT_APP_URL}/plan/firmplan/${authuser.response.adminId}`
          );
          setSelectedPlanDetails(response?.data?.adminId?.planId);
        } else {
          setShowAllPlans(false);
  
          const allPlansResponse = await axiosInstance.get(
            `${process.env.REACT_APP_URL}/plan/all`
          );
          setPlans(allPlansResponse.response);
        }
  
        if (authuser?.response?.planId) {
          const planResponse = await axios.get(
            `${process.env.REACT_APP_URL}/plan/${authuser.response.planId}`,
            config
          );
          setSelectedPlanDetails(planResponse.response);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 3000 - elapsedTime); // Ensure a minimum of 3 seconds
  
        setTimeout(() => {
          setLoading(false);
        }, remainingTime);
      }
    };
  
    fetchData();
  }, [token]);
  
  
  const handlePaymentPlan = (plan) => {
   
    const data = {
      userId: authuser.response._id,
      planId: plan._id,
      amount: plan.price,
    };

    axiosInstance
      .post(`${process.env.REACT_APP_URL}/payment/create-payment`, data)
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
          {loading ? (
            <div className="d-flex justify-content-center my-4">
              <ScaleLoader color="#0d4251" />
            </div>
              ) : (
                <>
                  {selectedPlanDetails && (
                    <Row className="justify-content-center">
                      <Col lg={8}>
                        <Card className="text-center mb-0">
                          <CardBody>
                            <h4 className="text-success">Your Current Plan</h4>
                            <h5 className="font-size-16">{selectedPlanDetails.title}</h5>
                            <p className="text-muted">{selectedPlanDetails.caption}</p>
                            <p className="text-muted">
                              Price: ₹{selectedPlanDetails.price} - {selectedPlanDetails.days} Days
                            </p>
                            <div className="plan-features mt-4 d-flex flex-column">
                              <h5 className="text-left font-size-15 mb-4">Plan Features :</h5>
                              {selectedPlanDetails.features.map((feature, index) => (
                                <p key={index} className="text-start" style={{ position: "relative", left: "50%", transform: "translateX(-10%)", }}>
                                  <i className="mdi mdi-checkbox-marked-circle-outline font-size-16 align-middle text-primary me-2"></i>
                                  {feature}
                                </p>
                              ))}
                            </div>
                            {role === "client_admin" && (
                              <Button color="info" onClick={toggleModal}>Show Payment History</Button>
                              )}
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  )}
                </>
              )}

       
        { plans.length > 0 && (
          <Row className="justify-content-center my-2">
            <Col lg={5} className="text-center">
            { role !== "super_admin" && role!=="firm_admin" && (
              <Button
                color="primary"
                onClick={() => setShowAllPlans(!showAllPlans)}
              >
                {showAllPlans ? "Hide All Plans" : "Show All Plans"}
              </Button>
              )}
            </Col>
          </Row>
        )
} 
        
        <PaymentHistoryModal
          isOpen={modalOpen}
          toggle={toggleModal}
          paymentHistory={paymentHistory}
        />
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
                          <span className="h2">₹{plan.price} - </span>
                          {/* <span className="font-size-16"></span> */}
                          <span className="h3">{plan.days} Days</span>
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
                        {/* { role !== "super_admin" && role!=="firm_admin" && (
                            <Button
                              color="primary"
                              className="mt-4"
                              onClick={() => handlePaymentPlan(plan)}
                            >
                              Choose Plan
                            </Button>x
                          )} */}

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
