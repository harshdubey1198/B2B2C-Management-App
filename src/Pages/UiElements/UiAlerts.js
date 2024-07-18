import React, { useRef } from "react";
import { Link } from "react-router-dom";

import { Container, Col, Row, Card, CardBody, CardTitle, CardSubtitle, UncontrolledAlert } from "reactstrap";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const UiAlerts = () => {
  document.title = "Alerts | aaMOBee - React Admin & Dashboard Template";

  const alertPlaceholderRef = useRef(null);

  const alert = (message, type) => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `<div class="alert alert-${type} alert-dismissible" role="alert">${message}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
    alertPlaceholderRef.current.appendChild(wrapper);
  };

  const handleAlertClick = () => {
    alert('Nice, you triggered this alert message!', 'success');
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="UI Elements" breadcrumbItem="Alerts" />

          <Row>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle>Examples</CardTitle>
                  <p className="card-title-desc">
                    Alerts are available for any length of text, as well as an
                    optional dismiss button. For proper styling, use one of
                    the four <strong>required</strong> contextual classes
                    (e.g., <code>.alert-success</code>). For inline dismissal,
                    use the alerts jQuery plugin.
                  </p>

                  <div>
                    <div className="alert alert-primary" role="alert">
                      A simple primary alert
                    </div>
                    <div className="alert alert-success" role="alert">
                      A simple success alert
                    </div>
                    <div className="alert alert-info" role="alert">
                      A simple info alert
                    </div>
                    <div className="alert alert-warning" role="alert">
                      A simple warning alert
                    </div>
                    <div className="alert alert-danger mb-0" role="alert">
                      A simple danger alert
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle>Link color</CardTitle>
                  <p className="card-title-desc">
                    Use the <code>.alert-link</code> utility class to quickly
                    provide matching colored links within any alert.
                  </p>

                  <div className="">
                    <div className="alert alert-primary" role="alert">
                      A simple primary alert with{" "}
                      <Link to="/#" className="alert-link">
                        an example link
                      </Link>
                      . Give it a click if you like.
                    </div>
                    <div className="alert alert-success" role="alert">
                      A simple success alert with{" "}
                      <Link to="/#" className="alert-link">
                        an example link
                      </Link>
                      . Give it a click if you like.
                    </div>
                    <div className="alert alert-info" role="alert">
                      A simple info alert with{" "}
                      <Link to="/#" className="alert-link">
                        an example link
                      </Link>
                      . Give it a click if you like.
                    </div>
                    <div className="alert alert-warning" role="alert">
                      A simple warning alert with{" "}
                      <Link to="/#" className="alert-link">
                        an example link
                      </Link>
                      . Give it a click if you like.
                    </div>
                    <div className="alert alert-danger mb-0" role="alert">
                      A simple danger alert with{" "}
                      <Link to="/#" className="alert-link">
                        an example link
                      </Link>
                      . Give it a click if you like.
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-2">Dismissing </CardTitle>
                  <CardSubtitle className="mb-4">
                    You can see this in action with a live demo:
                  </CardSubtitle>

                  <div className="">
                    <UncontrolledAlert color="success">
                      <strong>Well done!</strong> You successfully read this important alert message.
                    </UncontrolledAlert>
                    <UncontrolledAlert color="info" role="alert">
                      <strong>Heads up!</strong> This alert needs your attention, but it's not super important.
                    </UncontrolledAlert>
                    <UncontrolledAlert color="warning" role="alert">
                      <strong>Warning!</strong> Better check yourself, you're not looking too good.
                    </UncontrolledAlert>
                    <UncontrolledAlert color="danger" role="alert">
                      <strong>Oh snap!</strong> Change a few things up and try submitting again.
                    </UncontrolledAlert>

                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle>Card Alerts</CardTitle>
                  <p className="card-title-desc">
                    Alerts can also contain additional HTML elements like
                    icons, headings and paragraphs in card.
                  </p>

                  <Row>

                    <Col lg={6}>

                      <UncontrolledAlert color="light" role="alert" className="card border p-0 mb-0">
                        <div className="card-header bg-success-subtle">
                          <div className="d-flex">
                            <div className="flex-grow-1">
                              <h5 className="font-size-16 text-success my-1">
                                Success Alert
                              </h5>
                            </div>
                            <div className="flex-shrink-0">

                            </div>
                          </div>
                        </div>

                        <CardBody>
                          <div className="text-center">
                            <div className="mb-4">
                              <i className="mdi mdi-checkbox-marked-circle-outline display-4 text-success"></i>
                            </div>
                            <h4 className="alert-heading">Well done!</h4>
                            <p className="mb-0">
                              Placed your Order successfully
                            </p>
                          </div>
                        </CardBody>
                      </UncontrolledAlert>
                    </Col>
                    <Col lg={6}>
                      <UncontrolledAlert color="light" role="alert" className="card border mt-4 mt-lg-0 p-0 mb-0">

                        <div className="card-header bg-danger-subtle">
                          <div className="d-flex">
                            <div className="flex-grow-1">
                              <h5 className="font-size-16 text-danger my-1">
                                Danger Alert
                              </h5>
                            </div>
                            <div className="flex-shrink-0">

                            </div>
                          </div>
                        </div>
                        <CardBody>
                          <div className="text-center">
                            <div className="mb-4">
                              <i className="mdi mdi-alert-outline display-4 text-danger"></i>
                            </div>
                            <h4 className="alert-heading">
                              Something went wrong
                            </h4>
                            <p className="mb-0">
                              Sorry ! Product not available
                            </p>
                          </div>
                        </CardBody>
                      </UncontrolledAlert>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>

            <Col xl={6}>
              <Card>
                <CardBody>
                  <CardTitle>Live Example</CardTitle>
                  <p className="card-title-desc">Click the button below to show an alert (hidden with inline
                    styles to start), then dismiss (and destroy) it with the built-in close button.</p>

                  <div className="">
                    <div ref={alertPlaceholderRef} id="liveAlertPlaceholder"></div>
                    <button type="button" className="btn btn-primary" id="liveAlertBtn" onClick={handleAlertClick}>Show live
                      alert</button>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xl={6}>
              <Card>
                <CardBody>
                  <CardTitle>Additional content</CardTitle>
                  <p className="card-title-desc">
                    Alerts can also contain additional HTML elements like
                    headings, paragraphs and dividers.
                  </p>

                  <div className="">
                    <div className="alert alert-success" role="alert">
                      <h4 className="alert-heading">Well done!</h4>
                      <p>
                        Aww yeah, you successfully read this important alert
                        message. This example text is going to run a bit
                        longer so that you can see how spacing within an alert
                        works with this kind of content.
                      </p>
                      <hr />
                      <p className="mb-0">
                        Whenever you need to, be sure to use margin utilities
                        to keep things nice and tidy.
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UiAlerts;
