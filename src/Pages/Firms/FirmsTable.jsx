import React, { useEffect, useState } from "react";
import { Alert, Button, Card, CardBody, Col, FormGroup, Input, Label } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import axios from "axios";

function FirmsTable() {
  const [firms, setFirms] = useState([]);
  const [hoveredFirmId, setHoveredFirmId] = useState(null);
  const authUser = JSON.parse(localStorage.getItem("authUser"))?.response
  
  useEffect(() => {
    // const storedFirms = JSON.parse(localStorage.getItem("Firms")) || [];
    // setFirms(storedFirms);
    if(authUser){
      axios.get(`${process.env.REACT_APP_URL}/auth/getCompany/${authUser?._id}`).then((response) => {
        setFirms(response);
        console.log(response);
      }).catch((error) => {
        console.error(error);
      })
    }
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="aaMOBee" breadcrumbItem="Firm Management" />
        <div className="d-flex justify-content-between mb-4">
          <p className="mm-active">
            This is the Firm Management page. Here you can manage the list of firms.
          </p>
        </div>
        <Col lg={12}>
          <Card>
            <CardBody>
              <div className="table-responsive mt-4">
                <table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Avatar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {firms.map((firm) => (
                      <tr
                        key={firm._id}
                        onMouseEnter={() => setHoveredFirmId(firm._id)}
                        onMouseLeave={() => setHoveredFirmId(null)}
                      >
                        {/* <td>{firm.id}</td> */}
                        {/* <td>{firm.clientAdmin.firstName + " " + firm.clientAdmin.lastName}</td> */}
                        {/* <td>{firm.cidm}</td> */}
                        <td>{firm.companyTitle}</td>
                        <td>{firm.companyEmail}</td>
                        <td>{firm.companyMobile}</td>
                        {/* <td>{firm.firmAdmin}</td> */}
                        <td>
                          <img src={firm.avatar} alt={firm.name} width="50" height="50" />
                        </td>
                        {/* <td>{new Date(firm.createdAt).toLocaleString()}</td>
                        <td>{new Date(firm.updatedAt).toLocaleString()}</td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {hoveredFirmId && (
                <div className="hover-details">
                  <h5>Firm Details:</h5>
                  <p>ID: {hoveredFirmId}</p>
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
      </div>
      <style>{`
        .hover-details {
          position: absolute;
          background: white;
          border: 1px solid #ccc;
          padding: 10px;
          bottom: 4px;
          right: 0px;
          box-shadow: 0px 4px 8px rgba(0,0,0,0.1);
        }
      `}</style>
    </React.Fragment>
  );
}

export default FirmsTable;
