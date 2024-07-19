import React, { useState } from 'react';

import InboxSidebar from "./Sidebar";

import {
    Card,
    CardBody,
    Row,
    Container,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";

import { Link } from 'react-router-dom';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

// Import Images

import img1 from "../../assets/images/users/avatar-1.jpg";
import img3 from "../../assets/images/small/img-3.jpg";
import img4 from "../../assets/images/small/img-4.jpg";




const ReadEmail = () => {
    document.title = "Read Email  | aaMOBee";
    const [folderbtn, setfolderbtn] = useState(false);
    const [tagbtn, settagbtn] = useState(false);
    const [menubtn, setmenubtn] = useState(false);
    return (
        <React.Fragment>

            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Email" breadcrumbItem="Read Email" />
                    <Row className="mb-4">
                        {/* SideBar */}
                        <InboxSidebar />
                        <div className="col-xl-9">
                            <div className="d-flex flex-wrap justify-content-between">
                                <div className="btn-toolbar" role="toolbar">
                                    <div className="btn-group me-2 mb-3">
                                        <button type="button" className="btn btn-primary waves-light waves-effect"><i className="fa fa-inbox"></i></button>
                                        <button type="button" className="btn btn-primary waves-light waves-effect"><i className="fa fa-exclamation-circle"></i></button>
                                        <button type="button" className="btn btn-primary waves-light waves-effect"><i className="far fa-trash-alt"></i></button>
                                    </div>
                                    <div className="btn-group me-2 mb-3">
                                        <Dropdown
                                            isOpen={folderbtn}
                                            toggle={() => setfolderbtn(!folderbtn)}
                                        >
                                            <DropdownToggle className="btn" color="primary" caret>
                                                <i className="fa fa-folder me-1"></i>
                                                {" "}
                                                <i className="mdi mdi-chevron-down" />
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem>Updates</DropdownItem>
                                                <DropdownItem>Social</DropdownItem>
                                                <DropdownItem>Team Manage</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="btn-toolbar justify-content-md-end" role="toolbar">
                                    <div className="btn-group ms-md-2 mb-3">
                                        <Dropdown
                                            isOpen={tagbtn}
                                            toggle={() => settagbtn(!tagbtn)}
                                        >
                                            <DropdownToggle className="btn" color="primary" caret>
                                                <i className="fa fa-tag me-1"></i>
                                                {" "}
                                                <i className="mdi mdi-chevron-down" />
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem>Updates</DropdownItem>
                                                <DropdownItem>Social</DropdownItem>
                                                <DropdownItem>Team Manage</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                    <div className="btn-group ms-2 mb-3">
                                        <Dropdown
                                            isOpen={menubtn}
                                            toggle={() => setmenubtn(!menubtn)}
                                        >
                                            <DropdownToggle className="btn" color="primary" caret>
                                                More <i className="mdi mdi-dots-vertical ms-1"></i>
                                                {" "}
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem>Mark as Unread</DropdownItem>
                                                <DropdownItem>Mark as Important</DropdownItem>
                                                <DropdownItem>Add to Tasks</DropdownItem>
                                                <DropdownItem>Add Star</DropdownItem>
                                                <DropdownItem>Mute</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                            <Card className="mb-0">
                                <CardBody>
                                    <div className="d-flex mb-4">
                                        <div className="flex-shrink-0 me-3">
                                            <img className="rounded-circle avatar-sm" src={img1} alt="Generic placeholder" />
                                        </div>
                                        <div className="flex-grow-1">
                                            <h4 className="font-size-16">Frankie Dyer</h4>
                                            <p className="text-muted font-size-13">support@domain.com</p>
                                        </div>
                                    </div>
                                    <h4 className="font-size-16">This Week's Top Stories</h4>

                                    <p>Dear Shane,</p>
                                    <p>Praesent dui ex, dapibus eget mauris ut, finibus vestibulum enim. Quisque arcu leo, facilisis in fringilla id, luctus in tortor. Nunc vestibulum est quis orci varius viverra. Curabitur dictum volutpat massa vulputate molestie. In at felis ac velit maximus
                                        convallis.</p>
                                    <p>Sed elementum turpis eu lorem interdum, sed porttitor eros commodo. Nam eu venenatis tortor, id lacinia diam. Sed aliquam in dui et porta. Sed bibendum orci non tincidunt ultrices. Vivamus fringilla, mi lacinia dapibus condimentum, ipsum urna lacinia
                                        lacus, vel tincidunt mi nibh sit amet lorem.</p>
                                    <p>Sincerly,</p>
                                    <hr />

                                    <Row>
                                        <div className="col-xl-2 col-6">
                                            <Card>
                                                <img className="card-img-top img-fluid" src={img3} alt="Card cap" />
                                                <div className="py-2 text-center">
                                                    <Link to="#" className="fw-medium">Download</Link>
                                                </div>
                                            </Card>
                                        </div>
                                        <div className="col-xl-2 col-6">
                                            <Card>
                                                <img className="card-img-top img-fluid" src={img4} alt="Card cap" />
                                                <div className="py-2 text-center">
                                                    <Link to="#" className="fw-medium">Download</Link>
                                                </div>
                                            </Card>
                                        </div>
                                    </Row>

                                    <Link to="/compose-email" className="btn btn-secondary waves-effect mt-4"><i className="mdi mdi-reply"></i> Reply</Link>
                                </CardBody>
                            </Card>
                        </div>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ReadEmail;