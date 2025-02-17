import React, { useEffect, useState } from "react";
import { Toast, Button, Card, CardBody, Col, Table } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FirmsTable() {
  const [firms, setFirms] = useState([]);
  const [hoveredFirmId, setHoveredFirmId] = useState(null);
  const authUser = JSON.parse(localStorage.getItem("authUser"))?.response;
  const [trigger, setTrigger] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const firmsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      axios
        .get(`${process.env.REACT_APP_URL}/auth/getCompany/${authUser?._id}`)
        .then((response) => {
          const allFirms = response || [];
          const filteredFirms = allFirms.filter(firm => firm.role === 'firm');
          setFirms(filteredFirms);
        })
        .catch((error) => {
          Toast.error("Error fetching firms");
          console.error(error);
        });
    }
  }, [trigger]);

  const handleFirmCreate = () => {
    navigate("/create-firm");
  };

  // Pagination Logic
  const indexOfLastFirm = currentPage * firmsPerPage;
  const indexOfFirstFirm = indexOfLastFirm - firmsPerPage;
  const currentFirms = firms.slice(indexOfFirstFirm, indexOfLastFirm);
  
  const pageNumbers = [];
  if (firms.length >= firmsPerPage) {
    for (let i = 1; i <= Math.ceil(firms.length / firmsPerPage); i++) {
      pageNumbers.push(i);
    }
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalFirms = firms.length;  
  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="aaMOBee" breadcrumbItem="Firm Management" />

        <Col lg={12}>
          <Card>
            <CardBody className="position-relative">
              <i className="bx bx-refresh position-absolute" style={{ fontSize: "24px", fontWeight: "bold", cursor: "pointer", top: "8px", backgroundColor: "lightblue", padding: "2px", marginLeft: "5px", borderRadius: "5px" }} onClick={() => setTrigger(trigger + 1)} ></i>
              <i className="bx bx-plus position-absolute"    style={{ fontSize: "24px", fontWeight: "bold", cursor: "pointer", top: "8px", left: "60px", backgroundColor: "lightblue", padding: "2px", marginLeft: "5px", borderRadius: "5px", }} onClick={handleFirmCreate} ></i>
              <span className="position-absolute"            style={{ fontSize: "16px", fontWeight: "bold", cursor: "pointer", top: "8px", left: "100px", backgroundColor: "lightblue", padding: "2px 4px", marginLeft: "5px", borderRadius: "5px" }}>Total Firms : {totalFirms}</span>

              <div className="table-responsive mt-4">
                <Table bordered>
                  <thead className="table-light">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Avatar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentFirms.length > 0 ? (
                      currentFirms.map((firm) => (
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
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No firms available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>

              {firms.length >= firmsPerPage && (
                <div className="pagination-controls d-flex gap-2 mt-2 mb-3">
                  {pageNumbers.map((number) => (
                    <Button
                      key={number}
                      onClick={() => paginate(number)}
                      className={currentPage === number ? "btn-primary" : "btn-secondary"}
                    >
                      {number}
                    </Button>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
      </div>
    </React.Fragment>
  );
}

export default FirmsTable;
