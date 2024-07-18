import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Col, Row, Card, CardBody, CardTitle } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const UiPagination = () => {
    document.title = "Pagination | aaMOBee - React Admin & Dashboard Template";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="UI Elements" breadcrumbItem="Pagination" />
                    <Row>
                        <Col xl={6}>
                            <Card>
                                <CardBody>

                                    <CardTitle>Default Example</CardTitle>
                                    <p className="card-title-desc">Pagination links indicate a series of related content exists across multiple pages.</p>

                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination">
                                            <li className="page-item"><Link className="page-link" to="#">Previous</Link></li>
                                            <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                                            <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                                            <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                                            <li className="page-item"><Link className="page-link" to="#">Next</Link></li>
                                        </ul>
                                    </nav>

                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination">
                                            <li className="page-item">
                                                <Link className="page-link" to="#" aria-label="Previous">
                                                    <span aria-hidden="true">&laquo;</span>
                                                    <span className="sr-only">Previous</span>
                                                </Link>
                                            </li>
                                            <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                                            <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                                            <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                                            <li className="page-item">
                                                <Link className="page-link" to="#" aria-label="Next">
                                                    <span aria-hidden="true">&raquo;</span>
                                                    <span className="sr-only">Next</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col xl={6}>
                            <Card>
                                <CardBody>

                                    <CardTitle>Disabled and active states</CardTitle>
                                    <p className="card-title-desc">Pagination links are customizable for
                                        different circumstances. Use <code
                                            className="highlighter-rouge">.disabled</code> for links that appear
                                        un-clickable and <code className="highlighter-rouge">.active</code> to
                                        indicate the current page.</p>

                                    <nav aria-label="...">
                                        <ul className="pagination">
                                            <li className="page-item disabled">
                                                <Link className="page-link" to="#" tabIndex="-1">Previous</Link>
                                            </li>
                                            <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                                            <li className="page-item active">
                                                <Link className="page-link" to="#">2 <span className="sr-only">(current)</span></Link>
                                            </li>
                                            <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                                            <li className="page-item">
                                                <Link className="page-link" to="#">Next</Link>
                                            </li>
                                        </ul>
                                    </nav>

                                    <nav aria-label="...">
                                        <ul className="pagination">
                                            <li className="page-item disabled">
                                                <span className="page-link">Previous</span>
                                            </li>
                                            <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                                            <li className="page-item active">
                                                <span className="page-link">
                                                    2
                                                    <span className="sr-only">(current)</span>
                                                </span>
                                            </li>
                                            <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                                            <li className="page-item">
                                                <Link className="page-link" to="#">Next</Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col xl={6}>
                            <Card>
                                <CardBody>

                                    <CardTitle>Sizing</CardTitle>
                                    <p className="card-title-desc">Fancy larger or smaller pagination? Add
                                        <code className="highlighter-rouge">.pagination-lg</code> or <code
                                            className="highlighter-rouge">.pagination-sm</code> for additional
                                        sizes.</p>

                                    <nav aria-label="...">
                                        <ul className="pagination pagination-lg">
                                            <li className="page-item disabled">
                                                <Link className="page-link" to="#" tabIndex="-1">Previous</Link>
                                            </li>
                                            <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                                            <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                                            <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                                            <li className="page-item">
                                                <Link className="page-link" to="#">Next</Link>
                                            </li>
                                        </ul>
                                    </nav>

                                    <nav aria-label="...">
                                        <ul className="pagination pagination-sm">
                                            <li className="page-item disabled">
                                                <Link className="page-link" to="#" tabIndex="-1">Previous</Link>
                                            </li>
                                            <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                                            <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                                            <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                                            <li className="page-item">
                                                <Link className="page-link" to="#">Next</Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col xl={6}>
                            <Card>
                                <CardBody>

                                    <CardTitle>Alignment</CardTitle>
                                    <p className="card-title-desc">Change the alignment of pagination
                                        components with flexbox utilities.</p>

                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination justify-content-center">
                                            <li className="page-item disabled">
                                                <Link className="page-link" to="#" tabIndex="-1">Previous</Link>
                                            </li>
                                            <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                                            <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                                            <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                                            <li className="page-item">
                                                <Link className="page-link" to="#">Next</Link>
                                            </li>
                                        </ul>
                                    </nav>

                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination justify-content-end">
                                            <li className="page-item disabled">
                                                <Link className="page-link" to="#" tabIndex="-1">Previous</Link>
                                            </li>
                                            <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                                            <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                                            <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                                            <li className="page-item">
                                                <Link className="page-link" to="#">Next</Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <CardBody>
                                    <CardTitle>Rounded Pagination</CardTitle>
                                    <p className="card-title-desc">Exmaple Rounded Pagination</p>

                                    <div className="d-inline-block ">
                                        <ul className="pagination pagination-rounded mb-0">
                                            <li className="page-item disabled">
                                                <Link className="page-link" to="#" aria-label="Previous">
                                                    <i className="mdi mdi-chevron-left"></i>
                                                </Link>
                                            </li>
                                            <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                                            <li className="page-item active"><Link className="page-link" to="#">2</Link></li>
                                            <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                                            <li className="page-item"><Link className="page-link" to="#">4</Link></li>
                                            <li className="page-item">
                                                <Link className="page-link" to="#" aria-label="Next">
                                                    <i className="mdi mdi-chevron-right"></i>
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

export default UiPagination;