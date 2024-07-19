import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Modal,
  Container,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const UiModals = () => {
  document.title = "Modals | aaMOBee";

  const [modal_standard, setmodal_standard] = useState(false);
  const [modal_large, setmodal_large] = useState(false);
  const [modal_xlarge, setmodal_xlarge] = useState(false);
  const [modal_small, setmodal_small] = useState(false);
  const [modal_center, setmodal_center] = useState(false);
  const [modal_scroll, setmodal_scroll] = useState(false);
  const [modal_fullscreen, setmodal_fullscreen] = useState(false);
  const [modal_backdrop, setmodal_backdrop] = useState(false);
  const [modal_backdrop1, setmodal_backdrop1] = useState(false);
  const [modal_backdrop2, setmodal_backdrop2] = useState(false);
  const [modal_backdrop3, setmodal_backdrop3] = useState(false);
  const [modal_backdrop12, setmodal_backdrop12] = useState(false);

  function tog_backdrop12() {
    setmodal_backdrop12(!modal_backdrop12);
  }

  function tog_backdrop1() {
    setmodal_backdrop1(!modal_backdrop1);
  }

  function tog_backdrop2() {
    setmodal_backdrop2(!modal_backdrop2);
  }

  function tog_backdrop3() {
    setmodal_backdrop3(!modal_backdrop3);
  }

  function tog_standard() {
    setmodal_standard(!modal_standard);
  }

  function tog_fullscreen() {
    setmodal_fullscreen(!modal_fullscreen);
  }

  function tog_backdrop() {
    setmodal_backdrop(!modal_backdrop);
  }

  function tog_large() {
    setmodal_large(!modal_large);
  }

  function tog_xlarge() {
    setmodal_xlarge(!modal_xlarge);
  }

  function tog_small() {
    setmodal_small(!modal_small);
  }

  function tog_center() {
    setmodal_center(!modal_center);
  }

  function tog_scroll() {
    setmodal_scroll(!modal_scroll);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="UI Elements" breadcrumbItem="Modals" />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4">Modals Examples</CardTitle>
                  <p className="card-title-desc">
                    Modals are streamlined, but flexible dialog prompts powered
                    by JavaScript. They support a number of use cases from user
                    notification to completely custom content and feature a
                    handful of helpful subcomponents, sizes, and more.
                  </p>

                  <div
                    className="modal bs-example-modal"
                    tabIndex="-1"
                    role="dialog"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Modal title</h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <p>One fine body&hellip;</p>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-primary">
                            Save changes
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/*  */}

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <h4 className="card-title">Modal Demos</h4>
                  <p className="card-title-desc">
                    Toggle a working modal demo by clicking the button below.
                  </p>
                  <div className="table-responsive">
                    <table className="table table-centered mb-0">
                      <tbody>
                        <tr>
                          <td>Standard Modal</td>
                          <td>
                            <button
                              type="button"
                              onClick={() => {
                                tog_standard();
                              }}
                              className="btn btn-primary btn-sm "
                              data-toggle="modal"
                              data-target="#myModal"
                            >
                              Modal Demo
                            </button>

                            <Modal
                              isOpen={modal_standard}
                              toggle={() => {
                                tog_standard();
                              }}
                            >
                              <div className="modal-header">
                                <h5
                                  className="modal-title mt-0"
                                  id="myModalLabel"
                                >
                                  Modal Heading
                                </h5>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setmodal_standard(false);
                                  }}
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <h5>
                                  Overflowing text to show scroll behavior
                                </h5>
                                <p>
                                  Cras mattis consectetur purus sit amet
                                  fermentum. Cras justo odio, dapibus ac
                                  facilisis in, egestas eget quam. Morbi leo
                                  risus, porta ac consectetur ac, vestibulum at
                                  eros.
                                </p>
                                <p>
                                  Praesent commodo cursus magna, vel scelerisque
                                  nisl consectetur et. Vivamus sagittis lacus
                                  vel augue laoreet rutrum faucibus dolor
                                  auctor.
                                </p>
                                <p>
                                  Aenean lacinia bibendum nulla sed consectetur.
                                  Praesent commodo cursus magna, vel scelerisque
                                  nisl consectetur et. Donec sed odio dui. Donec
                                  ullamcorper nulla non metus auctor fringilla.
                                </p>
                                <p>
                                  Cras mattis consectetur purus sit amet
                                  fermentum. Cras justo odio, dapibus ac
                                  facilisis in, egestas eget quam. Morbi leo
                                  risus, porta ac consectetur ac, vestibulum at
                                  eros.
                                </p>
                                <p>
                                  Praesent commodo cursus magna, vel scelerisque
                                  nisl consectetur et. Vivamus sagittis lacus
                                  vel augue laoreet rutrum faucibus dolor
                                  auctor.
                                </p>
                                <p>
                                  Aenean lacinia bibendum nulla sed consectetur.
                                  Praesent commodo cursus magna, vel scelerisque
                                  nisl consectetur et. Donec sed odio dui. Donec
                                  ullamcorper nulla non metus auctor fringilla.
                                </p>
                                <p>
                                  Cras mattis consectetur purus sit amet
                                  fermentum. Cras justo odio, dapibus ac
                                  facilisis in, egestas eget quam. Morbi leo
                                  risus, porta ac consectetur ac, vestibulum at
                                  eros.
                                </p>
                                <p>
                                  Praesent commodo cursus magna, vel scelerisque
                                  nisl consectetur et. Vivamus sagittis lacus
                                  vel augue laoreet rutrum faucibus dolor
                                  auctor.
                                </p>
                                <p>
                                  Aenean lacinia bibendum nulla sed consectetur.
                                  Praesent commodo cursus magna, vel scelerisque
                                  nisl consectetur et. Donec sed odio dui. Donec
                                  ullamcorper nulla non metus auctor fringilla.
                                </p>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  onClick={() => {
                                    tog_standard();
                                  }}
                                  className="btn btn-secondary "
                                  data-dismiss="modal"
                                >
                                  Close
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-primary "
                                >
                                  Save changes
                                </button>
                              </div>
                            </Modal>
                          </td>
                        </tr>
                        <tr>
                          <td>Extra Large Modal</td>
                          <td>
                            <button
                              type="button"
                              onClick={() => {
                                tog_xlarge();
                              }}
                              className="btn btn-primary btn-sm "
                              data-toggle="modal"
                              data-target=".bs-example-modal-xl"
                            >
                              {" "}
                              Modal Demo
                            </button>

                            <Modal
                              size="xl"
                              isOpen={modal_xlarge}
                              toggle={() => {
                                tog_xlarge();
                              }}
                            >
                              <div className="modal-header">
                                <h5
                                  className="modal-title mt-0"
                                  id="myExtraLargeModalLabel"
                                >
                                  Extra large modal
                                </h5>
                                <button
                                  onClick={() => {
                                    setmodal_xlarge(false);
                                  }}
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <p>
                                  Cras mattis consectetur purus sit amet
                                  fermentum. Cras justo odio, dapibus ac
                                  facilisis in, egestas eget quam. Morbi leo
                                  risus, porta ac consectetur ac, vestibulum at
                                  eros.
                                </p>
                                <p>
                                  Praesent commodo cursus magna, vel scelerisque
                                  nisl consectetur et. Vivamus sagittis lacus
                                  vel augue laoreet rutrum faucibus dolor
                                  auctor.
                                </p>
                                <p className="mb-0">
                                  Aenean lacinia bibendum nulla sed consectetur.
                                  Praesent commodo cursus magna, vel scelerisque
                                  nisl consectetur et. Donec sed odio dui. Donec
                                  ullamcorper nulla non metus auctor fringilla.
                                </p>
                              </div>
                            </Modal>
                          </td>
                        </tr>
                        <tr>
                          <td>Large Modal</td>
                          <td>
                            <button
                              type="button"
                              onClick={() => {
                                tog_large();
                              }}
                              className="btn btn-primary btn-sm "
                              data-toggle="modal"
                              data-target=".bs-example-modal-lg"
                            >
                              Modal Demo
                            </button>

                            <Modal
                              size="lg"
                              isOpen={modal_large}
                              toggle={() => {
                                tog_large();
                              }}
                            >
                              <div className="modal-header">
                                <h5
                                  className="modal-title mt-0"
                                  id="myLargeModalLabel"
                                >
                                  Large Modal
                                </h5>
                                <button
                                  onClick={() => {
                                    setmodal_large(false);
                                  }}
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <p>
                                  Cras mattis consectetur purus sit amet
                                  fermentum. Cras justo odio, dapibus ac
                                  facilisis in, egestas eget quam. Morbi leo
                                  risus, porta ac consectetur ac, vestibulum at
                                  eros.
                                </p>
                                <p>
                                  Praesent commodo cursus magna, vel scelerisque
                                  nisl consectetur et. Vivamus sagittis lacus
                                  vel augue laoreet rutrum faucibus dolor
                                  auctor.
                                </p>
                                <p className="mb-0">
                                  Aenean lacinia bibendum nulla sed consectetur.
                                  Praesent commodo cursus magna, vel scelerisque
                                  nisl consectetur et. Donec sed odio dui. Donec
                                  ullamcorper nulla non metus auctor fringilla.
                                </p>
                              </div>
                            </Modal>
                          </td>
                        </tr>
                        <tr>
                          <td>Small Modal</td>
                          <td>
                            <button
                              type="button"
                              onClick={() => {
                                tog_small();
                              }}
                              className="btn btn-primary btn-sm "
                              data-toggle="modal"
                              data-target=".bs-example-modal-sm"
                            >
                              Modal Demo
                            </button>

                            <Modal
                              size="sm"
                              isOpen={modal_small}
                              toggle={() => {
                                tog_small();
                              }}
                            >
                              <div className="modal-header">
                                <h5
                                  className="modal-title mt-0"
                                  id="mySmallModalLabel"
                                >
                                  Small Modal
                                </h5>
                                <button
                                  onClick={() => {
                                    setmodal_small(false);
                                  }}
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <p>
                                  Cras mattis consectetur purus sit amet
                                  fermentum. Cras justo odio, dapibus ac
                                  facilisis in, egestas eget quam. Morbi leo
                                  risus, porta ac consectetur ac, vestibulum at
                                  eros.
                                </p>
                                <p>
                                  Praesent commodo cursus magna, vel scelerisque
                                  nisl consectetur et. Vivamus sagittis lacus
                                  vel augue laoreet rutrum faucibus dolor
                                  auctor.
                                </p>
                                <p className="mb-0">
                                  Aenean lacinia bibendum nulla sed consectetur.
                                  Praesent commodo cursus magna, vel scelerisque
                                  nisl consectetur et. Donec sed odio dui. Donec
                                  ullamcorper nulla non metus auctor fringilla.
                                </p>
                              </div>
                            </Modal>
                          </td>
                        </tr>
                        <tr>
                          <td>Center Modal</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-primary btn-sm "
                              onClick={() => {
                                tog_center();
                              }}
                            >
                              Modal Demo
                            </button>

                            <Modal
                              isOpen={modal_center}
                              toggle={() => {
                                tog_center();
                              }}
                              centered
                            >
                              <div className="modal-header">
                                <h5 className="modal-title mt-0">
                                  Center Modal
                                </h5>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setmodal_center(false);
                                  }}
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <p>
                                  Cras mattis consectetur purus sit amet
                                  fermentum. Cras justo odio, dapibus ac
                                  facilisis in, egestas eget quam. Morbi leo
                                  risus, porta ac consectetur ac, vestibulum at
                                  eros.
                                </p>
                                <p>
                                  Praesent commodo cursus magna, vel scelerisque
                                  nisl consectetur et. Vivamus sagittis lacus
                                  vel augue laoreet rutrum faucibus dolor
                                  auctor.
                                </p>
                                <p className="mb-0">
                                  Aenean lacinia bibendum nulla sed consectetur.
                                  Praesent commodo cursus magna, vel scelerisque
                                  nisl consectetur et. Donec sed odio dui. Donec
                                  ullamcorper nulla non metus auctor fringilla.
                                </p>
                              </div>
                            </Modal>
                          </td>
                        </tr>

                        <tr>
                          <td>Scrollable Modal</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-primary btn-sm "
                              onClick={() => {
                                tog_scroll();
                              }}
                              data-toggle="modal"
                            >
                              Modal Demo
                            </button>
                            <Modal
                              isOpen={modal_scroll}
                              toggle={() => {
                                tog_scroll();
                              }}
                              scrollable={true}
                            >
                              <div className="modal-header">
                                <h5 className="modal-title mt-0">
                                  Scrollable modal
                                </h5>
                                <button
                                  type="button"
                                  onClick={() => setmodal_scroll(false)}
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <p>
                                  Cras mattis consectetur purus sit amet
                                  fermentum. Cras justo odio, dapibus ac
                                  facilisis in, egestas eget quam. Morbi leo
                                  risus, porta ac consectetur ac, vestibulum at
                                  eros.
                                </p>
                                <p>
                                  Praesent commodo cursus magna, vel scelerisque
                                  nisl consectetur et. Vivamus sagittis lacus
                                  vel augue laoreet rutrum faucibus dolor
                                  auctor.
                                </p>
                                <p>
                                  Aenean lacinia bibendum nulla sed consectetur.
                                  Praesent commodo cursus magna, vel scelerisque
                                  nisl consectetur et. Donec sed odio dui. Donec
                                  ullamcorper nulla non metus auctor fringilla.
                                </p>
                                <p>
                                  Cras mattis consectetur purus sit amet
                                  fermentum. Cras justo odio, dapibus ac
                                  facilisis in, egestas eget quam. Morbi leo
                                  risus, porta ac consectetur ac, vestibulum at
                                  eros.
                                </p>
                                <p>
                                  Praesent commodo cursus magna, vel scelerisque
                                  nisl consectetur et. Vivamus sagittis lacus
                                  vel augue laoreet rutrum faucibus dolor
                                  auctor.
                                </p>
                                <p>
                                  Aenean lacinia bibendum nulla sed consectetur.
                                  Praesent commodo cursus magna, vel scelerisque
                                  nisl consectetur et. Donec sed odio dui. Donec
                                  ullamcorper nulla non metus auctor fringilla.
                                </p>
                                <p>
                                  Cras mattis consectetur purus sit amet
                                  fermentum. Cras justo odio, dapibus ac
                                  facilisis in, egestas eget quam. Morbi leo
                                  risus, porta ac consectetur ac, vestibulum at
                                  eros.
                                </p>
                                <p>
                                  Praesent commodo cursus magna, vel scelerisque
                                  nisl consectetur et. Vivamus sagittis lacus
                                  vel augue laoreet rutrum faucibus dolor
                                  auctor.
                                </p>
                                <p>
                                  Aenean lacinia bibendum nulla sed consectetur.
                                  Praesent commodo cursus magna, vel scelerisque
                                  nisl consectetur et. Donec sed odio dui. Donec
                                  ullamcorper nulla non metus auctor fringilla.
                                </p>
                                <p>
                                  Cras mattis consectetur purus sit amet
                                  fermentum. Cras justo odio, dapibus ac
                                  facilisis in, egestas eget quam. Morbi leo
                                  risus, porta ac consectetur ac, vestibulum at
                                  eros.
                                </p>
                                <p>
                                  Praesent commodo cursus magna, vel scelerisque
                                  nisl consectetur et. Vivamus sagittis lacus
                                  vel augue laoreet rutrum faucibus dolor
                                  auctor.
                                </p>
                                <p>
                                  Aenean lacinia bibendum nulla sed consectetur.
                                  Praesent commodo cursus magna, vel scelerisque
                                  nisl consectetur et. Donec sed odio dui. Donec
                                  ullamcorper nulla non metus auctor fringilla.
                                </p>
                                <p>
                                  Cras mattis consectetur purus sit amet
                                  fermentum. Cras justo odio, dapibus ac
                                  facilisis in, egestas eget quam. Morbi leo
                                  risus, porta ac consectetur ac, vestibulum at
                                  eros.
                                </p>
                                <p>
                                  Praesent commodo cursus magna, vel scelerisque
                                  nisl consectetur et. Vivamus sagittis lacus
                                  vel augue laoreet rutrum faucibus dolor
                                  auctor.
                                </p>
                                <p>
                                  Aenean lacinia bibendum nulla sed consectetur.
                                  Praesent commodo cursus magna, vel scelerisque
                                  nisl consectetur et. Donec sed odio dui. Donec
                                  ullamcorper nulla non metus auctor fringilla.
                                </p>
                                <p>
                                  Cras mattis consectetur purus sit amet
                                  fermentum. Cras justo odio, dapibus ac
                                  facilisis in, egestas eget quam. Morbi leo
                                  risus, porta ac consectetur ac, vestibulum at
                                  eros.
                                </p>
                                <p>
                                  Praesent commodo cursus magna, vel scelerisque
                                  nisl consectetur et. Vivamus sagittis lacus
                                  vel augue laoreet rutrum faucibus dolor
                                  auctor.
                                </p>
                                <p>
                                  Aenean lacinia bibendum nulla sed consectetur.
                                  Praesent commodo cursus magna, vel scelerisque
                                  nisl consectetur et. Donec sed odio dui. Donec
                                  ullamcorper nulla non metus auctor fringilla.
                                </p>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setmodal_scroll(false)}
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                  >
                                    Save changes
                                  </button>
                                </div>
                              </div>
                            </Modal>
                          </td>
                        </tr>

                        <tr>
                          <td>FullScreen Modal</td>
                          <td>
                            <button
                              type="button"
                              onClick={() => {
                                tog_fullscreen();
                              }}
                              className="btn btn-primary btn-sm "
                              data-toggle="modal"
                            >
                              Modal Demo
                            </button>
                            <Modal
                              size="xl"
                              isOpen={modal_fullscreen}
                              toggle={() => {
                                tog_fullscreen();
                              }}
                              className="modal-fullscreen"
                            >
                              <div className="modal-header">
                                <h5
                                  className="modal-title mt-0"
                                  id="exampleModalFullscreenLabel"
                                >
                                  Fullscreen Modal
                                </h5>
                                <button
                                  onClick={() => {
                                    setmodal_fullscreen(false);
                                  }}
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <h5>
                                  Overflowing text to show scroll behavior
                                </h5>
                                <p>
                                  Cras mattis consectetur purus sit amet
                                  fermentum. Cras justo odio, dapibus ac
                                  facilisis in, egestas eget quam. Morbi leo
                                  risus, porta ac consectetur ac, vestibulum at
                                  eros.
                                </p>
                                <p>
                                  Praesent commodo cursus magna, vel scelerisque
                                  nisl consectetur et. Vivamus sagittis lacus
                                  vel augue laoreet rutrum faucibus dolor
                                  auctor.
                                </p>
                                <p>
                                  Aenean lacinia bibendum nulla sed consectetur.
                                  Praesent commodo cursus magna, vel scelerisque
                                  nisl consectetur et. Donec sed odio dui. Donec
                                  ullamcorper nulla non metus auctor fringilla.
                                </p>
                                <p>
                                  Cras mattis consectetur purus sit amet
                                  fermentum. Cras justo odio, dapibus ac
                                  facilisis in, egestas eget quam. Morbi leo
                                  risus, porta ac consectetur ac, vestibulum at
                                  eros.
                                </p>
                                <p>
                                  Praesent commodo cursus magna, vel scelerisque
                                  nisl consectetur et. Vivamus sagittis lacus
                                  vel augue laoreet rutrum faucibus dolor
                                  auctor.
                                </p>
                                <p>
                                  Aenean lacinia bibendum nulla sed consectetur.
                                  Praesent commodo cursus magna, vel scelerisque
                                  nisl consectetur et. Donec sed odio dui. Donec
                                  ullamcorper nulla non metus auctor fringilla.
                                </p>
                                <p>
                                  Cras mattis consectetur purus sit amet
                                  fermentum. Cras justo odio, dapibus ac
                                  facilisis in, egestas eget quam. Morbi leo
                                  risus, porta ac consectetur ac, vestibulum at
                                  eros.
                                </p>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  onClick={() => {
                                    tog_fullscreen();
                                  }}
                                  className="btn btn-secondary "
                                  data-dismiss="modal"
                                >
                                  Close
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-primary "
                                >
                                  Save changes
                                </button>
                              </div>
                            </Modal>
                          </td>
                        </tr>

                        <tr>
                          <td> Toggle Between Modals </td>
                          <td>
                            <div>
                              <button
                                type="button"
                                className="btn btn-primary btn-sm "
                                onClick={() => {
                                  tog_backdrop();
                                }}
                                data-toggle="modal"
                                id="myModalLabel"
                              >
                                Modal Demo
                              </button>
                              <Modal
                                isOpen={modal_backdrop}
                                toggle={() => {
                                  tog_backdrop();
                                }}
                                id="firstmodal"
                              >
                                <div className="modal-header">
                                  <h5 className="modal-title" id="myModalLabel">
                                    Modal 1
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => {
                                      setmodal_backdrop(false);
                                    }}
                                  >
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div className="modal-body">
                                  <p>
                                    Show a second modal and hide this one with
                                    the button below.
                                  </p>
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={() => {
                                      setmodal_backdrop();
                                      setmodal_backdrop12(false);
                                    }}
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                      tog_backdrop12();
                                      tog_backdrop(false);
                                    }}
                                  >
                                    Open Second Modal
                                  </button>
                                </div>
                              </Modal>

                              <Modal
                                isOpen={modal_backdrop12}
                                toggle={() => {
                                  tog_backdrop12();
                                }}
                                id="secondmodal"
                              >
                                <div className="modal-header">
                                  <h5 className="modal-title">Modal 2</h5>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => {
                                      setmodal_backdrop12(false);
                                    }}
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div className="modal-body">
                                  <p>
                                    Hide this modal and show the first with the
                                    button below.
                                  </p>
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={() => {
                                      setmodal_backdrop12(false);
                                      setmodal_backdrop(false);
                                    }}
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                      tog_backdrop();
                                      tog_backdrop12(false);
                                    }}
                                  >
                                    Back to First
                                  </button>
                                </div>
                              </Modal>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <h4 className="card-title">Varying Modal Content</h4>
                  <p className="card-title-desc">
                    Modal of buttons that all trigger the same modal with
                    slightly different contents. Use{" "}
                    <code>event.relatedTarget</code> and HTML{" "}
                    <code>data-bs-target</code> attributes to vary the contents
                    of the modal depending on which button was clicked.
                  </p>

                  <div>
                    <div className="d-flex flex-wrap gap-3">
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        onClick={() => {
                          tog_backdrop1();
                        }}
                      >
                        Open modal for @mdo
                      </button>

                      <Modal
                        isOpen={modal_backdrop1}
                        toggle={() => {
                          tog_backdrop1();
                        }}
                        
                      >
                        <div className="modal-header">
                          <h5 className="modal-title">New message to @mdo</h5>
                          <button
                            type="button"
                            className="btn-close"
                            onClick={() => {
                              setmodal_backdrop1(false);
                            }}
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <form>
                            <div className="mb-3">
                              <label
                                htmlFor="recipient-name"
                                className="col-form-label"
                              >
                                Recipient:
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="recipient-name"
                                defaultValue="@mdo"
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="message-text"
                                className="col-form-label"
                              >
                                Message:
                              </label>
                              <textarea
                                className="form-control"
                                id="message-text"
                              ></textarea>
                            </div>
                          </form>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            onClick={() => {
                              setmodal_backdrop1(false);
                            }}
                          >
                            Close
                          </button>
                          <button type="button" className="btn btn-primary">
                            Send message
                          </button>
                        </div>
                      </Modal>

                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        data-bs-whatever="@fat"
                        onClick={() => {
                          tog_backdrop2();
                        }}
                      >
                        Open modal for @fat
                      </button>

                      <Modal
                        isOpen={modal_backdrop2}
                        toggle={() => {
                          tog_backdrop2();
                        }}
                        
                      >
                        <div className="modal-header">
                          <h5 className="modal-title">New message to @fat</h5>
                          <button
                            type="button"
                            className="btn-close"
                            onClick={() => {
                              setmodal_backdrop2(false);
                            }}
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <form>
                            <div className="mb-3">
                              <label
                                htmlFor="recipient-name"
                                className="col-form-label"
                              >
                                Recipient:
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="recipient-name"
                                defaultValue="@fat"
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="message-text"
                                className="col-form-label"
                              >
                                Message:
                              </label>
                              <textarea
                                className="form-control"
                                id="message-text"
                              ></textarea>
                            </div>
                          </form>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            onClick={() => {
                              setmodal_backdrop2(false);
                            }}
                          >
                            Close
                          </button>
                          <button type="button" className="btn btn-primary">
                            Send message
                          </button>
                        </div>
                      </Modal>

                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        data-bs-whatever="@getbootstrap"
                        onClick={() => {
                          tog_backdrop3();
                        }}
                      >
                        Open modal for @getbootstrap
                      </button>

                      <Modal
                        isOpen={modal_backdrop3}
                        toggle={() => {
                          tog_backdrop3();
                        }}
                        
                      >
                        <div className="modal-header">
                          <h5 className="modal-title">
                            New message to @getbootstrap
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            onClick={() => {
                              setmodal_backdrop3(false);
                            }}
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <form>
                            <div className="mb-3">
                              <label
                                htmlFor="recipient-name"
                                className="col-form-label"
                              >
                                Recipient:
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="recipient-name"
                                defaultValue="@getbootstrap"
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="message-text"
                                className="col-form-label"
                              >
                                Message:
                              </label>
                              <textarea
                                className="form-control"
                                id="message-text"
                              ></textarea>
                            </div>
                          </form>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            onClick={() => {
                              setmodal_backdrop3(false);
                            }}
                          >
                            Close
                          </button>
                          <button type="button" className="btn btn-primary">
                            Send message
                          </button>
                        </div>
                      </Modal>
                    </div>

                    <div
                      className="modal fade"
                      id="exampleModal"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              New message
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <form>
                              <div className="mb-3">
                                <label
                                  htmlFor="recipient-name"
                                  className="col-form-label"
                                >
                                  Recipient:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="recipient-name"
                                />
                              </div>
                              <div className="mb-3">
                                <label
                                  htmlFor="message-text"
                                  className="col-form-label"
                                >
                                  Message:
                                </label>
                                <textarea
                                  className="form-control"
                                  id="message-text"
                                ></textarea>
                              </div>
                            </form>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button type="button" className="btn btn-primary">
                              Send message
                            </button>
                          </div>
                        </div>
                      </div>
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

export default UiModals;
