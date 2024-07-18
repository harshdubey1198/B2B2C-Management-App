import React, { useState } from "react";

import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  TabContent,
  TabPane,
  Progress,
  NavLink,
  NavItem,
} from "reactstrap";

import classnames from "classnames";
import { Link } from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const FormWizard = () => {
  document.title = "Form Wizard | aaMOBee - React Admin & Dashboard Template";
  const [activeTab, setactiveTab] = useState(1);
  const [activeTabwiz, setoggleTabwiz] = useState(1);

  const [passedSteps, setPassedSteps] = useState([1]);
  const [passedStepswiz, setpassedStepswiz] = useState([1]);

  function toggleTab(tab) {
    if (activeTab !== tab) {
      var modifiedSteps = [...passedSteps, tab];
      if (tab >= 1 && tab <= 4) {
        setactiveTab(tab);
        setPassedSteps(modifiedSteps);
      }
    }
  }

  function toggleTabwiz(tab) {
    if (activeTabwiz !== tab) {
      var modifiedSteps = [...passedStepswiz, tab];
      if (tab >= 1 && tab <= 4) {
        setoggleTabwiz(tab);
        setpassedStepswiz(modifiedSteps);
      }
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Form Wizard" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Basic pills Wizard</h4>
                  <div id="basic-pills-wizard" className="twitter-bs-wizard">
                    <ul className="twitter-bs-wizard-nav nav nav-pills nav-justified">
                      <NavItem className={classnames({ active: activeTab === 1 })}>
                        <NavLink
                          data-toggle="tab"
                          className={classnames({ active: activeTab === 1 })}
                          onClick={() => {
                            setactiveTab(1);
                          }}
                        >
                          <span className="step-number">01</span>
                          <span className="step-title" style={{ paddingLeft: "10px" }}>Seller Details</span>
                        </NavLink>
                      </NavItem>
                      <NavItem className={classnames({ active: activeTab === 2 })}>
                        <NavLink
                          data-toggle="tab"
                          className={classnames({ active: activeTab === 2 })}
                          onClick={() => {
                            setactiveTab(2);
                          }}
                        >
                          <span className="step-number">02</span>
                          <span className="step-title" style={{ paddingLeft: "10px" }}>Company Document</span>
                        </NavLink>
                      </NavItem>

                      <NavItem className={classnames({ active: activeTab === 3 })}>
                        <NavLink
                          data-toggle="tab"
                          className={classnames({ active: activeTab === 3 })}
                          onClick={() => {
                            setactiveTab(3);
                          }}

                        >

                          <span className="step-number">03</span>
                          <span className="step-title" style={{ paddingLeft: "10px" }}>Bank Details</span>
                        </NavLink>
                      </NavItem>
                      <NavItem className={classnames({ active: activeTab === 4 })}>
                        <NavLink
                          data-toggle="tab"
                          className={classnames({ active: activeTab === 4 })}
                          onClick={() => {
                            setactiveTab(4);
                          }}
                        >
                          <span className="step-number">04</span>
                          <span className="step-title" style={{ paddingLeft: "10px" }}>Confirm Detail</span>
                        </NavLink>
                      </NavItem>
                    </ul>

                    <TabContent activeTab={activeTab} className="twitter-bs-wizard-tab-content">
                      <TabPane tabId={1}>
                        <Form>
                          <Row>
                            <Col lg="6">
                              <div className="mb-3">
                                <Label htmlFor="basicpill-firstname-input1">
                                  First name
                                </Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="basicpill-firstname-input1"
                                  placeholder="Enter Your First Name"
                                />
                              </div>
                            </Col>
                            <Col lg="6">
                              <div className="mb-3">
                                <Label htmlFor="basicpill-lastname-input2">
                                  Last name
                                </Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="basicpill-lastname-input2"
                                  placeholder="Enter Your Last Name"
                                />
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col lg="6">
                              <div className="mb-3">
                                <Label htmlFor="basicpill-phoneno-input3">
                                  Phone
                                </Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="basicpill-phoneno-input3"
                                  placeholder="Enter Your Phone No."
                                />
                              </div>
                            </Col>
                            <Col lg="6">
                              <div className="mb-3">
                                <Label htmlFor="basicpill-email-input4">
                                  Email
                                </Label>
                                <Input
                                  type="email"
                                  className="form-control"
                                  id="basicpill-email-input4"
                                  placeholder="Enter Your Email ID"
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg="12">
                              <div className="mb-3">
                                <Label htmlFor="basicpill-address-input1">
                                  Address
                                </Label>
                                <textarea
                                  id="basicpill-address-input1"
                                  className="form-control"
                                  rows="2"
                                  placeholder="Enter Your Address"
                                />
                              </div>
                            </Col>
                          </Row>
                        </Form>
                      </TabPane>
                      <TabPane tabId={2}>
                        <div>
                          <Form>
                            <Row>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label htmlFor="basicpill-pancard-input5">
                                    PAN Card
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-pancard-input5"
                                    placeholder="Enter Your PAN No."
                                  />
                                </div>
                              </Col>

                              <Col lg="6">
                                <div className="mb-3">
                                  <Label htmlFor="basicpill-vatno-input6">
                                    VAT/TIN No.
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-vatno-input6"
                                    placeholder="Enter Your VAT/TIN No."
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label htmlFor="basicpill-cstno-input7">
                                    CST No.
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-cstno-input7"
                                    placeholder="Enter Your CST No."
                                  />
                                </div>
                              </Col>

                              <Col lg="6">
                                <div className="mb-3">
                                  <Label htmlFor="basicpill-servicetax-input8">
                                    Service Tax No.
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-servicetax-input8"
                                    placeholder="Enter Your Service Tax No."
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label htmlFor="basicpill-companyuin-input9">
                                    Company UIN
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-companyuin-input9"
                                    placeholder="Enter Your Company UIN"
                                  />
                                </div>
                              </Col>

                              <Col lg="6">
                                <div className="mb-3">
                                  <Label htmlFor="basicpill-declaration-input10">
                                    Declaration
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-Declaration-input10"
                                    placeholder="Declaration Details"
                                  />
                                </div>
                              </Col>
                            </Row>
                          </Form>
                        </div>
                      </TabPane>
                      <TabPane tabId={3}>
                        <div>
                          <Form>
                            <Row>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label htmlFor="basicpill-namecard-input11">
                                    Name on Card
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-namecard-input11"
                                    placeholder="Enter Your Name on Card"
                                  />
                                </div>
                              </Col>

                              <Col lg="6">
                                <div className="mb-3">
                                  <Label>Credit Card Type</Label>
                                  <select className="form-select">
                                    <option defaultValue>
                                      Select Card Type
                                    </option>
                                    <option value="AE">
                                      American Express
                                    </option>
                                    <option value="VI">Visa</option>
                                    <option value="MC">MasterCard</option>
                                    <option value="DI">Discover</option>
                                  </select>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label htmlFor="basicpill-cardno-input12">
                                    Credit Card Number
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-cardno-input12"
                                    placeholder="Credit Card Number"
                                  />
                                </div>
                              </Col>

                              <Col lg="6">
                                <div className="mb-3">
                                  <Label htmlFor="basicpill-card-verification-input0">
                                    Card Verification Number
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-card-verification-input0"
                                    placeholder="Credit Verification Number"
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label htmlFor="basicpill-expiration-input13">
                                    Expiration Date
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-expiration-input13"
                                    placeholder="Card Expiration Date"
                                  />
                                </div>
                              </Col>
                            </Row>
                          </Form>
                        </div>
                      </TabPane>
                      <TabPane tabId={4}>
                        <div className="row justify-content-center">
                          <Col lg="6">
                            <div className="text-center">
                              <div className="mb-4">
                                <i className="mdi mdi-check-circle-outline text-success display-4" />
                              </div>
                              <div>
                                <h5>Confirm Detail</h5>
                                <p className="text-muted">
                                  If several languages coalesce, the grammar
                                  of the resulting
                                </p>
                              </div>
                            </div>
                          </Col>
                        </div>
                      </TabPane>
                    </TabContent>
                    <ul className="pager wizard twitter-bs-wizard-pager-link">
                      <li
                        className={
                          activeTab === 1
                            ? "previous disabled me-2"
                            : "previous me-2"
                        }
                      >
                        <Link
                          to="#"
                          onClick={() => {
                            toggleTab(activeTab - 1);
                          }}
                        >
                          Previous
                        </Link>
                      </li>

                      <li
                        className={activeTab === 4 ? "next disabled" : "next"}
                      >
                        <Link
                          to="#"
                          onClick={() => {
                            toggleTab(activeTab + 1);
                          }}
                        >
                          Next
                        </Link>
                      </li>
                    </ul>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="12">
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Wizard with Progressbar</h4>
                  <div id="progrss-wizard" className="twitter-bs-wizard">
                    <ul className="twitter-bs-wizard-nav nav-justified nav nav-pills">
                      <NavItem
                        className={classnames({
                          active: activeTabwiz === 1,
                        })}
                      >
                        <NavLink
                          className={
                            (classnames({
                              active: activeTabwiz === 1,
                            }))
                          }
                          onClick={() => {
                            toggleTabwiz(1);
                          }}
                        >
                          <span className="step-number">01</span>
                          <span className="step-title" style={{ paddingLeft: "10px" }}>Seller Details</span>
                        </NavLink>
                      </NavItem>
                      <NavItem
                        className={classnames({
                          active: activeTabwiz === 2,
                        })}
                      >
                        <NavLink
                          className={
                            (classnames({
                              active: activeTabwiz === 2,
                            }))
                          }
                          onClick={() => {
                            toggleTabwiz(2);
                          }}
                        >
                          <span className="step-number">02</span>
                          <span className="step-title" style={{ paddingLeft: "10px" }}>Company Document</span>
                        </NavLink>
                      </NavItem>

                      <NavItem
                        className={classnames({
                          active: activeTabwiz === 3,
                        })}
                      >
                        <NavLink
                          className={
                            (classnames({
                              active: activeTabwiz === 3,
                            }))
                          }
                          onClick={() => {
                            toggleTabwiz(3);
                          }}
                        >
                          <span className="step-number">03</span>
                          <span className="step-title" style={{ paddingLeft: "10px" }}>Bank Details</span>
                        </NavLink>
                      </NavItem>

                      <NavItem
                        className={classnames({
                          active: activeTabwiz === 4,
                        })}
                      >
                        <NavLink
                          className={
                            (classnames({
                              active: activeTabwiz === 4,
                            }))
                          }
                          onClick={() => {
                            toggleTabwiz(4);
                          }}
                        >
                          <span className="step-number">04</span>
                          <span className="step-title" style={{ paddingLeft: "10px" }}>Confirm Detail</span>
                        </NavLink>
                      </NavItem>
                    </ul>
                    <div id="bar" className="mt-4">
                      <div className="mb-4">
                        <Progress
                          value={25 * activeTabwiz}
                          color="success"
                          animated
                        ></Progress>
                      </div>
                    </div>

                    <TabContent activeTab={activeTabwiz} className="twitter-bs-wizard-tab-content">
                      <TabPane tabId={1}>
                        <Form>
                          <Row>
                            <Col lg="6">
                              <FormGroup className="mb-3">
                                <Label htmlFor="basicpill-firstname-input12">
                                  First name
                                </Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="basicpill-firstname-input12"
                                  placeholder="Enter Your First Name"
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="6">
                              <FormGroup className="mb-3">
                                <Label htmlFor="basicpill-lastname-input22">
                                  Last name
                                </Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="basicpill-lastname-input22"
                                  placeholder="Enter Your Last Name"
                                />
                              </FormGroup>
                            </Col>
                          </Row>

                          <Row>
                            <Col lg="6">
                              <FormGroup className="mb-3">
                                <Label htmlFor="basicpill-phoneno-input32">
                                  Phone
                                </Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="basicpill-phoneno-input32"
                                  placeholder="Enter Your Phone No."
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="6">
                              <FormGroup className="mb-3">
                                <Label htmlFor="basicpill-email-input42">
                                  Email
                                </Label>
                                <Input
                                  type="email"
                                  className="form-control"
                                  id="basicpill-email-input42"
                                  placeholder="Enter Your Email ID"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg="12">
                              <FormGroup className="mb-3">
                                <Label htmlFor="basicpill-address-input12">
                                  Address
                                </Label>
                                <textarea
                                  id="basicpill-address-input12"
                                  className="form-control"
                                  rows="2"
                                  placeholder="Enter Your Address"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Form>
                      </TabPane>
                      <TabPane tabId={2}>
                        <div>
                          <Form>
                            <Row>
                              <Col lg="6">
                                <FormGroup className="mb-3">
                                  <Label htmlFor="basicpill-pancard-input52">
                                    PAN Card
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-pancard-input52"
                                    placeholder="Enter Your PAN Card No."
                                  />
                                </FormGroup>
                              </Col>

                              <Col lg="6">
                                <FormGroup className="mb-3">
                                  <Label htmlFor="basicpill-vatno-input62">
                                    VAT/TIN No.
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-vatno-input62"
                                    placeholder="Enter Your VAT/TIN No."
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="6">
                                <FormGroup className="mb-3">
                                  <Label htmlFor="basicpill-cstno-input72">
                                    CST No.
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-cstno-input72"
                                    placeholder="Enter Your CST No."
                                  />
                                </FormGroup>
                              </Col>

                              <Col lg="6">
                                <FormGroup className="mb-3">
                                  <Label htmlFor="basicpill-servicetax-input82">
                                    Service Tax No.
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-servicetax-input82"
                                    placeholder="Enter Your Service Tax No."
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="6">
                                <FormGroup className="mb-3">
                                  <Label htmlFor="basicpill-companyuin-input92">
                                    Company UIN
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-companyuin-input92"
                                    placeholder="Company UIN No."
                                  />
                                </FormGroup>
                              </Col>

                              <Col lg="6">
                                <FormGroup className="mb-3">
                                  <Label htmlFor="basicpill-declaration-input102">
                                    Declaration
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-Declaration-input102"
                                    placeholder="Declaration Details"
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </Form>
                        </div>
                      </TabPane>
                      <TabPane tabId={3}>
                        <div>
                          <Form>
                            <Row>
                              <Col lg="6">
                                <FormGroup className="mb-3">
                                  <Label htmlFor="basicpill-namecard-input112">
                                    Name on Card
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-namecard-input112"
                                    placeholder="Enter Your Name on Card"
                                  />
                                </FormGroup>
                              </Col>

                              <Col lg="6">
                                <FormGroup className="mb-3">
                                  <Label>Credit Card Type</Label>
                                  <select className="form-select">
                                    <option>Select Card Type</option>
                                    <option>American Express</option>
                                    <option>Visa</option>
                                    <option>MasterCard</option>
                                    <option>Discover</option>
                                  </select>
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="6">
                                <FormGroup className="mb-3">
                                  <Label htmlFor="basicpill-cardno-input122">
                                    Credit Card Number
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-cardno-input122"
                                    placeholder="Enter Your Card Number"
                                  />
                                </FormGroup>
                              </Col>

                              <Col lg="6">
                                <FormGroup className="mb-3">
                                  <Label htmlFor="basicpill-card-verification-input">
                                    Card Verification Number
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-card-verification-input"
                                    placeholder="Card Verification Number"
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="6">
                                <FormGroup className="mb-3">
                                  <Label htmlFor="basicpill-expiration-input132">
                                    Expiration Date
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-expiration-input132"
                                    placeholder="Card Expiration Date"
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </Form>
                        </div>
                      </TabPane>
                      <TabPane tabId={4}>
                        <div className="row justify-content-center">
                          <Col lg="12">
                            <div className="text-center">
                              <div className="mb-4">
                                <i className="mdi mdi-check-circle-outline text-success display-4" />
                              </div>
                              <div>
                                <h5>Confirm Detail</h5>
                                <p className="text-muted">
                                  If several languages coalesce, the grammar
                                  of the resulting
                                </p>
                              </div>
                            </div>
                          </Col>
                        </div>
                      </TabPane>
                    </TabContent>

                    <ul className="pager wizard twitter-bs-wizard-pager-link">
                      <li
                        className={
                          activeTabwiz === 1
                            ? "previous disabled me-2"
                            : "previous me-2"
                        }
                      >
                        <Link
                          to="#"
                          onClick={() => {
                            toggleTabwiz(activeTabwiz - 1);
                          }}
                        >
                          Previous
                        </Link>
                      </li>
                      <li
                        className={
                          activeTabwiz === 4 ? "next disabled" : "next"
                        }
                      >
                        <Link
                          to="#"
                          onClick={() => {
                            toggleTabwiz(activeTabwiz + 1);
                          }}
                        >
                          Next
                        </Link>
                      </li>
                    </ul>
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

export default FormWizard;
