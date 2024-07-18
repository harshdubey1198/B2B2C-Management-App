import React, { useState } from 'react';
import InboxSidebar from "./Sidebar";

// Form Editor
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import {
    Form,
    Card,
    CardBody,
    Col,
    Row,
    Container,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";


//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
const EmailCompose = () => {
    document.title = "Email Compose  | aaMOBee - React Admin & Dashboard Template";

    const [folderbtn, setfolderbtn] = useState(false);
    const [tagbtn, settagbtn] = useState(false);
    const [menubtn, setmenubtn] = useState(false);

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Email" breadcrumbItem="Email Compose" />
                    <Row className="mb-4">
                        {/* SideBar */}
                        <InboxSidebar />
                        <Col xl={9}>
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
                                            <DropdownMenu className="dropdown-menu-end">
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
                                            <DropdownMenu className="dropdown-menu-end">
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
                                            <DropdownMenu className="dropdown-menu-end">
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
                                    <div className="mb-0">
                                        <div className="mb-3">
                                            <input type="email" className="form-control" placeholder="To" />
                                        </div>

                                        <div className="mb-3">
                                            <input type="text" className="form-control" placeholder="Subject" />
                                        </div>
                                        <div id="email-editor" style={{ minHeight: "360px" }}>
                                            <Form method="post" >
                                                <Editor className="mb-3 ql-size-large"

                                                    toolbarClassName="toolbarClassName"
                                                    wrapperClassName="wrapperClassName"
                                                    editorClassName="editorClassName"
                                                    placeholder="Start From Here..."
                                                />
                                            </Form>
                                        </div>
                                        <div className="btn-toolbar">
                                            <div className="">
                                                <button type="button" className="btn btn-primary waves-effect waves-light me-1"><i className="far fa-save"></i></button>
                                                <button type="button" className="btn btn-primary waves-effect waves-light me-1"><i className="far fa-trash-alt"></i></button>
                                                <button className="btn btn-info waves-effect waves-light"> <span>Send</span> <i className="fab fa-telegram-plane ms-2"></i> </button>
                                            </div>
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

export default EmailCompose;