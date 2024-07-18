import React from 'react';
import { useState } from 'react';

import {
    Button,
    Popover,
    PopoverBody,
    Tooltip,
    Col,
    Row,
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    Container,
    UncontrolledPopover,
} from "reactstrap";


//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const UiPopovers = () => {
    document.title = "Popovers & Tooltip | aaMOBee - React Admin & Dashboard Template";

    const [popovertop, setpopovertop] = useState(false);
    const [popoverleft, setpopoverleft] = useState(false);
    const [popoverright, setpopoverright] = useState(false);
    const [popoverbottom, setpopoverbottom] = useState(false);
    const [popoverdismiss, setpopoverdismiss] = useState(false);

    const [ttop, setttop] = useState(false);
    const [tbottom, settbottom] = useState(false);
    const [tleft, settleft] = useState(false);
    const [tright, settright] = useState(false);
    const [thtml, setthtml] = useState(false);


    return (
        <React.Fragment>

            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="UI Elements" breadcrumbItem="Popovers & Tooltip" />
                    <Row>
                        <Col md={12}>

                            <Card>
                                <CardBody>
                                    <CardTitle>Popovers</CardTitle>
                                    <CardSubtitle className="mb-3">
                                        Add small overlay content, like those found in iOS, to any
                                        element for housing secondary information.
                                    </CardSubtitle>
                                    <div className="d-flex flex-wrap gap-2">
                                        <Button
                                            id="Popovertop"
                                            color="primary"
                                            onClick={() => {
                                                setpopovertop(!popovertop);
                                            }}
                                        >
                                            Popover on top
                                        </Button>
                                        <Popover
                                            placement="top"
                                            isOpen={popovertop}
                                            target="Popovertop"
                                            toggle={() => {
                                                setpopovertop(!popovertop);
                                            }}
                                        >
                                            <PopoverBody>
                                            Vivamus sagittis lacus vel augue laoreet rutrum faucibus.
                                            </PopoverBody>
                                        </Popover>{" "}
                                        &nbsp;
                                        <Button
                                            id="Popoverright"
                                            onClick={() => {
                                                setpopoverright(!popoverright);
                                            }}
                                            color="primary"
                                        >
                                            Popover on right
                                        </Button>
                                        <Popover
                                            placement="right"
                                            isOpen={popoverright}
                                            target="Popoverright"
                                            toggle={() => {
                                                setpopoverright(!popoverright);
                                            }}
                                        >
                                            <PopoverBody>
                                            Vivamus sagittis lacus vel augue laoreet rutrum faucibus.
                                            </PopoverBody>
                                        </Popover>{" "}
                                        &nbsp;
                                        <Button
                                            id="Popoverbottom"
                                            onClick={() => {
                                                setpopoverbottom(!popoverbottom);
                                            }}
                                            color="primary"
                                        >
                                            Popover on bottom
                                        </Button>
                                        <Popover
                                            placement="bottom"
                                            isOpen={popoverbottom}
                                            target="Popoverbottom"
                                            toggle={() => {
                                                setpopoverbottom(!popoverbottom);
                                            }}
                                        >
                                            <PopoverBody>
                                            Vivamus sagittis lacus vel augue laoreet rutrum faucibus.
                                            </PopoverBody>
                                        </Popover>{" "}
                                        &nbsp;
                                        <Button
                                            id="Popoverleft"
                                            onClick={() => {
                                                setpopoverleft(!popoverleft);
                                            }}
                                            color="primary"
                                        >
                                            Popover on left
                                        </Button>
                                        <Popover
                                            placement="left"
                                            isOpen={popoverleft}
                                            target="Popoverleft"
                                            toggle={() => {
                                                setpopoverleft(!popoverleft);
                                            }}
                                        >
                                            <PopoverBody>
                                            Vivamus sagittis lacus vel augue laoreet rutrum faucibus.
                                            </PopoverBody>
                                        </Popover>{" "}
                                        &nbsp;
                                        <Button
                                            id="Popoverdismiss"
                                            className="btn"
                                            color="primary"
                                            onClick={() => {
                                                setpopoverdismiss(!popoverdismiss);
                                            }}
                                        >
                                            Dismissible popover
                                        </Button>
                                        <UncontrolledPopover
                                            trigger="focus"
                                            target="Popoverdismiss"
                                            placement="right"
                                        >
                                            <PopoverBody>
                                                Vivamus sagittis lacus vel augue laoreet rutrum faucibus
                                            </PopoverBody>
                                        </UncontrolledPopover>
                                    </div>
                                </CardBody>
                            </Card>

                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Card>
                                <CardBody>
                                    <CardTitle>Tooltips</CardTitle>
                                    <CardSubtitle className="mb-3">
                                        Hover over the links below to see tooltips:
                                    </CardSubtitle>

                                    <div className="d-flex flex-wrap gap-2">
                                        <Tooltip
                                            placement="top"
                                            isOpen={ttop}
                                            target="TooltipTop"
                                            toggle={() => {
                                                setttop(!ttop);
                                            }}
                                        >
                                            Tooltip on top
                                        </Tooltip>
                                        <Tooltip
                                            placement="right"
                                            isOpen={tright}
                                            target="TooltipRight"
                                            toggle={() => {
                                                settright(!tright);
                                            }}
                                        >
                                            Tooltip on Right
                                        </Tooltip>
                                        <Tooltip
                                            placement="bottom"
                                            isOpen={tbottom}
                                            target="TooltipBottom"
                                            toggle={() => {
                                                settbottom(!tbottom);
                                            }}
                                        >
                                            Tooltip on Bottom
                                        </Tooltip>
                                        <Tooltip
                                            placement="left"
                                            isOpen={tleft}
                                            target="TooltipLeft"
                                            toggle={() => {
                                                settleft(!tleft);
                                            }}
                                        >
                                            Tooltip on Left
                                        </Tooltip>

                                        <Tooltip
                                            placement="top"
                                            isOpen={thtml}
                                            target="TooltipWithHtml"
                                            toggle={() => {
                                                setthtml(!thtml);
                                            }}
                                        >
                                            <i>Tooltip</i><u> With </u><b>HTML</b>
                                        </Tooltip>


                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            id="TooltipTop"
                                        >
                                            {" "}
                                            Tooltip on top
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            id="TooltipRight"
                                        >
                                            {" "}
                                            Tooltip on Right
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-info"
                                            id="TooltipBottom"
                                        >
                                            {" "}
                                            Tooltip on Bottom
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-warning"
                                            id="TooltipLeft"
                                        >
                                            {" "}
                                            Tooltip on Left
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            id="TooltipWithHtml"
                                        >
                                            {" "}
                                            Tooltip With HTML
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
};

export default UiPopovers;