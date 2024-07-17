import React from "react";
// import { Link } from "react-router-dom";
// import { Breadcrumb, BreadcrumbItem, Col, Row } from "reactstrap";
import Sidebar from "../../Layout/VerticalLayout/Sidebar";
import TopBar from "./TopBar";

const Breadcrumbs = (props) => {
  return (
    <React.Fragment>
            <Sidebar/>
            <TopBar/>
    </React.Fragment>
  );
}



export default Breadcrumbs;
