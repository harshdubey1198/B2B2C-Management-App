import React from "react";
import UsePanel from "./UserPanel";
import SocialSource from "./SocialSource";
import OverView from "./OverView";
import { Row, Container, Button, Col } from "reactstrap";
import Calendar from "../Calender/index"; 
import Breadcrumbs from "../../components/Common/Breadcrumb";
import RolewiseDashboard from "./RolewiseDashboard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const authuser = JSON.parse(localStorage.getItem('authUser'))?.response
  const navigate = useNavigate();
  document.title = "Dashboard | aaMOBee";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="aaMOBee" breadcrumbItem="Dashboard" />
          <Row className="mb-4">
            {/* Order Stats */}
            {/* <OrderStatus /> */}
            {/* Notifications */}
            {/* <Notifications /> */}
            {/* Revenue by Location Vector Map */}
            {/* <RevenueByLocation /> */}
            {authuser.role === "client_admin" ? (
                  <div className="row d-flex">
                    <div className="col-lg-9 col-md-12 col-sm-12">
                    <div className="row d-flex">
                    <div className="col-lg-3 col-md-3 col-sm-12 mb-3">
                      <Button className="w-100 cust-btn-primary" color="primary" onClick={() => navigate('/create-firm')}>
                          Create Firm
                      </Button>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12 mb-3">
                      <Button className="w-100 cust-btn-primary" color="primary" onClick={() => navigate('/pricing')}>
                          Pricing & plans 
                      </Button>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12 mb-3">
                      <Button className="w-100 cust-btn-primary" color="primary" onClick={() => navigate('/view-invoices')}>
                          Invoices
                      </Button>  
                    </div>
                    </div>
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12">

                    </div>
                  </div>
              ) : authuser.role === "firm_admin" ? (
                  <div className="d-flex justify-content-evenly">
                  <Button color="primary" onClick={() => navigate('/firmusers')}>
                      Create User
                  </Button>
                  <Button color="primary" onClick={() => navigate('/add-inventory')}>
                      Create Inventory
                  </Button>
                  <Button color="primary" onClick={() => navigate('/view-invoices')}>
                      Invoices
                  </Button>    
                  <Button color="primary" onClick={() => navigate('/manage-category')}>
                      Manage Category
                  </Button>
                  </div>
              ) : authuser.role === "accountant" ? (
                 <div className="d-flex justify-content-evenly">

                  <Button color="primary" onClick={() => navigate('/add-inventory')}>
                      Create Inventory
                  </Button>
                  <Button color="primary" onClick={() => navigate('/create-invoice')}>
                      Create Invoice
                  </Button>
                  </div>
              ) : authuser.role === "employee" ? (
                  <Button color="primary" onClick={() => navigate('/create-invoice')}>
                      Create Invoice
                  </Button>
              ) : null}        
          </Row>
          <RolewiseDashboard/>
          <UsePanel />
            {/* Social Source Chart */}
            {/* Overview Chart */}
          {/* <Row>
            <OverView />
            <SocialSource />
          </Row> */}

          {/* Latest Transaction Table */}
          {/* <LatestTransation /> */}
          <Row>
           <Col sm="12" md="6" lg="6">  
          <Calendar />
          </Col>
          </Row>

        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
