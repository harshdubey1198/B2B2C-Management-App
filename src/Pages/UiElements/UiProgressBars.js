import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Progress,
  Row,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const UiProgressbar = () => {
  document.title = "Progress Bars | aaMOBee";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="UI Elements" breadcrumbItem="Progress Bars" />

          <Row>
            <Col xl={6}>
              <Card>
                <CardBody>
                  <CardTitle className="h4">Default Examples</CardTitle>
                  <p className="card-title-desc">
                    Progress components are built with two HTML elements, some
                    CSS to set the width, and a few attributes.
                  </p>
                  <div>
                    <div className="mb-4">
                      <Progress color="primary" value={25}></Progress>
                    </div>{" "}
                    <div className="mb-4">
                      <Progress color="primary" value={50}></Progress>
                    </div>
                    <div className="mb-4">
                      <Progress color="primary" value={75}></Progress>
                    </div>
                    <div>
                      <Progress color="primary" value={100}></Progress>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xl={6}>
              <Card>
                <CardBody>
                  <CardTitle className="h4">Backgrounds</CardTitle>
                  <p className="card-title-desc">
                    Use background utility classes to change the appearance of
                    individual progress bars.
                  </p>

                  <div>
                    <div className="mb-4">
                      <Progress color="success" value={25}></Progress>
                    </div>

                    <div className="mb-4">
                      <Progress color="info" value={50}></Progress>
                    </div>

                    <div className="mb-4">
                      <Progress color="warning" value={75}></Progress>
                    </div>

                    <div>
                      <Progress color="danger" value={100}></Progress>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xl={6}>
              <Card>
                <CardBody>
                  <CardTitle className="h4">Labels Example</CardTitle>
                  <p className="card-title-desc">
                    Add labels to your progress bars by placing text within the{" "}
                    <code className="highlighter-rouge">.progress-bar</code>.
                  </p>

                  <div className="">
                    <Progress color="primary" value={25}>
                      25%
                    </Progress>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xl={6}>
              <Card>
                <CardBody>
                  <CardTitle className="h4">Multiple bars</CardTitle>
                  <p className="card-title-desc">
                    Include multiple progress bars in a progress component if
                    you need.
                  </p>

                  <div className="">
                    <Progress multi>
                      <Progress bar color="primary" value={15}></Progress>
                      <Progress bar color="success" value={30}></Progress>
                      <Progress bar color="info" value={20}></Progress>
                    </Progress>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xl={6}>
              <Card>
                <CardBody>
                  <CardTitle className="h4">Height</CardTitle>
                  <p className="card-title-desc">
                    We only set a <code>height</code> value on the{" "}
                    <code>.progress-bar</code>, so if you change that value the
                    outer <code>.progress</code> will automatically resize
                    accordingly.
                  </p>

                  <div className="">
                    <div className="mb-3">
                      <Progress
                        value={25}
                        color="primary"
                        className="progress-sm"
                      ></Progress>
                    </div>
                    <div className="mb-3">
                      <Progress
                        value={40}
                        color="primary"
                        className="progress-sm"
                      ></Progress>
                    </div>
                    <div className="mb-3">
                      <Progress
                        value={60}
                        color="primary"
                        className="progress-md"
                      ></Progress>
                    </div>
                    <div className="mb-3">
                      <Progress
                        value={75}
                        color="primary"
                        className="progress-lg"
                      ></Progress>
                    </div>
                    <div>
                      <Progress
                        value={80}
                        color="primary"
                        style={{ height: "20px" }}
                        className="progress"
                      ></Progress>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xl={6}>
              <Card>
                <CardBody>
                  <CardTitle className="h4">Animated stripes</CardTitle>
                  <p className="card-title-desc">
                    The striped gradient can also be animated. Add{" "}
                    <code>.progress-bar-animated</code> to{" "}
                    <code>.progress-bar</code> to animate the stripes right to
                    left via CSS3 animations.
                  </p>

                  <div className="mb-4">
                    <Progress
                      value={75}
                      color="primary"
                      style={{ width: "100%" }}
                      animated
                    ></Progress>
                  </div>
                  <div className="mb-4">
                    <Progress
                      value={60}
                      color="success"
                      style={{ width: "100%" }}
                      animated
                    ></Progress>
                  </div>
                  <div className="mb-4">
                    <Progress
                      value={50}
                      color="warning"
                      style={{ width: "100%" }}
                      animated
                    ></Progress>
                  </div>
                  <div className="mb-1">
                    <Progress
                      value={35}
                      color="danger"
                      style={{ width: "100%" }}
                      animated
                    ></Progress>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xl={6}>
              <Card>
                <CardBody>
                  <CardTitle className="h4">Striped</CardTitle>
                  <p className="card-title-desc">
                    Add <code>.progress-bar-striped</code> to any{" "}
                    <code>.progress-bar</code> to apply a stripe via CSS
                    gradient over the progress bar's background color.
                  </p>

                  <div className="">
                    <div className="mb-4">
                      <Progress striped color="primary" value={10}></Progress>
                    </div>

                    <div className="mb-4">
                      <Progress striped color="success" value={25}></Progress>
                    </div>

                    <div className="mb-4">
                      <Progress striped color="info" value={50}></Progress>
                    </div>

                    <div className="mb-4">
                      <Progress striped color="warning" value={75}></Progress>
                    </div>

                    <div>
                      <Progress striped color="danger" value={100}></Progress>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={6}>
              <Card>
                <CardBody>
                  <CardTitle className="h4">Custom Progress</CardTitle>
                  <p className="card-title-desc mb-4">
                    Example Custom Progress
                  </p>

                  <div className="">
                    <div className="position-relative">
                      <div className="progress-label text-primary border-primary mb-2">
                        Html
                      </div>

                      <Progress
                        value={86}
                        className="progress-sm mb-4"
                        color="primary"
                        style={{ width: "100%" }}
                      ></Progress>
                    </div>

                    <div className="position-relative">
                      <div className="progress-label text-success border-success mb-2">
                        Css
                      </div>

                      <Progress
                        value={72}
                        className="progress-sm mb-4"
                        color="success"
                        style={{ width: "100%" }}
                      ></Progress>
                    </div>

                    <div className="position-relative">
                      <div className="progress-label text-danger border-danger mb-2">
                        Jquery
                      </div>

                      <Progress
                        value={65}
                        className="progress-sm mb-4"
                        color="danger"
                        style={{ width: "100%" }}
                      ></Progress>
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

export default UiProgressbar;
