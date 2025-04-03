import React from "react";
import UsePanel from "./UserPanel";
import SocialSource from "./SocialSource";
import OverView from "./OverView";
import { Row, Container, Button, Col } from "reactstrap";
import Calendar from "../Calender/index"; 
import Breadcrumbs from "../../components/Common/Breadcrumb";
import RolewiseDashboard from "./RolewiseDashboard";
import { useNavigate } from "react-router-dom";
import SelfProfiling from "../Utility/SelfProfiling";

const Dashboard = () => {
  const authuser = JSON.parse(localStorage.getItem('authUser'))?.response
  const navigate = useNavigate();
  document.title = "Dashboard | aaMOBee";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="aaMOBee" breadcrumbItem="Dashboard" />
          <Row className="mb-2">
            {/* Order Stats */}
            {/* <OrderStatus /> */}
            {/* Notifications */}
            {/* <Notifications /> */}
            {/* Revenue by Location Vector Map */}
            {/* <RevenueByLocation /> */}
            {authuser.role === "client_admin" ? (
                  <div className="row d-flex">
                    <div className="col-lg-9 col-md-12 col-sm-12">
                    <div className="row d-flex gap-2">
                    <div className="col-lg-3 col-md-3 col-sm-12 mb-0 p-0">
                      <Button className="w-100 cust-btn-primary" color="primary" onClick={() => navigate('/create-firm')}>
                          Create Firm 
                      </Button>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12 mb-0 p-0">
                      <Button className="w-100 cust-btn-primary" color="primary" onClick={() => navigate('/pricing')}>
                          Pricing & plans 
                      </Button>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12 mb-0 p-0">
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
                  <div className="d-flex justify-content-evenly">
                    <Button color="primary" onClick={() => navigate('/add-inventory')}>
                        Create Inventory
                    </Button>                  
                  </div>
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
          <Row style={{marginBottom:"20px"}}>
            <Col sm="12" md="6" lg="6" className="p-0">  
              <Calendar />
            </Col>
            <Col sm="12" md="6" lg="6">
              <SelfProfiling /> 
            </Col>
          </Row>

        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
