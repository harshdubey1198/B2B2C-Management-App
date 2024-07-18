import React from "react";
import { Link } from "react-router-dom";

import { Container, Col, Row, Card, CardBody, CardTitle } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const UiBreadcrumb = () => {
  document.title = "Breadcrumb | aaMOBee - React Admin & Dashboard Template";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="UI Elements" breadcrumbItem="Breadcrumb" />

          <Row>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle>Example</CardTitle>
                  <p className="card-title-desc">
                    Use an ordered or unordered list with linked list items to
                    create a minimally styled breadcrumb. Use our utilities to
                    add additional styles as desired.
                  </p>

                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb bg-light rounded">
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Home
                      </li>
                    </ol>
                  </nav>

                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb bg-light rounded">
                      <li className="breadcrumb-item">
                        <Link to="#">Home</Link>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Library
                      </li>
                    </ol>
                  </nav>

                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb bg-light rounded">
                      <li className="breadcrumb-item">
                        <Link to="#">Home</Link>
                      </li>
                      <li className="breadcrumb-item">
                        <Link to="#">Library</Link>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Data
                      </li>
                    </ol>
                  </nav>

                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb bg-light rounded">
                      <li className="breadcrumb-item">
                        <Link to="#">
                          <i className="ri-home-5-fill"></i>
                        </Link>
                      </li>
                      <li className="breadcrumb-item">
                        <Link to="#">Base UI</Link>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        General
                      </li>
                    </ol>
                  </nav>
                </CardBody>
              </Card>
            </Col>

            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle>Dividers</CardTitle>

                  <p className="card-title-desc">
                    We default to our Sass variable, which is set as a fallback
                    to the custom property. For example, using <code>&gt;</code>
                    , <code>/</code> & <code>|</code> as the dividers
                  </p>

                  <ol className="breadcrumb bg-light rounded">
                    <li className="breadcrumb-item">
                      <Link to="#">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Library
                    </li>
                  </ol>

                  <ol className="breadcrumb bg-light rounded">
                    <li className="breadcrumb-item">
                      <Link to="#">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Library
                    </li>
                  </ol>

                  <ol className="breadcrumb bg-light rounded">
                    <li className="breadcrumb-item">
                      <Link to="#">Home </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="#">Library</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Data
                    </li>
                  </ol>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle>Dividers</CardTitle>

                  <ol className="breadcrumb bg-light rounded">
                    <li className="breadcrumb-item">
                      <Link to="#">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Library
                    </li>
                  </ol>

                  <ol className="breadcrumb bg-light rounded">
                    <li className="breadcrumb-item">
                      <Link to="#">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="#">Library</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Data
                    </li>
                  </ol>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UiBreadcrumb;
