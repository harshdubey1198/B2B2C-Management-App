import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import axios from "axios";
import RadialChart1 from "./userpanelChart1";
import RadialChart2 from "./userpanelChart2";

const UserPanel = () => {
  const [userCount, setUserCount] = useState(0); 
  const [invoiceCount, setInvoiceCount] = useState(0)
  const authuser = JSON.parse(localStorage.getItem("authUser"));
  const token = authuser?.token;
  const userId = authuser?.response?._id;
  const firmId = authuser?.response?.adminId;
  const role = authuser?.response?.role;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  };
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const body = {
          role: role,
          userId: userId,
        };

        const response = await axios.post(
          `${process.env.REACT_APP_URL}/auth/count-company`, body, config
        );
        setUserCount(response.count.data); 
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    fetchUserCount(); 
  }, [token, userId]);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/invoice/count-invoices/${firmId}`,config);
        setInvoiceCount(response.data); 
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };
    if(role === "firm_admin" || role === "accountant" || role === "employee") {
      fetchUserCount()
    }
  },[])

  return (
    <React.Fragment>
      <Row>
        <Col xl={6} sm={6}>
          <Card style={{marginBottom:"0px"}}>
            <CardBody>
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <div id="radialchart-1" className="apex-charts" dir="ltr">
                    <RadialChart1 />
                  </div>
                </div>

                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Users</p>
                  <h5 className="mb-3">{userCount}</h5>
                  <p className="text-truncate mb-0">
                    <span className="text-success me-2">
                      0.02%
                      <i className="ri-arrow-right-up-line align-bottom ms-1"></i>
                    </span>
                    From previous
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col xl={6} sm={6}>
          <Card>
            <CardBody>
              <div className="d-flex">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <RadialChart2
                    id="radialchart-2"
                    className="apex-charts"
                    dir="ltr"
                  />
                </div>

                <div className="flex-grow-1 overflow-hidden">
                  {
                    role === "firm_admin" || role === "accountant" || role === "employee" ? (
                      <>
                      <p className="mb-1">Total Invoices</p>
                      <h5 className="mb-3">{invoiceCount}</h5><p className="text-truncate mb-0">
                        <span className="text-success me-2">
                          1.7%
                          <i className="ri-arrow-right-up-line align-bottom ms-1"></i>
                        </span>
                        From previous
                      </p>
                      </>
                    ) : (
                      <>
                      <p className="mb-1">Views per minute</p>
                      <h5 className="mb-3">50</h5>
                      <p className="text-truncate mb-0">
                        <span className="text-success me-2">
                          1.7%
                          <i className="ri-arrow-right-up-line align-bottom ms-1"></i>
                        </span>
                        From previous
                      </p>
                      </>
                    )
                  }
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default UserPanel;
