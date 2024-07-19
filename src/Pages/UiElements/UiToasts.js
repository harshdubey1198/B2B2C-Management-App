import React, { useState } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
  Button,
  Toast,
  ToastHeader,
  ToastBody,
} from "reactstrap";

import logo from "../../assets/images/logo-sm.png";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
const UiToasts = () => {
  document.title = "Toast | aaMOBee";

  const [toast, settoast] = useState(false);
  const [toast1, settoast1] = useState(false);
  const [toast2, settoast2] = useState(false);
  const [toast3, settoast3] = useState(false);
  const [toast4, settoast4] = useState(false);
  const [toast5, settoast5] = useState(true);
  const [toast6, settoast6] = useState(true);
  const [toast7, settoast7] = useState(true);

  const toggleToast = () => {
    settoast(!toast);
  };

  const toggleToast1 = () => {
    settoast1(!toast1);
  };

  const toggleToast2 = () => {
    settoast2(!toast2);
  };

  const toggleToast3 = () => {
    settoast3(!toast3);
  };

  const toggleToast4 = () => {
    settoast4(!toast4);
  };

  const toggleToast5 = () => {
    settoast5(!toast5);
  };

  const toggleToast6 = () => {
    settoast6(!toast6);
  };

  const toggleToast7 = () => {
    settoast7(!toast7);
  };



  const [selectedPosition, setSelectedPosition] = useState('');

  const handleSelectChange = (event) => {
    setSelectedPosition(event.target.value);
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="UI Elements" breadcrumbItem="Toasts" />
          <Row>
            <Col xl={12}>
              <Card>
                <CardBody>
                  <CardTitle>Live Example</CardTitle>
                  <p className="card-title-des">
                    Click the button below to show a toast (positioned with our
                    utilities in the lower right corner) that has been hidden by
                    default.
                  </p>

                  <Button
                    type="button"
                    color="primary"
                    id="liveToastBtn"
                    className="me-2"
                    onClick={toggleToast4}
                  >
                    Show Live Toast
                  </Button>

                  <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: "11" }}>
                    <Toast isOpen={toast4}>
                      <ToastHeader toggle={toggleToast4}>
                        <img src={logo} alt="" className="me-2" height="18" />
                        aaMOBee
                      </ToastHeader>
                      <ToastBody color="primary">
                        Hello, world! This is a toast message.
                      </ToastBody>
                    </Toast>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xl={6}>
              <Card>
                <CardBody>
                  <CardTitle>Basic Toast</CardTitle>
                  <p className="card-title-desc">
                    Toasts are as flexible as you need and have very little
                    required markup. At a minimum, we require a single element
                    to contain your “toasted” content and strongly encourage a
                    dismiss button.
                  </p>

                  <div style={{ minHeight: "110px" }}>
                    <Toast>
                      <ToastHeader>
                        <img src={logo} alt="" className="me-2" height="18" />
                        aaMOBee
                      </ToastHeader>
                      <ToastBody>
                        Hello, world! This is a toast message.
                      </ToastBody>
                    </Toast>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xl={6}>
              <Card>
                <CardBody>
                  <CardTitle>Translucent</CardTitle>
                  <p className="card-title-desc">
                    Toasts are slightly translucent, too, so they blend over
                    whatever they might appear over. For browsers that support
                    the <code>backdrop-filter</code> CSS property, we'll also
                    attempt to blur the elements under a toast.
                  </p>
                  <div style={{ minHeight: "110px" }}>
                    <Toast isOpen={toast5}>
                      <ToastHeader toggle={toggleToast5}>
                        <img src={logo} alt="" className="me-2" height="18" />
                        <strong className="me-auto">aaMOBee</strong>
                        <small
                          className="text-muted"
                          style={{ marginLeft: "165px", fontWeight: "500" }}
                        >
                          11 min ago
                        </small>
                      </ToastHeader>
                      <ToastBody color="primary">
                        Hello, world! This is a toast message.
                      </ToastBody>
                    </Toast>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xl={6}>
              <Card>
                <CardBody>
                  <CardTitle>Stacking</CardTitle>
                  <p className="card-title-desc">
                    For systems that generate more notifications, consider using
                    a wrapping element so they can easily stack.
                  </p>

                  <div style={{ minHeight: "230px" }}>
                    <div
                      aria-live="polite"
                      aria-atomic="true"
                      className="position-relative"
                    >
                      <div className="toast-container position-absolute top-0 end-0 p-2 p-lg-3">
                        <div className="rounded" style={{ zIndex: "11" }}>
                          <Toast isOpen={toast6}>
                            <ToastHeader toggle={toggleToast6}>
                              <img
                                src={logo}
                                alt=""
                                className="me-2"
                                height="18"
                              />
                              <strong className="me-auto">aaMOBee</strong>
                              <small
                                className="text-muted"
                                style={{
                                  marginLeft: "170px",
                                  fontWeight: "500",
                                }}
                              >
                                just now
                              </small>
                            </ToastHeader>
                            <ToastBody color="primary">
                              See? Just like this.
                            </ToastBody>
                          </Toast>
                        </div>
                        <div className="toast fade show" style={{ zIndex: "11" }}>
                          <Toast isOpen={toast7}>
                            <ToastHeader toggle={toggleToast7}>
                              <img
                                src={logo}
                                alt=""
                                className="me-2"
                                height="18"
                              />
                              <strong className="me-auto">aaMOBee</strong>
                              <small
                                className="text-muted"
                                style={{
                                  marginLeft: "170px",
                                  fontWeight: "500",
                                }}
                              >
                                2 sec ago
                              </small>
                            </ToastHeader>
                            <ToastBody color="primary">
                              Heads up, toasts will stack automatically
                            </ToastBody>
                          </Toast>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xl={6}>
              <Card>
                <CardBody>
                  <CardTitle>Custom content</CardTitle>
                  <p className="card-title-desc">
                    Customize your toasts by removing sub-components, tweaking
                    them with utilities, or by adding your own markup.
                  </p>

                  {/* <div className="d-flex flex-column gap-3">
                    <div
                      className="toast fade show align-items-center text-white border-0"
                      role="alert"
                      aria-live="assertive"
                      aria-atomic="true"
                    >
                      <div className="d-flex">
                        <Toast isOpen={toast8}>
                          <ToastHeader toggle={toggleToast8}>
                            Hello, world! This is a toast message.
                          </ToastHeader>
                        </Toast>
                      </div>
                    </div>

                    <div aria-live="polite" aria-atomic="true">
                      <div
                        className="toast fade show align-items-center text-white bg-primary border-0"
                        role="alert"
                        aria-live="assertive"
                        aria-atomic="true"
                      >
                        <div className="d-flex">
                          <Toast isOpen={toast9}>
                            <ToastHeader toggle={toggleToast9}>
                              Hello, world! This is a toast message.
                            </ToastHeader>
                          </Toast>
                        </div>
                      </div>
                    </div>
                    <Toast>
                      <ToastHeader
                        icon={
                          <Spinner color="primary" size="sm">
                            Loading...
                          </Spinner>
                        }
                      >
                        aaMOBee{" "}
                      </ToastHeader>
                      <ToastBody>
                        Hello, world! This is a toast message.
                      </ToastBody>
                    </Toast>
                  </div> */}
                  <div className="d-flex flex-column gap-3">
                    {/* Toast 1 */}
                    <div aria-live="polite" aria-atomic="true" className="position-relative">
                      <Toast show={true}>
                        <ToastBody>
                          Hello, world! This is a toast message.
                          <div className="mt-2 pt-2 border-top">
                            <Button color="primary" size="sm">Take action</Button>{" "}
                            <Button color="secondary" size="sm" data-dismiss="toast">Close</Button>
                          </div>
                        </ToastBody>
                      </Toast>
                    </div>

                    {/* Toast 2 */}
                    <Toast className="align-items-center" role="alert" aria-live="assertive" aria-atomic="true" show={true}>
                      <div className="d-flex">
                        <div className="toast-body">
                          Hello, world! This is a toast message.
                        </div>
                        <Button color="white" size="sm" className="btn-close me-2 m-auto" />
                      </div>
                    </Toast>

                    {/* Toast 3 */}
                    <div aria-live="polite" aria-atomic="true">
                      <Toast className="align-items-center text-white bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true" show={true}>
                        <div className="d-flex">
                          <ToastBody>
                            Hello, world! This is a toast message.
                          </ToastBody>
                          <Button color="white" size="sm" className="btn-close me-2 m-auto" />
                        </div>
                      </Toast>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xl={12}>
              <Card>
                <CardBody>
                  <CardTitle>Toasts Example</CardTitle>
                  <p className="card-title-des">
                    Click the button below to show a toast
                  </p>
                  <div className="d-flex flex-wrap gap-2">
                    <div className="position-relative">
                      <Button
                        type="button"
                        color="primary"
                        id="liveToastBtn"
                        className="me-2"
                        onClick={toggleToast}
                      >
                        Right Side Bottom toast
                      </Button>

                      <div
                        className="position-fixed bottom-0 end-0 p-3"
                        style={{ zIndex: "1005" }}
                      >
                        <Toast isOpen={toast}>
                          <ToastHeader toggle={toggleToast}>
                            <img
                              src={logo}
                              alt=""
                              className="me-2"
                              height="18"
                            />
                            aaMOBee
                          </ToastHeader>
                          <ToastBody color="primary">
                            Hello, world! This is a toast message.
                          </ToastBody>
                        </Toast>
                      </div>

                      <Button
                        type="button"
                        color="success"
                        id="liveToastBtn"
                        className="me-2"
                        onClick={toggleToast1}
                      >
                        Left Side Top Toast
                      </Button>

                      <div
                        className="position-fixed top-0 end-0 p-3"
                        style={{ zIndex: "1005" }}
                      >
                        <Toast isOpen={toast1}>
                          <ToastHeader toggle={toggleToast1}>
                            <img
                              src={logo}
                              alt=""
                              className="me-2"
                              height="18"
                            />
                            aaMOBee
                          </ToastHeader>
                          <ToastBody color="primary">
                            Hello, world! This is a toast message.
                          </ToastBody>
                        </Toast>
                      </div>

                      <Button
                        type="button"
                        color="warning"
                        id="liveToastBtn"
                        className="me-2"
                        onClick={toggleToast2}
                      >
                        Right Side Top Toast
                      </Button>

                      <div
                        className="position-fixed top-0 start-0 p-3"
                        style={{ zIndex: "1005" }}
                      >
                        <Toast isOpen={toast2}>
                          <ToastHeader toggle={toggleToast2}>
                            <img
                              src={logo}
                              alt=""
                              className="me-2"
                              height="18"
                            />
                            aaMOBee
                          </ToastHeader>
                          <ToastBody color="primary">
                            Hello, world! This is a toast message.
                          </ToastBody>
                        </Toast>
                      </div>

                      <Button
                        type="button"
                        color="danger"
                        id="liveToastBtn"
                        className="me-2"
                        onClick={toggleToast3}
                      >
                        Right Side Bottom Toast
                      </Button>

                      <div
                        className="position-fixed bottom-0 start-0 p-3"
                        style={{ zIndex: "1005" }}
                      >
                        <Toast isOpen={toast3}>
                          <ToastHeader toggle={toggleToast3}>
                            <img
                              src={logo}
                              alt=""
                              className="me-2"
                              height="18"
                            />
                            aaMOBee
                          </ToastHeader>
                          <ToastBody color="primary">
                            Hello, world! This is a toast message.
                          </ToastBody>
                        </Toast>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>


          <Row>
            <Col xl={12}>
              <Card>
                <CardBody>
                  <CardTitle>Live Example</CardTitle>
                  <p className="card-title-des">Click the button below to show a toast (positioned with our utilities in the lower right corner) that has been hidden by default.</p>

                  <form>
                    <div className="mb-3">
                      <label for="selectToastPlacement" className="mt-2">Select a position...</label>
                      <select className="form-select" id="selectToastPlacement" value={selectedPosition} onChange={handleSelectChange}>
                        <option value="" selected disabled>Select a position...</option>
                        <option value="top-0 start-0">Top left</option>
                        <option value="top-0 start-50 translate-middle-x">Top center</option>
                        <option value="top-0 end-0">Top right</option>
                        <option value="top-50 start-0 translate-middle-y">Middle left</option>
                        <option value="top-50 start-50 translate-middle">Middle center</option>
                        <option value="top-50 end-0 translate-middle-y">Middle right</option>
                        <option value="bottom-0 start-0">Bottom left</option>
                        <option value="bottom-0 start-50 translate-middle-x">Bottom center</option>
                        <option value="bottom-0 end-0">Bottom right</option>
                      </select>
                    </div>
                  </form>

                  <div className="bd-example bg-light position-relative" style={{ height: '300px' }}>
                    <div className={`toast-container position-absolute p-3 ${selectedPosition}`} id="toastPlacement">
                      <Toast>
                        <ToastHeader>
                          <img src={logo} className="rounded me-2" alt="..." height="20" />
                          <strong className="me-auto">aaMOBee</strong>
                          {" "}
                          <small
                            className="text-muted"
                            style={{ marginLeft: "155px", fontWeight: "500" }}
                          >
                            11 min ago
                          </small>
                          <button class="btn-close" aria-label="Close" close></button>
                        </ToastHeader>
                        <ToastBody>
                          Hello, world! This is a toast message.
                        </ToastBody>
                      </Toast>
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

export default UiToasts;
