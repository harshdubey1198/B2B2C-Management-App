import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, } from "reactstrap";
import threeDImage from "../assets/3d-image.png";
import establishedIcon from "../assets/established-icon.png";
import growingIcon from "../assets/growing-icon.png";
import startUpRocket from "../assets/startup-rocket.png";
import threeLines from "../assets/three-lines.png";
import invertedThreeLines from "../assets/three-lines-inverted.png";
import { getAllPlans } from "../../../apiServices/service";
import { useNavigate } from "react-router-dom";

function Bookkeeping() {
  const [modal, setModal] = useState(false);
  const [plans, setPlans] = useState([]);
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState();
  const toggleModal = () => setModal(!modal);
  const navigate = useNavigate();

  const fetchPlans = async () => {
    try {
      const response = await getAllPlans();
      if (Array.isArray(response)) {
        setPlans(response);
      } else if (response && Array.isArray(response)) {
        setPlans(response); 
      } else {
        setPlans([]); 
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  
  const handlePlanSelection = (setPlanId,setEmail) => {
    localStorage.setItem("planId", setPlanId);
    localStorage.setItem("emailForRegister", setEmail);

    // console.log("Plan selected:", setPlanId);
    toggleModal();
    setTimeout(() => {
      navigate("/register");
    }, 3000);

  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const planId = document.getElementById("planId").value;
    const message = document.getElementById("message").value;
  
    // Ensure a plan is selected
    if (!planId) {
      alert("Please select a plan.");
      return;
    }
  
    const data = {
      name,
      email,
      planId,
      message,
    };
  
    handlePlanSelection(planId, email);
  };
  
  

  return (
    <div className="services-container" id="bookkeeping">
      <span className="service-heading">
        <img
          className="headingimg"
          loading="lazy"
          src={threeLines}
          alt="Three lines"
        />
        List of Bookkeeping Services We’re Offer
        <img
          src={invertedThreeLines}
          loading="lazy"
          alt="Inverted three lines"
          className="headingimg"
        />
      </span>

      <div className="service-outbox">
        <div className="service-box">
          <div className="sb-h1">
            <img
              src={startUpRocket}
              loading="lazy"
              alt="Startup rocket"
              className="sb-img"
            />
            <span className="sb-heading">Start-Up</span>
          </div>
          <ul className="sb-ul">
            <li>Dedicated Bookkeeper</li>
            <li>Highly Experienced Accountant</li>
            <li>Bank & CC Reconciliation</li>
            <li>Accounts Payable & Receivable Function</li>
            <li>Payroll Calculation & TDS/PF/ESI Payments</li>
            <li>Filing Of TDS Return</li>
            <li>Filing of GST Return</li>
            <li>Filing Yearly Tax Return</li>
            <li>Monthly Balance Sheet, Profit & Loss Report</li>
          </ul>
          <button className="sb-quote btn btn-primary" onClick={toggleModal}>
            Get a Quote
          </button>
        </div>

        <div className="service-box">
          <div className="sb-h2">
            <span className="sb-heading">Growing</span>
            <img
              src={growingIcon}
              loading="lazy"
              alt="Growing icon"
              className="sb-img"
            />
          </div>
          <ul className="sb-ul">
            <li>Dedicated Bookkeeper</li>
            <li>Highly Experienced Accountant</li>
            <li>Bank & CC Reconciliation</li>
            <li>Accounts Payable & Receivable Function</li>
            <li>Payroll Calculation & TDS/PF/ESI Payments</li>
            <li>Filing Of TDS Return</li>
            <li>Filing of GST Return</li>
            <li>Filing Yearly Tax Return</li>
            <li>Monthly Balance Sheet, Profit & Loss Report</li>
          </ul>
          <button className="sb-quote btn btn-primary" onClick={toggleModal}>
            Get a Quote
          </button>
        </div>

        <div className="service-box">
          <div className="sb-h3">
            <span className="sb-heading">Established</span>
            <img
              src={establishedIcon}
              loading="lazy"
              alt="Established icon"
              className="sb-img"
            />
          </div>
          <ul className="sb-ul">
            <li>Dedicated Bookkeeper</li>
            <li>Highly Experienced Accountant</li>
            <li>Bank & CC Reconciliation</li>
            <li>Accounts Payable & Receivable Function</li>
            <li>Payroll Calculation & TDS/PF/ESI Payments</li>
            <li>Filing Of TDS Return</li>
            <li>Filing of GST Return</li>
            <li>Filing Yearly Tax Return</li>
            <li>Monthly Balance Sheet, Profit & Loss Report</li>
          </ul>
          <button className="sb-quote btn btn-primary" onClick={toggleModal}>
            Get a Quote
          </button>
        </div>
      </div>

      <div className="cloud-solution">
        <div className="cld-heading">
          The company that leaders trust to help them grow and thrive.
        </div>
        <div className="subheading">Who we are</div>
        <div className="cld-p1">Cloud solutions for every business</div>
        <div className="cld-p2">
          As the market leader in enterprise application software, we’re helping
          companies of all sizes and in all industries run better by redefining
          ERP.
        </div>
        <a className="cld-btn" href="#">
          Get Started with Cloud <i className="fa fa-angle-right"></i>
        </a>
        <img
          src={threeDImage}
          alt="3D illustration"
          loading="lazy"
          className="cloud-img"
        />
      </div>

      {/* Modal Component */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Get a Quote</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleFormSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="Enter your name"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="planId" >Select Plan</Label>
              <Input type="select" id="planId" required>

                <option value="">Select Plan</option>
                {Array.isArray(plans) && plans.length > 0 ? (
                    plans.map((plan) => (
                      <option key={plan._id} value={plan._id}>
                        {plan.title} - {plan.price} ₹ - {plan.days} Days
                      </option>
                    ))
                  ) : (
                    <option disabled>No Plans Available</option>
                  )}

              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="message">Message</Label>
              <Input
                type="textarea"
                id="message"
                placeholder="Enter your message"
                required
              />
            </FormGroup>
            <Button color="primary" type="submit">
              Submit
            </Button>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Bookkeeping;
