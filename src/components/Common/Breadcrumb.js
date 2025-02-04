import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Col, Row } from "reactstrap";

const Breadcrumbs = (props) => {
  return (
    <React.Fragment>
      <Row>
        <Col xs="12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between m-text-center">
            <h4 className="m-mt-2">{props.breadcrumbItem}</h4>
            <div className="page-title-right">
              <Breadcrumb listClassName="m-0 m-pl d-flex justify-content-center">
                <BreadcrumbItem>
                  <Link to="#">{props.title}</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  {/* <Link to="#"> */}
                    {props.breadcrumbItem}
                    {/* </Link> */}
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
}



export default Breadcrumbs;
