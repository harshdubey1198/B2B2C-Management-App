import React from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';

const InboxSidebar = () => {
    return (
        <React.Fragment>
            <Col xl={3}  className="mb-4 mb-xl-0">
                <div className="card h-100">
                    <div className="card-body email-leftbar">
                        <div className="d-grid">
                            <Link 
                            to="/compose-email" 
                            className="btn btn-danger btn-rounded">
                            <i className="mdi mdi-plus me-2"></i> 
                            Compose</Link>
                        </div>

                        <div className="mail-list mt-4">
                            <Link to="#" className="active"><i className="mdi mdi-inbox me-2"></i> Inbox <span className="ms-1 float-end">(18)</span></Link>
                            <Link to="#"><i className="mdi mdi-star-outline me-2"></i>Starred</Link>
                            <Link to="#"><i className="mdi mdi-diamond-stone me-2"></i>Important</Link>
                            <Link to="#"><i className="mdi mdi-file-outline me-2"></i>Draft</Link>
                            <Link to="#"><i className="mdi mdi-send-check-outline me-2"></i>Sent Mail</Link>
                            <Link to="#"><i className="mdi mdi-trash-can-outline me-2"></i>Trash</Link>
                        </div>

                        <div>
                            <h6 className="mt-4">Labels</h6>

                            <div className="mail-list mt-1">
                                <Link to="#"><span className="mdi mdi-circle-outline me-2 text-info"></span>Theme Support</Link>
                                <Link to="#"><span className="mdi mdi-circle-outline me-2 text-warning"></span>Freelance</Link>
                                <Link to="#"><span className="mdi mdi-circle-outline me-2 text-primary"></span>Social</Link>
                                <Link to="#"><span className="mdi mdi-circle-outline me-2 text-danger"></span>Friends</Link>
                                <Link to="#"><span className="mdi mdi-circle-outline me-2 text-success"></span>Family</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </React.Fragment>
    );
}

export default InboxSidebar;