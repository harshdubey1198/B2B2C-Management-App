import React, { useState } from "react";

import {
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  Container,
  Label,
  Input,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const FormElements = () => {
  document.title = "Form Elements | aaMOBee - React Admin & Dashboard Template";
  const [toggleSwitch, settoggleSwitch] = useState(true);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Form Elements" />

          <Row>
            <Col>
              <Card>
                <CardBody>
                  <CardTitle className="h4">Textual inputs</CardTitle>
                  <p className="card-title-desc">
                    Here are examples of <code>.form-control</code> applied to
                    each textual HTML5 <code>&lt;input&gt;</code>{" "}
                    <code>type</code>.
                  </p>

                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Text
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="text"
                        defaultValue="Artisanal kale"
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="example-search-input"
                      className="col-md-2 col-form-label"
                    >
                      Search
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="search"
                        defaultValue="How do I shoot web"
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="example-email-input"
                      className="col-md-2 col-form-label"
                    >
                      Email
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="email"
                        defaultValue="bootstrap@example.com"
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="example-url-input"
                      className="col-md-2 col-form-label"
                    >
                      URL
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="url"
                        defaultValue="https://getbootstrap.com"
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="example-tel-input"
                      className="col-md-2 col-form-label"
                    >
                      Telephone
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="tel"
                        defaultValue="1-(555)-555-5555"
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="example-password-input"
                      className="col-md-2 col-form-label"
                    >
                      Password
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="password"
                        defaultValue="hunter2"
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="example-number-input"
                      className="col-md-2 col-form-label"
                    >
                      Number
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="number"
                        defaultValue="42"
                        id="example-number-input"
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="example-datetime-local-input"
                      className="col-md-2 col-form-label"
                    >
                      Date and time
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="datetime-local"
                        defaultValue="2019-08-19T13:45:00"
                        id="example-datetime-local-input"
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="example-date-input"
                      className="col-md-2 col-form-label"
                    >
                      Date
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="date"
                        defaultValue="2019-08-19"
                        id="example-date-input"
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="example-month-input"
                      className="col-md-2 col-form-label"
                    >
                      Month
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="month"
                        defaultValue="2019-08"
                        id="example-month-input"
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="example-week-input"
                      className="col-md-2 col-form-label"
                    >
                      Week
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="week"
                        defaultValue="2019-W33"
                        id="example-week-input"
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="example-time-input"
                      className="col-md-2 col-form-label"
                    >
                      Time
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="time"
                        defaultValue="13:45:00"
                        id="example-time-input"
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="example-color-input"
                      className="col-md-2 col-form-label"
                    >
                      Color picker
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control form-control-color mw-100"
                        type="color"
                        defaultValue="#556ee6"
                        id="example-color-input"
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label className="col-md-2 col-form-label">Select</label>
                    <div className="col-md-10">
                      <select className="form-control">
                        <option>Select</option>
                        <option>Large select</option>
                        <option>Small select</option>
                      </select>
                    </div>
                  </Row>
                  <Row>
                    <label className="col-md-2 col-form-label">Datalists</label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        list="datalistOptions"
                        id="exampleDataList"
                        placeholder="Type to search..."
                      />
                      <datalist id="datalistOptions">
                        <option defaultValue="San Francisco" />
                        <option defaultValue="New York" />
                        <option defaultValue="Seattle" />
                        <option defaultValue="Los Angeles" />
                        <option defaultValue="Chicago" />
                      </datalist>
                    </div>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4">Sizing</CardTitle>
                  <p className="card-title-desc">
                    Set heights using className like{" "}
                    <code>.form-control-lg</code> and{" "}
                    <code>.form-control-sm</code>.
                  </p>
                  <div>
                    <Row>
                      <Col lg={4}>
                        <div>
                          <label className="form-label">Default input</label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Default input"
                          />
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div>
                          <label className="form-label">Form Small input</label>
                          <input
                            className="form-control form-control-sm"
                            type="text"
                            placeholder=".form-control-sm"
                          />
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div>
                          <label className="form-label">Form Large input</label>
                          <input
                            className="form-control form-control-lg"
                            type="text"
                            placeholder=".form-control-lg"
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4">Range Inputs</CardTitle>
                  <p className="card-title-desc">
                    Create custom{" "}
                    <code>&lt;input type=&quot;range&ldquo;&gt;</code> controls
                    with <code>.form-range</code>.
                  </p>

                  <Row>
                    <Col lg={6}>
                      <div>
                        <Label htmlFor="customRange1" className="form-label">
                          Example range
                        </Label>
                        <Input
                          type="range"
                          className="form-range"
                          id="customRange1"
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div>
                        <Label htmlFor="customRange1" className="form-label">
                          Disabled Range{" "}
                        </Label>
                        <Input
                          type="range"
                          className="form-range"
                          id="customRange1"
                          disabled
                        />
                      </div>
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col lg={6}>
                      <div className="mt-4">
                        <h5 className="font-size-14">Min and max</h5>
                        <p className="card-title-desc">
                          Range inputs have implicit values for min and max—0
                          and 100, respectively.
                        </p>
                        <input
                          type="range"
                          className="form-range"
                          min="0"
                          max="5"
                          id="customRange2"
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mt-4">
                        <h5 className="font-size-14">Steps</h5>
                        <p className="card-title-desc">
                          By default, range inputs “snap” to integer values. To
                          change this, you can specify a <code>step</code>{" "}
                          value.
                        </p>
                        <input
                          type="range"
                          className="form-range"
                          min="0"
                          max="5"
                          id="customRange2"
                        />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle>Checkboxes</CardTitle>
                  <p>
                    Checks use custom Bootstrap icons to indicate checked or
                    indeterminate states.
                  </p>

                  <Row>
                    <Col xl={3} sm={6}>
                      <div className="mt-2">
                        <h5 className="font-size-14 mb-4">
                          <u> Default Checkboxes </u>
                        </h5>
                        <div className="form-check mb-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue=""
                            id="defaultCheck1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="defaultCheck1"
                          >
                            Default Checkboxes
                          </label>
                        </div>
                        <div className="form-check form-check-end">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue=""
                            id="defaultCheck2"
                            defaultChecked
                          />
                          <label
                            className="form-check-label"
                            htmlFor="defaultCheck2"
                          >
                            Default Checkboxes
                          </label>
                        </div>
                      </div>
                    </Col>
                    <Col xl={3} sm={6}>
                      <div className="mt-2">
                        <h5 className="font-size-14 mb-4">
                          <u> Form Checkboxes Right </u>
                        </h5>
                        <div className="form-check form-check-right mb-3">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="CustomCheck1"
                          />
                          <label className="form-check-label">
                            Form Checkbox Right
                          </label>
                        </div>
                        <br />
                        <div className="form-check form-check-right">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customCheck2"
                            defaultChecked
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customCheck2"
                          >
                            Form checked Checkboxs Right
                          </label>
                        </div>
                      </div>
                    </Col>
                    <Col xl={3} sm={6}>
                      <h5 className="font-size-14 mb-3">
                        <u>Inline Checkboxes</u>
                      </h5>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="inlineCheck1"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineCheck1"
                        >
                          Inline Check 1
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="inlineCheck2"
                          defaultChecked
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineCheck2"
                        >
                          Inline Check 2
                        </label>
                      </div>
                    </Col>

                    <Col xl={3} sm={6}>
                      <h5 className="font-size-14 mb-3">
                        <u>Disable Checkboxes</u>
                      </h5>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="flexCheckDisabled"
                          disabled
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDisabled"
                        >
                          Disabled checkbox
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="flexCheckCheckedDisabled"
                          defaultChecked
                          disabled
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckCheckedDisabled"
                        >
                          Disabled checked checkbox
                        </label>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4">Radios</CardTitle>

                  <Row>
                    <Col xl={3} sm={6}>
                      <div className="mt-3">
                        <h5 className="font-size-14">
                          <u>Default Radios</u>
                        </h5>
                        <div className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios1"
                            defaultValue="option1"
                            defaultChecked
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleRadios1"
                          >
                            Default Radio
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios2"
                            defaultValue="option2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleRadios2"
                          >
                            Default Radio
                          </label>
                        </div>
                      </div>
                    </Col>
                    <Col xl={3} sm={6}>
                      <div className="mt-3">
                        <h5 className="font-size-14 mb-2">
                          <u>Form Radios Right</u>
                        </h5>
                        <div>
                          <div className="form-check form-check-right mb-2">
                            <input
                              type="radio"
                              id="customRadio1"
                              name="customRadio"
                              className="form-check-input"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="customRadio1"
                            >
                              Toggle this Form Radio Right
                            </label>
                          </div>
                        </div>
                        <div>
                          <div className="form-check form-check-right">
                            <input
                              type="radio"
                              id="customRadio2"
                              name="customRadio"
                              className="form-check-input"
                              defaultChecked
                            />
                            <label
                              className="form-check-label"
                              htmlFor="customRadio2"
                            >
                              or Toggle this Form Radio Right
                            </label>
                          </div>
                        </div>
                      </div>
                    </Col>

                    <Col xl={3} sm={6}>
                      <h5 className="font-size-14 mb-3 mt-2">
                        <u>Inline Radios</u>
                      </h5>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadios"
                          id="inlineRadios1"
                          defaultValue="option1"
                          defaultChecked
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadios1"
                        >
                          Inline Radio 1
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadios"
                          id="inlineRadios2"
                          defaultValue="option2"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadios2"
                        >
                          Inline Radio 2
                        </label>
                      </div>
                    </Col>
                    <Col xl={3} sm={6}>
                      <h5 className="font-size-14 mb-3">
                        <u>Disable Radios</u>
                      </h5>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDisabled"
                          id="flexRadioDisabled"
                          disabled
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDisabled"
                        >
                          Disabled radio
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDisabled"
                          id="flexRadioCheckedDisabled"
                          defaultChecked
                          disabled
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioCheckedDisabled"
                        >
                          Disabled checked radio
                        </label>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4">Switches</CardTitle>
                  <p className="card-title-desc">
                    A switch has the markup of a custom checkbox but uses the{" "}
                    <code>.form-switch</code> class to render a toggle switch.
                    Switches also support the <code>disabled</code> attribute.
                  </p>
                  <Row>
                    <Col sm={4}>
                      <div>
                        <h5 className="font-size-14 mb-3">
                          <u>Switch Examples</u>
                        </h5>
                        <div className="form-check form-switch mb-3">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customSwitch1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customSwitch1"
                          >
                            Default switch checkbox input
                          </label>
                        </div>
                        <div className="form-check form-switch mb-3">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customSwitch2"
                            defaultChecked
                            onClick={(e) => {
                              settoggleSwitch(!toggleSwitch);
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customSwitch2"
                          >
                            Checked switch checkbox input
                          </label>
                        </div>
                      </div>
                    </Col>

                    <Col sm={4}>
                      <div className="mt-4 mt-lg-0">
                        <h5 className="font-size-14 mb-3">
                          <u>Switch Sizes</u>
                        </h5>

                        <div className="form-check form-switch form-switch-md mb-3">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customSwitchsizemd"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customSwitchsizemd"
                          >
                            Medium Size Switch
                          </label>
                        </div>

                        <div className="form-check form-switch form-switch-lg mb-3">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customSwitchsizelg"
                            defaultChecked
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customSwitchsizelg"
                          >
                            Large Size Switch
                          </label>
                        </div>
                      </div>
                    </Col>
                    <Col sm={4}>
                      <h5 className="font-size-14 mb-3">
                        <u>Disable Switch</u>
                      </h5>

                      <div className="form-check form-switch mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckDisabled"
                          disabled
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexSwitchCheckDisabled"
                        >
                          Disabled switch
                        </label>
                      </div>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckCheckedDisabled"
                          defaultChecked
                          disabled
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexSwitchCheckCheckedDisabled"
                        >
                          Disabled checked switch
                        </label>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody>
                    <CardTitle className="h4">Inline Forms</CardTitle>
                    <p className="card-title-desc">
                      Use the <code>.form-inline</code> class to display a
                      series of labels, form controls, and buttons on a single
                      horizontal row.
                    </p>

                    <form className="row row-cols-lg-auto g-3 align-items-center">
                      <div className="col-12">
                        <label
                          className="visually-hidden"
                          htmlFor="inlineFormInputGroupUsername"
                        >
                          Username
                        </label>
                        <div className="input-group">
                          <div className="input-group-text">@</div>
                          <input
                            type="text"
                            className="form-control"
                            id="inlineFormInputGroupUsername"
                            placeholder="Username"
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <label
                          className="visually-hidden"
                          htmlFor="inlineFormSelectPref"
                        >
                          Preference
                        </label>
                        <select
                          className="form-select"
                          id="inlineFormSelectPref"
                        >
                          <option defaultValue>Choose...</option>
                          <option defaultValue="1">One</option>
                          <option defaultValue="2">Two</option>
                          <option defaultValue="3">Three</option>
                        </select>
                      </div>

                      <div className="col-12">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="inlineFormCheck"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineFormCheck"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>

                      <div className="col-12">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </form>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody>
                    <CardTitle className="h4">Auto sizing</CardTitle>
                    <p className="card-title-desc">
                      The example below uses a flexbox utility to vertically
                      center the contents and changes <code>.col</code> to{" "}
                      <code>.col-auto</code> so that your columns only take up
                      as much space as needed. Put another way, the column sizes
                      itself based on the contents.
                    </p>

                    <form className="row gy-2 gx-3 align-items-center">
                      <div className="col-auto">
                        <label
                          className="visually-hidden"
                          htmlFor="autoSizingInput"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="autoSizingInput"
                          placeholder="Jane Doe"
                        />
                      </div>
                      <div className="col-auto">
                        <label
                          className="visually-hidden"
                          htmlFor="autoSizingInputGroup"
                        >
                          Username
                        </label>
                        <div className="input-group">
                          <div className="input-group-text">@</div>
                          <input
                            type="text"
                            className="form-control"
                            id="autoSizingInputGroup"
                            placeholder="Username"
                          />
                        </div>
                      </div>
                      <div className="col-auto">
                        <label
                          className="visually-hidden"
                          htmlFor="autoSizingSelect"
                        >
                          Preference
                        </label>
                        <select className="form-select" id="autoSizingSelect">
                          <option defaultValue>Choose...</option>
                          <option defaultValue="1">One</option>
                          <option defaultValue="2">Two</option>
                          <option defaultValue="3">Three</option>
                        </select>
                      </div>
                      <div className="col-auto">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="autoSizingCheck"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="autoSizingCheck"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>
                      <div className="col-auto">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </form>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col xl={12}>
                <Card>
                  <CardBody>
                    <h5 className="card-title">Floating labels</h5>
                    <p className="card-title-desc">
                      Create beautifully simple form labels that float over your
                      input fields.
                    </p>

                    <form>
                      <Row>
                        <Col md={6}>
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              id="floatingFirstnameInput"
                              placeholder="Enter Your First Name"
                            />
                            <label htmlFor="floatingFirstnameInput">
                              First Name
                            </label>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              id="floatingLastnameInput"
                              placeholder="Enter Your Last Name"
                            />
                            <label htmlFor="floatingLastnameInput">
                              Last Name
                            </label>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <div className="form-floating mb-3">
                            <input
                              type="email"
                              className="form-control"
                              id="floatingemailInput"
                              placeholder="Enter Email address"
                            />
                            <label htmlFor="floatingemailInput">
                              Email address
                            </label>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="form-floating mb-3">
                            <select
                              className="form-select"
                              id="floatingSelectGrid"
                              aria-label="Floating label select example"
                            >
                              <option defaultValue>
                                Open this select menu
                              </option>
                              <option defaultValue="1">One</option>
                              <option defaultValue="2">Two</option>
                              <option defaultValue="3">Three</option>
                            </select>
                            <label htmlFor="floatingSelectGrid">
                              Works with selects
                            </label>
                          </div>
                        </Col>
                      </Row>

                      <div className="mb-3">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="floatingCheck"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="floatingCheck"
                          >
                            Check me out
                          </label>
                        </div>
                      </div>
                      <div>
                        <button type="submit" className="btn btn-primary w-md">
                          Submit
                        </button>
                      </div>
                    </form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody>
                    <CardTitle className="h4">Inline Form With Stack</CardTitle>
                    <p className="card-title-desc">
                      Create an inline form with <code>.hstack</code>:
                    </p>

                    <div className="w-50">
                      <div className="hstack gap-3">
                        <input
                          className="form-control me-auto"
                          type="text"
                          placeholder="Add your item here..."
                          aria-label="Add your item here..."
                        />
                        <button type="button" className="btn btn-secondary">
                          Submit
                        </button>
                        <div className="vr"></div>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                        >
                          Reset
                        </button>
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

export default FormElements;
