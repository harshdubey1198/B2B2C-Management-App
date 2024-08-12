import React from 'react';
import img1 from '../../assets/images/logo-dark.png';
import img2 from '../../assets/images/logo-light.png';
import { Container, Row, Col, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';

const Maintenance = () => {
    document.title = "Maintenance | aaMOBee";

    return (
        <React.Fragment>
            <div className="py-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={6} md={8} xl={5}>
                            <div className="text-center mt-sm-5 mb-4">
                                <Link to="/" className="">
                                    <img src={img1} alt="aaMOBee Logo Dark" height="24" className="auth-logo logo-dark mx-auto" />
                                    <img src={img2} alt="aaMOBee Logo Light" height="24" className="auth-logo logo-light mx-auto" />
                                </Link>
                                <p className="mt-3">aaMOBee</p>

                                <div className="mt-5">
                                    <div className="mb-4">
                                        <i className="ri-tools-fill display-3"></i>
                                    </div>
                                    <h4>Site is Under Maintenance</h4>
                                    <p>We’re currently performing scheduled maintenance. We apologize for the inconvenience and appreciate your patience. Please check back later.</p>

                                    <div className="mt-4 pt-2">
                                        <Link to="/" className="btn btn-primary">Back to Home</Link>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col md={4}>
                            <div className="text-center">
                                <CardBody>
                                    <div className="avatar-sm mx-auto mb-4">
                                        <div className="avatar-title rounded-circle">
                                            <i className="ri-information-line font-size-24"></i>
                                        </div>
                                    </div>
                                    <h5 className="font-size-15 text-uppercase">Why is the Site Down?</h5>
                                    <p className="mb-0">We are conducting essential updates to improve our services. This maintenance is part of our commitment to provide you with a better experience.</p>
                                </CardBody>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="text-center">
                                <CardBody>
                                    <div className="avatar-sm mx-auto mb-4">
                                        <div className="avatar-title rounded-circle">
                                            <i className="ri-time-line font-size-24"></i>
                                        </div>
                                    </div>
                                    <h5 className="font-size-15 text-uppercase">Estimated Downtime</h5>
                                    <p className="mb-0">We expect the maintenance to take approximately 1-2 hours. We will notify you once the site is back online.</p>
                                </CardBody>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="text-center">
                                <CardBody>
                                    <div className="avatar-sm mx-auto mb-4">
                                        <div className="avatar-title rounded-circle">
                                            <i className="ri-mail-line font-size-24"></i>
                                        </div>
                                    </div>
                                    <h5 className="font-size-15 text-uppercase">Need Assistance?</h5>
                                    <p className="mb-0">If you have any questions or need further assistance, please contact us at <Link to="mailto:support@aamobee.com" className="text-decoration-underline">support@aamobee.com</Link>.</p>
                                </CardBody>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

export default Maintenance;
