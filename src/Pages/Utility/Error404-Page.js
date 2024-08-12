import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const Error404 = () => {
    document.title = "404 Error | aaMOBee";
    return (
        <React.Fragment>
            <div className="my-5 pt-5">
                <div className="w-100">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <div className="text-center">
                                    <div>
                                        <h1 className="display-2 error-text fw-bold">4<i className="ri-ghost-smile-fill align-bottom text-primary mx-1"></i>4</h1>
                                    </div>
                                    <div>
                                        <h4 className="text-uppercase mt-4">Oops! Page Not Found</h4>
                                        <p>It seems the page you’re looking for doesn’t exist or has been moved. Please check the URL and try again.</p>
                                        <div className="mt-4">
                                            <Link to="/" className="btn btn-primary"><i className="ri-arrow-left-line align-bottom mr-2"></i>Back to Home</Link>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Error404;
