import React, { useState } from "react";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Row, Col, Card, CardBody, Container } from "reactstrap";

// Rating Plugin
import Rating from "react-rating";
import RatingTooltip from "react-rating-tooltip";

const UiRating = () => {
  document.title = "Rating | aaMOBee - React Admin & Dashboard Template";

  const [def, setdef] = useState("");
  const [stopRate, setStopRate] = useState("");
  const [secondrate, setSecondRate] = useState("");
  const [startrate, setStartrate] = useState("");
  const [customize, setcustomize] = useState("");
  const starStyle = {};

  const tooltipContent = ["Rate 1", "Rate 2", "Rate 3", "Rate 4", "Rate 5"];
  const tooltipContentMore = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const tooltipContentHalf = ["6", "7", "8", "9", "10"];
  const tooltipContentMiddle = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];
  const tooltipContentStep = ["2", "4", "6", "8", "10"];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="UI Elements" breadcrumbItem="Rating" />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <Row>
                    <Col xl="3" md="4" sm="6">
                      <div className="p-4 text-center">
                        <h5 className="font-size-15 mb-3">Default rating</h5>
                        <div className="rating-star">
                          <Rating
                            className="rating"
                            emptySymbol="mdi mdi-star-outline text-muted fa-2x"
                            fullSymbol="mdi mdi-star text-primary fa-2x"
                          />
                          <span>{def}</span>
                        </div>
                      </div>
                    </Col>
                    <Col xl="3" md="4" sm="6">
                      <div className="p-4 text-center">
                        <h5 className="font-size-15 mb-3">Half rating</h5>
                        <div className="rating-star">
                          <Rating
                            emptySymbol="mdi mdi-star-outline text-primary fa-2x"
                            fullSymbol="mdi mdi-star text-primary fa-2x"
                            fractions={2}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col xl="3" md="4" sm="6">
                      <div className="p-4 text-center">
                        <h5 className="font-size-15 mb-3">Disabled rating</h5>
                        <div className="rating-star">
                          <Rating
                            emptySymbol="mdi mdi-star-outline fa-2x"
                            fullSymbol="mdi mdi-star fa-2x"
                            readonly
                          />
                        </div>
                      </div>
                    </Col>
                    <Col xl="3" md="4" sm="6">
                      <div className="p-4 text-center">
                        <h5 className="font-size-15 mb-3">
                          Readonly rating with a value
                        </h5>
                        <div className="rating-star">
                          <Rating
                            emptySymbol="mdi mdi-star-outline text-primary fa-2x"
                            fullSymbol="mdi mdi-star text-primary fa-2x"
                            initialRating={3}
                            readonly
                          />
                          <span className="badge bg-info">3</span>
                        </div>
                      </div>
                    </Col>
                    <Col xl="3" md="4" sm="6">
                      <div className="p-4 text-center">
                        <h5 className="font-size-15 mb-3">
                          Customized heart rating
                        </h5>
                        <div className="rating-star">
                          <Rating
                            stop={5}
                            emptySymbol="mdi mdi-heart-outline fa-2x text-danger"
                            fullSymbol={[
                              "mdi mdi-heart text-danger fa-2x",
                              "mdi mdi-heart text-danger fa-2x",
                              "mdi mdi-heart text-danger fa-2x",
                              "mdi mdi-heart text-danger fa-2x",
                              "mdi mdi-heart text-danger fa-2x",
                            ]}
                            onChange={(customize) => setcustomize(customize)}
                          />
                          <span className="badge bg-info mr-2">{customize}</span>
                        </div>
                      </div>
                    </Col>
                    <Col xl="3" md="4" sm="6">
                      <div className="p-4 text-center">
                        <h5 className="font-size-15 mb-3">
                          Only fill selected
                        </h5>
                        <div className="rating-star">
                          <Rating
                            className="rating"
                            emptySymbol="mdi mdi-star-outline text-primary fa-2x"
                            fullSymbol="mdi mdi-star text-primary fa-2x"
                          />
                        </div>
                      </div>
                    </Col>
                    <Col xl="3" md="4" sm="6">
                      <div className="p-4 text-center">
                        <h5 className="font-size-15 mb-3">Handle events</h5>
                        <div className="rating-star">
                          <Rating
                            stop={5}
                            emptySymbol="mdi mdi-checkbox-blank-outline text-muted fa-2x"
                            fullSymbol={[
                              "mdi mdi-checkbox-marked-outline text-primary fa-2x",
                              "mdi mdi-checkbox-marked-outline text-primary fa-2x",
                              "mdi mdi-checkbox-marked-outline text-primary fa-2x",
                              "mdi mdi-checkbox-marked-outline text-primary fa-2x",
                            ]}
                            onChange={(customize) => setcustomize(customize)}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col xl="3" md="4" sm="6">
                      <div className="p-4 text-center">
                        <h5 className="font-size-15 mb-3">
                          Customize tooltips
                        </h5>
                        <div className="rating-star">
                          <RatingTooltip
                            max={5}
                            clearRating={false}
                            onChange={(rate) => {
                              setdef(rate);
                            }}
                            tooltipContent={tooltipContent}
                            ActiveComponent={
                              <i
                                className="mdi mdi-star text-primary"
                                style={starStyle}
                              />
                            }
                            InActiveComponent={
                              <i
                                className="mdi mdi-star-outline text-muted"
                                style={starStyle}
                              />
                            }
                          />
                        </div>
                      </div>
                    </Col>
                    <Col xl="3" md="4" sm="6">
                      <div className="p-4 text-center">
                        <h5 className="font-size-15 mb-3">Default rating</h5>
                        <div className="rating-star">
                          <RatingTooltip
                            max={8}
                            clearRating={false}
                            tooltipContent={tooltipContentMore}
                            ActiveComponent={
                              <i
                                className="mdi mdi-star text-primary"
                                style={starStyle}
                              />
                            }
                            InActiveComponent={
                              <i
                                className="mdi mdi-star-outline text-muted"
                                style={starStyle}
                              />
                            }
                          />
                        </div>
                      </div>
                    </Col>
                    <Col xl="3" md="4" sm="6">
                      <div className="p-4 text-center">
                        <h5 className="font-size-15 mb-3">
                          Set start rate to 5[6..10]
                        </h5>
                        <div className="rating-star">
                          <RatingTooltip
                            max={5}
                            clearRating={false}
                            onChange={() => {
                              setStartrate(!startrate);
                            }}
                            tooltipContent={tooltipContentHalf}
                            ActiveComponent={
                              <i
                                className="mdi mdi-star text-primary"
                                style={starStyle}
                              />
                            }
                            InActiveComponent={
                              <i
                                className="mdi mdi-star-outline text-muted"
                                style={starStyle}
                              />
                            }
                          />
                        </div>
                      </div>
                    </Col>

                    <Col xl="3" md="4" sm="6">
                      <div className="p-4 text-center">
                        <h5 className="font-size-15 mb-3">
                          Set start and stop rate[2..10]
                        </h5>
                        <div className="rating-star">
                          <RatingTooltip
                            max={11}
                            onChange={() => {
                              setSecondRate(!secondrate);
                            }}
                            clearRating={false}
                            tooltipContent={tooltipContentMiddle}
                            defaultRating={4}
                            ActiveComponent={
                              <i
                                className="mdi mdi-star text-primary"
                                style={starStyle}
                              />
                            }
                            InActiveComponent={
                              <i
                                className="mdi mdi-star-outline text-muted"
                                style={starStyle}
                              />
                            }
                          />
                        </div>
                      </div>
                    </Col>
                    <Col xl="3" md="4" sm="6">
                      <div className="p-4 text-center">
                        <h5 className="font-size-15 mb-3">
                          Set start and stop rate [2..10] with step 2
                        </h5>
                        <div className="rating-star">
                          <RatingTooltip
                            max={5}
                            clearRating={false}
                            onChange={() => {
                              setStopRate(!stopRate);
                            }}
                            tooltipContent={tooltipContentStep}
                            ActiveComponent={
                              <i
                                className="mdi mdi-star text-primary"
                                style={starStyle}
                              />
                            }
                            InActiveComponent={
                              <i
                                className="mdi mdi-star-outline text-muted"
                                style={starStyle}
                              />
                            }
                          />
                        </div>
                      </div>
                    </Col>
                    <Col xl="3" md="4" sm="6">
                      <div className="p-4 text-center">
                        <h5 className="font-size-15 mb-3">Custom icons</h5>
                        <div className="rating-star">
                          <Rating
                            stop={5}
                            emptySymbol="mdi mdi-bell-outline fa-2x text-muted"
                            fullSymbol={[
                              "mdi mdi-bell-ring-outline fa-2x text-primary",
                              "mdi mdi-bell-ring-outline fa-2x text-primary",
                              "mdi mdi-bell-ring-outline fa-2x text-primary",
                              "mdi mdi-bell-ring-outline fa-2x text-primary",
                            ]}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col xl="3" md="4" sm="6">
                      <div className="p-4 text-center">
                        <h5 className="font-size-15 mb-3">Fractional rating</h5>
                        <div className="rating-star">
                          <Rating
                            emptySymbol="mdi mdi-star-outline fa-2x"
                            fullSymbol="mdi mdi-star fa-2x"
                            fractions={3}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col xl="3" md="4" sm="6">
                      <div className="p-4 text-center">
                        <h5 className="font-size-15 mb-3">Custom CSS icons</h5>
                        <div className="rating-star">
                          <Rating
                            onChange={(rate) => {
                              setdef(rate);
                            }}
                            fractions={2}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>{" "}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default UiRating;
