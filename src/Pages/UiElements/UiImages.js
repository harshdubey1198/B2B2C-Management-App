import React from "react";

import img2 from "../../assets/images/small/img-2.jpg";
import img3 from "../../assets/images/small/img-3.jpg";
import img4 from "../../assets/images/small/img-4.jpg";

import {
    Col,
    Row,
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardImg,
    CardText,
    Container,
} from "reactstrap";
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import avatar3 from "../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../assets/images/users/avatar-4.jpg";
import avatar5 from "../../assets/images/users/avatar-5.jpg";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const UiImages = () => {
    document.title = "Images | aaMOBee";

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="UI Elements" breadcrumbItem="Images" />

                    <Row>
                        <Col xl={6}>
                            <Card>
                                <CardBody>
                                    <CardTitle>Image thumbnails</CardTitle>
                                    <CardSubtitle className="mb-3">
                                        In addition to our border-radius utilities, you can use{" "}
                                        <code className="highlighter-rouge">.img-thumbnail</code> to
                                        give an image a rounded 1px border appearance.
                                    </CardSubtitle>
                                    <Row>
                                        <Col sm={6}>
                                            <img
                                                className="img-thumbnail mt-5"
                                                alt="aaMOBee"
                                                width="200px"
                                                height="200px"
                                                src={img3}
                                            />
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody className="mt-2">
                                    <CardTitle>Image Rounded & Circle</CardTitle>
                                    <CardSubtitle className="mb-3">
                                        Use className <code>.rounded</code> and{" "}
                                        <code>.rounded-circle</code>.
                                    </CardSubtitle>
                                    <Row>
                                        <Col sm={6} className="mt-3">
                                            <div className="mb-2">
                                                <img
                                                    className="rounded ms-2"
                                                    alt="aaMOBee"
                                                    width="200px"
                                                    src={img4}
                                                />
                                            </div>
                                            <code>.rounded</code>
                                        </Col>
                                        <Col sm={6} className="mt-3">
                                            <div className="mb-2">
                                                <img
                                                    className="rounded-circle avatar-xl"
                                                    alt="aaMOBee"
                                                    src={avatar4}
                                                />
                                            </div>
                                            <code>.rounded-circle</code>.
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col xl={6}>
                            <Card>
                                <CardBody>
                                    <CardTitle>Responsive images</CardTitle>
                                    <CardSubtitle className="mb-3">
                                        Images in Bootstrap are made responsive with{" "}
                                        <code className="highlighter-rouge">.img-fluid</code>.{" "}
                                        <code className="highlighter-rouge">max-width: 100%;</code>{" "}
                                        and <code className="highlighter-rouge">height: auto;</code>{" "}
                                        are applied to the image so that it scales with the parent
                                        element.
                                    </CardSubtitle>
                                    <div>
                                        <img src={img2} className="img-fluid" alt="Responsive" />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col xl={12}>
                            <Card>
                                <CardBody>
                                    <CardTitle>Images Sizes</CardTitle>
                                    <Row>
                                        <Col>
                                            <CardImg
                                                src={avatar3}
                                                alt="aaMOBeeaaMOBee"
                                                className="rounded avatar-xs"
                                            />
                                            <CardText className="mt-2 mb-lg-0">
                                                <code>.avatar-xs</code>
                                            </CardText>
                                        </Col>
                                        <Col>
                                            <CardImg
                                                src={avatar4}
                                                alt="aaMOBee"
                                                className="rounded avatar-sm"
                                            />
                                            <CardText className="mt-2  mb-lg-0">
                                                <code>.avatar-sm</code>
                                            </CardText>
                                        </Col>
                                        <Col>
                                            <CardImg
                                                src={avatar5}
                                                alt="aaMOBee"
                                                className="rounded avatar-md"
                                            />
                                            <CardText className="mt-2 mb-lg-0">
                                                <code>.avatar-md</code>
                                            </CardText>
                                        </Col>
                                        <Col>
                                            <CardImg
                                                src={avatar3}
                                                alt="aaMOBee"
                                                className="rounded avatar-lg"
                                            />
                                            <CardText className="mt-2 mb-lg-0">
                                                <code>.avatar-lg</code>
                                            </CardText>
                                        </Col>
                                        <Col>
                                            <CardImg
                                                src={avatar4}
                                                alt=""
                                                className="rounded avatar-xl"
                                            />
                                            <CardText className="mt-2  mb-lg-0">
                                                <code>.avatar-xl</code>
                                            </CardText>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12}>
                            <Card>
                                <CardBody>
                                    <h4 className="card-title">Media Object</h4>
                                    <p className="card-title-desc">
                                        The images or other media can be aligned top, middle, or
                                        bottom. The default is top aligned.
                                    </p>

                                    <div className="d-flex">
                                        <div className="flex-shrink-0 me-3">
                                            <img
                                                className="rounded avatar-sm"
                                                src={avatar3}
                                                alt="Generic placeholder"
                                            />
                                        </div>
                                        <div className="flex-grow-1">
                                            <h5>Top-aligned media</h5>
                                            <p className="mb-0">
                                                Cras sit amet nibh libero, in gravida nulla. Nulla vel
                                                metus scelerisque ante sollicitudin. Cras purus odio,
                                                vestibulum in vulputate at, tempus viverra turpis. Fusce
                                                condimentum nunc ac nisi vulputate fringilla. Donec
                                                lacinia congue felis in faucibus.
                                            </p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0 me-3">
                                            <img
                                                className="rounded avatar-sm"
                                                src={avatar5}
                                                alt="Generic placeholder"
                                            />
                                        </div>
                                        <div className="flex-grow-1">
                                            <h5>Center-aligned media</h5>
                                            <p className="mb-0">
                                                Cras sit amet nibh libero, in gravida nulla. Nulla vel
                                                metus scelerisque ante sollicitudin. Cras purus odio,
                                                vestibulum in vulputate at, tempus viverra turpis. Fusce
                                                condimentum nunc ac nisi vulputate fringilla. Donec
                                                lacinia congue felis in faucibus.
                                            </p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="d-flex align-items-end">
                                        <div className="flex-shrink-0 me-3">
                                            <img
                                                className="rounded avatar-sm"
                                                src={avatar1}
                                                alt="Generic placeholder"
                                            />
                                        </div>
                                        <div className="flex-grow-1">
                                            <h5>Bottom-aligned media</h5>
                                            <p className="mb-0">
                                                Cras sit amet nibh libero, in gravida nulla. Nulla vel
                                                metus scelerisque ante sollicitudin. Cras purus odio,
                                                vestibulum in vulputate at, tempus viverra turpis. Fusce
                                                condimentum nunc ac nisi vulputate fringilla. Donec
                                                lacinia congue felis in faucibus.
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

export default UiImages;
