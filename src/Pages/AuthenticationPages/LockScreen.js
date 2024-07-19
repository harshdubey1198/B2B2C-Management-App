import React from 'react';
import logolight from '../../assets/images/logo-light.png';
import logodark from '../../assets/images/logo-dark.png';
import avatar1 from '../../assets/images/users/avatar-1.jpg'
import { Container, Row, Col, Card, CardBody } from 'reactstrap';

import { Link } from 'react-router-dom';

const LockScreen = () => {
    document.title = "Lock Screen | aaMOBee";
    return (
        <React.Fragment>

            <div className="bg-pattern" style={{height:"100vh"}}>
                <div className="bg-overlay"></div>
                <div className="account-pages pt-5">
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={6} md={8} xl={4}>
                                <Card className='mt-5'>
                                    <CardBody className="p-4">
                                        <div className="">
                                            <div className="text-center">
                                                <Link to="/" className="">
                                                    <img src={logodark} alt="" height="24" className="auth-logo logo-dark mx-auto" />
                                                    <img src={logolight} alt="" height="24" className="auth-logo logo-light mx-auto" />
                                                </Link>
                                            </div>
                                            <h4 className="font-size-18 text-muted mt-2 text-center">Locked Screen</h4>
                                            <p className="mb-5 text-center">Enter your password to unlock the screen!</p>
                                            <form className="form-horizontal" action="#">
                                                <Row>
                                                    <Col md={12}>
                                                        <div className="user-thumb text-center m-b-30">
                                                            <img src={avatar1} className="rounded-circle avatar-lg img-thumbnail mx-auto d-block" alt="thumbnail" />
                                                        </div>

                                                        <div className="mt-4">
                                                            <label className="form-label" htmlFor="userpassword">Password</label>
                                                            <input type="password" className="form-control" id="userpassword" placeholder="Enter password" />
                                                        </div>
                                                        <div className="d-grid mt-4">
                                                            <a href='/dashboard' className="btn btn-primary waves-effect waves-light" type="submit">Unlock</a>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </form>
                                        </div>
                                    </CardBody>
                                </Card>
                                <div className="mt-5 text-center">
                                    <p className="text-white-50">Not you ? return<Link to="/auth-login" className="fw-medium text-primary"> Sign In </Link> </p>
                                    <p className="text-white-50">© {new Date().getFullYear()} aaMOBee.</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>


            </div>

        </React.Fragment>
    );
}

export default LockScreen;