import React from "react";
import UsePanel from "./UserPanel";
import SocialSource from "./SocialSource";
import OverView from "./OverView";
import { Row, Container, Button } from "reactstrap";

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
          {/* User Panel Charts */}
          <RolewiseDashboard/>
          <UsePanel />

          
          <Row className="mb-4">
            {/* Order Stats */}
            {/* <OrderStatus /> */}
            {/* Notifications */}
            {/* <Notifications /> */}
            {/* Revenue by Location Vector Map */}
            {/* <RevenueByLocation /> */}
            {authuser.role === "client_admin" ? (
                  <div className="d-flex justify-content-evenly">
                    <Button color="primary" onClick={() => navigate('/create-firm')}>
                        Create Firm
                    </Button>
                    <Button color="primary" onClick={() => navigate('/pricing')}>
                        Pricing & plans 
                    </Button>
                    <Button color="primary" onClick={() => navigate('/view-invoices')}>
                        Invoices
                    </Button>    
                  </div>
              ) : authuser.role === "firm_admin" ? (
                  <Button color="primary" onClick={() => navigate('/firmusers')}>
                      Create User
                  </Button>
              ) : authuser.role === "accountant" ? (
                  <Button color="primary" onClick={() => navigate('/add-inventory')}>
                      Create Inventory
                  </Button>
              ) : authuser.role === "employee" ? (
                  <Button color="primary" onClick={() => navigate('/create-invoice')}>
                      Create Invoice
                  </Button>
              ) : null}        
          </Row>

          <Row>
            {/* Overview Chart */}
            <OverView />
            {/* Social Source Chart */}
            <SocialSource />
          </Row>

          {/* Latest Transaction Table */}
          {/* <LatestTransation /> */}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
