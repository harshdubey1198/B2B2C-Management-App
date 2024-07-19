import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Container,
  Col,
  Row,
  Card,
  CardBody,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const UiButtons = () => {
  const [drp_link, setdrp_link] = useState(false);
  const [drp_link1, setdrp_link1] = useState(false);
  document.title = "Buttons | aaMOBee";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="UI Elements" breadcrumbItem="Buttons" />

          <Row>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <h4 className="card-title">Basic Examples</h4>
                  <p className="card-title-desc">
                    Bootstrap includes six predefined button styles, each
                    serving its own semantic purpose.
                  </p>

                  <div className="d-flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="btn btn-primary waves-effect waves-light"
                    >
                      Primary
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary waves-effect waves-light"
                    >
                      Secondary
                    </button>
                    <button
                      type="button"
                      className="btn btn-success waves-effect waves-light"
                    >
                      Success
                    </button>
                    <button
                      type="button"
                      className="btn btn-info waves-effect waves-light"
                    >
                      Info
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning waves-effect waves-light"
                    >
                      Warning
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger waves-effect waves-light"
                    >
                      Danger
                    </button>
                    <button
                      type="button"
                      className="btn btn-light waves-effect"
                    >
                      Light
                    </button>
                    <button
                      type="button"
                      className="btn btn-dark waves-effect waves-light"
                    >
                      Dark
                    </button>
                    <button
                      type="button"
                      className="btn btn-link waves-effect"
                    >
                      Link
                    </button>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col lg={6}>
              <Card>
                <CardBody>
                  <h4 className="card-title">Outline Buttons</h4>
                  <p className="card-title-desc">
                    In need of a button, but not the hefty background colors
                    they bring? Replace the default modifier classes with the{" "}
                    <code>.btn-outline-*</code> ones to remove all background
                    images and colors on any button.
                  </p>

                  <div className="d-flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-primary waves-effect waves-light"
                    >
                      Primary
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary waves-effect waves-light"
                    >
                      Secondary
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-success waves-effect waves-light"
                    >
                      Success
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-info waves-effect waves-light"
                    >
                      Info
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-warning waves-effect waves-light"
                    >
                      Warning
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger waves-effect waves-light"
                    >
                      Danger
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-dark waves-effect waves-light"
                    >
                      Dark
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-light waves-effect"
                    >
                      Light
                    </button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xl={6}>
              <Card>
                <CardBody>
                  <h4 className="card-title">Rounded Buttons</h4>
                  <p className="card-title-desc">
                    Use class <code>.btn-rounded</code> for button round
                    border.
                  </p>
                  <div className="d-flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="btn btn-primary btn-rounded waves-effect waves-light"
                    >
                      Primary
                    </button>
                    <button
                      type="button"
                      className="btn btn-light btn-rounded waves-effect"
                    >
                      Light
                    </button>
                    <button
                      type="button"
                      className="btn btn-success btn-rounded waves-effect waves-light"
                    >
                      Success
                    </button>
                    <button
                      type="button"
                      className="btn btn-info btn-rounded waves-effect waves-light"
                    >
                      Info
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning btn-rounded waves-effect waves-light"
                    >
                      Warning
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-rounded waves-effect waves-light"
                    >
                      Danger
                    </button>
                    <button
                      type="button"
                      className="btn btn-dark btn-rounded waves-effect waves-light"
                    >
                      Dark
                    </button>
                    <button
                      type="button"
                      className="btn btn-link btn-rounded waves-effect"
                    >
                      Link
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-rounded waves-effect waves-light"
                    >
                      Secondary
                    </button>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xl={6}>
              <Card>
                <CardBody>
                  <h4 className="card-title">Buttons with Icon</h4>
                  <p className="card-title-desc">Add icon in button.</p>
                  <div className="d-flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="btn btn-primary waves-effect waves-light"
                    >
                      Primary{" "}
                      <i className="ri-arrow-right-line align-middle ms-2"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-success waves-effect waves-light"
                    >
                      <i className="ri-check-line align-middle me-2"></i>{" "}
                      Success
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning waves-effect waves-light"
                    >
                      <i className="ri-error-warning-line align-middle me-2"></i>{" "}
                      Warning
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger waves-effect waves-light"
                    >
                      <i className="ri-close-line align-middle me-2"></i>{" "}
                      Danger
                    </button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <h4 className="card-title">Button Tags</h4>
                  <p className="card-title-desc">
                    The <code>.btn</code> {' '}
                    classes are designed to be used with the{" "}
                    <code>&lt;button&gt;</code> element. However, you can also
                    use these classes on <code>&lt;a&gt;</code> or{" "}
                    <code>&lt;input&gt;</code> elements (though some browsers
                    may apply a slightly different rendering).
                  </p>

                  <div className="d-flex flex-wrap gap-2">
                    <Link to="#" className="btn btn-success" role="button">
                      Link
                    </Link>
                    <button className="btn btn-primary" type="submit">
                      Button
                    </button>
                    <input
                      className="btn btn-info"
                      type="button"
                      value="Input"
                    />
                    <input
                      className="btn btn-warning"
                      type="submit"
                      value="Submit"
                    />
                    <input
                      className="btn btn-danger"
                      type="reset"
                      value="Reset"
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col lg={6}>
              <Card>
                <CardBody>
                  <h4 className="card-title">Button Sizes</h4>
                  <p className="card-title-desc">
                    Fancy larger or smaller buttons? Add {" "}
                    <code>.btn-lg</code> or <code>.btn-sm</code> for
                    additional sizes.
                  </p>

                  <div className="d-flex flex-wrap gap-2 align-items-center">
                    <button
                      type="button"
                      className="btn btn-info btn-lg waves-effect waves-light"
                    >
                      Large Button
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-lg waves-effect waves-light"
                    >
                      Large Button
                    </button>
                    <button
                      type="button"
                      className="btn btn-info btn-sm waves-effect waves-light"
                    >
                      Small Button
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm waves-effect waves-light"
                    >
                      Small Button
                    </button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xl={6}>
              <Card>
                <CardBody>
                  <h4 className="card-title">Button Disabled State</h4>
                  <p className="card-title-desc">
                    Make buttons look inactive by adding the{" "}
                    <code>disabled</code> boolean attribute to any{" "}
                    <code>&lt;button&gt;</code> element. Disabled buttons have{" "}
                    <code>pointer-events: none</code> applied to, preventing
                    hover and active states from triggering.
                  </p>

                  <div className="d-flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="btn btn-primary"
                      disabled
                    >
                      Primary Button
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      disabled
                    >
                      Button
                    </button>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xl={6}>
              <Card>
                <CardBody>
                  <h4 className="card-title">
                    Link Functionality Caveat Disable Buttons
                  </h4>
                  <p className="card-title-desc">
                    <code>&lt;a&gt;</code>s don't support the{" "}
                    <code>disabled</code> attribute, so you must add the{" "}
                    <code>.disabled</code> class and{" "}
                    <code>aria-disabled="true"</code> to make it visually
                    appear disabled. also include a <code>tabindex="-1"</code>{" "}
                    attribute.
                  </p>

                  <div className="d-flex flex-wrap gap-2">
                    <Link to="#"
                      className="btn btn-primary disabled"
                      role="button"
                      aria-disabled="true"
                    >
                      Primary link
                    </Link>
                    <Link to="#"
                      className="btn btn-secondary disabled"
                      role="button"
                      aria-disabled="true"
                    >
                      Link
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <div className="col-lg-6">
              <Card>
                <CardBody>
                  <h4 className="card-title">Block Buttons</h4>
                  <p className="card-title-desc">
                    Create block level buttons—those that span the full width
                    of a parent—by adding <code>.d-grid</code>.
                  </p>

                  <div className="d-grid flex-wrap gap-2 align-items-center">
                    <button
                      type="button"
                      className="btn btn-primary btn-lg waves-effect waves-light"
                    >
                      Block level button
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm waves-effect waves-light"
                    >
                      Block level button
                    </button>
                  </div>
                </CardBody>
              </Card>
            </div>

            <Col lg={6}>
              <Card>
                <CardBody>
                  <h4 className="card-title">Toggle States</h4>
                  <p className="card-title-desc">
                    Add <code>data-bs-toggle="button"</code>{" "}
                    to toggle a button's <code>active</code>{" "}
                    state. If you're pre-toggling a button, you must manually
                    add the <code>.active</code> class {" "}
                    <strong>and</strong> <code>aria-pressed="true"</code> to
                    the {" "}
                    <code>&lt;button&gt;</code>.
                  </p>

                  <div className="d-flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="button"
                      autoComplete="off"
                    >
                      Toggle Button
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary active"
                      data-bs-toggle="button"
                      autoComplete="off"
                      aria-pressed="true"
                    >
                      Active toggle Button
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      disabled
                      data-bs-toggle="button"
                      autoComplete="off"
                    >
                      Disabled toggle Button
                    </button>
                  </div>

                  <div className="d-flex flex-wrap gap-2 mt-2">
                    <Link
                      to="#"
                      className="btn btn-primary"
                      role="button"
                      data-bs-toggle="button"
                    >
                      Toggle link
                    </Link>
                    <Link
                      to="#"
                      className="btn btn-primary active"
                      role="button"
                      data-bs-toggle="button"
                      aria-pressed="true"
                    >
                      Active Toggle link
                    </Link>
                    <Link
                      to="#"
                      className="btn btn-primary disabled"
                      aria-disabled="true"
                      role="button"
                      data-bs-toggle="button"
                    >
                      Disabled Toggle link
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <h4 className="card-title">Button Group</h4>
                  <p className="card-title-desc">
                    Wrap a series of buttons with <code>.btn</code> in{" "}
                    <code>.btn-group</code>.
                  </p>

                  <div className="d-flex flex-wrap gap-3 align-items-center">
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button type="button" className="btn btn-primary">
                        Left
                      </button>
                      <button type="button" className="btn btn-primary">
                        Middle
                      </button>
                      <button type="button" className="btn btn-primary">
                        Right
                      </button>
                    </div>

                    <div className="btn-group">
                      <Link
                        to="#"
                        className="btn btn-primary active"
                        aria-current="page"
                      >
                        Active link
                      </Link>
                      <Link to="#" className="btn btn-primary">
                        Link
                      </Link>
                      <Link to="#" className="btn btn-primary">
                        Link
                      </Link>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col lg={6}>
              <Card>
                <CardBody>
                  <h4 className="card-title">Button Group Style</h4>
                  <p className="card-title-desc">
                    Wrap a series of buttons with Mixed Style and Outline
                    button
                  </p>

                  <div className="d-flex flex-wrap gap-3">
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic mixed styles example"
                    >
                      <button type="button" className="btn btn-danger">
                        Left
                      </button>
                      <button type="button" className="btn btn-warning">
                        Middle
                      </button>
                      <button type="button" className="btn btn-success">
                        Right
                      </button>
                    </div>

                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic outlined example"
                    >
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                      >
                        Left
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                      >
                        Middle
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                      >
                        Right
                      </button>
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
                  <h4 className="card-title">Checkbox Buttons</h4>
                  <p className="card-title-desc">
                    Bootstrap's <code>.button</code> styles can be applied to
                    other elements, such as <code> &lt;label&gt;</code>s, to
                    provide checkbox style button toggling. Add{" "}
                    <code>data-bs-toggle="buttons"</code> to a {" "}
                    <code>.btn-group</code> containing those modified buttons
                    to enable toggling in their respective styles.
                  </p>

                  <div className="d-flex flex-wrap gap-3 align-items-start">
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic checkbox toggle button group"
                    >
                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btncheck1"
                        autoComplete="off"
                      />
                      <label className="btn btn-primary" htmlFor="btncheck1">
                        Checkbox 1
                      </label>

                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btncheck2"
                        autoComplete="off"
                      />
                      <label className="btn btn-primary" htmlFor="btncheck2">
                        Checkbox 2
                      </label>

                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btncheck3"
                        autoComplete="off"
                      />
                      <label className="btn btn-primary" htmlFor="btncheck3">
                        Checkbox 3
                      </label>
                    </div>

                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic checkbox toggle button group"
                    >
                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btncheck4"
                        autoComplete="off"
                      />
                      <label
                        className="btn btn-outline-primary"
                        htmlFor="btncheck4"
                      >
                        Checkbox 4
                      </label>

                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btncheck5"
                        autoComplete="off"
                      />
                      <label
                        className="btn btn-outline-primary"
                        htmlFor="btncheck5"
                      >
                        Checkbox 5
                      </label>

                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btncheck6"
                        autoComplete="off"
                      />
                      <label
                        className="btn btn-outline-primary"
                        htmlFor="btncheck6"
                      >
                        Checkbox 6
                      </label>
                    </div>
                  </div>

                  <div className="d-flex flex-wrap gap-3 align-items-start mt-2">
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic checkbox toggle button group"
                    >
                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btncheck7"
                        autoComplete="off"
                      />
                      <label className="btn btn-primary" htmlFor="btncheck7">
                        <i className="mdi mdi-microphone"></i> Singing
                      </label>

                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btncheck8"
                        autoComplete="off"
                      />
                      <label className="btn btn-primary" htmlFor="btncheck8">
                        <i className="mdi mdi-book-open"></i> Reading
                      </label>

                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btncheck9"
                        autoComplete="off"
                      />
                      <label className="btn btn-primary" htmlFor="btncheck9">
                        <i className="mdi mdi-gamepad-variant-outline"></i>{" "}
                        Playing
                      </label>
                    </div>

                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic checkbox toggle button group"
                    >
                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btncheck10"
                        autoComplete="off"
                      />
                      <label
                        className="btn btn-outline-primary"
                        htmlFor="btncheck10"
                      >
                        <i className="mdi mdi-microphone"></i> Singing
                      </label>

                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btncheck11"
                        autoComplete="off"
                      />
                      <label
                        className="btn btn-outline-primary"
                        htmlFor="btncheck11"
                      >
                        <i className="mdi mdi-book-open"></i> Reading
                      </label>

                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btncheck12"
                        autoComplete="off"
                      />
                      <label
                        className="btn btn-outline-primary"
                        htmlFor="btncheck12"
                      >
                        <i className="mdi mdi-gamepad-variant-outline"></i>{" "}
                        Playing
                      </label>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col lg={6}>
              <Card>
                <CardBody>
                  <h4 className="card-title">Radio Buttons</h4>
                  <p className="card-title-desc">
                    Bootstrap's <code>.button</code> styles can be applied to
                    other elements, such as <code> &lt;label&gt;</code>s, to
                    provide radio style button toggling. Add{" "}
                    <code>data-bs-toggle="buttons"</code> to a {" "}
                    <code>.btn-group</code> containing those modified buttons
                    to enable toggling in their respective styles.
                  </p>

                  <div className="d-flex flex-wrap gap-3">
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic radio toggle button group"
                    >
                      <input
                        type="radio"
                        className="btn-check"
                        name="btnradio"
                        id="btnradio1"
                        autoComplete="off"
                        defaultChecked
                      />
                      <label className="btn btn-primary" htmlFor="btnradio1">
                        Radio 1
                      </label>

                      <input
                        type="radio"
                        className="btn-check"
                        name="btnradio"
                        id="btnradio2"
                        autoComplete="off"
                      />
                      <label className="btn btn-primary" htmlFor="btnradio2">
                        Radio 2
                      </label>

                      <input
                        type="radio"
                        className="btn-check"
                        name="btnradio"
                        id="btnradio3"
                        autoComplete="off"
                      />
                      <label className="btn btn-primary" htmlFor="btnradio3">
                        Radio 3
                      </label>
                    </div>

                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic radio toggle button group"
                    >
                      <input
                        type="radio"
                        className="btn-check"
                        name="btnradio"
                        id="btnradio4"
                        autoComplete="off"
                        defaultChecked
                      />
                      <label
                        className="btn btn-outline-primary"
                        htmlFor="btnradio4"
                      >
                        Radio 4
                      </label>

                      <input
                        type="radio"
                        className="btn-check"
                        name="btnradio"
                        id="btnradio5"
                        autoComplete="off"
                      />
                      <label
                        className="btn btn-outline-primary"
                        htmlFor="btnradio5"
                      >
                        Radio 5
                      </label>

                      <input
                        type="radio"
                        className="btn-check"
                        name="btnradio"
                        id="btnradio6"
                        autoComplete="off"
                      />
                      <label
                        className="btn btn-outline-primary"
                        htmlFor="btnradio6"
                      >
                        Radio 6
                      </label>
                    </div>
                  </div>

                  <div className="d-flex flex-wrap gap-3 mt-2">
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic radio toggle button group"
                    >
                      <input
                        type="radio"
                        className="btn-check"
                        name="btnradio"
                        id="btnradioMale"
                        autoComplete="off"
                        defaultChecked
                      />
                      <label className="btn btn-primary" htmlFor="btnradioMale">
                        <i className="mdi mdi-human-male"></i> Male
                      </label>

                      <input
                        type="radio"
                        className="btn-check"
                        name="btnradio"
                        id="btnradioFemale"
                        autoComplete="off"
                      />
                      <label className="btn btn-primary" htmlFor="btnradioFemale">
                        <i className="mdi mdi-human-female"></i> Female
                      </label>
                    </div>

                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic radio toggle button group"
                    >
                      <input
                        type="radio"
                        className="btn-check"
                        name="btnradio"
                        id="align-left"
                        autoComplete="off"
                      />
                      <label
                        className="btn btn-outline-primary"
                        htmlFor="align-left"
                      >
                        <i className="mdi mdi-format-align-left"></i>
                      </label>

                      <input
                        type="radio"
                        className="btn-check"
                        name="btnradio"
                        id="align-center"
                        autoComplete="off"
                        defaultChecked
                      />
                      <label
                        className="btn btn-outline-primary"
                        htmlFor="align-center"
                      >
                        <i className="mdi mdi-format-align-center"></i>
                      </label>

                      <input
                        type="radio"
                        className="btn-check"
                        name="btnradio"
                        id="align-right"
                        autoComplete="off"
                      />
                      <label
                        className="btn btn-outline-primary"
                        htmlFor="align-right"
                      >
                        <i className="mdi mdi-format-align-right"></i>
                      </label>
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
                  <h4 className="card-title">Button Toolbar</h4>
                  <p className="card-title-desc">
                    Wrap a series of buttons with <code>.btn</code> in{" "}
                    <code>.btn-group</code>.
                  </p>

                  <div className="d-flex flex-wrap gap-3 align-items-center">
                    <div
                      className="btn-toolbar"
                      role="toolbar"
                      aria-label="Toolbar with button groups"
                    >
                      <div
                        className="btn-group me-2"
                        role="group"
                        aria-label="First group"
                      >
                        <button type="button" className="btn btn-primary">
                          1
                        </button>
                        <button type="button" className="btn btn-primary">
                          2
                        </button>
                        <button type="button" className="btn btn-primary">
                          3
                        </button>
                        <button type="button" className="btn btn-primary">
                          4
                        </button>
                      </div>
                      <div
                        className="btn-group me-2"
                        role="group"
                        aria-label="Second group"
                      >
                        <button type="button" className="btn btn-secondary">
                          5
                        </button>
                        <button type="button" className="btn btn-secondary">
                          6
                        </button>
                        <button type="button" className="btn btn-secondary">
                          7
                        </button>
                      </div>
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Third group"
                      >
                        <button type="button" className="btn btn-info">
                          8
                        </button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col lg={6}>
              <Card>
                <CardBody>
                  <h4 className="card-title">Nesting</h4>
                  <p className="card-title-desc">
                    Place a <code>.btn-group</code> within another{" "}
                    <code>.btn-group</code> when you want dropdown menus mixed
                    with a series of buttons.
                  </p>

                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Button group with nested dropdown"
                  >
                    <button type="button" className="btn btn-primary">
                      1
                    </button>
                    <button type="button" className="btn btn-primary">
                      2
                    </button>

                    <div className="btn-group" role="group">
                      <ButtonDropdown
                        isOpen={drp_link1}
                        toggle={() => {
                          setdrp_link1(!drp_link1);
                        }}
                      >
                        <DropdownToggle caret color="primary">
                          Dropdown <i className="mdi mdi-chevron-down"></i>
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem>Dropdown link</DropdownItem>
                          <DropdownItem>Dropdown link</DropdownItem>
                        </DropdownMenu>
                      </ButtonDropdown>
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
                  <h4 className="card-title">Button Group Size</h4>
                  <p className="card-title-desc">
                    Instead of applying button sizing classes to every button
                    in a group, just add {" "}
                    <code>.btn-group-*</code> to each <code>.btn-group</code>,
                    including each one when nesting multiple groups.
                  </p>

                  <div className="d-flex flex-row align-items-center gap-3">
                    <div
                      className="btn-group btn-group-lg"
                      role="group"
                      aria-label="Large button group"
                    >
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                      >
                        Left
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                      >
                        Middle
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                      >
                        Right
                      </button>
                    </div>

                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Default button group"
                    >
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                      >
                        Left
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                      >
                        Middle
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                      >
                        Right
                      </button>
                    </div>

                    <div
                      className="btn-group btn-group-sm"
                      role="group"
                      aria-label="Small button group"
                    >
                      <button
                        type="button"
                        className="btn btn-outline-warning"
                      >
                        Left
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-warning"
                      >
                        Middle
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-warning"
                      >
                        Right
                      </button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col lg={6}>
              <Card>
                <CardBody>
                  <h4 className="card-title">Vertical Variation</h4>
                  <p className="card-title-desc">
                    Make a set of buttons appear vertically stacked rather
                    than horizontally.{" "}
                    <b>Split button dropdowns are not supported here.</b>
                  </p>

                  <div className="d-flex flex-wrap gap-4 align-items-end">
                    <div
                      className="btn-group-vertical"
                      role="group"
                      aria-label="Vertical button group"
                    >
                      <button type="button" className="btn btn-secondary">
                        Button
                      </button>
                      <button type="button" className="btn btn-secondary">
                        Button
                      </button>
                      <button type="button" className="btn btn-secondary">
                        Button
                      </button>
                    </div>

                    <div
                      className="btn-group-vertical"
                      role="group"
                      aria-label="Vertical button group"
                    >
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                      >
                        Button
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                      >
                        Button
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                      >
                        Button
                      </button>
                    </div>

                    <div
                      className="btn-group-vertical"
                      role="group"
                      aria-label="Vertical button group"
                    >
                      <button type="button" className="btn btn-secondary">
                        Button
                      </button>
                      <div className="btn-group" role="group">
                        <ButtonDropdown
                          isOpen={drp_link}
                          toggle={() => {
                            setdrp_link(!drp_link);
                          }}
                        >
                          <DropdownToggle caret color="secondary">
                            Dropdown <i className="mdi mdi-chevron-down"></i>
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem>Dropdown link</DropdownItem>
                            <DropdownItem>Dropdown link</DropdownItem>
                          </DropdownMenu>
                        </ButtonDropdown>
                      </div>

                      <button type="button" className="btn btn-secondary">
                        Button
                      </button>
                    </div>

                    <div
                      className="btn-group-vertical"
                      role="group"
                      aria-label="Vertical radio toggle button group"
                    >
                      <input
                        type="radio"
                        className="btn-check"
                        name="vbtn-radio"
                        id="vbtn-radio1"
                        autoComplete="off"
                        defaultChecked
                      />
                      <label
                        className="btn btn-outline-danger"
                        htmlFor="vbtn-radio1"
                      >
                        Radio 1
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="vbtn-radio"
                        id="vbtn-radio2"
                        autoComplete="off"
                      />
                      <label
                        className="btn btn-outline-danger"
                        htmlFor="vbtn-radio2"
                      >
                        Radio 2
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="vbtn-radio"
                        id="vbtn-radio3"
                        autoComplete="off"
                      />
                      <label
                        className="btn btn-outline-danger"
                        htmlFor="vbtn-radio3"
                      >
                        Radio 3
                      </label>
                    </div>

                    <div
                      className="btn-group-vertical"
                      role="group"
                      aria-label="Vertical radio toggle button group"
                    >
                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btncheck13"
                        autoComplete="off"
                      />
                      <label
                        className="btn btn-outline-primary"
                        htmlFor="btncheck13"
                      >
                        <i className="mdi mdi-microphone"></i> Singing
                      </label>

                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btncheck14"
                        autoComplete="off"
                      />
                      <label
                        className="btn btn-outline-primary"
                        htmlFor="btncheck14"
                      >
                        <i className="mdi mdi-book-open"></i> Reading
                      </label>

                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btncheck15"
                        autoComplete="off"
                      />
                      <label
                        className="btn btn-outline-primary"
                        htmlFor="btncheck15"
                      >
                        <i className="mdi mdi-gamepad-variant-outline me-1"></i>
                        Playing
                      </label>
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

export default UiButtons;
