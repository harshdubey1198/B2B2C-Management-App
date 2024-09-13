import React, { useEffect, useState } from "react";
import { Toast, Button, Card, CardBody, Col } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import axios from "axios";

function FirmsTable() {
  const [firms, setFirms] = useState([]);
  const [hoveredFirmId, setHoveredFirmId] = useState(null);
  const authUser = JSON.parse(localStorage.getItem("authUser"))?.response;

  useEffect(() => {
    if (authUser) {
      axios
        .get(`${process.env.REACT_APP_URL}/auth/getCompany/${authUser?._id}`)
        .then((response) => {
          const allFirms = response;
          const filteredFirms = allFirms.filter(firm => firm.role === 'firm');
          setFirms(filteredFirms);
        })
        .catch((error) => {
          Toast.error("Error fetching firms");
          console.error(error);
        });
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
                      <th>Name</th>
                      <th>Email</th>
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
                        <td>{firm.companyTitle}</td>
                        <td>{firm.email}</td>
                        <td>{firm.companyMobile}</td>
                        <td>
                          <img src={firm.avatar} alt={firm.companyTitle} width="50" height="50" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            
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
