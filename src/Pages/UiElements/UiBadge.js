import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Col, Row, Card, CardBody, CardTitle } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const UiBadge = () => {
    document.title = "Badges | aaMOBee";

    return (
        <React.Fragment>

                <div className="page-content">
                    <Container fluid={true}>
                        <Breadcrumbs title="UI Elements" breadcrumbItem="Badge" />

                        <Row>
                            <Col lg={6}>
                                <Card>
                                    <CardBody>

                                        <CardTitle>Example</CardTitle>
                                        <p className="card-title-desc">Badges scale to match the size of the
                                            immediate parent element by using relative font sizing and <code>em</code> units.</p>

                                        <div className="">
                                            <h1>Example heading <span className="badge bg-light">New</span></h1>
                                            <h2>Example heading <span className="badge bg-light">New</span></h2>
                                            <h3>Example heading <span className="badge bg-light">New</span></h3>
                                            <h4>Example heading <span className="badge bg-light">New</span></h4>
                                            <h5>Example heading <span className="badge bg-light">New</span></h5>
                                            <h6 className="mb-0">Example heading <span className="badge bg-light">New</span></h6>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col lg={6}>
                                <Card>
                                    <CardBody>
                                        <CardTitle>Default badge</CardTitle>
                                        <p className="card-title-desc">Add any of the below mentioned modifier
                                            classes to change the appearance of a badge.</p>

                                        <div>
                                            <span className="badge bg-light me-1">Light</span>
                                            <span className="badge bg-primary me-1">Primary</span>
                                            <span className="badge bg-success me-1">Success</span>
                                            <span className="badge bg-info me-1">Info</span>
                                            <span className="badge bg-warning me-1">Warning</span>
                                            <span className="badge bg-danger me-1">Danger</span>
                                            <span className="badge bg-dark me-1">Dark</span>
                                        </div>
                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardBody>
                                        <CardTitle>Badge Pills</CardTitle>

                                        <p className="text-muted">Use the <code
                                            className="highlighter-rouge">.rounded-pill</code> modifier class to make
                                            badges more rounded (with a larger <code>border-radius</code>
                                            and additional horizontal <code>padding</code>).
                                            Useful if you miss the badges from v3.</p>

                                        <div>
                                            <span className="badge rounded-pill bg-light me-1">light</span>
                                            <span className="badge rounded-pill bg-primary me-1">Primary</span>
                                            <span className="badge rounded-pill bg-success me-1">Success</span>
                                            <span className="badge rounded-pill bg-info me-1">Info</span>
                                            <span className="badge rounded-pill bg-warning me-1">Warning</span>
                                            <span className="badge rounded-pill bg-danger me-1">Danger</span>
                                            <span className="badge rounded-pill bg-dark me-1">Dark</span>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={4}>
                                <Card>
                                    <CardBody>
                                        <CardTitle>Links</CardTitle>
                                        <p className="card-title-desc">Using the contextual <code>.bg-*</code> classes on an <code>&lt;a&gt;</code> element quickly provide <em>actionable</em> badges with hover and focus states.</p>
                                        <div>
                                            <Link to="/#" className="badge bg-light me-1">light</Link>
                                            <Link to="/#" className="badge bg-primary me-1">Primary</Link>
                                            <Link to="/#" className="badge bg-success me-1">Success</Link>
                                            <Link to="/#" className="badge bg-info me-1">Info</Link>
                                            <Link to="/#" className="badge bg-warning me-1">Warning</Link>
                                            <Link to="/#" className="badge bg-danger me-1">Danger</Link>
                                            <Link to="/#" className="badge bg-dark me-1">Dark</Link>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg={4}>
                                <Card>
                                    <CardBody>
                                        <CardTitle>Badge Lighten</CardTitle>
                                        <p className="card-title-desc">Using the <code>.badge-soft-**</code> classes for Badge lighten.</p>
                                        <div>
                                            <span className="badge badge-soft-primary me-1">Primary</span>
                                            <span className="badge badge-soft-success me-1">Success</span>
                                            <span className="badge badge-soft-info me-1">Info</span>
                                            <span className="badge badge-soft-warning me-1">Warning</span>
                                            <span className="badge badge-soft-danger me-1">Danger</span>
                                            <span className="badge badge-soft-dark me-1">Dark</span>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg={4}>
                                <Card>
                                    <CardBody>
                                        <CardTitle>Badge in Buttons</CardTitle>
                                        <p className="card-title-desc">Badges can be used as part of links or buttons to provide a counter.</p>
                                        <div className="d-flex flex-wrap gap-4">
                                            <button type="button" className="btn btn-primary me-1">
                                                Notifications <span className="badge bg-warning ms-1">3</span>
                                            </button>

                                            <button type="button" className="btn btn-success">
                                                Messages <span className="badge bg-danger ms-1">5</span>
                                            </button>

                                            <button type="button" className="btn btn-primary position-relative">
                                                Inbox
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                    99+
                                                    <span className="visually-hidden">unread messages</span>
                                                </span>
                                            </button>

                                            <button type="button" className="btn btn-primary position-relative">
                                                Profile
                                                <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                                                    <span className="visually-hidden">New alerts</span>
                                                </span>
                                            </button>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>

        </React.Fragment>
    );
}

export default UiBadge;