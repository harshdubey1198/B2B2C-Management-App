import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";

import RadialChart1 from "./userpanelChart1";
import RadialChart2 from "./userpanelChart2";
import RadialChart3 from "./userpanelChart3";

const UserPanel = () => {
  return (
    <React.Fragment>
      <Row>
        <Col xl={3} sm={6}>
          <Card>
            <CardBody>
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <div id="radialchart-1" className="apex-charts" dir="ltr">
                    <RadialChart1 />
                  </div>
                </div>

                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Users</p>
                  <h5 className="mb-3">2.2k</h5>
                  <p className="text-truncate mb-0">
                    <span className="text-success me-2">
                      {" "}
                      0.02%{" "}
                      <i className="ri-arrow-right-up-line align-bottom ms-1"></i>
                    </span>{" "}
                    From previous
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col xl={3} sm={6}>
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
                  <p className="mb-1">Views per minute</p>
                  <h5 className="mb-3">50</h5>
                  <p className="text-truncate mb-0">
                    <span className="text-success me-2">
                      {" "}
                      1.7%{" "}
                      <i className="ri-arrow-right-up-line align-bottom ms-1"></i>
                    </span>{" "}
                    From previous
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col xl={3} sm={6}>
          <Card>
            <CardBody>
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <RadialChart3
                    id="radialchart-3"
                    className="apex-charts"
                    dir="ltr"
                  />
                </div>

                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Bounce Rate</p>
                  <h5 className="mb-3">24.03 %</h5>
                  <p className="text-truncate mb-0">
                    <span className="text-danger me-2">
                      {" "}
                      0.01%{" "}
                      <i className="ri-arrow-right-down-line align-bottom ms-1"></i>
                    </span>{" "}
                    From previous
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col xl={3} sm={6}>
          <Card>
            <CardBody>
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <div className="avatar-sm">
                    <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                      <i className="ri-group-line"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">New Visitors</p>
                  <h5 className="mb-3">435</h5>
                  <p className="text-truncate mb-0">
                    <span className="text-success me-2">
                      {" "}
                      0.01%{" "}
                      <i className="ri-arrow-right-up-line align-bottom ms-1"></i>
                    </span>{" "}
                    From previous
                  </p>
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
