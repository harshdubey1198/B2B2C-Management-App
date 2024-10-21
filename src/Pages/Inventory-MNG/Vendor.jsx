import React from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Button } from 'reactstrap';
import axios from "axios";

function Vendor() {
    const token = JSON.parse(localStorage.getItem("authUser")).token;
    const userId = JSON.parse(localStorage.getItem("authUser")).response.adminId;
    const authuser = JSON.parse(localStorage.getItem("authUser")).response;
  
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };


  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs
          title="Inventory Management"
          breadcrumbItem="Inventory Table"
        />

        <Button color="primary">
            Add Vendor
        </Button>


        </div>
    </React.Fragment>
  )
}

export default Vendor